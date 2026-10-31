
/* Audio identification in A1 Module 1 review: play the German word, choose its letter. */
(function(){
 const previous=curriculumReviewRender;
 curriculumReviewRender=function(){
  previous.apply(this,arguments);
  const s=moduleSession,q=s&&s.questions[s.idx];
  if(!q||!q.dlReviewAudio)return;
  const card=app.querySelector('.card');
  const heading=card&&card.querySelector('h2');
  if(!heading)return;
  const button=document.createElement('button');
  button.type='button';button.className='secondary dl-review-listen';
  button.textContent='🔊 Play German word';
  button.setAttribute('aria-label','Play the German word to identify its sound');
  button.onclick=()=>speak(q.dlReviewAudio);
  heading.after(button);
 };
})();

