
(function(){
 const root=document.getElementById('app');if(!root)return;
 function sync(){
  const feedback=root.querySelector('#dialogue-feedback');
  const complete=[...root.querySelectorAll('.card h2')].some(h=>h.textContent.trim()==='Conversation complete');
  let bar=document.getElementById('dlDialogueExitBar');
  if(!feedback&&!complete){bar?.remove();return}
  const card=feedback?.closest('.card');
  if(card){
   const choices=[...card.querySelectorAll('button[onclick^="answerDialogue("]')];
   choices.forEach(el=>el.classList.add('dl-dialogue-answer-choice'));
   const label=choices[0]?.previousElementSibling;
   if(label?.tagName==='P'&&/choose your response/i.test(label.textContent))label.classList.add('dl-dialogue-choose-label');
   const wrong=!!feedback.querySelector('.wrong,.dl-result-bad');
   const correct=!!feedback.querySelector('.correct,.dl-result-good');
   card.classList.toggle('dl-dialogue-answered',wrong||correct);
   if(wrong&&!feedback.querySelector('.dl-dialogue-retry')){
    const retry=document.createElement('button');retry.className='secondary dl-dialogue-retry';retry.textContent='Try again';
    retry.onclick=()=>{feedback.replaceChildren();card.classList.remove('dl-dialogue-answered');choices.forEach(el=>el.disabled=false)};
    feedback.appendChild(retry);
   }
   // During exchanges, never anchor Back to dialogues; anchor Continue only after a correct answer.
   if(!correct){bar?.remove();return}
   const next=feedback.querySelector('button[onclick="nextDialogueStep()"],button[onclick="conversation()"]')||bar?.querySelector('button[onclick="nextDialogueStep()"],button[onclick="conversation()"]');
   if(!next)return;
   if(!bar){bar=document.createElement('div');bar.id='dlDialogueExitBar';document.body.appendChild(bar)}
   if(next.parentNode!==bar)bar.replaceChildren(next);
   return;
  }
  // Only on the conversation-complete screen anchor All dialogues.
  const all=root.querySelector('button[onclick="conversation()"]');
  if(!all){bar?.remove();return}
  if(!bar){bar=document.createElement('div');bar.id='dlDialogueExitBar';document.body.appendChild(bar)}
  bar.replaceChildren(all);
 }
 let pending=false;
 new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;sync()})}).observe(root,{childList:true,subtree:true});sync();
})();
