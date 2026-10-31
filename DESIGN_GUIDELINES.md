# DeutschLab — Design & Development Guidelines

This document records established product decisions. The current `main` branch is authoritative for actual implementation and assets. Inspect existing code and image files before modifying them; do not treat this document as proof that an asset exists.

## Visual identity
- Mobile-first German-learning experience with a calm, nature-inspired background, rounded panels, and clear, readable typography.
- Preserve existing colors, backgrounds, typography, illustrations, and layout conventions unless explicitly asked to change them.
- Avoid unnecessary decoration, duplicate labels, oversized headers, and avoidable scrolling.
- Keep interactive targets comfortably usable on Android phone screens.

## Characters and artwork
- Established avatar types include a fox, German Shepherd, and cat, with German names as defined in the application. Read actual code/assets for their exact names and appearances.
- Never invent additional established characters or change existing animals' appearance, expression, or identity without approval.
- Reuse existing artwork where appropriate. For feedback, character artwork is designed to appear as half-body figures popping out of feedback boxes.
- Correct responses can show positive affirmations; incorrect responses should provide an appropriate reaction without falsely promising a retry when no retry is possible.
- Before generating new images, inspect the current assets and ask for approval for major artwork replacements.
- Preserve original images and scene hotspots when editing interactive games. Never assume an image is unused without comparing repository references.

## Interaction conventions
- Prefer consistent bottom-anchored Back and Next/Continue actions on lesson and practice screens; avoid duplicated navigation controls.
- A single anchored action should use the available footer space rather than sit cramped in a corner.
- Keep exit confirmations for unfinished lessons or games where implemented; reset game progress on confirmed exit where that game's design calls for it.
- Correct answers use the existing chime/affirmation patterns; incorrect answers use existing haptics and feedback patterns.
- Speaking activities use push-to-talk, not continuous listening; preserve Hear it and Slow controls where present.
- Do not read answers aloud automatically or reveal answers in prompts.
- Make buttons and feedback visible without excessive scrolling.

## Learning experience
- Preserve the existing A1/A2 learning path, review logic, progression gates, and placement behavior.
- Reuse and reinforce vocabulary; support valid alternative word orders in sentence-building activities when appropriate.
- Preserve pronunciation, listening, dialogues, games, mistake review, and progress tracking.
- Do not remove features or reintroduce previously rejected layouts unless specifically requested.

## Development and verification
- At the start of every development task, fetch the latest `index.html` from `shelobe/DeutscheLab` on `main`; inspect related assets/files as needed.
- Make only requested changes and preserve all other behavior.
- Check syntax, relevant UI event handlers, navigation, mobile layout, and affected game/lesson flows before committing, to the extent available tooling permits.
- Never fabricate filenames, unused-asset inventories, test results, or commit confirmations.
- Commit directly to `main` through GitHub. Report the actual commit SHA; if access or validation fails, state what was not completed.
- No ZIP files or manual uploads unless explicitly requested.
- For major redesigns or character replacements, obtain approval first. Minor targeted corrections can be committed directly.

## Efficient GitHub change management
- For multi-file refactors or extraction batches, first inspect the latest `main` state, existing extracted files, and available GitHub Git Data API capabilities.
- Prefer a single atomic tree/commit/ref update for related files instead of creating or committing files individually. Preserve existing files and original script execution order.
- Reuse already-created files; verify exact content mapping and avoid duplicate script execution before committing.
- Validate JavaScript syntax and script references before the bulk commit, and verify the resulting `main` commit and changed files afterward. Never assume a partially interrupted operation failed without checking GitHub.
- Avoid unnecessary GitHub calls and report tool limits or incomplete validation accurately.

## A1 Basic word order lesson
- Teach both subject-first and time-first statements using paired examples and word-arranging exercises with supplied verb forms.
- Explain that a multiword time expression can occupy one position. Use explicit starting-word instructions when practicing a particular order; distinguish grammatical alternatives from failure to follow that instruction.
- Preserve the standard lesson score, progress, feedback and exit behavior; keep Back and Check reachable at the bottom on phones.

## Lesson teaching and question variety
- Present teaching in short, titled sections with examples and a highlighted Remember card. Preserve established detailed guides rather than replacing them with a generic layout.
- A1 topic stages have distinct jobs: vocabulary connects expressions to meanings; sentence patterns practice construction; understanding in context uses practical situations. Do not give all three stages the same translation bank.
- Include examples for every expression assessed in a topic stage. Advanced lessons mix meaning, usage, sentence structure and applied grammar; vary vocabulary and retain established checkpoints where useful.
- Keep corrections and useful explanations after checking, and preserve the existing lesson scoring, saved IDs, progress gates, audio and navigation.

## Review question relevance
- Assess practical language understanding: recognize spoken words, match sounds to usable spellings, interpret taught words and phrases, or choose language for a situation. Avoid trivia about letter counts/names, abstract sound-sequence puzzles, and tests of pronunciation terminology. Keep technical explanations as teaching or feedback rather than mastery requirements.
