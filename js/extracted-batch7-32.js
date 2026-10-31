
window.dlResetAllProgress=function(){
 dlAppConfirm({title:'Reset all progress?',message:'This will erase completed lessons, review results, XP, badges, and practice history.',cancelText:'Keep Progress',confirmText:'Continue',danger:true,onConfirm:()=>{
 dlAppConfirm({title:'Confirm permanent reset',message:'Are you sure? This cannot be undone.',cancelText:'Keep Progress',confirmText:'Erase Everything',danger:true,onConfirm:()=>{
 try{
  localStorage.removeItem('deutschlab');
  localStorage.removeItem('deutschlab_articles_v1');
  localStorage.removeItem('deutschlab-active-screen-v2');
  location.reload();
 }catch(err){alert('Unable to reset progress: '+err.message)}
 }});
 }});
};

