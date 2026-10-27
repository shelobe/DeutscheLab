# DeutschLab 🇩🇪

**DeutschLab** is a mobile-friendly German-learning web app combining guided lessons, independent practice, and an AI conversation tutor. It is designed for learners who want to study German at their own pace, from beginner fundamentals to more advanced grammar and conversation.

**Try the app:** https://shelobe.github.io/DeutscheLab/

## Features

- **German lessons (A1–B2):** Vocabulary, sentence structure, verb forms, cases, and grammar exercises, with explanations and feedback.
- **Placement check:** A short assessment to help you choose where to begin. It is not an official CEFR certification.
- **Interactive practice:** Activities for reviewing mistakes, noun articles, picture vocabulary, matching, reading, writing, and dictation.
- **Listening and speaking:** German text-to-speech and browser-supported speech recognition.
- **AI German Tutor:** Choose a language level and conversation scenario, then practice by typing or speaking German. The chat-focused interface keeps the conversation prominent, with voice options available separately.
- **Progress tracking:** Lesson progress and practice data are stored locally in your browser.
- **Mobile-friendly design:** Works in a phone browser and is designed for convenient practice on the go.

## Getting started

1. Open [DeutschLab](https://shelobe.github.io/DeutscheLab/).
2. Take the placement check or select a lesson level.
3. Work through lessons, explore practice activities, or start an AI Tutor conversation.

To add DeutschLab to your Android home screen, open the website in Chrome, open the browser menu, and choose **Add to Home screen** or **Install app** if available.

## Using the AI Tutor

The AI Tutor uses the **OpenAI API** to generate conversation responses. To use it:

1. Obtain your own API key from [OpenAI's API platform](https://platform.openai.com/).
2. Enter the key in the AI Tutor setup screen.
3. Select a German level and conversation scenario.
4. Start a conversation and type or speak your replies.

**Important:** OpenAI API usage is billed separately from ChatGPT subscriptions. AI Tutor responses require an internet connection. AI-generated responses may contain mistakes.

### API key privacy

DeutschLab offers an optional **Remember API key on this device** setting. When enabled, the key is saved in the browser's local storage so you do not need to re-enter it each time. You can remove it with **Forget saved key**.

The key is **not committed to this GitHub repository**. However, browser local storage is not encrypted credential storage. Avoid saving an API key on shared devices, and never add a real API key to repository files or GitHub commits.

## Browser support and data

DeutschLab is built as a browser-based app. Speech recognition, audio playback, and installation behavior can vary by browser and device. Saved progress and a remembered API key may be lost if you clear site data or remove the installed app.

## Project status

DeutschLab is a personal, actively developed learning project. Features and lesson content may change as the app is refined. It is not affiliated with Duolingo, the Goethe-Institut, or OpenAI.
