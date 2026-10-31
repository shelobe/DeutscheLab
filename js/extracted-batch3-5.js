
(function(){
 const catalog=[
 ['orange','die Orange','🍊',1.99,'produce'],['ananas','die Ananas','🍍',2.49,'produce'],['gurke','die Gurke','🥒',1.49,'produce'],['paprika','die Paprika','🫑',2.99,'produce'],['salat','der Salat','🥬',1.49,'produce'],['brokkoli','der Brokkoli','🥦',1.99,'produce'],['blumenkohl','der Blumenkohl','🥦',1.99,'produce'],['radieschen','das Radieschen','🔴',1.49,'produce'],['zwiebel','die Zwiebel','🧅',1.29,'produce'],['knoblauch','der Knoblauch','🧄',2.49,'produce'],['zitrone','die Zitrone','🍋',1.49,'produce'],['wassermelone','die Wassermelone','🍉',2.49,'produce'],
 ['apfel','der Apfel','🍎',.8,'produce'],['banane','die Banane','🍌',1.1,'produce'],['karotte','die Karotte','🥕',.9,'produce'],['tomate','die Tomate','🍅',.7,'produce'],['kartoffel','die Kartoffel','🥔',.6,'produce'],['trauben','die Trauben','🍇',2.3,'produce'],
 ['milch','die Milch','🥛',1.5,'dairy'],['kaese','der Käse','🧀',3.4,'dairy'],['ei','das Ei','🥚',.6,'dairy'],['butter','die Butter','🧈',2.5,'dairy'],['joghurt','der Joghurt','🥣',1.2,'dairy'],['wasser','das Wasser','💧',1.3,'dairy'],
 ['brot','das Brot','🍞',2.2,'bakery'],['croissant','das Croissant','🥐',1.7,'bakery'],['brezel','die Brezel','🥨',1.3,'bakery'],['kuchen','der Kuchen','🍰',3.2,'bakery'],['keks','der Keks','🍪',.9,'bakery'],['baguette','das Baguette','🥖',2.6,'bakery']
 ].map(([id,name,emoji,price,aisle])=>({id,name,emoji,price,aisle}));
 const aisles=[['produce','Obst & Gemüse','🥕'],['dairy','Milchprodukte','🥛'],['bakery','Bäckerei','🥨']];
 const produceIds=['orange','ananas','gurke','paprika','salat','brokkoli','blumenkohl','radieschen','zwiebel','knoblauch','zitrone','wassermelone','apfel','banane','karotte','tomate','kartoffel','trauben'].filter(id=>catalog.some(p=>p.id===id));
 const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const newMission=()=>shuffle([...produceIds]).slice(0,5);
 let state=null;
 const euro=n=>n.toFixed(2).replace('.',',')+' €';
 const byId=id=>catalog.find(p=>p.id===id);
 const save=()=>{try{sessionStorage.setItem('dl-supermarkt-session',JSON.stringify(state))}catch(e){}};
 const status=(message,wrong=false)=>{state.message=message;state.wrong=wrong;save()};
 function render(){
  if(!state)return;
  const done=state.list.every(id=>state.cart.includes(id));
  const aisle=aisles[state.aisle],items=catalog.filter(p=>p.aisle===aisle[0]);
  const total=state.cart.reduce((n,id)=>n+byId(id).price,0);
  const list=state.list.map(id=>'<li class="'+(state.cart.includes(id)?'market-checked':'')+'">'+byId(id).name+(state.cart.includes(id)?' ✓':'')+'</li>').join('');
  const hotspots=[
  ['banane',5,28,21,11],['apfel',28,28,21,11],['orange',51,28,21,11],['ananas',75,28,22,11],
  ['tomate',5,40,21,12],['gurke',28,40,21,12],['paprika',51,40,21,12],['karotte',75,40,22,12],
  ['salat',5,53,21,11],['brokkoli',28,53,21,11],['blumenkohl',51,53,21,11],['radieschen',75,53,22,11],
  ['kartoffel',5,65,21,11],['zwiebel',28,65,21,11],['zwiebel',51,65,21,11],['knoblauch',75,65,22,11],
  ['zitrone',14,77,26,11],['wassermelone',0,77,15,15]
  ];
  const produce=state.aisle===0;
  const scene=produce?'<div class="market-photo" aria-label="Illustrated produce shelves">'+
    '<img src="file_00000000128481f5b6b20f46b8b3d474.png" alt="Produce aisle with fruit and vegetables in wooden crates" draggable="false">'+
    hotspots.map(([id,x,y,w,h])=>'<button class="market-hotspot" style="left:'+x+'%;top:'+y+'%;width:'+w+'%;height:'+h+'%" aria-label="Select grocery item" onclick="supermarktPick(\''+id+'\')"></button>').join('')+'</div>':
    '<div class="market-scene market-illustrated"><div class="market-sign">'+aisle[2]+' '+aisle[1]+'</div><div class="market-shelf">'+items.map(p=>'<button class="market-item" onclick="supermarktPick(\''+p.id+'\')" '+(state.cart.includes(p.id)?'disabled':'')+'><span class="market-emoji">'+p.emoji+'</span><span class="market-name">'+p.name+'</span></button>').join('')+'</div></div>';
  app.innerHTML='<div class="market-wrap market-v2"><div class="market-head"><h2>Supermarkt</h2><p class="market-instructions">Tap an item from your shopping list. Swipe sideways to explore another aisle.</p><div class="market-list market-always-visible"><strong>📝 Einkaufsliste</strong><ul>'+list+'</ul></div></div>'+
  '<div class="market-swipe-hint">‹ Swipe to explore · '+aisle[1]+' ›</div><div class="market-swipe-zone" ontouchstart="supermarktTouchStart(event)" ontouchend="supermarktTouchEnd(event)">'+scene+(state.message?'<div class="market-feedback-toast '+(state.wrong?'bad':'good')+'" role="status">'+state.message+'</div>':'')+'</div>'+
  '<div class="market-basket-dock"><button type="button" class="market-basket-toggle" onclick="supermarktToggleBasket()" aria-expanded="'+(window.dlMarketBasketOpen?'true':'false')+'"><span>Einkaufskorb · '+state.cart.length+' / '+state.list.length+'</span><span>'+euro(total)+' <span class="market-basket-chevron">'+(window.dlMarketBasketOpen?'⌄':'⌃')+'</span></span></button><div class="market-basket-details '+(window.dlMarketBasketOpen?'is-open':'')+'"><div class="market-cart"><div class="market-cart-handle" aria-hidden="true"></div><div class="market-cart-items">'+(state.cart.length?state.cart.map(id=>'<span title="'+byId(id).name+'">'+(id==='radieschen'?'<svg class="market-veggie-icon" viewBox="0 0 48 48" aria-label="Radish" role="img"><path d="M24 18C17 9 12 10 8 7c0 9 6 14 13 15M26 18c2-10 8-13 14-14-2 9-6 15-13 18M23 17c-2-9 0-13 2-16 4 6 5 12 2 17" fill="#5aaf65"/><path d="M13 23c1-9 20-12 24 0 3 10-7 19-13 22-7-5-14-13-11-22" fill="#e84d70"/><path d="M19 39l5 7 4-7" fill="#fff4e7"/><path d="M16 24c2-4 6-5 9-5" stroke="#ffa3ae" stroke-width="3" stroke-linecap="round" fill="none"/></svg>':id==='blumenkohl'?'<svg class="market-veggie-icon" viewBox="0 0 48 48" aria-label="Cauliflower" role="img"><path d="M8 31q3-10 13-10h7q10 0 12 10l-9 12H17Z" fill="#4f9a54"/><path d="M14 31c-10-7-5-17 3-16 0-10 13-12 17-3 10-1 13 12 5 17-3 8-19 11-25 2" fill="#f6eed3" stroke="#d4c9a7" stroke-width="1.4"/><path d="M12 29q-4 6 6 13M36 28q7 7-5 14" stroke="#44894a" stroke-width="5" fill="none"/></svg>':byId(id).emoji)+'</span>').join(''):'<span class="muted">Your cart is empty.</span>')+'</div></div></div></div><div class="market-actions market-actions-docked"><button class="secondary" onclick="supermarktLeave(practiceHub)">Back to Games</button><button '+(!done?'disabled':'')+' onclick="supermarktCheckout()">Zur Kasse →</button></div></div>';
 }
 let basketPeekTimer=null;
 let basketManuallyOpen=false;
 function setBasketOpen(open){
  window.dlMarketBasketOpen=!!open;
  const dock=document.querySelector('#app .market-basket-dock');
  if(!dock)return;
  const details=dock.querySelector('.market-basket-details');
  const button=dock.querySelector('.market-basket-toggle');
  if(details)details.classList.toggle('is-open',!!open);
  if(button){button.setAttribute('aria-expanded',String(!!open));const indicator=button.querySelector('.market-basket-chevron');if(indicator)indicator.textContent=open?'⌄':'⌃';}
 }
 window.supermarktToggleBasket=function(){
  if(basketPeekTimer){clearTimeout(basketPeekTimer);basketPeekTimer=null;}
  basketManuallyOpen=!window.dlMarketBasketOpen;
  setBasketOpen(basketManuallyOpen);
 };
 function peekBasket(){
  if(basketManuallyOpen)return;
  if(basketPeekTimer)clearTimeout(basketPeekTimer);
  setBasketOpen(true);
  basketPeekTimer=setTimeout(()=>{basketPeekTimer=null;if(!basketManuallyOpen&&state)setBasketOpen(false);},1500);
 }
 window.supermarktReset=function(){if(basketPeekTimer)clearTimeout(basketPeekTimer);basketPeekTimer=null;basketManuallyOpen=false;window.dlMarketBasketOpen=false;state=null;sessionStorage.removeItem('dl-supermarkt-session')};
 window.supermarktLeave=function(destination){dlAppConfirm({title:'Leave Grocery Shopping?',message:'Your current shopping progress will be reset.',cancelText:'Keep Shopping',confirmText:'Leave Game',danger:true,onConfirm:()=>{supermarktReset();if(typeof destination==='function')destination();else practiceHub()}});return false};
 window.supermarktHome=function(){
  try{const saved=JSON.parse(sessionStorage.getItem('dl-supermarkt-session')||'null');if(saved&&Array.isArray(saved.list)&&Array.isArray(saved.cart)&&Number.isInteger(saved.aisle)&&saved.aisle>=0&&saved.aisle<3&&saved.list.every(id=>byId(id))&&saved.cart.every(id=>byId(id))){state=saved;const validProduce=new Set(['banane','apfel','orange','ananas','tomate','gurke','paprika','karotte','salat','brokkoli','blumenkohl','radieschen','kartoffel','zwiebel','knoblauch','zitrone','wassermelone']);if(state.list.some(id=>!validProduce.has(id))){state.list=newMission();state.cart=state.cart.filter(id=>state.list.includes(id));state.aisle=0;state.message='';state.wrong=false;save()}render();window.scrollTo(0,0);return}}catch(e){}
  const n=Number(sessionStorage.getItem('dl-market-round')||0)%missions.length;
  state={list:missions[n],cart:[],aisle:0,round:n,message:'',wrong:false};save();render();window.scrollTo(0,0);
 };
 let touchX=null;window.supermarktTouchStart=function(e){touchX=e.changedTouches[0].clientX};window.supermarktTouchEnd=function(e){if(touchX===null)return;const delta=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(delta)>65)supermarktAisle(Math.max(0,Math.min(2,state.aisle+(delta<0?1:-1))))};
 window.supermarktAisle=function(n){if(!state)return;state.aisle=n;save();render()};
 window.supermarktPick=function(id){
  if(!state||state.cart.includes(id))return;
  if(!state.list.includes(id)){status('Nicht auf der Liste! · Not on the list. Try again.',true);if(typeof dlWrongHaptic==='function')dlWrongHaptic()}
  else{state.cart.push(id);status(state.cart.length===state.list.length?'Sehr gut! Ready for checkout!':'Richtig! · Correct!');if(typeof findItSound==='function')findItSound(true);render();peekBasket();return;}
  render();
 };
 window.supermarktCheckout=function(){
  if(!state||!state.list.every(id=>state.cart.includes(id)))return;
  const total=state.cart.reduce((sum,id)=>sum+byId(id).price,0);
  app.innerHTML='<div class="market-wrap market-v2"><section class="market-head"><h2>🛒 An der Kasse · Checkout</h2><div class="market-checkout-scene" role="img" aria-label="Oskar the owl cashier welcomes you at the supermarket checkout"><div class="market-checkout-dialogue"><strong>Oskar:</strong> „Guten Tag! Das macht '+euro(total)+'.“</div></div><p class="market-checkout-prompt">How do you respond?</p><div class="market-actions"><button onclick="supermarktPay(true)">Mit Karte, bitte.</button><button onclick="supermarktPay(false)">Ich bin ein Bahnhof.</button></div><div id="market-pay-result" aria-live="polite"></div></section><div class="market-checkout-footer" id="market-checkout-footer"><button class="secondary" onclick="supermarktLeave(practiceHub)">← Back to Games</button><button onclick="supermarktHome()">Back to shopping</button></div></div>';window.scrollTo(0,0);
 };
 window.supermarktPay=function(correct){
  try{if('speechSynthesis' in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(correct?'Mit Karte, bitte.':'Ich bin ein Bahnhof.');u.lang='de-DE';u.rate=1.15;const v=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('de'));if(v)u.voice=v;speechSynthesis.speak(u)}}catch(e){}
  const target=document.getElementById('market-pay-result');if(!target)return;
  if(correct){target.innerHTML='<p class="correct">Richtig! “Mit Karte, bitte.” means “By card, please.” Einkauf geschafft!</p>';const footer=document.getElementById('market-checkout-footer');if(footer)footer.innerHTML='<button class="secondary" onclick="supermarktLeave(practiceHub)">← Back to Games</button><button onclick="supermarktNextMission()">Next shopping list →</button>';const scene=document.querySelector('#app .market-checkout-scene');if(scene){scene.classList.remove('market-oskar-celebrate');void scene.offsetWidth;scene.classList.add('market-oskar-celebrate');const bubble=scene.querySelector('.market-checkout-dialogue');if(bubble)bubble.innerHTML='<strong>Oskar:</strong> „Wunderbar! Sehr gut gemacht!“';}if(typeof findItSound==='function')findItSound(true)}
  else{target.innerHTML='<p class="wrong">Not quite. Try the polite payment response.</p>';if(typeof dlWrongHaptic==='function')dlWrongHaptic()}
 };
 window.supermarktNextMission=function(){sessionStorage.setItem('dl-market-round',String(state.round+1));sessionStorage.removeItem('dl-supermarkt-session');state=null;supermarktHome()};
})();
