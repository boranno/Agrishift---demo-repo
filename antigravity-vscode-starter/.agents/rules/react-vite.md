---
trigger: model_decision
description: Apply when editing the React + Vite frontend, browser code, UI components, or frontend build configuration.
---
# React + Vite

- Follow the existing component, routing, state, and styling conventions; do not introduce a new framework or state library without approval.
- Keep API calls in the existing service/data-access layer; avoid embedding fetch logic throughout components.
- Handle loading, empty, error, and success states.
- Keep secrets out of frontend code. Vite-exposed `VITE_*` variables are public and must never contain secrets.
- Use semantic HTML and accessible labels; keep components focused.
- Run the existing frontend lint/test/build scripts; do not invent scripts if none exist.
