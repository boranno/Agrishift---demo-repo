---
trigger: model_decision
description: Apply when editing ESP32 firmware, sensor collection, Wi-Fi, or HTTP/REST communication with the backend.
---
# ESP32 + HTTP/REST

- Keep sensor acquisition, connectivity, serialization, and application logic separated.
- Use explicit connection/request timeouts and bounded retry/backoff; avoid tight retry loops.
- Check HTTP status codes and validate response payloads; handle Wi-Fi loss and server unavailability.
- Include device identity, measurement timestamp, units, and schema version in telemetry where appropriate.
- Avoid sending credentials in URLs or logging secrets. Use TLS and per-device credentials for real deployments.
- Avoid unnecessary polling; choose a reporting interval based on the sensor and product requirements.
- Keep payloads compact and document units and field names.
