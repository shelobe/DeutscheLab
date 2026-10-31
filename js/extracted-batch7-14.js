
(function(){
 const contrasts=[
  {words:['schon','schön','Sohn'],target:'schön',why:'The ö in schön is a rounded front vowel. Compare it with the plain o in schon and Sohn.'},
  {words:['Mutter','Mütter','Meter'],target:'Mütter',why:'ü is different from u: round your lips while keeping your tongue forward. Compare Mutter and Mütter.'},
  {words:['Kuchen','Küche','Kirche'],target:'Küche',why:'Küche has ü, while Kuchen has u. Listen to how the vowel changes.'},
  {words:['Straße','Strauß','Stress'],target:'Straße',why:'At the start of Straße, str sounds like shtr. The letter ß makes a sharp s sound.'},
  {words:['ich','ach','auch'],target:'ich',why:'The ch in ich is a soft sound made near the front of the mouth, unlike the back-of-the-mouth ch in ach.'},
  {words:['mein','Miene','Mann'],target:'mein',why:'ei sounds like English eye, while ie makes a long ee sound. Listen to mein and Miene.'},
  {words:['neun','nein','nun'],target:'neun',why:'eu sounds similar to oy in English boy; ei sounds like eye.'},
  {words:['zwei','drei','frei'],target:'zwei',why:'German z begins with a ts sound, as in zwei.'}
 ];
 const priorBegin=fullBegin;
 fullBegin=function(id){
  priorBegin.apply(this,arguments);
  const session=fullSession,unit=FULL_UNITS[id];
  if(!session||!unit||unit.level!=='A1'||!/(umlaut|pronunc|sounds? of|alphabet|spelling)/i.test(String(unit.title||'')))return;
  // Replace translation/definition questions: a sound lesson should assess listening, not English meanings.
  let changed=0;
  session.questions=session.questions.map((q,i)=>{
   if(q.type==='sound-choice'||q.type==='speak-word')return q;
   if(!/(choose the german for|what does|which word means|what is the meaning|translate|means “|means ")/i.test(String(q.prompt||'')))return q;
   const c=contrasts[(i+changed)%contrasts.length];changed++;
   const rotation=(i+changed)%3;
   const words=c.words.map((_,j)=>c.words[(j+rotation)%3]);
   return {type:'sound-choice',prompt:'Which audio says “'+c.target+'”?',options:['Audio 1','Audio 2','Audio 3'],answer:words.indexOf(c.target),why:c.why,dlAudioWords:words,dlTarget:c.target};
  });
  if(changed)fullRender();
 };
})();
