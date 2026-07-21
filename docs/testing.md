# Testing

There is currently no test framework configured in the repository, but testing is the next important step.

## Recommended setup

- Add `vitest` for unit testing.
- Add `@testing-library/react` for component integration.
- Add `@testing-library/jest-dom` for DOM assertions.
- Add a `tests/` or `__tests__/` folder for test files.

## Suggested work

- Test shared components in `components/shared/`.
- Test the home page and future dashboard page behavior.
- Write unit tests for any utility functions in `lib/`.
- Add end-to-end tests when the main user flows are implemented.

## Manual validation

Until automated tests are added, use the following checklist:

- `pnpm build` completes without errors.
- Pages render without runtime warnings.
- UI is responsive on mobile and desktop.
- Links and navigation work as expected.

## Commands

- Once configured, add `pnpm test` and `pnpm test:watch` scripts.
