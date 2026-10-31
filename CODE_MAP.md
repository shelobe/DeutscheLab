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
