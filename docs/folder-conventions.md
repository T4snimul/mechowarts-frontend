# Folder Conventions

Use a clear folder structure to keep the application organized.

## Root folders

- `app/` - page routes, layouts, metadata, and route handlers.
- `components/` - reusable UI components.
- `lib/` - helper functions and shared logic.
- `styles/` - global styles and theme configuration.
- `public/` - static assets.
- `figma-generated/` - design reference only.
- `docs/` - documentation and conventions.

## app/

- Keep page files simple.
- Compose shared components.
- Avoid embedding business logic in the route files.
- Use `layout.tsx` for shared layout and metadata.

## components/

- `components/ui/` for design system primitives.
- `components/shared/` for cross-page UI such as headers, footers, and hero sections.
- `components/dashboard/` for dashboard-specific layouts and navigation.
- `components/icons/` for custom icons.

## lib/

- Place shared utility functions and helpers here.
- Avoid UI markup in `lib/`.
- Use `lib/` for functions that are consumed by multiple routes or components.

## styles/

- `styles/index.css` imports global rules, Tailwind, and theme.
- `styles/theme.css` contains semantic color variables and dark mode definitions.

## public/

- Store static media, favicons, and external assets.
- Reference them using absolute paths.

## figma-generated/

- This folder is a visual reference only.
- Do not use it as source code.
- Use it to inspect spacing, layout, and component anatomy.
