# DeutschLab — Development Roadmap and Working Backlog

Updated: 2026-11-01. Source of truth: `main` in `shelobe/DeutscheLab`.

## Current lesson-question status

This summary and Current handoff are authoritative for resuming work. Dated batch records below preserve history; their old counts, examples and next steps do not override this summary.

| Scope | Current status | Next action |
|---|---|---|
| A1 authored-content audit, all 22 modules | Complete | Use recorded findings during scoped improvements; this is not proof of course-wide runtime or learning-outcome validation. |
| Module 1 Lessons 1–3 | Finalized / user approved | Preserve current lessons, including Wald, Käse distractor and silent letter choices; dictionary overlay remains a separate monitor note. |
| Module 2 Lesson 1 | Done / user approved | Preserve approved questions and concise feedback. |
| Module 2 Lesson 2 — Introducing yourself: heißen and wohnen | Refinements implemented; no outstanding reported issue | Ten questions; friend name/home prompts no longer supply du. No separate explicit final approval recorded. |
| Module 2 Lesson 3 — Countries, nationalities and languages | Done / user approved | Twelve questions; two-language selection visibility fixed and accepted. Preserve current content. |
| Module 2 Lessons 4–5 and Modules 3–22 | Pending in this question-refinement pass | Continue in course order; preserve previous useful work. |
| Dedicated module-review/final-assessment improvement | Deferred | Begin after individual lesson questions are finished; include the recorded gradual-recall plan. |
| Intermittent pronunciation dictionary overlay | Monitor / unconfirmed | Investigate if reproducible; no fix claimed. |

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
| CUR-01 | Curriculum | Establish A1 lesson-by-lesson quality inventory and remaining gaps | P0 | Work | Authored-content audit complete | All 22 A1 modules audited; findings recorded below. Course-wide runtime behavior, review sampling, audio and learning outcomes are not comprehensively verified; scoped checks and user approvals are recorded below. Use findings during scoped lesson improvements. |
| CUR-02 | Curriculum | Review A1 lesson sequence and prerequisite coverage | P1 | Work | Initial authored-content audit complete; follow-ups pending | Broad sequence is appropriate; four targeted investigations remain below. Check relevant prerequisites during lesson refinement. |
| CUR-03 | Curriculum | Improve repetitive or answer-revealing questions in selected A1 lessons | P0 | Chat | In progress — Module 1 finalized; Module 2 Lessons 1 and 3 user approved | Lesson 2 refinements implemented; no outstanding reported issue. Next: Module 2 Lesson 4, People and names: Vocabulary and meaning. Continue in course order; preserve approved questions. |
| CUR-04 | Curriculum | Standardize lesson explanations, examples, audio rows and useful Remember cards | P1 | Chat | Ready for user test | Global shared presentation implemented; verify colors and in-card audio on Android; bespoke teaching retained |
| CUR-05 | Curriculum | Validate module reviews and final A1 assessment against taught objectives | P1 | Work | Deferred until lesson questions are finished | After individual lesson questions are refined, audit and improve coverage, retention, mixed-topic application, variety and resistance to guessing. |
| GAME-01 | Supermarket | Complete dairy department artwork consistent with fruit/vegetable scene | P1 | Chat | Backlog | Use approved existing scene as visual reference; prepare asset for user approval |
| GAME-02 | Supermarket | Align shopping list with available departments and items | P1 | Chat | Needs audit | Inspect current item inventory and shopping-list generation before changing |
| GAME-03 | Supermarket | Integrate approved dairy art and relevant item interactions | P2 | Chat | Backlog | Inspect repository artwork, hotspots and existing game behavior |
| TECH-01 | Stability | Investigate any remaining shared Build a Sentence behavior issues | P1 | Work | Needs audit | Reproduce specific reported behavior; follow active implementation in CODE_MAP.md |
| TECH-02 | Stability | Review mobile navigation, saved progress, audio and sync regressions | P1 | Work | Needs audit | Batch targeted code checks and user-reported reproduction steps; no unsolicited live browser testing |
| CUR-08 | Curriculum | Make incorrect-answer feedback specific to the exact question and error | P1 | Chat / Work | In progress — approved scopes improved; remaining lessons pending | Continue checking relevant explanations during each lesson batch. Module 1 and Module 2 Lesson 1 feedback changes are user approved; retain specific, concise explanations. The Er heißt Thomas finding remains unverified. |
| CUR-07 | Curriculum | Apply approved hint-button design to suitable practice areas when requested | P2 | Chat / Work | Backlog | Button design/placement approved: compact 💡 Hint beside the question, opening over the activity. No global implementation requested. Identify suitable hints in a later batch; keep assessed module reviews free of hints. Consider smaller, more polished pop-up styling separately. |
| CUR-06 | Curriculum | Expand A2 and B1 after A1 quality baseline | P3 | Work / Chat | Backlog | Plan progression using audited A1 objectives |

Priority: P0 = current focus; P1 = next; P2 = follow-on; P3 = later. This is an initial planning list, not a claim that each item is currently defective.


## A1 audit findings register — authored-content audit completed (2026-11-01)

**Purpose:** Keep an evidence-based record of issues, proposed improvements and decisions from the completed authored-content audit and subsequent verification. **Finding** means observed in authored repository data; **investigate** means not yet verified across runtime/custom question handlers. No recommendations below authorize automatic code changes.

| ID | Area / evidence | Finding or concern | Suggested improvement | Priority | Status |
|---|---|---|---|---|---|
| A1-AUD-01 | Early greetings and introductions; authored situational multiple-choice questions | Good practical situations, but correct German expressions are frequently supplied as choices; independent recall not yet established | Preserve contextual recognition tasks, then add short completion or typed responses after teaching, where appropriate | P1 | Partially addressed: Module 2 Lesson 1 user approved; other early introduction lessons pending |
| A1-AUD-02 | The verb sein and The verb haben; authored blanks such as `Ich ___ müde` and `Du ___ Zeit` | Multiple questions emphasize pronoun-to-form selection; risk of mechanical repetition | Retain foundational conjugation checks, then add meaning-based prompts, sentence construction and short original responses | P1 | Authored pattern observed; audit full question path |
| A1-AUD-03 | People and names: Sentence patterns | Authored word-order distractors and explanations identify verb-second position; recent sentence-chunk exercise adds construction | Preserve these strengths; assess whether the chunk approach can be selectively reused after confirming its current behavior | P2 | Positive reference / follow-up |
| A1-AUD-04 | People and names: Understanding in context | Appropriate situations but several questions supply whole German sentences, potentially permitting recognition without retrieval | Check the proportion of recognition vs production; introduce recall/short response only where it adds learning value | P1 | Investigate runtime mix |
| A1-AUD-05 | Forms and personal details | Form fields, residence and spelling requests have clear practical relevance | Preserve coverage; use as a model for functional A1 tasks | P2 | Positive reference |
| A1-AUD-06 | Specific incorrect-answer explanations (CUR-08) | A previously inspected authored `Er heißt Thomas` explanation discussed `Freund/Freundin`, rather than the tested sentence; content may be overridden in the active lesson | Audit final effective question bank and feedback; replace unrelated explanations with mistake-specific reasons while preserving already useful explanations | P1 | Needs verification in current runtime |
| A1-AUD-07 | A1 course overall | All 22 modules received an authored-content audit; broad teaching and sequence are sound. Runtime behavior, review sampling, audio and learning outcomes remain unverified. | Improve individual lesson questions starting in early modules; defer the dedicated module-review and final-assessment pass until lesson questions are finished. | P0 | Authored-content audit complete; improvement phase next |

**Already tracked separately:** CUR-02's four follow-ups (early modal chunks, separable-verb prerequisites, concentrated dative, and independent Perfekt production) remain below; do not duplicate or treat them as confirmed defects.

**Current checkpoint:** Authored-content audit complete across all 22 A1 modules; detailed batches below preserve the evidence. Refine individual lesson questions from the earliest modules onward, checking current teaching and effective question handlers in each scoped batch. Module reviews and the final A1 assessment follow after lesson questions are finished.

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
- **Completed:** Authored-content audit of all 22 A1 modules; findings and conversational coverage proposals are recorded below. Course-wide runtime, review sampling, audio and learning outcomes are not comprehensively verified; scoped checks and user approvals are recorded below.
- **Approved by user (2026-11-01):** Module 1 Lessons 1–3 finalized, Module 2 Lesson 1 and Module 2 Lesson 3 accepted. Preserve these unless a new issue is reported. Dedicated module-review/final-assessment improvements remain deferred.
- **Session checkpoint:** Lesson 2.3 accepted after the language-selection visibility fix. Lesson 2.2 has ten questions and both friend prompts corrected; no outstanding issue reported, but no separate explicit final approval recorded.
- **Primary next content step:** CUR-03 — Module 2 Lesson 4 (People and names: Vocabulary and meaning). Inspect latest teaching and effective questions; review and recommend changes before implementation.
- **After lesson questions are finished:** CUR-05 — audit and improve module reviews and the final A1 assessment. Do not start this deferred pass now.
- **Secondary next step:** GAME-01 — prepare dairy-department artwork using the existing fruit-and-vegetable department as the visual reference. Asset approval comes before integration.
- At the end of each session, update this file with the active task, completed commits, test results and the next precise action.
- Keep detailed technical implementation locations in `CODE_MAP.md`; keep lasting visual conventions in `DESIGN_GUIDELINES.md`. Do not duplicate either here.

## Historical batch records and audit evidence

These are dated snapshots, including superseded designs, question counts and resume points. Consult Current lesson-question status and Current handoff above for what is approved and what comes next. Unconfirmed issues and unrelated areas retain their existing status; lesson-question approval does not approve every global layout or game.

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

### CUR-02 follow-up — Four A1 sequencing and learning-effectiveness investigations (2026-11-01)
These are **audit candidates, not confirmed defects or approved changes**. Review current teaching, questions and module reviews before proposing edits.

1. **Modal verbs introduced late:** The dedicated *können* / *müssen* lesson is in Module 16, after food, shopping and routines. Check whether practical chunks such as *Kann ich …?* should appear earlier without moving formal conjugation instruction.
2. **Separable-verb prerequisites and practice:** Module 15 introduces *aufstehen* and *einkaufen*, including end-position prefixes. Verify that learners receive sufficient guided sentence construction before assessments and can independently apply the pattern.
3. **Concentrated dative material:** Module 18 contains prepositions, dative articles and dative pronouns. Evaluate cognitive load, prerequisite clarity, and spacing/practice between these concepts before considering redistribution.
4. **Past-tense production:** Module 21 introduces *Perfekt*, *haben/sein* auxiliaries and participles. Confirm that exercises support independent descriptions of completed activities rather than recognition alone.

**Resume point:** Audit each of these against actual lesson packs and assessments; record evidence and distinguish existing coverage from genuine gaps. No code changes authorized by this note.

### A1 audit batch 4: Modules 5-8 (2026-11-01)
Scope: authored teaching and questions, not verified runtime behavior. No app changes.

- **A1-AUD-08, Module 5 - nouns/articles/plurals:** Strong article-with-noun instruction and logical progression. Mostly three-option recognition. **P1, investigate:** add article+noun recall and short descriptive sentence production after verifying existing runtime exercises and reviews.
- **A1-AUD-09, Module 6 - numbers/ages:** Useful prices, ticket examples, number-word structure; authored audio and written prompts exist. **P1, investigate:** verify effective audio/typing and number-range coverage; consider varied dictated prices/quantities if gaps remain.
- **A1-AUD-10, Module 7 - question words:** Repeated low-context word selection (wer/was/wo, wann/warum/wie, wo/woher/wohin). **P1, observed in authored bank:** preserve recognition introduction, then add realistic full-question construction and answer matching.
- **A1-AUD-11, Module 7 - questions and answers:** Useful verb-first yes/no explanation, but only four authored questions and limited direct word-order assessment. **P1, investigate:** verify other exercises/review before adding complete yes/no and information-question construction.
- **A1-AUD-12, Module 8 - negation:** Nicht/kein and gender contrasts taught with practical examples; mostly supplied-form completion. **P2, investigate:** add scenario-based negative responses and independent sentences if existing reviews do not already cover them.

Preserve: noun gender guidance, number listening/writing, verb-first question instruction, practical negation. Historical next audit step (now complete): Modules 9-12 (family, home, accusative/pets, food), followed by review and runtime exercise coverage. These are recommendations, not approved implementation changes.


### A1 audit batch 5: Modules 9–12 (2026-11-01)
Scope: authored lesson data and course definitions; no runtime or browser verification. No app changes.
- **A1-AUD-13, Module 9 — Family:** Seven lessons; sensible noun-to-possessive sequence, but six repeated example sentences recur across meaning, blanks and situational selection. P1: introduce unfamiliar family contexts and independent short descriptions. Review pre-accusative reference to *meine Oma*.
- **A1-AUD-14, Module 10 — Home:** Four lessons; six meaning-recognition, six supplied-blank and six contextual choice prompts in enrichment stages. P1: test independent room/furniture descriptions and location sentences.
- **A1-AUD-15, Module 11 — Accusative and pets:** Three lessons; positive mix of writing, listening, reading and practical scenarios. P2: verify independent subject/object identification, article choice and pronoun substitution in unfamiliar contexts.
- **A1-AUD-16, Module 12 — Food:** Five lessons; repeated six-sentence pattern across three enrichment stages. P1: expand applied restaurant dialogue and new food-preference scenarios.
- **A1-AUD-17, Feedback:** Authored explanation for “Wir trinken Wasser” refers instead to “Ich möchte einen Tee”; P1: inspect and correct mismatched explanations throughout these modules.
- **Review follow-up:** Review draws from lesson banks; inspect effective runtime sampling and coverage before claiming review mastery. No changes approved.
**Historical next audit checkpoint (audit now complete):** Modules 13–16 (shopping, dates/appointments, daily routines/separable verbs, hobbies/modals). Audit actual authored teaching, questions, sequencing and feedback; no implementation without approval.


### A1 audit batch 6: Modules 13–16 (2026-11-01)
Scope: authored course definitions and questions only; runtime/review behavior not verified. No app implementation changes.
- **A1-AUD-18, Module 13 — Shopping/prices/clothing:** Useful price, quantity, size and payment contexts; enrichment stages repeat six model sentences across meaning, blank completion and situational selection. P1: add novel shopping exchanges and independent requests.
- **A1-AUD-19, Module 14 — Dates/appointments:** Useful half-hour, date, preposition, appointment and invitation tasks, including written answers. P1: check independent scheduling exchanges and transfer to unfamiliar dates/times.
- **A1-AUD-20, Module 15 — Routines/separable verbs:** Explicit separable-verb teaching and guided prefix completions exist, but enrichment reuses familiar sentences. P1: assess and strengthen independent construction with unfamiliar subjects, time phrases and separable verbs.
- **A1-AUD-21, Module 16 — Hobbies/modals:** Dedicated *können/müssen* and polite-request exercises exist, but hobby enrichment relies heavily on recognition and predictable completion. P1: test independent modal-verb use and realistic ability/obligation/preference responses.
- **Cross-module consensus (Modules 1–16):** A1 topic coverage, teaching and broad sequence are generally sound. Highest-impact improvement is practice quality: reduce repetitive recognition/answer-revealing tasks; strengthen independent recall, construction, transfer and authentic communication. Preserve effective existing questions; do not rebuild the curriculum wholesale.
- **Historical paused checkpoint (superseded by completed audit):** Audit through Module 16 at authored-content level; Modules 17–22 remain. Next user-selected task is to improve exercises starting in earlier A1 lessons. Audit findings are proposals, not authorization for lesson edits. No browser testing.


### A1 audit batch 7: Modules 17–22 (2026-11-01)
Scope: authored course definitions and lesson question banks, not browser/runtime testing. No application code changes.
- **A1-AUD-22, Module 17 — Colors/clothing/weather (P1):** Beginner-appropriate topic and expressions; six model sentences repeat across translation, blanks and situation-choice stages. Add transfer and independent descriptions.
- **A1-AUD-23, Module 18 — Town/travel/dative (P1):** Ten lessons cover places, directions, movement prepositions, dative articles/pronouns, schedules and instructions. Potential grammar density; check scaffolding and interleaved practice, especially movement vs location and dative use.
- **A1-AUD-24, Module 19 — Work/health/help (P2):** Practical vocabulary and scenarios; health enrichment repeats six model sentences. Work/occupations includes more varied questions. Expand unfamiliar symptom and help-seeking exchanges.
- **A1-AUD-25, Module 20 — Everyday conversations (P1):** Two linked lessons cover practical requests and clarification. Existing authored prompts favor recognition and blank completion; add unfamiliar multi-turn exchanges and independent responses.
- **A1-AUD-26, Module 21 — Past events (P1):** Perfekt, participles, war and hatte introduced; prompts emphasize missing auxiliaries/participles and reading recognition. Add guided-to-independent short past-event accounts.
- **A1-AUD-27, Module 22 — Putting A1 into practice (P1):** Three linked review lessons largely use basic reading/meaning recognition; need cross-topic independent communication tasks. Separate 21-question final-review runtime selection not verified and should be inspected before redesign.
**Audit checkpoint:** All 22 A1 modules have now received an authored-content audit. Overall sequencing and teaching broadly appropriate; primary improvement opportunity is question quality, authentic application, recall and transfer. Findings are not implementation instructions. Runtime, review sampling, audio and learning outcomes remain unverified. User intends to improve earlier modules first. No browser testing.


### A1 conversational coverage follow-up (2026-11-01)
**Status:** Proposed improvements for later review, not approved implementation. Based on authored-content audit; some phrases may already appear and should be checked before adding duplicates.
- **High — Follow-up questions:** Teach and practice reciprocal questions (*Und du?*, *Was ist mit dir?*) after giving personal answers.
- **High — Conversation repair:** Practice asking for repetition/slower speech, clarifying an unknown word, understanding the reply and continuing the exchange.
- **High — Natural reactions:** Introduce context-appropriate reactions such as *Ach so!*, *Das ist schön!*, *Wirklich?*, *Schade!*
- **High — Making plans:** Propose a day/time, accept, decline politely and suggest alternatives.
- **High — Preferences:** Express likes/dislikes, preference and refusal in everyday contexts.
- **High — Small talk:** Combine introductions, work, family, hobbies and weather in short exchanges with follow-up questions.
- **Medium — Everyday problems:** Explain missing, broken, incorrect or unavailable items/services and request help.
- **Medium — Polite interactions:** Practice apologies, responses to thanks, asking permission and natural conversation closings.
**Design direction:** Do not create eight new modules by default. Integrate skills into relevant existing A1 lessons, and consider expanding Module 20 (*Useful everyday conversations*) into a stronger conversation-focused section. Make multi-turn dialogues recur throughout A1, with guided-to-independent progression and unfamiliar scenarios. Example: invite someone on Saturday; decline; suggest Sunday; agree on a time. Avoid duplicate teaching; first map each proposed skill against current lessons. No app edits authorized.


### A1 improvement sequencing decision (2026-11-01)
**Order of work:** First refine and expand the questions within individual A1 lessons (coverage, difficulty, variety, independent recall, application and feedback). **After lesson questions are finished**, conduct a dedicated audit and improvement pass on module reviews and the final A1 assessment, checking lesson coverage, retention, mixed-topic application, question variety and resistance to guessing. This is a deferred task, not authorization to edit reviews now.


### CUR-03 — Module 1 lesson question refinement (2026-11-01)
- Scope: Alphabet and spelling; Umlauts and ß. Separate German pronunciation practice and the module review remain unchanged.
- Alphabet retains ten tasks: four applied sound-rule checks, three shuffled recording choices, and the existing Jahr/Winter/Vogel speaking tasks. Replaces three duplicate abstract rule questions with listening; no letter-count or meaning quiz. Introductory examples remain Januar/Wasser/Vater; Jahr is removed from the introduction to preserve transfer to practice-only examples.
- Umlauts retains ten varied tasks, including matching, comparison, tiles, inline completion and writing. Replaces the final meaning-recall prompt with strict heißen dictation; expands generic feedback into the exact vowel/letter contrast for each matching task and the schön blank.
- Historical eu/soft-ch flag clarified: both are taught in the current German pronunciation lesson, and the current Module 1 review includes neun matching and ich comparison. No duplicate curriculum additions are needed for that older finding.
- Validation: all 149 previously tracked JavaScript files parse; the new module lesson test also parses and passes. Real script-order test exercises 40 randomized alphabet starts and the effective umlaut bank. Existing umlaut interaction, module review, pronunciation, answer-audio and global results tests pass. The unrelated lesson-audio-layout test fails at its existing 0-versus-14 assertion on both the unchanged baseline f0905db and this batch; not caused or corrected by these edits.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. No browser or Android test performed. Commit reference: the commit introducing this batch entry.
- Historical next checkpoint (superseded; use Current handoff): User checks Module 1 lesson questions on Android; then continue to Module 2 lesson questions. Module reviews/final assessment remain deferred until lesson questions are finished. Preserve already useful exercises and verify each reported mismatch before editing it.


### CUR-03 — Module 1 new-word prediction follow-up (2026-11-01)
- User feedback: selecting among recordings of Jahr/Winter/Vogel is too easy because the complete words differ greatly; it does not directly establish use of the intended letter-sound rule.
- Approved replacement: show an unfamiliar written word, emphasize its initial letter and ask the learner to predict that letter’s sound before hearing the word. Three replacements use Jacke (J → English y), Weg (W → English v), and vier (v → English f). Meanings are supplied in feedback, not assessed.
- Each prediction provides guarded word playback after the native answer check, on both correct and incorrect answers. Retain the other seven alphabet tasks, all umlaut tasks, separate pronunciation practice and module review.
- Validation: real script order and 40 randomized lesson starts; scoped renderer checks initial-letter emphasis, no pre-answer audio, right/wrong post-answer playback, native score preservation and duplicate/stale-control guards. Module-review, umlaut interaction, answer-audio and global-results regression checks pass. JavaScript syntax checks pass. No browser/device testing.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test; this entry supersedes the previous batch’s three audio-choice slots. Commit reference: the commit adding this follow-up.
- Historical next checkpoint (superseded; use Current handoff): Check the three prediction questions on Android, then continue to Module 2 lesson questions. Reviews/final assessment remain deferred.


### Module 1 — Jacke speaking substitution (2026-11-01)
- User-device finding: microphone does not reliably recognize Jahr.
- Teach Jacke as the introductory J example and use Jacke for the existing J speaking task. Replace the new-word prediction Jacke with Jahr; keep Jahr out of earlier alphabet questions so it remains unfamiliar for that prediction. Hear Jahr remains available after checking, with no microphone requirement for Jahr.
- Supersedes earlier alphabet word assignments; W/V tasks, ten-question total, umlaut lesson, separate pronunciation practice and module review remain unchanged.
- Validation: JavaScript syntax and actual script-order/module-one lesson checks pass, including Jacke teaching/speaking and prediction-only Jahr. No browser testing; recognition of Jacke awaits user-device confirmation.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. Commit reference: the commit adding this entry.


### CUR-03 — Module 2 Lesson 1: Greetings and polite expressions (2026-11-01)
- Scope: only this lesson’s question bank in a1-practical-data.js. Existing teaching, examples, audio, lesson IDs and scoring/renderers are preserved.
- Expanded 11 questions to 15: adds a daytime greeting scenario, evening-greeting completion, asking a friend how they are, and apology completion. Retains meaningful farewell, polite-request, thanks-response, excuse-me and apology situations plus the existing listening task.
- Written recall is limited to Danke and gut. Tschüss becomes a contextual choice; longer expressions remain choices/partial completion. Feedback explains each expression’s role, including the distinction between getting attention, apologizing and replying to thanks.
- Deferred review decision: after lesson questions are refined, add gradual recall of earlier material in module reviews and assess the separate Review area’s current scheduling before proposing ongoing spaced recall. Progress from supported completion to full-expression typing; consider length-sensitive minor typo tolerance with visible spelling correction, while rejecting wrong expressions/grammar and preserving strict sound/spelling checks. No recall scheduler, typo tolerance or dedicated review redesign implemented in this batch.
- Validation: modified JavaScript parses; actual script order and 30 randomized effective greeting banks verified for all seven communication goals, shuffled answer mappings, short-only typing and retained listening. Compared all other teaching packs and this lesson’s teaching/examples with the unchanged baseline. Existing Module 1 lesson/review, answer-audio, written-answer and results checks pass. No browser/device test.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. Commit reference: the commit adding this entry.
- Historical next checkpoint (superseded; use Current handoff): user checks Module 2 Lesson 1; then inspect and refine Lesson 2 (Introducing yourself). Keep module-review/final-assessment redesign deferred.


### Module 1 Lesson 2 — Focused sound/spelling replacements (2026-11-01)
- User finding: broad word matching and same/different comparisons can be solved through unrelated sound differences; Fuß/Fluss includes an extra l, while several schon/schön tasks overlap.
- Implemented one concealed schon/schön recording with sch_n and shuffled o/ö choices; both target recordings vary across attempts. Removed the overlapping inline schön gap and schon/schön comparisons/matching.
- Replaced Fuß/Fluss matching/comparison with separate Fu_/Flu_ completions, choosing ß/ss from the heard long/short vowel. Added the agreed Straße ß-sound question (S versus B/Z).
- Nine questions total after removing redundancy: four focused choices, two retained Käse/Straße tile tasks, one retained ä/ü recording match and two retained strict fünf/heißen dictations. Specific feedback and guarded replay follow the focused choices. Teaching, pronunciation Lesson 3 and module review unchanged.
- Validation: JavaScript syntax; actual script-order lesson-bank checks; 80 randomized o/ö/answer-order trials; ß/ss mappings, sound choice, post-check replay and duplicate/stale guards. Existing matching/tile/gap handler, Module 1 review, answer-audio and results regression checks pass. No browser/device testing.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. Commit reference: the commit adding this entry.
- Historical next checkpoint (superseded; use Current handoff): User checks these Module 1 Lesson 2 replacements; Module 2 Lesson 2 remains the next unedited content batch. Dedicated review improvement remains deferred.


### Module 2 Lesson 1 — Concise feedback and punctuation fix (2026-11-01)
- User screenshots identified excessive distractor definitions in feedback and a question mark revealing the correct how-are-you choice.
- Shortened the longer greeting/politeness explanations to the tested expression’s meaning or use; removed end punctuation from all three choices in that one question. Correct punctuation remains in teaching and feedback.
- Retained all 15 questions, answers, topic coverage and existing checking/audio behavior. Scope is this lesson only.
- Validation: JavaScript parsing, 30 randomized effective banks in actual script order, short-only typing/topic/answer checks, unchanged teaching and other packs, punctuation/feedback-length assertions and answer-choice audio checks pass. No browser/device testing.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. Commit reference: the commit adding this entry.


### Module 1 Lesson 3 — ie speaking example (2026-11-01)
- User reports Liebe being transcribed as lieber on their phone. Keep the speaking format as guided sound practice; completion tracks attempts rather than pronunciation accuracy.
- Swap only the ie drill examples: speaking target sieben (seven), additional listening example Liebe (love). Keep the same ie explanation, 15 drills, microphone handling and progress rules.
- Validation: JavaScript syntax and existing pronunciation renderer/recognition regression checks pass. Device recognition of sieben is unverified and awaits user test. No browser testing.
- Current status: Done / user approved (2026-11-01); see approval checkpoint.
- Status when this batch was recorded: Ready for user test. Commit reference: the commit adding this entry.


### Module 1 Lesson 2 — Silent spelling choices and matching follow-up (2026-11-01)
- User reports that selecting ß in the ß/ss completion speaks the symbol unnecessarily. Disable automatic answer-choice playback only for ß/ss-only choice banks; retain dedicated word playback and ordinary German-word answer playback.
- User asks whether the remaining Mädchen/Käse/fünf match meaningfully tests umlauts. Assessment: limited diagnostic value, because learners can match whole words using length/consonants rather than the target vowel. Replacement remains under discussion; no matching-question changes made in this batch.
- Validation: JavaScript parsing, existing answer-choice audio checks and a targeted check that both spelling choices stay silent while selection and full-word playback work. No browser/device test. Current status: Done / user approved (2026-11-01).


### Module 1 Lesson 2 — Tür teaching and final matching replacement (2026-11-01)
- Added Tür (door) to the Ü teaching section with its own integrated audio example, alongside fünf. The learner encounters Tür before being assessed on it.
- Replaced the remaining Mädchen/Käse/fünf match with one concealed Tür recording and T_r completion using shuffled u/ü choices. Feedback gives the correct word/meaning and replay. Nine questions retained; no whole-word matching remains in this lesson.
- Existing ä tiles, o/ö listening, ß/ss tasks and dictation remain. Unfamiliar-word transfer and review changes stay deferred.
- Validation: modified JavaScript syntax; actual script-order lesson-bank checks; targeted Tür/ü and feedback-audio checks; listening-handler checks; real teaching/audio/presentation rendering across 119 guides, including Tür’s own audio row and repeat-render deduplication; module-review checks pass. Updated the presentation test’s expected lesson audio count and supplied missing DOM-double replaceChildren/contains methods. No browser/device test.
- Current status: Done / user approved (2026-11-01). Original implementation status: Lesson 2 refinements complete; awaiting user confirmation on device. Commit reference: the commit adding this entry. Next planned lesson-question batch remains Module 2 Lesson 2.


### Side note — intermittent pronunciation navigation/dictionary overlay (2026-11-01)
- User observed Module 1 Lesson 3’s anchored navigation becoming obscured by an Android/Chrome dictionary panel for “Pronunciation”; the panel persisted across subsequent speaking exercises.
- Trigger is not reliably reproducible. Possible association with tapping disabled Next sound or a screen transition/automatic advance; neither cause is confirmed. User reports normal tapping, not intentionally long-pressing text.
- Status: Monitor / unconfirmed. If it recurs, inspect disabled-control hit testing, text selection and transition timing before proposing a fix. No app changes or auto-advance changes requested or made for this note.


### User approval checkpoint — Module 1 and Module 2 Lesson 1 (2026-11-01)
- User confirms they are happy with all Module 1 lesson questions/practice and Module 2 Lesson 1 questions.
- Status: Done / user approved for current lesson-question refinement scope. Module 1 covers Alphabet and spelling, Umlauts and ß, and German pronunciation; Module 2 Lesson 1 is Greetings and polite expressions.
- Earlier Ready for user test entries for these lesson changes are superseded by this approval. Preserve their detailed change/validation history.
- The intermittent pronunciation dictionary-overlay/navigation issue remains a separate monitor note with an unconfirmed trigger; approval does not establish a fix.
- Next lesson-question batch: Module 2 Lesson 2, Introducing yourself: heißen and wohnen. Module reviews and final A1 assessment remain deferred until individual lesson questions are finished.


### Module 2 Lesson 2 — Question refinement (2026-11-01)
- Expanded six tasks to ten: adds informal du questions for names and residence, short wohne recall and name-related listening. Retains the existing polite questions, reply/meaning situations, heiße completion and residence listening. Names/home each have five tasks; six situation choices, two short writing tasks and two listening tasks.
- Removed duplicate in explanation from the Home teaching card, shortened residence feedback and normalized end punctuation in choices. Teaching examples/feedback retain correct German punctuation. Origins stay in Lesson 3; no long-expression writing or new grading rules.
- Validation: modified JavaScript syntax; actual script order and 30 randomized effective banks; names/home and informal/polite coverage; typing and listening fields, concise explanations and punctuation checked. Twenty existing Module 2 review sampling runs retain all communication goals. Answer-audio and written-answer regression checks pass. No browser/device testing.
- Status: Ready for user test; not user approved yet. Commit reference: the commit adding this entry. Next content batch: Module 2 Lesson 3.

### Module 1 re-review after Lesson 2 refinement (2026-11-01)
- Read the current effective alphabet/umlaut question overrides and pronunciation drills. Re-ran real script-order Module 1 lesson checks, pronunciation recognition/teaching checks and umlaut handler/randomized-bank checks; all pass. No browser/device testing; no Module 1 code changes made.
- Lesson 1: ten tasks cover J/W/V application, unfamiliar-word prediction and spoken production. Jahr is prediction-only; Jacke is the speaking example. Remaining minor weakness: the Wasser/Winter same-starting-sound question also exposes matching initial letters; this is a lighter check rather than strong evidence of listening.
- Lesson 2: nine tasks cover ä with Käse tiles, o/ö listening, ü with taught Tür and fünf dictation, and ß/ss spelling/sound. Broad word matching is removed. Tile banks constrain the possible spelling, so they are supported practice rather than independent dictation; retain the format variety and approved scope.
- Lesson 3: fifteen guided speaking drills; ie target sieben, extra example Liebe. Completion records attempts, not validated pronunciation mastery. Recognition limitations and the intermittent dictionary-overlay monitor note remain.
- Assessment: no blocking content issue identified in this code-level pass. Preserve the user’s Module 1 approval. Minor observations above are follow-ups, not approved edits; dedicated review/retention work remains deferred.


### Module 1 — Two approved minor improvements (2026-11-01)
- Replaced the visually obvious Wasser/Winter same-starting-sound item with Wald initial-sound prediction (English V/W/F choices), using existing letter emphasis and playback after checking. Lesson 1 remains ten tasks: three applied checks, four predictions and three speaking tasks.
- Added one a distractor to the Käse tile activity. Shared helper supports optional spare tiles; answer length/readiness follow Käse’s four letters, not the five bank tiles. Strict ä scoring, Undo and Start over remain. Other tile activities opt out and retain their original banks.
- Resolves the two minor points recorded in the Module 1 re-review. Other approved Module 1 content is unchanged.
- Validation: modified JavaScript syntax, actual script-order Module 1 checks, umlaut handlers, distractor-specific correct/incorrect scoring and target-length/Undo/reset checks, and existing Module 1 review tests pass. No browser/device testing.
- Status: Ready for user test for these two refinements; prior Module 1 approval remains the baseline. Module 2 Lesson 2 still awaits user test; next content task remains Module 2 Lesson 3.


### Module 1 — Silent letter-only answer choices (2026-11-01)
- Extended the ß/ss auto-playback exclusion to banks consisting entirely of individual German letters (including plain vowels, umlauts and consonants). Selecting either letter is silent; dedicated Listen buttons and normal complete-word choice playback remain.
- Validation: syntax, existing answer-choice audio checks, and targeted o/ö, u/ü, a/ä, J/W/V and ß/ss silence/selection checks pass; full-word Tür still plays. No browser/device testing. Status: Ready for user test.


### End-of-night handoff — 2026-11-01
- Module 1 finalized by user, including the approved minor refinements and silent letter-only selection. Dictionary-overlay report remains Monitor / unconfirmed; no fix claimed.
- Lesson 2.2: removed explicit informal du cues from friend name/home prompts; ten questions retained. Commits: 1442a10ad64741c3d8c407b58a8ffe42cb63a9e0 and 8848ea91a495b387e74e84d3219f8542402b90f7. Syntax checked; user continued to Lesson 2.3 without reporting another Lesson 2.2 issue.
- Shared results: module.lesson prefix for lesson names and mistake-review headers, 1.3 for pronunciation, module number for module reviews. Commit: c516746764600d359d1fc02a78ebec5a888b0405. Native results regression checks and number-label assertions passed without a browser.
- Lesson 2.3: twelve questions; added nationality recognition, polite origin question, Deutsch listening and combined country/language listening with two selections. Replaced redundant origin choice; retained short Englisch/aus recall and origin/home listening. Removed repeated aus teaching, explained aus den USA as a chunk, taught Frankreich and und with examples. Commit: e3184a93f5af9662db899b76b3b51ab4f002e072.
- User reported invisible selection state in the new task. Fixed with explicit teal/checkmarked selections, deselection instructions, compact spacing and Listen to the speaker label. Commit: ff7ff63f13f10154ebf42c624534c91bc351b47e.
- Validation actually run: JavaScript parsing and 50 shuffled DOM-double selection runs covering correct/wrong pairs, readiness, deselection, disabled third choice, post-answer guard and visible checkmark labels. No browser testing. User then confirmed “2.3 is good.” Status: Done / user approved.
- Next session: review Lesson 2.4, People and names: Vocabulary and meaning. Do not reopen approved Module 1 or Lesson 2.3 without a reported issue. Module reviews/final assessment and broader hint rollout remain deferred.
