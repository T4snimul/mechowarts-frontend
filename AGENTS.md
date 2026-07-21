# Mechowarts AI Development Guide

## Project Goal

Build a production-ready Next.js application with a clean, scalable architecture.
The Figma-generated code in `figma-generated/` is a visual reference only and must never be copied directly.

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

---

## Rules

- Never use `any`.
- Prefer Server Components.
- Client Components only when necessary.
- One component = one responsibility.
- Keep files small.
- Reuse existing components before creating new ones.
- Validate all user input with Zod.
- Never hardcode colors or spacing values if a design token exists.
- Keep imports organized.
- Use feature-based architecture.

---

## Figma Workflow

Never copy generated code directly.

Instead:

1. Study the design.
2. Identify reusable UI pieces.
3. Build reusable components.
4. Assemble pages from reusable components.

The generated project is a design reference, not the application's source code.
