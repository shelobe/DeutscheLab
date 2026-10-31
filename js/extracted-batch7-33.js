
(function(){
  function groupProfilePlacement(){
    const menu=document.getElementById('sideMenu');
    if(!menu)return;
    const profile=menu.querySelector('.dl-menu-profile-link');
    const placement=[...menu.querySelectorAll('button')].find(b=>b.textContent.includes('Placement test'));
    if(!profile||!placement)return;
    profile.after(placement);
    placement.classList.add('dl-placement-subitem');
    placement.textContent='Placement test';
    placement.setAttribute('aria-label','Placement test under Profile');
  }
  groupProfilePlacement();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',groupProfilePlacement,{once:true});
})();

