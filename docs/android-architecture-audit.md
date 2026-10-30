# DeutschLab Android foundation — initial architecture audit

Date: 2026-10-30
Branch: development/android-foundation
Source: index.html on this branch (677,992 characters at audit time)

## Findings
- Main HTML combines application UI, styling, behavior, and some content.
- 130 `<style` blocks and 103 `<script` blocks; counts are tags, not unique modules.
- Browser APIs: speechSynthesis, webkitSpeechRecognition, localStorage, sessionStorage, service worker, fetch.
- Referenced external content includes a1_foundations.json, a1_expanded_course.json, dialogues.json, and deutschlab-native-audio.ogg.
- Functionality includes lesson navigation, practice hub, games, supermarket checkout, feedback, and audio.
- A complete repository asset inventory and actual Android WebView compatibility test remain outstanding.

## Architecture goals
1. Preserve behavior and visual parity in web and Android builds.
2. Split shared engine from content: levels/modules/questions, game definitions/rooms/hotspots, dialogues, characters/animations, audio, achievements/progress.
3. Define stable versioned content schemas and validation before moving lessons.
4. Abstract persistence (browser storage now; optional cloud later), audio/microphone, and platform navigation behind adapters.
5. Keep one source tree for browser and Capacitor Android; avoid duplicating content.
6. Keep existing IDs and saved progress compatible or supply explicit migrations.
7. Make new A2/B1/B2 modules, game scenes, avatars, dialogue branches and audio packs additive.
8. Maintain offline behavior where practical and protect any future API credentials.
9. Move incrementally with feature-by-feature regression checks; do not rewrite all at once.

## Proposed sequence
1. Inventory repository files, dynamic asset paths and existing data schemas.
2. Establish smoke tests for navigation, game completion, audio, saved progress, and checkout.
3. Add a minimal Capacitor shell on this branch, without modifying main.
4. Build and test an Android APK, especially speech recognition, speech playback and storage.
5. Extract CSS/JS and structured content in small verified steps.
6. Introduce content registry and extensible game/lesson schema; retain browser deployment.

## Guardrails
- `main` stays live and unchanged until explicit integration.
- Backup branch: backup/pre-android-migration-2026-10-30.
- All development commits target development/android-foundation.
- Verify the latest file SHA before each change; do not overwrite newer work.
- No assertion of Android compatibility until tested on device.
