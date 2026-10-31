/* Consistent compact header and original DeutschLab wordmark on Home. */
(function(){
 const header=document.querySelector('header.app-header');if(!header)return;
 const menu=header.querySelector('.menu-toggle');if(!menu)return;
 const banner=document.createElement('div');banner.className='dl-restored-wordmark';banner.innerHTML='<h1>DeutschLab</h1><p>Learn German, one step at a time.</p>';
 menu.after(banner);
 const style=document.createElement('style');style.textContent='html body.dl-header-home .app-header .dl-restored-wordmark{max-width:67%;min-width:0}html body.dl-header-home .app-header .dl-restored-wordmark h1{font-family:system-ui,sans-serif!important;font-size:clamp(1.6rem,6vw,2.2rem)!important;font-weight:800!important;letter-spacing:-.035em!important;white-space:nowrap}html body.dl-header-home .app-header .dl-restored-wordmark p{max-width:200px;font-size:clamp(.65rem,2.2vw,.82rem);line-height:1.25;color:#e8f8f3;text-shadow:0 1px 3px #10263b}';document.head.append(style);
 function sync(){const onHome=!!document.querySelector('#app .dashboard-primary');document.body.classList.add('dl-header-home');banner.hidden=false;document.body.classList.add('dl-header-global');}
 let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;sync()})});
 observer.observe(document.getElementById('app'),{childList:true,subtree:false});sync();
})();
