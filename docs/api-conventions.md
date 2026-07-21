# API Conventions

The project currently has no server API routes implemented, but these conventions should guide future additions.

## Endpoint Structure

- Use the App Router route handler pattern under `app/api/`.
- Example: `app/api/courses/route.ts`.
- Keep route handlers small and specific to one resource.

## Request and Response Rules

- Use `POST` for mutating actions and `GET` for data retrieval.
- Send and receive JSON by default.
- Set `Content-Type: application/json` for body payloads.
- Avoid exposing internal implementation details in responses.

## Validation

- Validate incoming payloads with Zod.
- Keep request shapes and response shapes in shared types if needed.
- Reject invalid data early with clear error messages.

## Error Handling

- Return structured error responses with HTTP status codes.
- Prefer an object shape such as `{ error: "message" }`.
- Handle server errors gracefully in the UI.

## Data Fetching

- Use `fetch` with an explicit caching strategy.
- Example for server-side data:

```ts
const res = await fetch(url, { cache: "no-store" });
```

- Use Zod to parse and verify response payloads when consumed by the client.

## Shared Logic

- Keep API client helpers and shared validation schemas in `lib/`.
- Avoid duplicating request and response shapes across route handlers.
