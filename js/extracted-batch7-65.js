
(function(){
  // The du/Sie explanation now lives in the first pronouns lesson.
  STRUCTURED_PATH.A1=STRUCTURED_PATH.A1.filter(g=>g.title!=='Speaking politely: du and Sie');
  // Restore the same canonical curriculum after refresh, regardless of which
  // earlier navigation wrapper saved the route.
  const old=curriculumView;
  curriculumView=function(level){
    const result=old.apply(this,arguments);
    const selected=STRUCTURED_PATH[level]?level:'A1';
    try{
      sessionStorage.setItem('dl-current-navigation',JSON.stringify({name:'curriculumView',args:[selected]}));
      sessionStorage.setItem('dl-current-view',JSON.stringify({name:'curriculumView',args:[selected]}));
    }catch(e){}
    return result;
  };
  function repair(){
    let a=null,b=null;
    try{
      a=JSON.parse(sessionStorage.getItem('dl-current-navigation')||'null');
      b=JSON.parse(sessionStorage.getItem('dl-current-view')||'null');
    }catch(e){}
    const isCourse=[a?.name,b?.name].some(n=>n==='curriculumView'||n==='friendlyCourse');
    if(!isCourse)return;
    const legacy=!!document.querySelector('#app .path-list, #app .path-panel');
    const curriculumMissing=!document.querySelector('#app .curriculum-path-module');
    if(legacy || curriculumMissing){
      const level=a?.args?.[0]||b?.args?.[0]||'A1';
      curriculumView(level);
    }
  }
  window.addEventListener('load',()=>setTimeout(repair,50));
  setTimeout(repair,0);
})();

