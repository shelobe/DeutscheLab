
/* Shared post-confirmation behavior for guided A1/A2/B1 multiple-choice lessons.
   Keep choices visible while selecting; remove them only after feedback exists. */
(function(){
 const root=document.getElementById('app');if(!root)return;
 function compactAnswered(){
  root.querySelectorAll('.dl-flow-card').forEach(card=>{
   const choices=card.querySelector('.dl-flow-options');
   const feedback=card.querySelector('#dl-result .dl-flow-feedback');
   if(!choices)return;
   const answered=!!feedback;
   choices.classList.toggle('dl-answered-hidden',answered);
   card.classList.toggle('dl-answer-revealed',answered);
  });
 }
 let pending=false;
 new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;compactAnswered()})}).observe(root,{subtree:true,childList:true});
 compactAnswered();
})();

