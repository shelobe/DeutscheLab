
/* Mark the real home dashboard rather than guessing from its layout. */
(function(){
 const previousHome=home;
 home=function(){
  previousHome.apply(this,arguments);
  const root=document.getElementById('app');
  if(root){const marker=document.createElement('span');marker.hidden=true;marker.setAttribute('data-dl-home-banner','');root.prepend(marker);}
  document.body.classList.add('dl-home-banner');
 };
 if(document.querySelector('#app .dashboard-primary, #app .dashboard-shortcuts')){
  const marker=document.createElement('span');marker.hidden=true;marker.setAttribute('data-dl-home-banner','');document.getElementById('app').prepend(marker);
  document.body.classList.add('dl-home-banner');
 }
})();

