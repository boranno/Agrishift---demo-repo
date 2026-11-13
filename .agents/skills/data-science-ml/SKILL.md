---
name: data-science-ml
description: >-
  Use this skill when working on AgriShift's hazard ML pipelines (`Ml Pipelines/`
  or `ml/`), Google Earth Engine exports, dataset builders, drift diagnostics,
  LightGBM training, or backend model inference integration.
---

# AgriShift Data Science & Geospatial ML Skill

Workflow for developing, diagnosing, and integrating AgriShift's Khulna coastal hazard and agronomic ML pipelines.

## 1. Pipeline Inventory (`Ml Pipelines/`)

Canonical scripts live in `Ml Pipelines/AgriShift_review_bundle/AgriShift_review_bundle/` (with executed Drought notebooks in `Ml Pipelines/Drougth/`):
- **Drought (`01` -> `02` -> `03`)**: MODIS `MOD13A2` NDVI/EVI, `MOD11A2` LST, CHIRPS SPI-1/3/6, ERA5-Land (`t2m`, `soil_moisture`, `pet`, `et`) on a 1 km MODIS grid (`pixel_id = "{lon:.5f}_{lat:.5f}"`, cropland classes `12, 14`). Outputs `agrishift_panel.parquet` and `agrishift_demo_district_month.csv`.
- **Flood & Waterlogging (`04` -> `07` -> `08`)**: Separate tasks/features—Inundation uses Sentinel-1 VV (`< -18 dB`) + JRC water (`2017-2025`); Waterlogging uses ERA5-Land `swl1..3`, MERIT Hydro `hnd <= 10m`, and MODIS LSWI/MNDWI (`2003-2025`, no radar features).
- **Storm Surge (`05` -> `06` -> `09` -> `10`)**: NOAA IBTrACS cyclones ($\le 250\text{ km}$, $\ge 34\text{ kt}$) + Copernicus GTSM + pre/post Sentinel-1 & MODIS Global Flood DB, evaluated via **Leave-One-Storm-Out (LOSO)**.

## 2. Project-Specific Modeling Rules

1. **Resolve Drought VCI Drift**: Fixed 2003–2019 `vci` saturates at 100 in post-2020 test years due to secular NDVI greening (`+0.0044 NDVI/yr`), causing negative regression $R^2$. Prefer the 10-year rolling baseline (`drought_vci_roll`) or `drought_z` computed in `03_diagnostics_and_training.py` Cell 3.
2. **Strict Leakage Prevention**:
   - Compute climatological normals (`_clim_mean/std/min/max`) and SPI gamma fits strictly within `year <= BASELINE_END` (`2019` for optical/soil, `2021` for SAR).
   - Exclude all `target_*`, `label_*`, `drought_*`, `y_cls_*`, and `y_reg_*` columns from predictors.
   - Tune classification probability thresholds on the `val` split only, never on `test`.
   - Evaluate against **Persistence** and **Climatology** baselines on both held-out years (`split == "test"`) and held-out `0.1°` spatial blocks (`spatial_fold`).
3. **Productionizing to `ml/` and `backend/`**:
   - Export small district/upazila summary tables (e.g., `agrishift_demo_district_month.csv`) to `ml/datasets/processed/` and LightGBM boosters to `ml/artifacts/` (respecting `.gitignore` unless intentionally committing a small demo fixture).
   - Update `docs/ml_model_card.md` and `frontend/src/services/modelService.js` only with verified test metrics.

## 3. Offline Verification

Run the synthetic test harness before modifying pipeline scripts (`02`, `03`, `05`, `07`, `08`, `09`, `10`):
- Bash: `bash "Ml Pipelines/AgriShift_review_bundle/AgriShift_review_bundle/synthetic_tests/run_all_tests.sh"`
- Or override `AGRI_INPUT`, `AGRI_OUT`, `FLOOD_IN`, `FLOOD_OUT`, `SURGE_IN`, `SURGE_BUILD_OUT` environment variables to run individual `.py` scripts on synthetic outputs.
