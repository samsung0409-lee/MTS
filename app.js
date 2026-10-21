(function () {
  'use strict';
  var SUBJECTS = {
    math: { name: '수학', icon: '📐', color: 'var(--math)' },
    science: { name: '과학', icon: '🔬', color: 'var(--science)' },
    social: { name: '사회', icon: '🌏', color: 'var(--social)' },
    etc: { name: '기타', icon: '📁', color: 'var(--etc)' }
  };
  var TOOLS = [
    ['img', '🖼', '인포그래픽'], ['pdf', '📄', '슬라이드'], ['video', '🎬', '영상'],
    ['audio', '🎧', '음성'], ['app', '🧩', '학습앱'], ['pptx', '📥', 'PPT']
  ];
  var CHECKS = [
    '시험 범위와 일정 확인하기', '인포그래픽으로 단원별 핵심 훑기', '영상·음성 자료로 한 번 더 복습하기',
    '슬라이드(PDF) 정독하며 빈칸 채우기', '수학 공식 백지에 써 보기', '헷갈림 표시한 단원 다시 보기',
    '교과서·익힘책·프린트 오답 정리', '시험 전날 일찍 자기 (7시간 이상 수면)', '시험 당일 준비물 챙기기 (컴퓨터용 사인펜 등)'
  ];
  var UNITS = window.UNITS || [];
  var KEY = 'mts_state_v1';
  var $ = function (s) { return document.querySelector(s); };

  function load() {
    try { return Object.assign({ exam: {}, done: {}, star: {}, weak: {}, memo: {}, study: {}, checks: {}, theme: '' }, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return { exam: {}, done: {}, star: {}, weak: {}, memo: {}, study: {}, checks: {}, theme: '' }; }
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function today() { var d = new Date(); return fmt(d); }
  function fmt(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(function () { t.hidden = true; }, 2200); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function path(f) { return encodeURI(f).replace(/#/g, '%23'); }

  /* ---------- 테마 ---------- */
  function applyTheme() {
    var dark = S.theme === 'dark' || (!S.theme && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    $('#themeBtn').textContent = dark ? '☀️' : '🌙';
  }
  $('#themeBtn').onclick = function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    S.theme = dark ? 'light' : 'dark'; save(); applyTheme();
  };

  /* ---------- 탭 ---------- */
  document.querySelectorAll('#tabs button').forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll('#tabs button').forEach(function (x) { x.classList.toggle('active', x === b); });
      document.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('active', t.id === 'tab-' + b.dataset.tab); });
      if (b.dataset.tab === 'planner') renderPlanner();
      window.scrollTo(0, 0);
    };
  });

  /* ---------- D-day ---------- */
  function daysLeft() {
    if (!S.exam.date) return null;
    var a = new Date(today() + 'T00:00:00'), b = new Date(S.exam.date + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }
  function renderDday() {
    var d = daysLeft(), b = $('#ddayBadge');
    b.classList.remove('hot');
    if (d === null) { b.textContent = 'D-day 설정'; return; }
    b.textContent = d > 0 ? 'D-' + d : d === 0 ? 'D-DAY!' : 'D+' + (-d);
    if (d >= 0 && d <= 7) b.classList.add('hot');
  }
  $('#ddayBadge').onclick = function () { document.querySelector('[data-tab=planner]').click(); };

  /* ---------- 자료 목록 ---------- */
  var filter = { subject: 'all', status: 'all', q: '' };

  function renderChips() {
    var box = $('#subjectChips'); box.innerHTML = '';
    var list = [['all', '전체']];
    Object.keys(SUBJECTS).forEach(function (k) {
      if (UNITS.some(function (u) { return u.subject === k; })) list.push([k, SUBJECTS[k].icon + ' ' + SUBJECTS[k].name]);
    });
    list.forEach(function (p) {
      var c = el('button', 'chip' + (filter.subject === p[0] ? ' active' : ''), p[1]);
      c.dataset.s = p[0];
      c.onclick = function () { filter.subject = p[0]; renderChips(); renderGrid(); };
      box.appendChild(c);
    });
  }

  function match(u) {
    if (filter.subject !== 'all' && u.subject !== filter.subject) return false;
    var st = filter.status;
    if (st === 'todo' && S.done[u.id]) return false;
    if (st === 'done' && !S.done[u.id]) return false;
    if (st === 'star' && !S.star[u.id]) return false;
    if (st === 'weak' && !S.weak[u.id]) return false;
    if (filter.q) {
      var hay = (SUBJECTS[u.subject].name + ' ' + u.chapter + ' ' + u.title + ' ' + (S.memo[u.id] || '')).toLowerCase();
      if (hay.indexOf(filter.q) < 0) return false;
    }
    return true;
  }

  function renderGrid() {
    var grid = $('#grid'); grid.innerHTML = '';
    var shown = UNITS.filter(match);
    $('#empty').hidden = shown.length > 0;
    shown.forEach(function (u) { grid.appendChild(card(u)); });
    renderSummary();
  }

  function firstViewable(u) {
    var order = ['img', 'pdf', 'video', 'audio', 'app'];
    for (var i = 0; i < order.length; i++) if (u.files[order[i]]) return order[i];
    return null;
  }

  function card(u) {
    var sj = SUBJECTS[u.subject] || SUBJECTS.etc;
    var c = el('article', 'card' + (S.done[u.id] ? ' done' : ''));
    c.style.setProperty('--c', sj.color);

    var th = el('div', 'thumb');
    if (u.thumb) { var im = el('img'); im.src = path(u.thumb); im.alt = u.title; im.loading = 'lazy'; th.appendChild(im); }
    else th.textContent = sj.icon + ' 미리보기 없음';
    th.appendChild(el('span', 'badge', sj.name + ' · ' + u.chapter));
    if (S.done[u.id]) th.appendChild(el('span', 'donemark', '✔ 완료'));
    var first = firstViewable(u);
    th.onclick = function () { if (first) openViewer(u, first); };
    c.appendChild(th);

    var body = el('div', 'card-body');
    body.appendChild(el('h3', '', u.title));

    var tools = el('div', 'tools');
    TOOLS.forEach(function (t) {
      if (!u.files[t[0]]) return;
      var node;
      if (t[0] === 'pptx') { node = el('a', 'tool'); node.href = path(u.files.pptx); node.download = u.files.pptx; }
      else { node = el('button', 'tool'); node.onclick = function () { openViewer(u, t[0]); }; }
      node.appendChild(document.createTextNode(t[1] + ' ' + t[2]));
      node.appendChild(el('small', '', u.size[t[0]] + 'MB'));
      tools.appendChild(node);
    });
    body.appendChild(tools);

    var act = el('div', 'actions');
    function pill(cls, textOn, textOff, store) {
      var p = el('button', 'pill ' + cls + (S[store][u.id] ? ' on' : ''), S[store][u.id] ? textOn : textOff);
      p.onclick = function () {
        if (S[store][u.id]) delete S[store][u.id]; else S[store][u.id] = true;
        save(); renderGrid();
        if (store === 'done' && S.done[u.id]) toast('🎉 "' + u.title + '" 완료!');
      };
      act.appendChild(p);
    }
    pill('done', '✔ 공부 완료', '☐ 공부 완료', 'done');
    pill('star', '★ 중요', '☆ 중요', 'star');
    pill('weak', '😵 헷갈림', '🙂 헷갈림', 'weak');
    body.appendChild(act);

    var memo = el('textarea', 'memo'); memo.placeholder = '📝 메모 (틀린 문제, 외울 것…)';
    memo.value = S.memo[u.id] || '';
    memo.oninput = function () { if (memo.value) S.memo[u.id] = memo.value; else delete S.memo[u.id]; save(); renderSummary(); };
    body.appendChild(memo);
    c.appendChild(body);
    return c;
  }

  function renderSummary() {
    var total = UNITS.length, done = UNITS.filter(function (u) { return S.done[u.id]; }).length;
    var pct = total ? Math.round(done / total * 100) : 0;
    $('#sumDone').textContent = done + '/' + total;
    $('#sumPct').textContent = pct + '%';
    $('#sumStar').textContent = Object.keys(S.star).length;
    $('#sumToday').textContent = (S.study[today()] || 0) + '분';
    $('#totalBar').style.width = pct + '%';
  }

  $('#search').oninput = function (e) { filter.q = e.target.value.trim().toLowerCase(); renderGrid(); };
  $('#statusFilter').onchange = function (e) { filter.status = e.target.value; renderGrid(); };
  $('#randomBtn').onclick = function () {
    var pool = UNITS.filter(function (u) { return S.weak[u.id]; });
    if (!pool.length) pool = UNITS.filter(function (u) { return !S.done[u.id]; });
    if (!pool.length) pool = UNITS;
    var u = pool[Math.floor(Math.random() * pool.length)];
    var v = firstViewable(u);
    toast('🎲 ' + SUBJECTS[u.subject].name + ' · ' + u.title);
    if (v) openViewer(u, v);
  };

  /* ---------- 뷰어 모달 ---------- */
  var modal = $('#modal'), mbody = $('#modalBody');
  function openViewer(u, kind) {
    var file = u.files[kind]; if (!file) return;
    var url = path(file);
    $('#modalTitle').textContent = SUBJECTS[u.subject].name + ' · ' + u.title;
    $('#modalOpen').href = url;
    mbody.innerHTML = '';
    if (kind === 'img') {
      var im = el('img'); im.src = url; im.alt = u.title; im.style.cursor = 'zoom-in';
      im.onclick = function () { var z = im.classList.toggle('zoom'); im.style.cursor = z ? 'zoom-out' : 'zoom-in'; };
      mbody.appendChild(im);
      toast('이미지를 누르면 확대/축소돼요');
    } else if (kind === 'pdf' || kind === 'app') {
      var f = el('iframe'); f.src = url; f.title = u.title; mbody.appendChild(f);
    } else if (kind === 'video') {
      var v = el('video'); v.src = url; v.controls = true; v.autoplay = true; v.setAttribute('playsinline', '');
      mbody.appendChild(v);
    } else if (kind === 'audio') {
      var box = el('div', 'audio-box'); box.appendChild(el('h3', '', '🎧 ' + u.title));
      var a = el('audio'); a.src = url; a.controls = true; a.autoplay = true; box.appendChild(a);
      var sp = el('div', 'speed');
      [0.75, 1, 1.25, 1.5, 2].forEach(function (r) {
        var b = el('button', 'pill' + (r === 1 ? ' on' : ''), r + 'x');
        b.onclick = function () { a.playbackRate = r; sp.querySelectorAll('.pill').forEach(function (x) { x.classList.toggle('on', x === b); }); };
        sp.appendChild(b);
      });
      box.appendChild(sp); mbody.appendChild(box);
    }
    modal.hidden = false; document.body.style.overflow = 'hidden';
  }
  function closeViewer() {
    modal.hidden = true; mbody.innerHTML = ''; document.body.style.overflow = '';
  }
  $('#modalClose').onclick = closeViewer;
  modal.onclick = function (e) { if (e.target === modal) closeViewer(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeViewer(); });

  /* ---------- 플래너 ---------- */
  function renderPlanner() {
    $('#examName').value = S.exam.name || '';
    $('#examDate').value = S.exam.date || '';
    var box = $('#planResult'); box.innerHTML = '';
    var d = daysLeft();
    var remain = UNITS.filter(function (u) { return !S.done[u.id]; }).length;
    if (d === null) { box.textContent = '시험 날짜를 저장하면 하루 공부 목표를 계산해 드려요.'; }
    else if (d < 0) { box.textContent = '시험이 끝났어요. 수고했어요! 👏'; }
    else {
      var b = el('div', 'big', (S.exam.name || '시험') + '까지 D-' + d); box.appendChild(b);
      var line = el('div', '', '남은 단원 ' + remain + '개');
      box.appendChild(line);
      if (remain === 0) box.appendChild(el('div', '', '🎉 모든 단원을 완료했어요! 이제 헷갈림·오답 복습에 집중하세요.'));
      else if (d === 0) box.appendChild(el('div', '', '오늘이 시험일! 헷갈림 단원만 가볍게 훑어보세요.'));
      else {
        var per = Math.ceil(remain / Math.max(d - 1, 1));
        box.appendChild(el('div', '', '👉 하루 ' + per + '단원씩 보면 시험 전날까지 한 바퀴를 마칠 수 있어요.'));
        box.appendChild(el('div', '', '마지막 하루는 오답·헷갈림 복습에 쓰세요.'));
      }
    }
    var sp = $('#subjectProgress'); sp.innerHTML = '';
    Object.keys(SUBJECTS).forEach(function (k) {
      var list = UNITS.filter(function (u) { return u.subject === k; });
      if (!list.length) return;
      var done = list.filter(function (u) { return S.done[u.id]; }).length;
      var pct = Math.round(done / list.length * 100);
      var row = el('div', 'sp-row'); row.style.setProperty('--c', SUBJECTS[k].color);
      var lbl = el('div', 'lbl'); lbl.appendChild(el('span', '', SUBJECTS[k].icon + ' ' + SUBJECTS[k].name));
      lbl.appendChild(el('span', '', done + '/' + list.length + ' (' + pct + '%)'));
      var bar = el('div', 'sp-bar'); var inner = el('div'); inner.style.width = pct + '%'; bar.appendChild(inner);
      row.appendChild(lbl); row.appendChild(bar); sp.appendChild(row);
    });
    var wk = $('#weekChart'); wk.innerHTML = '';
    var days = [], max = 30, i;
    for (i = 6; i >= 0; i--) { var dt = new Date(); dt.setDate(dt.getDate() - i); var key = fmt(dt); var m = S.study[key] || 0; days.push([dt, m]); if (m > max) max = m; }
    var names = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(function (p) {
      var col = el('div', 'wcol'); col.appendChild(el('div', 'v', p[1] ? p[1] + '분' : ''));
      var bar = el('div', 'b'); bar.style.height = Math.round(p[1] / max * 100) + '%'; col.appendChild(bar);
      col.appendChild(el('div', '', names[p[0].getDay()])); wk.appendChild(col);
    });
  }
  $('#examSave').onclick = function () {
    S.exam = { name: $('#examName').value.trim(), date: $('#examDate').value };
    save(); renderDday(); renderPlanner(); toast('시험 일정을 저장했어요');
  };
  $('#resetLog').onclick = function () { if (confirm('공부 시간 기록을 모두 지울까요?')) { S.study = {}; save(); renderPlanner(); renderSummary(); } };
  $('#exportBtn').onclick = function () {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cheonggye-study-backup.json'; a.click();
  };
  $('#importFile').onchange = function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try { S = Object.assign(load(), JSON.parse(r.result)); save(); init(); toast('가져오기 완료'); }
      catch (err) { toast('올바른 백업 파일이 아니에요'); }
    };
    r.readAsText(f);
  };

  /* ---------- 타이머 ---------- */
  var T = { mode: 'focus', left: 25 * 60, id: null, end: 0 };
  function mmss(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function setMode(m) {
    T.mode = m;
    var min = Math.max(1, parseInt($(m === 'focus' ? '#focusMin' : '#breakMin').value, 10) || (m === 'focus' ? 25 : 5));
    T.left = min * 60;
    $('#timerMode').textContent = m === 'focus' ? '집중' : '휴식';
    $('#timerMode').classList.toggle('rest', m !== 'focus');
    drawTimer();
  }
  function drawTimer() { $('#timerDisplay').textContent = mmss(T.left); document.title = (T.id ? mmss(T.left) + ' · ' : '') + '청계중 3학년 시험 대비 학습실'; }
  function beep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.25, 0.5].forEach(function (t) {
        var o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; g.gain.value = 0.15; o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.15);
      });
    } catch (e) {}
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }
  function tick() {
    T.left = Math.max(0, Math.round((T.end - Date.now()) / 1000));
    drawTimer();
    if (T.left <= 0) {
      clearInterval(T.id); T.id = null; beep();
      if (T.mode === 'focus') {
        var min = Math.max(1, parseInt($('#focusMin').value, 10) || 25);
        var k = today(); S.study[k] = (S.study[k] || 0) + min;
        S.sessions = S.sessions || {}; S.sessions[k] = (S.sessions[k] || 0) + 1; save();
        renderSummary(); drawSessions(); toast('🎉 집중 ' + min + '분 완료! 잠깐 쉬어요');
        setMode('break');
      } else { toast('휴식 끝! 다시 집중해요'); setMode('focus'); }
      document.title = '청계중 3학년 시험 대비 학습실';
    }
  }
  function drawSessions() { $('#sessionCount').textContent = (S.sessions && S.sessions[today()]) || 0; }
  $('#tStart').onclick = function () { if (T.id) return; T.end = Date.now() + T.left * 1000; T.id = setInterval(tick, 500); tick(); };
  $('#tPause').onclick = function () { if (!T.id) return; clearInterval(T.id); T.id = null; drawTimer(); };
  $('#tReset').onclick = function () { clearInterval(T.id); T.id = null; setMode(T.mode); };
  $('#focusMin').onchange = function () { if (!T.id && T.mode === 'focus') setMode('focus'); };
  $('#breakMin').onchange = function () { if (!T.id && T.mode === 'break') setMode('break'); };

  /* ---------- 팁/체크리스트/계산기 ---------- */
  function renderChecklist() {
    var ul = $('#checklist'); ul.innerHTML = '';
    CHECKS.forEach(function (t, i) {
      var li = el('li', S.checks[i] ? 'ck' : ''), lb = el('label'), cb = el('input'); cb.type = 'checkbox'; cb.checked = !!S.checks[i];
      cb.onchange = function () { if (cb.checked) S.checks[i] = true; else delete S.checks[i]; save(); li.classList.toggle('ck', cb.checked); };
      lb.appendChild(cb); lb.appendChild(el('span', '', t)); li.appendChild(lb); ul.appendChild(li);
    });
  }
  function r(n) { return (Math.round(n * 1000) / 1000).toString(); }
  $('#calcInput').oninput = function (e) {
    var out = $('#calcOut'); out.innerHTML = '';
    var nums = e.target.value.split(/[,\s]+/).filter(Boolean).map(Number);
    if (!nums.length || nums.some(isNaN)) { if (e.target.value) out.textContent = '숫자를 쉼표로 구분해 입력하세요.'; return; }
    var n = nums.length, sum = nums.reduce(function (a, b) { return a + b; }, 0), mean = sum / n;
    var dev = nums.map(function (x) { return x - mean; });
    var vr = dev.reduce(function (a, b) { return a + b * b; }, 0) / n;
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var med = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    var cnt = {}, mx = 0; nums.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; if (cnt[x] > mx) mx = cnt[x]; });
    var mode = mx === 1 ? '없음' : Object.keys(cnt).filter(function (k) { return cnt[k] === mx; }).join(', ');
    [['개수', n], ['합', r(sum)], ['평균', r(mean)], ['중앙값', r(med)], ['최빈값', mode],
     ['편차', dev.map(r).join(', ')], ['분산', r(vr)], ['표준편차', r(Math.sqrt(vr))]].forEach(function (p) {
      var d = el('div'); var b = el('b', '', p[0] + ': '); d.appendChild(b); d.appendChild(document.createTextNode(p[1])); out.appendChild(d);
    });
  };

  /* ---------- 시작 ---------- */
  function init() {
    applyTheme(); renderDday(); renderChips(); renderGrid(); renderChecklist(); drawSessions(); renderPlanner(); setMode('focus');
  }
  init();
})();
