# Deployment

Mechowarts is built with Next.js and is optimized for deployment on platforms like Vercel.

## Local setup

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Recommended deployment

- Use Vercel for the easiest deploy experience.
- Ensure `pnpm` is enabled in the environment.
- Preserve the `pnpm-lock.yaml` file.

## CI / CD

- Use `pnpm install --frozen-lockfile`.
- Run `pnpm lint` and `pnpm build` as part of the deployment pipeline.

## Configuration

- `next.config.ts` is currently minimal.
- Keep environment variables out of source control.
- Use platform secrets for keys and tokens.

## Static assets

- Place public assets in `public/`.
- Reference them with absolute paths such as `/favicon.ico`.

## Notes

- The App Router handles rendering and routing.
- Deployment should preserve global styles and theme tokens from `styles/`.
