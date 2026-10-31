
/* Keep the Practice Hub review entry functional and group it beneath Account. */
(function(){
 const nav=document.getElementById('sideMenu');
 if(!nav)return;
 const hub=[...nav.querySelectorAll('button')].find(b=>b.textContent.includes('Practice Hub'));
 if(hub){
  const account=[...nav.querySelectorAll('button')].find(b=>/account|profile/i.test(b.textContent));
  if(account)account.after(hub);
  else{
   const home=[...nav.querySelectorAll('button')].find(b=>/home/i.test(b.textContent));
   if(home)home.after(hub);
  }
 }
})();

