---
name: TaskFlow
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system delivers a focused, high-clarity productivity environment that balances the keyboard-first velocity of Linear with the modular accessibility of Notion and Todoist. The aesthetic is modern, light-first minimalism augmented with translucent glass surfaces, precise hairline borders, and subtle diffuse elevations.

The design targets high-output professionals, engineering teams, product managers, and knowledge workers who require low cognitive drag and rapid task manipulation. The interface elicits calm focus, systematic efficiency, and tactile certainty through crisp contrast ratios, deliberate spatial density, and micro-delights on completion states.

## Colors

The palette leverages a crisp, cool-slate architecture anchored by an authoritative indigo core.

- **Primary (`#6366F1`) & Primary Dark (`#4F46E5`):** Reserved for focal calls to action, active navigation states, selected task rows, and key keyboard triggers.
- **Canvas & Backgrounds:** The base app background is set to Light Slate (`#F8FAFC`), transitioning to `#F1F5F9` for secondary structural sidebars, table headers, and modal overlays.
- **Surfaces:** Pure White (`#FFFFFF`) is reserved for foreground cards, floating drawers, context menus, and elevated input controls to establish an immediate foreground/background separation.
- **Typography & Neutrals:** Primary text uses Crisp Dark Slate (`#0F172A`) for maximum legibility. Secondary labels and metadata use `#64748B`. Dividers, subtle borders, and keyline frames utilize `#E2E8F0` with translucent alpha overlays (`rgba(15, 23, 42, 0.06)`).
- **Semantics:**
  - **Success (`#10B981`, `#22C55E`):** Task completions, positive checklist progression, and sync confirmations.
  - **Warning (`#F59E0B`):** Impending due dates, medium priority markers, and deferred schedules.
  - **Danger (`#EF4444`):** Urgent/overdue markers, high priority badges, and destructive actions.

## Typography

Typography is powered exclusively by Inter, calibrated for dense data presentation, tabular scanning, and effortless legibility across dense workflow matrices.

- **Tabular Figures:** All numeric displays (due dates, task counts, time tracking) must use tabular lining figures (`font-variant-numeric: tabular-nums`) to ensure vertical alignment in list views.
- **Letter Spacing:** Apply `-0.015em` to headings (`headline-xl`, `headline-lg`) to tighten display impact. Body and label sizes stay at natural tracking or subtle `+0.005em` on uppercase badges to guarantee micro-scale clarity.
- **Visual Weighting:** Semantic hierarchy relies primarily on weight modulation (600 vs. 400) and slate value shifting (`#0F172A` down to `#64748B`) rather than drastic jumps in font size.

## Layout & Spacing

The layout adopts an adaptable fluid grid with fixed collapsible side navigation rails.

- **Grid Architecture:** Desktop views operate on a 12-column layout with a persistent collapsible sidebar (240px wide default, 64px compact icon state). The primary canvas dynamically fills the viewport with bounded constraints (maximum readable content container at `1280px`).
- **Responsive Adaptations:**
  - **Mobile (< 768px):** Sidebar collapses into a slide-over sheet or bottom navigation bar. Margins contract to `1rem` (`margin`), element gaps collapse to `space-sm`, and multi-column task boards reflow into stacked swipeable panels.
  - **Tablet (768px - 1024px):** Fixed icon rail, list views take full width, slide-over preview panels overlay 50% screen width.
  - **Desktop (> 1024px):** Dual or triple pane modes (Sidebar + List Stream + Task Detail Drawer) operate simultaneously without occlusion.
- **Spatial Rhythm:** Built strictly on a 4px/8px incremental base. Internal component padding follows `space-xs` (4px), `space-sm` (8px), and `space-md` (12px) for high density without visual crowding.

## Elevation & Depth

Visual hierarchy uses subtle atmospheric layering combining tinted ambient shadows and semi-translucent backdrop filters.

- **Level 0 (Base Canvas):** Solid `#F8FAFC`. Zero elevation, non-interactive foundation.
- **Level 1 (Surface Cards & Inset Panels):** Solid `#FFFFFF`, bordered by 1px solid `#E2E8F0` or `rgba(15, 23, 42, 0.05)`. Minimal shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered Cards & Draggable Rows):** Elevated state during drag-and-drop: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`. Slight scale transform `scale(1.01)`.
- **Level 3 (Dropdowns, Popovers, & Context Menus):** Pure white with frosted support `rgba(255, 255, 255, 0.95)`, `backdrop-filter: blur(8px)`, framed by `1px solid rgba(15, 23, 42, 0.08)`, shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Level 4 (Command Palette & Modal Overlays):** Elevated focus layer anchored against a dimmed backdrop `rgba(15, 23, 42, 0.4)` with `backdrop-filter: blur(4px)`. Shell shadow: `0 25px 50px -12px rgba(15, 23, 42, 0.25)`.

## Shapes

The design system implements a refined modern curve profile centered on token `2` (Rounded).

- **Standard Elements (0.5rem / 8px):** Buttons, text fields, menu items, table row hover backgrounds, and checkbox wrappers.
- **Structural Containers (`rounded-lg` / 1rem / 16px):** Task cards, Kanban tiles, popover flyouts, and floating action pods.
- **Hero Containers (`rounded-xl` / 1.5rem / 24px):** Command palette modals, settings dialogue sheets, and central workspace preview cards.
- **Full Pill (`rounded-full`):** Filter tags, priority badges, avatar indicators, and quick-add floating utility buttons.

## Components

### Buttons
- **Primary:** Filled `#6366F1` background, `#FFFFFF` text, `rounded-md` (8px), subtle inset top highlight `inset 0 1px 0 0 rgba(255,255,255,0.2)`. On hover: `#4F46E5`.
- **Secondary:** Surface `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. On hover: `#F8FAFC` background, `#CBD5E1` border.
- **Ghost / Subtle:** Transparent background, `#64748B` text. On hover: `#F1F5F9` background, `#0F172A` text.
- **Sizes:** Compact (32px height, 12px padding-x, `label-sm`), Default (38px height, 16px padding-x, `label-md`).

### Priority Badges & Chips
- **High Priority:** Tinted background `rgba(239, 68, 68, 0.1)`, solid text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.2)`, `caption` weight 600, `rounded-full` with an optional leading 6px colored dot.
- **Medium Priority:** Tinted background `rgba(245, 158, 11, 0.1)`, solid text `#D97706`, border `1px solid rgba(245, 158, 11, 0.2)`.
- **Low Priority:** Tinted background `rgba(100, 116, 139, 0.1)`, solid text `#64748B`, border `1px solid rgba(100, 116, 139, 0.2)`.
- **Filter Pills:** Height 28px, background `#F1F5F9`, border `1px solid transparent`, `#475569` text. When active: background `rgba(99, 102, 241, 0.1)`, border `1px solid rgba(99, 102, 241, 0.3)`, text `#4F46E5`.

### Task Items & Lists
- **Item Row:** Height 44px, background transparent, transitions to `#FFFFFF` on hover with a faint border outline and drag handle reveal (`#94A3B8`). Left edge indicates sub-tier indentation.
- **Completed State:** Title strikes through with an animated line drawing, font color transitions to `#94A3B8`, checkbox receives emerald fill `#10B981`.

### Checkboxes
- **Base:** 18x18px, border `1.5px solid #CBD5E1`, background `#FFFFFF`, `rounded` (4px).
- **Checked:** Background `#10B981`, border `#10B981`, white crisp checkmark icon (`stroke-width: 2.5`).
- **Interaction:** Micro bounce animation (`scale(0.85)` to `scale(1)`) upon toggle.

### Inputs & Command Palette
- **Text Inputs:** Height 38px, `#FFFFFF` background, `1px solid #E2E8F0` border, `rounded-md` (8px). Focus state: border `#6366F1`, ring `0 0 0 3px rgba(99, 102, 241, 0.15)`.
- **Command Palette:** Centered dialog, width 640px, frosted glass base (`#FFFFFF` with 98% opacity), search input height 56px with zero border, bottom section with keyboard shortcut indicator chips (`Kbd` style: `#F1F5F9`, border `#E2E8F0`, 11px font).

### Task Cards (Kanban)
- **Container:** Pure `#FFFFFF`, border `1px solid #E2E8F0`, `rounded-lg` (16px), padding `12px 14px`.
- **Card Content:** Title (`label-md`, `#0F172A`), bottom metadata strip hosting tag badges, due date alert with clock icon, and assignee avatar stack (20px circles with 2px white borders).