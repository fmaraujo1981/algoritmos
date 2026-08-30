## 2026-08-30 - Live Regions & Dynamic Icon Buttons
**Learning:** Dynamic DOM content rendered by client JS (simulators, lists) isn't announced by screen readers unless containers have `aria-live="polite"`. Dynamic icon buttons require descriptive `aria-label` attributes incorporating item metadata.
**Action:** Always add `aria-live="polite"` on output/feedback boxes and build dynamic `aria-label` strings for generated icon-only action buttons.
