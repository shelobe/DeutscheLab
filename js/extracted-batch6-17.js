
function friendlyCourse(level){
 ensureLearning();level=LEVELS.includes(level)?level:(state.learning.placement?.recommended||'A1');
 const units=FULL_UNITS.map((u,id)=>({...u,id})).filter(u=>u.level===level);
 const scores=state.learning.fullScores||{};
 const first=units.findIndex(u=>!scores[u.id]?.passed),currentIndex=first<0?units.length-1:first;
 const unit=units[currentIndex],done=units.filter(u=>scores[u.id]?.passed).length;
 const pct=Math.round(done/units.length*100),completed=done===units.length;
 const label=completed?'Review your lessons':(done===0?'Start lesson 1':'Continue lesson '+(currentIndex+1));
 const title=completed?'You completed '+level+'!':unit.title;
 app.innerHTML=illustratedHero('Your '+level+' learning journey','One lesson at a time, at your own pace.','village','hund.png')+
 `<section class="card"><label for="friendlyLevel">Your level</label><select id="friendlyLevel" onchange="friendlyCourse(this.value)">${LEVELS.map(l=>`<option ${l===level?'selected':''}>${l}</option>`).join('')}</select><div class="path-track"><div style="width:${pct}%"></div></div><p class="path-small">${done} of ${units.length} lessons completed</p></section>`+
 `<section class="path-panel"><div class="path-eyebrow">${completed?'Course complete':level+' · Lesson '+(currentIndex+1)+' of '+units.length}</div><h2>${safeText(title)}</h2><p>${completed?'Well done! You can revisit any lesson below.':safeText(unit.rule)}</p><div class="path-steps"><div class="path-step">Learn</div><div class="path-step">Practice</div><div class="path-step">Review</div></div><button onclick="friendlyLesson(${unit.id})">${label}</button></section>`+
 `<details class="path-list"><summary>See all ${units.length} lessons ▾</summary>${units.map((u,i)=>`<div class="path-item"><span>${scores[u.id]?.passed?'<span class="path-done">✓ </span>':''}${i+1}. ${safeText(u.title)}</span><button class="secondary" onclick="friendlyLesson(${u.id})">${scores[u.id]?.passed?'Review':'Open'}</button></div>`).join('')}</details>`+
 `<section class="card"><p class="path-small">Not sure about your level?</p><button class="secondary" onclick="placementResults()">View placement results</button></section>`;
}
function friendlyLesson(id){fullStudy(id);const card=app.querySelector('.card');if(!card)return;
 // Preserve all lesson content and practice options, but use a single clear learning flow.
 card.querySelectorAll('button').forEach(b=>{
 const label=b.textContent.trim();
 if(/^(Study unit|Start unit|Begin exercises|Practice unit|Start exercises)/i.test(label))b.textContent='Try what you learned';
 if(/Extended practice|Deep dive|Expanded A1|A1–A2 practice/i.test(label))b.textContent='More practice';
 });
}
// Keep the existing lesson engine, scores, review and expanded exercises.
fullMenu=friendlyCourse;
courseMenu=friendlyCourse;
const oldFullFinishFriendly=fullFinish;
fullFinish=function(){oldFullFinishFriendly();let btn=app.querySelector('button[onclick^="fullMenu("]');if(btn)btn.textContent='Back to my learning path';};
