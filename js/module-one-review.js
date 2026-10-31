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
  const alternatives=[choice('schön',['schon','Schule'],'Schön begins with sch and contains ö.'),choice('auch',['auf','Auge'],'Auch contains the back ch sound after au.'),choice('Tür',['Tier','Tor'],'Tür contains ü, distinct from ie and o.')];
  alternatives.forEach(q=>q.answer=q.options.indexOf(q.dlReviewAudio));
  alternatives[0].unitId=umlaut;alternatives[2].unitId=umlaut;
  const pairA=Math.random()<.5?['schon','schön']:['schön','schön'];
  const pairB=Math.random()<.5?['mein','mein']:['mein','Wein'];
  const pairC=Math.random()<.5?['Tier','Tür']:['Tür','Tür'];
  const pairs=[make('compare','',pairA[0]===pairA[1]?'Both recordings say schön.':'Schon and schön have different vowel sounds.',{unitId:umlaut,clips:pairA}),make('compare','',pairB[0]===pairB[1]?'Both recordings say mein.':'The recordings say mein and Wein: the initial consonants differ.',{clips:pairB}),make('compare','',pairC[0]===pairC[1]?'Both recordings say Tür.':'Tier has ie; Tür has ü.',{unitId:umlaut,clips:pairC})];
  pairs.forEach(q=>{q.options=['Same word','Different words'];q.answer=q.clips[0]===q.clips[1]?0:1});
  const sets=[['Jahr','Wasser','Vater'],['Schule','sprechen','stehen'],['Straße','heißen','fünf']];
  const matches=sets.map((words,i)=>make('match',words.join(' · '),'Listen for the full word and connect its sound to its spelling.',{unitId:i===2?umlaut:id,words,clipOrder:shuffle(words),wordOrder:shuffle(words)}));
  matches.forEach(q=>q.options[0]=q.clipOrder.map((word,i)=>'Recording '+(i+1)+': '+word).join('; '));
  const buckets=[choices,typing,alternatives,pairs,matches].map(shuffle),questions=[];
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
   const group=(title,kind)=>{
    const area=document.createElement('div');area.className='dl-review-compare-group';
    area.setAttribute('role','group');area.setAttribute('aria-label',title);
    const label=document.createElement('p');label.className='dl-review-group-label';label.textContent=title;area.append(label);
    const row=document.createElement('div');row.className=kind;area.append(row);controls.append(area);return row;
   };
   const playback=group('Listen to both recordings','dl-review-playback');
   const choices=group('Choose your answer','dl-review-comparison-answers');
   q.clips.forEach((word,i)=>{const b=button('Play recording '+(i+1),()=>play(word,()=>{heard.add(i);answers.forEach(b=>b.disabled=heard.size!==2)}),playback);b.className='secondary dl-review-play-button'});
   q.options.forEach((label,i)=>{const b=button(label,()=>{if(heard.size!==2)return;selected=i;answers.forEach((answer,j)=>answer.setAttribute('aria-pressed',String(i===j)));status.textContent='Selected: '+label+'.';check.disabled=false},choices);b.className='dl-review-answer-button';b.setAttribute('aria-pressed','false');b.disabled=true;answers.push(b)});
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
  }
  window.dlRefreshFixedNext?.();
  return result;
 };
 const observer=new MutationObserver(()=>{if(!document.querySelector('#app .dl-review-controls'))dispose()});
 observer.observe(app,{childList:true,subtree:true});
 const style=document.createElement('style');style.textContent='.dl-review-controls{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}.dl-review-controls p,.dl-review-controls label{flex-basis:100%;margin:0}.dl-review-controls input{box-sizing:border-box;width:100%;padding:14px;border:1px solid #70c9c0;border-radius:12px;background:#20374e;color:#fff;font:inherit}.dl-review-controls button{white-space:normal;min-height:48px}.dl-review-character-keys{display:flex;gap:8px;width:100%}.dl-review-speaking-word{font-size:2.4rem;font-weight:700}.dl-review-controls [aria-pressed=true]{outline:2px solid #70c9c0}.dl-review-controls button:disabled{opacity:.5}.dl-review-match-columns{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;width:100%;align-items:start}.dl-review-match-column{display:grid;gap:12px;min-width:0}.dl-review-match-column button{width:100%;margin:0!important;min-height:72px;padding:12px 8px;overflow-wrap:anywhere;font:inherit}.dl-review-controls>p:empty{display:none}.dl-review-compare-group{width:100%}.dl-review-controls .dl-review-group-label{font-weight:600;font-size:.9rem;margin:0 0 10px;color:#b8d9dc}.dl-review-playback,.dl-review-comparison-answers{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.dl-review-compare-group button{width:100%;margin:0!important;padding:12px 8px}#app .dl-review-controls .dl-review-play-button{background:#34475e;color:#f4f8fb;border:1px solid #68879b;box-shadow:none}#app .dl-review-controls .dl-review-answer-button{background:#20374e;color:#fff;border:2px solid #6faaa9;box-shadow:none}#app .dl-review-controls .dl-review-answer-button[aria-pressed=true]{background:#79e1cf;color:#102a3b;border-color:#e4fff7;outline:2px solid #79e1cf;outline-offset:3px}#app .dl-review-controls .dl-review-answer-button[aria-pressed=true]::before{content:"✓ ";font-weight:800}';document.head.append(style);
})();
