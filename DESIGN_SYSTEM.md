# Portfolio Design System & UI/UX Guide

Use this document as the reference when building new sections, pages, or components for this portfolio website.

---

## Core Principles

1. **Dark minimalism** — Near-black background (`hsl(0 0% 2%)`), white text at varying opacities. No bright colors except `emerald-500/60` for status indicators.
2. **Glassmorphism** — Subtle `backdrop-blur-md` with `bg-white/[0.03-0.08]` and `border-white/[0.06-0.1]`.
3. **Motion with purpose** — Smooth 0.3-1s animations. Every motion should communicate something (entrance, scroll progress, interactivity).
4. **Content through restraint** — Generous whitespace, sparse elements, let things breathe.
5. **Monochromatic opacity palette** — Hierarchy is controlled by white opacity, not color.
6. **Responsive-first** — Desktop and mobile are often completely different layouts (not just scaled).

---

## Color & Opacity

### Text opacity hierarchy

| Opacity | Usage |
|---------|-------|
| `text-white` | Primary headings, hero text |
| `text-white/90` | Bold project titles, contribution titles on hover |
| `text-white/80` | Stat values, feature titles, floating card values |
| `text-white/50` | Rotating words, CTA text, tech tags |
| `text-white/40-45` | Body text, descriptions |
| `text-white/30` | Subtle labels, stat labels, taglines |
| `text-white/25` | Section info lines, name label |
| `text-white/20` | Section labels, faint labels, URL bar text |
| `text-white/15` | Scroll hints, very faint text |
| `text-white/[0.06-0.07]` | Ghost text (letter reveals, contribution numbers) |

### Background opacity hierarchy

| Opacity | Usage |
|---------|-------|
| `bg-white/[0.015]` | Ambient glow blur backdrops |
| `bg-white/[0.02]` | Subtle glow behind phone frames |
| `bg-white/[0.03]` | Glass card default, browser chrome bar |
| `bg-white/[0.04]` | Floating cards, pill button default |
| `bg-white/[0.05]` | Button hover fill |
| `bg-white/[0.08]` | Strong hover state |

### Border opacity hierarchy

| Opacity | Usage |
|---------|-------|
| `border-white/[0.06]` | Very subtle borders, dividers between rows |
| `border-white/[0.08]` | Default card/button borders |
| `border-white/[0.1]` | Slightly stronger borders, phone frames |
| `border-white/[0.15]` | Hover state borders |
| `border-white/20` | Strong hover borders, visible dividers |

---

## Typography

### Font

**Manrope** (Google Font) — weights 200, 300, 400, 500, 600, 700, 800. Applied as `font-sans` via `--font-manrope`.

### Size scale

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero heading ("I build") | `text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl` | `font-bold` | `tracking-tight` |
| Project titles (MUDFACE, etc.) | `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` | `font-extrabold` | `tracking-tight` |
| Case study letter reveals | `text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem]` | `font-extrabold` | `tracking-tight` |
| Homepage letter reveals | `text-4xl sm:text-6xl md:text-7xl lg:text-[9rem]` | `font-extrabold` | `tracking-tight` |
| Contribution titles | `text-lg sm:text-xl md:text-2xl` | `font-semibold` | `tracking-tight` |
| Feature titles | `text-lg sm:text-xl` | `font-semibold` | `tracking-tight` |
| Body/description text | `text-base sm:text-lg` | `font-light` | default |
| Section labels | `text-[10px] sm:text-xs` | `font-medium` | `tracking-[0.35em]` uppercase |
| Info/meta text | `text-xs sm:text-sm` | `font-medium` | `tracking-[0.2em]` uppercase |
| Stat values | `text-3xl sm:text-4xl md:text-5xl` | `font-bold` | `tracking-tight` |
| Stat labels | `text-xs sm:text-sm` | `font-medium` | `tracking-[0.2em]` uppercase |

### Leading

- Large titles: `leading-none` or `leading-[1.05]`
- Quotes: `leading-snug`
- Body text: `leading-relaxed`

### Tracking pattern

Smaller uppercase text gets wider tracking. Common values: `0.2em`, `0.25em`, `0.3em`, `0.35em`.

---

## Spacing

### Padding scale

| Context | Value |
|---------|-------|
| Page-level horizontal | `px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24` |
| Section content area | `px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24` |
| Narrower content | `px-6 sm:px-8 md:px-12` |
| Button large | `px-8 py-4` |
| Button small | `px-4 py-2` or `px-3 py-1.5` |

### Section spacing

| Context | Value |
|---------|-------|
| Standard section | `py-16 sm:py-24` |
| Large section | `py-20 sm:py-32` |
| Extra large section | `py-24 sm:py-32 lg:py-40` |
| Section bottom padding | `pb-20 sm:pb-32` or `pb-24 sm:pb-32` |

### Max-widths

- `max-w-7xl` — Full width content
- `max-w-6xl` — Standard content (stats, two-column layouts)
- `max-w-4xl` — Narrow content (tech tags, contributions, video)
- `max-w-lg` — Very narrow (taglines)

---

## Animation

### Universal easing

```tsx
const EASE = [0.25, 0.46, 0.45, 0.94] as const;
```

Use this for ALL framer-motion transitions. Other eases: `"easeInOut"` for looping/bobbing, `"linear"` for continuous rotations.

### Entrance patterns

```tsx
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}

// Slide up + fade
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.6, ease: EASE }}

// Slide up + blur + fade
initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ duration: 0.8, ease: EASE }}

// Scale + fade
initial={{ opacity: 0, scale: 0.92 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 1, ease: EASE }}

// Slide from left
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-40px" }}
transition={{ duration: 0.6, ease: EASE }}

// Line draw
initial={{ scaleX: 0 }}
whileInView={{ scaleX: 1 }}
transition={{ duration: 0.8, ease: EASE }}
className="origin-left" // or origin-center
```

### Stagger pattern

```tsx
transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
// Common stagger values: 0.04, 0.06, 0.08, 0.1, 0.12
```

### Viewport trigger

Always use `once: true`. Use negative margins to trigger earlier:
- `-40px` — Trigger slightly before visible
- `-60px` — Standard trigger point
- `-80px` — Trigger well before visible

### Bobbing/floating

```tsx
animate={{ y: [0, -6, 0] }}
transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
// Vary duration per element (3.8-5.2s) for organic feel
```

### Scroll-linked letter reveal

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: [...] });
const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
const y = useTransform(scrollYProgress, [start, end], [40, 0]);
const blur = useTransform(scrollYProgress, [start, end], [12, 0]);
const springY = useSpring(y, { stiffness: 100, damping: 20 });
// Each letter staggered: start = i * 0.07, end = start + 0.15
```

### Rotating text (AnimatePresence)

```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={currentWord}
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
    transition={{ duration: 0.5, ease: EASE }}
  />
</AnimatePresence>
```

### Animated counter

```tsx
// Cubic ease-out: 1 - Math.pow(1 - progress, 3)
// Duration: 2200ms, triggered once on viewport entry
// Uses requestAnimationFrame for smooth counting
```

---

## Component Patterns

### Browser frame

```
┌─────────────────────────────────────────┐
│ ● ● ●        [ site.com ]              │  ← bg-white/[0.03], border-b
├─────────────────────────────────────────┤
│                                         │
│              <video>                    │  ← aspect-video
│                                         │
└─────────────────────────────────────────┘  ← rounded-xl sm:rounded-2xl, video-glow
```

### Phone frame

```
         ┌──────────────┐
         │   ┌──notch──┐ │  ← w-28 h-6 bg-black rounded-b-2xl
         │   └─────────┘ │
         │               │
         │   <video>     │  ← aspect-[9/19.5]
         │               │
         │               │
         └──────────────┘  ← rounded-[2.5rem], border-2 border-white/[0.1]
```

### Glass pill button (CTA)

```tsx
<div className="group relative inline-flex items-center gap-3 px-8 py-4
                border border-white/[0.1] rounded-full overflow-hidden
                hover:border-white/[0.25] transition-all duration-500">
  {/* Slide fill */}
  <div className="absolute inset-0 bg-white/[0.05]
                  -translate-x-full group-hover:translate-x-0
                  transition-transform duration-500 ease-out" />
  <span className="relative z-10 ...">Label</span>
  <ArrowRight className="relative z-10 ... group-hover:translate-x-1" />
</div>
```

### Glass nav pill (back button)

```tsx
<Link className="group flex items-center gap-2 px-4 py-2 rounded-full
                 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md
                 hover:bg-white/[0.08] hover:border-white/[0.15]
                 transition-all duration-300">
  <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white/70" />
  <span className="text-xs text-white/40 tracking-wider uppercase font-medium
                   group-hover:text-white/70">Back</span>
</Link>
```

### Tech tag pill

```tsx
<span className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium
                 text-white/50 border border-white/[0.08] rounded-full
                 hover:text-white/70 hover:border-white/20
                 transition-colors duration-300">
```

### Section label

```tsx
<span className="text-[10px] sm:text-xs text-white/20 tracking-[0.35em]
                 uppercase font-medium">
  Label / Date
</span>
```

### Contribution row

```tsx
<div className="group grid grid-cols-[auto_1fr] gap-4 sm:gap-6 md:gap-8
                py-6 sm:py-8 border-b border-white/[0.06] last:border-b-0
                hover:border-white/[0.12] transition-colors duration-500">
  {/* Number (huge, ghost) + horizontal line */}
  {/* Title + description */}
</div>
```

### Stat card

```tsx
// Animated counter with useAnimatedCounter hook
// Value: text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums
// Suffix: text-white/40
// Label: text-xs sm:text-sm text-white/30 uppercase tracking-[0.2em]
```

---

## Background Effects

### Noise grain overlay

```tsx
<div className="absolute inset-0 noise-overlay opacity-[0.012] pointer-events-none" />
```

Use on every major section.

### Ambient glow

```tsx
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="w-[80%] h-[70%] bg-white/[0.015] rounded-full blur-[100px]" />
</div>
```

### Video glow

Apply class `video-glow` to browser/phone frame containers.

### Section divider

```tsx
<motion.div
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  viewport={{ once: true, margin: "-20px" }}
  transition={{ duration: 1.2, ease: EASE }}
  className="w-16 h-px bg-white/10 origin-center" // or section-divider class
/>
```

### Gradient edge masks

```tsx
<div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
```

---

## Hover & Interaction

### Standard transition durations

- Color changes: `duration-300`
- Border/background: `duration-300` to `duration-500`
- Transform/slide: `duration-500`
- Line growth: `duration-500` to `duration-700`

### Group hover pattern

Use Tailwind `group` + `group-hover:` for coordinated hover states on parent containers. Multiple children can respond independently to the same hover.

### Common hover pairs

```
text-white/40  →  group-hover:text-white/70
text-white/50  →  group-hover:text-white/80
border-white/[0.08]  →  hover:border-white/[0.15]
bg-white/[0.04]  →  hover:bg-white/[0.08]
```

---

## Z-Index Layers

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Background effects | none | Blobs, code rain, ambient glows |
| Grain overlay | `z-[1]` or `z-[2]` | Noise texture |
| Main content | `z-10` | All interactive content |
| Fixed navigation | `z-50` | Back button |

---

## Responsive Strategy

- **`lg` (1024px)** is the primary layout breakpoint — desktop vs mobile layouts switch here
- Desktop often uses fundamentally different layouts (horizontal scroll, sticky columns) rather than just stacking
- Mobile layouts use `lg:hidden`, desktop uses `hidden lg:block`
- Text scales aggressively: `text-[10px] sm:text-xs` at the small end, `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` at the large end
- Padding scales: `px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24`

---

## Section Differentiation Strategy

Each homepage project section must be visually distinct:

| Section | Layout | Title Style | Video | CTA |
|---------|--------|-------------|-------|-----|
| Mudface | Centered vertical | Ghost letters (scroll-linked) | Web + phone side-by-side | Magnetic circle |
| TaskMind | Horizontal scroll panels | Solid stagger-in letters | Browser frame + floating cards | Slide pill |
| PractApp | Sticky phone + scrolling cards | Bold direct render | Phone frame with 3D tilt | Slide pill |

When adding new sections, avoid repeating these exact patterns. Consider: parallax reveals, split-screen, timeline layouts, card carousels, etc.
