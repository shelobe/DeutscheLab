
(function(){
  // Refresh starts at Home; normal in-app navigation still retains its history.
  // Clear only transient screen routing, never saved lesson progress.
  try{
    sessionStorage.removeItem('dl-current-view');
    sessionStorage.removeItem('dl-current-navigation');
  }catch(e){}
  window.addEventListener('load',function(){
    try{
      sessionStorage.removeItem('dl-current-view');
      sessionStorage.removeItem('dl-current-navigation');
    }catch(e){}
    if(typeof home==='function')home();
  });
})();

