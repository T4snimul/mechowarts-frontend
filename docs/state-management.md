# State Management

The project currently uses a minimal state surface, with provisions for future state management.

## Patterns

- Prefer local React state for component-specific UI.
- Use server components for static or server-rendered data.
- Use Zustand for shared client state when needed.
- Use TanStack Query for asynchronous server state.

## Recommendations

- Keep state close to the component that uses it.
- Avoid global state for simple UI toggles.
- Use dedicated store files under `lib/` or a `stores/` directory if shared state grows.
- Use `use client` only for components that require browser state.

## Example usage

- Local state: modal visibility, dropdown open state.
- Shared state: current dashboard filter, theme selection, sidebar collapsed state.
- Server state: course data, progress metrics.

## Future work

- Add a small Zustand store for dashboard preferences.
- Add React Query hooks for API-driven data.
