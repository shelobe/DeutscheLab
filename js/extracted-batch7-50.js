/* Quick Practice: review only completed lessons and the current A1 lesson.
   Higher levels unlock after completing the preceding structured level. */
function quickRandomPractice(){
 ensureLearning();
 const levels=['A1','A2','B1'];
 let allowed=[];
 for(let n=0;n<levels.length;n++){
  const level=levels[n],stats=curriculumStats(level);
  if(n>0){const previous=curriculumStats(levels[n-1]);if(!previous.all.length||!previous.all.every(id=>previous.scores[id]?.passed))break;}
  const first=stats.all.findIndex(id=>!stats.scores[id]?.passed);
  allowed.push(...stats.all.slice(0,first===-1?stats.all.length:first+1));
  if(first!==-1)break;
 }
 const questions=[];
 for(const id of allowed){
  const unit=FULL_UNITS[id];if(!unit)continue;
  for(const q of fullQuestions(unit)){
   if(q.type==='listen'||!Array.isArray(q.options)||!Number.isInteger(q.answer)||!q.prompt)continue;
   questions.push({...q,unitId:id});
  }
 }
 for(let i=questions.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[questions[i],questions[j]]=[questions[j],questions[i]];}
 const session={questions:questions.slice(0,6),idx:0,score:0,answered:false};
 function render(){
  if(session.idx>=session.questions.length){app.innerHTML='<section class="card"><h2>Quick Practice complete</h2><p>'+session.score+' of '+session.questions.length+' correct</p><button onclick="quickRandomPractice()">Practice again</button><button class="secondary" onclick="practiceHub()">Practice Hub</button></section>';return;}
  const q=session.questions[session.idx];session.answered=false;
  app.innerHTML='<section class="card"><p class="curriculum-pill">Quick Practice · '+(session.idx+1)+'/'+session.questions.length+'</p><h2>'+safeText(q.prompt)+'</h2><div class="picture-choices">'+q.options.map((o,i)=>'<button class="secondary" onclick="dlQuickPracticeAnswer('+i+')">'+safeText(o)+'</button>').join('')+'</div><div id="dlQuickPracticeFeedback" aria-live="polite"></div></section><button class="secondary" onclick="practiceHub()">Back to Practice Hub</button>';
  window.scrollTo(0,0);
 }
 window.dlQuickPracticeAnswer=function(i){
  if(session.answered)return;session.answered=true;
  const q=session.questions[session.idx],ok=i===q.answer;if(ok)session.score++;
  app.querySelectorAll('.picture-choices button').forEach(b=>b.disabled=true);
  document.getElementById('dlQuickPracticeFeedback').innerHTML='<div class="unit-explain"><strong>'+(ok?'Correct':'Not quite')+'</strong><p>'+safeText(q.options[q.answer])+'</p><p>'+safeText(q.why||FULL_UNITS[q.unitId].rule||'')+'</p><button onclick="dlQuickPracticeNext()">Next question</button></div>';
 };
 window.dlQuickPracticeNext=function(){if(!session.answered)return;session.idx++;render();};
 if(!session.questions.length){app.innerHTML='<section class="card"><h2>Quick Practice</h2><p>Start your first lesson to unlock practice questions.</p><button onclick="curriculumContinueFromHome()">Continue learning</button></section>';return;}
 render();
}
