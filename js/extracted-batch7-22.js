
(function(){
  // Capture the back action before the older general-purpose handlers.
  // Picture rounds go to their picture menu; the picture menu goes home.
  document.getElementById('app').addEventListener('click',function(event){
    const back=event.target.closest('#screenBack');
    if(!back)return;
    const appNode=document.getElementById('app');
    const isPictureRound=!!appNode.querySelector('.picture-card') || !!appNode.querySelector('.picture-status') ||
      (typeof pictureSession!=='undefined' && pictureSession && appNode.textContent.includes('You finished this picture round'));
    const isPictureMenu=appNode.textContent.includes('32 everyday objects') && appNode.textContent.includes('What do you see?');
    if(!isPictureRound && !isPictureMenu)return;
    event.preventDefault();event.stopImmediatePropagation();
    if(isPictureRound){pictureSession=null;pictureHome();}
    else home();
    window.scrollTo(0,0);
  },true);
})();

