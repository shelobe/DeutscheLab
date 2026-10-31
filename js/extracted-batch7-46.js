
/* Consistent short haptic feedback for incorrect answers in lessons and games.
   Observe answer feedback, not generic text elsewhere on the page. */
(function(){
 if(!navigator.vibrate)return;
 const feedbackIds=new Set(['feedback','courseFeedback','deepFeedback','fullFeedback','gameFeedback','pictureFeedback','moduleFeedback','dl-result','dialogue-feedback','iFeedback','articleFeedback','practiceFeedback','a12Feedback','reviewFeedback']);
 let lastBuzz=0;
 function check(){
  // Find It already vibrates in its own tap handler.
  const root=document.getElementById('app');if(!root)return;
  for(const el of root.querySelectorAll('[id],.game-feedback,.picture-answer,.dl-flow-feedback')){
   if(!feedbackIds.has(el.id)&&!el.matches('.game-feedback,.picture-answer,.dl-flow-feedback'))continue;
   const msg=(el.textContent||'').trim();
   if(!msg||msg.length>650)continue;
   const bad=/^(?:not quite|incorrect|wrong|fast!|try again|almost!)/i.test(msg)||
    !!el.querySelector('.wrong,.incorrect')||
    /^(?:correct answer:|answer:)/i.test(msg)&&/not quite|incorrect|wrong/i.test(msg);
   if(bad){const now=Date.now();if(now-lastBuzz>220){lastBuzz=now;try{navigator.vibrate(110)}catch(e){}}return}
  }
 }
 let queued=false;
 const observer=new MutationObserver(()=>{
  if(queued)return;queued=true;
  queueMicrotask(()=>{queued=false;check()});
 });
 const root=document.getElementById('app');
 if(root)observer.observe(root,{childList:true,subtree:true,characterData:true});
})();

