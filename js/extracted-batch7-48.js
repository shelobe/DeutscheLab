
(function(){
 const original=window.navigateTo;
 if(typeof original==='function')window.navigateTo=function(fn){if(typeof activeLessonScreen!=='undefined'&&activeLessonScreen!==null){dlAppConfirm({title:'Leave this lesson?',message:'Your current lesson progress will be lost.',cancelText:'Stay in Lesson',confirmText:'Leave Lesson',onConfirm:()=>{activeLessonScreen=null;document.body.classList.remove('lesson-screen');original(fn)}});return}return original(fn)};
})();

