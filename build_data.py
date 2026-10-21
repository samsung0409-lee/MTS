# -*- coding: utf-8 -*-
"""폴더 안의 학습 자료를 스캔해 data.js 와 thumbs/*.jpg 를 생성합니다.
자료 파일을 추가/삭제한 뒤  `python build_data.py`  를 다시 실행하세요."""
import json
import os
import re
from collections import defaultdict

try:
    from PIL import Image
except ImportError:  # 썸네일 없이도 동작
    Image = None

ROOT = os.path.dirname(os.path.abspath(__file__))
THUMB_DIR = os.path.join(ROOT, "thumbs")
EXT_KIND = {".png": "img", ".pdf": "pdf", ".pptx": "pptx",
            ".mp4": "video", ".m4a": "audio", ".html": "app"}


def classify(stem):
    """파일 이름(확장자 제외) -> (과목, 정렬키, 표시 제목, 단원/장 표기)"""
    m = re.match(r"^(\d{2})(\d{2})\s+(.+)$", stem)
    if m:
        return ("math", (int(m[1]), int(m[2])), m[3], f"{int(m[1])}단원 {int(m[2])}")
    m = re.search(r"_(\d+)-(\d+)\((\d+)~(\d+)\)$", stem)
    if stem.startswith("과학") and m:
        a, b, p1, p2 = (int(x) for x in m.groups())
        return ("science", (a, b), f"{a}-{b} (교과서 {p1}~{p2}쪽)", f"{a}단원")
    m = re.match(r"^사회\s+(\d+)장\s+(.+)$", stem)
    if m:
        return ("social", (int(m[1]), 0), m[2], f"{int(m[1])}장")
    return ("etc", (99, 0), stem, "기타")


def main():
    groups = defaultdict(dict)
    for name in os.listdir(ROOT):
        stem, ext = os.path.splitext(name)
        if ext.lower() in EXT_KIND and os.path.isfile(os.path.join(ROOT, name)):
            groups[stem][EXT_KIND[ext.lower()]] = name

    os.makedirs(THUMB_DIR, exist_ok=True)
    items = []
    for stem, files in groups.items():
        subj, key, title, chapter = classify(stem)
        items.append((subj, key, stem, title, chapter, files))
    items.sort(key=lambda x: (x[0], x[1]))

    counters = defaultdict(int)
    units = []
    for subj, key, stem, title, chapter, files in items:
        counters[subj] += 1
        uid = f"{subj[0]}{counters[subj]:02d}"
        thumb = None
        if "img" in files and Image:
            thumb = f"thumbs/{uid}.jpg"
            out = os.path.join(ROOT, thumb)
            if not os.path.exists(out):
                im = Image.open(os.path.join(ROOT, files["img"])).convert("RGB")
                im.thumbnail((800, 800))
                im.save(out, "JPEG", quality=82, optimize=True)
        units.append({
            "id": uid, "subject": subj, "chapter": chapter, "title": title,
            "thumb": thumb, "files": files,
            "size": {k: round(os.path.getsize(os.path.join(ROOT, v)) / 1048576, 1)
                     for k, v in files.items()},
        })

    with open(os.path.join(ROOT, "data.js"), "w", encoding="utf-8") as f:
        f.write("window.UNITS = " + json.dumps(units, ensure_ascii=False, indent=1) + ";\n")
    print(f"{len(units)} units written")


if __name__ == "__main__":
    main()
