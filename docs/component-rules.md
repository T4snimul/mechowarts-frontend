# Component Rules

This project separates generic UI primitives from application-specific UI.

## Component placement

- `components/ui/` for shadcn/ui primitives and shared building blocks.
- `components/shared/` for reusable application components used across multiple pages.
- `components/dashboard/` for dashboard-specific layouts and navigation.
- `components/icons/` for custom SVG icons.

## Responsibilities

- UI components should be presentation-focused.
- Avoid embedding business logic directly in components.
- Keep state minimal and local.
- Accept data and callbacks through props.
- Prefer composition to inheritance.

## Reusability

- Reuse an existing component before adding a new one.
- If a component is used in only one place and is small, place it near the page it serves.
- Avoid creating domain-specific components inside `components/ui/`.

## Client vs Server Components

- Default to Server Components in `app/`.
- Add `use client` only when a component uses hooks, browser APIs, or local state.
- If a component requires `use client`, keep it as small as possible and wrap only the parts that need it.

## Naming

- Use descriptive names.
- Prefer PascalCase for component names.
- Keep filenames aligned with the component export.

## Styling

- Prefer utility classes and semantic tokens.
- Keep component styles consistent with the design system.
- Avoid magic numbers and hardcoded values.

## When to create new components

Create a new component when:

- The UI element is reused in multiple places.
- The markup is complex enough to deserve its own file.
- It improves readability and separation of concerns.
