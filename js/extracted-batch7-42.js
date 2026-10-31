
/* One persistent action button; original review button retains the answer handler. */
(function(){
 const appNode=document.getElementById('app');
 // Reuse a single dock even if app initialization runs more than once.
 document.querySelectorAll('#dl-review-next-dock').forEach(el=>el.remove());
 const dock=document.createElement('div');
 dock.id='dl-review-next-dock';
 dock.hidden=true;
 const button=document.createElement('button');
 button.textContent='Next question';
 button.onclick=()=>appNode.querySelector('#moduleFeedback button')?.click();
 dock.appendChild(button);
 document.body.appendChild(dock);
 function sync(){
  const show=!!appNode.querySelector('#moduleFeedback button');
  if(!dock.isConnected)return;
  dock.style.display=show?'flex':'none';
  document.body.classList.toggle('dl-review-next-visible',show);
 }
 new MutationObserver(sync).observe(appNode,{childList:true,subtree:true});
 sync();
})();

