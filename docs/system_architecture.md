# System Architecture

- `frontend/`: user interface.
- `backend/`: API routes, schemas, application services, repositories, integrations.
- `ml/`: data pipeline, experiments, training, evaluation, inference.
- `agronomy/`: crop reference data and transparent rotation rules.
- `database/`: schema, migrations, and seed data.

The frontend communicates with the backend API. Model predictions are served through the backend. Keep raw datasets and model artifacts out of Git unless an appropriate small, openly licensed sample is intentionally selected.
