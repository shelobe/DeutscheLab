
(function(){
 const priorCheck=dlCheck;
 dlCheck=function(){
   const result=priorCheck();
   const button=document.getElementById('dl-check');
   if(typeof dlAnswered!=='undefined' && dlAnswered && button && !button.disabled){
     document.body.classList.add('dl-answer-ready');
   }
   return result;
 };
 const priorRender=fullRender;
 fullRender=function(){
   document.body.classList.remove('dl-answer-ready');
   return priorRender.apply(this,arguments);
 };
 const observer=new MutationObserver(()=>{
   if(!document.getElementById('dl-check'))document.body.classList.remove('dl-answer-ready');
 });
 observer.observe(document.getElementById('app'),{childList:true});
})();

