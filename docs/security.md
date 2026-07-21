# Security

Security is important even in the early stage of the project.

## Dependency management

- Keep dependencies up to date.
- Use `pnpm install` and preserve `pnpm-lock.yaml`.
- Run security audits as part of future CI.

## Secrets and environment variables

- Never commit secrets to source control.
- Store API keys and credentials in environment variables.
- Use platform secret stores in deployment.

## Input handling

- Validate input with Zod on the server.
- Sanitize any user-generated content before rendering.
- Avoid `dangerouslySetInnerHTML` unless required and safe.

## External links

- Use `rel="noreferrer noopener"` for external links opened with `target="_blank"`.
- The footer Discord link currently uses safe external link practices.

## Next.js security

- Rely on Next.js defaults for headers and routing.
- Add a Content Security Policy later if needed.
- Avoid using unsanitized data in the browser.
