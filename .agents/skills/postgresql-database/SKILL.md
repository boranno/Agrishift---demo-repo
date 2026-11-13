---
name: postgresql-database
description: >-
  Use this skill when starting the PostgreSQL container, authoring SQL schemas
  or migrations in `database/`, creating ORM models/repositories in `backend/`,
  or importing agronomic CSV handoff packs.
---

# AgriShift PostgreSQL Database Skill

Procedure for managing AgriShift's PostgreSQL 17 database, relational schema, and agronomic evidence tables.

## 1. Local Container Management

PostgreSQL 17 (`postgres:17-alpine`) is defined in `antigravity-vscode-starter/docker-compose.yml` bound to `127.0.0.1:5432`:
- Ensure `.env` exists (copied from `antigravity-vscode-starter/.env.example`) with a local `POSTGRES_PASSWORD`.
- Start: `docker compose -f antigravity-vscode-starter/docker-compose.yml up -d db`
- Check health: `docker compose -f antigravity-vscode-starter/docker-compose.yml ps`
- Stop (preserving `postgres_data` volume): `docker compose -f antigravity-vscode-starter/docker-compose.yml down`

## 2. Canonical Relational Schema (`docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md`)

When creating DDL in `database/schema/` or migrations in `database/migrations/`, follow the normalized design in `docs/RESEARCHER_CROP_ROTATION_DATA_GUIDE.md` Section 6:
- **Catalog & Evidence**: `sources`, `crops`, `crop_varieties`, `crop_stage_evidence`, `crop_source_links`, `evidence_source_links`.
- **Field & Rotation**: `sites`, `plots`, `rotation_treatments`, `rotation_treatment_steps`, `crop_events`.
- **Measurements & Telemetry**: `soil_samples`, `water_samples`, `management_events`, `harvest_outcomes`, `environmental_observations`.

## 3. Domain Integrity Constraints

1. **Salinity Method Separation**: Store `salinity_value`, `salinity_unit`, and `salinity_method` (`ECe` saturated-paste vs `EC1:5` vs water `ECw`) explicitly in `soil_samples` and `water_samples`. Never merge or overwrite unlike methods.
2. **Scale & Provenance Separation**: Keep gridded satellite/reanalysis values (`environmental_observations` with `spatial_temporal_scale` and `source_id`) distinct from point lab/field samples.
3. **Missingness & Privacy**: Keep missing measurements as `NULL` (never `0`). Use coded `site_id`/`plot_id` without farmer PII.
4. **Backend Data Layer**: Place ORM models in `backend/app/models/` and parameterized queries in `backend/app/repositories/`.
