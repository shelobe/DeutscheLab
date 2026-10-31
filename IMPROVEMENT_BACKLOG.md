# DeutschLab — Improvement Backlog

This file tracks deferred changes discussed during development. It is a planning record, not a claim that an item has been implemented. Keep completed items in Git history and update status here when work is committed and verified.

## Deferred improvements

### 1. Build a Sentence — mistake-aware Help
- **Status:** Not started
- **Timing:** After code modularization and associated regression testing
- Replace repetitive generic Help messages with feedback based on the player's actual answer.
- Identify relevant issues such as word order, verb position, missing words, article/case, or inflection when detectable.
- Offer progressively more specific guidance without immediately giving away the complete solution.
- Preserve existing answer validation, navigation, sounds, and progress saving.

### 2. Expand A1 lesson explanations consistently
- **Status:** Not started
- **Timing:** After code modularization
- Expand brief or dense teaching sections using the established lesson format, with short readable sections rather than large text blocks.
- Specifically revisit **The verb sein: to be**: when to use it, bin/bist/ist/sind/seid, matching subjects and verb forms, examples with translations, and a highlighted Remember section.
- Improve question variety where existing basic questions feel repetitive, while retaining useful practice and correct feedback.
- Review other lessons for the same presentation consistency; do not assume every lesson requires identical edits.

## Working rules
- Read current `index.html`, `DESIGN_GUIDELINES.md`, and relevant assets from GitHub before implementation.
- Keep the established Android-friendly design, artwork, lesson structure, and existing functionality.
- Make changes directly on `main`, test what is possible, and record the actual commit SHA.
- Move an item to **In progress** only when implementation starts, and **Completed** only after a successful commit; distinguish automated checks from user-confirmed browser testing.
- Add new requests here when the user asks to defer them.

## Additional items to review

- **A2 and B1 expansion — Planned:** Expand lessons and varied exercises in the established teaching format; audit existing coverage first.
- **Pronunciation discoverability — Review needed:** Check how learners access pronunciation and push-to-talk activities from Practice.
- **Dialogue visuals — Verify status:** Check earlier request for compact dialogue panels and Fritzi artwork without a white background; inspect existing assets before changing.
- **Mobile consistency — Audit needed:** Review anchored Back/Next controls, feedback visibility, sounds, haptics, and character placement across activities. Do not redo completed fixes.

### A1 Basic Word Order — time expressions and verb-second practice
- **Status:** Not started; schedule after modularization and Batch 6 regression testing.
- Replace excessive pronoun/verb-conjugation multiple choice with sentence-order activities.
- Teach that the finite verb stays in position two in ordinary declarative main clauses, while the subject can follow the verb when a time expression comes first.
- Contrast examples such as `Ich habe heute Zeit.` and `Heute habe ich Zeit.`; include `Morgen gehe ich einkaufen.`
- Vary time placement, sentence rearrangement, and meaningful distractors. Retain the established explanation-style feedback cards.
- **Possible activity format:** Reuse the existing Build a Sentence word-arrangement interaction so learners place the time expression, verb, subject, and other words in the correct order. Evaluate sentence structure rather than just verb conjugation; preserve the lesson's explanation-style feedback.
