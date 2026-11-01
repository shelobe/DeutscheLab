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

- Review prompts must not reveal the target letter/sound, grammatical gender/case, or solving rule before submission. Listening prompts should simply ask learners to choose the word they hear. Keep required meaning/context, and place sound or grammar explanations in post-answer feedback.

- Module reviews should mix interactions appropriate to the taught skills, including recall and production rather than only multiple-choice recognition. Module 1 keeps 15 interleaved tasks. Its Umlauts and ß pilot adds one letter-tile and one inline missing-letter task, alongside five listening choices, two dictations, three recording comparisons and three audio-to-word matches. Future modules should choose formats that assess their own learning objectives, use taught examples, and avoid visual matching shortcuts, trivia and unrelated vocabulary recall.

## Verification preference
- Do not open or interact with the live app in a browser unless the user explicitly asks. Do not navigate lessons, capture browser screenshots or visually inspect the app independently. Make changes through GitHub and use code inspection, syntax checks and lightweight automated tests. The user will test the app and report issues. Keep other troubleshooting and code-quality checks in place.

- New review formats must integrate the existing fixed action dock before and after checking, remove submitted answer banks, and expose feedback without scrolling past disabled controls. Matching keeps recordings and words in separate aligned columns. Speech recognition failure must leave a reachable assessed alternative; never trap the learner or silently count misrecognition as wrong. Verify the shared footer and cleanup together with question handlers.

- Present conjugated forms as separate bullet points, with their subject, ending and meaning easy to scan. Introduce regular endings before assessing verb agreement. Teach common stem-vowel changes explicitly in A1 after the regular pattern, with a forward reference from the regular lesson. Keep module reviews restricted to their own taught lesson banks and cover every lesson before sampling more questions from one lesson.

## Practical A1 progression
- Build the course around useful communication. Introduce a phrase as a usable chunk when appropriate; teach its grammar before asking learners to manipulate that grammar.
- Canonical module membership resolves by exact lesson title and stable module keys. Preserve lesson IDs; never assume an appended lesson has a particular numeric ID. Every module must be nonempty and every formerly linked lesson must remain reachable unless explicitly consolidated.
- Teach vocabulary before its sentence-pattern and situation tasks. Provide examples and translations for every assessed expression, and list subject/verb forms separately. Introduce regular verbs before systematic vowel changes; teach noun articles before case changes.
- Ordinary module reviews cover every lesson using only its own taught banks, up to 15 questions. The cumulative final reviews earlier topics deliberately. Mix meaning, practical situations, reading, short written recall and suitable listening; avoid technical terminology quizzes and answer-revealing hints.
- Course reorganization retains lesson scores and prior access but must not turn an unrelated old module pass into a new pass. Archive legacy review records, migrate stable membership matches and test fresh/returning progress.

- When adding lesson content, update its practice and module review to assess the new skill, and keep introductions/counts consistent. Preserve the agreed review length by replacing redundant coverage when appropriate.

- Prioritize readable teaching over compactness: put distinct phrases, forms or instructional statements on separate bullets. Include a Remember card only when it provides a specific useful rule, contrast or memory aid; omit generic practice advice.

- Keep word, phrase and sentence playback inside its matching information box, directly beneath the relevant teaching item. Preserve bullets while aligning audio boxes to shared card edges. Retain playback handlers and anchored navigation.

- Avoid duplicate plain/audio banks. Keep teaching, useful context and playback together; hide only translations already explained directly above.

- For bilingual phrase bullets with usage advice, bold the German–English phrase line and put the usage explanation on a separate line consistently. Remove redundant example-only cards when the same examples are already taught and playable above.

- Teaching-card headings use a consistent larger 1.3rem bold style across lesson guides, pronunciation, conversation, article/case and word-order explanations so titles stand apart from body text. Avoid a separate full stop after an ellipsis placeholder.

- German-text answer choices play their phrase when selected in lessons and module reviews, so learners hear and read together. English choices stay silent. Preserve existing separate Check answer controls; custom dictation, comparison and matching submissions must not play synthetic answer choices.

- Written-answer character keys are collapsed under a Special characters disclosure by default. General written German accepts ae/oe/ue for ä/ö/ü and ss for expected ß, with standard spelling in feedback. Do not accept plain a/o/u for umlauts. Sound, spelling and dictation tasks retain strict character checks.

- Module cards use a visible rounded Show lessons + / Hide lessons − disclosure beneath the description, consistently across completion states and levels. Preserve native summary/details interaction and separate completion badges.

## Documentation synchronization with implementation commits
- For every application change, review whether it changes an established visual layout, lesson teaching pattern, interaction, navigation behavior, audio convention, or other design rule. This check is mandatory even for small Chat changes.
- Treat current implementation on `main` as the source of truth for what the app does. Compare affected code and recently updated equivalent screens before applying a guideline; do not revive an older layout just because it remains documented.
- When a change introduces, revises, or retires a lasting design convention, update `DESIGN_GUIDELINES.md` **in the same GitHub commit** as the implementation. Document the approved end state, not a speculative design or temporary workaround.
- If the implementation does not alter a documented convention, leave the guidelines unchanged; avoid unrelated rewrites or automatic documentation churn.
- Before committing, check that changed implementation and relevant guidelines agree. If they conflict, resolve the discrepancy against the latest approved implementation and user decisions, without silently changing unrelated screens.
- Record significant changes to feature ownership, file locations or script loading in `CODE_MAP.md` in the same commit when applicable. Keep roadmap task statuses and handoffs in `DEVELOPMENT_ROADMAP.md` when a tracked milestone changes.
- Apply this rule to both regular Chat and Work development. It is a required development practice, **not** a background watcher: GitHub edits made outside this workflow will not automatically rewrite documentation. A separate GitHub Action would be needed to flag such edits.

## A1 pets, farewells and final-consonant pronunciation
- Teach **Bis bald!** as a friendly “See you soon!” farewell in Greetings and polite expressions, with a playable example and a practical farewell question.
- Teach **Pets: Haustiere** after direct-object articles and before accusative pronouns; use common pets and real ownership questions, distinguishing einen Hund, eine Katze, plural quantities and keine Haustiere.
- Include final **d** pronounced /t/ in the dedicated A1 pronunciation introduction and practice, contrasting Hund and Hunde. Retain the shared pronunciation controls and completion behavior.

## Module 3 pronoun lesson boundaries
- Lesson 2 teaches and assesses er/sie/es; Lesson 3 owns wir/ihr/sie for groups. Keep she/they/formal-you contrasts brief and contextual. Formal Sie is a politeness contrast, not a group-only pronoun.
- Omit the removed Useful words in the examples card in Lesson 2. Delete empty example cards after moving playback beside teaching; do not restore their removed content. Preserve the remaining playable examples and individual group-pronoun audio.

## Shared teaching presentation (approved global rollout)
- In Personal pronouns: we, you all, they, keep individual Listen rows inside the matching explanation card beneath each pronoun. Enlarge and bold the German pronouns in teaching bullets and playback rows. Use short role bullets and separate she/they/polite-you reminders, with sentence-start capitalization explained separately. This layout is approved for other applicable teaching screens; preserve bespoke content, tables and interaction controls.

- Phrase teaching and playback belong together inside their matching information box. Keep useful context outside the teal audio row and omit repeated translations.

- Sentence-example sections may use their own teaching card when they add new context; avoid a duplicate external phrase bank.

- In the group-pronoun lesson, retain Who is in the group?, Remember, Choose by your role and the sentence-example teaching card. Preserve meaningful contexts and playback.

- Group-pronoun sentence contexts describe the situation without trailing “use wir/ihr/sie” instructions. Keep the lesson card’s bottom padding compact; reserve fixed-button clearance outside the card rather than as empty interior space.

- Playable word and sentence audio rows throughout the app use a muted teal background with a lighter teal border and distinct Listen button, separating playback from blue teaching cards while retaining light, readable text.

- Remember uses muted amber with warm cream text; Note uses muted plum with pale lavender text. Retain the established rounded card shapes and typography. Apply these semantic colors across levels and custom pronunciation, conversation, article/case and word-order guides. Identify a card by its heading, not by its position. Coming up and A note on… are Note cards; ordinary final cards are not automatically highlighted.

- Shared teaching styles live in `css/teaching-presentation.css`; `js/teaching-presentation.js` applies semantic markers to established guide layouts and dynamically rendered screens. Keep bilingual phrase lines bold, usage on its own line and German playback text enlarged. Preserve original audio handlers, lesson content, progress and navigation. Do not classify the sentence builder’s “Your sentence” display as an informational Note.

- Every Listen box sits directly beneath its relevant explanation, including repeated words illustrating different sounds. Do not collect unrelated audio at a card bottom.

- `js/teaching-presentation.js` applies final in-card placement across shared guides. One-token words keep the word style; multiword phrases and sentences use smaller 1.05em German playback text. Preserve handlers and remove empty duplicate shells.

- Single-word audio boxes show the German word and Listen control without repeating translations or pronunciation explanations already given in the matching teaching item. Keep any unique meaning that is not taught there. Phrase/sentence examples retain their translations and context.

## Approved integrated teaching audio — global rollout
- Approved reference: Greetings and polite expressions, including the audio-box alignment trial in commit 79de276af031ba17c86ccb6ec196f87e483020e9.
- Target convention for applicable lesson teaching: keep word, phrase and sentence playback inside the matching learning information box, directly beneath the relevant explanation. Preserve teaching bullets, but align all audio boxes to the same left and right edges within each card, independent of bullet indentation.
- Use smaller German phrase/sentence text (1.05em) to fit with teaching content. Keep Listen controls and original playback handlers. Omit translations or explanations inside audio boxes when already provided directly above; retain unique meanings and useful context.
- Avoid duplicate external phrase banks and repeated context headings. Preserve bespoke teaching, navigation, progress and accessibility.
- Applied globally through the shared teaching presentation and audio grouping. Preserve bespoke content, original audio nodes/handlers, navigation and saved progress.

## Spelling preview scope
- Spelling preview is a separate, unsaved menu demo for reviewing candidate activities. Existing lessons and review banks remain unchanged. Letter tiles, missing-letter and recall samples are experimental; their inclusion does not approve a curriculum-wide rollout.

- The isolated preview follows existing screen-bottom Back/Check → Next navigation and shared result-badge styling. It fills the visible viewport and resizes above the mobile keyboard. Missing-letter blanks use a single input underline, without underscore placeholder text; focus highlights that underline and shows the text cursor without a surrounding box. A complete answer enables Check without a separate Listen prerequisite. These corrections apply only to the preview.

- Preview missing-letter activities place a native editable blank inline between the fixed word parts; typing and special-character keys fill that position, and Backspace clears it. Feedback uses the existing unit-explain wrapper and shared result badge without preview-specific badge or avatar size overrides. Correct preview answers call the existing feedbackSound(true), respecting the app's Answer sounds setting. Inline blanks use explicit character-sized widths rather than browser input size hints. This remains a preview-only convention.

## Spelling pilot: Umlauts and ß
- Trial letter tiles and inline missing-letter entry in this one A1 lesson and its Module 1 review. Use only taught words: Käse and Straße for lesson tile construction, schön for the inline ö blank, and retain full-word fünf and heißen writing. Keep the lesson at ten questions and Module 1 review at fifteen.
- Use native lesson/review checking, scoring, progress, sounds, feedback characters and fixed action controls. Letter tiles track individual positions so repeated letters work. Missing letters use one underline and a cursor, with collapsed special-character keys. Do not require a separate Listen action to enable a completed answer.
- Lesson Back retains the existing leave warning and returns to Lessons. Preview Back now also warns before discarding the current preview and returning to Lessons; cancel keeps the current activity intact. Other lessons remain unchanged.


- Spelling tile banks have a subtle rounded teal frame around the selectable letters. Keep Undo and Start over outside the frame, and retain wrapping and comfortable tap targets.

## Lesson results pilot: Umlauts and ß only
- This A1 lesson alone uses the new completion page; other lessons and module reviews retain their existing completion behavior pending approval.
- Randomly choose approved Hoppel or Fuchsie artwork for each completion: celebratory at 80–100%, gently encouraging below 80%. Keep the same character when returning from mistake review. Use the approved transparent half-body images directly above the rounded score card.
- Show a short encouraging message, percentage, and correct/total count. Offer optional read-only review of this attempt’s missed questions, with correct answers, explanations and relevant playback; no second scoring or progress updates.
- Anchor Back to Lessons on the left and Continue (80%+) or Try again (below 80%) on the right. Continue opens the next lesson in the module, then the Module 1 pronunciation lesson when applicable, otherwise Lessons.
- Preserve native completion saves, prior passes, answer sounds, XP and mistake tracking. Calculate the pilot pass threshold from its actual ten-question total (8/10), preserving any previously earned pass. No global rollout is approved.

- Results-pilot artwork is slightly enlarged and centered, with its base tucked 10px behind the card’s top border. Keep a little more space below the lesson label so the score card sits lower; retain the compact short-screen variant and fixed navigation.
