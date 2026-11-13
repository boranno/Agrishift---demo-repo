---
trigger: model_decision
description: Apply when working with datasets, Pandas, notebooks, feature engineering, Scikit-learn, model training, or evaluation.
---
# Data science

- Inspect file size, shape, schema, and a small sample before loading or transforming large data.
- Preserve raw data; write derived data to a separate location.
- Prefer vectorized Pandas/NumPy operations; avoid row-wise loops when practical.
- Use reproducible random seeds and split data before fitting preprocessing to prevent leakage.
- Fit preprocessing only on training data, preferably in a Scikit-learn Pipeline.
- Record evaluation metrics and compare against a simple baseline.
- Keep notebooks exploratory; move reusable production logic into importable modules.
- Do not load full datasets or model artifacts into the AI conversation.
