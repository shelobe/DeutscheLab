
(function(){
 const app=document.getElementById('app');if(!app)return;
 const dock=document.createElement('div');dock.id='dl-unified-dock';
 const back=document.createElement('button');back.type='button';back.className='secondary';back.textContent='Back';
 const next=document.createElement('button');next.type='button';next.className='dl-dock-next';next.textContent='Next';
 dock.append(back,next);document.body.appendChild(dock);
 let backTarget=null,nextTarget=null,backAction=null,lastFeedback='',lastChime=0,ctx=null;
 const nextRx=/^(next(?:\s+(?:question|word|item|sentence|exercise|round|picture|sound))?|continue|finish|finish (?:lesson|practice|review)|see results|show results)$/i;
 const backRx=/^(back|previous|previous question|go back)$/i;
 const feedbackSelector='#practiceFeedback,#fullFeedback,#moduleFeedback,#courseFeedback,#gameFeedback,#pictureFeedback,#dialogue-feedback,#reviewFeedback,#articleFeedback,#a12Feedback,#dl-result,.dl-flow-feedback,.game-feedback,.picture-answer';
 function chime(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ctx=ctx||new C();if(ctx.state==='suspended')ctx.resume();const t=ctx.currentTime;[[660,0],[880,.115]].forEach(([hz,delay])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(.0001,t+delay);g.gain.exponentialRampToValueAtTime(.14,t+delay+.018);g.gain.exponentialRampToValueAtTime(.0001,t+delay+.19);o.connect(g);g.connect(ctx.destination);o.start(t+delay);o.stop(t+delay+.2)})}catch(e){}}
 function sync(){
  const feedback=[...app.querySelectorAll(feedbackSelector)].filter(e=>e.getClientRects().length&&/correct!|well done|great job|not quite|incorrect|correct answer|try again/i.test(e.textContent||''));
  const latest=feedback[feedback.length-1];
  const positive=latest&&!!latest.querySelector('.correct')||latest&&/^(?:correct!|well done|great job)/i.test((latest.textContent||'').trim());
  const key=latest?((latest.textContent||'').trim().slice(0,180)+'|'+(app.querySelector('h2,h3')?.textContent||'')):'';
  if(positive&&key&&key!==lastFeedback&&Date.now()-lastChime>450){lastChime=Date.now();chime()}
  lastFeedback=key;
  app.querySelectorAll('.dl-unified-source').forEach(b=>b.classList.remove('dl-unified-source'));
  const buttons=[...app.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.closest('nav,#sideMenu,[hidden]'));
  const find=(rx)=>buttons.find(b=>rx.test((b.textContent||'').trim()));
  nextTarget=latest?buttons.find(b=>nextRx.test((b.textContent||'').trim())&& (latest.contains(b)||b.closest('.card')===latest.closest('.card')))||find(nextRx):null;
  backTarget=nextTarget?find(backRx):null;
  const finish=latest?buttons.find(b=>/^finish$/i.test((b.textContent||'').trim())):null;
  backAction=null;
  const show=!!nextTarget&&!document.getElementById('dl-exit-overlay');
  if(show){next.textContent=(nextTarget.textContent||'Next').trim();nextTarget.classList.add('dl-unified-source');if(backTarget)backTarget.classList.add('dl-unified-source');}
  back.style.display=backTarget?'block':'none';dock.style.display=show?'flex':'none';document.body.classList.toggle('dl-unified-active',show);
 }
 back.onclick=()=>{if(backTarget?.isConnected)backTarget.click();else backAction?.()};
 next.onclick=()=>{if(nextTarget?.isConnected)nextTarget.click()};
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})}).observe(app,{childList:true,subtree:true,characterData:true});
 sync();
})();
