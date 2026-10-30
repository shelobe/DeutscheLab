
(function(){
 const soundSets=[
  {words:['ich','ach','auch'],target:0,note:'German ich has a soft ch sound, unlike the throaty ch in ach. Listen for the difference.'},
  {words:['schon','schön','Sohn'],target:1,note:'ö is a rounded front vowel. It sounds different from the o in schon or Sohn.'},
  {words:['Mutter','Mütter','Meter'],target:1,note:'ü is not the same as u. Keep your lips rounded while shaping the front vowel.'},
  {words:['weiß','weise','Wasser'],target:0,note:'German ei sounds like the vowel in English eye. The ß represents an s sound.'},
  {words:['mein','Mann','Miene'],target:0,note:'The German combination ei sounds like English eye, whereas ie is a long ee sound.'},
  {words:['Zeit','seit','sieht'],target:2,note:'ie usually signals a long ee vowel. ei is pronounced like English eye.'},
  {words:['Schule','Stuhl','Spule'],target:0,note:'At the start of a German word, sch represents a sh sound; st and sp often begin with sht and shp.'},
  {words:['zwei','drei','frei'],target:0,note:'German z begins with a ts sound, so zwei starts differently from drei and frei.'},
  {words:['Vater','Wasser','Farbe'],target:1,note:'German w is pronounced like English v. German v is often pronounced like f.'},
  {words:['Buch','Bücher','Bach'],target:1,note:'The ch in Bücher is softer than the back-of-the-throat ch in Buch or Bach.'},
  {words:['Hose','Hase','Haus'],target:2,note:'au is a diphthong, similar to ow in English cow. It differs from simple o and a vowels.'},
  {words:['Bett','Beet','bitte'],target:1,note:'A doubled vowel, as in Beet, usually indicates a long vowel; compare the short e in Bett.'},
  {words:['Küche','Kuchen','Kirche'],target:0,note:'Compare Küche (ü), Kuchen (u), and Kirche (i). These vowels are distinct in German.'},
  {words:['neun','nun','nein'],target:0,note:'eu and äu sound like oy in English boy; ei sounds like eye.'},
  {words:['Straße','Strauß','Stress'],target:0,note:'At the beginning of German words, str is pronounced with a sh sound; ß is an s sound.'}
 ];
 window.dlReviewSoundSets=soundSets;
 const priorBegin=fullBegin;
 fullBegin=function(id){
  priorBegin(id);
  const s=fullSession,u=FULL_UNITS[id];
  if(!s||!u||u.level!=='A1'||!/(umlaut|pronunc|sounds? of|alphabet|spelling)/i.test(String(u.title||''))||!Array.isArray(s.questions)||s.questions.some(q=>q.type==='sound-choice'))return;
  const index=Math.abs(Number(id)||0)%soundSets.length;
  const entry=soundSets[index];
  // Rotate the correct answer's position so the learner cannot use a fixed button position.
  const shift=index%3;
  const words=entry.words.map((_,i)=>entry.words[(i+shift)%3]);
  const correct=words.indexOf(entry.words[entry.target]);
  const q={type:'sound-choice',prompt:'Which audio says “'+entry.words[entry.target]+'”?',options:['Audio 1','Audio 2','Audio 3'],answer:correct,why:entry.note,dlAudioWords:words,dlTarget:entry.words[entry.target]};
  s.questions.splice(Math.min(3,s.questions.length),0,q);
  fullRender();
 };
 const priorRender=fullRender;
 fullRender=function(){
  priorRender();
  const s=fullSession,q=s&&s.questions&&s.questions[s.idx];
  if(!q||q.type!=='sound-choice')return;
  const card=document.querySelector('.dl-flow-card');if(!card)return;
  const label=card.querySelector('.dl-flow-label');if(label)label.textContent='LISTEN AND IDENTIFY THE SOUND';
  const options=card.querySelectorAll('.dl-flow-options button');
  options.forEach((b,i)=>{
   b.classList.add('dl-audio-choice');
   b.innerHTML='<span class="dl-audio-icon" aria-hidden="true">🔊</span><span>Play audio '+(i+1)+'</span>';
   b.addEventListener('click',()=>{if(!dlAnswered&&typeof speak==='function')speak(q.dlAudioWords[i])});
  });
  const group=card.querySelector('.dl-flow-options');
  if(group){const note=document.createElement('p');note.className='dl-audio-note';note.textContent='Tap each choice to hear a German word, then select the audio that matches the written word. You can replay each option.';group.before(note)}
  const tip=document.getElementById('dl-tip'),help=document.getElementById('dl-help-btn');
  if(tip)tip.hidden=true;if(help)help.hidden=true;
 };
 const priorCheck=dlCheck;
 dlCheck=function(){
  const s=fullSession,q=s&&s.questions&&s.questions[s.idx];
  if(!q||q.type!=='sound-choice')return priorCheck();
  if(dlAnswered||dlSelected===null)return;
  const choice=dlSelected;
  priorCheck();
  const result=document.getElementById('dl-result');
  if(result){const extra=document.createElement('p');extra.textContent='Audio '+(q.answer+1)+' says “'+q.dlTarget+'”. '+q.why;result.appendChild(extra)}
 };
})();
