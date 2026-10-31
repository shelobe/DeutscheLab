
// Personalized practice tools inspired by established language-learning techniques.
function practiceState(){ensureLearning();let l=state.learning;l.practice??={mistakes:{},reviews:{},activity:{},xp:0};return l.practice}
function practiceLog(points=5){let p=practiceState(),day=new Date().toLocaleDateString('en-CA');p.activity[day]=(p.activity[day]||0)+points;p.xp+=points;save()}
function practiceStreak(){let a=practiceState().activity,streak=0,d=new Date();if(!a[d.toLocaleDateString('en-CA')])d.setDate(d.getDate()-1);while(a[d.toLocaleDateString('en-CA')]){streak++;d.setDate(d.getDate()-1)}return streak}
function recordQuestion(m,ok){let p=practiceState(),key=String(COURSE.indexOf(m));if(!ok){p.mistakes[key]=(p.mistakes[key]||0)+1;p.reviews[key]={due:Date.now(),step:0}}else{delete p.mistakes[key];let prev=p.reviews[key]||{step:0},step=Math.min(prev.step+1,5);p.reviews[key]={step,due:Date.now()+[0,1,3,7,14,30][step]*86400000}}practiceLog(ok?10:2)}
const priorCourseAnswer=courseAnswer;
courseAnswer=function(id,i){recordQuestion(COURSE[id],i===COURSE[id].ans);priorCourseAnswer(id,i)};
function practiceHub(){let p=practiceState(),due=Object.keys(p.reviews).filter(k=>p.reviews[k].due<=Date.now()).length,wrong=Object.keys(p.mistakes).length,day=new Date().toLocaleDateString('en-CA'),earned=p.activity[day]||0;
app.innerHTML=illustratedHero('Practice with Fritzi','Choose what to strengthen today.','forest','hund.png')+`<section class="card"><h2>Today’s progress</h2><p>${earned}/30 daily XP · ${practiceStreak()}-day streak · ${p.xp} total XP</p><div id="progress"><div id="bar" style="width:${Math.min(100,earned/30*100)}%"></div></div><p class="muted">Your streak is optional; missed days never block lessons.</p></section><div class="sceneCards"><button class="sceneCard" onclick="review()">🧠<br>Review (${wrong+due})</button><button class="sceneCard" onclick="listeningPractice()">🎧<br>Listening</button><button class="sceneCard" onclick="sentencePractice()">🧩<br>Build sentences</button></div><section class="card"><button onclick="courseMenu(state.learning.placement?.recommended||'A1')">Continue learning</button></section>`}
function practiceQuiz(mode){let p=practiceState(),ids=mode==='mistakes'?Object.keys(p.mistakes):Object.keys(p.reviews).filter(k=>p.reviews[k].due<=Date.now());if(!ids.length){app.innerHTML=`<section class="card"><h2>All caught up!</h2><p>No ${mode==='mistakes'?'recorded mistakes':'reviews due'} yet. Try a lesson or listening practice.</p><button onclick="practiceHub()">Back to practice</button></section>`;return}let id=Number(ids[0]),m=COURSE[id];if(!m)return practiceHub();app.innerHTML=illustratedHero(mode==='mistakes'?'Fix a mistake':'Memory review',m.level+' · '+m.skill,'cafe','katze.png')+`<section class="card"><h3>${safeText(m.q)}</h3>${m.opts.map((o,i)=>`<button class="secondary" onclick="practiceAnswer(${id},${i},'${mode}')">${safeText(o)}</button>`).join('')}<div id="practiceFeedback"></div></section>`}
function practiceAnswer(id,i,mode){let m=COURSE[id],ok=i===m.ans;if(!ok)dlWrongHaptic();recordQuestion(m,ok);app.querySelectorAll('.card button').forEach(b=>b.disabled=true);document.getElementById('practiceFeedback').innerHTML=`<p class="${ok?'correct':'wrong'}">${ok?'Correct!':'Answer: '+safeText(m.opts[m.ans])}</p><p>${safeText(m.why)}</p><button onclick="practiceQuiz('${mode}')">Next</button><button class="secondary" onclick="practiceHub()">Finish</button>`}
const listeningSet=[['Guten Morgen','Good morning'],['Ich habe einen Hund','I have a dog'],['Wo ist der Bahnhof?','Where is the train station?'],['Ich möchte einen Kaffee','I would like a coffee'],['Heute ist das Wetter schön','The weather is nice today'],['Wir gehen morgen einkaufen','We are going shopping tomorrow']];
function listeningPractice(){let i=Math.floor(Math.random()*listeningSet.length),entry=listeningSet[i],wrong=listeningSet[(i+2)%listeningSet.length][1],wrong2=listeningSet[(i+4)%listeningSet.length][1],opts=[entry[1],wrong,wrong2].sort(()=>Math.random()-.5);app.innerHTML=illustratedHero('Listen and understand','Listen before choosing a meaning.','village','katze.png')+`<section class="card"><p>Tap to hear the German sentence.</p><button onclick="speak(${JSON.stringify(entry[0]).replace(/"/g,'&quot;')})">🔊 Play German</button><h3>What did you hear?</h3>${opts.map(o=>`<button class="secondary" onclick="listeningAnswer(${JSON.stringify(o).replace(/"/g,'&quot;')},${JSON.stringify(entry[1]).replace(/"/g,'&quot;')},${JSON.stringify(entry[0]).replace(/"/g,'&quot;')})">${safeText(o)}</button>`).join('')}<div id="listenFeedback"></div></section>`}
function listeningAnswer(choice,answer,german){let ok=choice===answer;practiceLog(ok?10:2);app.querySelectorAll('.card button').forEach(b=>b.disabled=true);document.getElementById('listenFeedback').innerHTML=`<p class="${ok?'correct':'wrong'}">${ok?'Correct!':'Correct meaning: '+safeText(answer)}</p><p>${safeText(german)}</p><button onclick="listeningPractice()">Another sentence</button><button class="secondary" onclick="practiceHub()">Finish</button>`}
const sentences=[['Ich habe einen Hund','I have a dog'],['Heute gehe ich einkaufen','Today I am going shopping'],['Wir lernen Deutsch','We are learning German'],['Die Katze schläft auf dem Sofa','The cat sleeps on the sofa'],['Morgen rufe ich dich an','Tomorrow I will call you']];let sentenceTarget=[],sentenceChosen=[],sentenceChosenIds=[];
let sentenceRound=null;
function startSentenceRound(){
 const tier=item=>{
  const count=item.tokens.length;
  const de=item.de||item.tokens.join(' ');
  if(/\\b(?:anstatt|stattdessen|obwohl|während|sollten|hätten|würden|könnten|damit|dennoch|allerdings|Beweise|Vermutungen)\\b/i.test(de)||count>=10)return 3;
  if(count>=7||/\\b(?:weil|dass|wenn|hatte|wäre|würde|sollte)\\b/i.test(de))return 2;
  return count>=5?1:0;
 };
 const groups=[[],[],[],[]];
 GAME_ITEMS.forEach((item,i)=>groups[tier(item)].push(i));
 for(const group of groups)for(let i=group.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[group[i],group[j]]=[group[j],group[i]]}
 const seq=groups.flat().slice(0,6);
 sentenceRound={seq,idx:0,correct:0};
 sentencePractice();
}
function sentencePractice(){
 let pair;
 if(sentenceRound){
  if(sentenceRound.idx>=sentenceRound.seq.length){
   const score=sentenceRound.correct,total=sentenceRound.seq.length;
   sentenceRound=null;
   app.innerHTML=illustratedHero('Round complete!',score+' of '+total+' correct.','forest','hund.png')+`<section class="card"><h2>${score}/${total} correct</h2><button onclick="startSentenceRound()">Try another round</button><button class="secondary" onclick="practiceHub()">All practice games</button></section>`;
   window.scrollTo(0,0);return;
  }
  const item=GAME_ITEMS[sentenceRound.seq[sentenceRound.idx]];
  pair=[item.tokens.join(' '),item.en];
 }else{
  pair=sentences[Math.floor(Math.random()*sentences.length)];
 }
 sentenceTarget=pair[0].split(' ');sentenceChosen=[];sentenceChosenIds=[];
 let shuffled=sentenceTarget.map((w,i)=>({w,i})).sort(()=>Math.random()-.5);
 const nextAction=sentenceRound?'advanceSentenceRound()':'sentencePractice()';
 const backAction='dlBuildModeMenu()';
 const counter=sentenceRound?`<p class="muted">Translate into German · ${sentenceRound.idx+1} of ${sentenceRound.seq.length}</p><div class="game-progress"><div style="width:${sentenceRound.idx/sentenceRound.seq.length*100}%"></div></div>`:'';
 app.innerHTML=`<section class="card dl-build-shared-layout dl-sentence-english-style">${counter}<p class="dl-sentence-instruction">Build the German translation:</p><div class="dl-sentence-prompt"><strong>${safeText(pair[1])}</strong></div><div id="sentenceBuilt" class="bubble">Tap the German words below</div><div id="sentenceTiles" class="dl-sentence-bank">${shuffled.map(x=>`<button class="secondary" id="word${x.i}" onclick="chooseSentenceWord(${x.i},${JSON.stringify(x.w).replace(/"/g,'&quot;')})">${safeText(x.w.replace(/[.!?]+$/,''))}</button>`).join('')}</div><div id="sentenceFeedback" aria-live="assertive"></div><div class="dl-sentence-edit-actions"><button type="button" class="secondary" onclick="undoSentenceWord()">↶ Undo last word</button><button type="button" class="secondary" onclick="resetSentenceWords()">↺ Start over</button></div><button class="secondary" onclick="dlSentenceHelpToggle()">Show grammar help</button><div id="dlSentenceHelp" class="explain-box" hidden></div></section><div id="dl-sentence-next-dock"><button type="button" class="secondary" onclick="${backAction}">Back</button><button type="button" id="dl-sentence-next-button" onclick="dlSentenceCheckOrNext()">Check</button></div>`;
 window.scrollTo(0,0);
}
function dlSentenceCheckOrNext(){
 const next=document.getElementById('dl-sentence-next-button');
 if(next?.dataset.answered==='true'){if(sentenceRound)advanceSentenceRound();else sentencePractice();return;}
 const nextButton=document.getElementById('dl-sentence-next-button');
 if(nextButton)nextButton.title='Tap all the words to check your sentence.';
}
function advanceSentenceRound(){if(sentenceRound)sentenceRound.idx++;sentencePractice()}
function exitSentenceRound(){sentenceRound=null;practiceHub()}
function updateSentenceBuilt(){
 const el=document.getElementById('sentenceBuilt');if(!el)return;
 el.textContent=sentenceChosen.length?sentenceChosen.map(w=>w.replace(/[.!?]+$/,'')).join(' '):'Tap words below…';
}
function removeSentenceWord(n){
 if(document.getElementById('sentenceFeedback')?.innerHTML)return;
 const id=sentenceChosenIds.splice(n,1)[0];sentenceChosen.splice(n,1);
 const tile=document.getElementById('word'+id);if(tile)tile.disabled=false;
 updateSentenceBuilt();
}
function undoSentenceWord(){if(sentenceChosen.length)removeSentenceWord(sentenceChosen.length-1)}
function resetSentenceWords(){
 if(document.getElementById('sentenceFeedback')?.innerHTML)return;
 sentenceChosen=[];sentenceChosenIds=[];
 document.querySelectorAll('#sentenceTiles button').forEach(b=>b.disabled=false);
 updateSentenceBuilt();
}
// Accept vetted grammatical variants, never arbitrary permutations of words.
const SENTENCE_VALID_ALTERNATIVES={
 'Ich muss heute Brot kaufen':['Heute muss ich Brot kaufen'],
 'Heute gehe ich einkaufen':['Ich gehe heute einkaufen'],
 'Morgen rufe ich dich an':['Ich rufe dich morgen an'],
 'Morgen kaufe ich Äpfel':['Ich kaufe morgen Äpfel'],
 'Ich trinke morgens Wasser':['Morgens trinke ich Wasser'],
 'Die Kinder spielen draußen':['Draußen spielen die Kinder'],
 'Wir essen Brot und Käse':['Brot und Käse essen wir'],
 'Ich suche meine Schlüssel':['Meine Schlüssel suche ich'],
 'Der Hund sitzt unter dem Tisch':['Unter dem Tisch sitzt der Hund'],
 'Die Katze schläft auf dem Sofa':['Auf dem Sofa schläft die Katze'],
 'Die Katze schläft auf dem Bett':['Auf dem Bett schläft die Katze'],
 'Wir gehen zum Bahnhof':['Zum Bahnhof gehen wir'],
 'Mein Bruder hat ein Fahrrad':['Ein Fahrrad hat mein Bruder'],
 'Sie liest ein Buch':['Ein Buch liest sie'],
 'Ich habe einen Hund':['Einen Hund habe ich'],
 'Wir lernen Deutsch':['Deutsch lernen wir']
};
function normalizeSentenceAnswer(words){
 return words.join(' ').replace(/[.!?]+$/,'').replace(/\\s+/g,' ').trim().toLocaleLowerCase('de-DE');
}
function sentenceAnswerIsCorrect(chosen,target){
 const canonical=target.join(' ').replace(/[.!?]+$/,'').trim();
 const actual=normalizeSentenceAnswer(chosen);
 return [canonical,...(SENTENCE_VALID_ALTERNATIVES[canonical]||[])].some(candidate=>normalizeSentenceAnswer([candidate])===actual);
}
function dlSentenceMistakeHint(chosen,target){
 const actual=chosen.map(w=>w.replace(/[.!?]+$/,''));
 const correct=target.map(w=>w.replace(/[.!?]+$/,''));
 const first=actual.findIndex((word,i)=>word!==correct[i]);
 if(first<0)return '';
 const verbWords=['bin','bist','ist','sind','seid','war','waren','habe','hast','hat','haben','habt','werde','wird','werden','kann','kannst','können','muss','musst','müssen','will','willst','wollen','gehe','gehst','geht','gehen','trinke','trinkst','trinkt','trinken','esse','isst','essen','mag','magst','mögen','spiele','spielt','spielen','lerne','lernt','lernen','kaufe','kauft','kaufen','lese','liest','lesen','schlafe','schläft','schlafen','suche','sucht','suchen'];
 const second=correct[1]?.toLocaleLowerCase('de-DE');
 const participle=correct[correct.length-1];
 if(verbWords.includes(second)&&actual.indexOf(correct[1])!==1){
  const extra=/^(ge.+(?:t|en)|.+iert)$/.test(participle||'')?' The past participle '+participle+' belongs at the end.':'';
  return 'The conjugated verb '+correct[1]+' belongs in second position, after '+correct[0]+'.'+extra;
 }
 const timeWords=['heute','morgen','gestern','morgens','abends','mittags','nachmittags','vormittags','oft','immer','manchmal','schon','jetzt','später'];
 const time=correct.find(w=>timeWords.includes(w.toLocaleLowerCase('de-DE')));
 if(time&&actual.indexOf(time)!==correct.indexOf(time))return 'The time expression '+time+' belongs '+(correct.indexOf(time)===0?'at the beginning':'after '+correct[correct.indexOf(time)-1])+ ' in this sentence.';
 if(correct.length>2&&/^(ge.+(?:t|en)|.+iert)$/.test(participle||'')&&actual.indexOf(participle)!==correct.length-1)return 'The past participle '+participle+' belongs at the end of this sentence.';
 return 'Put '+correct[first]+' '+(first===0?'at the beginning':'after '+correct[first-1])+'.';
}
function dlRenderSentenceFeedback(feedback,ok,correct,hint){
 if(!feedback)return;
 const image=ok?'feedback_correct_dog.png':'feedback_incorrect_cat.png';
 const detail=ok?'':`<p>Correct: ${safeText(correct)}</p>${hint?`<p class="dl-sentence-hint"><b>Why?</b> ${safeText(hint)}</p>`:''}`;
 feedback.innerHTML=`<div class="dl-sentence-result"><div class="dl-sentence-character"><img src="./${image}" alt="" onerror="this.style.display='none'"><strong>${ok?'Well done!':'Not quite.'}</strong></div>${detail}</div>`;
 feedback.classList.add('dl-sentence-feedback-visible');
}
function chooseSentenceWord(i,w){
 if(sentenceChosenIds.includes(i)||document.getElementById('sentenceFeedback')?.innerHTML)return;
 sentenceChosen.push(w);sentenceChosenIds.push(i);
 try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(w.replace(/[.!?]+$/,''));utterance.lang='de-DE';utterance.rate=0.84;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('de'));if(voice)utterance.voice=voice;speechSynthesis.speak(utterance)}catch(e){}
 document.getElementById('word'+i).disabled=true;updateSentenceBuilt();
 if(sentenceChosen.length===sentenceTarget.length){
  let ok=sentenceAnswerIsCorrect(sentenceChosen,sentenceTarget);
  practiceLog(ok?10:2);
  if(sentenceRound&&ok)sentenceRound.correct++;
  const feedback=document.getElementById('sentenceFeedback');
  if(feedback){
   dlRenderSentenceFeedback(feedback,ok,sentenceTarget.join(' '),ok?'':dlSentenceMistakeHint(sentenceChosen,sentenceTarget));
   const card=feedback.closest('.dl-sentence-english-style');
   if(card){card.classList.add('dl-sentence-answered');card.querySelectorAll('#sentenceTiles,.dl-sentence-edit-actions,button[onclick="dlSentenceHelpToggle()"],#dlSentenceHelp').forEach(el=>el.remove());}
  }
  document.getElementById('sentenceTiles')?.classList.add('dl-sentence-completed');
  document.querySelector('.dl-sentence-edit-actions')?.classList.add('dl-sentence-completed');
  const nextButton=document.getElementById('dl-sentence-next-button');if(nextButton){nextButton.textContent='Next';nextButton.dataset.answered='true';}
  if(ok){
   // Start the chime directly from the word-tap gesture, rather than waiting on speech synthesis.
   try{
    const C=window.AudioContext||window.webkitAudioContext;
    if(C){
     const ctx=window.dlSentenceChimeCtx||(window.dlSentenceChimeCtx=new C());
     if(ctx.state==='suspended')ctx.resume();
     const start=ctx.currentTime+.025;
     [[523.25,0,.12],[659.25,.14,.2]].forEach(([hz,offset,duration])=>{
      const osc=ctx.createOscillator(),gain=ctx.createGain(),t=start+offset;
      osc.type='sine';osc.frequency.value=hz;
      gain.gain.setValueAtTime(.0001,t);
      gain.gain.exponentialRampToValueAtTime(.16,t+.015);
      gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
      osc.connect(gain);gain.connect(ctx.destination);osc.start(t);osc.stop(t+duration+.01);
     });
    }else window.deutschLabCorrectChime?.(true);
   }catch(e){window.deutschLabCorrectChime?.(true)}
  }else {try{dlWrongHaptic()}catch(e){}}
 }
}
const oldPersonalHome=home;home=function(){oldPersonalHome();let p=practiceState(),today=p.activity[new Date().toLocaleDateString('en-CA')]||0;app.insertAdjacentHTML('afterbegin',`<section class="card"><h2>Daily practice</h2><p>${today}/30 XP today · ${practiceStreak()}-day streak</p><button onclick="practiceHub()">Open practice hub</button></section>`)};
let menu=document.getElementById('sideMenu');let practiceButton=document.createElement('button');practiceButton.textContent='✦ Practice Hub';practiceButton.setAttribute('onclick',"navigateTo('practiceHub')");let reviewButton=[...menu.querySelectorAll('button')].find(x=>x.textContent.includes('Review'));if(reviewButton)reviewButton.before(practiceButton);else menu.appendChild(practiceButton);
home();
