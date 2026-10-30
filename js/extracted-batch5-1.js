
/* Topic-aware module reviews: recap, a small transfer challenge, and score-based mascot feedback. */
(function(){
 const oldReview=curriculumReview, oldRender=curriculumReviewRender;
 function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 curriculumReview=function(level,n){
  if(level!=='A1')return oldReview(level,n);
  const g=STRUCTURED_PATH[level]?.[n];if(!g)return;
  const core=[];
  for(const id of g.ids){
   const u=FULL_UNITS[id];if(!u)continue;
   const qs=fullQuestions(u).filter(q=>Array.isArray(q.options)&&q.type!=='listen');
   // Test meaning, grammar and recall rather than repeating the same prompt three times.
   const chosen=[qs.find(q=>q.type==='grammar'),qs.find(q=>q.type==='recall'),qs.find(q=>q.type==='translate')].filter(Boolean);
   chosen.forEach(q=>core.push({...q,unitId:id}));
  }
  shuffle(core);
  const questions=core.slice(0,7);
  // Module 1 also reviews every sound from the 15-exercise pronunciation lesson.
  if(n===0){
   const soundChecks=[
    ['What sound does German z make in zwei?',['ts','English z','sh'],'ts','German z is pronounced /ts/.'],
    ['How is sch pronounced in Schule?',['sh','sk','ch as in chair'],'sh','sch makes the sh sound.'],
    ['How is sp pronounced at the beginning of sprechen?',['shp','sp as in English spin','sf'],'shp','Initial sp is pronounced shp.'],
    ['How is st pronounced at the beginning of Straße?',['sht','st as in English stop','ts'],'sht','Initial st is pronounced sht.'],
    ['Which word contains the soft ch sound /ç/?',['ich','Buch','Haus'],'ich','ich uses the soft ch sound.'],
    ['Which word contains the back ch sound /x/?',['Buch','ich','Liebe'],'Buch','Buch uses the back ch sound.'],
    ['What sound does ei make in mein?',['eye','long ee','oy'],'eye','ei sounds like eye.'],
    ['What sound does ie make in Liebe?',['long ee','eye','ow'],'long ee','ie makes a long ee sound.'],
    ['What sound does eu make in neun?',['oy','eye','oo'],'oy','eu sounds similar to oy.'],
    ['What sound does au make in Haus?',['ow as in cow','oy','long ee'],'ow as in cow','au sounds similar to ow in cow.'],
    ['How is German w pronounced in Wasser?',['English v','English w','English f'],'English v','German w makes a v sound.'],
    ['How is v usually pronounced in Vater?',['English f','English v','English w'],'English f','Vater begins with an f sound.'],
    ['What sound does ß make in Straße?',['voiceless s','b','z'],'voiceless s','ß makes a voiceless s sound.'],
    ['How do you form the ü sound in fünf?',['Keep tongue forward and round lips','Use a plain English oo','Use a plain English ee'],'Keep tongue forward and round lips','For ü, keep the tongue forward while rounding the lips.'],
    ['How do you form the ö sound in schön?',['Keep tongue forward and round lips','Use an ordinary English oh','Use an English ah'],'Keep tongue forward and round lips','For ö, use a front vowel with rounded lips.']
   ];
   soundChecks.forEach(([prompt,choices,correct,why])=>{
    const options=shuffle(choices.slice());
    questions.push({type:'sound-review',prompt,options,answer:options.indexOf(correct),why,unitId:g.ids[0]});
   });
   shuffle(questions);
  }
  // A small, explicitly labeled transfer challenge uses unfamiliar vocabulary
  // with a pattern already practiced. It is never required for passing.
  const next=STRUCTURED_PATH.A1[n+1];
  let stretch=[];
  if(next){
   for(const id of next.ids){
    const u=FULL_UNITS[id];if(!u?.examples?.length)continue;
    const ex=u.examples.find(x=>Array.isArray(x)&&x[0]&&x[1]);
    if(!ex)continue;
    const distractors=u.examples.filter(x=>Array.isArray(x)&&x[1]!==ex[1]).map(x=>x[1]).slice(0,2);
    if(distractors.length<2)continue;
    const opts=shuffle([ex[1],...distractors]);
    stretch.push({type:'transfer',prompt:'New vocabulary challenge: What does “'+ex[0]+'” mean?',options:opts,answer:opts.indexOf(ex[1]),why:'New word: “'+ex[0]+'” means “'+ex[1]+'”. You can apply the recognition skills you just practiced to unfamiliar German.',unitId:id,dlStretch:true});
   }
  }
  if(stretch.length)questions.push(stretch[0]);
  // The optional challenge is practice, not part of the mastery threshold.
  moduleSession={level,n,questions,idx:0,score:0,answered:false,dlReviewEnhanced:true,dlCoreCount:questions.filter(q=>!q.dlStretch).length,dlCoreScore:0,dlMissed:[]};
  curriculumReviewRender();
 };
 const oldAnswer=curriculumReviewAnswer;
 curriculumReviewAnswer=function(i){
  const s=moduleSession;
  if(s?.dlReviewEnhanced&&!s.answered){
   const q=s.questions[s.idx];
   if(i===q.answer&&!q.dlStretch)s.dlCoreScore++;
   if(i!==q.answer)s.dlMissed.push({prompt:q.prompt,correct:q.options[q.answer]});
  }
  return oldAnswer(i);
 };
 curriculumReviewRender=function(){
  const s=moduleSession;
  if(!s?.dlReviewEnhanced)return oldRender();
  if(s.idx<s.questions.length){
   oldRender();
   const q=s.questions[s.idx];
   if(q.dlStretch){
    const title=app.querySelector('.curriculum-pill');if(title)title.textContent='BONUS · Apply what you learned to a new word';
    const prompt=app.querySelector('.card h2');if(prompt)prompt.textContent=q.prompt.replace(/^New vocabulary challenge: /,'');
    const note=document.createElement('p');note.className='muted';note.textContent='This introduces unfamiliar vocabulary using skills you already practiced. It does not affect your pass score.';
    prompt?.after(note);
   }
   return;
  }
  const g=STRUCTURED_PATH[s.level]?.[s.n],total=s.dlCoreCount,correct=s.dlCoreScore;
  const percent=total?Math.round(correct/total*100):0;
  const passed=percent>=80;
  ensureLearning();state.learning.moduleReviews??={};
  const key=s.level+'-'+s.n,old=state.learning.moduleReviews[key];
  state.learning.moduleReviews[key]={best:Math.max(old?.best||0,correct),total,passed:passed||!!old?.passed};save();
  const mascot=percent===100?'avatar_fox.webp':percent>=80?'avatar_dog.webp':percent>=60?'avatar_owl.webp':'avatar_cat.webp';
  const german=percent===100?'Ausgezeichnet!':percent>=80?'Sehr gut gemacht!':percent>=60?'Gut gemacht!':'Weiter üben!';
  const english=percent===100?'Excellent! A perfect review.':percent>=80?'Very well done! You passed the review.':percent>=60?'Good work! Review the missed answers and try again.':'Keep practicing! Revisit the lessons and try again.';
  const examples=(g?.ids||[]).flatMap(id=>FULL_UNITS[id]?.examples||[]).filter(x=>Array.isArray(x)&&x[0]&&x[1]).slice(0,3);
  app.innerHTML=`<section class="card"><p class="curriculum-pill">${esc(s.level)} · Module ${s.n+1} review</p><h2>Module review complete</h2>
   <div class="dl-review-result"><img src="${mascot}" alt="DeutschLab animal character"><div><h3>${german}</h3><p>${english}</p><p><strong>${percent}%</strong> · ${correct} of ${total} review questions correct</p></div></div>
   <div class="dl-review-summary"><h3>What you practiced</h3><p>${esc(g?.goal||'The key skills from this module.')}</p><p>${esc(g?.context||'')}</p>
   ${examples.length?'<h4>Key examples</h4><ul>'+examples.map(x=>'<li><strong>'+esc(x[0])+'</strong> — '+esc(x[1])+'</li>').join('')+'</ul>':''}
   ${s.dlMissed.length?'<h4>Answers to revisit</h4><ul>'+s.dlMissed.slice(0,4).map(x=>'<li>'+esc(x.prompt)+' — <strong>'+esc(x.correct)+'</strong></li>').join('')+'</ul>':'<p>You answered all the core review questions correctly.</p>'}
   <p class="muted">Bonus questions are just for practice. They don’t affect your score.</p></div>
   <button onclick="curriculumView('${s.level}')">Learning path</button><button class="secondary" onclick="curriculumReview('${s.level}',${s.n})">Practice again</button></section>`;
  moduleSession=null;window.scrollTo(0,0);
 };
})();
