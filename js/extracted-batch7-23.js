
(function(){
 const appNode=document.getElementById('app');
 const back=document.createElement('button');back.id='picturePersistentBack';back.type='button';back.textContent='Back';
 appNode.parentNode.insertBefore(back,appNode);
 let current='none';
 function sync(){
  const round=!!appNode.querySelector('#photoActual');
  const menu=appNode.textContent.includes('Choose a topic')&&appNode.textContent.includes('Picture practice');
  const complete=!!(typeof pictureSession!=='undefined'&&pictureSession?.photo&&appNode.textContent.includes('Round complete'));
  current=round||complete?'round':menu?'menu':'none';
  back.style.display=current==='none'?'none':'inline-flex';
  const older=document.getElementById('screenBack');if(older&&current!=='none')older.style.display='none';
 }
 back.addEventListener('click',()=>{
  if(current==='round'){pictureSession=null;photoMenu()}
  else if(current==='menu'){pictureSession=null;home()}
  window.scrollTo(0,0);
 });
 new MutationObserver(sync).observe(appNode,{childList:true,subtree:false});sync();
})();

