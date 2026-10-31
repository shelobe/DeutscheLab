
(function(){
 const root=document.getElementById('app');if(!root)return;
 function update(){
  const g=typeof gameSession!=='undefined'?gameSession:null;
  root.querySelectorAll('.card').forEach(card=>{
   card.classList.toggle('dl-listening-answered',!!(g&&g.mode==='listen'&&g.answered&&card.querySelector('.picture-choices')&&card.querySelector('#gameFeedback .game-feedback')));
  });
 }
 let queued=false;
 new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;update()})}).observe(root,{subtree:true,childList:true});update();
})();

