# Palette's Journal - UX & Accessibility Learnings

## 2026-09-03 - Dynamic Template Literals & Icon-Only Button ARIA Labels
**Learning:** In vanilla JS apps using template literals to dynamically render list/CRUD items, icon-only buttons (such as trash icons) are frequently rendered without context, leaving screen reader users with unannounced controls.
**Action:** Always include item-specific descriptive attributes (`aria-label="Excluir '${item.titulo}'"`) and `aria-hidden="true"` on font icons inside dynamic template rendering functions.
