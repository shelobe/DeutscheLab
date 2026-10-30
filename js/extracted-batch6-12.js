
// The home dashboard replaces earlier stacked cards; older course and practice engines remain intact.
function home(){
 ensureLearning();
 const level=state.learning.placement?.recommended||'A1';
 const units=FULL_UNITS.map((u,id)=>({...u,id})).filter(u=>u.level===level);
 const scores=state.learning.fullScores||{};
 const next=units.findIndex(u=>!scores[u.id]?.passed),idx=next<0?units.length-1:next;
 const done=units.filter(u=>scores[u.id]?.passed).length;
 const title=units[idx]?.title||'Your first lesson';
 const xp=typeof practiceState==='function'?practiceState():null;
 const daily=xp?.activity?.[new Date().toLocaleDateString('en-CA')]||0;
 app.innerHTML=`<section class="dashboard-hero"><img src="hund.png" alt="Fritzi the German shepherd"><div><h2>Willkommen zurück!</h2><p>Ready for a little German today?</p></div></section>
 <section class="dashboard-primary"><div class="path-eyebrow">YOUR LEARNING PATH · ${level}</div><h2>${done===units.length?'Great work! Course complete':`Lesson ${idx+1}: ${safeText(title)}`}</h2><p class="path-small">${done} of ${units.length} lessons completed</p><div class="path-track" role="progressbar" aria-valuemin="0" aria-valuemax="${units.length}" aria-valuenow="${done}"><div style="width:${Math.round(done/units.length*100)}%"></div></div><button class="dashboard-main-btn" onclick="friendlyCourse('${level}')">${done===units.length?'Review your lessons':done?'Continue learning':'Start lesson 1'}</button></section>
 <h3 class="section-label">What would you like to do?</h3><div class="dashboard-shortcuts">
 <button class="secondary" onclick="friendlyCourse('${level}')">📖 My lessons<small>${level} · ${units.length} lessons</small></button>
 
 
 <button class="secondary" onclick="aiTutor()">🎙 AI conversation<small>Speak German</small></button>
 <button class="secondary" onclick="placementResults()">◈ My placement<small>Results and skills</small></button>
 <button class="secondary" onclick="review()">↻ Review mistakes<small>Practice tricky answers</small></button></div>`;
}
// Keep track of the screen the user actually visited, including inline onclick navigation.
const screenHistory=[];
let lastScreenHTML='',screenGuard=false;
function appScreenChanged(){
 if(screenGuard)return;
 // Do not remove/reinsert Back on every mutation: doing so creates
 // an endless MutationObserver cycle that blocks clicks and audio.
 const homeScreen=!!app.querySelector('.dashboard-primary');
 const back=app.querySelector('#screenBack');
 if(homeScreen){
  if(back)back.remove();
  return;
 }
 if(!back){
  const b=document.createElement('button');
  b.id='screenBack';b.type='button';b.setAttribute('aria-label','Go back');b.textContent='Back';
  b.addEventListener('click',goScreenBack);
  app.prepend(b);
 }
}
function goScreenBack(){
 toggleMenu(false);
 // On deep exercise screens, the learning path is a predictable and safe destination.
 const level=state.learning?.placement?.recommended||'A1';
 if(app.innerHTML.includes('Exercise ')||app.innerHTML.includes('Practice ·'))friendlyCourse(level);
 else home();
 window.scrollTo({top:0,behavior:'instant'});
}
const screenObserver=new MutationObserver(()=>{if(screenGuard)return;screenGuard=true;try{appScreenChanged()}finally{screenGuard=false}});
screenObserver.observe(app,{childList:true,subtree:false});
home();appScreenChanged();
