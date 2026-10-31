
/* Unified review entry: show saved mistakes and direct links to the relevant lesson. */
(function(){
 const priorReview=review;
 review=function(){
   ensureLearning();
   const p=practiceState();
   const snaps=Object.keys(p.mistakes||{}).filter(k=>k.startsWith('snap:')&&p.snapshots?.[k]);
   const legacy=(state.mistakes||[]).filter(x=>x?.question);
   const units=(state.learning.fullMistakes||[]).filter(x=>Number.isInteger(x.unit)&&FULL_UNITS[x.unit]);
   const unitIds=[...new Set(units.map(x=>x.unit))];
   const reviewCount=snaps.length+legacy.length+units.length;
   const snapshotRows=snaps.map((key,i)=>{
     const q=p.snapshots[key];
     const unitId=FULL_UNITS.findIndex(u=>u.title===q.unitTitle&&u.level===q.level);
     return `<div class="card"><p><strong>${safeText(q.prompt)}</strong></p><p>${safeText(q.level||'')} ${safeText(q.unitTitle||'')}</p><button onclick="dlReviewSaved(${i})">Practice missed questions</button>${unitId>=0?` <button class="secondary" onclick="fullStudy(${unitId})">Open lesson</button>`:''}</div>`;
   }).join('');
   const unitRows=unitIds.map(id=>`<div class="card"><strong>${safeText(FULL_UNITS[id].level+' · '+FULL_UNITS[id].title)}</strong><p>${units.filter(x=>x.unit===id).length} missed answer(s)</p><button onclick="fullBegin(${id})">Retake quiz</button> <button class="secondary" onclick="fullStudy(${id})">Review lesson</button></div>`).join('');
   const legacyRow=legacy.length?`<div class="card"><p>${legacy.length} earlier missed question(s)</p><button onclick="dlLegacyReview()">Practice earlier mistakes</button></div>`:'';
   app.innerHTML=`<section class="card"><h2>Review</h2><p>${reviewCount?`${reviewCount} missed answer records`:'No saved mistakes available yet.'}</p><p>Missed questions appear here after you check an answer. You can also retake a lesson directly.</p><button onclick="practiceHub()">Practice Hub</button> <button class="secondary" onclick="courseMenu('A1')">A1 lessons</button></section>`+snapshotRows+unitRows+legacyRow;
 };
 window.dlReviewSaved=function(i){const p=practiceState(),keys=Object.keys(p.mistakes||{}).filter(k=>k.startsWith('snap:')&&p.snapshots?.[k]);const key=keys[i];if(!key)return review();p.reviews[key]={step:0,due:Date.now()};save();practiceQuiz('mistakes');};
 window.dlLegacyReview=function(){priorReview();};
 const oldCheck=dlCheck;
 dlCheck=function(){
   const s=fullSession,q=s?.questions?.[s.idx],isNew=!!(q&&!dlAnswered&&dlSelected!==null);
   if(isNew){const p=practiceState();p.snapshots??={};}
   const result=oldCheck();
   if(isNew&&q){
     const p=practiceState(),key='snap:'+encodeURIComponent([q.prompt||'',(q.options||[])[q.answer]||''].join('|'));
     if(p.snapshots?.[key]){p.snapshots[key].unitTitle=FULL_UNITS[s.id]?.title||'';p.snapshots[key].level=FULL_UNITS[s.id]?.level||'';save();}
   }
   return result;
 };
})();
