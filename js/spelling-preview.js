/* Isolated, unsaved spelling activity preview. */
(function(){
 const questions=[
 {mode:'tiles',word:'Straße',meaning:'street'},
 {mode:'tiles',word:'heißen',meaning:'to be called'},
 {mode:'gap',word:'schön',meaning:'beautiful',before:'sch',after:'n',answer:'ö'},
 {mode:'gap',word:'Käse',meaning:'cheese',before:'K',after:'se',answer:'ä'},
 {mode:'type',word:'fünf',meaning:'five'},
 {mode:'recall',word:'heißen',meaning:'to be called'}
 ];
 let dialog,index=0,chosen=[],letters=[],checked=false;
 const norm=s=>s.normalize('NFC').trim().toLocaleLowerCase('de-DE');
 const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const el=(tag,text,parent)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n};
 const btn=(text,fn,parent)=>{const b=el('button',text,parent);b.type='button';b.onclick=fn;return b};
 function fitViewport(){if(!dialog?.open)return;const v=window.visualViewport;dialog.style.top=(v?.offsetTop||0)+'px';dialog.style.height=(v?.height||window.innerHeight)+'px'}
 function close(){window.visualViewport?.removeEventListener('resize',fitViewport);window.visualViewport?.removeEventListener('scroll',fitViewport);dialog.close();if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel()}
 function render(){
  const q=questions[index];checked=false;chosen=[];letters=shuffle(Array.from(q.word));
  dialog.replaceChildren();
  const top=el('div','',dialog);top.className='sp-top';el('strong','Spelling preview',top);btn('Close',close,top);
  const body=el('div','',dialog);body.className='sp-body';
  el('p',(index+1)+' of '+questions.length+' · '+({tiles:'Build the word',gap:'Missing letters',type:'Listen and spell',recall:'Recall the word'}[q.mode]),body);
  el('h2',q.mode==='recall'?'Write the German word for “'+q.meaning+'”.':q.mode==='tiles'?'Listen, then build the word.':q.mode==='gap'?'Listen and complete the word.':'Listen, then type the whole word.',body);
  const work=el('div','',body);let input,display,bank,check;
  if(q.mode!=='recall'){
   const audio=el('div','',work);audio.className='sp-audio';
   btn('Listen',()=>{speak(q.word)},audio);
   btn('Slow',()=>{speak(q.word,.7)},audio);
  }
  if(q.mode==='tiles'){
   display=el('p','',work);display.className='sp-word';display.setAttribute('aria-live','polite');
   bank=el('div','',work);bank.className='sp-tiles';
   letters.forEach((letter,i)=>{const b=btn(letter,()=>{chosen.push(i);update()},bank);b.setAttribute('aria-label','Letter '+letter)});
   const actions=el('div','',work);actions.className='sp-tools';
   btn('Undo',()=>{chosen.pop();update()},actions);btn('Start over',()=>{chosen=[];update()},actions);
  }else{
   const label=el('label',q.mode==='gap'?'':'Your answer',work);label.htmlFor='sp-answer';label.className=q.mode==='gap'?'sp-word sp-gap-word':'';
   if(q.mode==='gap')el('span',q.before,label);
   input=el('input','',q.mode==='gap'?label:work);
   if(q.mode==='gap'){input.className='sp-gap-input';input.placeholder='';input.size=Array.from(q.answer).length;el('span',q.after,label)}input.id='sp-answer';input.type='text';input.autocomplete='off';input.autocapitalize='none';input.spellcheck=false;input.setAttribute('autocorrect','off');input.setAttribute('aria-label',q.mode==='gap'?'Missing letters':'Your answer');
   input.oninput=()=>update();input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check.click()}};
   const keys=el('details','',work);el('summary','Special characters',keys);
   const row=el('div','',keys);row.className='sp-tiles';
   for(const ch of ['ä','ö','ü','ß'])btn(ch,()=>{input.setRangeText(ch,input.selectionStart,input.selectionEnd,'end');input.focus();update()},row);
  }
  const feedback=el('div','',body);feedback.className='sp-feedback unit-explain';feedback.setAttribute('role','status');feedback.hidden=true;
  const foot=el('div','',dialog);foot.className='sp-footer';
  btn('Back',()=>{if(window.confirm('Leave this preview and return to Lessons? Your current preview answers will be lost.')){close();lessonMenu()}},foot);
  check=btn('Check answer',()=>{
   if(checked){if(index<questions.length-1){index++;render()}else{index=0;render()}return}
   const answer=q.mode==='tiles'?chosen.map(i=>letters[i]).join(''):input.value;
   const ok=norm(answer)===norm(q.mode==='gap'?q.answer:q.word);
   checked=true;if(ok&&typeof feedbackSound==='function')feedbackSound(true);input?.blur();work.hidden=true;feedback.hidden=false;
   const badge=el('div','',feedback);badge.className='dl-result-badge '+(ok?'dl-result-good':'dl-result-bad');
   const image=el('img','',badge);image.src=ok?'correct_dog_transparent.png':'incorrect_dog_transparent.png';image.alt=ok?'Happy German Shepherd':'Thoughtful German Shepherd';
   el('strong',ok?'Well done!':'Not quite!',badge).className='dl-result-label';
   el('p',q.word+' — '+q.meaning,feedback);
   if(!ok)el('p','Compare your answer: '+(answer||'(empty)'),feedback);
   btn('Hear the word',()=>speak(q.word),feedback);
   check.textContent=index===questions.length-1?'Try again':'Next';
   feedback.scrollIntoView({block:'nearest'});
  },foot);
  function update(){
   if(checked)return;
   if(input&&q.mode==='gap')input.style.setProperty('width',Math.max(Array.from(q.answer).length,Array.from(input.value).length,1)*0.8+'em','important');
   if(display){display.textContent=chosen.map(i=>letters[i]).join('')||'_ '.repeat(letters.length).trim();Array.from(bank.children).forEach((b,i)=>b.disabled=chosen.includes(i))}
   check.disabled=(q.mode==='tiles'?chosen.length!==letters.length:!input.value.trim());
  }
  update();
 }
 window.dlOpenSpellingPreview=function(){
  if(!dialog?.isConnected){
   dialog=el('dialog','',document.getElementById('app'));dialog.id='dl-spelling-preview';dialog.setAttribute('aria-label','Spelling activities preview');
   dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
  }
  toggleMenu(false);index=0;render();dialog.showModal();fitViewport();window.visualViewport?.addEventListener('resize',fitViewport);window.visualViewport?.addEventListener('scroll',fitViewport);
 };
 const style=el('style','',document.head);style.textContent=`
 #dl-spelling-preview{box-sizing:border-box;position:fixed;inset:0;bottom:auto;width:100%;max-width:none;height:100dvh;max-height:none;margin:0;border:0;border-radius:0;padding:0;background:#20374e;color:#f4f8fb;font:inherit}
 #dl-spelling-preview[open]{display:flex;flex-direction:column}
 #dl-spelling-preview::backdrop{background:rgba(7,18,29,.8)}
 #dl-spelling-preview .sp-top,#dl-spelling-preview .sp-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#1b3042;flex-shrink:0}
 #dl-spelling-preview .sp-top strong{font-size:1.2rem}
 #dl-spelling-preview .sp-body{overflow:auto;flex:1;min-height:0;padding:16px 20px 24px;overscroll-behavior:contain}
 #dl-spelling-preview h2{font-size:1.3rem;margin:10px 0 18px}
 #dl-spelling-preview button{font:inherit;min-height:46px;margin:0;padding:10px 16px;border-radius:12px;cursor:pointer}
 #dl-spelling-preview .sp-footer{padding-bottom:max(12px,env(safe-area-inset-bottom));border-top:1px solid #476a78}.sp-footer button{flex:1}
 #dl-spelling-preview .sp-audio{display:flex;gap:10px;background:#214e4b;border:1px solid #6b9993;padding:12px;border-radius:16px;margin-bottom:18px}
 #dl-spelling-preview .sp-tiles,#dl-spelling-preview .sp-tools{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
 #dl-spelling-preview .sp-tiles button{min-width:44px;background:#34596a;color:#fff;border:1px solid #8cbab7}
 #dl-spelling-preview button:disabled{opacity:.4;cursor:default}
 #dl-spelling-preview .sp-word{display:block;font-size:1.8rem;font-weight:bold;letter-spacing:.08em;margin:12px 0;overflow-wrap:anywhere}
 #dl-spelling-preview input{box-sizing:border-box;width:100%;font:inherit;padding:14px;background:#152c40;color:white;border:1px solid #8cbab7;border-radius:12px;margin:10px 0}
 #dl-spelling-preview .sp-gap-word{display:flex;align-items:baseline;gap:0;letter-spacing:0}
 #dl-spelling-preview input.sp-gap-input{display:inline-block;flex:0 0 auto!important;width:.8em!important;min-width:.8em!important;max-width:none!important;font:inherit;font-size:inherit;font-weight:inherit;text-align:center;line-height:1.25;padding:0!important;margin:0!important;background:transparent;border:0;border-bottom:2px solid #8cbab7;border-radius:0;color:inherit}
 #dl-spelling-preview input.sp-gap-input:focus{outline:none!important;box-shadow:none!important;border-radius:0!important;border-bottom-color:#79e1cf;caret-color:#79e1cf}
 #dl-spelling-preview details{margin:12px 0}
 #dl-spelling-preview .sp-feedback{margin:48px 0 12px;padding:12px}
 #dl-spelling-preview .sp-feedback>p{margin:12px 0}
 #dl-spelling-preview [hidden]{display:none!important}
 `;
 // Later legacy startup code replaces the static navigation markup.
 // Register in the live menu and restore the entry after any menu rebuild.
 function ensurePreviewEntry(){
  const nav=document.getElementById('sideMenu');
  if(!nav||nav.querySelector('[data-spelling-preview-entry]'))return;
  let entry=nav.querySelector('[onclick="dlOpenSpellingPreview()"]');
  if(!entry)entry=btn('✎ Spelling preview',window.dlOpenSpellingPreview);
  entry.setAttribute('data-spelling-preview-entry','');
  const practice=Array.from(nav.querySelectorAll('button')).find(b=>/Practice Hub/.test(b.textContent));
  if(practice)practice.after(entry);else nav.append(entry);
 }
 function watchPreviewMenu(){
  ensurePreviewEntry();
  const nav=document.getElementById('sideMenu');
  if(nav)new MutationObserver(ensurePreviewEntry).observe(nav,{childList:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watchPreviewMenu);
 else watchPreviewMenu();

})();
