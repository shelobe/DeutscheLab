
(function(){
 const previousFullMark=fullMark;
 fullMark=function(ok,answer,why){
  previousFullMark(ok,answer,why);
  const box=document.querySelector('#fullFeedback .unit-explain');
  if(!box)return;
  const explanation=String(why||'').trim();
  box.innerHTML='<strong>'+(ok?'Correct!':'Not quite')+'</strong>'+
   (ok?'':'<p>Correct answer: '+safeText(answer)+'</p>')+
   (explanation?'<details class="dl-grammar-help"><summary>Grammar help</summary><p>'+safeText(explanation)+'</p></details>':'');
 };
 const previousReviewAnswer=curriculumReviewAnswer;
 curriculumReviewAnswer=function(i){
  const s=moduleSession,q=s&&s.questions[s.idx];
  previousReviewAnswer(i);
  if(!s||!q)return;
  const box=document.querySelector('#moduleFeedback .unit-explain');
  if(!box)return;
  const ok=i===q.answer,explanation=String(q.why||FULL_UNITS[q.unitId]?.rule||'').trim();
  const next=box.querySelector('button');
  box.innerHTML='<strong>'+(ok?'Correct!':'Not quite')+'</strong>'+
   (ok?'':'<p>Correct answer: '+safeText(q.options[q.answer])+'</p>')+
   (explanation?'<details class="dl-grammar-help"><summary>Grammar help</summary><p>'+safeText(explanation)+'</p></details>':'');
  if(next)box.appendChild(next);
 };
})();

