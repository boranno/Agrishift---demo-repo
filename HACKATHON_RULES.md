# AgriShift Hackathon Rules and Build Guide

This guide helps AgriShift team members make consistent project, coding, data,
and demo decisions. It is an internal working guide, not a replacement for the
official NASA Space Apps rules or instructions from the Bangladesh Local Leads.
If an official rule or event instruction differs, follow the official
instruction and update this guide.

## 1. Confirm the challenge before building

The team reports that it selected **Field Shift: Adapting Farms with NASA
Data**. The current NASA statement asks for a decision-support tool combining
NASA Earth observations with local soil information, crop characteristics, and
farmer priorities so farmers can explore crop rotations that may improve soil
health and resilience to changing weather and water conditions.

Keep the central demo focused on comparing feasible crop rotations for a
specific farmer decision. Crop suitability, soil salinity, maps, and climate
trends should support that rotation decision rather than become unrelated
features. Confirm the selected category is recorded on the NASA project page.

## 2. What the team may do

- Build software, data products, models, visualizations, and prototypes using
  open NASA or Space Agency Partner data, as allowed by the official challenge
  and event rules.
- Use other reputable sources to complement NASA data. Cite each source and
  explain what it contributes.
- Use AI tools for appropriate tasks, provided the team discloses the tools,
  prompts or prompt summaries, purpose, and human review in
  [`docs/AI_USE.md`](./docs/AI_USE.md) and in any required project submission.
- Use sample or simulated data for a clearly labeled interface demonstration.
  Keep it visibly separate from observations, measurements, and validated
  results.
- Use transparent agronomic rules when the inputs, assumptions, and limitations
  are documented. Get knowledgeable human review of consequential farming
  assumptions.
- Keep the public project repository and required project links accessible to
  judges without a login or permission request.
- Collaborate openly, divide work clearly, and make genuine contributions
  visible through project history and team roles.

## 3. What the team must not do

- Never present mock, sample, simulated, or unverified values as live NASA
  observations, field measurements, validated forecasts, or model predictions.
- Never invent dataset provenance, citations, agronomic evidence, model metrics,
  uncertainty estimates, or claims of farmer impact.
- Never let an AI model or language model invent or calculate scientific
  measurements. Scientific calculations must be deterministic, reviewable, and
  tested; an AI explanation may only describe verified results.
- Never commit API keys, passwords, private participant information, or
  restricted data. Keep credentials in local environment files and provide
  placeholders only in example files.
- Never use data, images, voices, or likenesses without appropriate permission
  and attribution. The supplied build guide says no recognizable name, voice,
  or likeness of anyone under 18 may appear in a video or submission; follow
  that restriction for project materials. Follow the Participant Guide's
  parent/guardian requirements for under-18 event participants as well.
- Never claim that a prototype, integration, or feature is complete when it is
  a mock, a design, or a planned capability.
- Never copy code, text, designs, or assets without checking their license and
  recording the source and required attribution.
- Never treat this document or the local build guide as permission to bypass
  the official Participant Terms, event instructions, or submission rules.

## 4. AgriShift engineering rules

1. **Keep the science inspectable.** Put scientific calculations in
   deterministic functions, separate from UI code and language-model logic.
2. **Test calculations and boundaries.** Test normal, missing, invalid, and
   edge-case inputs. Add sensitivity checks when a result depends on a chosen
   threshold or definition.
3. **Record data provenance.** For each dataset, document the provider,
   product/version, URL, variables, units, spatial and temporal resolution,
   access date or period, transformations, license/terms, limitations, and
   intended use.
4. **Show data status in the UI.** Distinguish live, cached, fixture, sample,
   simulated, and unavailable data. Show the source and relevant date near the
   result.
5. **Be honest about model readiness.** Do not show a prediction as validated
   until the model has appropriate data, an evaluation, documented limitations,
   and human review. Keep unavailable model features explicitly marked.
6. **Design for the demo environment.** The build guide recommends an
   offline-capable demo: prepare local demo fixtures, make network dependence
   visible, and rehearse the demo with the network disabled. Do not make claims
   that offline mode works until it has been tested.
7. **Preserve bilingual usability.** Keep English and Bangla content complete,
   readable, and tested on phone-sized screens. Do not leave key advice,
   warnings, assumptions, or source labels in only one language.
8. **Make changes verifiable.** Run the smallest relevant tests/build, update
   directly related documentation, and do not claim a check passed if it was
   not run.

## 5. Hackathon website must-haves

### Required for a credible AgriShift demo

- State the project's name, the selected 2026 challenge, the problem, intended
  users, and the proposed decision the site helps a farmer make.
- Provide an accessible, mobile-friendly experience in both Bangla and English.
- Show a working end-to-end example using a named Bangladeshi location and
  crop; clearly label any sample or fixture data used.
- Make NASA or Space Agency Partner data central to the demo. Name each product
  on screen and explain what it contributes; do not merely decorate the UI with
  NASA references.
- Show the recommendation or advisory as a clear, actionable sentence, along
  with the evidence, units, period, assumptions, and limitations behind it.
- Include visible provenance/source links and a way to distinguish live data
  from cached or demonstration data.
- Ensure the central demo still works when connectivity is unavailable, or
  clearly disclose and rehearse the remaining network dependency.
- Include an open, judge-accessible repository, run instructions, data
  references, an actual chosen open-source license, and the AI-use disclosure.
- Ensure the project page identifies the challenge category and lists NASA and
  partner data sources, references, tools, and required team/submission details.

### Additional considerations for Field Shift

These are drawn from the current official challenge statement. The NASA
statement's examples are optional considerations, not a requirement to use
every listed dataset or feature:

- Compare a documented current rotation with a small number of plausible
  alternatives. Explain trade-offs such as water use, nutrient cycling, soil
  cover/organic matter, erosion, pest cycles, forage, labor, and markets where
  reliable evidence exists.
- Let farmers specify relevant priorities and constraints; show how those
  choices affect the comparison instead of returning an unexplained “best”
  crop sequence.
- NASA POWER, SMAP, GPM, Landsat, MODIS, ECOSTRESS, GRACE/GRACE-FO, and SRTM
  are examples from the challenge statement. Choose only products that answer
  the project's specific decision and document their limits.
- Explain satellite versus ground observations, spatial/temporal resolution,
  uncertainty, and where local agricultural expertise is needed.
- A planting-window or rainfall-onset analysis may be a supporting feature if
  it helps compare rotations. The local build guide's planting-window example
  is not a replacement for the official crop-rotation challenge objective.

## 6. Suggested team workflow

1. Confirm the registered challenge, team roles, and official deadlines.
2. Pick one primary farmer decision and define what a successful demo proves.
3. Verify data availability, terms, units, and agronomic assumptions before
   building a result around them.
4. Build and test the smallest end-to-end path first: data or fixture, verified
   calculation, API or local interface, and farmer-facing explanation.
5. Add secondary features only after the core path is reliable and clearly
   supports the challenge.
6. Keep [`docs/AI_USE.md`](./docs/AI_USE.md), source citations, and the README
   current as the team works.
7. Check the latest official Participant Guide and Local Lead instructions
   before submitting. The supplied guide may not reflect later changes.
8. Test the public demo and repository as a stranger would: no login, no private
   environment variables, and no undocumented setup.

## 7. Current repository notes

- The root [`LICENSE`](./LICENSE) is currently a placeholder, not a license
  grant. The team must choose and add an actual license before describing the
  repository as open-source licensed.
- The frontend contains demonstration features, while the backend and model
  pipeline are not yet fully integrated. Describe each capability according to
  its real status.
- The root README currently says the project is an initial scaffold. Update
  project-facing descriptions so they distinguish the implemented frontend
  from planned or unavailable backend/data/model features.
- The supplied 2026 guides are references, not official legal advice. Check
  the current NASA Space Apps site and Local Lead communications for
  authoritative rules, challenge selection, and deadlines.
