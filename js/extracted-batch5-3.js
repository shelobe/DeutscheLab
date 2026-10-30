
(function(){
 const speechWords=[
  ['ich','I','Focus on the soft ch sound at the end.'],
  ['wir','we','German w sounds like English v.'],
  ['ihr','you (plural)','The vowel is long, like the ee sound.'],
  ['sprechen','to speak','The initial sp sounds like shp.'],
  ['Schule','school','The sch combination sounds like English sh.'],
  ['zwei','two','German z begins with a ts sound.'],
  ['mein','my','The ei combination sounds like English eye.'],
  ['Liebe','love','The ie combination is a long ee sound.'],
  ['Bücher','books','Listen for the ü vowel and the soft ch.'],
  ['Mädchen','girl','The ch here is soft; -chen is a diminutive ending.'],
  ['Wasser','water','German w sounds like v; the first a is short.'],
  ['aufstehen','to get up','Notice the au diphthong and the stressed first syllable.'],
  ['Frühstück','breakfast','Pay attention to ü and the consonant cluster.'],
  ['Entschuldigung','excuse me','Say the word in syllables, then together.'],
  ['Guten Morgen','good morning','Practice the natural rhythm of the greeting.']
 ];
 const previousBegin=fullBegin;
 fullBegin=function(id){
  previousBegin(id);
  const s=fullSession,u=FULL_UNITS[id];
  if(!s||!u||u.level!=='A1'||!/(umlaut|pronunc|sounds? of|alphabet|spelling)/i.test(String(u.title||''))||!Array.isArray(s.questions)||s.questions.some(q=>q.type==='speak-word'))return;
  const n=Math.abs(Number(id)||0)%speechWords.length;
  const [word,meaning,tip]=speechWords[n];
  s.questions.splice(Math.min(4,s.questions.length),0,{type:'speak-word',prompt:'Say this German word aloud',options:['Recognized','Try again'],answer:0,dlSpeakWord:word,dlSpeakMeaning:meaning,why:tip});
  fullRender();
 };
 let currentRecognition=null;
 const previousRender=fullRender;
 fullRender=function(){
  if(currentRecognition){try{currentRecognition.abort()}catch(e){}currentRecognition=null}
  previousRender();
  const s=fullSession,q=s?.questions?.[s.idx];if(!q||q.type!=='speak-word')return;
  const card=document.querySelector('.dl-flow-card');if(!card)return;
  const label=card.querySelector('.dl-flow-label');if(label)label.textContent='SPEAK THE GERMAN WORD';
  const heading=card.querySelector('h2');if(heading)heading.textContent='Pronounce this word:';
  const choices=card.querySelector('.dl-flow-options');if(choices)choices.hidden=true;
  const check=document.getElementById('dl-check');if(check)check.hidden=true;
  const tip=document.getElementById('dl-tip'),help=document.getElementById('dl-help-btn');if(tip)tip.hidden=true;if(help)help.hidden=true;
  const panel=document.createElement('div');panel.className='dl-speak-panel';
  panel.innerHTML='<div class="dl-speak-target"></div><p class="dl-speak-meaning"></p><button id="dl-speak-start">🎤 Speak now</button><div class="dl-speak-hear-row"><button class="secondary" id="dl-speak-listen">🔊 Hear it</button><button class="secondary" id="dl-speak-slow">🐢 Hear it slowly</button></div><p id="dl-speak-status" class="dl-speak-status" aria-live="polite">Listen to the word, then say it into your microphone.</p><button class="secondary" id="dl-speak-skip">Skip speaking</button>';
  panel.querySelector('.dl-speak-target').textContent=q.dlSpeakWord;
  panel.querySelector('.dl-speak-meaning').textContent=q.dlSpeakMeaning;
  panel.querySelector('#dl-speak-listen').onclick=()=>speak(q.dlSpeakWord);
  panel.querySelector('#dl-speak-slow').onclick=()=>speak(q.dlSpeakWord,0.7);
  panel.querySelector('#dl-speak-skip').onclick=()=>finish(false,true);
  panel.querySelector('#dl-speak-start').onclick=()=>{
   const Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
   const status=panel.querySelector('#dl-speak-status');
   if(!Rec){status.textContent='Speech recognition is unavailable in this browser. You can listen and practice, then skip this speaking check.';return}
   if(currentRecognition){try{currentRecognition.stop()}catch(e){}return}
   const rec=new Rec();currentRecognition=rec;rec.lang='de-DE';rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=5;
   const start=panel.querySelector('#dl-speak-start');start.textContent='Listening… tap to stop';status.textContent='Listening for German speech…';
   let speechFinished=false;
   const speechTimeout=setTimeout(()=>{
    if(speechFinished||currentRecognition!==rec)return;
    speechFinished=true;
    currentRecognition=null;
    try{rec.abort()}catch(e){}
    if(fullSession===s&&s.questions[s.idx]===q&&!dlAnswered){
     status.textContent='No speech detected after 10 seconds. Tap Speak again to retry, or Skip speaking to continue.';
     if(start.isConnected)start.textContent='🎤 Speak again';
    }
   },10000);
   rec.onresult=e=>{
    if(speechFinished)return;
    speechFinished=true;clearTimeout(speechTimeout);
    if(fullSession!==s||s.questions[s.idx]!==q)return;
    const alternatives=Array.from(e.results[0]||[]).map(x=>x.transcript);
    const norm=t=>String(t).toLocaleLowerCase('de').normalize('NFC').replace(/[.,!?„“"']/g,'').replace(/\s+/g,' ').trim();
    const recognized=alternatives[0]||'';
    const match=alternatives.some(t=>{const heard=norm(t), target=norm(q.dlSpeakWord);return heard===target||(target==='jahr'&&heard==='ja');});
    status.textContent=match?'Great — I heard “'+recognized+'”.':'I heard “'+recognized+'”. Try listening again and repeating the word.';
    if(match)finish(true,false,recognized);
   };
   rec.onerror=e=>{if(speechFinished)return;speechFinished=true;clearTimeout(speechTimeout);if(fullSession===s&&s.questions[s.idx]===q)status.textContent='Microphone: '+e.error+'. You can retry or skip.'};
   rec.onend=()=>{clearTimeout(speechTimeout);if(currentRecognition===rec)currentRecognition=null;if(start.isConnected)start.textContent='🎤 Speak again';if(!speechFinished&&fullSession===s&&s.questions[s.idx]===q&&!dlAnswered)status.textContent='No speech recognized. Tap Speak again to retry, or Skip speaking to continue.';speechFinished=true;};
   try{rec.start()}catch(e){speechFinished=true;clearTimeout(speechTimeout);currentRecognition=null;status.textContent='Could not start microphone: '+e.message}
  };
  card.querySelector('.dl-flow-options')?.before(panel);
  function finish(matched,skipped,heard){
   if(dlAnswered)return;
   dlAnswered=true;
   s.results.push(!!matched);if(matched)s.score++;
   panel.querySelector('#dl-speak-start').disabled=true;
   panel.querySelector('#dl-speak-skip').hidden=true;
   const result=document.getElementById('dl-result');
   panel.querySelector('#dl-speak-status').hidden=true;
   if(result){const wrap=document.createElement('div');wrap.className='dl-flow-feedback';const strong=document.createElement('strong');strong.textContent=skipped?'Practice skipped':matched?'Well done!':'Try again';const p=document.createElement('p');p.textContent=matched?'You said “'+(heard||q.dlSpeakWord)+'” and the microphone understood you. Keep practicing the sound to make it feel natural.':skipped?'You can return to this word later.':q.why;wrap.append(strong,p);result.replaceChildren(wrap)}
   if(check){check.hidden=false;check.disabled=false;check.textContent=s.idx===s.questions.length-1?'Finish lesson':'Continue';check.onclick=()=>{s.idx++;fullRender()}}
  }
 };
})();
