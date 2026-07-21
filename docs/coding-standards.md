# Coding Standards

These standards keep the codebase predictable and maintainable.

## TypeScript

- Do not use `any`.
- Prefer `type` or `interface` for object shapes.
- Keep types narrow and expressive.
- Use `readonly` on props and data when values should not mutate.
- Favor `const` over `let` unless reassignment is required.

## React

- Prefer Server Components by default.
- Use `use client` only when hooks or browser APIs are required.
- Keep components small and single-purpose.
- Pass data via props rather than importing stateful logic.
- Prefer composition over prop drilling when building layout.

## Styling

- Use Tailwind utility classes.
- Use semantic token classes such as `bg-background`, `text-foreground`, and `border-border`.
- Avoid hardcoded colors and arbitrary spacing values.
- Use `cn` helper for conditional class names.
- Keep class names readable and grouped logically.

## Imports

- Import packages first.
- Then import absolute alias paths such as `@/components`.
- Then import relative paths.
- Keep import statements sorted and grouped.

## Formatting

- Use Prettier for formatting.
- Run `pnpm format` before committing.
- Run `pnpm lint` to catch errors and style issues.

## Commit Messages

- Use clear, concise commit messages.
- Prefer conventional prefixes such as `feat:`, `fix:`, `docs:`, `refactor:`, `style:`.

## Comments

- Add comments only when the code is not self-explanatory.
- Prefer meaningful names over explanatory comments.
- Keep comments short and focused.
