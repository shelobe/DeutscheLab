
// Restore the reliable, recognizable emoji quiz instead of photos or SVG illustrations.
photoMenu=function(){pictureSession=null;pictureHome();};
photoStart=function(mode){pictureStart(mode);};
// Use the same clear emoji vocabulary in the main picture quiz and practice games.
const emojiBackSync=()=>{
 const b=document.getElementById('screenBack');if(!b)return;
 const isEmojiRound=!!app.querySelector('.picture-art');
 const isEmojiMenu=app.textContent.includes('32 everyday objects')&&app.textContent.includes('What do you see?');
 if(isEmojiRound||isEmojiMenu){b.style.display='inline-flex';b.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();if(isEmojiRound){pictureSession=null;pictureHome()}else home();window.scrollTo(0,0)};}
};
new MutationObserver(emojiBackSync).observe(app,{childList:true,subtree:false});
emojiBackSync();

