/* Shared spelling controls; native lesson/review handlers own scoring and feedback. */
(function(){
 const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const normalize=s=>String(s).normalize('NFC').trim().toLocaleLowerCase('de-DE');
 window.dlMountSpelling=function({host,question:q,mode,check,alive,onSubmit,refresh=()=>{}}){
  const add=(tag,text,parent=host)=>{const e=document.createElement(tag);e.textContent=text;parent.append(e);return e};
  const button=(text,fn,parent=host)=>{const b=add('button',text,parent);b.type='button';b.onclick=()=>{if(alive())fn()};return b};
  host.classList.add('dl-spelling-activity');
  const word=q.spellingWord||q.options[q.answer];let chosen=[],input,bank,display;
  const targetLength=Array.from(word).length;
  const letters=shuffle([...Array.from(word),...(q.spellingDistractors||[])]);
  const audio=add('div','');audio.className='dl-spelling-audio';
  button('Listen',()=>speak(word),audio);button('Slow',()=>speak(word,.7),audio);
  const value=()=>mode==='tiles'?chosen.map(i=>letters[i]).join(''):input.value;
  function update(){
   if(!alive())return;
   if(mode==='tiles'){
    display.textContent=chosen.map(i=>letters[i]).join('')||'_ '.repeat(targetLength).trim();
    Array.from(bank.children).forEach((b,i)=>b.disabled=chosen.includes(i)||chosen.length>=targetLength);
    check.disabled=chosen.length!==targetLength;
   }else{
    input.style.width=Math.max(1,Array.from(input.value).length,Array.from(q.spellingAnswer).length)*.8+'em';
    check.disabled=!input.value.trim();
   }
   refresh();
  }
  if(mode==='tiles'){
   display=add('p','');display.className='dl-spelling-word';display.setAttribute('aria-live','polite');
   bank=add('div','');bank.className='dl-spelling-tiles dl-spelling-letter-bank';
   letters.forEach((ch,i)=>{button(ch,()=>{if(chosen.length<targetLength){chosen.push(i);update()}},bank).setAttribute('aria-label','Letter '+ch)});
   const tools=add('div','');tools.className='dl-spelling-tiles';
   button('Undo',()=>{chosen.pop();update()},tools);button('Start over',()=>{chosen=[];update()},tools);
  }else{
   const label=add('label','');label.className='dl-spelling-word dl-spelling-gap';label.htmlFor='dl-spelling-gap-answer';
   add('span',q.spellingBefore,label);input=add('input','',label);add('span',q.spellingAfter,label);
   input.id='dl-spelling-gap-answer';input.type='text';input.autocomplete='off';input.autocapitalize='none';input.spellcheck=false;
   input.setAttribute('autocorrect','off');input.setAttribute('aria-label','Missing letter in '+q.spellingBefore+' blank '+q.spellingAfter);
   input.oninput=update;input.onkeydown=e=>{if(e.key==='Enter'&&!check.disabled){e.preventDefault();check.click()}};
   const keys=add('details','');add('summary','Special characters',keys);const row=add('div','',keys);row.className='dl-spelling-tiles';
   for(const ch of ['ä','ö','ü','ß'])button(ch,()=>{input.setRangeText(ch,input.selectionStart,input.selectionEnd,'end');input.focus();update()},row);
  }
  check.onclick=()=>{if(!alive()||check.disabled)return;input?.blur();onSubmit(normalize(value())===normalize(mode==='gap'?q.spellingAnswer:word))};
  update();
 };
 const style=document.createElement('style');style.textContent=`
 #app .dl-spelling-activity{display:grid;gap:12px;width:100%}
 #app .dl-spelling-audio,#app .dl-spelling-tiles{display:flex;flex-wrap:wrap;gap:8px}
 #app .dl-spelling-letter-bank{box-sizing:border-box;width:100%;padding:10px;border:1px solid #759e9b;border-radius:14px;background:rgba(112,201,192,.06)}
 #app .dl-spelling-activity button{margin:0;min-width:44px;min-height:44px}
 #app .dl-spelling-word{font:700 1.8rem/1.3 Arial,sans-serif;margin:12px 0;overflow-wrap:anywhere}
 #app .dl-spelling-gap{display:flex;align-items:baseline;gap:0}
 #app .dl-spelling-gap input{box-sizing:border-box;flex:0 0 auto;width:.8em;min-width:.8em;max-width:none;font:inherit;text-align:center;line-height:1.3;margin:0!important;padding:0!important;background:transparent;border:0;border-bottom:2px solid #8cbab7;border-radius:0;color:inherit}
 #app .dl-spelling-gap input:focus{outline:none!important;box-shadow:none!important;border-radius:0!important;border-bottom-color:#79e1cf;caret-color:#79e1cf}
 `;document.head.append(style);
})();
