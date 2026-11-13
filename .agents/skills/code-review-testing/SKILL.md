---
name: code-review-testing
description: >-
  Use this skill when reviewing code changes, running frontend/backend/ML tests,
  auditing scientific claims and data leakage, or verifying NASA Space Apps
  submission readiness in AgriShift.
---

# AgriShift Code Review, Testing & Scientific Audit Skill

Checklist and verification commands for reviewing code, ML pipelines, and hackathon compliance in AgriShift.

## 1. Automated Verification Commands

Run only the narrowest check relevant to the modified subsystem:

1. **Frontend Localization & Route Integrity (`frontend/`)**:
   - Command: `cd frontend && npm test`
   - Runs `frontend/tests/verify-frontend.js` to confirm 100% key parity between `src/locales/en.json` and `src/locales/bn.json` and existence of all 15 feature page components.
2. **Frontend Production Build (`frontend/`)**:
   - Command: `cd frontend && npm run build`
3. **Backend Lint & Unit Tests (`backend/`)**:
   - Config: `antigravity-vscode-starter/pyproject.toml` (`ruff` + `pytest -q`).
   - Command: `pytest backend/tests -q` and `ruff check backend`
4. **ML Pipeline Synthetic Suite (`Ml Pipelines/`)**:
   - Command: `bash "Ml Pipelines/AgriShift_review_bundle/AgriShift_review_bundle/synthetic_tests/run_all_tests.sh"`
   - Refer to `Ml Pipelines/PIPELINE_REVIEW_GUIDE.md` Section 8 for the full geospatial ML leakage and Earth Engine review checklist.

## 2. AgriShift Review Checklist

- **Bilingual Completeness**: Are all new UI labels, warnings, units, and badges present in both `en.json` and `bn.json` (and mapped in `src/utils/farmDisplay.js` if administrative/soil values)?
- **Scientific & Data Honesty (`HACKATHON_RULES.md`)**:
  - Are sample/mock values visibly badged (`DemoBadge.jsx`) and never presented as live NASA observations or validated ML predictions?
  - Are `ECe` (saturated paste), `EC1:5`, and `ECw` (water conductivity) kept strictly separate?
  - Are satellite spatial resolutions (e.g., SMAP 9–36 km, MODIS 250 m–1 km, CHIRPS 5 km, ERA5-Land 11 km) stated so coarse pixels are not misrepresented as point field measurements?
- **ML Leakage Guardrails**:
  - Are climatological baselines (`<= 2019`) and probability thresholds (`val` split) isolated from `test` rows?
  - Does the model beat **Persistence** and **Climatology** on held-out years and `spatial_fold` blocks?
- **Secrets & Offline Safety**:
  - Confirm no `.env` values, API keys, or farmer PII are hardcoded or committed.
  - Confirm UI pages degrade gracefully when the backend or external network is unreachable.
