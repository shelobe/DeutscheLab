
/* Reliable guided lesson start: initialize the question set before rendering.
   Avoid legacy nested start handlers that may leave the introduction in place. */
fullBegin = function(id) {
  const unit = FULL_UNITS[id];
  if (!unit) return;
  fullSession = null;
  const questions = fullQuestions(unit);
  if (!Array.isArray(questions) || questions.length === 0) {
    alert('No practice questions are available for this lesson.');
    return;
  }
  fullSession = {id, idx:0, score:0, picks:[], results:[], questions};
  dlSelected = null; dlAnswered = false; dlShowTip = false;
  activeLessonScreen = id;
  document.body.classList.add('lesson-screen');
  try {
    ensureLearning();
    state.learning.fullAttempts ??= {};
    state.learning.fullAttempts[id] = (state.learning.fullAttempts[id] || 0) + 1;
    save();
  } catch (error) { console.warn('Unable to save lesson attempt', error); }
  fullRender();
};

