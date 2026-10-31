
(function(){
  const key='dl-supermarkt-active';
  const originalHome=window.supermarktHome;
  const originalReset=window.supermarktReset;
  if(typeof originalHome!=='function'||typeof originalReset!=='function')return;
  window.supermarktHome=function(){
    sessionStorage.setItem(key,'1');
    return originalHome.apply(this,arguments);
  };
  window.supermarktReset=function(){
    sessionStorage.removeItem(key);
    return originalReset.apply(this,arguments);
  };
  // Reloads retain the saved shopping state; explicit exits clear it.
  if(sessionStorage.getItem(key)==='1'&&sessionStorage.getItem('dl-supermarkt-session')){
    window.supermarktHome();
  }else if(sessionStorage.getItem(key)==='1'){
    sessionStorage.removeItem(key);
  }
})();

