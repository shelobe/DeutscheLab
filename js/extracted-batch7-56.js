
(function(){
 const previousHome=home;
 home=function(){
  const result=previousHome.apply(this,arguments);
  const shortcuts=app.querySelector('.dashboard-shortcuts');
  if(!shortcuts)return result;
  const buttons=[...shortcuts.querySelectorAll('button')];
  const find=pattern=>buttons.find(b=>pattern.test(b.textContent||''));
  const learning=find(/My learning path|My lessons/i);
  if(learning)learning.remove();
  const ai=find(/AI conversation/i);
  if(ai){ai.classList.add('dl-home-ai-feature');ai.innerHTML='🎙️ <strong>AI Conversation</strong><small>Practice speaking German with your AI tutor</small>';shortcuts.prepend(ai)}
  const review=find(/Review mistakes/i);
  if(review)review.remove()
  if(!find(/My profile/i)){
   const profile=document.createElement('button');
   profile.className='secondary';profile.type='button';
   profile.innerHTML='🐾 My profile<small>Avatars, XP and rewards</small>';
   profile.onclick=()=>{dlProfile();window.scrollTo({top:0,left:0,behavior:'instant'})};
   shortcuts.appendChild(profile);
  }
  return result;
 };
 home();
})();

