
(function(){
 let bypass=false,dialogOpen=false;
 function unfinished(){
  const root=document.getElementById('app');
  if(!root)return false;
  if(root.querySelector('.findit-scene'))return true;
  if(document.body.classList.contains('lesson-screen'))return true;
  return false;
 }
 function confirmExit(action){
  if(bypass||!unfinished()){action();return}
  if(dialogOpen)return;
  dialogOpen=true;
  const overlay=document.createElement('div');
  overlay.id='dl-exit-overlay';
  overlay.innerHTML='<div id="dl-exit-dialog" role="alertdialog" aria-modal="true" aria-labelledby="dl-exit-title" aria-describedby="dl-exit-text"><h2 id="dl-exit-title">Leave this lesson?</h2><p id="dl-exit-text">You haven\'t finished yet. Your progress in this activity may be lost.</p><div class="dl-exit-actions"><button class="secondary" id="dl-stay">Keep Learning</button><button id="dl-leave">Leave Lesson</button></div></div>';
  document.body.appendChild(overlay);
  const close=()=>{overlay.remove();dialogOpen=false};
  overlay.querySelector('#dl-stay').onclick=close;
  overlay.querySelector('#dl-leave').onclick=()=>{close();bypass=true;try{action()}finally{bypass=false}};
  overlay.querySelector('#dl-stay').focus();
 }
 const originalNavigate=navigateTo;
 navigateTo=function(destination){confirmExit(()=>originalNavigate(destination))};
 const originalHome=home;
 home=function(){confirmExit(()=>originalHome.apply(this,arguments))};
 if(typeof leaveLessonScreen==='function'){
  const originalLeave=leaveLessonScreen;
  leaveLessonScreen=function(){confirmExit(()=>originalLeave.apply(this,arguments))};
 }
 document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&dialogOpen){e.stopImmediatePropagation();e.preventDefault();document.getElementById('dl-stay')?.click()}
 },true);
})();
