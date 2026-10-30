
(function(){
 const lesson=FULL_UNITS.find(u=>u.level==='A1'&&u.title==='Alphabet and spelling');
 if(!lesson)return;
 lesson.rule='German uses the same 26 basic letters as English, but some are pronounced differently. German J sounds like English Y in yes; W sounds like English V; and V often sounds like English F. Listen to Januar, Wasser and Vater, then practice recognizing those sounds. German also has additional letters, which you will learn in Lesson 2.';
 lesson.examples=[['Januar','January — J sounds like English Y'],['Wasser','water — W sounds like English V'],['Vater','father — V often sounds like English F']];
 lesson.checkpoint={prompt:'In the German word Wasser, which letter makes the English V sound?',options:['W','J','V'],answer:0,why:'German W is pronounced like English V, as in Wasser.'};
 const questions=[
  ['Which letter in German usually sounds like English Y?', ['J','W','V'],0,'German J sounds like English Y, as in Jahr (year).'],
  ['In the new word Jahr (year), how does the first letter sound?', ['Like English Y','Like English J','Like English V'],0,'J in Jahr sounds like English Y.'],
  ['Which German letter usually sounds like English V?', ['W','J','V'],0,'German W sounds like English V.'],
  ['In Winter (winter), how is the first letter pronounced?', ['Like English V','Like English W','Like English F'],0,'W in Winter sounds like English V.'],
  ['Which German letter often sounds like English F?', ['V','W','J'],0,'German V often sounds like English F, as in Vogel (bird).'],
  ['In Vogel (bird), which English sound begins the word?', ['F','V','Y'],0,'The V in Vogel is usually pronounced like English F.'],
  ['Which pair starts with the same German letter sound?', ['Wasser and Winter','Vater and Jahr','Jahr and Wasser'],0,'Wasser and Winter both begin with German W, which sounds like English V.']
 ];
 const speaking=[
  ['Jahr','year','German J sounds like English Y. Listen to Jahr, then say it aloud.'],
  ['Winter','winter','German W sounds like English V. Listen to Winter, then say it aloud.'],
  ['Vogel','bird','German V often sounds like English F. Listen to Vogel, then say it aloud.']
 ];
 const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;};
 const oldBegin=fullBegin;
 fullBegin=function(id){
  const result=oldBegin.apply(this,arguments);
  if(FULL_UNITS[id]!==lesson||!fullSession)return result;
  const knowledge=shuffle(questions).map(([prompt,choices,right,why])=>{
   const correct=choices[right],options=shuffle(choices);
   return {type:'grammar',prompt,options,answer:options.indexOf(correct),why};
  });
  const speakingChecks=speaking.map(([word,meaning,why])=>({type:'speak-word',prompt:'Listen, then say this German word aloud',options:['Recognized','Try again'],answer:0,dlSpeakWord:word,dlSpeakMeaning:meaning,why}));
  // Alternate recognition and spoken production, with each new word introduced by its meaning.
  fullSession.questions=[...knowledge.slice(0,2),speakingChecks[0],...knowledge.slice(2,4),speakingChecks[1],...knowledge.slice(4,6),speakingChecks[2],...knowledge.slice(6)];
  fullSession.idx=0;fullSession.score=0;fullSession.results=[];
  fullRender();
  return result;
 };
 const oldStudy=fullStudy;
 fullStudy=function(id){
  const result=oldStudy.apply(this,arguments);
  if(FULL_UNITS[id]===lesson){
   document.querySelectorAll('.dl-alphabet-audio,.dl-letters-intro').forEach(el=>el.remove());
  }
  return result;
 };
})();
