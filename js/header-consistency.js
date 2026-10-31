/* Consistent compact header and original DeutschLab wordmark on Home. */
(function(){
 const header=document.querySelector('header.app-header');if(!header)return;
 const menu=header.querySelector('.menu-toggle');if(!menu)return;
 const banner=document.createElement('div');banner.className='dl-restored-wordmark';banner.innerHTML='<h1>DeutschLab</h1><p>Learn German, one step at a time.</p>';
 menu.after(banner);
 const style=document.createElement('style');
 style.textContent=`html body.dl-header-home .app-header .dl-restored-wordmark{min-width:0;flex:1;max-width:none;padding:0 0 0 2px}html body.dl-header-home .app-header .dl-restored-wordmark h1{font-family:Arial,'Segoe UI',sans-serif!important;font-size:clamp(1.45rem,5.6vw,2.05rem)!important;font-weight:800!important;letter-spacing:-.045em!important;line-height:1.12!important;white-space:nowrap!important}html body.dl-header-home .app-header .dl-restored-wordmark p{font-family:Arial,'Segoe UI',sans-serif!important;font-size:clamp(.65rem,2.3vw,.82rem)!important;line-height:1.2!important;max-width:205px!important;margin:5px 0 0!important;color:#e8f8f3!important;text-shadow:0 1px 3px #10263b!important}html body.dl-header-home .app-header::before{width:40%!important;opacity:.85!important}@media(max-width:420px){html body.dl-header-home .app-header .dl-restored-wordmark p{max-width:185px!important}html body.dl-header-home .app-header::before{width:36%!important}}`;
 document.head.append(style);
 function sync(){const onHome=!!document.querySelector('#app .dashboard-primary');document.body.classList.add('dl-header-home');banner.hidden=false;document.body.classList.add('dl-header-global');}
 let pending=false;const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;sync()})});
 observer.observe(document.getElementById('app'),{childList:true,subtree:false});sync();
})();
