---
trigger: model_decision
description: Apply when changing PostgreSQL schemas, SQL queries, indexes, migrations, or database access code.
---
# PostgreSQL

- Treat schema changes as migrations; never silently modify production data or drop/rename columns.
- Parameterize SQL; never build queries by concatenating untrusted input.
- Add indexes only for demonstrated query patterns; explain write/storage trade-offs.
- Use transactions for multi-step writes and define sensible constraints.
- Do not run destructive SQL, reset databases, or apply migrations without explicit approval.
- Keep credentials in environment variables and use least-privilege database users.
