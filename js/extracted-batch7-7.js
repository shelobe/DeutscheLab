
/* Module mastery: 80% review score unlocks the next module. */
(function(){
 const passed=(level,n)=>!!state.learning?.moduleReviews?.[level+'-'+n]?.passed;
 const unlocked=(level,n)=>Array.from({length:n},(_,i)=>i).every(i=>passed(level,i));
 const moduleOf=(level,id)=>(STRUCTURED_PATH[level]||[]).findIndex(g=>g.ids.includes(id));
 const oldView=curriculumView;
 curriculumView=function(level){
  oldView(level);
  const groups=STRUCTURED_PATH[level]||[];
  document.querySelectorAll('.curriculum-path-module').forEach((card,n)=>{
   if(!groups[n])return;
   const summary=card.querySelector('summary');
   const note=document.createElement('p');note.className='dl-gate-note';
   if(!unlocked(level,n)){
    card.classList.add('dl-locked');card.open=false;
    note.textContent='Locked · Pass the previous module review with at least 80%';
    summary?.addEventListener('click',e=>e.preventDefault());
    card.querySelectorAll('button').forEach(b=>b.disabled=true);
   }else if(passed(level,n)){
    note.textContent='Review passed · Lessons remain available';
   }else{
    note.textContent='Score 80% or higher on this review to unlock the next module';
   }
   summary?.appendChild(note);
  });
  const top=document.querySelector('.curriculum-path-summary');
  const continueButton=top?.querySelector('button[onclick^="curriculumLesson("]');
  if(continueButton){
   let n=groups.findIndex((g,i)=>unlocked(level,i)&&!passed(level,i));
   if(n<0)n=groups.length-1;
   if(n>=0){
    const nextId=groups[n].ids.find(id=>!state.learning?.fullScores?.[id]?.passed);
    if(nextId!==undefined){
     continueButton.textContent='Continue: '+(FULL_UNITS[nextId]?.title||'next lesson');
     continueButton.setAttribute('onclick','curriculumLesson('+nextId+')');
    }else if(!passed(level,n)){
     continueButton.textContent='Take module '+(n+1)+' review · 80% to pass';
     continueButton.setAttribute('onclick',"curriculumReview('"+level+"',"+n+")");
    }
   }
  }
 };
 function deny(level,n){
  if(unlocked(level,n))return false;
  curriculumView(level);
  return true;
 }
 const oldLesson=curriculumLesson;
 curriculumLesson=function(id){
  const level=FULL_UNITS[id]?.level,n=moduleOf(level,id);
  if(n>=0&&deny(level,n))return;
  return oldLesson(id);
 };
 const oldIntro=curriculumModuleIntro;
 curriculumModuleIntro=function(level,n){if(deny(level,n))return;return oldIntro(level,n)};
 const oldReview=curriculumReview;
 curriculumReview=function(level,n){if(deny(level,n))return;return oldReview(level,n)};
})();
