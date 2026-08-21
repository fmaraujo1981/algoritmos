## 2026-08-21 - Accessible Dynamic Action Buttons & Keyboard Navigation

**Learning:** Dynamic DOM lists (like client-side JSON CRUD items) often generate icon-only action buttons without accessible labels or keyboard focus rings, making them invisible or ambiguous to assistive technologies and keyboard-only users.

**Action:** Always include dynamic contextual `aria-label`s (e.g., `Excluir tarefa ${item.titulo}`), decorative icon `aria-hidden="true"`, native `title` attributes, and explicit `:focus-visible` CSS rings for interactive elements.
