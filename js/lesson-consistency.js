/* Use existing lesson flow, artwork and saved IDs; enrich content without a new course. */
(function(){
 const packs=window.DL_LESSON_ENRICHMENT||{};
 const key=u=>u?.level+'|'+u?.title;
 const shuffle=items=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 // Authored explanations also reach review/help paths that read the unit rule.
 for(const u of FULL_UNITS){const pack=packs[key(u)];if(pack){u.rule=pack.sections.map(([heading,body])=>heading+'\n'+(Array.isArray(body)?body.map(line=>'• '+line).join('\n'):body)).join('\n\n');if(pack.examples)u.examples=pack.examples.map(pair=>[...pair]);}}
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
  if(!card)return;
  if(card.querySelector('#dl-order-guide'))return;
  const foundation=(u.dlPracticalCourse||['Personal pronouns: ich, du, and Sie','Personal pronouns: he, she, it'].includes(u.title))&&Array.isArray(packs[key(u)]?.sections);
  const previousGuide=foundation?card.querySelector('.dl-pronoun-guide,.dl-conversation-cards,.dl-accusative-guide,.dl-lesson-guide'):null;
  if(!foundation&&card.querySelector('#dl-order-guide,.dl-pronoun-guide,.dl-conversation-cards,.dl-accusative-guide,.dl-lesson-guide'))return;
  if(previousGuide?.classList.contains('dl-lesson-guide'))return;
  const heading=card.querySelector('h2'),paragraph=heading?.nextElementSibling;
  const anchor=previousGuide||(paragraph?.tagName==='P'?paragraph:null);
  if(!anchor)return;
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
   const section=document.createElement('section'),h=document.createElement('h3'),p=document.createElement(Array.isArray(body)?'ul':'p');
   h.textContent=title;
   if(Array.isArray(body)){for(const line of body){
    const li=document.createElement('li');
    if(line.includes(' — ')&&line.includes('\n')){
     const [phrase,...notes]=line.split('\n');
     const strong=document.createElement('strong');strong.textContent=phrase;
     const usage=document.createElement('span');usage.className='dl-phrase-usage';usage.textContent=notes.join(' ');usage.style.display='block';usage.style.fontWeight='400';
     li.append(strong,usage);
    }else li.textContent=line;
    p.append(li);
   }}
   else{p.textContent=body;p.style.whiteSpace='pre-line'}
   if(title==='Remember'||title==='Coming up')section.classList.add('dl-lesson-remember');
   section.append(h,p);guide.append(section);
  }
  anchor.replaceWith(guide);
  if(previousGuide&&paragraph?.tagName==='P')paragraph.remove();
 }
 // Preserve authored teaching when older feedback cleanup removes short explanations.
 const previousCheck=dlCheck;
 dlCheck=function(){
  const result=previousCheck.apply(this,arguments);
  const s=fullSession,q=s?.questions?.[s.idx];
  if(!q?.dlEnriched||!dlAnswered)return result;
  app.querySelectorAll('.dl-practical-input,.dl-practical-audio').forEach(el=>el.remove());
  const box=document.querySelector('#dl-result .dl-flow-feedback');if(!box)return result;
  const add=(className,label,text)=>{if(!text||box.textContent.includes(text)||box.querySelector('.'+className))return;const p=document.createElement('p');p.className=className;p.textContent=label+text;box.append(p);};
  if(dlSelected!==q.answer&&!box.querySelector('.dl-enriched-answer')){const correction=document.createElement('p');correction.className='dl-enriched-answer';correction.textContent='Correct answer: '+q.options[q.answer];box.append(correction);}
  add('dl-enriched-why','',q.why);
  if(q.german&&!q.prompt.includes(q.german))add('dl-enriched-german','German: ',q.german);
  if(q.english&&!q.prompt.includes(q.english))add('dl-enriched-english','English: ',q.english);
  return result;
 };
 // Taught short answers use the same native check, feedback, score and footer.
 const previousFullRender=fullRender;
 const normalize=value=>String(value).normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/[.!?]+$/,'');
 fullRender=function(){
  const result=previousFullRender.apply(this,arguments),s=fullSession,q=s?.questions?.[s.idx];
  if(!q?.dlEnriched)return result;
  const card=app.querySelector('.dl-flow-card'),heading=card?.querySelector('h2');
  if(!card||!heading)return result;
  if(q.dlReviewAudio){
   const audio=document.createElement('div');audio.className='dl-practical-audio';
   const listen=document.createElement('button'),slow=document.createElement('button');
   listen.type=slow.type='button';listen.textContent='Listen to the word';slow.textContent='Listen slowly';slow.className='secondary';
   listen.onclick=()=>{if(fullSession===s&&!dlAnswered)speak(q.dlReviewAudio)};
   slow.onclick=()=>{if(fullSession===s&&!dlAnswered)speak(q.dlReviewAudio,.7)};
   audio.append(listen,slow);heading.after(audio);
  }
  if(q.dlWriteAnswer){
   const choices=card.querySelector('.dl-flow-options'),check=document.getElementById('dl-check');
   if(!choices||!check)return result;
   choices.hidden=true;dlSelected=null;check.disabled=true;
   const area=document.createElement('div');area.className='dl-practical-input';
   const label=document.createElement('label'),input=document.createElement('input');
   label.textContent='Your answer';label.htmlFor='dl-practical-answer';input.id='dl-practical-answer';
   input.autocomplete='off';input.autocapitalize='none';input.spellcheck=false;
   input.setAttribute('autocorrect','off');input.setAttribute('aria-label','Your written answer');
   const update=()=>{if(fullSession!==s||dlAnswered)return;const ready=!!input.value.trim();dlSelected=ready?(normalize(input.value)===normalize(q.dlWriteAnswer)?q.answer:(q.answer===0?1:0)):null;check.disabled=!ready;window.dlRefreshFixedNext?.()};
   input.oninput=update;input.onkeydown=e=>{if(e.key==='Enter'&&input.value.trim()){e.preventDefault();check.click()}};
   const keys=document.createElement('div');keys.className='dl-practical-keys';
   for(const ch of ['ä','ö','ü','ß']){const b=document.createElement('button');b.type='button';b.className='secondary';b.textContent=ch;b.onclick=()=>{if(fullSession!==s||dlAnswered)return;input.setRangeText(ch,input.selectionStart,input.selectionEnd,'end');input.focus();update()};keys.append(b);}
   area.append(label,input,keys);choices.replaceWith(area);
  }
  return result;
 };
 const previousStudy=fullStudy,previousIntro=dlLessonIntro;
 fullStudy=function(id){const result=previousStudy.apply(this,arguments);improveIntro(id);return result;};
 dlLessonIntro=function(id){const result=previousIntro.apply(this,arguments);improveIntro(id);return result;};
 const style=document.createElement('style');
 style.textContent='#app :is(.dl-lesson-guide,.dl-pronoun-guide,.dl-conversation-card,.dl-conversation-section,.dl-accusative-guide,.dl-article-teaching,#dl-order-guide) h3{font-size:1.3rem!important;font-weight:800;line-height:1.3;margin-bottom:12px}#app .dl-sound-focus>strong{font-size:1.3rem;line-height:1.3}.dl-lesson-guide .dl-lesson-remember{border:2px solid #70c9c0;background:#20434a}.dl-lesson-guide p,.dl-lesson-guide li{line-height:1.6}.dl-lesson-guide ul{padding-left:1.3em;margin:0}.dl-lesson-guide li+li{margin-top:.5em}.dl-practical-input{display:grid;gap:12px;margin:20px 0}.dl-practical-input input{box-sizing:border-box;width:100%;padding:14px;border:1px solid #70c9c0;border-radius:12px;background:#20374e;color:#fff;font:inherit}.dl-practical-keys{display:flex;gap:8px}.dl-practical-keys button{margin:0;min-height:44px}.dl-practical-audio{display:flex;flex-direction:column;gap:8px;margin:16px 0}.dl-practical-audio>button{margin:0;min-height:56px}.dl-practical-audio>.secondary{align-self:flex-start;font-size:.9rem;min-height:44px}';
 document.head.append(style);
})();
