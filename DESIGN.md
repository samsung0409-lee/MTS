---
name: StyleAI
colors:
  surface: '#faf9f8'
  surface-dim: '#dadad9'
  surface-bright: '#faf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f2'
  surface-container: '#eeeeed'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e1'
  on-surface: '#1a1c1c'
  on-surface-variant: '#58413f'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f0f0'
  outline: '#8c716e'
  outline-variant: '#dfbfbc'
  surface-tint: '#ac3231'
  primary: '#a8302f'
  on-primary: '#ffffff'
  primary-container: '#ca4845'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3ae'
  secondary: '#5f5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e4e1e5'
  on-secondary-container: '#656467'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#8b191d'
  secondary-fixed: '#e4e1e5'
  secondary-fixed-dim: '#c8c6c9'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#faf9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e1'
typography:
  headline-hero:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-xs:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1.25rem
  margin-desktop: 2.5rem
---

## Brand & Style

This design system expresses high-fashion editorial prestige infused with computational intelligence. Designed for style-conscious individuals seeking bespoke wardrobe curation, trend forecasting, and instant outfit synthesis, the interface evokes the quiet authority of luxury fashion publications while delivering the precision of modern AI tooling.

The aesthetic philosophy bridges two worlds:
- **Haute Editorial:** Generous negative space, disciplined hierarchy, and classical high-contrast typography evoke printed lookbooks and high-end atelier catalogues.
- **Sleek Intelligence:** Structured data surfaces, crystalline containers, and warm terracotta accents ground the experience in modern digital utility without clinical detachment.

Every surface prioritizes tactile restraint: warm cream backdrops over stark digital whites, rich charcoal ink over pure synthetic black, and purposeful micro-interactions that feel curated rather than algorithmic.

## Colors

The palette establishes an organic, luminous foundation calibrated for high-fashion photography and rich garment textures.

- **Primary (`#D9534F` - Terracotta Rose):** Used selectively for key actions, recommendation highlights, AI confidence tags, and active states. It introduces warmth and decisive editorial focus.
- **Secondary (`#27272A` - Rich Charcoal):** Serves as the primary functional pigment for structural headers, primary text, dark action buttons, and high-contrast badges.
- **Tertiary (`#D4AF37` - Champagne Gold):** Reserved for premium membership badges, VIP curation ribbons, and refined meta indicators.
- **Surface Foundations:**
  - Canvas Root: `#FDFCFB` (Off-white silk)
  - Card & Container Surface: `#FFFFFF`
  - Subtle Section Fill: `#F7F5F0` (Warm French linen)
  - Border Hairline: `rgba(24, 24, 27, 0.08)`
- **Text & Ink hierarchy:**
  - Primary text: `#18181B` (Deep Carbon)
  - Secondary metadata: `#71717A` (Muted Graphite)
  - Ghost & disabled: `#A1A1AA` (Pewter)

## Typography

The typographical pairing expresses the tension between high-fashion couture and data-driven utility:

1. **Editorial Display (`Playfair Display`):** Applied exclusively to curated titles, hero statement banners, season collection headers, and editorial quote snippets. In Korean typographic contexts, English headings remain in Playfair Display while Korean display counterparts prioritize clean, high-legibility weight distribution with ample letter-spacing and rhythmic leading.
2. **Functional Structure (`Inter`):** Drives all scanning, body narratives, outfit component names, AI prompts, and interactive labels. Features strict vertical metric alignment and open apertures for effortless readability at micro sizes.

Uppercase tracking is applied strictly to `label-md` and `label-xs` tags (e.g., "AI CURATION", "DAILY LOOK") to simulate masthead folio markings.

## Layout & Spacing

The layout model balances an asymmetrical, magazine-style grid with intuitive mobile touch patterns.

- **Mobile Viewports (< 640px):** 4-column fluid layout with `1.25rem` (20px) screen-edge margins and `1rem` (16px) gutters. Cards span full width or 2-column split pairs (e.g., lookbook grids and outfit pairing recommendations).
- **Tablet & Large Screens (>= 640px):** 8 to 12-column layout with max canvas width capped at 1120px to maintain luxury boutique proportions rather than stretched utility dashboards.
- **Rhythm & Whitespace:** Generous vertical intervals (`space-2xl` and `space-3xl`) between distinct curated sections mimic printed spreads. Elements within individual outfit formula cards rely on tight, disciplined increments (`space-xs` to `space-md`).

## Elevation & Depth

Visual hierarchy rejects heavy skeuomorphism and harsh artificial drops. Instead, depth is articulated through layered warm tonality and ambient feathering:

- **Level 0 (Flat Canvas):** `#FDFCFB` base with unbordered bleed.
- **Level 1 (Card & Lookbook Plinths):** Pure white surfaces resting over `#FDFCFB` or `#F7F5F0`, framed with an ultra-fine structural border: `1px solid rgba(24, 24, 27, 0.06)`.
- **Level 2 (Active Focus & AI Recommendation Modals):** Gentle, diffused warm shadow simulating directional natural studio lighting:
  `box-shadow: 0 10px 30px -10px rgba(39, 39, 42, 0.07), 0 4px 12px -4px rgba(217, 83, 79, 0.04)`.
- **Level 3 (Floating Action & Drawer Trays):**
  `box-shadow: 0 20px 40px -12px rgba(24, 24, 27, 0.12)`.
- **Frosted Overlays:** Bottom navigation bars and contextual AI floating panels leverage background blurs (`backdrop-filter: blur(16px); background-color: rgba(253, 252, 251, 0.85);`).

## Shapes

The design system standardizes on **Rounded (Level 2)** geometry:
- Standard interactive elements, recommendation cards, and image preview tiles use `0.5rem` (8px) radii for a tailored, architectural contour.
- Large bottom sheets, outfit synthesis modal boards, and editorial feature hero containers step up to `1rem` (16px) (`rounded-lg`) or `1.5rem` (24px) (`rounded-xl`).
- Category chips, status indicators, and pill tags intentionally use continuous curves (`rounded-full`) to contrast against rectangular editorial photography.

## Components

### Buttons
- **Primary Action (Dark Charcoal):** Solid `#27272A` background with `#FDFCFB` typography. Standard height of 48px, `rounded-md` (8px) radius, high-density touch targets.
- **Terracotta Accent (AI Curation Trigger):** Solid `#D9534F` with `#FFFFFF` text. Used for high-intent actions (e.g., "스타일링 생성", "AI 맞춤 추천 받기").
- **Secondary Outlined:** 1px border `rgba(24, 24, 27, 0.2)` over transparent or warm cream background with `#18181B` text.
- **Editorial Ghost:** Borderless, subtle underline or right-chevron accompaniment, featuring Playfair Display or tracked Inter labels.

### Chips & Pill Tags
- **AI Attribute Badges (e.g., '모던 캐주얼', '98% 매칭'):** Height 28px, continuous pill radius (`rounded-full`), `space-xs` horizontal padding, light `#F7F5F0` fill with `#27272A` typography.
- **Active Filter State:** `#27272A` background with white text, or subtle `#D9534F` fill at 12% opacity with solid `#D9534F` text.

### Cards & Lookbook Tiles
- High aspect-ratio image containers (3:4 or 4:5 ratio) for full-length outfit visualisations.
- Fine 1px hairline boundary with Level 1 elevation.
- Embedded footer showcasing garment breakdown, AI color match indicators, and direct styling bookmark icons.

### Inputs & AI Prompts
- Text fields utilize a clean bottom-line border or subtle box enclosure (`#F7F5F0` background, transitioning to `#27272A` or `#D9534F` border on focus).
- AI prompt bar: Floating pill search container with shimmering champagne or terracotta micro-icon, placeholder text formatted in gentle italic graphite (`#71717A`).

### Selection Controls
- Checkboxes and radio buttons employ understated `#27272A` checked fills with crisp white glyphs; unchecked states remain hairline neutral outlines (`rgba(24, 24, 27, 0.25)`).

### AI Match & Wardrobe Analytics Indicators
- Radial progress rings and similarity match gauges rendered in `#D9534F` alongside secondary accents in `#D4AF37`.