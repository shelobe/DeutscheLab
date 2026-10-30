
/* DeutschLab Find It mini-game v1. Ten unique objects, three hearts, captioned Minka feedback. */
(function(){
const items=[
 {de:'die Lampe',en:'lamp',x:63,y:29,w:14,h:25},
 {de:'das Fenster',en:'window',x:35,y:15,w:22,h:30},
 {de:'das Buch',en:'book',x:73,y:72,w:16,h:6},
 {de:'der Stuhl',en:'chair',x:23,y:44,w:34,h:36},
 {de:'das Sofa',en:'sofa',x:71,y:44,w:29,h:28},
 {de:'die Pflanze',en:'plant',x:54,y:40,w:13,h:14},
 {de:'die Tasse',en:'cup',x:65,y:67,w:9,h:10},
 {de:'der Teppich',en:'rug',x:19,y:79,w:74,h:20},
 {de:'das Bild',en:'picture',x:78,y:11,w:21,h:29},
 {de:'die Katze',en:'cat',x:3,y:69,w:20,h:31}
];
const praises=[['Sehr gut!','Very good!'],['Richtig!','Correct!'],['Toll gemacht!','Well done!'],['Du hast es gefunden!','You found it!']];
let session=null,advance=null;
const scene=String.raw`<svg viewBox="0 0 600 620" role="img" aria-label="Illustrated living room with furniture, a lamp, books, a window, plants, a cup, a rug, a picture, and Minka the cat" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="fi-wall" x2="0" y2="1"><stop stop-color="#f2d6bc"/><stop offset="1" stop-color="#d6a88a"/></linearGradient><linearGradient id="fi-floor" x2="0" y2="1"><stop stop-color="#aa704c"/><stop offset="1" stop-color="#744d39"/></linearGradient><linearGradient id="fi-sky" x2="0" y2="1"><stop stop-color="#77b7d7"/><stop offset="1" stop-color="#f3c39a"/></linearGradient><linearGradient id="fi-sofa" x2="0" y2="1"><stop stop-color="#5b8c91"/><stop offset="1" stop-color="#315967"/></linearGradient><radialGradient id="fi-light"><stop stop-color="#ffe6a4" stop-opacity=".85"/><stop offset="1" stop-color="#ffe6a4" stop-opacity="0"/></radialGradient></defs>
<rect width="600" height="430" fill="url(#fi-wall)"/><path d="M0 0H600V48H0Z" fill="#986346"/><path d="M80 0L125 0 250 85 210 85Z M350 0L395 0 520 85 480 85Z" fill="#ad754d"/><path d="M0 405H600V620H0Z" fill="url(#fi-floor)"/><path d="M0 438H600M0 490H600M0 550H600" stroke="#d39a68" stroke-width="3" opacity=".5"/>
<!-- window --><rect x="199" y="94" width="159" height="237" rx="7" fill="#754b34"/><rect x="210" y="105" width="137" height="215" fill="url(#fi-sky)"/><path d="M210 252L251 204 275 229 307 185 347 231V320H210Z" fill="#6c9ea1"/><path d="M210 275L255 239 283 259 325 217 347 244V320H210Z" fill="#346f70"/><path d="M210 290Q247 263 276 289T347 281V320H210Z" fill="#255b53"/><path d="M278 105V320M210 213H347" stroke="#754b34" stroke-width="10"/><path d="M191 90Q170 160 184 330L205 330 207 90M358 90Q380 170 366 330L346 330 343 90" fill="#f9e6ca" stroke="#c6aa8c" stroke-width="4"/>
<!-- picture --><rect x="455" y="105" width="128" height="149" fill="#795038" rx="4"/><rect x="466" y="117" width="105" height="126" fill="#f7e4c7"/><rect x="477" y="127" width="84" height="105" fill="#a8c7c2"/><path d="M477 210L502 164 522 185 545 150 561 183V232H477Z" fill="#7396a0"/><path d="M477 225L508 193 531 207 561 181V232H477Z" fill="#4c7c67"/>
<!-- shelf --><rect x="17" y="129" width="135" height="354" rx="5" fill="#875b3d" stroke="#5b3828" stroke-width="7"/><path d="M24 215H145M24 309H145M24 405H145" stroke="#c48c5a" stroke-width="12"/><g fill="#526d76"><rect x="31" y="158" width="13" height="51"/><rect x="60" y="146" width="13" height="63"/><rect x="88" y="158" width="14" height="51"/><rect x="36" y="235" width="15" height="65"/><rect x="67" y="243" width="15" height="57"/><rect x="101" y="237" width="15" height="63"/><rect x="38" y="328" width="14" height="66"/><rect x="83" y="328" width="14" height="66"/></g><g fill="#e5b26e"><rect x="47" y="154" width="10" height="55"/><rect x="75" y="159" width="10" height="50"/><rect x="104" y="163" width="16" height="46"/><rect x="54" y="240" width="10" height="60"/><rect x="86" y="244" width="12" height="56"/><rect x="57" y="329" width="22" height="65"/></g><path d="M50 123Q32 92 52 75Q78 84 80 121Q95 83 115 92Q129 120 97 137Z" fill="#3c8655"/><rect x="66" y="126" width="30" height="17" fill="#d1a277"/>
<!-- rug --><ellipse cx="340" cy="548" rx="230" ry="66" fill="#e6d6bb" stroke="#f9edd9" stroke-width="12"/><ellipse cx="340" cy="548" rx="200" ry="47" fill="none" stroke="#a5b9b5" stroke-width="5" stroke-dasharray="8 12"/>
<!-- chair --><rect x="112" y="338" width="156" height="145" rx="48" fill="url(#fi-sofa)" stroke="#254e5a" stroke-width="7"/><rect x="119" y="424" width="156" height="81" rx="24" fill="#447782" stroke="#254e5a" stroke-width="7"/><rect x="107" y="415" width="39" height="92" rx="18" fill="#3c6e78"/><rect x="243" y="415" width="38" height="92" rx="18" fill="#3c6e78"/><path d="M142 501V529M247 501V529" stroke="#6c4937" stroke-width="13"/><path d="M161 410L213 393 232 451 178 463Z" fill="#d98665"/>
<!-- plant --><rect x="310" y="377" width="65" height="64" rx="8" fill="#b66c4e"/><path d="M342 382V313M343 352Q299 331 315 302Q350 305 343 352M345 343Q383 309 396 326Q390 357 345 343M343 331Q330 288 349 278Q372 309 343 331" fill="#3c8c61" stroke="#2f7554" stroke-width="4"/>
<!-- lamp glow --><circle cx="434" cy="340" r="126" fill="url(#fi-light)"/><rect x="382" y="436" width="111" height="21" rx="5" fill="#704b36"/><rect x="395" y="450" width="12" height="85" fill="#6e4934"/><rect x="474" y="450" width="12" height="85" fill="#6e4934"/><path d="M433 362V438" stroke="#6b4a2b" stroke-width="12"/><path d="M398 359L411 283H457L470 359Z" fill="#ffe5a1" stroke="#9e6b3c" stroke-width="5"/><ellipse cx="434" cy="363" rx="37" ry="7" fill="#a16e42"/>
<!-- sofa --><rect x="456" y="332" width="170" height="168" rx="45" fill="#9e9690" stroke="#746c68" stroke-width="7"/><rect x="460" y="419" width="166" height="81" rx="21" fill="#b0a6a0" stroke="#77716c" stroke-width="5"/><path d="M481 395L531 380 544 441 493 451Z" fill="#4e8383"/><path d="M545 393L590 382 605 442 558 450Z" fill="#e9c7a0"/>
<!-- table --><path d="M284 496L551 487 560 520 280 530Z" fill="#b37a4e" stroke="#6f4935" stroke-width="7"/><path d="M315 525L304 599M532 520L543 593" stroke="#784c36" stroke-width="15"/><path d="M326 570H535" stroke="#89583d" stroke-width="12"/>
<!-- cup and book --><path d="M342 477H377V505Q359 516 342 505Z" fill="#fff4df" stroke="#ac937d" stroke-width="3"/><path d="M375 481Q399 481 388 497Q385 503 377 498" fill="none" stroke="#fff4df" stroke-width="6"/><path d="M420 497L485 493 495 506 427 512Z" fill="#487b91" stroke="#f1e2c7" stroke-width="4"/>
<!-- trim --><path d="M0 402H600" stroke="#8b634b" stroke-width="12"/>
</svg>`;
function order(){return items.slice().sort(()=>Math.random()-.5)}
const extraFindItZones=[
 {item:2,x:5,y:17,w:14,h:16}, /* upper bookshelf */
 {item:2,x:5,y:34,w:14,h:14}, /* lower bookshelf */
 {item:2,x:10,y:49,w:9,h:7}, /* stacked books on shelf */
 {item:5,x:0,y:0,w:20,h:26}, /* hanging plant, upper left */
 {item:5,x:0,y:40,w:16,h:23}, /* leafy plant, lower left */
 {item:5,x:3,y:3,w:23,h:27}, /* plant on upper-left shelf: full foliage and pot */
 {item:7,x:0,y:91,w:46,h:9} /* left corner of rug */
];
const kitchenItems=[
 {de:'der Kühlschrank',en:'refrigerator',x:13,y:14,w:18,h:64},
 {de:'das Fenster',en:'window',x:63,y:5,w:19,h:34},
 {de:'die Lampe',en:'lamp',x:48,y:0,w:8,h:19},
 {de:'die Spüle',en:'sink',x:54,y:47,w:29,h:18},
 {de:'der Wasserhahn',en:'faucet',x:68,y:33,w:7,h:14},
 {de:'der Herd',en:'stove',x:82,y:47,w:18,h:37},
 {de:'der Wasserkocher',en:'kettle',x:89,y:36,w:8,h:12},
 {de:'der Tisch',en:'table',x:22,y:63,w:51,h:34},
 {de:'der Stuhl',en:'chair',x:58,y:50,w:23,h:45},
 {de:'die Sonnenblume',en:'sunflower',x:43,y:40,w:12,h:25}
];
const kitchenExtraZones=[
 {item:9,x:46,y:40,w:8,h:22},
 {item:9,x:51,y:43,w:5,h:18}
];
const bathroomItems=[
 {de:'die Badewanne',en:'bathtub',x:31,y:42,w:27,h:22},
 {de:'das Fenster',en:'window',x:27,y:5,w:17,h:31},
 {de:'der Spiegel',en:'mirror',x:1,y:2,w:19,h:34},
 {de:'die Dusche',en:'shower',x:78,y:1,w:22,h:83},
 {de:'das Waschbecken',en:'sink',x:1,y:43,w:31,h:10},
 {de:'die Toilette',en:'toilet',x:58,y:39,w:13,h:31},
 {de:'das Handtuch',en:'towel',x:33,y:48,w:9,h:24},
 {de:'die Zahnbürste',en:'toothbrush',x:23,y:35,w:7,h:14},
 {de:'die Ente',en:'rubber duck',x:44,y:43,w:5,h:6},
 {de:'der Korb',en:'basket',x:18,y:75,w:11,h:14}
];
const bathroomExtras=[
 {item:9,x:69,y:54,w:10,h:23},
 {item:9,x:51,y:29,w:6,h:7},
 {item:6,x:71,y:17,w:7,h:33},
 {item:6,x:8,y:55,w:11,h:29},
 {item:6,x:91,y:80,w:9,h:11}
];
const gardenItems=[
 {de:'der Baum',en:'tree',x:0,y:0,w:37,h:51},
 {de:'der Vogel',en:'bird',x:12,y:15,w:7,h:6},
 {de:'das Vogelhaus',en:'birdhouse',x:9,y:5,w:16,h:16},
 {de:'die Blume',en:'flower',x:3,y:43,w:14,h:13},
 {de:'die Sonnenblume',en:'sunflower',x:47,y:28,w:9,h:11},
 {de:'das Fahrrad',en:'bicycle',x:21,y:31,w:15,h:20},
 {de:'der Tisch',en:'table',x:40,y:37,w:26,h:19},
 {de:'der Stuhl',en:'chair',x:35,y:34,w:10,h:23},
 {de:'der Sonnenschirm',en:'patio umbrella',x:38,y:5,w:33,h:35},
 {de:'die Tasse',en:'cup',x:45,y:38,w:10,h:10},
 {de:'das Buch',en:'book',x:54,y:37,w:8,h:5},
 {de:'der Hund',en:'dog',x:41,y:51,w:34,h:34},
 {de:'die Katze',en:'cat',x:91,y:29,w:9,h:14},
 {de:'der Ball',en:'ball',x:54,y:76,w:8,h:9},
 {de:'der Schmetterling',en:'butterfly',x:3,y:77,w:7,h:10},
 {de:'die Gießkanne',en:'watering can',x:69,y:77,w:16,h:17},
 {de:'die Schaufel',en:'shovel',x:91,y:78,w:9,h:18},
 {de:'die Gummistiefel',en:'rubber boots',x:72,y:43,w:8,h:11},
 {de:'die Tür',en:'door',x:80,y:0,w:12,h:48},
 {de:'die Bank',en:'bench',x:83,y:44,w:17,h:14},
 {de:'der Gartenzwerg',en:'garden gnome',x:15,y:39,w:7,h:13}
];
const gardenExtras=[
 {item:3,x:91,y:54,w:9,h:13},
 {item:3,x:76,y:54,w:11,h:11},
 {item:3,x:0,y:78,w:19,h:22},
 {item:3,x:0,y:65,w:12,h:15},
 {item:3,x:13,y:83,w:12,h:17},
 {item:4,x:51,y:29,w:7,h:10},
 {item:4,x:55,y:29,w:6,h:11},
 {item:7,x:60,y:35,w:10,h:23},
 {item:7,x:45,y:36,w:10,h:26},
 {item:1,x:28,y:12,w:6,h:6}
];
const farmItems=[
 {de:'das Kaninchen',en:'rabbit',x:18,y:46,w:20,h:42},
 {de:'die Kuh',en:'cow',x:14,y:21,w:25,h:23},
 {de:'das Pferd',en:'horse',x:39,y:23,w:23,h:22},
 {de:'das Schaf',en:'sheep',x:61,y:30,w:16,h:19},
 {de:'das Schwein',en:'pig',x:82,y:62,w:17,h:21},
 {de:'das Huhn',en:'chicken',x:55,y:50,w:15,h:22},
 {de:'das Küken',en:'chick',x:63,y:66,w:8,h:9},
 {de:'die Scheune',en:'barn',x:25,y:3,w:43,h:43},
 {de:'das Windrad',en:'windmill',x:52,y:0,w:10,h:29},
 {de:'der Zaun',en:'fence',x:22,y:37,w:32,h:16},
 {de:'das Tor',en:'gate',x:50,y:40,w:16,h:22},
 {de:'das Heu',en:'hay',x:78,y:9,w:22,h:48},
 {de:'die Heugabel',en:'pitchfork',x:74,y:34,w:7,h:31},
 {de:'der Eimer',en:'bucket',x:95,y:52,w:5,h:10},
 {de:'die Karotte',en:'carrot',x:29,y:69,w:7,h:14},
 {de:'die Sonnenblume',en:'sunflower',x:0,y:13,w:13,h:22},
 {de:'die Blume',en:'flower',x:0,y:85,w:15,h:15},
 {de:'der Baum',en:'tree',x:0,y:0,w:31,h:21},
 {de:'das Vogelhaus',en:'birdhouse',x:7,y:3,w:11,h:20},
 {de:'der Schmetterling',en:'butterfly',x:0,y:52,w:6,h:11},
 {de:'die Wasserpumpe',en:'water pump',x:10,y:37,w:8,h:25}
];
const farmExtras=[
 {item:5,x:66,y:53,w:10,h:15},
 {item:6,x:71,y:66,w:5,h:9},
 {item:6,x:70,y:58,w:5,h:8},
 {item:14,x:32,y:85,w:8,h:8},
 {item:14,x:9,y:76,w:9,h:9},
 {item:15,x:4,y:19,w:10,h:13},
 {item:15,x:1,y:27,w:11,h:12},
 {item:16,x:0,y:73,w:17,h:13},
 {item:16,x:0,y:45,w:11,h:8},
 {item:11,x:85,y:18,w:15,h:31}
];
const rooms=[
 {name:'Minka’s living room',image:'./file_0000000028f881f5bd5c11ffc7a7f4cc.png',items,extras:extraFindItZones},
 {name:'The sunny kitchen',image:'./file_00000000f6dc81f5a53d075ab54c5e25.png',items:kitchenItems,extras:kitchenExtraZones},
 {name:'The cozy bathroom',image:'./a_warm_cozy_colorful_cartoon_illustration_of_a_d.png',items:bathroomItems,extras:bathroomExtras},
 {name:'The blooming garden',image:'./file_00000000dca881f5b90c49c8ddc2f964.png',items:gardenItems,extras:gardenExtras},
 {name:'The farm',image:'./file_0000000093d081f5aac5488c3d81882b.png',items:farmItems,extras:farmExtras}
];
function activeRoom(){return rooms[session?.room||0]}
function sceneMarkup(){
 const room=activeRoom();const zones=room.items.map((o,i)=>({...o,item:i})).concat(room.extras);
 return '<div class="findit-scene"><img class="findit-room-art" src="'+room.image+'" alt="'+room.name+' with objects to find">'+zones.map((o,i)=>'<button class="findit-target" data-fi="'+i+'" aria-label="Select '+room.items[o.item].en+'" style="left:'+o.x+'%;top:'+o.y+'%;width:'+o.w+'%;height:'+o.h+'%;z-index:'+(room.items[o.item]===session?.queue[session.idx]?5:2)+'" onclick="findItTap('+i+')"></button>').join('')+'</div>'
}
function feedback(message,translation,voice){const el=document.getElementById('findit-feedback');if(!el)return;el.innerHTML='<strong>'+message+'</strong> <span>'+translation+'</span>'+(voice?'<button class="secondary" onclick="findItPraise()">🔊 Hear phrase</button>':'')}
window.findItPraise=function(){if(session&&session.phrase&&typeof speak==='function')speak(session.phrase)};
window.findItHome=function(){
 session={room:0,queue:order(),idx:0,hearts:3,locked:false,phrase:''};
 document.body.classList.remove('lesson-screen');
 app.innerHTML='<div class="findit-shell"><section class="findit-intro"><h2>Find It! — Choose a scene</h2><p>Find ten German words in each scene. You have three hearts.</p><div class="findit-room-choices"><button class="findit-room-choice" onclick="findItStart(0)"><img src="./file_0000000028f881f5bd5c11ffc7a7f4cc.png" alt="" loading="lazy"><span>Living room</span></button><button class="findit-room-choice" onclick="findItStart(1)"><img src="./file_00000000f6dc81f5a53d075ab54c5e25.png" alt="" loading="lazy"><span>Sunny kitchen</span></button><button class="findit-room-choice" onclick="findItStart(2)"><img src="./a_warm_cozy_colorful_cartoon_illustration_of_a_d.png" alt="" loading="lazy"><span>Cozy bathroom</span></button><button class="findit-room-choice" onclick="findItStart(3)"><img src="./file_00000000dca881f5b90c49c8ddc2f964.png" alt="" loading="lazy"><span>Blooming garden</span></button><button class="findit-room-choice" onclick="findItStart(4)"><img src="./file_0000000093d081f5aac5488c3d81882b.png" alt="" loading="lazy"><span>The farm</span></button></div></section></div>';
 window.scrollTo(0,0);
};
window.findItStart=function(roomIndex=0){const room=rooms[roomIndex]||rooms[0];session={room:roomIndex,queue:room.items.slice().sort(()=>Math.random()-.5),idx:0,hearts:3,locked:false,phrase:''};render()};
function render(){
 if(!session)return;
 if(session.idx>=10||session.hearts<=0){const won=session.idx>=10;app.innerHTML='<div class="findit-shell"><section class="findit-intro"><div class="findit-guide"><img src="./katze.png" alt="Minka"><div class="findit-bubble"><h2>'+(won?'Geschafft!':'Gut versucht!')+'</h2><p>'+(won?'You found all ten objects!':'You found '+session.idx+' of 10 objects.')+'</p></div></div><p>'+(won?'Minka is proud of you!':'Try again to find all ten.')+'</p><button onclick="findItHome()">Find It Home</button> <button class="secondary" onclick="home()">Main Menu</button></section></div>';return}
 const item=session.queue[session.idx];
 app.innerHTML='<div class="findit-shell"><section class="findit-intro"><div class="findit-topline"><strong>Find It! · '+(session.idx+1)+' / 10</strong><span class="findit-hearts" aria-label="'+session.hearts+' hearts remaining">'+('♥'.repeat(session.hearts))+'<span style="opacity:.22">'+('♥'.repeat(3-session.hearts))+'</span></span></div><div class="findit-guide"><img src="./katze.png" alt="Minka"><div class="findit-bubble"><h2>Find: '+item.de+'</h2><p>Tap the object in the scene. <button class="secondary" style="padding:5px 9px;margin:4px 0;font-size:13px" onclick="findItWord()">🔊 Listen</button></p></div></div></section>'+sceneMarkup()+'<div id="findit-feedback" class="findit-feedback" aria-live="polite">Minka is waiting for you to find the object.</div></div>';
 session.locked=false;
}
window.findItWord=function(){if(session&&typeof speak==='function')speak(session.queue[session.idx].de)};
/* Small synthesized feedback tones; no audio files or speech required. */
let findItAudioContext;
function findItSound(correct){
 try{
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx)return;
  const ctx=findItAudioContext||(findItAudioContext=new AudioCtx());
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  const start=ctx.currentTime+.008;
  const notes=correct?[[523.25,0,.105],[659.25,.115,.16]]:[[220,0,.16]];
  notes.forEach(([freq,offset,duration])=>{
   const osc=ctx.createOscillator(),gain=ctx.createGain(),t=start+offset;
   osc.type=correct?'sine':'triangle';osc.frequency.setValueAtTime(freq,t);
   if(!correct)osc.frequency.exponentialRampToValueAtTime(175,t+duration);
   gain.gain.setValueAtTime(.0001,t);
   gain.gain.exponentialRampToValueAtTime(correct?.085:.055,t+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
   osc.connect(gain);gain.connect(ctx.destination);osc.start(t);osc.stop(t+duration+.01);
  });
 }catch(e){/* Audio is optional; gameplay continues normally. */}
}
window.deutschLabCorrectChime=findItSound;
window.findItTap=function(i){
 if(!session||session.locked||session.idx>=10)return;
 const target=session.queue[session.idx],room=activeRoom(),picked=room.items[i]||(room.extras[i-room.items.length]&&room.items[room.extras[i-room.items.length].item]),node=app.querySelector('.findit-target[data-fi="'+i+'"]');
 if(picked===target){
  findItSound(true);
  session.locked=true;node&&node.classList.add('findit-hit');
  const roomCat=app.querySelector('.findit-scene');if(roomCat){roomCat.classList.add('findit-cat-happy');setTimeout(()=>roomCat.classList.remove('findit-cat-happy'),1100)}
  const phrase=praises[session.idx%praises.length];session.phrase=phrase[0];
  feedback(phrase[0],phrase[1]+' · '+target.de+' = '+target.en,true);const bubble=document.createElement('div');bubble.className='findit-cat-speech';bubble.textContent=phrase[0];const scene=app.querySelector('.findit-scene');if(scene)scene.appendChild(bubble);
  
  if(advance)clearTimeout(advance);
  advance=setTimeout(()=>{if(!session)return;session.idx++;render()},1800);
 }else{
  findItSound(false);
  try { if (navigator.vibrate) navigator.vibrate(110); } catch(e) { /* Vibration is optional. */ }
  session.hearts--;node&&node.classList.add('findit-miss');
  session.phrase='';feedback('Fast! (Almost!)','Try another object.',false);const oldBubble=app.querySelector('.findit-cat-speech');if(oldBubble)oldBubble.remove();const bubble=document.createElement('div');bubble.className='findit-cat-speech findit-cat-speech-wrong';bubble.textContent='Versuch es noch einmal!';const scene=app.querySelector('.findit-scene');if(scene){scene.appendChild(bubble);setTimeout(()=>bubble.remove(),1100)}const roomCat=app.querySelector('.findit-scene');if(roomCat){roomCat.classList.remove('findit-cat-sad');void roomCat.offsetWidth;roomCat.classList.add('findit-cat-sad');setTimeout(()=>roomCat.classList.remove('findit-cat-sad'),850)}
  if(session.hearts<=0){session.locked=true;if(advance)clearTimeout(advance);advance=setTimeout(render,1400)}
  else setTimeout(()=>{if(node)node.classList.remove('findit-miss')},650);
  const h=app.querySelector('.findit-hearts');if(h)h.innerHTML='♥'.repeat(session.hearts)+'<span style="opacity:.22">'+'♥'.repeat(3-session.hearts)+'</span>';
 }
};
const menu=document.getElementById('sideMenu');
if(menu&&!menu.querySelector('[data-findit-menu]')){
 const btn=document.createElement('button');btn.dataset.finditMenu='1';btn.textContent='◈ Find It!';btn.setAttribute('onclick',"navigateTo('findItHome')");
 const heading=Array.from(menu.querySelectorAll('p')).find(p=>p.textContent.trim()==='PRACTICE');
 if(heading)heading.after(btn);else menu.append(btn);
}
})();
