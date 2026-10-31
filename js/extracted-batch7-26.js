
// Picture practice must use the bundled emoji bank, never absent SVG files or remote photos.
function reliablePictureMenu(){
 pictureSession=null;
 const saved=state.pictureProgress||{attempts:0,correct:0};
 app.innerHTML=illustratedHero('Picture practice','See it. Name it. Remember the article.','forest','katze.png')+
 `<section class="card"><h2>What do you see?</h2><p>Identify familiar objects and learn their German articles.</p><p class="muted">${saved.attempts} answers · ${saved.correct} correct</p><div class="picture-tabs"><button onclick="pictureStart('choice')">Choose the word</button><button onclick="pictureStart('type')">Type the word</button></div><p class="muted">32 everyday objects · works offline.</p></section>`;
 window.scrollTo(0,0);
}
function reliablePictureStart(mode){
 const pool=[...PICTURE_WORDS.keys()];
 for(let i=pool.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 pictureSession={mode,queue:pool.slice(0,10),index:0,correct:0,answered:false,photo:false};
 pictureShow();
}
photoMenu=reliablePictureMenu;
pictureHome=reliablePictureMenu;
photoStart=reliablePictureStart;
pictureStart=reliablePictureStart;

