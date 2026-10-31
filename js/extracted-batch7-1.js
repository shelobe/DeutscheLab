
(function(){
 const drills=[
  {sound:'z → /ts/',word:'zwei',meaning:'two',example:'Zeit',detail:'German z is pronounced as a single ts sound. Start with the t and release immediately into s. Practice it at the start of zwei and Zeit.'},
  {sound:'tsch → /tʃ/',word:'Tschüss',meaning:'bye / goodbye (informal)',example:'Deutsch',detail:'The letters tsch make one sound, like ch in English chair. Start with t and release straight into sh. Tschüss is an informal goodbye; Deutsch means German and ends with the same tsch sound.'},
  {sound:'sch → /ʃ/',word:'Schule',meaning:'school',example:'schön',detail:'The three letters sch make one sh sound, like the beginning of English shoe.'},
  {sound:'sp → /ʃp/',word:'sprechen',meaning:'to speak',example:'Sport',detail:'At the beginning of a word or stressed syllable, German sp usually starts with sh followed by p.'},
  {sound:'st → /ʃt/',word:'Straße',meaning:'street',example:'stehen',detail:'At the beginning of a word or stressed syllable, German st usually starts with sh followed by t.'},
  {sound:'ch (soft) → /ç/',word:'ich',meaning:'I',example:'Milch',detail:'The soft ch after i or other front vowels is made by raising the middle of your tongue toward the roof of your mouth. It is not English sh.'},
  {sound:'ch (back) → /x/',word:'Buch',meaning:'book',example:'Bach',detail:'After a, o, or u, ch is usually a throaty friction sound made farther back in the mouth. Compare Buch with the softer ch in ich.'},
  {sound:'ei → /aɪ/',word:'mein',meaning:'my',example:'drei',detail:'German ei sounds like English eye. The second letter’s English name is the clue: eI → English I (eye).'},
  {sound:'ie → /iː/',word:'Liebe',meaning:'love',example:'sieben',detail:'German ie usually makes a long ee sound, unlike ei. The second letter’s English name is the clue: iE → English E (ee). Hold the vowel a little longer.'},
  {sound:'eu → /ɔʏ/',word:'neun',meaning:'nine',example:'heute',detail:'German eu makes a diphthong similar to English oy. The spelling äu often has the same sound.'},
  {sound:'au → /aʊ/',word:'Haus',meaning:'house',example:'auch',detail:'German au glides from ah toward oo, roughly like English ow in cow.'},
  {sound:'w → /v/',word:'Wasser',meaning:'water',example:'wir',detail:'German w sounds like English v, not English w. Touch your upper teeth lightly to your lower lip.'},
  {sound:'v → /f/ (often)',word:'Vater',meaning:'father',example:'vier',detail:'In many common German words, v sounds like English f. Some borrowed words use v instead, so learn them individually.'},
  {sound:'ß → /s/',word:'Straße',meaning:'street',example:'heißen',detail:'The letter ß represents a voiceless s sound, not a b. It generally follows a long vowel or diphthong.'},
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
  const groups=[
   ['Vowel combinations',[7,8,9,10]],
   ['Consonant combinations',[1,2,3,4,5,6]],
   ['Single letters',[0,11,12,13]]
  ];
  const heardWords=new Set();
  const explanations=groups.map(([title,indices])=>{
   const words=indices.map(i=>drills[i]).filter(d=>{if(heardWords.has(d.word))return false;heardWords.add(d.word);return true});
   return '<section><h3>'+title+'</h3><ul>'+indices.map(i=>'<li><strong>'+drills[i].sound+'</strong> — '+drills[i].detail+'</li>').join('')+'</ul></section><div class="dl-section-audio">'+words.map(d=>'<div class="vocab-row"><div class="vocab-copy"><strong>'+d.word+'</strong><span>'+d.meaning+'</span></div><button type="button" class="secondary" data-dl-pron-word="'+d.word+'" aria-label="Listen to '+d.word+'">Listen</button></div>').join('')+'</div>';
  }).join('');
  root.innerHTML='<div class="dl-flow"><div class="dl-flow-top"><button class="secondary" id="dl-pron-back">Back</button></div><section class="dl-flow-card dl-pronunciation-intro"><div class="dl-flow-label">A1 · German pronunciation</div><h2>What you\'ll learn</h2><p>Recognize and say these '+drills.length+' German sounds.</p><div class="dl-pronoun-guide dl-lesson-guide">'+explanations+'</div><button class="dl-flow-action" id="dl-pron-begin">Start practice</button></section></div>';
  root.querySelectorAll('[data-dl-pron-word]').forEach(button=>button.onclick=()=>speak(button.dataset.dlPronWord));
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
  root.innerHTML='<section class="card dl-pronunciation"><p class="muted">Pronunciation · '+(soundIndex+1)+' of '+drills.length+'</p><h2>German sounds</h2><div class="dl-sound-focus"><strong></strong><p class="dl-sound-detail"></p></div><div class="vocab-row"><div class="vocab-copy"><strong class="dl-sound-example-word"></strong><span>Another word with this sound</span></div><button type="button" class="secondary" id="dl-sound-example-play">Listen</button></div><h3 class="dl-pronunciation-word"></h3><p class="dl-pronunciation-meaning"></p><button id="dl-sound-speak">🎤 Speak now</button><p id="dl-sound-status" aria-live="polite">Tap Speak now and attempt the word to unlock Next sound.</p><button class="secondary" id="dl-sound-fallback" hidden>Continue without speech recognition</button><div class="dl-sound-listening"><button class="secondary" id="dl-sound-hear">🔊 Hear it</button><button class="secondary" id="dl-sound-slow">🐢 Hear it slowly</button></div><div class="dl-sound-navigation"><button class="secondary" id="dl-sound-prev">Previous</button><button id="dl-sound-next">Next sound</button></div></section>';
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
  let pronunciationHeardSpeech=false;
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
  function noRecognizedWords(){
   if(pronunciationHeardSpeech){
    unlockAdvance();
    status.textContent='Speech was detected, but no words could be recognized. Your pronunciation could not be checked. Retry or continue to the next sound.';
   }else{
    status.textContent='No speech was detected. Tap Speak now and try again.';
   }
  }
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
   pronunciationReceivedResult=false;pronunciationHeardSpeech=false;pronunciationEnding=false;
   speakButton.textContent='⏹ Stop listening';
   status.textContent='Listening…';
   pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition===rec){status.textContent='Processing speech…';pronunciationEnding=true;try{rec.stop()}catch(e){}pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition===rec){stopPronunciation();unavailable('Speech recognition did not return a result.');speakButton.textContent='🎤 Speak now'}},2500)}},10000);
   rec.onspeechstart=()=>{if(activePronunciationRecognition===rec)pronunciationHeardSpeech=true};
   rec.onnomatch=()=>{if(activePronunciationRecognition!==rec)return;pronunciationHeardSpeech=true;stopPronunciation();noRecognizedWords();speakButton.textContent='🎤 Speak now'};
   rec.onresult=e=>{
    if(activePronunciationRecognition!==rec||!status.isConnected)return;
    const words=Array.from(e.results[0]||[]).map(x=>x.transcript.trim().toLocaleLowerCase('de-DE').replace(/[.!?]/g,''));
    if(!words.some(Boolean)){stopPronunciation();speakButton.textContent='🎤 Speak now';noRecognizedWords();return}
    pronunciationReceivedResult=true;unlockAdvance();
    const expected=d.word.toLocaleLowerCase('de-DE');
    const normalized=words.map(w=>w.replace(/ß/g,'ss'));const target=expected.replace(/ß/g,'ss');
    const ok=normalized.includes(target);
    status.textContent=ok?'Richtig! Well done!':'Heard “'+words[0]+'”, which did not match “'+d.word+'”. This may be a recognition error. Listen again and retry, or continue.';
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
     if(e.error==='no-speech')noRecognizedWords();
     else if(e.error!=='aborted')unavailable(e.error==='network'?'Speech recognition service unavailable.':'Microphone unavailable ('+e.error+').');
    }
    if(speakButton.isConnected)speakButton.textContent='🎤 Speak now';
   };
   rec.onend=()=>{if(activePronunciationRecognition!==rec)return;if(pronunciationEnding){pronunciationTimer=setTimeout(()=>{if(activePronunciationRecognition!==rec)return;stopPronunciation();if(status.isConnected)unavailable('Speech recognition did not return a result.');if(speakButton.isConnected)speakButton.textContent='🎤 Speak now'},3500);return;}stopPronunciation();if(status.isConnected&&!pronunciationReceivedResult)noRecognizedWords();if(speakButton.isConnected)speakButton.textContent='🎤 Speak now'};
   try{rec.start()}catch(e){stopPronunciation();unavailable('Unable to start microphone: '+e.message);speakButton.textContent='🎤 Speak now'}
  };
  window.scrollTo(0,0);
 };

})();
