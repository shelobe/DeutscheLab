/* Consistent compact header and original DeutschLab wordmark on Home. */
(function(){
 const header=document.querySelector('header.app-header');if(!header)return;
 const menu=header.querySelector('.menu-toggle');if(!menu)return;
 const banner=document.createElement('div');banner.className='dl-restored-wordmark';banner.innerHTML='<h1>DeutschLab</h1><p>Learn German, one step at a time.</p>';
 menu.after(banner);
 function sync(){const onHome=!!document.querySelector('#app .dashboard-primary');document.body.classList.toggle('dl-header-home',onHome);banner.hidden=false;document.body.classList.add('dl-header-global');}
 let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;sync()})});
 observer.observe(document.getElementById('app'),{childList:true,subtree:false});sync();
})();
