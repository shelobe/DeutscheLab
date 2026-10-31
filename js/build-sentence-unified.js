
/* Unified Build a Sentence entry and corrected listening completion navigation. */
(function(){
 const previousPracticeHub=practiceHub;
 practiceHub=function(){
  previousPracticeHub();
  const buttons=[...app.querySelectorAll('button')];
  const build=buttons.find(b=>/Build sentences?/i.test(b.textContent));
  const english=buttons.find(b=>/Build in English/i.test(b.textContent));
  if(build){
   build.setAttribute('onclick','dlBuildModeMenu()');
   build.innerHTML='<span class="tile-icon" aria-hidden="true">🧩</span><span class="tile-title">Build a Sentence</span><small>Choose German or English</small>';
   build.classList.add('dl-build-unified-tile');
  }
  if(english&&english!==build)english.remove();
 };
 window.dlBuildModeMenu=function(){
  app.innerHTML=illustratedHero('Build a Sentence','Choose the language you want to build.','village','hund.png')+
   '<section class="card"><h2>Choose your mode</h2><div class="game-grid"><button onclick="dlBuildModeStart(\'de\')">🇩🇪 Build in German<br><small>Arrange German words</small></button><button onclick="dlBuildModeStart(\'en\')">🇺🇸 Build in English<br><small>Arrange English words</small></button></div><button class="secondary" onclick="practiceHub()">Back to Practice Hub</button></section>';
  window.scrollTo(0,0);
 };
 window.dlBuildModeStart=function(mode){if(mode==='de')startSentenceRound();else gameStart('reverse');};
 const oldGameHub=gameHub;
 gameHub=function(){return practiceHub();};
 const oldGameRender=gameRender;
 gameRender=function(){oldGameRender();if(!gameSession||gameSession.mode!=='reverse')return;
  const card=app.querySelector('.card');if(!card)return;
  const back=document.createElement('div');back.className='dl-unified-build-dock';
  back.innerHTML='<button class="secondary" onclick="dlBuildModeMenu()">Back</button>';
  card.after(back);
 };
})();
