# AgriShift — Project Status, Risk Audit & Roadmap

> **Audit Status:** Verified against actual repository source code, documentation, and notebook outputs on `2026-11-10`.

---

## 1. Completed Features (Verified Working)

### 1.1 Frontend Web Application (`frontend/`)
- **16 Interactive Routes Implemented:** All 15 numbered features from [`docs/feature_specification.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/feature_specification.md) plus `/soil-history` and a custom 404 route are implemented in React 18 + Vite 5.
- **Complete Bilingual Localization (`bn` & `en`):** 348+ translation keys in [`bn.json`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/locales/bn.json) and [`en.json`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/locales/en.json) with automated parity verification (`npm test` via [`verify-frontend.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/tests/verify-frontend.js)). Defaults to Bangla (`bn`) and persists in `localStorage`.
- **Interactive Mapping & Geodesic Area Engine (`FarmMapViewer.jsx` & `geocodingService.js`):**
  - MapLibre GL v6 integration with 3 basemaps (OpenStreetMap, Esri World Imagery satellite, CARTO Voyager) and 3D pitch/bearing controls.
  - Live place search and reverse geocoding via OpenStreetMap Nominatim with timeout and offline fallback handling.
  - Browser GPS geolocation (`navigator.geolocation`) and interactive polygon parcel drawing with WGS84 spherical-excess area calculation (auto-converting $\text{m}^2$ to Bigha, Acre, Hectare, and Decimal).
- **Deterministic Client-Side Crop Suitability (`cropService.js`):**
  - 13 coastal Bangladesh crops/varieties with `criticalSalinityEc` and `maxSalinityEc` thresholds and seasonal suitability evaluation (`suitable` / `marginal` / `risky`).
- **Crop Rotation & Scenario Comparison UI (`rotationService.js`, `RotationPlannerPage.jsx`, `ScenarioComparisonPage.jsx`):**
  - Side-by-side comparison of 3 multi-season strategies (Baseline Traditional Rice-Fallow vs. Soil-Health Dhaincha–Aman–Sunflower vs. Water-Resilience Mungbean–Aman–Relay Khesari).
- **External MIT Salinity Projection Viewer (`SalinityPredictionPage.jsx`):**
  - Year-selectable raster viewer displaying MIT Eltahir Group observed (2000, 2009, 2023) and SSP5-8.5 modeled (2025–2050) coastal Bangladesh soil salinity maps, with explicit provenance disclaimers.
- **Scientific Honesty & Transparency UI (`DemoBadge.jsx`, `ModelUnavailableBanner.jsx`):**
  - Mock/sample data is labeled with `DEMO / SAMPLE DATA`, and unimplemented ML endpoints display honest `MODEL NOT YET AVAILABLE` banners.

### 1.2 Machine Learning & Earth Observation Pipelines (`Ml Pipelines/`)
- **10-Notebook Multi-Hazard Pipeline Authored (`AgriShift_review_bundle/`):**
  - Complete `.ipynb` and `.py` scripts for Drought (`01`–`03`), Flood & Waterlogging (`04`, `07`, `08`), and Cyclone Storm Surge (`05`, `06`, `09`, `10`), plus an offline synthetic test suite (`synthetic_tests/`).
- **Drought Pipeline Executed on Real Google Earth Engine Data (`Ml Pipelines/Drougth/`):**
  - Exported 2003–2025 monthly satellite/reanalysis composites across **all 10 districts of Khulna Division**.
  - Built a **5,331,492-row × 85-column** panel (`3,321,108` cropland rows across `12,033` cropland 1 km pixels).
  - Executed year-by-year NDVI/VCI drift diagnostics and trained a 6-model classification and regression leaderboard (LightGBM, XGBoost, CatBoost, Extra Trees, HistGradientBoosting, Logistic Regression / Ridge Regression) with temporal and 5-fold spatial block cross-validation.
- **Cyclone Catalog Filtered on Real NOAA IBTrACS Data (`05_storm_events_and_surge`):**
  - Identified 29 North Indian Ocean cyclones (2000–2025) approaching within 250 km of the Khulna coast at $\ge 34\text{ kt}$.

### 1.3 Governance & Data Specifications (`docs/` & `HACKATHON_RULES.md`)
- Comprehensive hackathon engineering rules ([`HACKATHON_RULES.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/HACKATHON_RULES.md)), AI disclosure log ([`docs/AI_USE.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/AI_USE.md)), judge rubric review ([`docs/CONCEPT_CONSIDERATIONS.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/CONCEPT_CONSIDERATIONS.md)), and 682-line researcher data & relational database specification ([`docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md)).

---

## 2. Incomplete Features & Missing Components

1. **FastAPI Backend (`backend/`):**
   - Only `GET /health` exists in [`backend/app/main.py`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/backend/app/main.py).
   - None of the 11 REST endpoints documented in [`frontend/API_INTEGRATION_NOTES.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/API_INTEGRATION_NOTES.md) are implemented.
   - No `CORSMiddleware`, Pydantic schemas, service layer, repository layer, authentication/authorization, or backend tests exist.
2. **Frontend-to-Backend Wiring (`frontend/src/services/`):**
   - [`apiClient.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/apiClient.js) is never called by any frontend service.
   - Soil Report OCR ([`soilService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/soilService.js)) is a `setTimeout` simulation returning one of two hard-coded SRDI sample cards regardless of the image uploaded.
   - Weather & Crop Calendar ([`weatherService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/weatherService.js)) returns static hard-coded numbers (`DEMO_WEATHER_DATA`).
   - Crop Rotation & Scenario Comparison ([`rotationService.js`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/src/services/rotationService.js)) returns static strategies rather than dynamically computing trade-offs from NASA observations, soil inputs, and farmer priorities.
3. **Database Layer (`database/`):**
   - No SQL migrations, SQLAlchemy/SQLModel models, or seed scripts exist in `database/` or `backend/app/models/`.
   - `psycopg` / `sqlalchemy` / `alembic` are not installed in `backend/requirements.txt`.
4. **Machine Learning Execution & Integration (`ml/` & `Ml Pipelines/`):**
   - Flood (`04`, `07`, `08`) and Storm Surge (`06`, `09`, `10`, plus `05` Cell 3 GTSM download) have **not** been executed on real Google Earth Engine / Copernicus CDS data yet.
   - Trained Drought artifacts and the offline district-month summary CSV (`agrishift_demo_district_month.csv`) remain in Google Drive and have not been integrated into [`ml/`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/ml), `backend/`, or `frontend/`.
   - **Soil Salinity (ECe) ML Model:** Planned in `frontend/API_INTEGRATION_NOTES.md` and `modelService.js`, but no ground-truth SRDI soil ECe dataset or salinity ML training script exists in the repository.
5. **ESP32 / IoT Integration:**
   - **Completely missing.** No ESP32 firmware directory, sensor reading code, or backend telemetry endpoint exists in the workspace.
6. **Repository Licensing & Documentation Placeholders:**
   - [`LICENSE`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/LICENSE) is a 1-line placeholder, not an open-source license.
   - [`docs/api_documentation.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/api_documentation.md), [`docs/data_dictionary.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/data_dictionary.md), [`docs/ml_model_card.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/ml_model_card.md), and [`docs/nasa_data_sources.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/nasa_data_sources.md) are 3-line placeholders.

---

## 3. Existing Bugs, Discrepancies & Issues Identified

1. **Drought Label Drift & Negative Regression $R^2$ in Executed Notebook `03` (`Ml Pipelines/Drougth/03_diagnostics_and_training_(2) (2).ipynb`):**
   - **Verified from saved cell outputs:** In the 10-district Khulna Division run (`5,331,492` rows), cropland NDVI has a strong secular upward trend (`+0.0044 NDVI/year`), causing `vci_at_100` clipping to jump from `~2–3%` in 2003–2012 to `26.5%` in 2025 when scaled against the fixed 2003–2019 baseline.
   - Consequently, the fixed-baseline `drought_vci` ($\text{VCI} < 35$) positive rate drops from **30.7% in `train`** to **12.5% in `val`** and **10.4% in `test`**.
   - Although Cell 6 proved that the 10-year rolling baseline (`drought_vci_roll`) fixes this drift (`18.7%` train, `19.9%` val, `21.6%` test), Cell 8 kept `LABEL_COL = "drought_vci"` (fixed baseline), and regression models predicting raw next-month `vci` all achieved **negative $R^2$ (`-0.0037` to `-0.1388` for 1-month ahead; `-0.3219` to `-0.4796` for 2-month ahead)** due to target distribution shift.
2. **Spatial Fold Baseline Leakage in `02_build_dataset.py` and `07_build_flood_dataset.py`:**
   - Per-pixel baseline climatology is restricted to training years (`<= 2019`), which prevents temporal leakage. However, when evaluating on held-out spatial folds (`RUN_SPATIAL_CV`), a test pixel's own 2003–2019 historical min/max/mean/std is still used to normalize its test-year `vci` and `ndvi_z` values, meaning held-out spatial pixels are not "cold-start" unseen locations unless historical satellite archives are assumed available for every new farm location at inference time (which is valid for satellite series, but must be stated explicitly).
3. **Mismatch Between Frontend ML Screens and Actual ML Notebooks:**
   - The frontend ML pages (`/salinity-prediction`, `/ml-suitability`, `/model-evaluation`) are designed around a **Soil Salinity (ECe dS/m) Regression Model**, whereas `Ml Pipelines/` builds **Drought, Flood Inundation, Waterlogging, and Cyclone Storm Surge** models.
4. **Top-Level `README.md` vs. `frontend/README.md` Contradiction:**
   - Root [`README.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/README.md) says *"Initial scaffold only; planned features and models are not implemented yet"*, whereas [`frontend/README.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/frontend/README.md) documents 15 implemented frontend features.

---

## 4. Technical, Scientific & Performance Risks

- **Memory & Compute Bottlenecks in ML Notebooks:**
  - The 10-district drought panel (`5.33M` rows × `85` columns) consumes ~1.8 GB in memory even after downcasting `float64` to `float32`. Running 6-model leaderboards (especially `ExtraTreesClassifier` and `CatBoost` across 2.45M training rows and 5 spatial folds) takes several minutes per horizon and risks Google Colab RAM exhaustion if not carefully garbage-collected.
- **Google Earth Engine Quota & Timeout Risks (`04` & `06`):**
  - Notebook `04` (`reduceRegions` at `scale=60` over 1 km square boxes across all 10 Khulna Division districts) and Notebook `06` (per-storm radar/GFD extraction) have not been tested against live GEE batch quotas and may require task splitting (`MONTHS_PER_TASK`).
- **Scientific Validity & Confounders in Hazard Labels:**
  - **Inundation vs. Aquaculture (`gher`) / Paddy Transplanting:** In coastal Khulna/Satkhira/Bagerhat, brackish shrimp ponds (`gher`) and transplanted Aman/Boro rice fields flood intentionally and look identical to floodwater in Sentinel-1 VV (`< -18 dB`).
  - **Surge vs. Cyclone Rainfall:** Post-cyclone Sentinel-1 water masks cannot distinguish coastal storm-surge overtopping from heavy cyclone rainfall ponding without tide-gauge validation.
  - **Uncited Hard-Coded Numbers in `rotationService.js`:** As flagged in [`docs/CONCEPT_CONSIDERATIONS.md`](file:///c:/Users/Boranno/OneDrive/Desktop/AgriShift-Team/docs/CONCEPT_CONSIDERATIONS.md), numerical claims in `rotationService.js` (e.g., *"60%+ of Dacope and Shyamnagar polders"*, *"22% salt reduction"*, *"35% soil moisture conserved"*) need verified source citations or must be clearly labeled as illustrative examples.
- **External Network Dependency During Offline Demo:**
  - MapLibre tiles (OSM/Esri/CARTO), Nominatim geocoding, Google Fonts (`Hind Siliguri` / `Inter`), and MIT salinity PNG rasters all require live internet access unless cached or backed by local fallback assets.

---

## 5. Recommended Next Steps (Prioritized Development Order)

1. **Step 1 — Reconcile the Core Data-to-Decision Path (Highest Priority):**
   - Bring the real Khulna district-month summary dataset (`agrishift_demo_district_month.csv` from Notebook `02`) and verified crop/rotation rules into `agronomy/` and `backend/`.
   - Switch Notebook `03` to use the drift-resistant `drought_vci_roll` (or `drought_z`) label and export the validated metrics and district/upazila risk summaries for the backend.
2. **Step 2 — Build the FastAPI Backend & PostgreSQL Schema:**
   - Promote the `docker-compose.yml` and `.env.example` setup, add `sqlalchemy`/`psycopg`/`alembic` to `backend/requirements.txt`, and create the core tables (`crops`, `crop_varieties`, `crop_stage_evidence`, `sites`, `plots`, `soil_samples`, `rotation_treatments`, `environmental_observations`).
   - Implement the `/api/v1/*` endpoints in `backend/app/api/v1/` with `CORSMiddleware` enabled and wire `frontend/src/services/*` to call `apiClient.js` with automatic fallback to local demo fixtures when offline.
3. **Step 3 — Connect Validated Hazard / ML Outputs Honestly to the UI:**
   - Serve the validated Drought (and any completed Flood/Surge) district/pixel hazard indicators and model evaluation metrics (`ModelEvaluationPage.jsx`, `DataSourcesPage.jsx`, `RotationPlannerPage.jsx`) through the backend API, while keeping unvalidated models (such as field-level ECe regression if no SRDI ground-truth training data is available) honestly marked as unavailable or external research context.
4. **Step 4 — Implement ESP32 Telemetry Endpoint & Firmware (If IoT is Part of the Demo):**
   - Add `POST /api/v1/iot/telemetry` to FastAPI to ingest real-time ESP32 sensor readings (e.g., canal/pond water `ECw`, soil moisture, temperature) into PostgreSQL and surface live sensor cards on the Dashboard and Alerts pages.
5. **Step 5 — Clean Up Repository Structure, Licensing & Submission Readiness:**
   - Consolidate duplicate notebooks between `Ml Pipelines/` and `ml/`, choose a valid open-source `LICENSE`, reconcile root `README.md` with `frontend/README.md`, and complete `docs/AI_USE.md` before final judging.
