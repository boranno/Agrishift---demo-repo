# AgriShift Concept Considerations and Judge Review

**Review date:** 2026-11-03  
**Selected challenge:** [Field Shift: Adapting Farms with NASA Data](https://www.spaceappschallenge.org/2026/challenges/adapting-farms-with-nasa-data/)  
**Local framing supplied by the team:** Khulna; salinity, storm surge, mangrove cover, and delta change  
**Assessment scope:** Current repository and the team/event details shared in this conversation. This is a candid readiness review, not an official NASA score or a claim that the project page or event registration has been checked.

## 1. What the challenge asks

The official challenge asks teams to make a farmer-facing decision-support tool
that combines NASA Earth observations with local soil information, crop
characteristics, and farmer priorities. Farmers should be able to explore
rotation strategies that may improve soil health and help farms adapt to
changing weather and water conditions.

The challenge page identifies possible NASA sources including SMAP, ECOSTRESS,
GPM, Landsat, MODIS, NASA POWER, GRACE/GRACE-FO, and SRTM. Its potential
considerations include:

- Connecting temperature, soil moisture, rainfall, evaporation, and vegetation
  stress to crop vulnerability and soil health.
- Explaining technical indicators and the difference between satellite
  observations and ground measurements.
- Harmonizing datasets carefully when their spatial and temporal resolutions
  differ.
- Comparing rotations on factors such as nutrient cycling, erosion, organic
  matter, pest cycles, water use, forage, and markets.
- Letting farmers express priorities and constraints, communicating
  uncertainty, and making clear that the tool supports rather than replaces
  local expertise.

This is a paraphrase of the official statement; use the live challenge page for
the authoritative and latest wording.

## 2. Why Khulna is a strong project setting

The Khulna event description shared by the team highlights the gateway to the
Sundarbans, mangrove cover, salinity, storm surge, and delta change. These
provide a compelling local reason to explore climate-resilient farm decisions.

Use the regional context as motivation, not as proof that a particular
satellite product measures a specific farm's salinity or storm-surge exposure.
For each claim, identify a suitable dataset or local source and explain its
limits. Storm surge and mangrove change are useful context only where the
project shows a credible connection to farm decisions; avoid adding them just
to make the interface look more comprehensive.

**Event logistics need confirmation:** the supplied Khulna image lists
14–15 November 2026 and says the event is virtual, with a physical venue
planned. The supplied Participants Guide describes Bangladesh events as
13–14 November, while its global dates are 14–15 November. Confirm the
Khulna-specific date, format, venue, and upload instructions with the Khulna
Local Lead before planning the team's schedule.

## 3. Recommended concept

### One-sentence concept

Help a Khulna-area farmer compare their current crop rotation with a small
number of feasible alternatives, showing how NASA-observed environmental
conditions, local soil and crop information, and that farmer's priorities
affect each option.

### Keep the demo focused

1. **Choose one pilot area and crop rotation.** Start with one location, such as
   a verified Khulna-area upazila, and one locally relevant multi-season
   sequence. Do not imply that one example represents every Khulna farm.
2. **Capture a baseline.** Let the farmer specify the current seasonal crops,
   known soil information, water availability, and practical constraints.
   Clearly label unknown or assumed values.
3. **Show the evidence.** Display a small, documented set of relevant NASA
   observations with product name, units, dates, source links, spatial
   resolution, and whether values are live, cached, or fixtures.
4. **Compare two alternatives with the baseline.** Explain why each rotation
   was considered and compare relevant factors such as water demand, crop
   salinity tolerance, soil cover or organic-matter contribution, nutrient
   cycling, erosion, pest-cycle disruption, labor, and market fit. Only show
   factors supported by documented evidence.
5. **Let farmers set priorities.** For example: conserve water, improve soil,
   reduce input costs, or consider market suitability. Show the resulting
   trade-offs; do not hide them behind a single unexplained “best” score.
6. **End with an actionable explanation.** State the option that best matches
   the selected priorities, the evidence and assumptions behind it, and what a
   farmer or local expert should verify before acting.
7. **Make it usable in Bangla and English.** Test the whole decision path on a
   phone with someone unfamiliar with the interface. Explain terms such as
   NDVI, evapotranspiration, soil moisture, and uncertainty in plain language.

### Data and science choices

- Start with only the NASA products that support the chosen decision. NASA
  POWER can provide climate time series; GPM can contribute precipitation
  information; SMAP can contribute soil-moisture observations; vegetation or
  elevation products can be added if they answer a specific question. Verify
  the exact product, access method, coverage, units, temporal cadence, and
  resolution before implementation.
- Combine satellite information with defensible local soil and crop
  information, such as verified SRDI soil records and BARI/BRRI crop guidance.
  Record source, date/version, permission or terms, transformations, and
  limitations in project documentation and on the relevant UI screen.
- Do not describe coarse satellite pixels as measurements of an individual
  field. SMAP, GPM, and other products have different spatial footprints;
  show the selected product's actual resolution and avoid false field-level
  precision.
- Compare like with like. Document time periods, missing observations,
  resampling/aggregation choices, seasonal definitions, and any differences
  between ground measurements and satellite estimates.
- Prefer a transparent, deterministic scenario-ranking method for a hackathon
  prototype. Expose criteria, weights, constraints, and uncertainty. A trained
  ML model is not required by the challenge; do not present one as available
  unless it is trained and independently evaluated.
- Build and test the core calculation separately from the UI. Include normal,
  missing-data, boundary, and sensitivity tests. Have a locally knowledgeable
  agronomy reviewer examine crop calendars, salinity tolerance, and farming
  assumptions.
- Prepare an offline demo using verified cached data or clearly labeled
  fixtures. Rehearse with the network disabled; disclose any remaining live
  service dependency.

## 4. Current project fit and evidence

### Existing strengths

- The project has a bilingual React frontend with routes for a dashboard, farm
  map, soil report, crop suitability, rotation planning, and scenario
  comparison.
- The rotation and scenario-comparison interfaces already present a baseline
  and multiple crop-rotation strategies, which is close to the challenge's
  requested decision-support experience.
- The model service marks salinity prediction as under development instead of
  claiming a validated model.
- The UI labels demonstration/sample information in several places.
- The project has a relevant Khulna/coastal-farming framing and a team of four,
  within the Participants Guide's stated team-size range of one to six.

### Important gaps and risks

- The current rotation comparisons are hard-coded in
  `frontend/src/services/rotationService.js`; the checked code does not show
  them being calculated from NASA observations, local soil inputs, or
  farmer-selected priorities.
- `frontend/src/services/weatherService.js` supplies demonstration data, and
  `DataSourcesPage.jsx` labels its numeric values as samples. These should not
  be presented as live NASA measurements.
- The backend currently exposes only a health endpoint. The ML model is marked
  untrained and disconnected. No data-ingestion-to-recommendation pipeline or
  scientific calculation test suite was found in the repository review.
- Some quantitative crop, yield, salinity-reduction, or prevalence statements
  in the rotation service need traceable references and careful review. Verify
  every number against the cited source and context; otherwise remove it or
  label it as an unverified example.
- The top-level README says “Initial scaffold only,” while the frontend README
  describes 15 implemented features. Reconcile this before judges use the
  repository to understand what really works.
- The repository is currently **private** on GitHub. The Participants Guide
  gives a repository-access point only when the link is open to everyone; make
  the repo public before submission if permitted, and test the URL in a
  signed-out browser.
- The root `LICENSE` is a placeholder rather than a license grant. The build
  guide expects the hackathon work to be open source; select and add an actual
  license before describing the code as openly licensed.
- No complete `docs/AI_USE.md` history can be inferred from the current AI log.
  Every teammate must add past and future AI-assisted code, research,
  translation, media, or analysis work; do not treat the current entry as the
  complete team disclosure.
- A polished UI alone does not demonstrate validity, working NASA integration,
  offline behavior, farmer usability, or real team collaboration. Rehearse
  those explicitly.

## 5. Local judging scorecard

The supplied Participants Guide numbers **11** scored items, not 10: five
20-point criteria, three 5-point criteria, and three binary criteria. Its
maximum before the women-participation bonus is 118 points. Scores below are
conservative estimates from the repository snapshot and information currently
available, not official judging results. This local scorecard is separate from
the 10 Global Award categories in Section 6.

| # | Criterion | Maximum | Current estimate | Judge's evidence-based assessment |
|---:|---|---:|---:|---|
| 1 | Impact | 20 | 11 | Salinity, water stress, and climate resilience are consequential in the Khulna context. The repo does not yet show farmer testing, measurable benefits, validated local coverage, or an evidence-backed impact pathway. |
| 2 | Creativity | 20 | 10 | Bilingual crop-rotation comparisons are useful, but a static dashboard is not yet a distinctive or adaptive decision experience. Farmer-priority controls with transparent trade-offs could make it more original. |
| 3 | Validity | 20 | 5 | The UI is more complete than the evidence pipeline. NASA values shown are samples; the backend and model are not integrated; scientific calculations/tests and some cited numerical claims require verification. |
| 4 | Relevance | 20 | 11 | Crop-rotation planning is directly aligned to Field Shift. NASA datasets are currently described or represented by samples rather than demonstrated as central inputs to the rotation comparison. |
| 5 | Presentation | 20 | 12 | The interface is bilingual and visually developed, but no verified end-to-end live/offline demo, concise challenge-centered story, or final submission materials were available for review. |
| 6 | Teamwork | 5 | 2 | Four members and one female member are reported. The repository/project materials reviewed do not yet demonstrate individual roles, shared decisions, or substantive contributions from all four. |
| 7 | User experience | 5 | 3 | Bangla/English support and multiple farmer-oriented screens are strengths. The number of features may overwhelm users, and farmer usability on phones has not been demonstrated here. |
| 8 | NASA data usage | 5 | 1 | NASA products are named, but the reviewed pages use sample/demo values rather than a traceable, working NASA-data-backed rotation analysis. |
| 9 | Challenge category identified | 1 | 1* | The team has identified and linked the 2026 Field Shift challenge. Confirm that the NASA project entry itself is associated with that category. |
| 10 | Repository access | 1 | 0 | GitHub currently reports the repository as private, so an unaffiliated judge cannot access it. |
| 11 | Project page complete | 1 | 0 | The completed NASA project page and its required fields were not provided for review, so this point cannot currently be verified. |
|  | **Subtotal** | **118** | **56** | **About 47.5% of the pre-bonus maximum.** |

`*` Provisional: the challenge is selected by the team, but verify the
submission entry. If the category is not shown on the NASA project page, score
this as 0 instead.

The Participants Guide states that a team with one or more women members
receives a **+5% aggregate bonus**. With the reported female team member, the
illustrative score would be **58.8/118** after multiplying 56 by 1.05, if the
member is properly included in the official team registration and the guide's
bonus applies. Confirm current eligibility and recording with the event
organizer; this bonus does not replace any judging criterion.

### Strongest areas and why

- **Challenge fit / Relevance potential:** The product already compares crop
  rotations, which maps directly to the challenge. Make NASA observations and
  local soil/crop inputs drive the comparisons to turn potential relevance into
  demonstrated relevance.
- **User-facing presentation potential:** The site has a bilingual interface
  and several user workflows. Reduce the demo to one farmer decision and make
  its evidence and limitations easy to understand.
- **Regional framing:** Khulna's coastal and delta context gives the team a
  strong, specific problem story. Ground it in verifiable local evidence and
  show the farm-decision link.

### Weakest areas and what would raise them

- **Validity and NASA data usage:** Acquire and document a small, relevant
  dataset; wire it through a tested deterministic calculation to an on-screen
  comparison; show provenance, resolution, data dates, and uncertainty.
- **Repository access:** Make the project repository public if allowed, add an
  actual license and working run instructions, and test access signed out.
- **Impact, UX, and teamwork:** Have a farmer or knowledgeable local reviewer
  test the single core workflow; record what changed; document each teammate's
  real role and show the team's contributions in the project presentation.
- **Project-page point:** Complete every required NASA project-page field,
  videos, sources, AI disclosure, references, and team details; verify the
  submitted page rather than assuming a draft is complete.

## 6. Global Award category fit

The Participants Guide lists 10 Global Award categories separately from its
scored local rubric. The assessment below is a relative fit based on the
repository and information reviewed, not an official nomination, score, or
prediction of winning. Local judges' category nominations do not add points
to the local scorecard.

| Global Award category | Current fit | Evidence and gap | Best improvement |
|---|---|---|---|
| Best Use of Science | Low today; strong potential | The crop-rotation experience fits an applied science problem, but the reviewed rotation logic is hard-coded and no validated NASA-to-recommendation calculation was found. | Implement one transparent, tested comparison using appropriately scaled observations and locally reviewed crop/soil assumptions; show uncertainty and what the data cannot establish. |
| Best Use of Data | Low today; strong potential | NASA products are named, but reviewed numeric data are samples rather than traceable NASA inputs driving the recommendations. | Use a small, real and cited NASA dataset in the core workflow. Display product, dates, units, spatial resolution, source, processing, and whether values are live or cached. |
| Best Use of Technology | Moderate potential, not demonstrated | The bilingual web app and map/rotation interfaces provide a useful delivery surface; the backend currently only exposes a health endpoint and the recommendation path is not data-integrated. | Make the end-to-end data-to-decision flow reliable on a phone and offline, with a clearly labeled cache or fixture fallback and a rehearsed demo. |
| Galactic Impact | Moderate potential | Climate-resilient farming and soil health matter beyond one location, but the project's broader impact pathway is not yet demonstrated. | Explain how the method could transfer to other climate-stressed farming regions, what local inputs must change, and how success could be measured; avoid claiming benefits not tested. |
| Best Mission Concept | Moderate-to-strong potential | Comparing a farmer's baseline with feasible crop-rotation alternatives directly matches Field Shift. The current comparisons do not yet use NASA observations, local inputs, and farmer priorities together. | Deliver one coherent pilot decision: baseline plus two feasible alternatives, explicit constraints and priorities, evidence-backed trade-offs, and a clear next action. |
| Most Inspirational | Moderate potential | The Khulna coastal-farming context gives the team a meaningful human-centered starting point; no farmer experience or verified testimony was available in the reviewed materials. | Build the story around a real, consented local perspective or a clearly labeled representative scenario. Show the decision challenge and the team's response without inventing quotes or outcomes. |
| Best Storytelling | Strongest current narrative potential; execution unverified | Khulna's coastal context, a farmer's rotation decision, and a bilingual tool can form a clear story, but the final presentation and user-tested story were not reviewed. | In a short demo, show the problem, one farmer choice, the evidence and its limits, how alternatives compare, and the practical takeaway. Keep the same story in the app, video, and project page. |
| Global Connection | Strong potential | A locally grounded coastal adaptation problem can connect to shared climate and food-system challenges, but no comparison with other regions or explicit transfer explanation was found. | State what is specifically Khulna-based and what is reusable elsewhere. Use one evidence-backed comparison or a clear transfer framework rather than suggesting one local example represents all farms. |
| Art & Technology | Moderate potential | The bilingual interface and map provide a foundation, but visual polish alone does not demonstrate a meaningful integration of art and technology. | Use purposeful visual storytelling—such as an accessible seasonal rotation timeline or evidence-to-recommendation visualization—and test readability in Bangla and English on a phone. |
| Local Impact | Strongest problem-fit potential; impact unverified | The project is framed around Khulna's coastal conditions, which gives it a specific local focus. The reviewed materials do not establish local farmer testing, validated local data, or measured benefit. | Verify the pilot location and local crop calendar, get feedback from a farmer or qualified local reviewer, document changes made, and report a small measurable outcome only if actually measured. |

### Where AgriShift has its best opportunity

**For the local scored rubric:** Presentation is currently the highest estimated
criterion (12/20); Impact and Relevance are next (11/20 each). These are relative
strengths, not high scores or evidence of a likely local win. The fastest route
to a stronger overall entry is to raise **Validity** and **NASA data usage**:
make real, traceable evidence drive the central rotation comparison, and show
the limits of that evidence. Then validate the workflow with a local user and
rehearse a concise, challenge-centered demo. Also resolve repository access
and project-page completeness, which are currently estimated at zero.

**For Global Awards:** The best current *story and problem-fit opportunities*
are **Local Impact, Best Storytelling, and Global Connection**. They fit the
Khulna framing, bilingual product, and broader climate-adaptation theme, but
they remain potential: the review found no verified farmer testing or completed
presentation. **Best Mission Concept** is another credible opportunity if the
team completes the baseline-versus-alternatives decision path. The most
important technical improvement—needed especially for **Best Use of Science**
and **Best Use of Data**—is to make a documented NASA dataset and locally
defensible inputs affect that decision. Do not target an award by adding
unsupported features or claims.

**Recommended order:** (1) prove one data-to-decision path; (2) verify local
crop and soil assumptions and test the flow with a local farmer or qualified
reviewer; (3) make sources, uncertainty, and trade-offs visible in the
Bangla/English interface; (4) craft and rehearse the same concise story for the
demo and project page; (5) verify public repository access, license, team
details, and submission fields. These steps improve evidence across both
judging tracks rather than optimizing for a category label alone.

## 7. Four-person team plan

Use these as suggested work areas, not claims about existing assignments. Name
the actual teammates and adapt roles to their skills.

| Work area | Suggested responsibility | Deliverable |
|---|---|---|
| Local problem and agronomy | Check the Khulna use case, seasonal crop sequence, soil/crop references, and assumptions with a knowledgeable reviewer. | A cited baseline and two locally plausible alternatives; a list of assumptions and unresolved questions. |
| NASA data and science | Select the smallest useful NASA data set, verify product details, prepare the cache/fixture, and implement/test the deterministic comparison. | Reproducible data pipeline, calculation tests, provenance, uncertainty, and limitations. |
| Product and bilingual UX | Turn the decision path into a clear mobile-first Bangla/English workflow; recruit an adult tester and incorporate feedback. | A working, understandable end-to-end interface with source and data-status labels. |
| Integration and presentation | Integrate the demo, verify offline behavior and repository access, coordinate the project page, and lead the short story/video. | A rehearsed demo, accessible public links, complete submission fields, and a concise narrative. |

Each member should review at least one other work area, contribute substantively,
and record their own AI use in [`AI_USE.md`](./AI_USE.md). Avoid assigning the
female member only a presentation or administrative role; support meaningful
technical, design, research, or leadership contributions and represent them
accurately.

## 8. Recommended development order

1. **Verify administration:** confirm the NASA project page category, all four
   registered team members, the bonus, Khulna event date/format, and official
   upload deadlines.
2. **Freeze the concept:** use one Khulna-area pilot location, one farmer
   decision, one documented baseline, and two feasible rotation alternatives.
3. **Audit claims:** source or remove numeric claims in existing rotation data;
   distinguish local evidence, NASA observations, assumptions, and examples.
4. **Implement one complete evidence path:** selected data product → documented
   preprocessing → tested comparison → API or local interface → Bangla/English
   explanation with source, date, resolution, and uncertainty.
5. **Test with a real user/reviewer:** watch someone unfamiliar with the app
   complete the workflow on a phone. Record confusion and changes; do not
   claim a consultation that did not occur.
6. **Harden the demo:** verify the fixture/offline path with internet disabled,
   prepare a backup recording, and disclose any functionality that still needs
   connectivity.
7. **Finish submission readiness:** reconcile READMEs, choose a real license,
   make the repository publicly accessible if allowed, complete the project
   page, and verify all source, AI-use, and reference disclosures.

## Sources and caveats

- [Official NASA 2026 Field Shift challenge statement](https://www.spaceappschallenge.org/2026/challenges/adapting-farms-with-nasa-data/) — challenge description, objectives, possible datasets, and potential considerations.
- `Space Apps Challenge Participants Guide (1).pdf` supplied in the repository — team-size range, judging rubric, repository/project-page checks, event details, and women-participation bonus. Recheck current official instructions because local event details can change.
- `space-apps-2026-build-guide (1).html` supplied in the repository — technical recommendations; these are a build guide, not a substitute for the NASA challenge statement or official rules.
- Khulna event description image supplied by the team — local framing and preliminary date/format; confirm event logistics with the Local Lead.
- Project evidence inspected: `frontend/src/services/rotationService.js`, `frontend/src/services/weatherService.js`, `frontend/src/services/modelService.js`, `frontend/src/pages/DataSources/DataSourcesPage.jsx`, `backend/app/main.py`, `README.md`, `LICENSE`, and the GitHub repository settings.
