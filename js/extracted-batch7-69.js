
(function(){
  const previousHome=home;
  home=function(){
    const result=previousHome.apply(this,arguments);
    // Later Home decorators can replace the dashboard; bind the visible
    // Continue Learning control after all existing Home rendering completes.
    const buttons=Array.from(app.querySelectorAll('button'));
    for(const button of buttons){
      if(button.textContent.trim().toLowerCase()==='continue learning'){
        button.setAttribute('onclick','curriculumContinueFromHome()');
      }
    }
    return result;
  };
})();

