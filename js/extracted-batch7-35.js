
(function(){
 const app=document.getElementById('app');
 if(!app)return;
 function sync(){document.body.classList.toggle('dl-home-banner',!!app.querySelector('[data-dl-home-banner]') && !document.body.classList.contains('lesson-screen'));}
 new MutationObserver(sync).observe(app,{childList:true});
 sync();
})();

