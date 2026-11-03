# AI Use Disclosure

Keep this file current as the team works. The Space Apps submission should
disclose **every AI tool used in the project**, what it was used for, the
relevant prompts or prompt summaries, the data it worked on, and how people
reviewed the output. This file is a working record, not a claim that the
entries below cover every team member's past or future AI use.

## Project policy

- Team members must record AI use for code, text, images, analysis, research,
  translations, or other project work.
- Record the tool and model/version when known; do not guess an unknown model
  version.
- Include the purpose, prompt or accurate prompt summary, input data/material,
  output used, and the human review or changes made.
- Do not submit confidential, personal, credential, or restricted data to an AI
  service.
- AI output is a draft, not verified evidence. Check facts, licenses,
  citations, calculations, translations, and code before using it.
- Do not use a language model to generate scientific measurements or
  unverified model predictions. Keep scientific calculations deterministic,
  documented, and tested.
- Follow each tool's terms and the official event rules. Disclose AI use in the
  NASA project submission as requested, even if a use is not listed here yet.

## Known AI use recorded so far

| Date | Tool | Purpose | Prompt or input summary | Project material affected | Human review |
|---|---|---|---|---|---|
| 2026-11-03 | GitHub Copilot in VS Code (Copilot SDK assistant; model/version not recorded here) | Drafted the team hackathon rules/build guide and this AI-use disclosure. | Asked to review the supplied Space Apps build and participant guides against the repository and create clear team guidance on allowed/prohibited work, project requirements, and AI disclosure. No project dataset was supplied. | `HACKATHON_RULES.md` and `docs/AI_USE.md`. | The team should review these documents against current official event materials, confirm the selected challenge, and correct or extend this log. |
| 2026-11-03 | GitHub Copilot in VS Code (Copilot SDK assistant; model/version not recorded here) | Reviewed the concept against the selected challenge and participant judging rubric; drafted a readiness scorecard and Khulna development considerations. | Read the official Field Shift statement, supplied Participant Guide and build guide, the repository implementation, and the user-provided Khulna event description image. No project dataset was supplied. | `docs/CONCEPT_CONSIDERATIONS.md` and updated `HACKATHON_RULES.md` to reflect the full official challenge. | Scores are explicitly provisional estimates, not official NASA results. Team should verify logistics, project-page fields, data claims, and member roles. |
| 2026-11-03 | GitHub Copilot in VS Code (Copilot SDK assistant; model/version not recorded here) | Added a separate relative-fit review of all 10 Global Award categories and clarified the strongest opportunities across both Global Awards and the local scored rubric. | Asked to assess which segments have the best chance of winning and explain why and what to improve. Used the existing concept review and previously reviewed Participant Guide categories; no project dataset was supplied. | `docs/CONCEPT_CONSIDERATIONS.md`. | The category fit is explicitly not an official nomination or prediction. The team should verify claims, obtain local feedback, and prioritize working evidence over award-oriented claims. |
| 2026-11-03 | GitHub Copilot in VS Code (Copilot SDK assistant; model/version not recorded here) | Added a bilingual AgriShift UI card linking to MIT's external Bangladesh soil-salinity projection explorer. | Asked to show the MIT salinity projection resource in the UI. Reviewed the public MIT page and its HTTP framing headers; no project dataset was supplied. | `frontend/src/pages/SalinityPrediction/SalinityPredictionPage.jsx`, `frontend/src/locales/en.json`, and `frontend/src/locales/bn.json`. | The MIT site blocks cross-origin framing, so the UI links to its explorer in a new tab rather than embedding or reproducing it. Labels distinguish MIT research projections from AgriShift predictions and field measurements; verify wording and translations before submission. |

This is the AI use known for preparing these documents only. It is **not** a
complete log of previous coding, design, research, translation, or other AI
work by the team. Each team member must add any missing uses before submission.

## Team AI-use log

Add one row for every distinct use. If a tool is used repeatedly for the same
task, group uses only when the tool, purpose, prompt approach, inputs, and
review process are materially the same.

| Date | Team member | Tool and model/version | Purpose and reason | Prompt or accurate prompt summary | Input data/material | Output used and files/features affected | Human review, edits, and verification |
|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Name | Tool / model, or `version unknown` | What it helped with and why AI was appropriate | Paste prompt or summarize it accurately | Dataset, code, text, or `no project data` | What was retained; list affected files/features | Who checked it and how; tests or sources checked |

## Data handled by AI

Record whether AI tools processed project data, and describe the data type and
its source. Do not include secrets or personal data in this file.

| Tool and model/version | Data/material supplied | Source and permission status | Purpose | Review or restrictions |
|---|---|---|---|---|
| No project dataset use is documented in this file yet. Update this table when applicable. | Not applicable | Not applicable | Not applicable | Not applicable |

## AI not used for

Update this section if it stops being accurate:

- Creating or validating NASA observations, field measurements, dataset
  provenance, citations, or experimental results.
- Producing salinity predictions, planting-window shifts, model metrics, or
  other scientific results presented as measured or validated.
- Replacing agronomic review, team decisions, or required participant consent.

## Before submission

- [ ] Ask every team member about AI use across the whole project, not just
  code-generation tools.
- [ ] Record all tools and models, prompts or accurate summaries, purposes,
  input data, retained outputs, and human review.
- [ ] Verify sources and permissions for any AI-assisted text, code, images,
  translations, or analysis.
- [ ] Ensure the NASA project page's AI disclosure matches this file and the
  latest official submission requirements.
