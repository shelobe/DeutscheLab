
(function(){
 // A review can only award mastery after every question has been answered.
 // Leaving an unfinished review discards its session without changing saved mastery.
 const oldView=curriculumView;
 curriculumView=function(level){
  const session=moduleSession;
  if(session && session.idx<session.questions.length){
   const destination=level||session.level;
   dlConfirmReviewExit(function(){
    moduleSession=null;
    oldView(destination);
   });
   return;
  }
  return oldView.apply(this,arguments);
 };
 const oldHome=home;
 home=function(){
  const session=moduleSession;
  if(session && session.idx<session.questions.length){
   const args=arguments,ctx=this;
   dlConfirmReviewExit(function(){moduleSession=null;oldHome.apply(ctx,args)});
   return;
  }
  return oldHome.apply(this,arguments);
 };
})();

