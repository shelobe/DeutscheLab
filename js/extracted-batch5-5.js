
const PICTURE_WORDS=[["der Hund", "dog", "🐕", "der", "Hund"], ["die Katze", "cat", "🐈", "die", "Katze"], ["das Haus", "house", "🏠", "das", "Haus"], ["der Apfel", "apple", "🍎", "der", "Apfel"], ["die Banane", "banana", "🍌", "die", "Banane"], ["das Buch", "book", "📕", "das", "Buch"], ["der Tisch", "table", "🪑", "der", "Tisch"], ["die Blume", "flower", "🌻", "die", "Blume"], ["das Auto", "car", "🚗", "das", "Auto"], ["der Baum", "tree", "🌳", "der", "Baum"], ["die Sonne", "sun", "☀️", "die", "Sonne"], ["das Wasser", "water", "💧", "das", "Wasser"], ["der Schlüssel", "key", "🔑", "der", "Schlüssel"], ["die Uhr", "clock", "🕒", "die", "Uhr"], ["das Brot", "bread", "🍞", "das", "Brot"], ["der Zug", "train", "🚆", "der", "Zug"], ["die Schule", "school", "🏫", "die", "Schule"], ["das Fahrrad", "bicycle", "🚲", "das", "Fahrrad"], ["der Schuh", "shoe", "👟", "der", "Schuh"], ["die Tür", "door", "🚪", "die", "Tür"], ["das Fenster", "window", "🪟", "das", "Fenster"], ["der Vogel", "bird", "🐦", "der", "Vogel"], ["die Tasse", "cup", "☕", "die", "Tasse"], ["das Bett", "bed", "🛏️", "das", "Bett"], ["der Käse", "cheese", "🧀", "der", "Käse"], ["die Erdbeere", "strawberry", "🍓", "die", "Erdbeere"], ["das Ei", "egg", "🥚", "das", "Ei"], ["der Fisch", "fish", "🐟", "der", "Fisch"], ["die Gabel", "fork", "🍴", "die", "Gabel"], ["das Messer", "knife", "🔪", "das", "Messer"], ["der Regenschirm", "umbrella", "☂️", "der", "Regenschirm"], ["die Jacke", "jacket", "🧥", "die", "Jacke"]];
let pictureSession=null;
function pictureHome(){
 const saved=state.pictureProgress||{attempts:0,correct:0};
 app.innerHTML=illustratedHero('Picture practice','See it. Name it. Remember the article.','forest','katze.png')
 +`<section class="card"><h2>What do you see?</h2><p>Look at a picture and choose the German word or type it yourself. Practice the article with every noun.</p><p class="muted">${saved.attempts} answers · ${saved.correct} correct</p><div class="picture-tabs"><button onclick="pictureStart('choice')">Choose the word</button><button onclick="pictureStart('type')">Type the word</button></div><p class="muted">32 everyday objects · German nouns with der, die and das.</p></section>`;
 window.scrollTo(0,0);
}
function pictureStart(mode){
 const day=Math.floor(Date.now()/86400000),idx=state.pictureProgress?.attempts||0;
 const shuffled=[...PICTURE_WORDS.keys()].sort((a,b)=>((a*37+day*13)%97)-((b*37+day*13)%97));
 pictureSession={mode,queue:shuffled,index:0,correct:0,answered:false};
 pictureShow();
}
function pictureShow(){
 let s=pictureSession;if(!s)return pictureHome();
 if(s.index>=s.queue.length){app.innerHTML=illustratedHero('Nice work!','You finished this picture round.','village','hund.png')+`<section class="card"><h2>${s.correct} / ${s.queue.length} correct</h2><button onclick="pictureStart('${s.mode}')">Practice again</button><button class="secondary" onclick="pictureHome()">Picture practice home</button></section>`;return}
 let id=s.queue[s.index],w=PICTURE_WORDS[id],choice=s.mode==='choice';
 let options=[id,(id+9)%PICTURE_WORDS.length,(id+17)%PICTURE_WORDS.length,(id+25)%PICTURE_WORDS.length].sort((a,b)=>((a+id*7)%11)-((b+id*7)%11));
 app.innerHTML=`<div class="picture-status"><span>${choice?'Choose the German word':'Write the German word'}</span><span>${s.index+1} / ${s.queue.length}</span></div><section class="card"><div class="picture-card"><span class="picture-art" role="img" aria-label="Picture of ${safeText(w[1])}">${w[2]}</span></div><h2>What is this in German?</h2><p class="muted">Include der, die or das.</p>${choice?`<div class="picture-choices">${options.map(i=>`<button class="secondary" onclick="pictureAnswer(${id},${i})">${safeText(PICTURE_WORDS[i][0])}</button>`).join('')}</div>`:`<form onsubmit="event.preventDefault();pictureTyped(${id})"><input id="pictureInput" class="picture-input" placeholder="e.g. der Hund" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="German word with article"><button type="submit">Check answer</button></form>`}<div id="pictureFeedback" aria-live="polite"></div></section>`;
 window.scrollTo(0,0);
}
function pictureAnswer(correct,chosen){pictureGrade(correct,PICTURE_WORDS[chosen][0])}
function pictureTyped(correct){pictureGrade(correct,document.getElementById('pictureInput').value)}
function pictureGrade(id,submitted){
 let s=pictureSession;if(!s||s.answered)return;
 let w=PICTURE_WORDS[id],norm=t=>t.toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' ').normalize('NFC');
 let ok=norm(submitted)===norm(w[0]);if(!ok)dlWrongHaptic();s.answered=true;try{speak(w[0])}catch(e){}if(ok)s.correct++;
 state.pictureProgress??={attempts:0,correct:0};state.pictureProgress.attempts++;if(ok)state.pictureProgress.correct++;save();
 app.querySelectorAll('.picture-choices button,form button,.picture-input').forEach(b=>b.disabled=true);
 let feedback=document.getElementById('pictureFeedback');
 feedback.innerHTML=`<div class="picture-answer"><h3>${ok?'Richtig! Correct!':'Good try!'}</h3><p><strong>${safeText(w[0])}</strong> — ${safeText(w[1])}</p><p>The noun is <strong>${safeText(w[3])}</strong> + <strong>${safeText(w[4])}</strong>. Learn both together: ${safeText(w[0])}.</p>${!ok?`<p class="muted">You entered: ${safeText(submitted||'(blank)')}</p>`:''}<button onclick="pictureNext()">Next picture</button></div>`;
}
function pictureNext(){if(!pictureSession)return;pictureSession.index++;pictureSession.answered=false;pictureShow()}
const priorHomePictures=home;
home=function(){priorHomePictures();let anchor=app.querySelector('.lesson-grid')||app.querySelector('.card');if(anchor){let card=document.createElement('section');card.className='card';card.innerHTML=`<h3>Picture practice</h3><p>Learn German words by looking at pictures.</p><button onclick="pictureHome()">Try picture practice</button>`;anchor.after(card)}};
const picNav=document.createElement('button');picNav.textContent='▧ Picture practice';picNav.setAttribute('onclick',"navigateTo('pictureHome')");let picMenu=document.getElementById('sideMenu');let articles=[...picMenu.querySelectorAll('button')].find(b=>b.textContent.includes('Noun Articles'));if(articles)articles.after(picNav);else picMenu.appendChild(picNav);
