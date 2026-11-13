# Antigravity + VS Code starter configuration

## Apply
1. Back up your project first.
2. Copy `AGENTS.md`, `.agents/`, `.vscode/`, `.gitignore`, `pyproject.toml`, and optionally the Docker files into the repository root.
3. Review `.gitignore` before committing; remove any patterns for artifacts you intentionally version.
4. Copy `.env.example` to `.env` and replace the local password. Never commit `.env`.
5. Open the repository root as the workspace in Antigravity and VS Code.
6. In Antigravity, check Customizations > Rules and verify the workspace rules are detected.

## Start PostgreSQL only when needed
- `docker compose up -d db`
- `docker compose ps`
- `docker compose logs -f db`
- `docker compose down` (keeps the named volume)
- `docker compose down -v` **deletes database data**; use only when you intentionally want a reset.

## Quota-saving workflow
1. Use Tab completion for predictable boilerplate.
2. Ask the agent to inspect a small named area and propose a plan.
3. Approve one bounded change at a time.
4. Ask it to run only the relevant test/lint/build command.
5. Reuse the same task conversation while it remains focused; start a new one when changing project/task context.
6. Avoid asking agents to repeatedly summarize the whole repository. Keep a short `README.md` architecture map and update it only when architecture changes.
7. Use `model_decision` rules for detailed domain guidance; only the short root `AGENTS.md` is always active.

## Resource-saving notes
- The VS Code exclusions reduce search/indexing and file-watcher work for common generated/large directories. They do not delete data.
- Do not exclude source code or small test fixtures.
- PostgreSQL is the only service in the Compose file; frontend and API run locally until you have a reason to containerize them.
- The Compose file binds the database to localhost only.
- This is a starter template. Check your installed Python, Node, Docker, and package-manager versions before adopting project-specific commands.
