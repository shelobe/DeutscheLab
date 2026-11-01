# DeutschLab — Development Roadmap and Working Backlog

Updated: 2026-10-31. Source of truth: `main` in `shelobe/DeutscheLab`.

## Current priorities
1. **Primary: curriculum and learning quality.** Refine A1 sequencing, teaching, practice, question quality, and module-review alignment before broad A2/B1 expansion.
2. **Secondary: supermarket game and artwork.** Continue smaller, self-contained improvements in regular ChatGPT when Work allotment is unavailable.
3. **Stability:** Handle critical regressions promptly; batch complex, cross-file diagnosis and automated verification for Work when useful.

This roadmap tracks planned work; an item marked "Needs audit" is not a verified defect. The code map and design guidelines remain authoritative for implementation details and established conventions.

## Working model
- **Chat:** curriculum copy and scoped lesson questions; artwork preparation; isolated code changes; GitHub documentation.
- **Work:** large curriculum audits, interdependent refactors, complex regression investigations and multi-feature testing. Avoid unnecessary live browser exploration; per DESIGN_GUIDELINES.md, do not open the live app unless explicitly requested.
- Work allotment affects which task is selected, **not** its priority. Switch to the secondary track when Work is unavailable, then resume the primary track at the last recorded checkpoint.
- New discoveries go into the backlog rather than automatically interrupting the active batch, except critical regressions or blockers.
- Read `CODE_MAP.md`, `DESIGN_GUIDELINES.md` and current GitHub files before changing code. Preserve existing IDs, progress, artwork, audio, navigation, and game mechanics. Commit validated changes to `main`; record the SHA.

## Status vocabulary
- **Backlog:** accepted but not started
- **Needs audit:** scope or current behavior must be verified in repository
- **In progress:** currently being edited
- **Ready for user test:** committed; awaiting user's device test
- **Blocked / Ready for Work:** requires deeper investigation or Work capacity
- **Done:** implemented and verified to the extent documented

## Prioritized backlog

| ID | Track | Task | Priority | Mode | Status | Next action |
|---|---|---|---|---|---|---|
| CUR-01 | Curriculum | Establish A1 lesson-by-lesson quality inventory and remaining gaps | P0 | Work | Needs audit | Inventory current A1 lessons and map each to learning outcomes; avoid assuming previously revised lessons are broken |
| CUR-02 | Curriculum | Review A1 lesson sequence and prerequisite coverage | P0 | Work | Needs audit | Compare actual module sequence against taught concepts and review coverage |
| CUR-03 | Curriculum | Improve repetitive or answer-revealing questions in selected A1 lessons | P1 | Chat | Backlog | Select 3–5 related lessons; review teaching, exercises and review questions together |
| CUR-04 | Curriculum | Standardize lesson explanations, examples, audio rows and useful Remember cards | P1 | Chat | Ready for user test | Global shared presentation implemented; verify colors and in-card audio on Android; bespoke teaching retained |
| CUR-05 | Curriculum | Validate module reviews against all taught objectives | P1 | Work | Needs audit | Check question coverage, difficulty and format variety |
| GAME-01 | Supermarket | Complete dairy department artwork consistent with fruit/vegetable scene | P1 | Chat | Backlog | Use approved existing scene as visual reference; prepare asset for user approval |
| GAME-02 | Supermarket | Align shopping list with available departments and items | P1 | Chat | Needs audit | Inspect current item inventory and shopping-list generation before changing |
| GAME-03 | Supermarket | Integrate approved dairy art and relevant item interactions | P2 | Chat | Backlog | Inspect repository artwork, hotspots and existing game behavior |
| TECH-01 | Stability | Investigate any remaining shared Build a Sentence behavior issues | P1 | Work | Needs audit | Reproduce specific reported behavior; follow active implementation in CODE_MAP.md |
| TECH-02 | Stability | Review mobile navigation, saved progress, audio and sync regressions | P1 | Work | Needs audit | Batch targeted code checks and user-reported reproduction steps; no unsolicited live browser testing |
| CUR-07 | Curriculum | Apply approved hint-button design to suitable practice areas when requested | P2 | Chat / Work | Backlog | Button design/placement approved: compact 💡 Hint beside the question, opening over the activity. No global implementation requested. Identify suitable hints in a later batch; keep assessed module reviews free of hints. Consider smaller, more polished pop-up styling separately. |
| CUR-06 | Curriculum | Expand A2 and B1 after A1 quality baseline | P3 | Work / Chat | Backlog | Plan progression using audited A1 objectives |

Priority: P0 = current focus; P1 = next; P2 = follow-on; P3 = later. This is an initial planning list, not a claim that each item is currently defective.

## A1 quality checklist (apply to each lesson batch)
- [ ] Specific communicative learning objective is stated.
- [ ] All assessed words, phrases and grammar have been taught with usable examples.
- [ ] Lesson appears after its prerequisites.
- [ ] Questions test the intended skill, not hints, trivia or unrelated conjugation.
- [ ] Mix recognition, comprehension and production appropriate to the lesson.
- [ ] Let taught objectives determine the lesson question count and mix; expand or reduce practice for complete coverage and useful reinforcement, avoiding filler, unnecessary repetition and tests of another lesson’s primary skill.
- [ ] Accept legitimate German variants; give precise feedback and corrections.
- [ ] Include listening/speaking only where relevant and preserve push-to-talk.
- [ ] Keep lesson teaching, practice and module review aligned.
- [ ] Preserve stable IDs, scores, progress, sounds and navigation.
- [ ] Run relevant available syntax and automated checks; request Android user test when appropriate.

## Batch record template
Copy this section for each batch:

### Batch [ID] — [title]
- Track / mode / priority:
- Scope (lesson IDs or feature and files):
- Learning objective or bug reproduction:
- Proposed changes:
- Out of scope:
- GitHub commit SHA:
- Automated checks actually run:
- User-device test result:
- Status:
- Next checkpoint:

## Current handoff
- **Primary next step:** CUR-01 — inventory the current A1 course, identify which lessons have already been refined, and rank remaining gaps before making broad edits.
- **Secondary next step:** GAME-01 — prepare dairy-department artwork using the existing fruit-and-vegetable department as the visual reference. Asset approval comes before integration.
- At the end of each session, update this file with the active task, completed commits, test results and the next precise action.
- Keep detailed technical implementation locations in `CODE_MAP.md`; keep lasting visual conventions in `DESIGN_GUIDELINES.md`. Do not duplicate either here.

### CUR-04 — Shared teaching presentation rollout
- Approved global rollout from the group-pronoun lesson: teal audio, amber Remember, plum Note, larger phrase/playback text, separate usage lines and contextual examples.
- Shared presentation files apply the conventions to existing lesson, pronunciation, conversation, article/case and word-order guides. Grouping preserves playback handlers; sentence examples stay distinct from explanation cards.
- Validation: JavaScript parsing, real script-order/course/progress checks, lesson/review/audio regression suites, and DOM-only presentation checks across 119 authored guides. Updated two stale test counts for the previously added pets lesson and final-d drill.
- Status: Ready for user test. No browser testing performed. Next checkpoint: Android spot-check of the global presentation; curriculum content audit remains CUR-01.

### CUR-04 follow-up — Correct word versus phrase audio placement
- Single-word Listen boxes belong directly beneath the matching word/explanation inside its information box. All phrase and sentence audio belongs outside those boxes in a separate examples area.
- Replaced the prior overly broad in-card grouping rule, corrected the guidelines/code map, and split umlaut/ß word comparisons into individually matched entries.
- Real-renderer DOM checks cover 119 authored guides and 490 rendered playback rows, including repeated rendering. Browser/device verification remains pending; status is Ready for user test.

### Sentence-pattern chunk and hint trial — 2026-11-01
- People and names: Sentence patterns retains six questions; two now arrange sentence chunks with optional collapsed Hint disclosures, native Check and feedback.
- Validation: syntax checks and DOM-double handler checks for correct/incorrect ordering, incomplete Check gating, Undo, Start over and collapsed hints. No browser testing. Status: Ready for user test.
- Possible follow-up: CUR-07, optional hints elsewhere after reviewing this trial.

### Hint design decision — 2026-11-01
- User approves the current compact question-side 💡 Hint button as the global design reference; existing two-question implementation stays unchanged.
- Possible refinement: make the pop-up more compact and visually polished. Its current appearance is not finalized.
- Documentation only. Global rollout and pop-up changes remain deferred until requested.
