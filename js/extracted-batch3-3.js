
/* Ordered progression: foundational skills precede dependent grammar. Existing lesson IDs,
   question banks, progress, and all standalone practice activities are preserved. */
FULL_UNITS.push({level:'A1',title:'Countries, nationalities and languages',rule:'Ask Woher kommst du? (Where are you from?). Say Ich komme aus Deutschland, but Ich komme aus den USA. Nationality nouns are capitalized: Amerikanerin (female), Amerikaner (male), Deutsche (female), Deutscher (male). Language names are capitalized (Deutsch, Englisch); adjectives are lowercase (deutsch, amerikanisch).',examples:[['Woher kommst du?','Where are you from?'],['Ich komme aus den USA.','I am from the USA.'],['Ich spreche Englisch und ein bisschen Deutsch.','I speak English and a little German.']],checkpoint:{prompt:'Ich komme ___ den USA.',options:['aus','aus dem','von'],answer:0,why:'The USA is plural in German: aus den USA. For Germany: aus Deutschland.'}});
const STRUCTURED_PATH={
 A1:[
 {title:'Getting started',goal:'Introduce yourself and ask simple questions.',ids:[8,9,10],context:'Meet someone new. Learn greetings, noun articles, and present-tense verbs.'},
 {title:'Where you’re from and first sentences',goal:'Talk about countries, languages, and make simple sentences.',ids:[48,11,4,5],context:'Introduce your country and language, then talk about what you have, want, and do.'},
 {title:'People and everyday life',goal:'Talk about family, ages, and daily routines.',ids:[1,0,6],context:'Describe your family and a typical day.'},
 {title:'Everyday conversations',goal:'Order food, make plans, and find your way.',ids:[2,3,7],context:'Use German in cafés, appointments, and around town.'}
 ],
 A2:[
 {title:'Objects and recipients',goal:'Use accusative and dative in practical sentences.',ids:[20,21,12],context:'Describe where objects are and where they go.'},
 {title:'Actions and requests',goal:'Express ability, obligation, and instructions.',ids:[13,23,16],context:'Ask for help and explain what needs doing.'},
 {title:'Tell stories and make plans',goal:'Talk about yesterday, tomorrow, and travel.',ids:[22,18,19],context:'Describe a trip and make arrangements.'},
 {title:'Describe things more precisely',goal:'Use comparisons, adjectives, and reflexive verbs.',ids:[14,17,15],context:'Compare options and describe your preferences.'}
 ],
 B1:[
 {title:'Connect your ideas',goal:'Explain reasons, conditions, and consequences.',ids:[32,27,29],context:'Go beyond short sentences and explain why.'},
 {title:'Describe people and events',goal:'Talk about experiences and tell detailed stories.',ids:[28,26,33],context:'Describe something that happened and who was involved.'},
 {title:'Express yourself clearly',goal:'Give opinions, discuss work, and make polite requests.',ids:[30,31,34],context:'Handle realistic discussions and situations.'},
 {title:'Use more complex structures',goal:'Practice cases, genitive, and infinitive clauses.',ids:[35,24,25],context:'Refine your writing and speech with longer sentences.'}
 ]
};
let curriculumSelected='A1';
function curriculumStats(level){
 let groups=STRUCTURED_PATH[level]||[],scores=state.learning?.fullScores||{};
 let all=groups.flatMap(g=>g.ids);
 return {groups,all,done:all.filter(id=>scores[id]?.passed).length,scores};
}
function curriculumNext(level){
 let st=curriculumStats(level);return st.all.find(id=>!st.scores[id]?.passed)??st.all[st.all.length-1];
}
function curriculumView(level){
 ensureLearning();curriculumSelected=STRUCTURED_PATH[level]?level:'A1';
 const st=curriculumStats(curriculumSelected);
 const firstUnfinished=st.groups.findIndex(g=>g.ids.some(id=>!st.scores[id]?.passed));
 const openIndex=firstUnfinished<0?st.groups.length-1:firstUnfinished;
 const next=curriculumNext(curriculumSelected);
 const total=st.all.length;
 app.innerHTML=`
 <section class="curriculum-summary curriculum-path-summary">
  <div class="curriculum-pill">YOUR LEARNING PATH</div>
  <h2>${curriculumSelected} · ${curriculumSelected==='A1'?'Beginner':curriculumSelected==='A2'?'Elementary':'Intermediate'}</h2>
  <p>Choose a level, then work through the numbered lessons in each module.</p>
  <div class="curriculum-levels">${['A1','A2','B1'].map(l=>`<button class="${l===curriculumSelected?'':'secondary'}" onclick="curriculumView('${l}')" aria-pressed="${l===curriculumSelected}">${l}</button>`).join('')}</div>
  <p><strong>${st.done} of ${total} lessons completed</strong></p>
  <div class="unit-progress" role="progressbar" aria-valuenow="${st.done}" aria-valuemin="0" aria-valuemax="${total}"><div style="width:${total?Math.round(st.done/total*100):0}%"></div></div>
  <button onclick="curriculumLesson(${next})">${st.done===total?'Review lessons':'Continue: '+safeText(FULL_UNITS[next]?.title||'next lesson')}</button>
 </section>
 <div class="curriculum-path-label">MODULES &amp; LESSONS</div>
 ${st.groups.map((g,n)=>{
  const done=g.ids.filter(id=>st.scores[id]?.passed).length+(curriculumSelected==='A1'&&n===0&&state.learning?.pronunciationLesson3Completed?1:0);
  const moduleTotal=g.ids.length+(curriculumSelected==='A1'&&n===0?1:0);const complete=done===moduleTotal;
  return `<details class="curriculum-module curriculum-path-module" ${n===openIndex?'open':''}>
   <summary><div class="curriculum-module-heading"><span class="curriculum-module-number">${n+1}</span><div><div class="curriculum-pill">MODULE ${n+1} · ${done}/${moduleTotal} LESSONS</div><h3>${safeText(g.title)}</h3><p>${safeText(g.goal)}</p></div></div><span class="curriculum-chevron" aria-hidden="true">${complete?'✓':'⌄'}</span></summary>
   <div class="curriculum-module-content">
   ${g.ids.map((id,j)=>{const passed=!!st.scores[id]?.passed;const isNext=id===next&&!passed;return `<div class="curriculum-lesson curriculum-path-lesson ${isNext?'curriculum-next-lesson':''}"><div class="curriculum-lesson-number" aria-label="Lesson ${j+1}">${j+1}</div><div class="text"><strong>Lesson ${j+1} · ${safeText(FULL_UNITS[id].title)}</strong><small>${passed?'✓ Completed':isNext?'Up next':'Not completed'}</small></div><button class="${passed?'secondary':''}" onclick="curriculumLesson(${id})">${passed?'Review':'Start'}</button></div>`}).join('')}
   ${curriculumSelected==='A1'&&n===0?`<div class="curriculum-lesson curriculum-path-lesson"><div class="curriculum-lesson-number">3</div><div class="text"><strong>Lesson 3 · German Pronunciation</strong><small>${state.learning?.pronunciationLesson3Completed?'✓ Completed':'15 sounds · Listening and speaking practice'}</small></div><button class="${state.learning?.pronunciationLesson3Completed?'secondary':''}" onclick="dlPronunciationIntro()">${state.learning?.pronunciationLesson3Completed?'Review':'Start'}</button></div>`:''}
   <div class="curriculum-check"><strong>Module ${n+1} review</strong><p>Check what you remember from these lessons.</p><button class="secondary" onclick="curriculumReview('${curriculumSelected}',${n})">Review what you learned</button></div>
   </div>
  </details>`}).join('')}
 <section class="card"><p>Modules organize related lessons. Complete the lessons in order, then use the module review to reinforce what you've learned.</p><button class="secondary" onclick="home()">Home</button></section>`;
 window.scrollTo(0,0);
}
function curriculumModuleIntro(level,n){
 let g=STRUCTURED_PATH[level]?.[n];if(!g)return;
 app.innerHTML=illustratedHero(g.title,level+' · Module '+(n+1),'village','hund.png')+
 `<section class="card"><h2>What you'll learn</h2><p>${safeText(g.context)}</p><h3>Your goal</h3><p>${safeText(g.goal)}</p><h3>Lessons in this module</h3>
 <ol>${g.ids.map(id=>`<li>${safeText(FULL_UNITS[id].title)}</li>`).join('')}</ol>
 <button onclick="curriculumLesson(${g.ids[0]})">Start first lesson</button><button class="secondary" onclick="curriculumView('${level}')">Back</button></section>`;
 window.scrollTo(0,0);
}
function curriculumLesson(id){
 const level=FULL_UNITS[id]?.level;
 if(!level)return;
 curriculumSelected=level;
 fullStudy(id);
}
let moduleSession=null;
function dlAppConfirm({title,message,cancelText='Cancel',confirmText='Continue',danger=false,onConfirm}){
 if(document.getElementById('dl-review-exit-overlay'))return;
 const overlay=document.createElement('div');overlay.id='dl-review-exit-overlay';
 const dialog=document.createElement('div');dialog.className='dl-review-exit-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-labelledby','dl-app-confirm-title');
 const heading=document.createElement('h2');heading.id='dl-app-confirm-title';heading.textContent=title;
 const body=document.createElement('p');body.textContent=message;
 const actions=document.createElement('div');actions.className='dl-review-exit-actions';
 const cancel=document.createElement('button');cancel.type='button';cancel.className='secondary';cancel.textContent=cancelText;
 const proceed=document.createElement('button');proceed.type='button';proceed.textContent=confirmText;if(danger)proceed.className='dl-danger-confirm';
 actions.append(cancel,proceed);dialog.append(heading,body,actions);overlay.append(dialog);document.body.append(overlay);
 function close(){overlay.remove();document.removeEventListener('keydown',onKey)}
 function onKey(e){if(e.key==='Escape'){e.preventDefault();close()}}
 cancel.onclick=close;proceed.onclick=()=>{close();onConfirm?.()};
 document.addEventListener('keydown',onKey);cancel.focus();
}
function dlConfirmReviewExit(onLeave){
 if(!moduleSession){onLeave();return}
 if(document.getElementById('dl-review-exit-overlay'))return;
 const overlay=document.createElement('div');overlay.id='dl-review-exit-overlay';
 overlay.innerHTML='<div class="dl-review-exit-dialog" role="dialog" aria-modal="true" aria-labelledby="dl-review-exit-title"><h2 id="dl-review-exit-title">Leave this review?</h2><p>Your current review progress will be lost.</p><div class="dl-review-exit-actions"><button type="button" class="secondary" data-stay>Stay in Review</button><button type="button" data-leave>Leave Review</button></div></div>';
 document.body.appendChild(overlay);
 const stay=overlay.querySelector('[data-stay]'),leave=overlay.querySelector('[data-leave]');
 function close(){overlay.remove();document.removeEventListener('keydown',onKey)}
 function onKey(e){if(e.key==='Escape'){e.preventDefault();close()}}
 stay.onclick=close;
 leave.onclick=()=>{close();moduleSession=null;onLeave()};
 document.addEventListener('keydown',onKey);stay.focus();
}
const dlReviewOldHome=home;
home=function(){const args=arguments,ctx=this;dlConfirmReviewExit(()=>dlReviewOldHome.apply(ctx,args))};
const dlReviewOldCurriculumView=curriculumView;
curriculumView=function(){const args=arguments,ctx=this;dlConfirmReviewExit(()=>dlReviewOldCurriculumView.apply(ctx,args))};
function curriculumReview(level,n){
 let g=STRUCTURED_PATH[level]?.[n];if(!g)return;
 let questions=[];
 g.ids.forEach(id=>{
  let q=fullQuestions(FULL_UNITS[id]).filter(x=>x.options&&x.type!=='listen');
  q.slice(0,3).forEach(x=>questions.push({...x,unitId:id}));
 });
 for(let i=questions.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[questions[i],questions[j]]=[questions[j],questions[i]]}
 moduleSession={level,n,questions:questions.slice(0,g.ids.length*3),idx:0,score:0};
 curriculumReviewRender();
}
function curriculumReviewRender(){
 let s=moduleSession;if(!s)return;
 if(s.idx>=s.questions.length){
  let total=s.questions.length,passed=s.score>=Math.ceil(total*.8);
  ensureLearning();state.learning.moduleReviews??={};
  let key=s.level+'-'+s.n,old=state.learning.moduleReviews[key];
  state.learning.moduleReviews[key]={best:Math.max(old?.best||0,s.score),total,passed:passed||!!old?.passed};save();
  app.innerHTML=`<section class="card"><h2>Module review complete</h2><p>${s.score} of ${total} correct</p><p>${passed?'Well done. You can move to the next module.':'Review the lessons and try again.'}</p><button onclick="curriculumView('${s.level}')">Learning path</button><button class="secondary" onclick="curriculumReview('${s.level}',${s.n})">Practice again</button></section>`;
  moduleSession=null;return;
 }
 let q=s.questions[s.idx];
 app.innerHTML=`<section class="card"><p class="curriculum-pill">${s.level} · Module review · ${s.idx+1}/${s.questions.length}</p>
 <button class="secondary" onclick="curriculumView(moduleSession.level)">Back to learning path</button>\n <div class="unit-progress"><div style="width:${Math.round(s.idx/s.questions.length*100)}%"></div></div>
 <p class="muted">${safeText(FULL_UNITS[q.unitId].title)}</p><h2>${safeText(q.prompt)}</h2>
 <div class="picture-choices">${q.options.map((o,i)=>`<button class="secondary" onclick="curriculumReviewAnswer(${i})">${safeText(o)}</button>`).join('')}</div>
 <div id="moduleFeedback" aria-live="polite"></div></section>`;
 window.scrollTo(0,0);
}
function curriculumReviewAnswer(i){
 let s=moduleSession;if(!s||s.answered)return;
 let q=s.questions[s.idx],ok=i===q.answer;s.answered=true;if(ok)s.score++;
 app.querySelectorAll('.picture-choices button').forEach(b=>b.disabled=true);
 document.getElementById('moduleFeedback').innerHTML=`<div class="unit-explain"><strong>${ok?'Correct':'Not quite'}</strong><p>${safeText(q.options[q.answer])}</p><p>${safeText(q.why||FULL_UNITS[q.unitId].rule)}</p><button onclick="moduleSession.idx++;moduleSession.answered=false;curriculumReviewRender()">Next question</button></div>`;
}
function curriculumContinueFromHome(){
 curriculumView('A1');
 const target=app.querySelector('.curriculum-next-lesson')||app.querySelector('.curriculum-path-module[open]');
 if(!target)return;
 requestAnimationFrame(()=>{
  const header=document.querySelector('header');
  const headerHeight=header?Math.min(header.getBoundingClientRect().height,160):0;
  const top=Math.max(0,window.scrollY+target.getBoundingClientRect().top-headerHeight-20);
  window.scrollTo({top,behavior:'instant'});
 });
}
const structuredOldHome=home;
home=function(){
 structuredOldHome();
 let main=app.querySelector('.dashboard-primary');
 if(main){
  let st=curriculumStats('A1'),next=curriculumNext('A1');
  let title=main.querySelector('h2');if(title)title.textContent='Lesson '+(st.all.indexOf(next)+1)+': '+FULL_UNITS[next].title;
  let track=main.querySelector('.path-track > div, .unit-progress > div');if(track)track.style.width=Math.round(st.done/st.all.length*100)+'%';
  // Keep placement results separately while offering a foundations-first path.
  main.querySelector('.path-eyebrow').textContent='STRUCTURED LEARNING · A1 TO B1';
  let p=main.querySelector('p.path-small');
  if(p)p.textContent='Build skills in order, with connected modules and reviews.';
  let b=main.querySelector('button.dashboard-main-btn')||main.querySelector('button');
  if(b){b.textContent='Continue learning';b.setAttribute('onclick',"curriculumContinueFromHome()")}
 }
 let shortcuts=app.querySelector('.dashboard-shortcuts');
 if(shortcuts){
  let b=shortcuts.querySelector('button[onclick^="friendlyCourse"]');
  if(b){b.setAttribute('onclick',"curriculumView('A1')");b.innerHTML='My learning path<small>Structured A1 to B1 modules</small>'}
 }
};
fullMenu=function(level){curriculumView(STRUCTURED_PATH[level]?level:'A1')};
friendlyCourse=curriculumView;
