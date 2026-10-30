
/* Keep course navigation and individual lesson activities in distinct views. */
let activeLessonScreen=null;
function lessonScreenHeading(){
 if(activeLessonScreen===null)return;
 const u=FULL_UNITS[activeLessonScreen];if(!u)return;
 if(app.querySelector('.lesson-screen-heading'))return;
 const header=document.createElement('div');header.className='lesson-screen-heading';
 header.innerHTML=`<button class="secondary" onclick="leaveLessonScreen()">Back</button><div><strong>${safeText(u.title)}</strong><small>${u.level} · Lesson</small></div>`;
 app.prepend(header);
}
function leaveLessonScreen(){const go=()=>{let id=activeLessonScreen;activeLessonScreen=null;document.body.classList.remove('lesson-screen');curriculumView(FULL_UNITS[id]?.level||curriculumSelected)};if(activeLessonScreen!==null)dlAppConfirm({title:'Leave this lesson?',message:'Your current lesson progress will be lost.',cancelText:'Stay in Lesson',confirmText:'Leave Lesson',onConfirm:go});else go()}
const lessonOriginalStudy=fullStudy;
fullStudy=function(id){activeLessonScreen=id;document.body.classList.add('lesson-screen');lessonOriginalStudy(id);lessonScreenHeading();window.scrollTo(0,0)};
const lessonOriginalRender=fullRender;
fullRender=function(){lessonOriginalRender();if(activeLessonScreen!==null){document.body.classList.add('lesson-screen');lessonScreenHeading();window.scrollTo(0,0)}};
const lessonOriginalFinish=fullFinish;
fullFinish=function(){
 const session=fullSession;
 if(!session)return lessonOriginalFinish();
 const id=session.id,score=session.score,total=session.questions.length;
 lessonOriginalFinish();
 if(activeLessonScreen!==null){
  activeLessonScreen=null;document.body.classList.remove('lesson-screen');
  curriculumView(FULL_UNITS[id].level);
  const notice=document.createElement('section');notice.className='card';notice.setAttribute('role','status');
  notice.innerHTML=`<h2>Lesson complete</h2><p>${safeText(FULL_UNITS[id].title)} · ${score}/${total} correct</p><p>${score>=Math.ceil(total*.8)?'Lesson passed.':'Review the lesson and try again when ready.'}</p>`;
  app.prepend(notice);
  // Keep the next unfinished lesson visible after returning to the learning path.
  const nextRow=app.querySelector('.curriculum-next-lesson');
  if(nextRow){
    const module=nextRow.closest('details');
    if(module)module.open=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const header=document.querySelector('header');
      const headerHeight=header?Math.min(header.getBoundingClientRect().height,160):0;
      const top=Math.max(0,window.scrollY+nextRow.getBoundingClientRect().top-headerHeight-20);
      window.scrollTo({top,behavior:'instant'});
    }));
  }else window.scrollTo(0,0);
 }
};
const lessonOriginalMenu=curriculumView;
curriculumView=function(level){activeLessonScreen=null;document.body.classList.remove('lesson-screen');lessonOriginalMenu(level)};
const lessonOriginalHome=home;
home=function(){activeLessonScreen=null;document.body.classList.remove('lesson-screen');lessonOriginalHome()};
