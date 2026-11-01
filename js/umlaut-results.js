/* Shared lesson and module-review results. Native completion owns saved progress. */
(function(){
 const previousFinish=fullFinish;
 let result=null;
 const esc=value=>safeText(String(value??''));
 const ownsScreen=()=>!!document.getElementById('dl-umlaut-results');
 function footer(left,leftAction,right,rightAction){
  const dock=document.createElement('div');dock.className='dl-umlaut-results-dock';
  for(const [text,action,secondary] of [[left,leftAction,true],[right,rightAction,false]]){
   const button=document.createElement('button');button.type='button';button.textContent=text;
   if(secondary)button.className='secondary';button.onclick=()=>{if(ownsScreen())action()};dock.append(button);
  }
  document.getElementById('dl-umlaut-results').append(dock);
 }
 function continueLearning(){
  const r=result;if(r.continueAction)return r.continueAction();
  const groups=STRUCTURED_PATH[r.level]||[],group=groups.find(g=>g.ids.includes(r.id));
  const next=group?.ids[group.ids.indexOf(r.id)+1];
  if(next!==undefined)return curriculumLesson(next);
  if(r.level==='A1'&&group===groups[0]&&!state.learning?.pronunciationLesson3Completed&&typeof dlPronunciationIntro==='function')return dlPronunciationIntro();
  curriculumView(r.level);
 }
 function showResults(){
  const r=result;if(!r)return;
  app.innerHTML=`<section id="dl-umlaut-results" aria-labelledby="dl-umlaut-results-heading">
   <p class="dl-umlaut-results-label">${esc(r.title)}</p>
   <div class="dl-umlaut-results-character"><img src="${r.image}" alt="${r.name} ${r.passed?'celebrating your progress':'offering encouragement'}" width="1312" height="1199"></div>
   <div class="dl-umlaut-results-card"><h2 id="dl-umlaut-results-heading">${r.passed?'Great work!':'Keep practicing!'}</h2>
    <p class="dl-umlaut-results-message">${esc(r.message||(r.passed?'You completed the lesson.':'You’re getting there—try another round.'))}</p>
    <strong class="dl-umlaut-results-score">${r.unscored?'Complete!':r.percent+'%'}</strong><p class="dl-umlaut-results-count">${r.unscored?esc(r.count):r.score+' of '+r.total+' correct'}</p>
    ${r.missed.length?`<button type="button" class="secondary" id="dl-umlaut-review-mistakes">Review mistakes (${r.missed.length})</button>`:(r.unscored?'':'<p class="dl-umlaut-results-perfect">'+(r.score===r.total?'Every answer correct!':'Keep building your skills!')+'</p>')}
   </div></section>`;
  const review=document.getElementById('dl-umlaut-review-mistakes');if(review)review.onclick=()=>showMistake(0);
  footer('Back to Lessons',()=>curriculumView(r.level),r.passed?'Continue':'Try again',r.passed?continueLearning:()=>r.retryAction?r.retryAction():fullBegin(r.id));
  window.dlRefreshFixedNext?.();window.scrollTo(0,0);
 }
 function showMistake(index){
  const r=result,item=r?.missed[index];if(!item)return showResults();
  const q=item.question;
  const answer=q.spellingWord||q.dlWriteAnswer||q.dlReviewExpected||q.correct||((q.dlLessonMode==='match'||q.dlReviewMode==='match')?q.words.join(' · '):q.options?.[q.answer])||'';
  const clips=q.words||q.clips||[q.dlReviewAudio||q.spellingWord||q.dlReviewExpected].filter(Boolean);
  app.innerHTML=`<section id="dl-umlaut-results" class="dl-umlaut-mistake" aria-labelledby="dl-umlaut-results-heading">
   <p class="dl-umlaut-results-label">${esc(r.title)} · Mistake ${index+1} of ${r.missed.length}</p>
   <div class="dl-umlaut-results-card"><h2 id="dl-umlaut-results-heading">${esc(q.prompt)}</h2>
    <p class="dl-umlaut-correction"><strong>Correct answer:</strong> ${esc(answer)}</p>
    <p>${esc(q.why||'')}</p><div id="dl-umlaut-mistake-audio"></div>
   </div></section>`;
  const audio=document.getElementById('dl-umlaut-mistake-audio');
  clips.forEach(word=>{const b=document.createElement('button');b.type='button';b.className='secondary';b.textContent='Listen: '+word;b.onclick=()=>{if(ownsScreen())speak(word)};audio.append(b)});
  footer('Back to Results',showResults,index+1<r.missed.length?'Next mistake':'Return to Results',()=>index+1<r.missed.length?showMistake(index+1):showResults());
  window.dlRefreshFixedNext?.();window.scrollTo(0,0);
 }
 fullFinish=function(){
  const session=fullSession,unit=FULL_UNITS[session?.id];
  if(!session||!unit)return previousFinish.apply(this,arguments);
  const total=session.questions.length;if(!total)return previousFinish.apply(this,arguments);
  const passed=session.score/total>=.8;
  const priorPassed=!!state.learning?.fullScores?.[session.id]?.passed;
  const name=Math.random()<.5?'Hoppel':'Fuchsie';
  result={id:session.id,level:unit.level,title:unit.title,total,score:session.score,percent:Math.round(session.score/total*100),passed,name,
   image:'./assets/results/'+(name==='Hoppel'?'hoppel':'fuchsie')+'-'+(passed?'celebrate':'encourage')+'.webp',
   missed:session.questions.flatMap((question,i)=>session.results?.[i]===false?[{question}]:[])};
  // Suppress the legacy auto-return to Lessons while preserving its score/mistake saves.
  activeLessonScreen=null;document.body.classList.remove('lesson-screen');
  previousFinish.apply(this,arguments);
  // Normalize the legacy fixed six-correct threshold to the actual lesson total.
  const saved=state.learning.fullScores[session.id];saved.passed=passed||priorPassed;saved.total=total;save();
  fullSession=null;showResults();
 };
 // Capture original question objects before native review bookkeeping simplifies mistakes.
 const answerReview=curriculumReviewAnswer;
 curriculumReviewAnswer=function(choice){
  const s=moduleSession,q=s?.questions?.[s.idx],unanswered=s&&!s.answered;
  const value=answerReview.apply(this,arguments);
  if(unanswered&&s.answered&&q&&choice!==q.answer){
   s.dlResultMissed??=[];s.dlResultMissed.push({question:{...q}});
  }
  return value;
 };
 const renderReview=curriculumReviewRender;
 curriculumReviewRender=function(){
  const s=moduleSession,finished=s&&s.questions.length>0&&s.idx>=s.questions.length;
  if(!finished)return renderReview.apply(this,arguments);
  const value=renderReview.apply(this,arguments);
  const total=s.dlReviewEnhanced?s.dlCoreCount:s.questions.length;
  const score=s.dlReviewEnhanced?s.dlCoreScore:s.score;
  const group=STRUCTURED_PATH[s.level]?.[s.n],passed=score/total>=.8;
  const name=Math.random()<.5?'Hoppel':'Fuchsie';
  result={level:s.level,title:(group?.title||'Module '+(s.n+1))+' · Review',total,score,percent:Math.round(score/total*100),passed,name,
   image:'./assets/results/'+(name==='Hoppel'?'hoppel':'fuchsie')+'-'+(passed?'celebrate':'encourage')+'.webp',
   message:passed?'You completed the module review.':'Review your mistakes and try another round.',
   missed:s.dlResultMissed||s.dlMissed?.map(q=>({question:q}))||[],
   retryAction:()=>curriculumReview(s.level,s.n),
   continueAction:()=>{const next=STRUCTURED_PATH[s.level]?.[s.n+1];return next?.ids?.length?curriculumLesson(next.ids[0]):curriculumView(s.level)}
  };
  moduleSession=null;showResults();return value;
 };
 window.dlShowPracticeCompletion=function({title,count,retry,continueAction}){
  const name=Math.random()<.5?'Hoppel':'Fuchsie';
  result={level:'A1',title,name,passed:true,unscored:true,count,message:'You completed the practice.',missed:[],
   image:'./assets/results/'+(name==='Hoppel'?'hoppel':'fuchsie')+'-celebrate.webp',retryAction:retry,continueAction};
  showResults();
 };

})();