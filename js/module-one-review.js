/* Module 1 applies taught spelling/sounds through five distinct interactions. */
(function(){
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const normalize=s=>String(s).normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/[.!?]+$/,'');
 let dispose=()=>{};
 function bank(group){
  const id=group.ids[0],umlaut=group.ids.find(i=>/umlaut/i.test(FULL_UNITS[i]?.title||''))??id;
  const prompts={type:'Listen, then type the word you hear.',speak:'Read the word aloud.',compare:'Do the two recordings say the same word or different words?',match:'Match each recording to its written word.'};
  const make=(mode,word,why,extra={})=>({type:'grammar',unitId:id,prompt:prompts[mode]||'Listen and choose the word you hear.',options:[word,'Try again'],answer:0,why,dlReviewMode:mode,...extra});
  const choice=(word,others,why)=>make('choice',word,why,{prompt:'Listen and choose the word you hear.',dlReviewAudio:word,options:shuffle([word,...others])});
  const choices=[choice('Wasser',['Vater','Jahr'],'Wasser begins with W, pronounced like English V.'),choice('zwei',['drei','frei'],'Zwei begins with the ts sound written z.'),choice('Schule',['Stuhl','Schale'],'Schule begins with sch, pronounced sh.')];
  choices.forEach(q=>q.answer=q.options.indexOf(q.dlReviewAudio));
  const typing=[make('type','Wein','EI makes the eye sound in Wein.'),make('type','Liebe','IE makes the long ee sound in Liebe.'),make('type','Käse','The ä in Käse is a different vowel from a.',{unitId:umlaut})];
  const speaking=[make('speak','Schule','Sch makes the sh sound in Schule.',{alternative:{word:'schön',others:['schon','Schule'],why:'Schön begins with sch and contains ö.'}}),make('speak','Buch','After u, ch is made farther back in the mouth.',{alternative:{word:'auch',others:['auf','Auge'],why:'Auch contains the back ch sound after au.'}}),make('speak','fünf','Ü is made with a forward tongue and rounded lips.',{unitId:umlaut,alternative:{word:'Tür',others:['Tier','Tor'],why:'Tür contains ü, distinct from ie and o.'}})];
  const pairA=Math.random()<.5?['schon','schön']:['schön','schön'];
  const pairB=Math.random()<.5?['mein','mein']:['mein','Wein'];
  const pairC=Math.random()<.5?['Tier','Tür']:['Tür','Tür'];
  const pairs=[make('compare','',pairA[0]===pairA[1]?'Both recordings say schön.':'Schon and schön have different vowel sounds.',{unitId:umlaut,clips:pairA}),make('compare','',pairB[0]===pairB[1]?'Both recordings say mein.':'The recordings say mein and Wein: the initial consonants differ.',{clips:pairB}),make('compare','',pairC[0]===pairC[1]?'Both recordings say Tür.':'Tier has ie; Tür has ü.',{unitId:umlaut,clips:pairC})];
  pairs.forEach(q=>{q.options=['Same word','Different words'];q.answer=q.clips[0]===q.clips[1]?0:1});
  const sets=[['Jahr','Wasser','Vater'],['Schule','sprechen','stehen'],['Straße','heißen','fünf']];
  const matches=sets.map((words,i)=>make('match',words.join(' · '),'Listen for the full word and connect its sound to its spelling.',{unitId:i===2?umlaut:id,words,clipOrder:shuffle(words),wordOrder:shuffle(words)}));
  matches.forEach(q=>q.options[0]=q.clipOrder.map((word,i)=>'Recording '+(i+1)+': '+word).join('; '));
  const buckets=[choices,typing,speaking,pairs,matches].map(shuffle),questions=[];
  for(let i=0;i<3;i++)for(const bucket of shuffle(buckets))questions.push(bucket[i]);
  return questions;
 }
 const priorReview=curriculumReview;
 curriculumReview=function(level,n){
  priorReview.apply(this,arguments);
  const s=moduleSession,g=STRUCTURED_PATH[level]?.[n];
  if(level!=='A1'||n!==0||!s||s.level!==level||s.n!==n||!/alphabet|spelling/i.test(g?.title||''))return;
  s.questions=bank(g);s.idx=0;s.score=0;s.answered=false;s.dlCoreScore=0;s.dlCoreCount=15;s.dlMissed=[];
  curriculumReviewRender();
 };
 const priorAnswer=curriculumReviewAnswer;
 curriculumReviewAnswer=function(){
  const session=moduleSession,q=session?.questions?.[session.idx],wasAnswered=session?.answered;
  const result=priorAnswer.apply(this,arguments);
  if(q?.dlReviewMode&&!wasAnswered&&session.answered){
   dispose();
   app.querySelectorAll('.dl-review-controls,.picture-choices,.dl-review-listen').forEach(el=>el.remove());
   window.dlRefreshFixedNext?.();
   app.querySelector('#moduleFeedback')?.scrollIntoView?.({block:'nearest',behavior:'smooth'});
  }
  return result;
 };
 const oldRender=curriculumReviewRender;
 curriculumReviewRender=function(){
  dispose();dispose=()=>{};
  const result=oldRender.apply(this,arguments),s=moduleSession,q=s?.questions?.[s.idx];
  if(!q?.dlReviewMode||s.answered)return result;
  const card=app.querySelector('.card'),heading=card?.querySelector('h2'),original=card?.querySelector('.picture-choices');
  if(!heading||!original)return result;
  const section=card.querySelector('p.muted');if(section)section.textContent='Sounds and spelling';
  if(q.dlReviewMode==='choice')return result;
  card.querySelectorAll('.dl-review-listen').forEach(el=>el.remove());
  const controls=document.createElement('div');controls.className='dl-review-controls';original.replaceWith(controls);
  let active=true,recognition=null,timer=null;
  const alive=()=>active&&controls.isConnected&&moduleSession===s&&s.questions[s.idx]===q&&!s.answered;
  function stop(){clearTimeout(timer);timer=null;const rec=recognition;recognition=null;if(rec)try{rec.abort()}catch(e){}}
  dispose=()=>{active=false;stop()};
  const button=(label,action,parent=controls)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=action;parent.append(b);return b};
  const primary=b=>{b.setAttribute('data-dl-review-action','');return b};
  const note=text=>{const p=document.createElement('p');p.textContent=text;controls.append(p);return p};
  const status=note('');status.setAttribute('aria-live','polite');
  function submit(ok){
   if(!alive())return;
   stop();controls.querySelectorAll('button,input').forEach(el=>el.disabled=true);
   curriculumReviewAnswer(ok?q.answer:(q.answer===0?1:0));
  }
  function play(word,after){if(!alive())return;speak(word);if(after)after()}
  if(q.dlReviewMode==='type'){
   heading.textContent='Listen, then type the word you hear.';
   let heard=false;
   button('Play word',()=>play(q.options[0],()=>{heard=true;check.disabled=!input.value.trim()}));
   button('Play slowly',()=>{if(alive()){speak(q.options[0],0.7);heard=true;check.disabled=!input.value.trim()}});
   const label=document.createElement('label');label.textContent='Your answer';label.htmlFor='dl-review-typed';controls.append(label);
   const input=document.createElement('input');input.id='dl-review-typed';input.type='text';input.autocomplete='off';input.autocapitalize='none';input.spellcheck=false;input.setAttribute('autocorrect','off');controls.append(input);
   const keys=document.createElement('div');keys.className='dl-review-character-keys';controls.append(keys);
   for(const ch of ['ä','ö','ü','ß'])button(ch,()=>{input.setRangeText(ch,input.selectionStart,input.selectionEnd,'end');input.focus();check.disabled=!heard||!input.value.trim()},keys);
   const check=primary(button('Check answer',()=>{if(heard&&input.value.trim())submit(normalize(input.value)===normalize(q.options[0]))}));check.disabled=true;
   input.oninput=()=>check.disabled=!heard||!input.value.trim();input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check.click()}};
  }else if(q.dlReviewMode==='compare'){
   heading.textContent='Do the two recordings say the same word or different words?';
   const heard=new Set(),answers=[];let selected=null;
   q.clips.forEach((word,i)=>button('Play recording '+(i+1),()=>play(word,()=>{heard.add(i);answers.forEach(b=>b.disabled=heard.size!==2)})));
   q.options.forEach((label,i)=>{const b=button(label,()=>{if(heard.size!==2)return;selected=i;answers.forEach((answer,j)=>answer.setAttribute('aria-pressed',String(i===j)));check.disabled=false});b.disabled=true;answers.push(b)});
   const check=primary(button('Check answer',()=>{if(selected!==null)submit(selected===q.answer)}));check.disabled=true;
  }else if(q.dlReviewMode==='match'){
   heading.textContent='Match each recording to its written word.';
   note('Play a recording, then select its word. Each word can be used once.');
   let selected=null;const picks=new Map(),heard=new Set(),audioButtons=[],wordButtons=[];
   const columns=document.createElement('div');columns.className='dl-review-match-columns';controls.append(columns);
   const recordings=document.createElement('div'),words=document.createElement('div');
   recordings.className=words.className='dl-review-match-column';columns.append(recordings,words);
   q.clipOrder.forEach((word,i)=>{const b=button('Recording '+(i+1),()=>play(word,()=>{selected=i;heard.add(i);status.textContent='Choose a word for recording '+(i+1)+'.';update()}),recordings);audioButtons.push(b)});
   q.wordOrder.forEach(word=>wordButtons.push(button(word,()=>{
    if(selected===null||!heard.has(selected))return;
    for(const [i,value] of picks)if(value===word)picks.delete(i);
    picks.set(selected,word);status.textContent='Recording '+(selected+1)+' matched to '+word+'.';selected=null;update();
   },words)));
   const check=primary(button('Check matches',()=>{if(picks.size===q.words.length)submit(q.clipOrder.every((word,i)=>picks.get(i)===word))}));
   function update(){
    audioButtons.forEach((b,i)=>{b.textContent='Recording '+(i+1)+(picks.has(i)?': '+picks.get(i):'');b.setAttribute('aria-pressed',String(selected===i))});
    wordButtons.forEach(b=>{b.setAttribute('aria-pressed',String([...picks.values()].includes(b.textContent)))});
    check.disabled=picks.size!==q.words.length;
   }
   update();
  }else if(q.dlReviewMode==='speak'){
   heading.textContent='Read this word aloud.';
   const word=document.createElement('p');word.className='dl-review-speaking-word';word.textContent=q.options[0];controls.append(word);
   note('Tap Speak now, then say the word. You can retry if recognition mishears you.');
   function alternative(){
    if(!alive())return;stop();const a=q.alternative;
    q.dlReviewMode='choice';q.prompt='Listen and choose the word you hear.';q.options=shuffle([a.word,...a.others]);q.answer=q.options.indexOf(a.word);q.dlReviewAudio=a.word;q.why=a.why;curriculumReviewRender();
   }
   const speakButton=button('Speak now',()=>{
    if(!alive())return;
    if(recognition){const r=recognition;speakButton.disabled=true;status.textContent='Checking speech…';try{r.stop()}catch(e){stop();speakButton.disabled=false;speakButton.textContent='Speak now'}return}
    const Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Rec){status.textContent='Speech recognition is unavailable. Use the listening question instead.';return}
    const r=new Rec();recognition=r;r.lang='de-DE';r.continuous=false;r.interimResults=false;r.maxAlternatives=3;
    speakButton.textContent='Stop listening';status.textContent='Listening…';
    r.onresult=e=>{
     if(!alive()||recognition!==r)return;
     const words=Array.from(e.results[0]||[]).map(x=>normalize(x.transcript));
     stop();speakButton.disabled=false;speakButton.textContent='Speak now';
     if(words.includes(normalize(q.options[0])))submit(true);
     else status.textContent='Not recognized clearly'+(words[0]?' (heard “'+words[0]+'”)':'')+'. Retry or use the listening question. This has not been marked wrong.';
    };
    r.onerror=e=>{if(!alive()||recognition!==r)return;stop();speakButton.disabled=false;speakButton.textContent='Speak now';status.textContent=e.error==='no-speech'?'No speech detected. Try again.':'Speech recognition is unavailable. Retry or use the listening question.'};
    r.onend=()=>{if(!alive()||recognition!==r)return;stop();speakButton.disabled=false;speakButton.textContent='Speak now';status.textContent='No recognized word returned. Retry or use the listening question.'};
    timer=setTimeout(()=>{if(!alive()||recognition!==r)return;stop();speakButton.disabled=false;speakButton.textContent='Speak now';status.textContent='Speech recognition timed out. Retry or use the listening question.'},12000);
    try{r.start()}catch(e){stop();speakButton.textContent='Speak now';status.textContent='Unable to start speech recognition. Use the listening question instead.'}
   });
   primary(button('Use a listening question instead',alternative));
  }
  window.dlRefreshFixedNext?.();
  return result;
 };
 const observer=new MutationObserver(()=>{if(!document.querySelector('#app .dl-review-controls'))dispose()});
 observer.observe(app,{childList:true,subtree:true});
 const style=document.createElement('style');style.textContent='.dl-review-controls{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}.dl-review-controls p,.dl-review-controls label{flex-basis:100%;margin:0}.dl-review-controls input{box-sizing:border-box;width:100%;padding:14px;border:1px solid #70c9c0;border-radius:12px;background:#20374e;color:#fff;font:inherit}.dl-review-controls button{white-space:normal;min-height:48px}.dl-review-character-keys{display:flex;gap:8px;width:100%}.dl-review-speaking-word{font-size:2.4rem;font-weight:700}.dl-review-controls [aria-pressed=true]{outline:2px solid #70c9c0}.dl-review-controls button:disabled{opacity:.5}.dl-review-match-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;width:100%;align-items:start}.dl-review-match-column{display:grid;gap:12px;min-width:0}.dl-review-match-column button{width:100%;margin:0!important;min-height:72px;padding:12px 8px;overflow-wrap:anywhere;font:inherit}.dl-review-controls>p:empty{display:none}';document.head.append(style);
})();
