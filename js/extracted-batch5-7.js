
/* Review snapshots: persist the question, never an unstable shuffled index. */
(function(){
 const previousCheck=dlCheck;
 const stableKey=q=> 'snap:'+encodeURIComponent([q.prompt||'',(q.options||[])[q.answer]||''].join('|'));
 const snapshot=q=>({prompt:q.prompt,options:[...q.options],answer:q.answer,why:q.why||'',german:q.german||'',english:q.english||'',type:q.type||'',dlAudioWords:q.dlAudioWords||null,dlTarget:q.dlTarget||''});
 function pruneLegacy(p){
   // Legacy full:id:index records cannot be mapped reliably after randomization.
   for(const k of new Set([...Object.keys(p.mistakes||{}),...Object.keys(p.reviews||{})])){
     if(/^full:\d+:\d+$/.test(k)){delete p.mistakes[k];delete p.reviews[k];}
   }
 }
 dlCheck=function(){
   const s=fullSession,q=s?.questions?.[s.idx];
   if(q&&!dlAnswered&&dlSelected!==null){
     const p=practiceState();p.snapshots??={};p.mistakes??={};p.reviews??={};
     pruneLegacy(p);
     const key=stableKey(q),ok=dlSelected===q.answer;
     p.snapshots[key]=snapshot(q);
     if(ok){
       delete p.mistakes[key];
       const step=Math.min((p.reviews[key]?.step||0)+1,5);
       p.reviews[key]={step,due:Date.now()+[0,1,3,7,14,30][step]*86400000};
     }else{
       p.mistakes[key]=(p.mistakes[key]||0)+1;
       p.reviews[key]={step:0,due:Date.now()};
     }
     practiceLog(ok?10:2);
   }
   return previousCheck();
 };
 const oldHub=practiceHub,oldQuiz=practiceQuiz;
 function validKeys(p,mode){return (mode==='mistakes'?Object.keys(p.mistakes):Object.keys(p.reviews).filter(k=>p.reviews[k]?.due<=Date.now())).filter(k=>!k.startsWith('full:'));}
 practiceHub=function(){const p=practiceState();pruneLegacy(p);save();return oldHub();};
 let reviewSession=null;
 practiceQuiz=function(mode){
   const p=practiceState();pruneLegacy(p);save();
   const keys=validKeys(p,mode),key=keys.find(k=>k.startsWith('snap:')&&p.snapshots?.[k]);
   if(!key)return oldQuiz(mode);
   const q=p.snapshots[key];reviewSession={key,mode,q};
   const isAudio=q.type==='sound-choice'||(/^Which audio says /i.test(q.prompt)&&q.options?.every(o=>/^Audio \d+$/i.test(o)));
   if(isAudio){
    let words=q.dlAudioWords;
    if(!Array.isArray(words)||words.length!==q.options.length){
     const target=q.dlTarget||q.prompt.match(/[“"]([^”"]+)[”"]/)?.[1];
     const entry=(window.dlReviewSoundSets||[]).find(e=>e.words[e.target]===target);
     if(entry){
      const shift=(entry.target-q.answer+entry.words.length)%entry.words.length;
      words=entry.words.map((_,i)=>entry.words[(i+shift)%entry.words.length]);
     }
    }
    if(!Array.isArray(words)||words.length!==q.options.length){
     app.innerHTML=illustratedHero('Review a lesson question','Audio choices unavailable for this saved question','forest','katze.png')+`<section class="card"><p>This older question did not save enough audio information.</p><button onclick="practiceQuiz('${mode}')">Next review</button><button class="secondary" onclick="practiceHub()">Back</button></section>`;
     return;
    }
    reviewSession.audioWords=words;
   }
   app.innerHTML=illustratedHero('Review a lesson question','Practice the exact question you missed','forest','katze.png')+
    `<section class="card"><h3>${safeText(q.prompt)}</h3>${isAudio?'<p>Tap an audio option to listen and select it. You can change your answer before confirming.</p>':''}<div id="dl-review-choices">${q.options.map((o,i)=>`<button type="button" class="secondary dl-review-choice" onclick="dlSnapshotSelect(${i})">${isAudio?'🔊 Audio '+(i+1):safeText(o)}</button>`).join('')}</div><button type="button" id="dl-review-confirm" onclick="dlSnapshotConfirm()" disabled>Confirm answer</button><div id="practiceFeedback"></div></section>`;
 };
 window.dlSnapshotSelect=function(i){
   const r=reviewSession;if(!r||r.submitted)return;
   r.selected=i;
   document.querySelectorAll('#dl-review-choices button').forEach((b,n)=>{
    b.classList.toggle('dl-review-selected',n===i);
    b.setAttribute('aria-pressed',String(n===i));
   });
   const confirm=document.getElementById('dl-review-confirm');if(confirm)confirm.disabled=false;
   if(r.audioWords?.[i]){
    try{if(typeof speak==='function')speak(r.audioWords[i]);else if(typeof listeningSpeak==='function')listeningSpeak(r.audioWords[i],true)}catch(e){}
   }
 };
 window.dlSnapshotConfirm=function(){
   const r=reviewSession;if(!r||r.submitted||!Number.isInteger(r.selected))return;
   r.submitted=true;
   window.dlSnapshotAnswer(r.selected);
 };

 window.dlSnapshotAnswer=function(i){
   const r=reviewSession;if(!r)return;
   const {q,key,mode}=r,p=practiceState(),ok=i===q.answer;
   if(ok){delete p.mistakes[key];const step=Math.min((p.reviews[key]?.step||0)+1,5);p.reviews[key]={step,due:Date.now()+[0,1,3,7,14,30][step]*86400000};}
   else{p.mistakes[key]=(p.mistakes[key]||0)+1;p.reviews[key]={step:0,due:Date.now()};}
   practiceLog(ok?10:2);
   app.querySelectorAll('.card button').forEach(b=>b.disabled=true);
   const complete=q.prompt.replace('___',q.options[q.answer]);
   document.getElementById('practiceFeedback').innerHTML=`<p class="${ok?'correct':'wrong'}">${ok?'Correct!':'Correct answer: '+safeText(q.options[q.answer])}</p><p>${safeText(q.why)}</p>${q.german||q.english?`<p><strong>German:</strong> ${safeText(q.german||complete)}</p><p><strong>English:</strong> ${safeText(q.english||'')}</p>`:''}<button onclick="practiceQuiz('${mode}')">Next</button><button class="secondary" onclick="practiceHub()">Finish</button>`;
   reviewSession=null;
 };
})();
