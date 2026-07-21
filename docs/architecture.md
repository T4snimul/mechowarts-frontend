# Architecture

Mechowarts is built on the Next.js App Router with a lightweight, composable structure.
The project separates application shell, shared UI, helpers, styles, and reference assets.

## Top-level folders

- `app/` - pages, layouts, metadata, and route files.
- `components/` - reusable UI components and design-system wrappers.
- `lib/` - helpers, utility functions, and shared logic.
- `styles/` - global styles, theme tokens, and Tailwind imports.
- `public/` - static assets.
- `figma-generated/` - design reference only.
- `docs/` - project documentation and conventions.

## app/

Contains Next.js route entries and page-level composition.

- `app/layout.tsx` defines the root HTML structure and global font usage.
- `app/page.tsx` defines the home page.
- `app/dashboard/` contains the dashboard route shell.

Business logic belongs in shared helpers, future feature modules, or dedicated services, not inside page JSX.

## components/

Holds reusable UI building blocks.

- `components/ui/` contains shadcn/ui primitives.
- `components/shared/` contains cross-app components such as headers, footers, and hero sections.
- `components/dashboard/` contains dashboard-specific layout components.
- `components/icons/` contains custom SVG icons.

## lib/

Contains utility functions and shared business helpers.

- Keep helper logic here when it is used by multiple parts of the application.
- Avoid placing UI logic inside `lib/`.

## styles/

Contains global CSS and theme token configuration.

- `styles/index.css` imports Tailwind, theme styles, and animate utilities.
- `styles/theme.css` defines semantic color tokens and the dark theme palette.

## figma-generated/

This folder is a visual reference only.
Do not copy implementation from `figma-generated/` into application code.
Use it only to inspect layout and component structure for design guidance.

## Design philosophy

- Favor reusable components over duplicate markup.
- Prefer composition over monolithic page implementations.
- Keep each component small and responsible for one thing.
- Use shared tokens for spacing, typography, and colors.
