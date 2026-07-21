# Accessibility

Accessibility is a first-class requirement for Mechowarts. Every page and component should support keyboard navigation, screen readers, and sufficient contrast.

## Principles

- Use semantic HTML whenever possible.
- Prefer native `button`, `a`, `form`, `label`, and `input` elements.
- Avoid using `div` or `span` for interactive controls unless absolutely necessary.
- Keep focus states visible and easy to follow.
- Ensure color contrast meets WCAG AA at minimum.
- Provide descriptive text for links and buttons.
- Use `aria-label`, `aria-describedby`, and `aria-hidden` only when needed.

## Keyboard Navigation

- All interactive elements must be reachable via Tab.
- Keyboard focus should be visible on every interactive element.
- Components should not trap focus unless a modal layer is active.

## Text and Structure

- Use heading levels in order.
- Avoid skipping heading levels.
- Use descriptive text for links instead of `click here`.
- Provide accessible labels for form fields and controls.

## Images and Icons

- Provide meaningful `alt` text for informative images.
- Decorative icons should use `aria-hidden="true"` or be hidden from screen readers.

## Animations and Motion

- Prefer subtle motion.
- Avoid animations that may cause distraction or motion sickness.
- Do not rely on motion alone to convey important information.

## Validation and Error States

- Ensure form feedback is announced clearly.
- Associate error messages with the correct inputs.
- Use role and state attributes when necessary.

## Testing

- Use browser accessibility tools to verify structure and contrast.
- Confirm keyboard navigation works for the home page and dashboard shell.
