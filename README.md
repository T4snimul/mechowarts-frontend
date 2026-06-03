### Security & Sessions

- [ ] Move auth tokens out of `localStorage` and into a secure session strategy (prefer `httpOnly`, `Secure`, `SameSite` cookies or an equivalent hardened flow)
- [ ] Add token refresh / rotation support so active sessions survive access-token expiry without forcing re-login
- [ ] Add server-side logout / token revocation and make client logout clear all auth-related cache/state
- [ ] Handle `401` / expired-session responses centrally in the API layer and trigger a clean re-auth flow
- [ ] Review redirect handling so `from` values are validated and never allow open redirects outside the app
- [ ] Add rate limiting / cooldown guidance for login, signup, OTP verify, and password reset attempts

### Core Flows

- [ ] Finish `/auth/verify` so email verification is fully supported end-to-end
- [ ] Implement the password-reset flow fully: request reset, verify OTP, set new password, and confirm success
- [ ] Add OTP resend support with expiry messaging, cooldowns, and backend error states
- [ ] Wire the Google sign-in button to a real OAuth flow or remove it until it is production-ready
- [ ] Persist auth bootstrap state so refreshes land in the correct page without flicker or false redirects
- [ ] Normalize post-login routing so verified and unverified users always land on the correct screen

### UX & Accessibility

- [ ] Add explicit loading, disabled, and retry states for every auth mutation
- [ ] Improve inline validation and server error messaging across roll, signup, login, verify, and reset forms
- [ ] Add password visibility toggles, password strength guidance, and clearer recovery copy where needed
- [ ] Keep auth screens keyboard-friendly and screen-reader friendly, especially OTP inputs and grouped controls
- [ ] Show consistent success and failure feedback after signup, verification, login, and logout

### State Management & API Hygiene

- [ ] Centralize auth state in a single source of truth instead of mixing query cache, `localStorage`, and route guards
- [ ] Add a dedicated session query or auth provider so `RequireAuth` and `GuestOnly` use the same resolved user state
- [ ] Define a typed error contract for auth responses so forms stop duplicating ad hoc Axios parsing
- [ ] Audit all query keys used for auth (`currentUser`, session cache, cached lookup users) and make them consistent
- [ ] Ensure auth-related cache is invalidated or reset on logout, token refresh failure, and account changes

### Validation & Abuse Protection

- [ ] Tighten password rules for production use and align frontend validation with backend policy
- [ ] Add resend, expiry, and attempt-limit states for OTP and password reset codes
- [ ] Add better roll/email normalization and duplicate-account handling for signup flows
- [ ] Guard against stale cached user data causing login/signup to use the wrong profile

### Testing & Verification

- [ ] Add unit tests for auth utilities, route guards, and form validation schemas
- [ ] Add integration tests for login, signup, verification, logout, and password reset flows
- [ ] Add regression coverage for redirect behavior after auth and for expired-token recovery
- [ ] Verify auth flows against production-like backend responses before release

## Product Roadmap

- [ ] Friends Feature
  - [x] Rename "Friends" to "Family"
  - [x] Series wise pages
  - [ ] Admins can lock series for a certain series
- [ ] Materials Page
- [ ] LaTeX based report cover generator
- [ ] Posting Notes
