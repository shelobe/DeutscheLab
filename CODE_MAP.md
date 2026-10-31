# DeutschLab code map

## Loading
- `index.html` defines the actual script and stylesheet execution order. Most scripts wrap earlier functions; inspect later wrappers before changing behavior.
- `css/extracted-batch8.css` holds the main styles, followed by `css/legacy-part-1.css`, `css/legacy-part-2.css`, and `css/legacy-part-3.css`.

## Build a Sentence
- `js/build-sentence-unified.js`: language picker (`dlBuildModeMenu`, `dlBuildModeStart`), English game layout/check/answered dock wrappers. Its `gameRender`/`gameMark` German branches are legacy and are **not** the German picker route.
- `js/extracted-batch5-10.js`: `gameStart` redirects German (`build`) to `startSentenceRound`; English (`reverse`) stays in `gameSession`.
- **Active German implementation:** `js/extracted-batch3-4.js`: `startSentenceRound`, `sentencePractice`, `chooseSentenceWord`, `dlRenderSentenceFeedback`; state is `sentenceRound`/`sentenceChosen`. Preserves vetted alternatives, German explanations, XP, chime and haptics. Feedback uses `#gameFeedback > .game-feedback` so it follows the native English badge path rather than obsolete `#sentenceFeedback` CSS/augmentation.
- **English implementation:** `js/extracted-batch6-5.js` renders word selection; `js/extracted-batch2-1.js` defines native `gameMark` feedback and stats; later wrappers add sound and layout. English checking is wrapped by `dlUnifiedCheck` in `build-sentence-unified.js`.
- **Shared character rendering:** `js/extracted-batch7-13.js` observes `#gameFeedback`, replaces `.game-feedback > strong` with `.dl-result-badge`, and supplies existing dog/red panda/cat artwork and `.dl-result-label`. It runs on the next animation frame; inspect feedback after that mutation.
- **Shared visual rules:** `.game-feedback`, `.dl-result-badge`, avatar and label rules in `css/extracted-batch8.css`; targeted panel/hint rules in `build-sentence-unified.js`. Old `#sentenceFeedback`/`.dl-sentence-result` styles do not apply to active German feedback.
- **Navigation:** `js/extracted-batch7-11.js` supplies the global anchored dock and can hide/move original Next buttons. German Next remains `dlSentenceCheckOrNext` → `advanceSentenceRound`.

## Word Matching
- Home and Practice Hub launch `gameStart('match')`; `js/extracted-batch2-1.js` renders `.match-columns` and handles tile selection in `gameMatch`.
- After all pairs are matched, `gameMatch` removes the completed bank following `#gameMatched`, then calls the existing `gameMark` feedback/stats pipeline. Partial matches and incorrect pairs keep the bank; `gameNext`/`gameRender` create the next bank.

## Automated validation
- `.github/workflows/javascript-syntax.yml` runs on pushes, pull requests and manual dispatch, using Node.js 22 and read-only repository access.
- `scripts/check-javascript.sh` checks every tracked `.js`, `.mjs` and `.cjs` file with `node --check`, reports failures and exits unsuccessfully if any file fails. Run locally with `bash scripts/check-javascript.sh`. It parses code without executing the app; visual and behavioral verification remains separate.

## A1 Basic word order
- `js/a1-word-order.js`, loaded after existing lesson wrappers, updates only the A1 `Basic word order` unit. It provides the sectioned introduction, eight paired subject-first/time-first exercises, and a scoped word-bank renderer.
- Questions retain real multiple-choice alternatives for module reviews. The lesson uses `fullSession.picks`, then delegates checking, sounds, feedback, scoring, saving and completion to the existing `dlCheck` pipeline. Explicit valid end-time alternatives are accepted; prompts require a particular opening.
- Only this lesson uses `.dl-order-check-dock` before submission. After submission it hands navigation back to the existing fixed lesson controls. No standalone sentence-game code or existing lesson IDs are changed.

## Lesson content and consistency (A1–B1)
- `js/lesson-enrichment-data.js` contains 66 authored teaching guides and 336 question entries: 35 A1 topic stages with distinct vocabulary, sentence-pattern and scenario tasks; ten A1 core guides; and 21 A2/B1 guides with six applied questions each.
- `js/lesson-consistency.js` loads last, after the content and existing lesson wrappers. It selects the authored A1 stage banks and combines advanced banks with up to two existing checkpoints. It preserves shuffled answer mappings, stable lesson IDs, saved progress and the existing lesson flow.
- Plain A1–B1 introductions use sectioned cards; existing bespoke guides (including articles, pronouns and Basic word order) remain authoritative. B2 is unchanged.
- The scoped `dlCheck` wrapper retains authored explanations, explicit corrections and supplied translations when legacy feedback cleanup would remove them. Existing scoring, sound, avatar, completion and navigation handlers still run.

## Pronunciation practice
- `js/extracted-batch7-1.js` provides the introduction and 15 sound drills. Next/Finish requires a nonempty speech result for each sound; silence and mic startup do not count. Correct results retain automatic advancement; nonmatching results allow retry or Next.
- Unsupported speech recognition or microphone/service errors expose an explicit continue-without-recognition action. Review resets attempts; completion requires all 15 sounds. Rendering cancels active recognition and removes detached pronunciation docks before creating the next one.

## Legacy Module 2 review
- `js/extracted-batch5-8.js`: `personalPronounReview` supplies 18 questions, six for each current Module 2 lesson. Every run covers ich/du/formal Sie, conversation requests and understanding, and er/sie/es plus she/they distinctions. Question and option order shuffle without dropping topics. Other modules retain their existing selection and all reviews keep native scoring, feedback and mastery handling.

## Module 1 review
- `js/module-one-review.js` loads after the existing lesson wrappers and replaces only A1 Module 1's review bank/rendering with 15 tasks: six listening choices and three each of dictation, recording comparison and audio-to-word matching. Each five-question block includes two listening choices and one of each other format.
- Dictation always includes Wein and Liebe (EI/IE), uses a text input plus ä/ö/ü/ß keys, and accepts capitalization differences while requiring the actual German spelling. Matching requires all clips assigned; comparison requires both played. Written words and audio identities are concealed where they are the answer.
- Module 1 review has no speech-recognition requirement: the former read-aloud slots use their listening alternatives (schön, auch and Tür). Dedicated pronunciation practice is separate.
- Custom controls delegate once to the existing `curriculumReviewAnswer` pipeline, preserving feedback, sound, missed-answer summaries, score and mastery. Other modules are unchanged.
- `scripts/test-module-one-review.cjs` uses a lightweight DOM double and the real shared footer (no browser) to verify format coverage, input handlers, scoring, matching, comparison, microphone-free replacements and module isolation.

## Review prompt hints
- `js/extracted-batch5-8.js`: `reviewPromptWithoutHints` runs before rendering module-review questions at every level. Listening prompts use neutral wording; pronunciation labels remain in feedback. Review-only cleanup removes explanatory sound glosses, grammar labels and noun-ending instructions, while retaining semantic requirements such as “me”, “formal you”, or “she” needed to make a task unambiguous.

- Module 1 review controls opt into the shared fixed footer through `data-dl-review-action`; typed/comparison/matching checks remain anchored even when disabled. Review questions never require a microphone. Matching uses two explicit grid columns. The answer wrapper removes submitted controls and banks before scrolling feedback into view and refreshing native Next. Regression checks execute the real shared dock as well as review handlers.

## Practical A1 course
- `js/a1-verb-sequence.js` now supplies the foundational pronoun, regular-verb and stem-vowel teaching packs. It no longer independently reorders modules or builds reviews.
- `js/a1-practical-data.js` contains authored teaching, examples and focused questions, including the revised topic stages and new forms, messages, schedules and instruction lessons.
- `js/a1-practical-course.js` resolves lessons by their exact A1 titles, replacing fragile numeric module definitions with 22 stable module keys and 101 unique linked lessons. All 95 formerly linked lessons remain; Places around town is recovered, and five focused new lessons are added including the stem-vowel lesson. Unlinked duplicate legacy units retain their IDs for old saved results/direct links.
- Load data and course definitions after the foundation packs but before `lesson-consistency.js`. The course validates lesson membership, required teaching packs and question availability before exposing the new path.
- Ordinary A1 module reviews use at most 15 questions and cover every lesson before adding more from one lesson. They reuse taught question banks and include written recall/listening where available. The 21-question final review draws one task from each preceding module. Module 1 keeps its existing five interaction buckets/four formats, adding soft-ch, au and eu coverage.
- `lesson-consistency.js` renders list-valued sections as semantic bullets, refreshes authored A1 guides while preserving the custom word-order teaching, and uses native checking/feedback/scoring for short written responses. It provides normal/slow playback for audio questions. A2/B1 teaching content is unchanged.
- `module-one-review.js` also renders the explicit `write` mode outside Module 1, preserving the normal fixed footer and answered-bank cleanup. No microphone is required.
- Progress migration preserves lesson IDs and `fullScores`, archives the old A1 module-review records, and retains review passes only for identical lesson membership. Previously available lessons retain access through stable module keys; the mastery gate in `extracted-batch7-7.js` honors that access. Revised review passes are also stored by stable module key. A2/B1 records are untouched; migration is idempotent and runs after later legacy/cloud progress loads as needed.
- Reference for prerequisite checks: Deutsche Welle, Nicos Weg A1 grammar overview, https://static.dw.com/downloads/52718691/grammar-overview-nicos-weg-a1.pdf. This informs progression; teaching/examples are authored for DeutschLab.
- `scripts/test-a1-practical-course.cjs` executes real script order with inert DOM/storage doubles and validates 880 randomized review runs, complete lesson/topic coverage, ID preservation and migration. `test-a1-verb-sequence.cjs` checks semantic guides, real written lesson handlers and audio. `test-module-one-review.cjs` covers the shared review dock, correct/incorrect answers, matching, cleanup and written review input. None launches a browser.
