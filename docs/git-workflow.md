# Git Workflow

A consistent Git workflow keeps the repository stable and easy to review.

## Branching

- Use feature branches for work: `feature/`, `fix/`, `refactor/`, `docs/`, `chore/`.
- Keep branches small and focused.
- Rebase or merge from `main` regularly to minimize drift.

## Commits

- Use clear commit messages.
- Prefer conventional prefixes:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for code changes without behavior changes
  - `docs:` for documentation updates
  - `style:` for formatting or linting changes

## Pull Requests

- Create a PR for each feature or bug fix.
- Include a short summary and list of changes.
- Link related issues or design references when available.
- Request at least one review.

## Review

- Verify the branch builds successfully.
- Confirm `pnpm lint` and `pnpm format` were run.
- Check for consistent naming and folder placement.
- Ensure the changes follow the architecture and component rules.
