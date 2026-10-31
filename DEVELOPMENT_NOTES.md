# DeutschLab — Development Notes
Last consolidated: 2026-10-29

## Purpose and source of truth
DeutschLab is an Android-friendly German learning web app, also tested as a sideloaded APK. The authoritative source code and assets are in this repository (main branch), particularly `index.html`. Before changing anything, inspect the live repository and current code. Prior chat attachments and ZIPs may be outdated. Do not overwrite recent fixes with an old copy.

These notes combine product decisions and reported issues from prior development chats. **They are not a verified implementation checklist**: an item described as requested or reported may already be fixed, and any claim about implementation must be checked against code and tested.

## Delivery and working rules
- Prefer direct GitHub edits when possible; never claim a commit succeeded unless confirmed.
- If providing an update ZIP, include **only changed files** (often `index.html`); do not repackage unchanged images or `deutschlab-native-audio.ogg`.
- Preserve existing character art, scenes, user progress storage, and functional buttons. Avoid broad rewrites for small fixes.
- Test interactive behavior and syntax after changes; regression-check navigation, touch targets, audio, and lesson completion.
- When changes affect several variants of a game (e.g. Build Sentences), inspect and update all relevant implementations.
- Be concise and direct in status reports. Distinguish verified fixes from proposed work.

## Curriculum and lesson rules
- A1 progression requested: basics → pronouns (ich/du/wir) → sentence structure → der/die/das → numbers → question words (wer/was/wo/warum/wann) → common verbs (lernen/haben/sein) → helpful phrases → pronunciation. A2 follows; B1 was planned/placeholder. README describes broader A1–B2 content: verify current course definitions.
- Placement test assigns a starting level and clear 'Start Lesson 1' navigation.
- Module review assesses all material taught; target passing threshold 80% to unlock next module. Prior modules remain accessible. Profile should offer reset-all-progress.
- Avoid answer-revealing prompts and answer audio. Vary vocabulary, verbs, and question types; reinforce newly introduced words.
- Show full English sentence after a question unless already displayed. Avoid repetitive grammar explanations; introduce explanations when context is new.
- Introduce all three articles early, relevant endings such as -es, and examples for ä/ö/ü/ß.
- Pronunciation belongs in its own lesson in Module 1: drills for ä, ö, ü, ß, German z/ts, and meaningful sound contrasts. Do not over-repeat examples or omit ä and ß.
- Speaking layout: large 'Speak now' at top; 'Hear it' and 'Slow' below; controls must remain visible and usable.
- Listening supports German→English and German→German selections. Do not read the correct answer aloud.
- Multiple short conversations/dialogues per level belong in Daily Practice.

## Global interface and feedback
- Keep Back anchored left and Next anchored right at bottom across lessons, reviews, speaking, listening, and games. Avoid duplicated Next buttons and needing to scroll to advance.
- Confirm before abandoning an in-progress lesson.
- Correct answer: audible chime, conspicuous larger 'Correct' feedback, positive character reaction; incorrect: vibration/haptic, distinct 'Try again' feedback. If 'Try again' is shown, the user must actually be able to retry.
- Use half-body animal character portraits emerging from the feedback/dialogue box. Preserve existing characters and expressions, remove decorative symbols, and use separate transparent PNGs as needed.
- Existing avatar families include fox, German Shepherd/dog, cat, and rabbit Hoppel; check repository assets rather than generating unrelated animals.
- Word bank: clear visual separation, tap words to add/remove, no 'Reset words'.
- Hamburger order: Home first, Account/Profile second; Practice Hub under Practice; Dialogues under Daily Practice. Make spacing and alignment consistent; underline only Learn and Practice.
- Menu artwork: keep trees and nature atmosphere, less blur, no X motifs, include a subtle German visual motif.
- Home greeting should vary. XP/avatar unlocks, day streak, and separate 'Fix mistakes' list were requested.

## Practice Hub and games
### Build Sentences
- Both Practice Hub and Games entry points must work; they may use separate code paths.
- Put the sentence/prompt **above** the word bank, visibly larger. Remove unnecessary trailing punctuation clues.
- Speak each word as it is selected/moved. Correct completion should play a chime and show feedback without scrolling.
- Accept alternate grammatically valid word orders where meaning is preserved.
- Support reverse German→English mode and appropriate A1/A2/B1 difficulty.
- No Reset words/Finish duplication; anchored Back/Next.

### Practice Hub Review
- Review must open reliably.
- Selecting an answer should highlight it, with a separate Confirm action; don't submit on first tap.
- Buttons and audio must work; don't let first touch auto-submit.

### Matching
- Wrong choice: vibration; correct: audio. Keep navigation anchored.

### Find It
- Scenes developed include Living Room, Sunny Kitchen, Bathroom, Garden, and Farm/Barn. Do not call both kitchen and garden 'Sunny'; use a distinct garden name.
- Display scene thumbnails in scene selector. Hearts/lives, sounds, and incorrect haptics must function.
- All instances of the target noun should have valid hotspots, e.g. every book, plant, flower, cup where visibly present.
- Living room reports: rug/Teppich left corner and plant on upper-left shelf should be clickable.
- Kitchen reports: cup on table, sink, toothbrush, and multiple plants/books require accurate hotspots.
- Garden reports: lower-left flowers; one visible cup on background table; cat hotspot may overlap bench; frog at fountain looked distorted. Decision: **remove frog as a clickable target** rather than emphasize flawed art.
- Farm reports: red area of barn should count as barn; farm animal nouns should be selectable. Farm scene features rabbit Hoppel; do not add multiple mascot characters or unrelated toilet paper.
- Hotspots should follow the actual scene image coordinates, with overlapping targets handled deliberately. Do not silently penalize taps on visibly correct objects.

## Audio and technical
- Existing native audio sprite `deutschlab-native-audio.ogg` contains a Mutter/Mütter pilot; preserve its filename and references.
- Do not let TTS reveal multiple-choice answers.
- Push-to-talk microphone is preferred over always-on listening.
- Test on Android phone browser and sideloaded APK where relevant.
- Browser speech recognition may be imperfect; assess false positives such as detecting an unspoken final R.

## Reported bugs / regression checklist (verify current status)
- Module 1 Lesson 3 reportedly started without introduction, displayed 'Start' after completion, and said 'Practice again' instead of marking complete.
- Pronunciation 15-question lesson reportedly restarted at question 1 rather than completing.
- Listening sometimes got stuck.
- Practice Hub Review sometimes failed to open; review buttons previously ignored taps.
- Home Build Sentences button previously did nothing.
- Layout changes previously broke Speak now, Hear it, Slow, and example audio buttons.
- Correct chime sometimes failed to play; Correct box and Next required scrolling.
- Incorrect character image was missing and 'Give it another try' showed despite no retry option.
- Find It target bugs listed above.
- Confirm anchored navigation is not clipped on mobile screens.

## Assets and project files
- Main app: `index.html`; audio: `deutschlab-native-audio.ogg`; images include `deutschlab_findit_room.png` and avatar assets.
- Course data currently in repo includes `a1_expanded_course.json`, `a1_foundations.json`, `curriculum.json`, `dialogues.json`, `full_course.json`, and `lesson_exercises.json`.
- README documents deployment, local progress, and optional AI tutor. Never commit an API key.
- Use existing images and files first. Generate or replace artwork only when explicitly requested.

## Next development workflow
1. Read this document and current `README.md`.
2. Inspect current `index.html` and relevant JSON/assets before edits.
3. Confirm the specific reported issue still exists.
4. Make a minimal change, validate syntax and functionality, and preserve unrelated assets.
5. Record what changed, what was tested, and any remaining issues.
6. Update this file when decisions or behavior materially change.

## Next batch: Build a Sentence UI consistency (planned, not implemented)
- Unify the German and English sentence-building layouts.
- Keep bottom-anchored Back and Check Answer buttons on both screens.
- Replace individual selected-word X buttons with Undo Last Word and Start Over.
- Preserve game mechanics and test both directions on Android.
- Module reviews are functional but may need refinement.
