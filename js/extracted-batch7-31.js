
(function(){
 const clips={Mutter:[0,1.46], 'Mütter':[1.96,3.44]};
 // Two clips separated by 0.5 seconds of silence.
 const sprite='deutschlab-native-audio.ogg';
 let active=null;
 const oldSpeak=speak;
 speak=function(text,rate=1){
  const word=String(text||'').trim();
  const range=clips[word];
  if(!range){if(rate===1)return oldSpeak(text);try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));u.lang='de-DE';u.rate=rate;speechSynthesis.speak(u);return}catch(e){return oldSpeak(text)}}
  try{
   if(active){active.pause();active=null;}
   if('speechSynthesis' in window)speechSynthesis.cancel();
   const player=new Audio(sprite);player.playbackRate=rate;active=player;
   player.preload='auto';
   const start=range[0],end=range[1];
   const begin=()=>{player.currentTime=start;player.play().catch(()=>oldSpeak(text));};
   player.addEventListener('loadedmetadata',begin,{once:true});
   player.addEventListener('timeupdate',()=>{if(player.currentTime>=end){player.pause();if(active===player)active=null;}});
   player.addEventListener('error',()=>{if(active===player)active=null;oldSpeak(text);},{once:true});
   player.load();
  }catch(e){oldSpeak(text);}
 };
})();

