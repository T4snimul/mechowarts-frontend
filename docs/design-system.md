# Design System

Mechowarts uses a semantic design system built with Tailwind CSS v4 and shared theme tokens.

## Tokens

Design tokens are defined in `styles/theme.css`.
Use token-based utilities instead of raw CSS values.

### Color tokens

- `bg-background`
- `text-foreground`
- `bg-card`
- `text-muted-foreground`
- `bg-primary`
- `text-primary-foreground`
- `border-border`
- `ring-ring`

### Spacing

- Use Tailwind spacing utilities.
- Prefer values such as `p-4`, `gap-6`, `space-y-8`.
- Avoid arbitrary pixel values when possible.

### Border radius

- Use the token-based radius system.
- Prefer utilities such as `rounded`, `rounded-lg`, and `rounded-full`.

### Typography

Maintain a consistent typographic hierarchy.

- Display: large hero text.
- Heading: page titles.
- Title: section headings.
- Body: paragraph text.
- Caption: secondary or supporting copy.
- Label: form labels and UI labels.

Avoid arbitrary font sizes and rely on semantic utility classes.

### Icons

- Use `lucide-react` for standard icons.
- Use custom icons in `components/icons/` only when necessary.
- Keep icons simple and aligned with the brand style.

### Animations

- Prefer subtle transitions and motion.
- Avoid excessive or distracting animation.
- Use `tw-animate-css` for lightweight effects only when needed.

## Component consistency

- Components should look like they belong to the same application.
- Reuse shared tokens and style patterns across screens.
- Avoid unique, one-off styling unless required by design.
