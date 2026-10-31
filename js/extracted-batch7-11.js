
(function(){
 const bar=document.createElement('div');bar.id='dl-fixed-next';
 const btn=document.createElement('button');btn.type='button';bar.appendChild(btn);document.body.appendChild(bar);
 const label=/^(?:next(?:\s+(?:picture|question|word|sound|item|sentence|exercise|round))?|continue|check next|see results|finish(?:\s+(?:lesson|practice|pronunciation|review))?|show results)$/i;
 let target=null;
 function update(){
  const root=document.getElementById('app');
  if(!root||document.getElementById('dl-exit-overlay')){bar.style.display='none';document.body.classList.remove('dl-has-fixed-next');return}
  const candidates=Array.from(root.querySelectorAll('button')).filter(b=>{
   const name=(b.textContent||'').trim().replace(/^[^\p{L}]+/u,'').trim();
   if(!label.test(name)||b.disabled||b.hidden||b.closest('[hidden],.findit-room-choices,.dashboard-primary,.dashboard-shortcuts,nav'))return false;
   const box=b.getBoundingClientRect();return box.width>0&&box.height>0;
  });
  // Only pin an advance button in an active question/feedback screen, not a home menu.
  const active=!!root.querySelector('#fullFeedback,#gameFeedback,#pictureFeedback,#moduleFeedback,#courseFeedback,#dl-result,#intensiveFeedback,#dialogue-feedback,.dl-flow-feedback,.picture-answer,.game-feedback,.lesson-screen-heading,#dl-sound-next');
  target=active?candidates[candidates.length-1]||null:null;
  root.querySelectorAll('button.dl-hidden-original-next').forEach(b=>b.classList.remove('dl-hidden-original-next'));
  if(target)target.classList.add('dl-hidden-original-next');
  if(target){
   btn.textContent=target.textContent.trim();btn.disabled=target.disabled;
   bar.style.display='flex';document.body.classList.add('dl-has-fixed-next');
  }else{bar.style.display='none';document.body.classList.remove('dl-has-fixed-next')}
 }
 btn.onclick=()=>{if(target&&target.isConnected&&!target.disabled)target.click()};
 let scheduled=false;
 const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update()})});
 const root=document.getElementById('app');if(root)observer.observe(root,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden']});
 update();
})();
