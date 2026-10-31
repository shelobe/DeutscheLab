/* Use existing lesson flow, artwork and saved IDs; enrich content without a new course. */
(function(){
 const packs=window.DL_LESSON_ENRICHMENT||{};
 const key=u=>u?.level+'|'+u?.title;
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 // Authored explanations also reach review/help paths that read the unit rule.
 for(const u of FULL_UNITS){const pack=packs[key(u)];if(pack){u.rule=pack.sections.map(([heading,body])=>heading+'\n'+body).join('\n\n');if(pack.examples)u.examples=pack.examples.map(pair=>[...pair]);}}
 const previousQuestions=fullQuestions;
 fullQuestions=function(u){
  const original=previousQuestions(u);
  const pack=packs[key(u)];
  if(!pack?.questions?.length)return original;
  const id=FULL_UNITS.indexOf(u);
  if(fullSession?.id===id&&fullSession.questions)return fullSession.questions;
  // A1 topic stages have different jobs. Do not pad them with the same translations.
  const authored=pack.questions.map(q=>({...q,options:[...q.options]}));
  let questions=authored;
  if(u.level!=='A1'){
   // Keep two existing checkpoints for continuity while adding applied question forms.
   const prompts=new Set(authored.map(q=>q.prompt));
   const extras=shuffle(original.filter(q=>Array.isArray(q.options)&&q.options.length===3&&!prompts.has(q.prompt))).slice(0,2);
   questions=[...authored,...extras];
  }
  return shuffle(questions).map(q=>{
   const choices=shuffle(q.options.map((text,i)=>({text,correct:i===q.answer})));
   return {...q,dlEnriched:true,options:choices.map(x=>x.text),answer:choices.findIndex(x=>x.correct)};
  });
 };
 function improveIntro(id){
  const u=FULL_UNITS[id];if(!u||!['A1','A2','B1'].includes(u.level))return;
  const card=app.querySelector('.dl-flow-card');
  if(!card||card.querySelector('#dl-order-guide,.dl-pronoun-guide,.dl-conversation-cards,.dl-accusative-guide,.dl-lesson-guide'))return;
  const heading=card.querySelector('h2'),paragraph=heading?.nextElementSibling;
  if(paragraph?.tagName!=='P')return;
  let sections=packs[key(u)]?.sections;
  if(!sections){
   // Format remaining established teaching, preserving its wording and examples.
   const pieces=String(u.rule||'').split(/\n\s*\n|(?<=[.!?])\s+(?=[A-ZÄÖÜ])/).map(s=>s.trim()).filter(Boolean);
   sections=[['The idea',pieces[0]||u.rule]];
   if(pieces.length>1)sections.push(['How to use it',pieces.slice(1).join('\n\n')]);
   const why=String(u.checkpoint?.why||'').trim();
   if(why&&!pieces.some(p=>p.includes(why)))sections.push(['Notice the pattern',why]);
  }
  const guide=document.createElement('div');guide.className='dl-pronoun-guide dl-lesson-guide';
  for(const [title,body] of sections){
   const section=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p');
   h.textContent=title;p.textContent=body;p.style.whiteSpace='pre-line';
   if(title==='Remember')section.classList.add('dl-lesson-remember');
   section.append(h,p);guide.append(section);
  }
  paragraph.replaceWith(guide);
 }
 // Preserve authored teaching when older feedback cleanup removes short explanations.
 const previousCheck=dlCheck;
 dlCheck=function(){
  const result=previousCheck.apply(this,arguments);
  const s=fullSession,q=s?.questions?.[s.idx];
  if(!q?.dlEnriched||!dlAnswered)return result;
  const box=document.querySelector('#dl-result .dl-flow-feedback');if(!box)return result;
  const add=(className,label,text)=>{if(!text||box.textContent.includes(text)||box.querySelector('.'+className))return;const p=document.createElement('p');p.className=className;p.textContent=label+text;box.append(p);};
  if(dlSelected!==q.answer&&!box.querySelector('.dl-enriched-answer')){const correction=document.createElement('p');correction.className='dl-enriched-answer';correction.textContent='Correct answer: '+q.options[q.answer];box.append(correction);}
  add('dl-enriched-why','',q.why);
  if(q.german&&!q.prompt.includes(q.german))add('dl-enriched-german','German: ',q.german);
  if(q.english&&!q.prompt.includes(q.english))add('dl-enriched-english','English: ',q.english);
  return result;
 };
 const previousStudy=fullStudy,previousIntro=dlLessonIntro;
 fullStudy=function(id){const result=previousStudy.apply(this,arguments);improveIntro(id);return result;};
 dlLessonIntro=function(id){const result=previousIntro.apply(this,arguments);improveIntro(id);return result;};
 const style=document.createElement('style');
 style.textContent='.dl-lesson-guide .dl-lesson-remember{border:2px solid #70c9c0;background:#20434a}.dl-lesson-guide p{line-height:1.6}';
 document.head.append(style);
})();
