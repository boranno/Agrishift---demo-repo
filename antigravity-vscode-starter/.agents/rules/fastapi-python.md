---
trigger: model_decision
description: Apply when editing Python, FastAPI endpoints, Pydantic schemas, backend services, or Python tests.
---
# Python + FastAPI

- Keep routers thin; put business logic in services and database access in a dedicated data layer.
- Use Pydantic request/response schemas and validate external input.
- Use dependency injection for shared resources such as database sessions.
- Keep blocking work out of async endpoints; use sync endpoints or appropriate worker/background execution where suitable.
- Return consistent HTTP errors; never expose stack traces, credentials, or internal details to clients.
- Add focused pytest coverage for changed behavior. Do not run the full suite unless appropriate.
- Follow the repository's dependency manager and pinned versions.
