
(function(){
 function apply(){
 const nav=document.getElementById('sideMenu');if(!nav)return;
 const settings=nav.querySelector('.dl-settings-menu-entry');
 const feedback=nav.querySelector('.dl-feedback-menu-entry');
 const headings=Array.from(nav.querySelectorAll('.dl-menu-group'));
 const account=headings.find(e=>e.textContent.trim()==='ACCOUNT');
 const support=headings.find(e=>e.textContent.trim()==='SUPPORT');
 if(account&&settings)account.nextElementSibling?.after(settings);
 if(support&&feedback)support.after(feedback);
 nav.querySelectorAll('.dl-menu-group').forEach(el=>{
  if(el.textContent.trim()==='APP')el.remove();
 });
 const home=Array.from(nav.querySelectorAll('button')).find(b=>b.textContent.trim().includes('Home'));
 if(home){
  home.classList.add('dl-menu-home-prominent');
  home.style.setProperty('font-size','1.32rem','important');
  home.style.setProperty('font-weight','800','important');
  home.style.setProperty('min-height','56px','important');
  home.style.setProperty('padding','12px 16px','important');
  home.style.setProperty('background','#294a55','important');
  home.style.setProperty('border-radius','14px','important');
  home.style.setProperty('margin','8px 0 12px','important');
 }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();

