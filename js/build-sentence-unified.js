
/* Unified Build a Sentence entry and corrected listening completion navigation. */
(function(){
 const previousPracticeHub=practiceHub;
 function unifyBuildCards(){
  const buttons=[...app.querySelectorAll('button')];
  const build=buttons.find(b=>/Build sentences?|Build a Sentence/i.test(b.textContent));
  const english=buttons.find(b=>/Build in English/i.test(b.textContent));
  if(build){build.setAttribute('onclick','dlBuildModeMenu()');build.innerHTML='<span class="tile-icon" aria-hidden="true">🧩</span><span class="tile-title">Build a Sentence</span><small>Choose German or English</small>';build.classList.add('dl-build-unified-tile');}
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
  const card=app.querySelector('.card');if(!card)return;
  const isGerman=gameSession.mode==='build';
  const heading=[...card.querySelectorAll('h3')][0];
  if(heading){heading.classList.add('dl-build-prompt');}
  const instruction=heading?.previousElementSibling;
  if(instruction&&instruction.tagName==='P')instruction.classList.add('dl-build-instruction');
  const existing=card.querySelector('.dl-unified-build-dock');if(existing)existing.remove();
  if(isGerman){
   card.classList.add('dl-german-english-layout');
   const built=card.querySelector('#gameBuilt');
   const bank=card.querySelector('#gameBank');
   if(built){built.classList.add('dl-shared-built');built.textContent='Tap the German words below';}
   if(bank){bank.classList.add('dl-shared-bank');const title=document.createElement('div');title.className='dl-shared-bank-title';title.textContent='WORD BANK';bank.before(title);}
   const originalRestart=card.querySelector('button[onclick="gameRender()"]');if(originalRestart)originalRestart.remove();
   const check=card.querySelector('button[onclick="gameCheckBuild()"]');if(check){check.textContent='Check translation';check.classList.add('dl-build-check');}
   if(bank){
    const controls=document.createElement('div');controls.className='dl-build-edit-controls';
    controls.innerHTML='<button type="button" class="secondary" onclick="dlUnifiedUndo()">↶ Undo last word</button><button type="button" class="secondary" onclick="dlUnifiedReset()">↺ Start over</button>';
    bank.after(controls);
   }
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
   document.getElementById('dlReverseNextBar')?.remove();
   document.body.classList.remove('dl-reverse-answered');
   const feedback=card.querySelector('#gameFeedback');
   const built=card.querySelector('#gameBuilt');
   if(feedback&&built&&feedback.previousElementSibling!==built)built.after(feedback);
   if(feedback&&!built){const answer=card.querySelector('#reverseBuilt,.reverse-built,.dl-reverse-built,.game-built');const prompt=card.querySelector('.dl-build-prompt');const anchor=answer||prompt;if(anchor&&feedback.previousElementSibling!==anchor)anchor.after(feedback);}
  }
 }
 const previousMark=gameMark;
 gameMark=function(ok,answer){const result=previousMark(ok,answer);syncAnswered();return result;};
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
  const built=document.getElementById('gameBuilt');if(built)built.textContent='Tap the words below ↓';
 };
})();
