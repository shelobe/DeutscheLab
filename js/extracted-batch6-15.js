
/* Session recovery: preserve the actual rendered activity, question and in-progress answers.
   Progress data remains in the existing deutschlab localStorage record. */
(function(){
 const KEY='deutschlab-active-screen-v3';
 const screen=document.getElementById('app');
 if(!screen)return;
 let restoring=false,savePending=false;
 function store(){
  if(restoring)return;
  try{
   const inputs=[...screen.querySelectorAll('input,textarea,select')].map((el,i)=>({i,value:el.type==='password'?'':el.value,checked:el.checked}));
   const session={version:2,html:screen.innerHTML,inputs,
    full:typeof fullSession!=='undefined'?fullSession:null,
    picture:typeof pictureSession!=='undefined'?pictureSession:null,
    game:typeof gameSession!=='undefined'?gameSession:null,
    module:typeof moduleSession!=='undefined'?moduleSession:null,
    dlSelected:typeof dlSelected!=='undefined'?dlSelected:null,
    dlAnswered:typeof dlAnswered!=='undefined'?dlAnswered:false,
    curriculum:typeof curriculumSelected!=='undefined'?curriculumSelected:'A1',
    scrollY:window.scrollY,updated:Date.now()};
   localStorage.setItem(KEY,JSON.stringify(session));
  }catch(e){console.warn('Session save unavailable',e)}
 }
 function schedule(){if(restoring||savePending)return;savePending=true;setTimeout(()=>{savePending=false;store()},40)}
 try{
  const saved=JSON.parse(localStorage.getItem(KEY)||'null');
  if(saved&&saved.version===2&&typeof saved.html==='string'&&saved.html.length>20){
   restoring=true;
   if(typeof fullSession!=='undefined')fullSession=saved.full;
   if(typeof pictureSession!=='undefined')pictureSession=saved.picture;
   if(typeof gameSession!=='undefined')gameSession=saved.game;
   if(typeof moduleSession!=='undefined')moduleSession=saved.module;
   if(typeof dlSelected!=='undefined')dlSelected=saved.dlSelected;
   if(typeof dlAnswered!=='undefined')dlAnswered=saved.dlAnswered;
   if(typeof curriculumSelected!=='undefined')curriculumSelected=saved.curriculum;
   screen.innerHTML=saved.html;
   (saved.inputs||[]).forEach(({i,value,checked})=>{let el=screen.querySelectorAll('input,textarea,select')[i];if(el){if(el.type!=='password')el.value=value;el.checked=checked}});
   // Update the back button for the recovered activity, where supported.
   if(typeof navSync==='function')try{navSync()}catch(e){}
   requestAnimationFrame(()=>window.scrollTo(0,Math.max(0,saved.scrollY||0)));
   restoring=false;
   const aiField=document.getElementById('aiKey');if(aiField)aiField.value=savedAIKey();
  }
 }catch(e){restoring=false;console.warn('Session restore unavailable',e)}
 new MutationObserver(schedule).observe(screen,{childList:true,subtree:true,attributes:true,characterData:true});
 document.addEventListener('click',e=>{if(screen.contains(e.target))setTimeout(store,80)},true);
 document.addEventListener('input',e=>{if(screen.contains(e.target))schedule()},true);
 document.addEventListener('change',e=>{if(screen.contains(e.target))schedule()},true);
 window.addEventListener('pagehide',store);
 window.addEventListener('scroll',()=>{if(!savePending)schedule()},{passive:true});
 if(!localStorage.getItem(KEY))store();
})();
