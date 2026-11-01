/* Listening comparison and matching within the native umlaut lesson. */
(function(){
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const previous=fullRender;
 fullRender=function(){
  const result=previous.apply(this,arguments),s=fullSession,q=s?.questions?.[s.idx];
  if(!q?.dlLessonMode||dlAnswered)return result;
  const card=app.querySelector('.dl-flow-card'),options=card?.querySelector('.dl-flow-options'),check=document.getElementById('dl-check');if(!card||!options||!check)return result;
  const index=s.idx,alive=()=>fullSession===s&&s.idx===index&&!dlAnswered;
  const controls=document.createElement('div');controls.className='dl-practical-input dl-review-controls';options.replaceWith(controls);
  card.querySelector('.dl-flow-label').textContent=q.dlLessonMode==='match'?'MATCH RECORDINGS TO WORDS':'COMPARE THE RECORDINGS';
  dlSelected=null;check.disabled=true;
  const button=(label,action,parent=controls)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{if(alive())action()};parent.append(b);return b};
  const note=document.createElement('p');note.setAttribute('aria-live','polite');controls.append(note);
  let correct=()=>false;
  const ready=()=>{window.dlRefreshFixedNext?.()};
  if(q.dlLessonMode==='compare'){
   const heard=new Set(),answers=[];let selected=null;
   const audio=document.createElement('div');audio.className='dl-review-playback';controls.append(audio);
   q.clips.forEach((word,i)=>{button('Listen '+String.fromCharCode(65+i),()=>{speak(word);heard.add(i);answers.forEach(b=>b.disabled=heard.size<2)},audio).className='secondary dl-review-play-button'});
   const choices=document.createElement('div');choices.className='dl-review-comparison-answers';controls.append(choices);
   q.options.forEach((label,i)=>{const b=button(label,()=>{if(heard.size<2)return;selected=i;answers.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));check.disabled=false;ready()},choices);b.className='dl-review-answer-button';b.disabled=true;answers.push(b)});
   correct=()=>selected===q.answer;
  }else{
   const clips=shuffle(q.words),words=shuffle(q.words),picks=new Map();let selected=null;
   const columns=document.createElement('div');columns.className='dl-review-match-columns';controls.append(columns);
   const audio=document.createElement('div'),bank=document.createElement('div');audio.className=bank.className='dl-review-match-column';columns.append(audio,bank);
   const audioButtons=[],wordButtons=[];
   function update(){
    audioButtons.forEach((b,i)=>{b.textContent='Listen '+String.fromCharCode(65+i)+(picks.has(i)?' → '+picks.get(i):'');b.setAttribute('aria-pressed',String(selected===i))});
    wordButtons.forEach(b=>b.setAttribute('aria-pressed',String([...picks.values()].includes(b.textContent))));
    check.disabled=picks.size!==q.words.length;ready();
   }
   clips.forEach((word,i)=>{const b=button('Listen '+String.fromCharCode(65+i),()=>{speak(word);selected=i;note.textContent='Choose the word for recording '+String.fromCharCode(65+i)+'.';update()},audio);b.className='secondary dl-review-play-button';audioButtons.push(b)});
   words.forEach(word=>{const b=button(word,()=>{if(selected===null)return;for(const [i,w]of picks)if(w===word)picks.delete(i);picks.set(selected,word);selected=null;note.textContent='Match saved. Listen to another recording or check your matches.';update()},bank);b.className='dl-review-answer-button';wordButtons.push(b)});
   correct=()=>{q.why=clips.map((word,i)=>'Recording '+String.fromCharCode(65+i)+': '+word).join('. ')+'.';return clips.every((word,i)=>picks.get(i)===word)};
   note.textContent='Listen to a recording, then choose its word. Use each word once.';
  }
  check.onclick=()=>{if(!alive()||check.disabled)return;dlSelected=correct()?q.answer:(q.answer===0?1:0);dlCheck()};
  ready();return result;
 };
})();
