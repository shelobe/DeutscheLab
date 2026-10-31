
(function(){
 const root=document.getElementById('app');
 if(!root)return;
 const messages=['Excellent work! Keep it up!','You’re making real progress!','Well done! Every bit of practice counts.','Great job! Keep building your German skills.','You did it! Keep up the good work!'];
 const resultTitles=/^(Nice work!|Round complete!?|Lesson complete!|Lesson results|Unit results|Extended practice complete|Deep dive complete)$/i;
 let previousHero=null,sequence=0,updating=false;
 function render(){
  if(updating)return;
  const hero=root.querySelector('.scene-hero');
  if(!hero){previousHero=null;return}
  const heading=hero.querySelector('.hero-copy h2');
  if(!heading||!resultTitles.test(heading.textContent.trim())){previousHero=null;return}
  updating=true;
  try{
   // Remove older duplicate completion blocks, if present.
   root.querySelectorAll('.completion-cheer,.dl-auto-cheer').forEach(el=>el.remove());
   if(hero.querySelector('.dl-hero-cheer'))return;
   if(hero!==previousHero){previousHero=hero;sequence++}
   hero.classList.add('dl-completed-hero');
   const bubble=document.createElement('div');bubble.className='dl-hero-cheer';bubble.setAttribute('role','status');
   bubble.textContent=messages[(sequence-1)%messages.length];
   hero.querySelector('.hero-copy').append(bubble);
  }finally{updating=false}
 }
 new MutationObserver(render).observe(root,{childList:true,subtree:true});
 render();
})();

