## 2026-09-07 - Dynamic Icon-Only Delete Buttons
**Learning:** In interactive JavaScript simulators (e.g., Mini CRUD), dynamically rendered items with icon-only action buttons (such as delete trash icons) often lack ARIA attributes, making them inaccessible to screen readers.
**Action:** Always include item-specific `aria-label` attributes (e.g. `aria-label="Excluir ${item.titulo}"`) and mark decorative FontAwesome icons with `aria-hidden="true"`.
