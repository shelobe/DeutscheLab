
/* Make Android/browser Back navigate app screens, never quiz questions. */
(function(){
 const views=[];let restoring=false;
 const tracked=['home','friendlyCourse','curriculumView','practiceHub','gameHub','articleHome','photoMenu','aiTutor','placementResults','review','fullStudy','dlLessonIntro','fullBegin','gameStart','startSentenceRound','listeningPractice','quickRandomPractice','dlShowSettings','dlShowBetaFeedback'];
 function capture(){return {name:'home',args:[]}}
 for(const name of tracked){
  const original=window[name];if(typeof original!=='function')continue;
  window[name]=function(...args){
   if(!restoring){
    const lesson=['fullStudy','dlLessonIntro','fullBegin'].includes(name);
    const view=lesson?{name:name==='fullBegin'?'fullStudy':name,args}: {name,args};
    views.push(view);
    try{sessionStorage.setItem('dl-current-view',JSON.stringify(view))}catch(e){}
    history.pushState({dlNav:true,step:views.length},'','#dl-screen-'+views.length);
   }
   return original.apply(this,args);
  };
 }
 /* One initial browser history entry anchors the in-app Back behavior. */
 if(!history.state?.dlNav){history.replaceState({dlNav:true,step:0},'',location.pathname+location.search);}
 window.addEventListener('popstate',()=>{
  if(document.querySelector('#app .market-v2')&&typeof window.supermarktLeave==='function'){
   // Restore the history entry immediately so cancelling keeps the game active.
   history.pushState({dlNav:true,step:views.length},'','#dl-screen-'+views.length);
   window.supermarktLeave(()=>{
    restoring=true;
    try{
     views.length=0;
     window.practiceHub();
    }finally{restoring=false}
   });
   return;
  }
  const lesson=!!(document.body.classList.contains('lesson-screen')||window.fullSession&&document.querySelector('.dl-flow'));
  const previous=lesson?capture():(views.length>1?views[views.length-2]:capture());
  if(views.length)views.pop();
  restoring=true;
  try{
   if(lesson){
    if(typeof leaveLessonScreen==='function'){
     // Use the existing confirmation before discarding in-progress work.
     leaveLessonScreen();
    }else home();
   }else{
    const fn=window[previous.name];
    if(typeof fn==='function')fn(...previous.args);else home();
    try{sessionStorage.setItem('dl-current-view',JSON.stringify(previous))}catch(e){}
   }
  }finally{restoring=false;history.pushState({dlNav:true,step:views.length},'','#dl-screen-'+views.length)}
 });
 window.addEventListener('load',()=>{
  // Restore the exact lesson introduction instead of resetting to Home.
  let saved=null;
  try{saved=JSON.parse(sessionStorage.getItem('dl-current-view')||'null')}catch(e){}
  if(!saved||saved.name==='home'||!tracked.includes(saved.name))return;
  const fn=window[saved.name];
  if(typeof fn!=='function')return;
  restoring=true;
  try{fn(...(Array.isArray(saved.args)?saved.args:[]))}catch(e){console.warn('Unable to restore DeutschLab view',e)}
  finally{restoring=false}
 });
})();

