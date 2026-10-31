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

## Module 2 review
- `js/extracted-batch5-8.js`: `personalPronounReview` supplies 18 questions, six for each current Module 2 lesson. Every run covers ich/du/formal Sie, conversation requests and understanding, and er/sie/es plus she/they distinctions. Question and option order shuffle without dropping topics. Other modules retain their existing selection and all reviews keep native scoring, feedback and mastery handling.

## Module 1 review
- `js/extracted-batch5-8.js`: `soundReview` interleaves five listening, five written sound-pattern, and five spelling-completion questions. `dlReviewFormat` records the format for validation. Listening always includes Wein/Wien and Liebe/Leibe, plus rotating umlaut, consonant-combination and alphabet-sound checks.
- Written tasks apply taught letter/sound patterns to words; spelling tasks complete Schule, fünf, Straße, ich and Buch. Meaning is supplied where necessary to identify the intended word; unrelated vocabulary recall and letter-name trivia are not tested. Native answer checking, feedback, audio playback and mastery handling remain unchanged.

## Review prompt hints
- `js/extracted-batch5-8.js`: `reviewPromptWithoutHints` runs before rendering module-review questions at every level. Listening prompts use neutral wording; pronunciation labels remain in feedback. Review-only cleanup removes explanatory sound glosses, grammar labels and noun-ending instructions, while retaining semantic requirements such as “me”, “formal you”, or “she” needed to make a task unambiguous.
