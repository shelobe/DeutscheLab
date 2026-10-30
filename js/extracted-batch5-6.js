
/* Additional open-response practice for every one of the 48 existing course units.
   Exact-answer prompts use supplied examples so feedback remains deterministic offline. */
let intensive=null;
function deepNormalize(t){return String(t).toLocaleLowerCase('de-DE').normalize('NFC').replace(/[.,!?;:„“"'’]/g,'').replace(/\s+/g,' ').trim()}
function intensiveStart(id){if(!FULL_UNITS[id])return;intensive={id,idx:0,correct:0,answers:[],shownHint:false};intensiveRender()}
function intensiveTasks(u){let e=u.examples;return [
 {type:'reading',label:'Reading comprehension',prompt:'Read this German phrase and write its English meaning:',source:e[0][0],expected:e[0][1],explain:'This phrase means “'+e[0][1]+'”. '+u.rule},
 {type:'dictation',label:'Listening dictation',prompt:'Listen and type exactly what you hear in German:',source:e[1][0],expected:e[1][0],explain:'You heard “'+e[1][0]+'”, meaning “'+e[1][1]+'”.'},
 {type:'translation',label:'Write in German',prompt:'Translate this into German:',source:e[2][1],expected:e[2][0],explain:'A model answer is “'+e[2][0]+'”. '+u.rule},
 {type:'grammar',label:'Explain the grammar',prompt:u.checkpoint.prompt,source:'Choose the best completion:',expected:u.checkpoint.options[u.checkpoint.answer],options:u.checkpoint.options,explain:u.checkpoint.why}
]}
function intensiveRender(){let r=intensive;if(!r)return;let u=FULL_UNITS[r.id],q=intensiveTasks(u)[r.idx];if(!q){intensiveFinish();return}
 let body=illustratedHero(u.title,'Extended practice · '+(r.idx+1)+' of 4','forest',r.idx%2?'katze.png':'hund.png')+`<section class="card"><p class="deep-pill">${safeText(q.label)}</p><h3>${safeText(q.prompt)}</h3>`;
 if(q.type==='dictation')body+=`<button onclick="speak(${JSON.stringify(q.source).replace(/"/g,'&quot;')})">🔊 Play audio</button><p class="muted">You can replay as often as needed.</p>`;
 else body+=`<div class="deep-hint">${safeText(q.source)}</div>`;
 if(q.options)body+=q.options.map((o,i)=>`<button class="secondary intensive-choice" onclick="intensiveCheck(${i})">${safeText(o)}</button>`).join('');
 else body+=`<label for="intensiveEntry">Your answer</label><input id="intensiveEntry" class="deep-input" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Type your answer"><button onclick="intensiveCheck()">Check answer</button>`;
 body+=`<div id="intensiveFeedback" aria-live="polite"></div><button class="secondary" onclick="fullStudy(${r.id})">Review lesson</button></section>`;app.innerHTML=body;
 let entry=document.getElementById('intensiveEntry');if(entry)entry.addEventListener('keydown',e=>{if(e.key==='Enter')intensiveCheck()});
}
function intensiveCheck(choice){let r=intensive;if(!r||r.answers.length!==r.idx)return;let q=intensiveTasks(FULL_UNITS[r.id])[r.idx],actual=q.options?q.options[choice]:document.getElementById('intensiveEntry').value;
 if(!actual||!actual.trim()){document.getElementById('intensiveFeedback').textContent='Enter an answer first.';return}
 let ok=deepNormalize(actual)===deepNormalize(q.expected);feedbackSound(ok);r.answers.push(ok);if(ok)r.correct++;
 document.querySelectorAll('.intensive-choice').forEach(b=>b.disabled=true);let entry=document.getElementById('intensiveEntry');if(entry)entry.disabled=true;
 let explanation=`<div class="unit-explain"><h3>${ok?'Correct!':'Review the model answer'}</h3><p><strong>Your answer:</strong> ${safeText(actual)}</p><p><strong>Model answer:</strong> ${safeText(q.expected)}</p><p>${safeText(q.explain)}</p>${q.type==='dictation'?`<button class="secondary" onclick="speak(${JSON.stringify(q.expected).replace(/"/g,'&quot;')})">🔊 Listen again</button>`:''}<p class="muted">Typed answers are compared with the model answer. Other valid translations may be marked incorrect.</p></div><button onclick="intensiveNext()">${r.idx===3?'See results':'Continue'}</button>`;
 document.getElementById('intensiveFeedback').innerHTML=explanation;
}
function intensiveNext(){if(!intensive)return;intensive.idx++;intensiveRender()}
function intensiveFinish(){let r=intensive,u=FULL_UNITS[r.id];ensureLearning();state.learning.intensiveScores??={};let prev=state.learning.intensiveScores[r.id];state.learning.intensiveScores[r.id]={last:r.correct,best:Math.max(prev?.best||0,r.correct),date:new Date().toISOString()};state.learning.intensiveMisses??=[];r.answers.forEach((ok,i)=>{if(!ok)state.learning.intensiveMisses.push({id:r.id,exercise:i,date:Date.now()})});state.learning.intensiveMisses=state.learning.intensiveMisses.slice(-300);save();app.innerHTML=illustratedHero('Extended practice complete',u.title,'village','hund.png')+`<section class="card"><h2>${r.correct}/4 correct</h2><p>You've practiced reading, listening, writing and grammar. Typed answers use strict matching; review the model responses for alternative wording.</p><button onclick="intensiveStart(${r.id})">Try again</button><button class="secondary" onclick="fullStudy(${r.id})">Review lesson</button><button class="secondary" onclick="fullMenu('${u.level}')">Back to units</button></section>`;intensive=null}
const priorFullStudyIntensive=fullStudy;
fullStudy=function(id){priorFullStudyIntensive(id);let target=app.querySelector('.card');if(target)target.insertAdjacentHTML('beforeend',`<div class="unit-explain"><h3>Extended skill practice</h3><p>Four additional activities: reading comprehension, listening dictation, German writing and grammar, each with an explanation.</p><button onclick="intensiveStart(${id})">Start extended practice</button></div>`)};
const priorFullMenuIntensive=fullMenu;
fullMenu=function(level){priorFullMenuIntensive(level);let list=app.querySelectorAll('.unit-card');let lv=LEVELS.includes(level)?level:(state.learning?.placement?.recommended||'A1');let ids=FULL_UNITS.map((u,i)=>u.level===lv?i:null).filter(x=>x!==null);list.forEach((card,n)=>{let id=ids[n],score=state.learning?.intensiveScores?.[id];card.insertAdjacentHTML('beforeend',`<p class="muted">Extended practice: ${score?'best '+score.best+'/4':'not attempted'}</p><button class="secondary" onclick="intensiveStart(${id})">Extended practice</button>`);});};
