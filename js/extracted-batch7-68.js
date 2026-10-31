
(function(){
  // Keep the full lesson list for menu navigation, but send Continue Learning
  // directly to the next actual lesson instead of a scrolled module card.
  curriculumContinueFromHome=function(){
    const level='A1';
    const next=curriculumNext(level);
    if(next!==undefined&&next!==null) return curriculumLesson(next);
    return curriculumView(level);
  };
})();

