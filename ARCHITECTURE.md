# AgriShift — System Architecture & Component Connections

> **Audit Status:** Verified against actual source code on `2026-11-10`.  
> **Rule Applied:** Strictly distinguishes **Implemented in Code** vs. **Planned / Specified in Docs** vs. **Not Present / UNKNOWN**.

---

## 1. High-Level System Architecture

AgriShift is an agricultural decision-support platform designed for the **NASA Space Apps 2026** challenge (*"Field Shift: Adapting Farms with NASA Data"*), targeting smallholder farmers and DAE extension officers in saline-prone coastal Bangladesh (specifically Khulna Division / AEZ 13).

### Current Reality vs. Target Architecture

```mermaid
flowchart TD
    subgraph Client["Browser Client (Implemented)"]
        UI["React 18 + Vite 5 SPA<br/>(16 Routes, Bilingual BN/EN)"]
        CTX["React Context State<br/>(FarmContext, LanguageContext)"]
        LS[("Browser localStorage<br/>agrishift_* keys")]
        SVC["Frontend Services<br/>(Rule Engines & Demo Fixtures)"]
        API_CLI["apiClient.js<br/>(Fetch Wrapper - UNUSED)"]
    end

    subgraph External_Live["External Live Web Services (Connected)"]
        OSM_TILES["OSM / Esri / CARTO<br/>Map Raster Tiles"]
        NOM["OSM Nominatim API<br/>(Search & Reverse Geocode)"]
        MIT["MIT Eltahir Group Server<br/>(Salinity PNG Rasters 2000-2050)"]
    end

    subgraph Backend_Layer["FastAPI Backend (Scaffold Only)"]
        MAIN["backend/app/main.py<br/>(GET /health only)"]
        ROUTER["backend/app/api/router.py<br/>(Empty APIRouter, unwired)"]
    end

    subgraph Data_Storage["Database Layer (Not Connected)"]
        PG[("PostgreSQL 17-alpine<br/>(antigravity-vscode-starter/docker-compose.yml)")]
        DB_DIR["database/migrations & schema<br/>(Empty .gitkeep)"]
    end

    subgraph ML_Layer["Machine Learning Layer (Disconnected)"]
        COLAB["Ml Pipelines/ (Google Colab + GEE)<br/>10 Notebooks: Drought, Flood, Waterlogging, Surge"]
        GDRIVE[("Google Drive / GEE Exports<br/>(5.33M-row Drought Parquet, LightGBM models)")]
        ML_DIR["ml/ (Repo ML Directory)<br/>(Empty .gitkeep)"]
    end

    subgraph IoT_Layer["IoT / ESP32 Layer (Rules Only - No Code)"]
        ESP["ESP32 Sensor Nodes<br/>(No firmware or endpoints in repo)"]
    end

    UI <--> CTX
    CTX <--> LS
    UI --> SVC
    SVC <--> LS
    UI -->|"MapLibre GL"| OSM_TILES
    SVC -->|"fetch() in geocodingService.js"| NOM
    UI -->|"<img> src"| MIT

    SVC -.->|"NOT WIRED (Planned Part 2)"| API_CLI
    API_CLI -.->|"HTTP /api/v1 (Unimplemented)"| MAIN
    MAIN -.->|"No DB driver installed"| PG
    MAIN -.->|"No model loading code"| ML_DIR
    COLAB -->|"Runs in Colab/GEE"| GDRIVE
    GDRIVE -.->|"Not exported to repo"| ML_DIR
    ESP -.->|"No REST route exists"| MAIN
```

---

## 2. Verification of the 6 Core System Connections

Below is the exact code-verified status of every architectural link requested in Phase 2:

### 2.1 React Frontend → FastAPI Backend
- **Status:** **DISCONNECTED (Planned Contract Only).**
- **Verified Facts:**
  - [`frontend/src/services/apiClient.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/apiClient.js) implements a `request(endpoint, options)` wrapper around `fetch()` targeting `import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'` with an 8-second `AbortController` timeout and an `ApiError` class that tags network failures with `{ isOffline: true }`.
  - **However, `apiClient.js` is not imported by any page, component, or service in `frontend/src/`.**
  - All frontend services ([`cropService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/cropService.js), [`rotationService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/rotationService.js), [`soilService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/soilService.js), [`weatherService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/weatherService.js), [`alertService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/alertService.js), [`modelService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/modelService.js), [`farmService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/farmService.js)) return in-memory constants, deterministic client-side calculations, or `localStorage` state directly.
  - The only live `fetch()` calls in the frontend are inside [`frontend/src/services/geocodingService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/geocodingService.js) (`searchPlaces` and `reverseGeocode`), which call `https://nominatim.openstreetmap.org` directly from the browser.
  - In addition, [`SalinityPredictionPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/SalinityPrediction/SalinityPredictionPage.jsx) loads external PNG rasters directly from `https://www.mit.edu/~eltahirgroup/DST_SoilSalinity/data/...` and [`FarmMapViewer.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/components/maps/FarmMapViewer.jsx) loads map tiles from OpenStreetMap, Esri World Imagery, and CARTO Voyager.
  - [`frontend/API_INTEGRATION_NOTES.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/API_INTEGRATION_NOTES.md) documents 11 planned `/api/v1/*` endpoints, none of which exist in the backend yet.

### 2.2 FastAPI → PostgreSQL
- **Status:** **NOT IMPLEMENTED.**
- **Verified Facts:**
  - [`backend/requirements.txt`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/requirements.txt) lists only 4 packages: `fastapi`, `uvicorn[standard]`, `pydantic-settings`, and `python-multipart`. Neither `sqlalchemy`, `sqlmodel`, `psycopg`, `asyncpg`, nor `alembic` is listed in `requirements.txt`.
  - [`backend/app/models/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/models), [`backend/app/repositories/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/repositories), and [`database/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/database) contain only `.gitkeep` files.
  - A Docker Compose service for `postgres:17-alpine` exists in [`antigravity-vscode-starter/docker-compose.yml`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/antigravity-vscode-starter/docker-compose.yml) (along with a sample `DATABASE_URL=postgresql+psycopg://app:replace-me@localhost:5432/app` in [`antigravity-vscode-starter/.env.example`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/antigravity-vscode-starter/.env.example)), and a normalized relational schema for 13+ tables is specified in [`docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md#L382-L455), but no SQL DDL or Python database code has been written yet.

### 2.3 FastAPI → Machine Learning Components
- **Status:** **NOT IMPLEMENTED.**
- **Verified Facts:**
  - [`backend/app/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app) has no ML inference service, no model loader, and no dependency on `scikit-learn`, `lightgbm`, `joblib`, `pandas`, or `numpy`.
  - [`ml/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/ml) has [`ml/requirements.txt`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/ml/requirements.txt) (`pandas`, `numpy`, `scikit-learn`, `joblib`), but all its folders (`ml/artifacts/`, `ml/src/`, `ml/data_pipeline/`, `ml/datasets/`) are empty.

### 2.4 ESP32 → FastAPI APIs
- **Status:** **NO SOURCE CODE PRESENT (AI Coding Rule & Domain Caveat Only).**
- **Verified Facts:**
  - There is **no ESP32 firmware** (`.ino`, `.cpp`, `.c`, `platformio.ini`, or MicroPython script) and **no IoT ingestion endpoint** anywhere in the repository.
  - The only references to ESP32 or sensors in the repository are:
    1. [`antigravity-vscode-starter/.agents/rules/esp32-rest.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/antigravity-vscode-starter/.agents/rules/esp32-rest.md) — a generic AI coding rule file from the starter template explaining best practices if ESP32 HTTP/REST code is edited.
    2. [`frontend/src/services/modelService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/modelService.js#L75) — a scientific limitation note (`lim-3: Tidal Fluvial Salinity Dynamics`) stating that polder river salinity fluctuates within hours and *"cannot be captured without automated river salinity sensors"*.
  - Hardware pinouts, sensor models (e.g., EC/TDS probes, soil moisture probes, DHT/DS18B20), and telemetry payload schemas are **UNKNOWN** (not yet created in the repo).

### 2.5 Sensor Data → Database → Dashboard
- **Status:** **NOT IMPLEMENTED (Dashboard Uses Browser `localStorage` & Static Demo Fixtures).**
- **Verified Facts:**
  - [`DashboardPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/Dashboard/DashboardPage.jsx) reads active farm and soil state from [`FarmContext.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/context/FarmContext.jsx) (persisted in `localStorage` under `agrishift_farm_profile` and `agrishift_soil_profile`), weather from [`weatherService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/weatherService.js) (`DEMO_WEATHER_DATA`), suitability from [`cropService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/cropService.js), rotations from [`rotationService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/rotationService.js), and alerts from [`alertService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/alertService.js) (`localStorage` key `agrishift_farmer_alerts`).

### 2.6 ML Training → Model Storage → Prediction API → Frontend
- **Status:** **DISCONNECTED ACROSS ENVIRONMENTS (Colab/GEE vs. Local Repo).**
- **Verified Facts:**
  - **ML Training (`Ml Pipelines/`):** Standalone Jupyter notebooks and Python scripts built for **Google Colab + Google Earth Engine** (GEE project `drout-prediction-nasadata`). They train **LightGBM** (and in the executed Drought notebook `03_diagnostics_and_training_(2) (2).ipynb`, an expanded leaderboard of LightGBM, XGBoost, CatBoost, Extra Trees, HistGradientBoosting, Logistic Regression, and Ridge Regression) for **4 climate hazards**:
    1. **Drought (`01`–`03`):** VCI and SPI-3 forecasting 1 and 2 months ahead.
    2. **Flood Inundation (`04`, `07`, `08`):** Sentinel-1 SAR open-water anomaly forecasting 1 and 2 months ahead.
    3. **Waterlogging (`04`, `07`, `08`):** ERA5-Land root-zone soil saturation persistence forecasting 1 and 2 months ahead.
    4. **Cyclone Storm Surge (`05`, `06`, `09`, `10`):** Leave-One-Storm-Out (LOSO) spatial inundation classification per cyclone event.
  - **Model Storage:** The scripts save `.txt` LightGBM booster files (`lgbm_clf_next1.txt`, `lgbm_inundation_next1.txt`, `lgbm_waterlogging_next1.txt`, `lgbm_surge_storm.txt`) and `.parquet` / `.csv` summaries to **Google Drive** (`/content/drive/MyDrive/AgriShift_*_dataset/processed/model_results/`). None of those trained `.txt` model files or `.csv` demo tables have been copied into the repository's `ml/artifacts/` or `ml/datasets/processed/` directories.
  - **Architectural Mismatch Note:** The frontend (`SalinityPredictionPage.jsx`, `modelService.js`, `API_INTEGRATION_NOTES.md`) specifies an ML model for **Soil Salinity / ECe (dS/m) regression** (`POST /api/v1/models/salinity-ec/predict`), whereas the actual ML work in `Ml Pipelines/` models **Drought, Flood Inundation, Waterlogging, and Cyclone Storm Surge**. There is no soil salinity (ECe) ML training script in `Ml Pipelines/`.

---

## 3. Component-by-Component Breakdown

### 3.1 Frontend Architecture (`frontend/`)
- **Entry Point:** [`index.html`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/index.html) → [`src/main.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/main.jsx) → [`src/App.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/App.jsx).
- **State Management:**
  - [`LanguageContext.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/context/LanguageContext.jsx): Defaults to Bangla (`'bn'`), persists to `localStorage` (`agrishift_language`), exposes `t(keyPath)` with English fallback, and updates `document.documentElement.lang` and `document.title`.
  - [`FarmContext.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/context/FarmContext.jsx): Manages `farm` (defaults to `DEMO_FARM` in Dacope, Khulna), `soil` (defaults to `DEMO_SOIL` with `ec: 4.8 dS/m`, `pH: 6.8`), and `season` (`'rabi' | 'kharif1' | 'kharif2'`). Persists to `localStorage` (`agrishift_farm_profile`, `agrishift_soil_profile`).
- **Routing (`App.jsx`):** 16 routes wrapped in [`Layout.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/components/layout/Layout.jsx) (`Navbar`, `Sidebar`, `Footer`):
  1. `/` → [`HomePage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/Home/HomePage.jsx) (with [`HeroNasaGlobe.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/components/home/HeroNasaGlobe.jsx) & [`HeroCinematicDiorama.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/components/home/HeroCinematicDiorama.jsx))
  2. `/farm-map` → [`FarmMapPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/FarmMap/FarmMapPage.jsx) (with [`FarmMapViewer.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/components/maps/FarmMapViewer.jsx))
  3. `/dashboard` → [`DashboardPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/Dashboard/DashboardPage.jsx)
  4. `/weather-calendar` → [`WeatherCalendarPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/WeatherCalendar/WeatherCalendarPage.jsx)
  5. `/soil-report` → [`SoilReportPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/SoilReport/SoilReportPage.jsx)
  6. `/crop-suitability` → [`CropSuitabilityPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/CropSuitability/CropSuitabilityPage.jsx)
  7. `/rotation-planner` → [`RotationPlannerPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/RotationPlanner/RotationPlannerPage.jsx)
  8. `/what-if-simulator` → [`WhatIfSimulatorPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/WhatIfSimulator/WhatIfSimulatorPage.jsx)
  9. `/scenario-comparison` → [`ScenarioComparisonPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/ScenarioComparison/ScenarioComparisonPage.jsx)
  10. `/alerts` → [`AlertsPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/Alerts/AlertsPage.jsx)
  11. `/data-sources` → [`DataSourcesPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/DataSources/DataSourcesPage.jsx)
  12. `/salinity-prediction` → [`SalinityPredictionPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/SalinityPrediction/SalinityPredictionPage.jsx)
  13. `/ml-suitability` → [`MlSuitabilityPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/CropSuitability/MlSuitabilityPage.jsx)
  14. `/intelligent-rotation` → [`IntelligentRotationPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/RotationPlanner/IntelligentRotationPage.jsx)
  15. `/model-evaluation` → [`ModelEvaluationPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/ModelEvaluation/ModelEvaluationPage.jsx)
  16. `/soil-history` → [`SoilHealthHistoryPage.jsx`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/pages/SoilHealthHistory/SoilHealthHistoryPage.jsx)

### 3.2 Backend Architecture (`backend/`)
- **Entry Point:** [`backend/app/main.py`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/main.py) instantiates `FastAPI(title="AgriShift API", version="0.1.0")` and defines `GET /health` returning `{"status": "ok", "project": "AgriShift"}`.
- **Missing Wiring:**
  - `CORSMiddleware` is not configured yet (required for browser requests from `http://localhost:3000`).
  - [`backend/app/api/router.py`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/api/router.py) is not included via `app.include_router(api_router, prefix="/api/v1")`.
  - [`backend/app/core/config.py`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/core/config.py) is an empty docstring.
  - Authentication, authorization, request validation schemas, error handlers, and logging are not yet implemented in the backend.

### 3.3 Database Architecture (`database/` & `docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md`)
- **Implemented:** None (empty directories in `database/`).
- **Container Definition:** [`antigravity-vscode-starter/docker-compose.yml`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/antigravity-vscode-starter/docker-compose.yml) defines a `postgres:17-alpine` service bound to `127.0.0.1:5432`.
- **Designed Relational Schema ([`docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md)):**
  ```mermaid
  erDiagram
      SOURCES ||--o{ CROP_SOURCE_LINKS : cites
      CROPS ||--o{ CROP_SOURCE_LINKS : has
      CROPS ||--o{ CROP_VARIETIES : includes
      CROPS ||--o{ CROP_STAGE_EVIDENCE : documents
      CROP_VARIETIES ||--o{ CROP_STAGE_EVIDENCE : specifies
      SOURCES ||--o{ EVIDENCE_SOURCE_LINKS : backs
      CROP_STAGE_EVIDENCE ||--o{ EVIDENCE_SOURCE_LINKS : references
      SITES ||--o{ PLOTS : contains
      PLOTS ||--o{ CROP_EVENTS : records
      CROP_VARIETIES ||--o{ CROP_EVENTS : planted_as
      ROTATION_TREATMENTS ||--o{ ROTATION_TREATMENT_STEPS : ordered_by
      ROTATION_TREATMENTS ||--o{ CROP_EVENTS : evaluated_in
      PLOTS ||--o{ SOIL_SAMPLES : tested_in
      PLOTS ||--o{ WATER_SAMPLES : tested_in
      CROP_EVENTS ||--o{ MANAGEMENT_EVENTS : managed_by
      CROP_EVENTS ||--o{ HARVEST_OUTCOMES : yields
      SITES ||--o{ ENVIRONMENTAL_OBSERVATIONS : observed_at
  ```

### 3.4 Machine Learning Pipeline (`Ml Pipelines/`)
The geospatial hazard pipeline operates on a shared **1 km MODIS (`MOD13A2`) sinusoidal grid** (`pixel_id = "{lon:.5f}_{lat:.5f}"`, filtering out water pixels `LC_Type1 == 17` and identifying cropland `LC_Type1 in [12, 14]`).

| Hazard | Notebooks | Satellite / Reanalysis Sources | Target / Label Definition | Validation Design | Execution Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Drought** | `01_export_gee`<br/>`02_build_dataset`<br/>`03_diagnostics_and_training` | MODIS `MOD13A2` (NDVI/EVI), `MOD11A2` (LST), CHIRPS Daily Rain (SPI-1/3/6), ERA5-Land (`t2m`, `swl1`, `pet`, `et`), SRTM, MCD12Q1 | `drought_vci` ($\text{VCI} < 35$ vs 2003–2019 pixel-month min/max), `drought_spi3` ($\text{SPI-3} \le -1$), 1 & 2 month ahead shifts | Temporal split (`train <= 2019`, `val 2020-21`, `test >= 2022`) + 5-fold `0.1°` (~11 km) spatial blocks | **Executed on real data** across 10 Khulna Division districts (`5,331,492` rows, `12,033` cropland pixels) + 6-model leaderboard |
| **Flood (Inundation)** | `04_export_flood_gee`<br/>`07_build_flood_dataset`<br/>`08_flood_diagnostics_and_training` | Sentinel-1 GRD VV (`< -18 dB`), JRC Global Surface Water (`occurrence >= 75`), CHIRPS, ERA5-Land, MERIT Hydro | `label_inundation`: new non-permanent radar water $\ge 10\%$ of 1 km cell and $\ge 5\%$ above 2017–2021 pixel-month normal | Temporal split (`train 2017-21`, `val 2022`, `test 2023+`) + 5-fold spatial blocks | Tested on **synthetic data only**; not yet run on GEE |
| **Waterlogging** | `04_export_flood_gee`<br/>`07_build_flood_dataset`<br/>`08_flood_diagnostics_and_training` | ERA5-Land soil water layers 1–3, surface runoff, CHIRPS, MODIS `MOD09A1` (LSWI, MNDWI), MERIT Hydro (`hnd <= 10m`) | `label_waterlogging`: `swl2_sat >= 0.90` for $\ge 2$ consecutive months on poorly drained land (`hnd <= 10m`), no radar features | Temporal split (`train <= 2019`, `val 2020-21`, `test >= 2022`) + 5-fold spatial blocks | Tested on **synthetic data only**; not yet run on GEE |
| **Storm Surge** | `05_storm_events_and_surge`<br/>`06_export_surge_inundation_gee`<br/>`09_build_surge_dataset`<br/>`10_surge_diagnostics_and_training` | NOAA IBTrACS v04r01, Copernicus GTSM-ERA5 tide/surge, Sentinel-1 pre/post storm, MODIS Global Flood DB, ERA5 Hourly wind/MSLP, ETOPO1 | `label_surge_inundation`: post-minus-pre cyclone radar new water $\ge 10\%$ or MODIS cyclone flood footprint $\ge 10\%$ within coastal exposure zone | **Leave-One-Storm-Out (LOSO)** cross-validation across cyclone events | `05` Cells 1–2 run on real IBTrACS (29 cyclones found); `06`, `09`, `10` tested on **synthetic data only** |
