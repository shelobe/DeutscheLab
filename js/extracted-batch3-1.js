
const PHOTO_WORDS=[["der Hund", "dog", "Animals"], ["die Katze", "cat", "Animals"], ["das Pferd", "horse", "Animals"], ["der Vogel", "bird", "Animals"], ["der Fisch", "fish", "Animals"], ["die Kuh", "cow", "Animals"], ["das Schaf", "sheep", "Animals"], ["die Ziege", "goat", "Animals"], ["das Schwein", "pig", "Animals"], ["die Ente", "duck", "Animals"], ["das Huhn", "chicken", "Animals"], ["der Hahn", "rooster", "Animals"], ["das Kaninchen", "rabbit", "Animals"], ["die Maus", "mouse", "Animals"], ["der Elefant", "elephant", "Animals"], ["der Löwe", "lion", "Animals"], ["der Tiger", "tiger", "Animals"], ["der Bär", "bear", "Animals"], ["der Fuchs", "fox", "Animals"], ["der Wolf", "wolf", "Animals"], ["der Affe", "monkey", "Animals"], ["die Schildkröte", "turtle", "Animals"], ["der Schmetterling", "butterfly", "Animals"], ["die Biene", "bee", "Animals"], ["die Spinne", "spider", "Animals"], ["der Apfel", "apple", "Food & drinks"], ["die Banane", "banana", "Food & drinks"], ["die Orange", "orange fruit", "Food & drinks"], ["die Erdbeere", "strawberry", "Food & drinks"], ["die Traube", "grapes", "Food & drinks"], ["die Birne", "pear", "Food & drinks"], ["die Zitrone", "lemon", "Food & drinks"], ["die Ananas", "pineapple", "Food & drinks"], ["die Wassermelone", "watermelon", "Food & drinks"], ["die Tomate", "tomato", "Food & drinks"], ["die Karotte", "carrot", "Food & drinks"], ["die Kartoffel", "potato", "Food & drinks"], ["die Zwiebel", "onion", "Food & drinks"], ["der Salat", "lettuce", "Food & drinks"], ["die Gurke", "cucumber", "Food & drinks"], ["das Brot", "bread", "Food & drinks"], ["der Käse", "cheese", "Food & drinks"], ["das Ei", "egg", "Food & drinks"], ["die Milch", "milk", "Food & drinks"], ["das Wasser", "glass of water", "Food & drinks"], ["der Kaffee", "coffee cup", "Food & drinks"], ["der Tee", "tea cup", "Food & drinks"], ["der Reis", "rice", "Food & drinks"], ["die Nudeln", "pasta", "Food & drinks"], ["die Suppe", "soup", "Food & drinks"], ["das Haus", "house", "Home"], ["die Wohnung", "apartment building", "Home"], ["das Bett", "bed", "Home"], ["der Tisch", "table", "Home"], ["der Stuhl", "chair", "Home"], ["das Sofa", "sofa", "Home"], ["das Fenster", "window", "Home"], ["die Tür", "door", "Home"], ["die Lampe", "lamp", "Home"], ["der Spiegel", "mirror", "Home"], ["der Schrank", "wardrobe", "Home"], ["das Regal", "bookshelf", "Home"], ["der Teppich", "rug", "Home"], ["das Kissen", "pillow", "Home"], ["die Decke", "blanket", "Home"], ["die Küche", "kitchen", "Home"], ["das Badezimmer", "bathroom", "Home"], ["die Dusche", "shower", "Home"], ["die Badewanne", "bathtub", "Home"], ["der Kühlschrank", "refrigerator", "Home"], ["der Herd", "stove", "Home"], ["die Waschmaschine", "washing machine", "Home"], ["die Toilette", "toilet", "Home"], ["der Garten", "garden", "Home"], ["der Balkon", "balcony", "Home"], ["die Jacke", "jacket", "Clothing"], ["das Hemd", "shirt", "Clothing"], ["das T-Shirt", "t-shirt", "Clothing"], ["die Hose", "trousers", "Clothing"], ["der Rock", "skirt", "Clothing"], ["das Kleid", "dress", "Clothing"], ["der Mantel", "coat", "Clothing"], ["der Pullover", "sweater", "Clothing"], ["die Schuhe", "shoes", "Clothing"], ["die Socke", "sock", "Clothing"], ["der Hut", "hat", "Clothing"], ["die Mütze", "beanie hat", "Clothing"], ["der Schal", "scarf", "Clothing"], ["die Handschuhe", "gloves", "Clothing"], ["der Gürtel", "belt", "Clothing"], ["die Brille", "glasses", "Clothing"], ["die Sonnenbrille", "sunglasses", "Clothing"], ["die Tasche", "handbag", "Clothing"], ["der Rucksack", "backpack", "Clothing"], ["die Uhr", "wristwatch", "Clothing"], ["der Ring", "ring", "Clothing"], ["die Halskette", "necklace", "Clothing"], ["die Stiefel", "boots", "Clothing"], ["die Krawatte", "tie", "Clothing"], ["der Regenschirm", "umbrella", "Clothing"], ["das Auto", "car", "Transport"], ["der Bus", "bus", "Transport"], ["der Zug", "train", "Transport"], ["das Fahrrad", "bicycle", "Transport"], ["das Motorrad", "motorcycle", "Transport"], ["das Flugzeug", "airplane", "Transport"], ["das Schiff", "ship", "Transport"], ["das Boot", "boat", "Transport"], ["die Straßenbahn", "tram", "Transport"], ["die U-Bahn", "subway train", "Transport"], ["das Taxi", "taxi", "Transport"], ["der Lastwagen", "truck", "Transport"], ["der Roller", "scooter", "Transport"], ["der Bahnhof", "train station", "Transport"], ["der Flughafen", "airport", "Transport"], ["die Haltestelle", "bus stop", "Transport"], ["die Straße", "road", "Transport"], ["die Brücke", "bridge", "Transport"], ["die Ampel", "traffic light", "Transport"], ["der Parkplatz", "parking lot", "Transport"], ["der Reifen", "car tire", "Transport"], ["das Lenkrad", "steering wheel", "Transport"], ["der Koffer", "suitcase", "Transport"], ["der Fahrplan", "timetable", "Transport"], ["die Fahrkarte", "train ticket", "Transport"], ["der Baum", "tree", "Nature"], ["die Blume", "flower", "Nature"], ["das Gras", "grass", "Nature"], ["das Blatt", "leaf", "Nature"], ["der Wald", "forest", "Nature"], ["der Berg", "mountain", "Nature"], ["der Fluss", "river", "Nature"], ["der See", "lake", "Nature"], ["das Meer", "sea", "Nature"], ["der Strand", "beach", "Nature"], ["die Insel", "island", "Nature"], ["die Sonne", "sun", "Nature"], ["der Mond", "moon", "Nature"], ["der Stern", "star", "Nature"], ["die Wolke", "cloud", "Nature"], ["der Regen", "rain", "Nature"], ["der Schnee", "snow", "Nature"], ["der Wind", "wind", "Nature"], ["der Regenbogen", "rainbow", "Nature"], ["der Stein", "rock", "Nature"], ["die Erde", "soil", "Nature"], ["die Wüste", "desert", "Nature"], ["der Wasserfall", "waterfall", "Nature"], ["die Höhle", "cave", "Nature"], ["der Pilz", "mushroom", "Nature"], ["die Schule", "school", "Places"], ["das Krankenhaus", "hospital", "Places"], ["die Apotheke", "pharmacy", "Places"], ["der Supermarkt", "supermarket", "Places"], ["die Bäckerei", "bakery", "Places"], ["das Restaurant", "restaurant", "Places"], ["das Café", "cafe", "Places"], ["die Bibliothek", "library", "Places"], ["das Museum", "museum", "Places"], ["das Kino", "movie theater", "Places"], ["das Theater", "theater building", "Places"], ["das Hotel", "hotel", "Places"], ["die Bank", "bank building", "Places"], ["die Post", "post office", "Places"], ["die Kirche", "church", "Places"], ["das Rathaus", "town hall", "Places"], ["der Park", "park", "Places"], ["der Spielplatz", "playground", "Places"], ["das Schwimmbad", "swimming pool", "Places"], ["das Stadion", "stadium", "Places"], ["das Büro", "office", "Places"], ["die Fabrik", "factory", "Places"], ["die Universität", "university", "Places"], ["der Markt", "farmers market", "Places"], ["die Polizei", "police station", "Places"], ["das Buch", "book", "Objects & hobbies"], ["der Schlüssel", "key", "Objects & hobbies"], ["die Tasse", "cup", "Objects & hobbies"], ["die Gabel", "fork", "Objects & hobbies"], ["das Messer", "kitchen knife", "Objects & hobbies"], ["der Löffel", "spoon", "Objects & hobbies"], ["der Teller", "plate", "Objects & hobbies"], ["das Glas", "drinking glass", "Objects & hobbies"], ["die Flasche", "bottle", "Objects & hobbies"], ["der Computer", "computer", "Objects & hobbies"], ["das Handy", "smartphone", "Objects & hobbies"], ["die Tastatur", "keyboard", "Objects & hobbies"], ["die Maus", "computer mouse", "Objects & hobbies"], ["der Bildschirm", "monitor", "Objects & hobbies"], ["die Kamera", "camera", "Objects & hobbies"], ["das Foto", "photograph", "Objects & hobbies"], ["der Ball", "ball", "Objects & hobbies"], ["der Fahrradhelm", "bicycle helmet", "Objects & hobbies"], ["die Gitarre", "guitar", "Objects & hobbies"], ["das Klavier", "piano", "Objects & hobbies"], ["die Geige", "violin", "Objects & hobbies"], ["der Pinsel", "paintbrush", "Objects & hobbies"], ["der Hammer", "hammer", "Objects & hobbies"], ["die Schere", "scissors", "Objects & hobbies"], ["der Bleistift", "pencil", "Objects & hobbies"]];
const PHOTO_CATS=[...new Set(PHOTO_WORDS.map(w=>w[2]))];
let photoCategory='All topics',photoLevel='A1',photoCache={};
function photoMenu(){
 const stats=state.pictureProgress||{attempts:0,correct:0};
 app.innerHTML=illustratedHero('Picture practice','Learn words by recognizing real-world objects.','forest','katze.png')+
 `<section class="card"><h2>Choose a topic</h2><p>${PHOTO_WORDS.length} words across ${PHOTO_CATS.length} topics.</p><p class="muted">${stats.attempts} answers · ${stats.correct} correct</p><div class="picture-categories">${['All topics',...PHOTO_CATS].map(c=>`<button class="${c===photoCategory?'':'secondary'}" onclick="photoCategory=${JSON.stringify(c).replace(/"/g,'&quot;')};photoMenu()">${safeText(c)}</button>`).join('')}</div><h3>How do you want to practice?</h3><div class="picture-tabs"><button onclick="photoStart('choice')">Multiple choice</button><button onclick="photoStart('type')">Type the answer</button></div><p class="muted">Photos load from Wikimedia Commons the first time you see them; internet is required for new images.</p></section>`;
 window.scrollTo(0,0);
}
function photoStart(mode){
 const pool=PHOTO_WORDS.map((w,i)=>({w,i})).filter(x=>photoCategory==='All topics'||x.w[2]===photoCategory).map(x=>x.i);
 for(let i=pool.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 pictureSession={mode,queue:pool.slice(0,10),index:0,correct:0,answered:false,photo:true};photoShow();
}
const PHOTO_SEARCH_OVERRIDES={
 'computer mouse':'computer mouse peripheral isolated', 'mouse':'animal mouse rodent',
 'orange fruit':'orange citrus fruit isolated','glass of water':'glass filled with drinking water',
 'computer':'desktop computer monitor keyboard','ball':'soccer ball','key':'metal house key isolated',
 'train ticket':'railway train ticket','bank building':'bank building exterior',
 'police station':'police station building exterior', 'clock':'clock face',
 'bicycle helmet':'cycling helmet','photograph':'printed photograph',
 'timetable':'railway timetable board', 'road':'empty paved road',
 'cup':'ceramic cup isolated', 'tea cup':'cup of tea', 'coffee cup':'cup of coffee'
};
const PHOTO_BAD_TERMS={
 'computer mouse':['amiga','commodore','keyboard','computer system','laptop','mouse animal','rodent','museum'],
 'mouse':['computer','keyboard','peripheral','amiga','commodore','laptop'],
 'computer':['mouse only','computer mouse'],
 'key':['keyboard','piano key'],
 'orange fruit':['orange car','orange flower']
};
async function photoLoad(i){
 const word=PHOTO_WORDS[i],term=word[1],image=document.getElementById('photoActual');
 const holder=document.getElementById('photoLoading');
 if(!image||!holder)return;
 let candidates=[];
 if(photoCache[term])candidates=[photoCache[term]];
 else {
  try{
   const q=new URLSearchParams({action:'query',generator:'search',gsrsearch:'filetype:bitmap '+(PHOTO_SEARCH_OVERRIDES[term]||term)+' photo',gsrnamespace:'6',gsrlimit:'25',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'650',format:'json',origin:'*'});
   const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8500);
   let response;
   try{response=await fetch('https://commons.wikimedia.org/w/api.php?'+q,{signal:controller.signal})}finally{clearTimeout(timer)}
   if(!response.ok)throw Error('Photo search unavailable');
   const data=await response.json(),pages=Object.values(data.query?.pages||{});
   const bad=PHOTO_BAD_TERMS[term]||[];
   candidates=pages.filter(p=>{
    const info=p.imageinfo?.[0],title=(p.title||'').toLowerCase();
    return info?.mime?.startsWith('image/')&&info.thumburl&&!bad.some(t=>title.includes(t));
   }).map(p=>p.imageinfo[0].thumburl);
  }catch(e){candidates=[]}
 }
 if(!document.getElementById('photoActual')||image.dataset.word!==term)return;
 for(const url of candidates.slice(0,5)){
  try{
   await new Promise((resolve,reject)=>{const preload=new Image();const timer=setTimeout(()=>reject(Error('timeout')),7000);preload.onload=()=>{clearTimeout(timer);resolve()};preload.onerror=()=>{clearTimeout(timer);reject(Error('broken'))};preload.src=url});
   if(!image.isConnected||image.dataset.word!==term)return;
   image.src=url;image.hidden=false;holder.remove();photoCache[term]=url;
   document.querySelectorAll('#photoAnswerArea button,#photoAnswerArea input').forEach(el=>el.disabled=false);
   return;
  }catch(e){}
 }
 if(!image.isConnected||image.dataset.word!==term)return;
 holder.textContent='No reliable photo available for this word.';
 const skip=document.createElement('button');skip.textContent='Skip to next picture →';skip.onclick=()=>{pictureSession.index++;photoShow()};holder.appendChild(skip);
}
function photoShow(){
 let g=pictureSession;if(!g||!g.photo)return photoMenu();
 if(g.index>=g.queue.length){app.innerHTML=illustratedHero('Round complete',`${g.correct} of ${g.queue.length} correct!`,'village','hund.png')+`<section class="card"><button onclick="photoStart('${g.mode}')">Play again</button><button class="secondary" onclick="photoMenu()">Change topic</button></section>`;return}
 g.answered=false;let id=g.queue[g.index],w=PHOTO_WORDS[id];
 let others=PHOTO_WORDS.map((x,i)=>i).filter(i=>i!==id&&PHOTO_WORDS[i][2]===w[2]).sort(()=>Math.random()-.5).slice(0,3);
 let choices=[id,...others].sort(()=>Math.random()-.5);
 app.innerHTML=`<section class="card"><p class="muted">${safeText(w[2])} · ${g.index+1} of ${g.queue.length}</p><div class="game-progress"><div style="width:${g.index/g.queue.length*100}%"></div></div><div class="picture-card"><div id="photoLoading" class="photo-placeholder">Finding a picture…</div><img id="photoActual" class="photo-image" data-word="${safeText(w[1])}" alt="Identify the pictured object" hidden></div><h2>What is this in German?</h2><p class="muted">Include der, die or das.</p>${g.mode==='choice'?`<div id="photoAnswerArea" class="picture-choices">${choices.map(i=>`<button class="secondary" onclick="photoGrade(${id},${i})">${safeText(PHOTO_WORDS[i][0])}</button>`).join('')}</div>`:`<form id="photoAnswerArea" onsubmit="event.preventDefault();photoGrade(${id},null)"><input class="picture-input" id="photoInput" placeholder="e.g. der Hund" autocomplete="off" autocapitalize="none" spellcheck="false"><button>Check answer</button></form>`}<div id="pictureFeedback" aria-live="polite"></div></section>`;
 document.querySelectorAll('#photoAnswerArea button,#photoAnswerArea input').forEach(el=>el.disabled=true);photoLoad(id);window.scrollTo(0,0);
}
function photoGrade(id,choice){
 let g=pictureSession;if(!g||g.answered)return;
 let w=PHOTO_WORDS[id],answer=choice===null?document.getElementById('photoInput').value:PHOTO_WORDS[choice][0];
 const normalize=t=>t.toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' ');
 let ok=normalize(answer)===normalize(w[0]);g.answered=true;if(ok)g.correct++;
 state.pictureProgress??={attempts:0,correct:0};state.pictureProgress.attempts++;if(ok)state.pictureProgress.correct++;save();
 app.querySelectorAll('.picture-choices button,form button,.picture-input').forEach(b=>b.disabled=true);
 document.getElementById('pictureFeedback').innerHTML=`<div class="picture-answer"><h3>${ok?'Richtig!':'Not quite'}</h3><p><strong>${safeText(w[0])}</strong> — ${safeText(w[1])}</p><button class="secondary" onclick="speak(${JSON.stringify(w[0]).replace(/"/g,'&quot;')})">Hear pronunciation</button><button onclick="pictureSession.index++;photoShow()">Next picture</button></div>`;
}
pictureHome=photoMenu;
pictureStart=photoStart;
// Preserve the picture practice top back behavior.
document.addEventListener('click',e=>{let b=e.target.closest('#screenBack');if(!b)return;if(pictureSession?.photo){e.preventDefault();e.stopImmediatePropagation();pictureSession=null;photoMenu()}},true);
