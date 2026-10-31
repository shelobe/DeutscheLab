
const GAME_ITEMS=[
{en:'The cat sleeps on the bed.',de:'Die Katze schläft auf dem Bett.',tokens:['Die','Katze','schläft','auf','dem','Bett.']},
{en:'I drink water in the morning.',de:'Ich trinke morgens Wasser.',tokens:['Ich','trinke','morgens','Wasser.']},
{en:'We are going to the train station.',de:'Wir gehen zum Bahnhof.',tokens:['Wir','gehen','zum','Bahnhof.']},
{en:'My brother has a bicycle.',de:'Mein Bruder hat ein Fahrrad.',tokens:['Mein','Bruder','hat','ein','Fahrrad.']},
{en:'Tomorrow I am buying apples.',de:'Morgen kaufe ich Äpfel.',tokens:['Morgen','kaufe','ich','Äpfel.']},
{en:'She is reading a book.',de:'Sie liest ein Buch.',tokens:['Sie','liest','ein','Buch.']},
{en:'The children are playing outside.',de:'Die Kinder spielen draußen.',tokens:['Die','Kinder','spielen','draußen.']},
{en:'I am looking for my keys.',de:'Ich suche meine Schlüssel.',tokens:['Ich','suche','meine','Schlüssel.']},
{en:'We are eating bread and cheese.',de:'Wir essen Brot und Käse.',tokens:['Wir','essen','Brot','und','Käse.']},
{en:'The dog is sitting under the table.',de:'Der Hund sitzt unter dem Tisch.',tokens:['Der','Hund','sitzt','unter','dem','Tisch.']}
];
const LISTENING_LEVELS={
 A1:[
 ['I live in a small house.','Ich wohne in einem kleinen Haus.'],['Where is the train station?','Wo ist der Bahnhof?'],['I would like a glass of water.','Ich möchte ein Glas Wasser.'],['My name is Anna.','Ich heiße Anna.'],['Today is Monday.','Heute ist Montag.'],['The book is on the table.','Das Buch liegt auf dem Tisch.'],['Do you have a dog?','Hast du einen Hund?'],['We are cooking dinner.','Wir kochen Abendessen.'],['I am going to the supermarket.','Ich gehe zum Supermarkt.'],['The weather is nice today.','Das Wetter ist heute schön.'],['She has two brothers.','Sie hat zwei Brüder.'],['I am learning German.','Ich lerne Deutsch.']],
 A2:[
 ['Yesterday I visited my friend.','Gestern habe ich meinen Freund besucht.'],['I missed the bus this morning.','Ich habe heute Morgen den Bus verpasst.'],['We are meeting at six o’clock.','Wir treffen uns um sechs Uhr.'],['Can you help me with this bag?','Kannst du mir mit dieser Tasche helfen?'],['She has worked here for two years.','Sie arbeitet seit zwei Jahren hier.'],['I have to buy groceries after work.','Ich muss nach der Arbeit einkaufen.'],['When I have time, I read books.','Wenn ich Zeit habe, lese ich Bücher.'],['The jacket is too expensive for me.','Die Jacke ist mir zu teuer.'],['We went for a walk despite the rain.','Trotz des Regens sind wir spazieren gegangen.'],['I would like to reserve a table.','Ich möchte einen Tisch reservieren.'],['He forgot his keys at home.','Er hat seine Schlüssel zu Hause vergessen.'],['I am looking forward to the weekend.','Ich freue mich auf das Wochenende.']],
 B1:[
 ['Although it was raining, we went outside.','Obwohl es geregnet hat, sind wir nach draußen gegangen.'],['I hope that you feel better soon.','Ich hoffe, dass du dich bald besser fühlst.'],['The more I practice, the easier it becomes.','Je mehr ich übe, desto leichter wird es.'],['If I had more time, I would travel more.','Wenn ich mehr Zeit hätte, würde ich mehr reisen.'],['She explained why she was late.','Sie hat erklärt, warum sie zu spät gekommen ist.'],['We decided to move to another city.','Wir haben beschlossen, in eine andere Stadt zu ziehen.'],['He is interested in learning new languages.','Er interessiert sich dafür, neue Sprachen zu lernen.'],['I forgot to turn off the light.','Ich habe vergessen, das Licht auszuschalten.'],['After I finished work, I went shopping.','Nachdem ich die Arbeit beendet hatte, ging ich einkaufen.'],['Could you tell me how to get there?','Könnten Sie mir sagen, wie ich dorthin komme?'],['It depends on how much time we have.','Es hängt davon ab, wie viel Zeit wir haben.'],['I am trying to make fewer mistakes.','Ich versuche, weniger Fehler zu machen.']],
 B2:[
 ['The proposal discussed yesterday will be revised.','Der Vorschlag, der gestern besprochen wurde, wird überarbeitet.'],['Had I known earlier, I would have helped.','Hätte ich es früher gewusst, hätte ich geholfen.'],['Despite the difficulties, the project succeeded.','Trotz der Schwierigkeiten war das Projekt erfolgreich.'],['The decision should be reconsidered carefully.','Die Entscheidung sollte sorgfältig überdacht werden.'],['It is essential to consider different perspectives.','Es ist wichtig, unterschiedliche Perspektiven zu berücksichtigen.'],['She managed to solve the problem independently.','Es ist ihr gelungen, das Problem selbstständig zu lösen.'],['The report must be submitted by Friday.','Der Bericht muss bis Freitag eingereicht werden.'],['He spoke as though he knew everything.','Er sprach, als ob er alles wüsste.'],['The company plans to expand internationally.','Das Unternehmen plant, international zu expandieren.'],['The results were better than expected.','Die Ergebnisse waren besser als erwartet.'],['We should weigh the advantages and disadvantages.','Wir sollten die Vor- und Nachteile abwägen.'],['The situation has changed significantly.','Die Situation hat sich erheblich verändert.']]
};
// Additional level-appropriate listening prompts, including questions, requests, and everyday situations.
LISTENING_LEVELS.A1.push(
 ['The coffee is hot.','Der Kaffee ist heiß.'],
 ['I need a pen.','Ich brauche einen Stift.'],
 ['What time is it?','Wie spät ist es?'],
 ['My sister lives in Berlin.','Meine Schwester wohnt in Berlin.'],
 ['The children are in the garden.','Die Kinder sind im Garten.'],
 ['We have three cats.','Wir haben drei Katzen.'],
 ['I do not like onions.','Ich mag keine Zwiebeln.'],
 ['Are you coming tomorrow?','Kommst du morgen?'],
 ['The supermarket is closed.','Der Supermarkt ist geschlossen.'],
 ['Please open the window.','Mach bitte das Fenster auf.'],
 ['I eat breakfast at eight.','Ich frühstücke um acht Uhr.'],
 ['Where is my phone?','Wo ist mein Handy?'],
 ['She is wearing a red jacket.','Sie trägt eine rote Jacke.'],
 ['We are drinking tea.','Wir trinken Tee.'],
 ['The bathroom is upstairs.','Das Badezimmer ist oben.'],
 ['He works in a restaurant.','Er arbeitet in einem Restaurant.'],
 ['I am tired today.','Ich bin heute müde.'],
 ['Do you speak English?','Sprichst du Englisch?'],
 ['My birthday is in June.','Mein Geburtstag ist im Juni.'],
 ['The bus comes at nine.','Der Bus kommt um neun Uhr.'],
 ['I am writing an email.','Ich schreibe eine E-Mail.'],
 ['The dog is sleeping.','Der Hund schläft.'],
 ['How much does the bread cost?','Wie viel kostet das Brot?'],
 ['I have no time today.','Ich habe heute keine Zeit.']
);
LISTENING_LEVELS.A2.push(
 ['I have already finished my homework.','Ich habe meine Hausaufgaben schon gemacht.'],
 ['We moved here last summer.','Wir sind letzten Sommer hierhergezogen.'],
 ['Could you speak a little more slowly?','Könntest du etwas langsamer sprechen?'],
 ['I stayed home because I was sick.','Ich bin zu Hause geblieben, weil ich krank war.'],
 ['She wants to learn how to drive.','Sie möchte Autofahren lernen.'],
 ['Have you ever been to Munich?','Warst du schon einmal in München?'],
 ['I will call you after dinner.','Ich rufe dich nach dem Abendessen an.'],
 ['We need to leave earlier tomorrow.','Wir müssen morgen früher losfahren.'],
 ['I bought a present for my mother.','Ich habe ein Geschenk für meine Mutter gekauft.'],
 ['Can I try on these shoes?','Kann ich diese Schuhe anprobieren?'],
 ['The train arrives ten minutes late.','Der Zug kommt zehn Minuten zu spät an.'],
 ['He has been waiting for half an hour.','Er wartet seit einer halben Stunde.'],
 ['I am happy because the sun is shining.','Ich freue mich, weil die Sonne scheint.'],
 ['We should clean the kitchen today.','Wir sollten heute die Küche putzen.'],
 ['She put the keys on the table.','Sie hat die Schlüssel auf den Tisch gelegt.'],
 ['I cannot come because I have to work.','Ich kann nicht kommen, weil ich arbeiten muss.'],
 ['Do you know where the pharmacy is?','Weißt du, wo die Apotheke ist?'],
 ['I would rather drink coffee than tea.','Ich trinke lieber Kaffee als Tee.'],
 ['After breakfast, I went for a walk.','Nach dem Frühstück bin ich spazieren gegangen.'],
 ['We have not seen each other for a long time.','Wir haben uns lange nicht gesehen.'],
 ['The apartment has a large balcony.','Die Wohnung hat einen großen Balkon.'],
 ['I need to make an appointment.','Ich muss einen Termin vereinbaren.'],
 ['Please tell me when you arrive.','Sag mir bitte, wann du ankommst.'],
 ['She learned German at school.','Sie hat in der Schule Deutsch gelernt.']
);
const LISTENING_ITEMS=Object.fromEntries(Object.entries(LISTENING_LEVELS).map(([level,rows])=>[level,rows.map(([en,de])=>({en,de,tokens:de.split(' ')}))]));
function listeningLevels(){
 gameSession=null;
 app.innerHTML='<section class="card"><h2>Listening challenge</h2><p>Choose your German level. Listen to a sentence and identify its meaning or its written German form.</p><div class="game-grid">'+Object.keys(LISTENING_ITEMS).map(level=>'<button type="button" data-listening-level="'+level+'">'+level+'<br><small>'+({A1:'Beginner',A2:'Elementary',B1:'Intermediate',B2:'Upper intermediate'}[level])+'</small></button>').join('')+'</div><button class="secondary" onclick="gameHub()">Back to practice games</button></section>';
 window.scrollTo(0,0);
}
document.addEventListener('click',function(e){
 const button=e.target.closest('[data-listening-level]');
 if(!button)return;
 e.preventDefault();
 const level=button.getAttribute('data-listening-level');
 if(LISTENING_ITEMS[level])gameStart('listen',level);
});
function listeningSpeak(t,slow=false){
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=slow?0.7:0.84;u.pitch=1;const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang.toLowerCase()==='de-de'&&v.localService)||voices.find(v=>v.lang.toLowerCase().startsWith('de'));if(voice)u.voice=voice;speechSynthesis.speak(u)}catch(e){speak(t)}
}
let gameSession=null;
function gameHub(){
 gameSession=null;
 let stats=state.gameStats||{played:0,correct:0};
 app.innerHTML=illustratedHero('Practice games','Short, varied activities to build German skills.','village','hund.png')+
 `<section class="card"><h2>Choose an activity</h2><p class="muted">${stats.played} answers · ${stats.correct} correct</p><div class="game-grid">
 <button onclick="gameStart(&quot;build&quot;)">🧩 Build a sentence<br><small>Tap words in order</small></button>
 <button onclick="gameStart(&quot;match&quot;)">🔗 Match the pairs<br><small>German ↔ English</small></button>
 <button onclick="listeningLevels()">🔊 Listen and choose<br><small>Hear German phrases</small></button>
 <button onclick="pictureHome()">🖼️ Name the picture<br><small>Choose or type</small></button></div>
 <p class="muted">Exercises use different sentences from the lesson examples.</p></section>`;
 window.scrollTo(0,0);
}
function gameStart(mode,level){
 if(mode==='listen'&&!level)return listeningLevels();
 let seq=[...(mode==='listen'?LISTENING_ITEMS[level]:GAME_ITEMS).keys()];
 if(mode==='listen'){
  // Prioritize unseen questions across rounds, while keeping each round randomized.
  const key='dl-listening-recent-'+level;
  let recent=[];try{recent=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}
  if(!Array.isArray(recent))recent=[];
  const fresh=seq.filter(i=>!recent.includes(i)),older=seq.filter(i=>recent.includes(i));
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  seq=[...shuffle(fresh),...shuffle(older)];
  const chosen=seq.slice(0,6);
  try{localStorage.setItem(key,JSON.stringify([...recent,...chosen].slice(-24)))}catch(e){}
  seq=chosen;
 }
 if(mode==='build'){
  // A graded six-question round: short main clauses first, then modestly longer ones.
  // Exclude advanced constructions from beginner sentence practice.
  const complexity=i=>{
   const item=GAME_ITEMS[i],de=item.de||item.tokens.join(' ');
   const count=item.tokens.length;
   if(count>8||/\\b(?:anstatt|stattdessen|obwohl|während|sollten|hätten|würden|könnten|damit|dennoch|allerdings|vermutungen|beweise)\\b/i.test(de))return 99;
   return count+( /\\b(?:weil|dass|wenn|würde|hätte|wäre)\\b/i.test(de)?5:0);
  };
  const eligible=seq.filter(i=>complexity(i)<9);
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const short=shuffle(eligible.filter(i=>complexity(i)<=4));
  const medium=shuffle(eligible.filter(i=>complexity(i)>4&&complexity(i)<=6));
  const longer=shuffle(eligible.filter(i=>complexity(i)>6));
  const chosen=[...short.slice(0,3),...medium.slice(0,2),...longer.slice(0,1)];
  const remainder=shuffle(eligible.filter(i=>!chosen.includes(i))).sort((a,b)=>complexity(a)-complexity(b));
  seq=[...chosen,...remainder].slice(0,6).sort((a,b)=>complexity(a)-complexity(b));
 }else{
  for(let i=seq.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[seq[i],seq[j]]=[seq[j],seq[i]]}
 }
 gameSession={mode,level:level||null,pool:mode==='listen'?LISTENING_ITEMS[level]:GAME_ITEMS,seq:seq.slice(0,6),idx:0,correct:0,answered:false,picked:[],matches:[],selected:null};
 gameRender();
}
function gameRender(){
 let g=gameSession;if(!g)return gameHub();
 if(g.idx>=g.seq.length){
  app.innerHTML=illustratedHero('Round complete!',`${g.correct} of ${g.seq.length} correct.`,'forest','katze.png')+
  `<section class="card"><h2>${g.correct}/${g.seq.length} correct</h2><button onclick="gameStart('${g.mode}'${g.mode==='listen'?`, '${g.level}'`:''})">Try another round</button><button class="secondary" onclick="gameHub()">All practice games</button></section>`;window.scrollTo(0,0);return;
 }
 g.answered=false;g.picked=[];g.matches=[];g.selected=null;
 let item=g.pool[g.seq[g.idx]],body='';
 if(g.mode==='build'){
 let order=[...item.tokens.keys()].sort(()=>Math.random()-.5);
 g.order=order;
 body=`<p>Build this sentence in German:</p><h3>${safeText(item.en)}</h3><div id="gameBuilt" class="game-built">Tap the words below ↓</div><div id="gameBank" class="game-wordbank">${order.map((n,i)=>`<button class="secondary" id="gb${i}" onclick="gamePick(${i})">${safeText(item.tokens[n].replace(/[.!?]+$/,""))}</button>`).join('')}</div><button class="secondary" onclick="gameRender()">Start over</button><button onclick="gameCheckBuild()">Check sentence</button><button class="secondary" onclick="dlSentenceHelpToggle()">Show grammar help</button><div id="dlSentenceHelp" class="explain-box" hidden></div>`;
 }else if(g.mode==='listen'){
 let other=[...g.pool.keys()].filter(i=>i!==g.seq[g.idx]).sort(()=>Math.random()-.5).slice(0,3);
 let choices=[g.seq[g.idx],...other].sort(()=>Math.random()-.5);g.choices=choices;
 g.listenWritten=(g.idx%2===1);
 body=`<h3>${g.listenWritten?'Which German sentence do you hear?':'What does the German sentence mean?'}</h3><button onclick="listeningSpeak(${JSON.stringify(item.de).replace(/"/g,'&quot;')})">🔊 Play German audio</button><div class="picture-choices">${choices.map((i,n)=>`<button class="secondary" onclick="gameChoose(${n})">${safeText(g.listenWritten?g.pool[i].de:g.pool[i].en)}</button>`).join('')}</div>`;
 }else{
 let pairA=PICTURE_WORDS.slice((g.seq[g.idx]*3)%24,(g.seq[g.idx]*3)%24+4);
 g.pairs=pairA;g.left=pairA.map((w,i)=>i).sort(()=>Math.random()-.5);g.right=pairA.map((w,i)=>i).sort(()=>Math.random()-.5);
 body=`<p>Match each German noun to its English meaning.</p><p id="gameMatched">0 / 4 pairs matched</p><div class="match-columns"><div class="match-column">${g.left.map(i=>`<button class="secondary match-tile" id="gl${i}" onclick="gameMatch('l',${i})">${safeText(pairA[i][0])}</button>`).join('')}</div><div class="match-column">${g.right.map(i=>`<button class="secondary match-tile" id="gr${i}" onclick="gameMatch('r',${i})">${safeText(pairA[i][1])}</button>`).join('')}</div></div>`;
 }
 app.innerHTML=`<section class="card"><p class="muted">${g.mode==='build'?'Sentence builder':g.mode==='listen'?'Listening challenge':'Word matching'} · ${g.idx+1} of ${g.seq.length}</p><div class="game-progress"><div style="width:${g.idx/g.seq.length*100}%"></div></div>${body}<div id="gameFeedback" aria-live="polite"></div></section>`;
 if(g.mode==='listen')listeningSpeak(item.de);
 window.scrollTo(0,0);
}
function gamePick(n){let g=gameSession;if(g.answered||g.picked.includes(n))return;g.picked.push(n);document.getElementById('gb'+n).disabled=true;document.getElementById('gameBuilt').textContent=g.picked.map(i=>GAME_ITEMS[g.seq[g.idx]].tokens[g.order[i]]).join(' ').replace(/[.!?]+(?=\s|$)/g,'')}
function gameCheckBuild(){let g=gameSession;if(g.answered)return;let item=GAME_ITEMS[g.seq[g.idx]],guess=g.picked.map(i=>item.tokens[g.order[i]]).join(' ');if(g.picked.length!==item.tokens.length){document.getElementById('gameFeedback').textContent='Use all the words first.';return}gameMark(guess.replace(/[.!?]+(?=\s|$)/g,'').trim()===item.de.replace(/[.!?]+(?=\s|$)/g,'').trim(),item.de)}
function gameChoose(n){let g=gameSession;if(g.answered)return;let item=g.pool[g.seq[g.idx]];gameMark(g.choices[n]===g.seq[g.idx],item.de+' — '+item.en)}
function dlWrongHaptic(){try{if(navigator.vibrate)navigator.vibrate(110)}catch(e){}}
function gameMatch(side,n){
 let g=gameSession;if(!g||g.answered||g.matches.includes(n))return;
 // Pronounce the German noun whenever its tile is selected, regardless of selection order.
 if(side==='l' && g.pairs && g.pairs[n])speak(g.pairs[n][0]);
 if(g.selected===null){g.selected={side,n};document.getElementById((side==='l'?'gl':'gr')+n).style.outline='3px solid #f4d487';return}
 let a=g.selected;document.getElementById((a.side==='l'?'gl':'gr')+a.n).style.outline='';
 g.selected=null;if(a.side===side){g.selected={side,n};document.getElementById((side==='l'?'gl':'gr')+n).style.outline='3px solid #f4d487';return}
 if(a.n===n){g.matches.push(n);document.getElementById('gl'+n).disabled=true;document.getElementById('gr'+n).disabled=true;document.getElementById('gl'+n).classList.add('match-complete');document.getElementById('gr'+n).classList.add('match-complete');document.getElementById('gameMatched').textContent=g.matches.length+' / 4 pairs matched';if(g.matches.length===g.pairs.length){
  // Remove only this completed matching bank before rendering feedback.
  document.getElementById('gameMatched')?.nextElementSibling?.remove();
  gameMark(true,'All four pairs matched!');
 }}
 else{dlWrongHaptic();document.getElementById('gameFeedback').textContent='Not a match. Try another pair.'}
}
function dlReverseGrammarNote(de){
 if(/\bdieses\s+(Buch|Kind|Haus|Auto|Mädchen|Zimmer|Wort)\b/i.test(de))return '<p class="dl-reverse-grammar"><strong>Why dieses?</strong> <em>Buch</em> is neuter (<em>das Buch</em>). The ending <em>-es</em> is used with a neuter noun in the nominative or accusative case.</p>';
 return '';
}
function gameMark(ok,answer){
 if(!ok)dlWrongHaptic();
 let g=gameSession;if(!g||g.answered)return;g.answered=true;if(ok)g.correct++;
 state.gameStats??={played:0,correct:0};state.gameStats.played++;if(ok)state.gameStats.correct++;save();
 app.querySelectorAll('.card button').forEach(b=>b.disabled=true);
 document.getElementById('gameFeedback').innerHTML=`<div class="game-feedback"><strong>${ok?'Correct!':'Not quite.'}</strong>${g.mode==='reverse'?(ok?dlReverseGrammarNote(GAME_ITEMS[g.seq[g.idx]].de):`<p>Correct translation: ${safeText(answer)}</p>`):`<p>${safeText(answer)}</p>`}${g.mode==='build'&&ok?'<button class="secondary" onclick="speak(GAME_ITEMS[gameSession.seq[gameSession.idx]].de)">🔊 Replay sentence</button>':''}<button onclick="gameNext()">Next</button></div>`;if(g.mode==='build'&&ok)setTimeout(()=>{if(gameSession===g&&g.answered)speak(GAME_ITEMS[g.seq[g.idx]].de)},350);if(g.mode==='match'){document.getElementById('gameFeedback').scrollIntoView({behavior:'smooth',block:'nearest'});}
}
function gameNext(){if(!gameSession)return;gameSession.idx++;gameRender()}

/* Keep the next action reachable on mobile after checking a reverse translation. */
(function(){
 const style=document.createElement('style');
 style.textContent=`body.dl-reverse-answered #app{padding-bottom:110px!important}
 body.dl-reverse-answered #gameFeedback button[onclick="gameNext()"]{display:none!important}
 #dlReverseNextBar{position:fixed;bottom:env(safe-area-inset-bottom, 0px);left:0;right:0;z-index:9999;padding:10px 18px calc(10px + env(safe-area-inset-bottom, 0px));background:linear-gradient(0deg,#112c38 85%,rgba(17,44,56,.93));box-sizing:border-box}
 #dlReverseNextBar button{display:block;width:min(100%,680px);margin:auto;min-height:54px;background:#68cbbc;color:#102b32;border:0;border-radius:12px;font-size:18px;font-weight:700}`;
 document.head.appendChild(style);
 const originalMark=gameMark;
 gameMark=function(ok,answer){
  originalMark(ok,answer);
  const g=gameSession;
  if(!g||g.mode!=='reverse'||!g.answered)return;
  document.body.classList.add('dl-reverse-answered');
  document.getElementById('dlReverseNextBar')?.remove();
  const bar=document.createElement('div');bar.id='dlReverseNextBar';
  const button=document.createElement('button');button.textContent='Next';
  button.onclick=()=>{bar.remove();document.body.classList.remove('dl-reverse-answered');gameNext()};
  bar.appendChild(button);document.body.appendChild(bar);
 };
 const originalNext=gameNext;
 gameNext=function(){document.getElementById('dlReverseNextBar')?.remove();document.body.classList.remove('dl-reverse-answered');return originalNext()};
 const originalRender=gameRender;
 gameRender=function(){document.getElementById('dlReverseNextBar')?.remove();document.body.classList.remove('dl-reverse-answered');return originalRender()};
})();

const gameHome=home;
home=function(){gameHome();let target=app.querySelector('.card');if(target){let b=document.createElement('section');b.className='card';b.innerHTML='<h3>Practice games</h3><p>Build sentences, match words and practice listening.</p><button onclick="gameHub()">Play practice games</button>';target.after(b)}};
let gameMenu=document.getElementById('sideMenu');if(gameMenu){let b=document.createElement('button');b.textContent='🧩 Practice games';b.onclick=()=>navigateTo('gameHub');gameMenu.appendChild(b)}
// Reuse the app's persistent top back button for the new screens.
const priorFixGameBack=window.setInterval(()=>{
 const b=document.getElementById('screenBack');if(!b)return;
 if(gameSession || app.textContent.includes('Choose an activity')){
  b.style.display='inline-flex';b.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();if(gameSession)gameHub();else home();window.scrollTo(0,0)};
 }
},300);
