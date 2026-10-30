# DeutschLab Android development (experimental)

This branch adds **Capacitor scaffolding only**. The live GitHub Pages site on `main` is untouched. No APK has been built or device-tested yet.

## Prerequisites
Node.js, npm, Java JDK and Android Studio with Android SDK.

## First Android build
```sh
npm install
npm run build:web
npx cap add android
npx cap sync android
npx cap open android
```

Build/debug in Android Studio. Subsequent web changes: `npm run android:sync`.

The build script copies existing web assets to `www/` and intentionally leaves source files unchanged. The generated Android project should be reviewed before committing. Microphone permissions, speech recognition, TTS, storage, service-worker behavior and network requests need Android testing.

## Content expansion roadmap
Keep game rules, lessons, dialogues, scenes, media, character definitions and progression separate from platform APIs. Introduce versioned schemas and migrations incrementally after first smoke tests.

## Security note
The existing app references OpenAI API endpoints from client-side code. Do not bundle any private API key into the APK. Use a backend proxy if AI functionality is restored in a public release.
