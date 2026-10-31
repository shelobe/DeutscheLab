
(function(){
 const root=document.getElementById('app');if(!root)return;
 function sync(){
  const feedback=root.querySelector('#dialogue-feedback');if(!feedback)return;
  const card=feedback.closest('.card');if(!card)return;
  const buttons=[...card.querySelectorAll('button[onclick^="answerDialogue("]')];
  buttons.forEach(b=>b.classList.add('dl-dialogue-answer-choice'));
  const label=buttons[0]?.previousElementSibling;
  if(label&&label.tagName==='P'&&/choose your response/i.test(label.textContent))label.classList.add('dl-dialogue-choose-label');
  const correct=!!feedback.querySelector('.correct,.dl-result-good');
  card.classList.toggle('dl-dialogue-answered',correct);
 }
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})}).observe(root,{childList:true,subtree:true});sync();
})();

