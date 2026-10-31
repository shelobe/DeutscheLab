
(function(){
const app=document.getElementById('app');
let menuBypass=false;
document.addEventListener('click',function(e){
 if(menuBypass||!app?.querySelector('.market-v2'))return;
 const link=e.target.closest('#sideMenu a,#sideMenu button,.menu a,.menu button');
 if(!link)return;
 e.preventDefault();e.stopImmediatePropagation();
 window.supermarktLeave(()=>{
   menuBypass=true;
   try{link.click()}finally{menuBypass=false}
 });
},true);
const old=window.navigateTo;
if(typeof old==='function')window.navigateTo=function(fn){
 if(app?.querySelector('.market-v2')&&window.supermarktLeave){window.supermarktLeave(()=>old(fn));return}
 return old(fn);
};
})();

