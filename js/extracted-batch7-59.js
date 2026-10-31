
(function(){
 const key='dl-current-navigation';
 const safe=['home','friendlyCourse','curriculumView','practiceHub','gameHub','articleHome','photoMenu','aiTutor'];
 let restoring=false;
 for(const name of safe){
  const original=window[name];
  if(typeof original!=='function')continue;
  window[name]=function(...args){
   const result=original.apply(this,args);
   if(!restoring){
    try{sessionStorage.setItem(key,JSON.stringify({name,args}))}catch(e){}
   }
   return result;
  };
 }
 // Preserve the supermarket's own in-progress restoration.
 if(document.querySelector('#app .market-v2'))return;
 try{
  const saved=JSON.parse(sessionStorage.getItem(key)||'null');
  if(!saved||!safe.includes(saved.name)||!Array.isArray(saved.args))return;
  const courseScreen=saved.name==='friendlyCourse'||saved.name==='curriculumView';
  const destination=window[courseScreen?'curriculumView':saved.name];
  if(typeof destination!=='function')return;
  const args=courseScreen?[STRUCTURED_PATH[saved.args[0]]?saved.args[0]:'A1']:saved.args;
  restoring=true;
  destination(...args);
  if(courseScreen){
   sessionStorage.setItem(key,JSON.stringify({name:'curriculumView',args}));
   sessionStorage.setItem('dl-current-view',JSON.stringify({name:'curriculumView',args}));
  }
 }catch(e){}finally{restoring=false}
})();

