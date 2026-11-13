---
name: fullstack-development
description: >-
  Use this skill when building or connecting React + Vite frontend pages/services
  and FastAPI backend endpoints, Pydantic schemas, or `/api/v1/*` integrations
  in AgriShift.
---

# AgriShift Fullstack Development Skill

Runbook for implementing and connecting AgriShift's React 18 frontend (`frontend/`) and FastAPI backend (`backend/`).

## 1. FastAPI Backend Procedure (`backend/`)

1. **Contract Alignment**: Match endpoint paths and JSON payloads in `frontend/API_INTEGRATION_NOTES.md`:
   - Farms/Regions: `GET|PUT /api/v1/farms/current`, `GET /api/v1/regions/bangladesh-coastal`
   - Soil/OCR: `POST /api/v1/soil/ocr/extract`, `POST /api/v1/soil/profile`
   - Weather: `GET /api/v1/weather/current`, `GET /api/v1/weather/historical-comparison`
   - Agronomy: `POST /api/v1/crops/suitability`, `POST /api/v1/rotation/plan`
   - Models/Alerts: `POST /api/v1/models/salinity-ec/predict`, `GET /api/v1/models/metadata/salinity`, `GET /api/v1/alerts`
2. **Module Placement**:
   - Define Pydantic models in `backend/app/schemas/`.
   - Put deterministic agronomy/hazard logic in `backend/app/services/`.
   - Register route modules in `backend/app/api/v1/`, include them in `backend/app/api/router.py`, and mount `api_router` with `prefix="/api/v1"` + `CORSMiddleware` (allowing `http://localhost:3000`) in `backend/app/main.py`.

## 2. React + Vite Frontend Procedure (`frontend/`)

1. **API Wiring with Offline Fallback**:
   - Call `request(endpoint, options)` from `frontend/src/services/apiClient.js` inside `frontend/src/services/*Service.js`.
   - Catch `ApiError` (`error.data?.isOffline` or status `0`/`408`) and gracefully fall back to the existing local fixtures (`DEMO_FARM`, `DEMO_SOIL`, `DEMO_WEATHER_DATA`, `CROPS_CATALOG`, `ROTATION_PATTERNS`) so offline demos never crash.
2. **Bilingual Parity (`bn` & `en`)**:
   - Every user-visible string must use `useTranslation()` (`t('section.key')`) and `localizeFarmValue()` (`src/utils/farmDisplay.js`).
   - Add new keys to **both** `frontend/src/locales/bn.json` and `frontend/src/locales/en.json`.
3. **Styling & Tokens**:
   - Use the Forest Green CSS custom properties in `frontend/src/styles/tokens.css` and layout classes in `globals.css`.

## 3. Verification

- Frontend parity & routes: `cd frontend && npm test`
- Frontend build: `cd frontend && npm run build`
- Backend health check: `uvicorn app.main:app --port 8000` (from `backend/`) and probe `GET /health`.
