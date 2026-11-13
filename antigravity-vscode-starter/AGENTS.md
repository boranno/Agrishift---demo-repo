# Workspace rules

- Read only the files needed for the requested task; inspect the project tree before assuming its structure.
- Before editing, state a short plan and identify files likely to change. Wait for approval for broad, destructive, security-sensitive, or database-schema changes.
- Prefer the smallest focused diff. Preserve existing conventions and working code; do not refactor unrelated files.
- Do not install, upgrade, or remove dependencies without explaining the need and asking first.
- Never expose, print, commit, or hardcode secrets. Use environment variables and `.env.example` placeholders.
- Do not read or modify datasets, model binaries, caches, build outputs, virtual environments, or generated files unless explicitly required.
- Run the narrowest relevant formatter, linter, type check, and tests. Report commands and actual results; never claim unrun checks passed.
- Keep explanations concise. Finish with changed files, verification, and remaining risks.
