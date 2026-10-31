
/* Unified Build a Sentence entry and corrected listening completion navigation. */
(function(){

 const sharedStyle=document.createElement('style');
 sharedStyle.textContent=`
 #dl-sentence-next-dock:has(#dl-sentence-next-button){display:flex!important;align-items:stretch!important;gap:14px!important;justify-content:center!important;padding:12px 20px calc(12px + env(safe-area-inset-bottom,0px))!important}
 #dl-sentence-next-dock #dl-sentence-next-button{display:block!important;flex:2!important;min-width:0!important;background:#65c9bd!important;color:#102d35!important;border:0!important;border-radius:14px!important;font-weight:700!important;min-height:56px!important}
 #dl-sentence-next-dock button.secondary{flex:1!important;min-width:0!important;min-height:56px!important;margin:0!important}
 .dl-sentence-english-style{background:#172c3b!important;color:#edf4f5!important;border-radius:24px!important;padding:24px 20px!important}
 .dl-sentence-english-style .game-progress{margin:14px 0 18px!important}
 .dl-sentence-english-style .dl-sentence-instruction{color:#eaf1f3!important;font-size:1rem!important;margin:10px 0 12px!important}
 .dl-sentence-english-style .dl-sentence-prompt{background:#203f4b!important;color:#fff!important;border:2px solid #70c9c0!important;border-radius:18px!important;padding:16px!important;margin:0 0 14px!important;box-sizing:border-box!important}
 .dl-sentence-english-style .dl-sentence-prompt strong{color:#fff!important;font-size:1.25rem!important;line-height:1.35!important}
 .dl-sentence-english-style #sentenceBuilt{background:#152e3b!important;color:#edf5f5!important;border:2px dashed #8bc8c4!important;border-radius:18px!important;min-height:80px!important;padding:15px 16px!important;font-size:1.05rem!important;margin:0 0 14px!important;box-sizing:border-box!important}
 .dl-sentence-english-style #sentenceTiles{background:#17353e!important;border:1px solid #547f83!important;border-radius:18px!important;padding:14px 12px!important;display:flex!important;flex-wrap:wrap!important;gap:10px!important;margin:0 0 14px!important}
 .dl-sentence-english-style #sentenceTiles button{background:#395771!important;color:#fff!important;border:1px solid #65849b!important;border-radius:15px!important;box-shadow:none!important;min-height:54px!important;padding:12px 14px!important;font-size:1rem!important}
 .dl-sentence-english-style .dl-sentence-edit-actions{display:flex!important;gap:12px!important;flex-wrap:wrap!important}
 .dl-sentence-english-style .dl-sentence-edit-actions button{flex:1!important;min-width:125px!important;background:#344a65!important;color:#fff!important;border-radius:15px!important;padding:12px 8px!important;font-size:.95rem!important}
 .dl-sentence-english-style #sentenceFeedback:empty{display:none!important}
 .dl-sentence-english-style .dl-sentence-completed{display:none!important}
 .dl-sentence-english-style #sentenceFeedback.dl-sentence-feedback-visible{display:block!important;background:#173b3b!important;border:2px solid #70c9c0!important;border-radius:20px!important;padding:18px!important;margin:14px 0!important;color:#e9f6f3!important}
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-result{font-size:1rem!important;line-height:1.45!important;padding:0!important;background:transparent!important;border:0!important}
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-result p{margin:8px 0!important}
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-hint{font-size:.95rem!important;line-height:1.4!important;font-weight:400!important}
 .dl-sentence-english-style.dl-sentence-answered #sentenceFeedback .explain-box,
 .dl-sentence-english-style.dl-sentence-answered #sentenceFeedback .sentence-explanation{display:none!important}
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-result strong{display:block!important;font-size:1.35rem!important;color:#91e0ad!important;margin-bottom:8px!important}
 /* Both sentence modes now use the existing .dl-result-badge component.
    Leave its original colors, character overlap and dimensions untouched. */
 .dl-build-shared-layout #gameFeedback.dl-sentence-feedback-visible,
 .dl-sentence-english-style #sentenceFeedback.dl-sentence-feedback-visible{display:block!important;background:transparent!important;border:0!important;padding:0!important;margin:14px 0!important}
 .dl-build-shared-layout #gameFeedback .dl-sentence-result,
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-result{background:transparent!important;border:0!important;padding:0!important;margin:0!important}
 .dl-build-shared-layout #gameFeedback .dl-sentence-result p,
 .dl-sentence-english-style #sentenceFeedback .dl-sentence-result p{font-size:.98rem!important;line-height:1.4!important;margin:10px 0 0!important;color:#fff!important;font-weight:400!important}
 .dl-build-shared-layout.dl-german-english-layout{background:#172c3b!important;color:#edf4f5!important;border-radius:24px!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-build-instruction{font-size:1.08rem!important;color:#e0e9eb!important;margin:16px 0 12px!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-build-prompt{display:block!important;background:#203f4b!important;color:#fff!important;border:3px solid #70c9c0!important;border-radius:22px!important;padding:25px 22px!important;font-size:1.45rem!important;line-height:1.4!important;margin:12px 0 20px!important}
 .dl-build-shared-layout.dl-german-english-layout #gameBuilt{display:block!important;background:#152e3b!important;color:#edf5f5!important;border:3px dashed #8bc8c4!important;border-radius:22px!important;min-height:104px!important;padding:20px 22px!important;font-size:1.2rem!important;box-sizing:border-box!important;margin:0 0 20px!important}
 .dl-build-shared-layout.dl-german-english-layout #gameBank{background:#17353e!important;border:1px solid #547f83!important;border-radius:22px!important;padding:22px 16px!important;display:flex!important;flex-wrap:wrap!important;gap:12px!important;margin:0 0 20px!important}
 .dl-build-shared-layout.dl-german-english-layout #gameBank button{background:#395771!important;color:#fff!important;border:1px solid #65849b!important;border-radius:18px!important;box-shadow:none!important;min-height:62px!important;padding:14px 18px!important;font-size:1rem!important}
 .dl-build-shared-layout.dl-german-english-layout #gameBank button:disabled{opacity:.38!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-shared-bank-title{display:none!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-build-edit-controls{display:flex!important;gap:12px!important;flex-wrap:wrap!important;margin:14px 0!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-build-edit-controls button{flex:1!important;min-width:125px!important;background:#344a65!important;color:#fff!important;border-radius:15px!important;padding:15px 10px!important}
 .dl-build-shared-layout.dl-german-english-layout .dl-build-help{background:#344a65!important;color:#fff!important;border-radius:15px!important;margin-top:10px!important}
 `;
 document.head.appendChild(sharedStyle);
 const previousPracticeHub=practiceHub;
 function unifyBuildCards(){
  const buttons=[...app.querySelectorAll('button')];
  const build=buttons.find(b=>/Build sentences?|Build a Sentence/i.test(b.textContent));
  const english=buttons.find(b=>/Build in English/i.test(b.textContent));
  if(build){build.setAttribute('onclick','dlBuildModeMenu()');if(build.closest('.dl-home-practice')){build.innerHTML='<span class="dl-practice-icon">✏️</span><span>Build sentences</span>';build.classList.remove('dl-build-unified-tile');}else{build.innerHTML='<span class="tile-icon" aria-hidden="true">✏️</span><span class="tile-title">Build a Sentence</span><small>Choose German or English</small>';build.classList.add('dl-build-unified-tile');}}
  if(english&&english!==build)english.remove();
 }

 practiceHub=function(){
  previousPracticeHub();
  unifyBuildCards();
 };
 const previousHome=typeof home==='function'?home:null;
 if(previousHome)home=function(...args){const result=previousHome.apply(this,args);unifyBuildCards();return result;};
 window.dlBuildModeMenu=function(){
  app.innerHTML=illustratedHero('Build a Sentence','Choose the language you want to build.','village','hund.png')+
   '<section class="card"><h2>Choose your mode</h2><div class="game-grid"><button onclick="dlBuildModeStart(\'de\')">🇩🇪 Build in German<br><small>Arrange German words</small></button><button onclick="dlBuildModeStart(\'en\')">🇺🇸 Build in English<br><small>Arrange English words</small></button></div><button class="secondary" onclick="practiceHub()">Back to Practice Hub</button></section>';
  window.scrollTo(0,0);
 };
 window.dlBuildModeStart=function(mode){gameStart(mode==='de'?'build':'reverse');};
 const oldGameHub=gameHub;
 gameHub=function(){return practiceHub();};
 const oldGameRender=gameRender;
 gameRender=function(){
  oldGameRender();
  if(!gameSession||!['build','reverse'].includes(gameSession.mode)||gameSession.idx>=gameSession.seq.length)return;
  let card=app.querySelector('.card');if(!card)return;
  const isGerman=gameSession.mode==='build';
  const heading=[...card.querySelectorAll('h3')][0];
  if(heading){heading.classList.add('dl-build-prompt');}
  const instruction=heading?.previousElementSibling;
  if(instruction&&instruction.tagName==='P')instruction.classList.add('dl-build-instruction');
  const existing=card.querySelector('.dl-unified-build-dock');if(existing)existing.remove();
  card.classList.add('dl-build-shared-layout');
  if(isGerman){
   /* Rebuild German using the English game's native card/word-bank structure.
      Preserve original German word buttons, click handlers, and answer checking. */
   const oldBuilt=card.querySelector('#gameBuilt');
   const oldBank=card.querySelector('#gameBank');
   const oldCheck=card.querySelector('button[onclick="gameCheckBuild()"]');
   const prompt=card.querySelector('h3');
   if(!oldBuilt||!oldBank||!oldCheck||!prompt)throw Error('German sentence game structure changed');
   const g=gameSession,item=g.pool[g.seq[g.idx]];
   const rebuilt=document.createElement('section');
   rebuilt.className='card';
   rebuilt.innerHTML=`<p class="muted">Translate into German · ${g.idx+1} of ${g.seq.length}</p><div class="game-progress"><div style="width:${g.idx/g.seq.length*100}%"></div></div><p>Build the German translation:</p><h3 class="dl-build-prompt">${safeText(item.en)}</h3><div id="dl-german-answer-slot"></div><div class="dl-bank-label">WORD BANK</div><div id="dl-german-bank-slot"></div><div class="dl-reverse-controls"><button class="secondary" onclick="dlUnifiedUndo()">↶ Undo last word</button><button class="secondary" onclick="dlUnifiedReset()">↺ Start over</button></div><div id="dl-german-check-slot"></div><div id="gameFeedback" aria-live="polite"></div>`;
   oldBuilt.className='game-built dl-shared-built';
   oldBuilt.textContent='Tap the German words below';
   oldBank.className='game-wordbank dl-shared-bank';
   rebuilt.querySelector('#dl-german-answer-slot').replaceWith(oldBuilt);
   rebuilt.querySelector('#dl-german-bank-slot').replaceWith(oldBank);
   oldCheck.textContent='Check translation';
   oldCheck.classList.add('dl-build-check-original');
   rebuilt.querySelector('#dl-german-check-slot').replaceWith(oldCheck);
   card.replaceWith(rebuilt);
   card=rebuilt;
   card.classList.add('dl-build-shared-layout');
  }
  /* Both modes use the same prompt/answer/bank/control/feedback structure.
     Preserve the mode-specific word selection and answer checking handlers. */
  const answer=card.querySelector('#gameBuilt,#reverseBuilt,.reverse-built,.dl-reverse-built,.game-built');
  const bank=card.querySelector('#gameBank,.reverse-wordbank,.dl-reverse-wordbank');
  if(answer)answer.classList.add('dl-shared-built');
  if(bank)bank.classList.add('dl-shared-bank');
  if(heading&&answer&&heading.nextElementSibling!==answer)heading.after(answer);
  if(answer&&bank&&answer.nextElementSibling!==bank){
   const label=bank.previousElementSibling?.classList.contains('dl-shared-bank-title')?bank.previousElementSibling:null;
   answer.after(label||bank);
   if(label)label.after(bank);
  }
  if(isGerman){
   const label=card.querySelector('.dl-shared-bank-title');
   if(label&&bank)bank.before(label);
   const help=card.querySelector('button[onclick="dlSentenceHelpToggle()"]');
   if(help)help.classList.add('dl-build-help');
  }else{
   /* Remove the redundant label that appears below the English word tiles. */
   card.querySelectorAll('.dl-shared-bank-title').forEach(label=>label.remove());
  }
  const check=card.querySelector(isGerman?'button[onclick="gameCheckBuild()"]':'button[onclick="gameCheckReverse()"],button[onclick="reverseCheck()"]');
  const dock=document.createElement('div');dock.className='dl-unified-build-dock';
  dock.innerHTML='<button type="button" class="secondary" onclick="dlBuildModeMenu()">Back</button><button type="button" class="dl-build-dock-check" onclick="dlUnifiedCheck()">Check</button>';
  if(check)check.classList.add('dl-build-check-original');
  for(const button of card.querySelectorAll('button'))if(/^Check (translation|sentence)$/i.test(button.textContent.trim()))button.classList.add('dl-build-check-original');
  card.after(dock);
 };
 window.dlUnifiedCheck=function(){
  const g=gameSession;if(!g||g.answered)return;
  const card=app.querySelector('.card');if(!card)return;
  if(g.mode==='reverse'){
   const item=(g.pool&&g.pool[g.seq[g.idx]])||GAME_ITEMS[g.seq[g.idx]];
   const answer=card.querySelector('#reverseBuilt,.reverse-built,.dl-reverse-built,.game-built');
   const chosen=answer?.textContent?.trim()||'';
   if(!item||!chosen||/^(tap|select)\b/i.test(chosen))return;
   const normalize=value=>String(value||'').toLocaleLowerCase('en').replace(/[.!?,;:]/g,'').replace(/\s+/g,' ').trim();
   gameMark(normalize(chosen)===normalize(item.en),item.en);
   return;
  }
  const original=[...card.querySelectorAll('button')].find(b=>/^(Check translation|Check sentence)$/i.test(b.textContent.trim()));
  if(original){original.click();if(gameSession?.answered)syncAnswered();}
 };
 function syncAnswered(){
  const g=gameSession,card=app.querySelector('.card'),dock=app.querySelector('.dl-unified-build-dock');
  if(!g||!['build','reverse'].includes(g.mode)||!card||!dock)return;
  const answered=!!g.answered;
  const action=dock.querySelector('.dl-build-dock-check');
  if(action&&action.dataset.stage!==(answered?'next':'check')){action.dataset.stage=answered?'next':'check';action.textContent=answered?'Next':'Check';action.onclick=answered?()=>gameNext():()=>dlUnifiedCheck();}
  card.classList.toggle('dl-build-answered',answered);
  if(answered){
   /* Keep feedback directly below the completed answer; remove the spent bank. */
   /* Hide the entire spent word-bank section and controls, regardless of legacy class names. */
   const bank=card.querySelector('#gameBank,.reverse-wordbank,.dl-reverse-wordbank');
   if(bank){const parent=bank.parentElement;bank.remove();if(parent&&parent!==card&&!parent.querySelector('button,input')&&parent.textContent.trim()==='')parent.remove();}
   card.querySelectorAll('.dl-shared-bank-title,.dl-build-edit-controls').forEach(el=>el.remove());
   card.querySelectorAll('button').forEach(button=>{if(/^(listen to german|start over|undo last word)$/i.test(button.textContent.trim().replace(/[↶↺]/g,'').trim()))button.remove();});
   card.querySelectorAll('*').forEach(el=>{if(el.children.length===0&&/^word bank$/i.test(el.textContent.trim()))el.remove();});
   document.getElementById('dlReverseNextBar')?.remove();
   document.body.classList.remove('dl-reverse-answered');
   const feedback=card.querySelector('#gameFeedback');
   const built=card.querySelector('#gameBuilt');
   if(feedback&&built&&feedback.previousElementSibling!==built)built.after(feedback);
   if(feedback&&!built){const answer=card.querySelector('#reverseBuilt,.reverse-built,.dl-reverse-built,.game-built');const prompt=card.querySelector('.dl-build-prompt');const anchor=answer||prompt;if(anchor&&feedback.previousElementSibling!==anchor)anchor.after(feedback);}
  }
 }
 /* Use the same original gameMark feedback renderer for German and English.
    Never replace its generated card with a sentence-specific imitation. */
 const previousMark=gameMark;
 gameMark=function(ok,answer){
  const result=previousMark(ok,answer);

  if(gameSession?.mode==='build'&&gameSession.answered&&!ok){
   const feedback=document.getElementById('gameFeedback');
   const item=gameSession.pool[gameSession.seq[gameSession.idx]];
   if(feedback&&item){
    const selected=(gameSession.picked||[]).map(i=>item.tokens[gameSession.order[i]]);
    const hint=typeof dlSentenceMistakeHint==='function'?dlSentenceMistakeHint(selected,item.tokens):'';
    if(hint&&!feedback.querySelector('.dl-sentence-hint')){
     const explanation=document.createElement('p');
     explanation.className='dl-sentence-hint';
     explanation.textContent='Why? '+hint;
     feedback.appendChild(explanation);
    }
   }
  }
  syncAnswered();
  return result;
 };
 const previousNext=gameNext;
 gameNext=function(){document.getElementById('dlReverseNextBar')?.remove();document.body.classList.remove('dl-reverse-answered');return previousNext();};
 /* Avoid observing our own feedback mutations: that previously caused an infinite update loop. */
 window.dlUnifiedUndo=function(){
  const g=gameSession;if(!g||g.answered||!g.picked?.length)return;
  const index=g.picked.pop(),button=document.getElementById('gb'+index);if(button)button.disabled=false;
  const item=g.pool[g.seq[g.idx]];
  const built=document.getElementById('gameBuilt');if(built)built.textContent=g.picked.length?g.picked.map(i=>item.tokens[g.order[i]]).join(' ').replace(/[.!?]+(?=\\s|$)/g,''):'Tap the words below ↓';
 };
 window.dlUnifiedReset=function(){
  const g=gameSession;if(!g||g.answered)return;
  g.picked=[];document.querySelectorAll('#gameBank button').forEach(b=>b.disabled=false);
  const built=document.getElementById('gameBuilt');if(built)built.textContent='Tap the German words below';
 };
})();
