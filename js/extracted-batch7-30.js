
/* Guard against incomplete learning-path rendering during asynchronous initialization. */
(function(){
 const renderPath=curriculumView;
 let generation=0;
 curriculumView=function(level){
  const token=++generation;
  try{
   renderPath(level);
  }catch(error){
   console.error('Learning path rendering failed',error);
   const root=document.getElementById('app');
   if(root)root.innerHTML='<section class="card"><h2>Lessons could not load</h2><p>Please try opening the learning path again.</p><button onclick="curriculumView(&quot;A1&quot;)">Retry lessons</button></section>';
   return;
  }
  const root=document.getElementById('app');
  if(root&&!root.querySelector('.curriculum-path-module')){
   requestAnimationFrame(()=>{
    if(token!==generation)return;
    try{renderPath(level)}catch(error){console.error('Learning path retry failed',error)}
   });
  }
 };
})();

