
/* Home marker is set by home(), while other views clear it. */
(function(){
 const root=document.getElementById('app');
 if(!root)return;
 const sync=()=>document.body.classList.toggle('dl-home-banner',
   !!root.querySelector('[data-dl-home-banner]')&&!document.body.classList.contains('lesson-screen'));
 new MutationObserver(sync).observe(root,{childList:true,subtree:true});
 sync();
})();

