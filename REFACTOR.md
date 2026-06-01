# Refactor Backlog

## Small Cleanup

- [ ] Remove debug logging from route and form handlers.
  Replace `console.log` calls in `RouteProvider` and auth form submit handlers with real mutation flows, toast/error handling, or no-op placeholders while the backend work is pending.

- [ ] Fix typo in `SignupFrom.tsx`.
  Rename the file to `SignupForm.tsx` and update the import in `src/main.tsx` so component names and file names stay predictable.

- [ ] Finish landing page metadata.
  Replace the incomplete `description` meta content in `src/pages/LandingPage/index.tsx` with a real description and consider centralizing page titles/descriptions in a small SEO helper.

- [ ] Replace placeholder and hard-coded auth copy.
  Move values like `2408020@student.ruet.ac.bd`, `Tasnimul Hasan`, and dashboard lorem ipsum into real data sources, route params, or clearly named mock fixtures.

- [ ] Standardize formatting in local utility files.
  Run the formatter or manually align semicolon/import style in files such as `src/lib/utils.ts`, `src/components/nav-user.tsx`, and generated UI wrappers so diffs stay smaller.

- [ ] Make external links use regular anchors.
  Replace `NavLink` for the Discord URL with an `<a>` element plus `rel="noreferrer"` because React Router links are meant for app routes.

- [ ] Remove stale build output from version control.
  `dist/` is ignored but currently present in the tree; remove tracked build artifacts if they are committed and rely on Vite/Vercel builds instead.

## Lint And Type Health

- [ ] Fix current lint failures.
  Move non-component exports such as `buttonVariants`, `SIDEBAR_COOKIE_NAME`, or `toggleVariants` into companion files, then update imports so `react-refresh/only-export-components` passes.

- [ ] Rework viewport hooks to satisfy React 19 lint rules.
  Update `useBreakpoint` and `useIsMobile` to initialize from a lazy state function or `useSyncExternalStore`, then subscribe to media query changes without synchronous `setState` inside effects.

- [ ] Tighten API error typing.
  Replace the handwritten `ApiError` cast with Axios-aware narrowing, such as `axios.isAxiosError`, and return normalized error messages from a small API helper.

- [ ] Add stricter form schemas for numeric codes.
  Extend `rollSchema` and `otpSchema` with digit-only validation so pasted non-digit strings cannot pass just because their length matches.

- [ ] Add a test script before auth behavior grows.
  Introduce Vitest and React Testing Library for schema, hook, and form flow tests, then wire `npm test` into CI or the normal verification checklist.

## Component Deduplication

- [ ] Extract shared auth form branding.
  The logo, app name, title block, and centered intro layout are repeated across auth forms; create an `AuthFormHeader` component that accepts `title`, `description`, and optional children.

- [ ] Extract shared password fields.
  Signup and reset password forms duplicate password/confirm-password markup and validation display; move this into a reusable component or field helper that receives the form object and field IDs.

- [ ] Create reusable OTP slot components.
  Roll and OTP forms both hand-write `InputOTPSlot` sequences; create a small `OtpSlots` helper that renders grouped slots from a length/grouping config.

- [ ] Centralize form error rendering.
  Replace repeated `form.formState.errors.field && <FieldDescription>` blocks with a small `FormError` component that accepts an error object.

- [ ] Move landing feature-card data out of JSX.
  Extract the hero feature list into a typed constant so future content edits do not touch component structure.

## Routing And Navigation

- [ ] Move route definitions out of `main.tsx`.
  Create a `src/routes.tsx` or route tree module so `main.tsx` only mounts providers and the router.

- [ ] Replace hash sidebar URLs with real app routes.
  Convert `#` links in `AppSidebar` data into route paths and use React Router `Link`/`NavLink` so active states, keyboard behavior, and navigation history work correctly.

- [ ] Derive breadcrumbs from route metadata.
  The app shell currently hard-codes `Home`; add route labels or a route config map so nested dashboard pages can render accurate breadcrumbs.

- [ ] Replace custom back context with route-aware helpers.
  `RouteProvider` only stores `handleBack`; consider a `useBackNavigation` hook that reads `location.state.from`, validates same-app destinations, and falls back safely.

- [ ] Split public, auth, and dashboard layouts.
  Keep `LandingPage`, `Auth`, and dashboard shell as explicit layout routes to make future protected routing and lazy loading easier.

## State And Data Flow

- [ ] Move mock sidebar user/nav data to fixtures or config.
  Extract the `data` object from `AppSidebar` into typed navigation config and a temporary mock user fixture until real auth state exists.

- [ ] Introduce an auth/session query layer.
  Add hooks such as `useCurrentUser`, `useCheckRoll`, `useLogin`, and `useLogout` around React Query mutations and queries instead of calling API functions directly in form components.

- [ ] Normalize auth flow state.
  Avoid depending on cached `["user", roll]` data for the login route; persist the roll/user lookup in URL-safe route state, query cache with clear stale times, or a dedicated auth flow store.

- [ ] Implement real submit paths for auth forms.
  Wire signup, login, OTP verification, password reset, resend OTP, and Google login buttons to API mutations with loading, success, and error states.

- [ ] Add protected dashboard routing.
  Gate `/dashboard/*` behind session state, redirect anonymous users to `/auth`, and preserve the intended destination for post-login navigation.

## Styling And Design System

- [ ] Consolidate logo usage.
  Create a `BrandMark` or `AppLogo` component so logo size, background, alt text, and app name are consistent across header, auth forms, and sidebar.

- [ ] Review icon library usage.
  The project uses both `lucide-react` and Hugeicons; either keep both intentionally with documented roles or standardize on one library to reduce bundle size and design variance.

- [ ] Move custom SVG icons into assets/components.
  Extract `DiscordIcon` from the footer into a shared icon component or use an installed icon package if available.

- [ ] Audit dark mode readiness.
  Components include dark tokens and image filters, but there is no visible theme toggle or theme persistence; decide whether dark mode is supported now or remove partial behavior until it is.

- [ ] Reduce global CSS surface.
  Keep tokens in `src/index.css`, but move reusable component-specific utilities such as `.digit-slot` closer to the OTP input abstraction when it exists.

## Performance And Bundling

- [ ] Optimize the logo asset.
  The built logo asset is about 1.8 MB; simplify/compress the SVG or provide a smaller app-logo version for repeated UI use.

- [ ] Add route-level code splitting.
  Lazy-load landing, auth, dashboard, and future feature pages with `React.lazy` or router lazy APIs to address the current large bundle warning.

- [ ] Review font imports.
  `@fontsource-variable` emits many font subsets; import only the needed weights/subsets or self-host a trimmed font set if bundle size matters.

- [ ] Remove unused generated UI components.
  Check which `src/components/ui/*` components are actually imported and delete unused shadcn outputs to reduce maintenance noise.

## Larger Architecture

- [ ] Organize by feature domain.
  Move auth forms, schemas, API calls, and route components into a `features/auth` folder; do the same later for dashboard, resources, tools, and landing content.

- [ ] Define shared API contracts.
  Co-locate request/response Zod schemas or generated API types with API clients so frontend validation and backend contracts stay aligned.

- [ ] Introduce app-level error and loading boundaries.
  Add route-level pending states, not-found handling inside dashboard routes, and an error boundary for failed lazy imports or API bootstrapping.

- [ ] Build a real dashboard information architecture.
  Replace placeholder dashboard content with route modules for schedule, family, resources, tools, and profile, then let sidebar config drive navigation to those modules.

- [ ] Add CI quality gates.
  Run `npm run lint`, `npm run build`, and future tests on pull requests so refactors stay safe as the app grows.
