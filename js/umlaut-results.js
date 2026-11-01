/* Results-page pilot: Umlauts and ß only. Keep native completion side effects. */
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
  const r=result,groups=STRUCTURED_PATH[r.level]||[],group=groups.find(g=>g.ids.includes(r.id));
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
    <p class="dl-umlaut-results-message">${r.passed?'You completed the lesson.':'You’re getting there—try another round.'}</p>
    <strong class="dl-umlaut-results-score">${r.percent}%</strong><p class="dl-umlaut-results-count">${r.score} of ${r.total} correct</p>
    ${r.missed.length?`<button type="button" class="secondary" id="dl-umlaut-review-mistakes">Review mistakes (${r.missed.length})</button>`:'<p class="dl-umlaut-results-perfect">Every answer correct!</p>'}
   </div></section>`;
  const review=document.getElementById('dl-umlaut-review-mistakes');if(review)review.onclick=()=>showMistake(0);
  footer('Back to Lessons',()=>curriculumView(r.level),r.passed?'Continue':'Try again',r.passed?continueLearning:()=>fullBegin(r.id));
  window.dlRefreshFixedNext?.();window.scrollTo(0,0);
 }
 function showMistake(index){
  const r=result,item=r?.missed[index];if(!item)return showResults();
  const q=item.question;
  const answer=q.spellingWord||q.dlWriteAnswer||(q.dlLessonMode==='match'?q.words.join(' · '):q.options?.[q.answer])||'';
  const clips=q.words||q.clips||[q.dlReviewAudio||q.spellingWord].filter(Boolean);
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
  if(!session||unit?.title!=='Umlauts and ß'||unit.level!=='A1')return previousFinish.apply(this,arguments);
  const total=session.questions.length;if(!total)return previousFinish.apply(this,arguments);
  const passed=session.score/total>=.8;
  const priorPassed=!!state.learning?.fullScores?.[session.id]?.passed;
  const name=Math.random()<.5?'Hoppel':'Fuchsie';
  result={id:session.id,level:unit.level,title:unit.title,total,score:session.score,percent:Math.round(session.score/total*100),passed,name,
   image:'./assets/results/'+(name==='Hoppel'?'hoppel':'fuchsie')+'-'+(passed?'celebrate':'encourage')+'.png',
   missed:session.questions.flatMap((question,i)=>session.results[i]===false?[{question}]:[])};
  // Suppress the legacy auto-return to Lessons while preserving its score/mistake saves.
  activeLessonScreen=null;document.body.classList.remove('lesson-screen');
  previousFinish.apply(this,arguments);
  // The legacy seven-question threshold must not mark a ten-question pilot as passed at 6/10.
  const saved=state.learning.fullScores[session.id];saved.passed=passed||priorPassed;saved.total=total;save();
  fullSession=null;showResults();
 };
})();
