---
name: project-architecture
description: >-
  Use this skill when planning cross-cutting features, navigating the AgriShift
  repository, reconciling frontend/backend/ML boundaries, or updating
  architectural and Space Apps compliance documentation.
---

# AgriShift Project Architecture Skill

Guides architectural decisions and boundary management across AgriShift's subsystems without re-scanning the entire repository.

## 1. Subsystem Map & Current Boundaries

- **Frontend (`frontend/`)**: React 18 + Vite 5 SPA (16 routes in `src/App.jsx`, Bangla `bn` default via `LanguageContext.jsx`, farm/soil state in `FarmContext.jsx`). Currently runs client-side rules and fixtures in `src/services/*.js`; `src/services/apiClient.js` targets `VITE_API_BASE_URL` (`http://localhost:8000/api/v1`) and awaits backend wiring.
- **Backend (`backend/`)**: FastAPI entry in `app/main.py` (`GET /health`), router in `app/api/router.py`, and module scaffolds (`api/v1/`, `schemas/`, `services/`, `repositories/`, `models/`, `integrations/`).
- **Database (`database/`)**: Migrations/schema/seeds target PostgreSQL 17 (`antigravity-vscode-starter/docker-compose.yml`). Full relational design lives in `docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md` Section 6.
- **ML (`Ml Pipelines/` & `ml/`)**: Active GEE/Colab hazard notebooks (`01`–`10` in `Ml Pipelines/AgriShift_review_bundle/AgriShift_review_bundle/` and `Ml Pipelines/Drougth/`). Production inference modules belong in `ml/src/` and artifacts in `ml/artifacts/`.
- **Agronomy (`agronomy/`)**: Canonical crop catalogs, calendars, salinity thresholds, and rotation rules.

## 2. Architectural Workflow

1. **Consult Existing Architecture Maps First**:
   - Read `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`, and `PROJECT_STATUS.md` before scanning folders.
   - Check `frontend/API_INTEGRATION_NOTES.md` for `/api/v1/*` request/response contracts.
2. **Enforce Scientific & Hackathon Integrity (`HACKATHON_RULES.md`)**:
   - Keep deterministic agronomic/scientific calculations separate from UI components and LLM text.
   - Distinguish live NASA/GEE observations, cached district summaries, lab measurements (`ECe` vs `EC1:5` vs `ECw`), and sample fixtures (`DemoBadge.jsx`).
   - Keep unvalidated ML models behind `ModelUnavailableBanner.jsx` (`status: "under_development"`).
3. **Sync Documentation on Structural Changes**:
   - Update `ARCHITECTURE.md` or `PROJECT_STATUS.md` when wiring a new `/api/v1/*` endpoint or ML artifact.
   - Record any AI-assisted work in `docs/AI_USE.md`.
