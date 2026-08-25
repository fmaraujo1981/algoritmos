## 2026-08-25 - Accessible Dynamic Icon-Only Delete Buttons
**Learning:** Icon-only buttons dynamically rendered via JavaScript in list/CRUD views often miss explicit accessible names for screen readers and visible tooltip descriptions for mouse/keyboard users.
**Action:** Always include an explicit `aria-label` (referencing item context where applicable) and `title` attribute on dynamically generated icon-only action buttons, and mark nested icons as `aria-hidden="true"`.
