
(function(){
 const root=document.getElementById('app');if(!root)return;
 function sync(){
  const box=root.querySelector('#listenFeedback');
  const answered=!!(box&&box.closest('.dl-listen-complete'));
  let bar=document.getElementById('dlListenFixedActions');
  if(!answered){bar?.remove();return}
  const row=box.querySelector('.dl-listen-actions');
  if(!row)return;
  if(!bar){bar=document.createElement('div');bar.id='dlListenFixedActions';document.body.appendChild(bar)}
  for(const b of [...row.querySelectorAll('button')])bar.appendChild(b);
 }
 let pending=false;
 new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;sync()})}).observe(root,{subtree:true,childList:true});
 sync();
})();

