---
name: "TNC · The Nuclear Club (radiasi.id)"
description: "Jakarta's curated tennis & sports community club — Atomic Court Heritage visual system and real-time slot booking console."
colors:
  olive-court: "#3D4F34"
  optic-tennis-volt: "#D1E432"
  sage-olive: "#728367"
  chalk-alabaster: "#F3F3EB"
  chalk-elevated: "#EAEADE"
  court-bunker: "#121E13"
  bunker-panel: "#162315"
  ink-dark: "#131F0F"
  ink-sage-light: "#C6D0B4"
  rule-court: "#596051"
typography:
  display:
    fontFamily: "'Archivo', 'Quattrocento Sans', sans-serif"
    fontSize: "60px"
    fontWeight: 700
    lineHeight: 0.97
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Archivo', 'Quattrocento Sans', sans-serif"
    fontSize: "42px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Archivo', 'Quattrocento Sans', sans-serif"
    fontSize: "31px"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Quattrocento Sans', 'Archivo', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo', 'Quattrocento Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "16px"
  pill: "25px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "30px"
  xl: "48px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.optic-tennis-volt}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    height: "49px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  card-bunker:
    backgroundColor: "{colors.court-bunker}"
    textColor: "{colors.chalk-alabaster}"
    rounded: "{rounded.xl}"
    padding: "32px"
  input-bunker:
    backgroundColor: "{colors.bunker-panel}"
    textColor: "{colors.chalk-alabaster}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: TNC · The Nuclear Club (radiasi.id)

## Overview

**Creative North Star: "The Atomic Court Ledger"**

TNC (The Nuclear Club) merges the architectural precision of a championship tennis scoreboard with the warm, tactile permanence of a heritage court club. The interface splits into two deliberate zones: an editorial left field on warm chalk alabaster (`#F3F3EB`) governed by exposed `1.5px` baseline rules (`#596051`), and an operational right-hand booking console housed in deep court bunker olive (`#121E13`). Every surface prioritizes scannable court schedules, live slot capacity meters, NTRP skill badges, and instant QR Court Pass verification.

Rather than relying on decorative SaaS cards, floating glass layers, or generic sports stock cliches, the system treats data rows like court boundary lines. Contrast between the warm chalk editorial canvas and the high-density dark bunker console gives the page an immediate sense of place, while Optic Tennis Volt (`#D1E432`) is reserved strictly for primary transaction triggers and live slot meters.

**Key Characteristics:**
- Asymmetric 7/5 desktop split pairing editorial club storytelling on warm chalk with an always-live dark bunker booking console.
- Exposed `1px` and `1.5px` olive-tinted court boundary rules that structure navigation, stat strips, and weekly session ledgers without nested card boxes.
- Single high-visibility accent (`#D1E432` Optic Tennis Volt) restricted to primary CTAs, active capacity bars, and live tournament scores.
- Tabular numeric discipline (`tabular-nums`) across all court times, slot counters, NTRP ratings, and IDR pricing.

## Colors

The "Atomic Court Heritage" palette pairs sun-warmed chalk surfaces and championship Plexipave olive greens with a single high-visibility tennis-ball volt accent.

### Primary
- **Primary Olive Court** (`#3D4F34`): Used for full-bleed operational bands (the quick session filter console), NTRP skill rating pills, and secondary capacity bars on light surfaces.
- **Optic Tennis Volt** (`#D1E432`): High-visibility accent reserved exclusively for primary transaction buttons (`BOOK SLOT & PAY QRIS`, `FIND AVAILABLE SLOTS`, `REGISTER DOUBLES TEAM`), live slot progress fills, and active pass badges.

### Secondary
- **Muted Sage Olive** (`#728367`): Structural backdrop framing the right-hand booking console in the first viewport and providing tonal separation between light and dark zones.

### Neutral
- **Warm Chalk Alabaster** (`#F3F3EB`): Primary page background and editorial canvas, evoking chalk court lines under floodlights without sterile pure white.
- **Elevated Chalk** (`#EAEADE`): Active row highlight for selected membership tiers on light surfaces.
- **Deep Court Bunker** (`#121E13`): Primary dark container surface for the Live Session Booking Console, the Atomic Doubles Cup tournament section, the Digital Member Card preview, and the club footer.
- **Bunker Panel** (`#162315`): Slightly lifted dark surface used for selectable session rows, tournament bracket matchup pairs, and form inputs inside dark bunker sections.
- **Deep Court Ink** (`#131F0F`): Primary typography ink on Warm Chalk Alabaster (`15.6:1` WCAG AAA contrast).
- **Light Sage Mist** (`#C6D0B4`): Secondary metadata and specification labels inside dark bunker sections (`10.4:1` contrast on `#121E13`).
- **Court Boundary Rule** (`#596051`): Structural `1.5px` dividers separating major horizontal bands and header rows.

### Named Rules
**The Optic Volt Scarcity Rule.** Optic Tennis Volt (`#D1E432`) never appears as a section background or decorative graphic; it marks only actionable booking triggers and live slot availability.
**The Tinted Court Neutral Rule.** Pure black (`#000000`), pure white (`#FFFFFF`), and untinted grays are prohibited; every neutral carries a warm chalk or deep olive court undertone.

## Typography

**Display & UI Font:** `'Archivo'` (with `'Quattrocento Sans'` fallback)
**Body & Editorial Font:** `'Quattrocento Sans'` (with `'Archivo'` fallback)

**Character:** Condensed, athletic display grotesque headlines with tight tracking (`-0.02em`) paired with crisp, open-counter humanist sans body copy and tabular numerals for effortless schedule scanning.

### Hierarchy
- **Display** (`700`, `60px` desktop / `26px` mobile, `0.97` line-height, `-0.02em` tracking, uppercase): First-viewport club manifesto (`PLAY ATOMIC. JAKARTA’S CURATED TENNIS CLUB.`).
- **Headline** (`700`, `42px` desktop / `24px` mobile, `1.08` line-height, `-0.02em` tracking, uppercase): Major below-the-fold section headers (`WEEKLY COURT LEDGER & SLOT RESERVATION`).
- **Title** (`600`, `31px` desktop / `22px` mobile, `1.13` line-height, `-0.025em` tracking, uppercase): Booking console header and membership pass titles.
- **Body** (`400`–`500`, `17px` desktop / `15px` mobile, `1.55` line-height, max `62ch`): Editorial section leads and membership perk descriptions.
- **Label** (`600`–`700`, `13px`–`16px`, `tabular-nums`): Schedule rows, NTRP badges, capacity counters, and IDR price readouts.

### Named Rules
**The No-Kicker Rule.** Section headings stand directly on their own authority (`<h2>`) without small uppercase eyebrow labels or category kickers stacked above them.
**The Tabular Scoreboard Rule.** Every element displaying time (`19:00 WIB`), remaining slots (`3 / 12 SLOTS LEFT`), NTRP ratings (`3.5`), or currency (`IDR 125.000`) enforces `font-variant-numeric: tabular-nums`.

## Layout

The desktop layout is anchored by a `1376px` container (`30px` horizontal padding) and an asymmetric 7/5 first-viewport split (`892px` left editorial court column + `484px` right sage/bunker booking console). Below the fold, full-bleed bands alternate intentionally between Primary Olive (`#3D4F34`), Warm Chalk (`#F3F3EB`), and Deep Court Bunker (`#121E13`).

- **Weekly Ledger Grid:** 6-column tabular layout (`1.1fr 1.6fr 1.1fr 1.3fr 1fr auto`) separated by `1px` horizontal rules (`#7D8076`).
- **Tournament & Membership Splits:** Asymmetric `5fr 7fr` and `7fr 5fr` two-column grids with `48px` column gaps.
- **Responsive Breakpoint (`< 960px`):** Collapses multi-column grids into a single vertical flow with `20px` horizontal padding, stacking the editorial hero above the dark bunker booking console and converting ledger rows into scannable vertical blocks with zero horizontal scroll at `390px`.

## Elevation & Depth

TNC is **flat and architectural by default**. Depth is achieved through high-contrast tonal layering (`#F3F3EB` chalk -> `#728367` sage -> `#121E13` bunker -> `#162315` panel) and crisp `1px`–`1.5px` structural rules rather than drop shadows or glassmorphism.

### Named Rules
**The Court-Line Separation Rule.** Never wrap list rows or schedule items inside individual shadowed cards; separate sibling records with exposed `1px` horizontal boundary rules.

## Shapes

- **Console & Preview Containers:** `16px` border radius (`.right-bunker-card`, `.member-pass-preview`).
- **Interactive Session Rows & Matchup Pairs:** `10px` border radius with `1px solid #3F4E3B` border, shifting to `#D1E432` when selected or hovered.
- **Segmented Tab Bar & Form Inputs:** `8px` border radius (`.booking-tabs-bg`, `.filter-select`, `.tnc-input`, `.qr-white-tile`).
- **Primary Action Buttons:** Full pill silhouette (`24px`–`25px` border radius) echoing the curve of a tennis ball and court baseline arc.

## Components

### Buttons
- **Shape:** Full pill (`25px` radius on `49px` height primary CTA; `20px` radius on `40px` ledger outline button).
- **Primary (`cta-volt-btn`):** Optic Tennis Volt (`#D1E432`) background with Deep Court Ink (`#131F0F`) bold label.
- **Hover / Focus:** Subtle brightness lift (`filter: brightness(1.05)`) on `180ms cubic-bezier(0.22, 1, 0.36, 1)` and `2px solid #D1E432` `:focus-visible` outline.
- **Secondary / Ghost (`ledger-book-btn`):** Transparent background with `1.5px solid #131F0F` stroke; inverts to `#131F0F` background and `#F0F2E6` text on hover.

### Segmented Booking Tabs
- **Style:** Housed inside a `#142113` track (`8px` radius, `1px solid #4A5844` border) with three equal-height tabs (`OPEN PLAY`, `TOURNAMENT`, `COACHING`).
- **State:** Active tab receives a `#BDC7A4` sage-volt fill with `#141E12` text (`6px` radius).

### Selectable Session Rows (`session-card-box`)
- **Corner Style:** `10px` radius.
- **Background:** `#162315` panel fill inside `#121E13` bunker card.
- **Border:** `1px solid #3F4E3B` at rest; `1px solid #D1E432` when `.is-selected` or hovered.
- **Capacity Meter:** `11px`-tall `#2C3927` track with `#D1E432` progress fill.

### Inputs / Fields (`tnc-input`, `filter-select`)
- **Style:** `1px solid #3F4E3B` (or `#5B6E50` on olive band), `#162315` / `#121E13` dark background, `#F0F2E6` text, `8px` radius, `12px 14px` padding.
- **Focus:** `2px solid #D1E432` focus ring with `2px` offset.

### Signature Component: Live QR Court Pass Tile
- **Description:** Embedded directly inside the booking console (`95x95px` `#F6F6EC` tile, `8px` radius, `6px` padding) rendering a deterministic HTML5 Canvas QR matrix (`TNC-PASS-*`) that updates live whenever a player switches sessions or completes a booking.

## Do's and Don'ts

### Do:
- **Do** pair Warm Chalk Alabaster (`#F3F3EB`) editorial sections with Deep Court Bunker (`#121E13`) operational consoles to preserve the signature contrast of the world.
- **Do** use `1px` and `1.5px` olive-tinted rules (`#596051`, `#7D8076`, `#384534`) to divide schedule rows, stats strips, and tournament specifications.
- **Do** keep `font-variant-numeric: tabular-nums` active on all prices, slot counts, scores, and timestamps.

### Don't:
- **Don't** nest bordered cards inside bordered cards beyond the single permitted exception (the two selectable session rows inside the dark right-hand booking console).
- **Don't** add small uppercase kickers or eyebrows above `<h1>` or `<h2>` headings.
- **Don't** animate layout-triggering properties (`width`, `height`, `top`, `left`); restrict transitions to `transform`, `opacity`, `background-color`, `border-color`, and `color` using `cubic-bezier(0.22, 1, 0.36, 1)`.
