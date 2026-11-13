---
name: esp32-iot
description: >-
  Use this skill when designing, writing, or integrating ESP32 sensor firmware,
  Wi-Fi/HTTP telemetry payloads, FastAPI IoT ingestion endpoints, or field/canal
  salinity and soil-moisture sensor workflows in AgriShift.
---

# AgriShift ESP32 & IoT Telemetry Skill

Guides the implementation of ESP32 field/canal sensor telemetry and its integration into AgriShift's FastAPI backend and PostgreSQL database.

## 1. Domain Role in AgriShift

Satellite products (SMAP 9–36 km, MODIS 250 m–1 km) cannot capture sub-daily tidal canal salinity spikes (`modelService.js` limitation `lim-3`) or point root-zone EC. ESP32 nodes provide local point measurements (canal/pond water `ECw`, dielectric soil moisture, temperature) to complement satellite context.

## 2. Telemetry Contract & Agronomic Rules

1. **Recommended Endpoint**: `POST /api/v1/iot/telemetry` (implemented in `backend/app/api/v1/` and validated via Pydantic in `backend/app/schemas/`).
2. **Required JSON Payload Fields**:
   ```json
   {
     "device_id": "esp32-dacope-01",
     "site_id": "SITE-DACOPE-01",
     "plot_id": "PLOT-01",
     "observed_at": "2026-11-10T06:00:00Z",
     "schema_version": "1.0",
     "readings": [
       {"variable": "water_ecw", "value": 4.2, "unit": "dS/m", "method": "ec_probe_temp_compensated_25c"},
       {"variable": "soil_moisture_vwc", "value": 0.28, "unit": "m3/m3", "method": "capacitive_probe_10cm"},
       {"variable": "soil_temp", "value": 26.5, "unit": "C", "method": "ds18b20"}
     ]
   }
   ```
3. **Never Confuse Sensor `ECw` / Bulk `EC` with Lab `ECe`**:
   - Store canal/pond EC readings in `water_samples` (`ecw_value`, `ecw_unit`, `method`) or `environmental_observations` (`quality_flag`, `measurement_method`).
   - Do not overwrite laboratory saturated-paste soil `ECe` (`soil_samples.salinity_value`) with raw dielectric sensor readings unless a researcher-approved calibration curve is applied and flagged.

## 3. Firmware & Security Checklist

- Keep Wi-Fi credentials and device tokens in an untracked `secrets.h` (never commit secrets).
- Enforce explicit HTTP timeouts (`5000 ms`) and bounded exponential backoff on connection failure.
- Surface ingested sensor status in the UI with a clear `LIVE SENSOR` vs `DEMO / SAMPLE DATA` badge (`DemoBadge.jsx` / `StatusBadge.jsx`).
