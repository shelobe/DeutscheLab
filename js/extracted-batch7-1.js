
(function(){
 const drills=[
  {sound:'z → /ts/',word:'zwei',meaning:'two',example:'Zeit',detail:'German z is pronounced as a single ts sound. Start with the t and release immediately into s. Practice it at the start of zwei and Zeit.'},
  {sound:'tsch → /tʃ/',word:'Tschüss',meaning:'bye / goodbye (informal)',example:'Deutsch',detail:'The letters tsch make one sound, like ch in English chair. Start with t and release straight into sh. Tschüss is an informal goodbye; Deutsch means German and ends with the same tsch sound.'},
  {sound:'sch → /ʃ/',word:'Schule',meaning:'school',example:'schön',detail:'The three letters sch make one sh sound, like the beginning of English shoe.'},
  {sound:'sp → /ʃp/',word:'sprechen',meaning:'to speak',example:'Sport',detail:'At the beginning of a word or stressed syllable, German sp usually starts with sh followed by p.'},
  {sound:'st → /ʃt/',word:'Straße',meaning:'street',example:'stehen',detail:'At the beginning of a word or stressed syllable, German st usually starts with sh followed by t.'},
  {sound:'ch (soft) → /ç/',word:'ich',meaning:'I',example:'Milch',detail:'The soft ch after i or other front vowels is made by raising the middle of your tongue toward the roof of your mouth. It is not English sh.'},
  {sound:'ch (back) → /x/',word:'Buch',meaning:'book',example:'Bach',detail:'After a, o, or u, ch is usually a throaty friction sound made farther back in the mouth. Compare Buch with the softer ch in ich.'},
  {sound:'ei → /aɪ/',word:'mein',meaning:'my',example:'drei',detail:'German ei sounds like English eye. Remember: the second letter helps tell you the sound.'},
  {sound:'ie → /iː/',word:'Liebe',meaning:'love',example:'sieben',detail:'German ie usually makes a long ee sound, unlike ei. Hold the vowel a little longer.'},
  {sound:'eu → /ɔʏ/',word:'neun',meaning:'nine',example:'heute',detail:'German eu makes a diphthong similar to English oy. The spelling äu often has the same sound.'},
  {sound:'au → /aʊ/',word:'Haus',meaning:'house',example:'auch',detail:'German au glides from ah toward oo, roughly like English ow in cow.'},
  {sound:'w → /v/',word:'Wasser',meaning:'water',example:'wir',detail:'German w sounds like English v, not English w. Touch your upper teeth lightly to your lower lip.'},
  {sound:'v → /f/ (often)',word:'Vater',meaning:'father',example:'vier',detail:'In many common German words, v sounds like English f. Some borrowed words use v instead, so learn them individually.'},
  {sound:'ß → /s/',word:'Straße',meaning:'street',example:'heißen',detail:'The letter ß represents a voiceless s sound, not a b. It generally follows a long vowel or diphthong.'},
  {sound:'ü',word:'fünf',meaning:'five',example:'Tür',detail:'Say ee while rounding your lips as if to say oo. Keep your tongue forward.'},
  {sound:'ö',word:'schön',meaning:'beautiful',example:'hören',detail:'Shape your tongue for an eh sound while rounding your lips. It is distinct from o.'}
 ];
 let soundIndex=0;
 const attempted=new Set();
 let cancelCurrentPronunciation=()=>{};
 function clearPronunciationScreen(){
  cancelCurrentPronunciation();
  document.querySelectorAll('body > .dl-sound-navigation').forEach(nav=>nav.remove());
 }
 function startPronunciationPractice(){attempted.clear();dlPronunciationHome(0)}
 const introStyle=document.createElement('style');
 introStyle.textContent='.dl-pronunciation-intro{padding-bottom:100px!important}.dl-pronunciation-intro #dl-pron-begin{position:fixed;bottom:max(12px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(calc(100vw - 48px),640px);z-index:1000;margin:0;box-shadow:0 8px 30px rgba(0,0,0,.45)}';
 document.head.append(introStyle);
 window.dlPronunciationIntro=function(){
  clearPronunciationScreen();
  const root=document.getElementById('app');
  root.innerHTML='<div class="dl-flow"><div class="dl-flow-top"><button class="secondary" id="dl-pron-back">Back</button><div class="dl-flow-progress"><span style="width:0%"></span></div></div><section class="dl-flow-card dl-pronunciation-intro"><div class="dl-flow-label">A1 · German pronunciation</div><h2>What you\'ll learn</h2><div class="dl-pronoun-guide dl-lesson-guide"><section><h3>German sounds</h3><p>German letters and letter combinations sometimes sound different from English. Learn 16 important sounds and practice recognizing and saying them.</p></section><section><h3>Hear the differences</h3><p>Compare <strong>ei</strong> and <strong>ie</strong>, learn combinations such as <strong>sch</strong> and <strong>ch</strong>, and practice familiar German words.</p></section><section class="dl-lesson-remember"><h3>Remember EI and IE</h3><p>The second letter gives you the sound of its <strong>English letter name</strong>.</p><p><strong>eI → “eye”</strong>, like English <strong>I</strong>: <em>mein</em>, <em>Wein</em>.</p><p><strong>iE → “ee”</strong>, like English <strong>E</strong>: <em>Liebe</em>, <em>Biene</em>.</p></section><section><h3>How to practice</h3><p>Listen to each example, then tap Speak now to try the word. Hear it and Hear it slowly let you listen again. Next sound unlocks after you attempt the word. Practice all 16 sounds.</p></section><section class="dl-lesson-remember"><h3>Remember</h3><p>Several letters can represent one sound. Listen and repeat the complete example word. You can retry a sound before moving on.</p></section></div><button class="dl-flow-action" id="dl-pron-begin">Start practice</button></section></div>';
  const tschSection=document.createElement('section');
  tschSection.innerHTML='<h3>TSCH — one sound</h3><p>The letters <strong>tsch</strong> together sound like the English <strong>ch</strong> in <strong>chair</strong>. Say them as one sound, rather than separate letters.</p><p><strong>Tschüss — bye / goodbye</strong>: an informal farewell when leaving someone.</p><button type="button" class="secondary" id="dl-tsch-listen">Listen to Tschüss</button>';
  root.querySelector('.dl-lesson-guide').append(tschSection);
  root.querySelector('#dl-tsch-listen').onclick=()=>speak('Tschüss');
  root.querySelector('#dl-pron-begin').onclick=startPronunciationPractice;
  root.querySelector('#dl-pron-back').onclick=()=>curriculumView('A1');
  window.scrollTo(0,0);
 };
 window.dlPronunciationComplete=function(){
  if(attempted.size!==drills.length)return;
  ensureLearning();state.learning.pronunciationLesson3Completed=true;save();
  clearPronunciationScreen();
  const root=document.getElementById('app');
  root.innerHTML='<section class="card dl-pronunciation"><h2>Lesson 3 complete!</h2><p>Geschafft! You completed all '+drills.length+' German sounds. Lesson 3 is now marked completed in Module 1.</p><div class="dl-sound-navigation"><button class="secondary" id="dl-pron-repeat">Review sounds</button><button id="dl-pron-home">Return to Module 1</button></div></section>';
  root.querySelector('#dl-pron-repeat').onclick=startPronunciationPractice;
  root.querySelector('#dl-pron-home').onclick=()=>curriculumView('A1');
  window.scrollTo(0,0);
 };
 window.dlPronunciationHome=function(index){
  soundIndex=Math.max(0,Math.min(drills.length-1,Number(index)||0));
  const d=drills[soundIndex];
  clearPronunciationScreen();
  const root=document.getElementById('app');
  root.innerHTML='<section class="card dl-pronunciation"><p class="muted">Pronunciation · '+(soundIndex+1)+' of '+drills.length+'</p><h2>German sounds</h2><div class="dl-sound-focus"><strong></strong><p class="dl-sound-detail"></p><p>Another example: <b class="dl-sound-example-word"></b></p><button class="secondary" id="dl-sound-example-play">🔊 Listen to example</button></div><h3 class="dl-pronunciation-word"></h3><p class="dl-pronunciation-meaning"></p><button id="dl-sound-speak">🎤 Speak now</button><p id="dl-sound-status" aria-live="polite">Tap Speak now and attempt the word to unlock Next sound.</p><button class="secondary" id="dl-sound-fallback" hidden>Continue without speech recognition</button><div class="dl-sound-listening"><button class="secondary" id="dl-sound-hear">🔊 Hear it</button><button class="secondary" id="dl-sound-slow">🐢 Hear it slowly</button></div><div class="dl-sound-navigation"><button class="secondary" id="dl-sound-prev">Previous</button><button id="dl-sound-next">Next sound</button></div></section>';
  root.querySelector('.dl-sound-focus strong').textContent='Sound focus: '+d.sound;
  root.querySelector('.dl-sound-detail').textContent=d.detail;
  root.querySelector('.dl-sound-example-word').textContent=d.example;
  root.querySelector('.dl-pronunciation-word').textContent=d.word;
  root.querySelector('.dl-pronunciation-meaning').textContent=d.meaning;
  root.querySelector('#dl-sound-example-play').onclick=()=>speak(d.example);
  root.querySelector('#dl-sound-hear').onclick=()=>speak(d.word);
  root.querySelector('#dl-sound-slow').onclick=()=>speak(d.word,0.7);
  root.querySelector('#dl-sound-prev').disabled=soundIndex===0;
  root.querySelector('#dl-sound-prev').onclick=()=>dlPronunciationHome(soundIndex-1);
  root.querySelector('#dl-sound-next').textContent=soundIndex===drills.length-1?'Finish pronunciation':'Next sound';
  const currentIndex=soundIndex;
  const nextButton=root.querySelector('#dl-sound-next');
  nextButton.disabled=!attempted.has(currentIndex);
  nextButton.onclick=()=>{
   if(!attempted.has(currentIndex))return;
   if(currentIndex===drills.length-1)dlPronunciationComplete();
   else dlPronunciationHome(currentIndex+1);
  };
  let activePronunciationRecognition=null;
  let pronunciationTimer=null;
  let pronunciationReceivedResult=false;
  let pronunciationEnding=false;
  function stopPronunciation(){
   clearTimeout(pronunciationTimer);pronunciationTimer=null;
   if(activePronunciationRecognition){const r=activePronunciationRecognition;activePronunciationRecognition=null;try{r.abort()}catch(e){}}
  }
  const speakButton=root.querySelector('#dl-sound-speak');
  cancelCurrentPronunciation=stopPronunciation;
  const status=root.querySelector('#dl-sound-status');
  const fallback=root.querySelector('#dl-sound-fallback');
  function unlockAdvance(){attempted.add(currentIndex);nextButton.disabled=false;fallback.hidden=true}
  function unavailable(message){
   if(!status.isConnected)return;
   status.textContent=message+' Say the word aloud, then choose Continue without speech recognition, or retry Speak now.';
   fallback.hidden=false;
  }
  fallback.onclick=()=>{
   stopPronunciation();unlockAdvance();speakButton.textContent='🎤 Speak now';
   status.textContent='Continuing without speech recognition. Your pronunciation was not checked.';
  };
  if(attempted.has(currentIndex))status.textContent='You have already attempted this sound. Practice again or continue.';
  if(!(window.SpeechRecognition||window.webkitSpeechRecognition))unavailable('Speech recognition is unavailable in this browser.');
  speakButton.onclick=()=>{
   if(activePronunciationRecognition){
    const r=activePronunciationRecognition;
    clearTimeout(pronunciationTimer);pronunciationTimer=null;
    status.textContent='Processing speech…';pronunciationEnding=true;
    try{r.stop()}catch(e){stopPronunciation();status.textContent='No speech captured. Tap Speak now to retry.'}
    pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition===r){stopPronunciation();unavailable('Speech recognition did not return a result.');speakButton.textContent='🎤 Speak now'}},4500);
    return;
   }
   const Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
   if(!Rec){unavailable('Speech recognition is unavailable in this browser.');return}
   const rec=new Rec();activePronunciationRecognition=rec;rec.lang='de-DE';rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=3;
   pronunciationReceivedResult=false;pronunciationEnding=false;
   speakButton.textContent='⏹ Stop listening';
   status.textContent='Listening…';
   pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition===rec){status.textContent='Processing speech…';pronunciationEnding=true;try{rec.stop()}catch(e){}pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition===rec){stopPronunciation();unavailable('Speech recognition did not return a result.');speakButton.textContent='🎤 Speak now'}},2500)}},10000);
   rec.onresult=e=>{
    if(activePronunciationRecognition!==rec||!status.isConnected)return;
    const words=Array.from(e.results[0]||[]).map(x=>x.transcript.trim().toLocaleLowerCase('de-DE').replace(/[.!?]/g,''));
    if(!words.some(Boolean)){stopPronunciation();speakButton.textContent='🎤 Speak now';status.textContent='No speech detected. Tap Speak now and try saying the word.';return}
    pronunciationReceivedResult=true;unlockAdvance();
    const expected=d.word.toLocaleLowerCase('de-DE');
    const normalized=words.map(w=>w.replace(/ß/g,'ss'));const target=expected.replace(/ß/g,'ss');
    const ok=normalized.includes(target);
    const uncertain=(expected==='liebe'&&words.some(w=>w==='lieber'))||(expected==='straße'&&normalized.some(w=>/^strass(e|er|a)$/.test(w)))||words.some(w=>!/[äöüß]/.test(w)&&/^[a-z ]+$/.test(w)&&!w.includes(target.slice(0,Math.min(3,target.length))));
    status.textContent=ok?'Richtig! Well done!':uncertain?'Speech recognition was uncertain (heard: '+words[0]+'). This does not mean your pronunciation was wrong. Try again.':'Heard: '+(words[0]||'nothing')+'. Try again.';
    stopPronunciation();speakButton.textContent='🎤 Speak now';
    if(ok){
     speakButton.disabled=true;
     setTimeout(()=>{
      if(!status.isConnected||document.querySelector('#dl-sound-status')!==status)return;
      if(soundIndex===drills.length-1)dlPronunciationComplete();
      else dlPronunciationHome(soundIndex+1);
     },1100);
    }
   };
   rec.onerror=e=>{
    if(activePronunciationRecognition!==rec)return;
    stopPronunciation();
    if(status.isConnected){
     if(e.error==='no-speech')status.textContent='No speech detected. Tap Speak now and try saying the word.';
     else if(e.error!=='aborted')unavailable(e.error==='network'?'Speech recognition service unavailable.':'Microphone unavailable ('+e.error+').');
    }
    if(speakButton.isConnected)speakButton.textContent='🎤 Speak now';
   };
   rec.onend=()=>{if(activePronunciationRecognition!==rec)return;if(pronunciationEnding){pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition!==rec)return;stopPronunciation();if(status.isConnected)unavailable('Speech recognition did not return a result.');if(speakButton.isConnected)speakButton.textContent='🎤 Speak now'},3500);return;}stopPronunciation();if(status.isConnected&&!pronunciationReceivedResult)status.textContent='No speech detected. Tap Speak now and try saying the word.';if(speakButton.isConnected)speakButton.textContent='🎤 Speak now'};
   try{rec.start()}catch(e){stopPronunciation();unavailable('Unable to start microphone: '+e.message);speakButton.textContent='🎤 Speak now'}
  };
  window.scrollTo(0,0);
 };

})();
