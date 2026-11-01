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
 let dialog,index=0,chosen=[],letters=[],checked=false,heard=false;
 const norm=s=>s.normalize('NFC').trim().toLocaleLowerCase('de-DE');
 const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const el=(tag,text,parent)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(parent)parent.append(n);return n};
 const btn=(text,fn,parent)=>{const b=el('button',text,parent);b.type='button';b.onclick=fn;return b};
 function close(){dialog.close();if(typeof speechSynthesis!=='undefined')speechSynthesis.cancel()}
 function render(){
  const q=questions[index];checked=false;heard=q.mode==='recall';chosen=[];letters=shuffle(Array.from(q.word));
  dialog.replaceChildren();
  const top=el('div','',dialog);top.className='sp-top';el('strong','Spelling preview',top);btn('Close',close,top);
  const body=el('div','',dialog);body.className='sp-body';
  el('p',(index+1)+' of '+questions.length+' · '+({tiles:'Build the word',gap:'Missing letters',type:'Listen and spell',recall:'Recall the word'}[q.mode]),body);
  el('h2',q.mode==='recall'?'Write the German word for “'+q.meaning+'”.':q.mode==='tiles'?'Listen, then build the word.':q.mode==='gap'?'Listen and complete the word.':'Listen, then type the whole word.',body);
  const work=el('div','',body);let input,display,bank,check;
  if(q.mode!=='recall'){
   const audio=el('div','',work);audio.className='sp-audio';
   btn('Listen',()=>{speak(q.word);heard=true;update()},audio);
   btn('Slow',()=>{speak(q.word,.7);heard=true;update()},audio);
  }
  if(q.mode==='tiles'){
   display=el('p','',work);display.className='sp-word';display.setAttribute('aria-live','polite');
   bank=el('div','',work);bank.className='sp-tiles';
   letters.forEach((letter,i)=>{const b=btn(letter,()=>{chosen.push(i);update()},bank);b.setAttribute('aria-label','Letter '+letter)});
   const actions=el('div','',work);actions.className='sp-tools';
   btn('Undo',()=>{chosen.pop();update()},actions);btn('Start over',()=>{chosen=[];update()},actions);
  }else{
   const label=el('label',q.mode==='gap'?q.before+' __ '+q.after:'Your answer',work);label.htmlFor='sp-answer';label.className=q.mode==='gap'?'sp-word':'';
   input=el('input','',work);input.id='sp-answer';input.type='text';input.autocomplete='off';input.autocapitalize='none';input.spellcheck=false;input.setAttribute('autocorrect','off');input.setAttribute('aria-label',q.mode==='gap'?'Missing letters':'Your answer');
   input.oninput=()=>update();input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check.click()}};
   const keys=el('details','',work);el('summary','Special characters',keys);
   const row=el('div','',keys);row.className='sp-tiles';
   for(const ch of ['ä','ö','ü','ß'])btn(ch,()=>{input.setRangeText(ch,input.selectionStart,input.selectionEnd,'end');input.focus();update()},row);
  }
  const feedback=el('div','',body);feedback.className='sp-feedback';feedback.setAttribute('role','status');feedback.hidden=true;
  const foot=el('div','',dialog);foot.className='sp-footer';
  btn('Back',()=>{if(index){index--;render()}else close()},foot);
  check=btn('Check answer',()=>{
   if(checked){if(index<questions.length-1){index++;render()}else{index=0;render()}return}
   const answer=q.mode==='tiles'?chosen.map(i=>letters[i]).join(''):input.value;
   const ok=norm(answer)===norm(q.mode==='gap'?q.answer:q.word);
   checked=true;work.hidden=true;feedback.hidden=false;
   const image=el('img','',feedback);image.src=ok?'correct_dog_transparent.png':'incorrect_dog_transparent.png';image.alt=ok?'Happy German Shepherd':'Thoughtful German Shepherd';
   el('strong',ok?'Well done!':'Not quite!',feedback);
   el('p',q.word+' — '+q.meaning,feedback);
   if(!ok)el('p','Compare your answer: '+(answer||'(empty)'),feedback);
   btn('Hear the word',()=>speak(q.word),feedback);
   check.textContent=index===questions.length-1?'Try again':'Next';
   feedback.scrollIntoView({block:'nearest'});
  },foot);
  function update(){
   if(checked)return;
   if(display){display.textContent=chosen.map(i=>letters[i]).join('')||'_ '.repeat(letters.length).trim();Array.from(bank.children).forEach((b,i)=>b.disabled=chosen.includes(i))}
   check.disabled=!heard||(q.mode==='tiles'?chosen.length!==letters.length:!input.value.trim());
  }
  update();
 }
 window.dlOpenSpellingPreview=function(){
  if(!dialog){
   dialog=el('dialog','',document.body);dialog.id='dl-spelling-preview';dialog.setAttribute('aria-label','Spelling activities preview');
   dialog.addEventListener('cancel',e=>{e.preventDefault();close()});
  }
  toggleMenu(false);index=0;render();dialog.showModal();
 };
 const style=el('style','',document.head);style.textContent=`
 #dl-spelling-preview{box-sizing:border-box;width:min(94vw,560px);height:min(85dvh,760px);max-height:90dvh;margin:auto;border:1px solid #68879b;border-radius:22px;padding:0;background:#20374e;color:#f4f8fb;font:inherit}
 #dl-spelling-preview[open]{display:flex;flex-direction:column}
 #dl-spelling-preview::backdrop{background:rgba(7,18,29,.8)}
 #dl-spelling-preview .sp-top,#dl-spelling-preview .sp-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#1b3042;flex-shrink:0}
 #dl-spelling-preview .sp-top strong{font-size:1.2rem}
 #dl-spelling-preview .sp-body{overflow:auto;flex:1;padding:16px 20px}
 #dl-spelling-preview h2{font-size:1.3rem;margin:10px 0 18px}
 #dl-spelling-preview button{font:inherit;min-height:46px;margin:0;padding:10px 16px;border-radius:12px;cursor:pointer}
 #dl-spelling-preview .sp-footer button{flex:1}
 #dl-spelling-preview .sp-audio{display:flex;gap:10px;background:#214e4b;border:1px solid #6b9993;padding:12px;border-radius:16px;margin-bottom:18px}
 #dl-spelling-preview .sp-tiles,#dl-spelling-preview .sp-tools{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
 #dl-spelling-preview .sp-tiles button{min-width:44px;background:#34596a;color:#fff;border:1px solid #8cbab7}
 #dl-spelling-preview button:disabled{opacity:.4;cursor:default}
 #dl-spelling-preview .sp-word{display:block;font-size:1.8rem;font-weight:bold;letter-spacing:.08em;margin:12px 0;overflow-wrap:anywhere}
 #dl-spelling-preview input{box-sizing:border-box;width:100%;font:inherit;padding:14px;background:#152c40;color:white;border:1px solid #8cbab7;border-radius:12px;margin:10px 0}
 #dl-spelling-preview details{margin:12px 0}
 #dl-spelling-preview .sp-feedback{position:relative;margin-top:45px;padding:24px 16px 16px;border:1px solid #6b9993;border-radius:18px;background:#214e4b}
 #dl-spelling-preview .sp-feedback img{float:right;width:95px;height:105px;object-fit:contain;margin-top:-60px}
 #dl-spelling-preview .sp-feedback strong{font-size:1.3rem}
 #dl-spelling-preview [hidden]{display:none!important}
 `;
})();
