# Design System

The design system defines the visual language of Mechowarts.

Components should never invent their own styles.

Always reuse the design tokens.

---

# Border Radius

- xs
- sm
- md
- lg
- xl
- 2xl
- full

---

# Spacing

Use Tailwind spacing scale only.

Never use arbitrary spacing values unless absolutely necessary.

Examples:

p-4

gap-6

space-y-8

---

# Typography

Use semantic typography.

Examples:

Display

Heading

Title

Body

Caption

Label

Never style text using random font sizes.

---

# Colors

The application uses semantic color tokens.

Never reference raw color values inside components.

Always use semantic utilities.

Examples:

- bg-background
- text-foreground
- bg-card
- text-muted-foreground
- bg-primary
- text-primary-foreground
- border-border
- ring-ring

The actual color values are defined in `globals.css`.

Components must never depend on specific hex values.

---

# Icons

Use lucide-react by default.

Use custom SVG icons only when necessary.

---

# Animations

Prefer subtle animations.

Avoid unnecessary motion.

Use CSS transitions before animation libraries.

---

# Component Philosophy

Every component should look like it belongs to the same application.

Consistency is more important than uniqueness.

---

# Typography

The application uses a semantic typography scale.

Avoid styling text with arbitrary sizes.

Instead, each piece of text should represent a role.

## Display

Used for hero sections and landing pages.

## Heading

Used for page titles.

## Title

Used for section titles.

## Body

Default paragraph text.

## Caption

Secondary information.

## Label

Forms, buttons, and UI controls.

---

## Rules

- Use Tailwind typography utilities.
- Use font-medium only when emphasis is needed.
- Maintain a consistent hierarchy throughout the application.
- Avoid arbitrary font sizes unless required by the design.
