# Mechowarts AI Development Guide

## Project Goal

Build a production-ready Next.js application with a clean, scalable architecture.
The Figma-generated code in `figma-generated/` is a visual reference only and must never be copied directly.

## Current Implementation

- Home page is implemented in `app/page.tsx`.
- The home page composes `RootHeader`, `Hero`, and `RootFooter` from `components/shared/`.
- The application shell is defined in `app/layout.tsx` using `next/font` and global styles.
- Design tokens and theme values are defined in `styles/theme.css`.
- `components/ui/` contains shadcn-generated UI primitives.
- `components/dashboard/` contains dashboard scaffold components.

---

## Core Principles

- Prioritize maintainability over speed.
- Build reusable components.
- Keep business logic separate from UI.
- Write simple, readable code.
- Never duplicate code.
- Prefer composition over inheritance.

---

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Zustand
- Sonner
- lucide-react
- pnpm

---

## Rules

- Never use `any`.
- Prefer Server Components by default.
- Mark a component as `use client` only when it needs browser APIs, hooks, or local state.
- Keep `app/` route files focused on routing and composition.
- Put reusable UI in `components/`.
- Keep business logic in `lib/`, future feature modules, or dedicated `stores/`/`services/` directories.
- Reuse components before creating new ones.
- Validate all user input with Zod.
- Never hardcode colors or spacing values if a design token exists.
- Keep imports organized: external packages first, then aliases, then relative paths.
- Keep files small and focused.
- Do not copy UI code directly from `figma-generated/`.

---

## Component Placement

- `components/ui/` contains design-system building blocks and shadcn wrappers.
- `components/shared/` contains reusable application-level components such as headers, footers, hero sections, and cards.
- `components/dashboard/` contains dashboard-specific layout and navigation components.
- `components/icons/` contains custom icon components.

---

## Documentation

- Use `docs/` to capture conventions, architecture, workflow, deployment, and security.
- Update docs whenever architecture or workflow decisions change.
- The docs are the source of truth for project-wide conventions.

---

## Figma Workflow

Never copy generated code directly.

Instead:

1. Study the design.
2. Identify reusable UI pieces.
3. Build reusable components.
4. Assemble pages from reusable components.

The generated project is a design reference, not the application's source code.
