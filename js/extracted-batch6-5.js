
/* Reverse sentence builder: German prompt -> English word bank. */
const dlOriginalGameHubReverse = gameHub;
gameHub = function(){
  dlOriginalGameHubReverse();
  const grid=app.querySelector('.game-grid');
  if(grid){const b=document.createElement('button');b.innerHTML='Build in English<small style="display:block">Translate a German sentence</small>';b.onclick=()=>gameStart('reverse');grid.insertBefore(b,grid.children[1]||null);}
};
const dlOriginalGameRenderReverse = gameRender;
gameRender = function(){
  const g=gameSession;
  if(!g || g.mode!=='reverse')return dlOriginalGameRenderReverse();
  if(g.idx>=g.seq.length)return dlOriginalGameRenderReverse();
  g.answered=false;g.picked=[];g.matches=[];g.selected=null;
  const item=GAME_ITEMS[g.seq[g.idx]];
  g.reverseWords=item.en.replace(/[.!?]+$/,'').split(/\s+/);
  const correctSet=new Set(g.reverseWords.map(w=>w.toLowerCase()));
  const pool=['a','an','the','this','that','these','those','my','your','his','her','our','their','is','are','was','were','do','does','did','have','has','had','will','can','not','very','always','often','today','tomorrow','yesterday','here','there','with','for','from','to','at','in','on','and','but','because','book','books','house','school','work','like','likes','liked','learn','learning','learns','German','English','she','he','they','we','I','you'];
  const distractors=pool.filter(w=>!correctSet.has(w.toLowerCase()));
  for(let i=distractors.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[distractors[i],distractors[j]]=[distractors[j],distractors[i]];}
  g.bankWords=[...g.reverseWords,...distractors.slice(0,Math.min(3,Math.max(2,Math.ceil(g.reverseWords.length/3))))];
  g.order=g.bankWords.map((_,i)=>i);
  for(let i=g.order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[g.order[i],g.order[j]]=[g.order[j],g.order[i]];}
  app.innerHTML=`<section class="card"><p class="muted">Translate into English · ${g.idx+1} of ${g.seq.length}</p><div class="game-progress"><div style="width:${g.idx/g.seq.length*100}%"></div></div><p>Build the English translation:</p><h3>${safeText(item.de)}</h3><button class="secondary" onclick="speak(GAME_ITEMS[gameSession.seq[gameSession.idx]].de)">Listen to German</button><div id="gameBuilt" class="game-built">Tap the English words below</div><div class="dl-bank-label">WORD BANK</div><div id="gameBank" class="game-wordbank">${g.order.map((n,i)=>`<button class="secondary" id="gb${i}" onclick="dlReversePick(${i})">${safeText(g.bankWords[n])}</button>`).join('')}</div><div class="dl-reverse-controls"><button class="secondary" onclick="dlReverseUndo()">↶ Undo last word</button><button class="secondary" onclick="gameRender()">↺ Start over</button></div><button onclick="dlReverseCheck()">Check translation</button><div id="gameFeedback" aria-live="polite"></div></section>`;
  window.scrollTo(0,0);
};
function dlReversePick(i){
 const g=gameSession;if(!g||g.mode!=='reverse'||g.answered||g.picked.includes(i))return;
 g.picked.push(i);document.getElementById('gb'+i).disabled=true;dlReverseRefresh();
}
function dlReverseUndo(){
 const g=gameSession;if(!g||g.mode!=='reverse'||g.answered||!g.picked.length)return;
 const i=g.picked.pop();document.getElementById('gb'+i).disabled=false;dlReverseRefresh();
}
function dlReverseRefresh(){
 const g=gameSession;document.getElementById('gameBuilt').textContent=g.picked.map(i=>g.bankWords[g.order[i]]).join(' ')||'Tap the English words below';
}
function dlReverseCheck(){
 const g=gameSession;if(!g||g.mode!=='reverse'||g.answered)return;
 if(g.picked.length!==g.reverseWords.length){document.getElementById('gameFeedback').textContent='Select only the words needed for the translation.';return;}
 const guess=g.picked.map(i=>g.bankWords[g.order[i]]).join(' ');
 const expected=g.reverseWords.join(' ');
 gameMark(guess===expected,GAME_ITEMS[g.seq[g.idx]].en);
}
