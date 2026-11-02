
(function(){
 const lesson=FULL_UNITS.find(u=>u.level==='A1'&&u.title==='Alphabet and spelling');
 if(!lesson)return;
 lesson.rule='German uses the same 26 basic letters as English, but some are pronounced differently. German J sounds like English Y in yes; W sounds like English V; and V often sounds like English F. Listen to Januar, Wasser and Vater, then practice recognizing those sounds. German also has additional letters, which you will learn in Lesson 2.';
 lesson.examples=[['Januar','January — J sounds like English Y'],['Wasser','water — W sounds like English V'],['Vater','father — V often sounds like English F']];
 lesson.checkpoint={prompt:'In the German word Wasser, which letter makes the English V sound?',options:['W','J','V'],answer:0,why:'German W is pronounced like English V, as in Wasser.'};
 // Apply each taught sound rule to a word reserved for practice.
 const questions=[
  ['In Jahr (year), how does J sound?', ['Like English Y in yes','Like English J in jam','Like English V in van'],0,'Jahr starts with the y sound in English yes, just like Januar. German J does not make the English j sound in jam.'],
  ['In Winter (winter), how does W sound?', ['Like English V in van','Like English W in water','Like English F in fish'],0,'Winter starts with the English v sound, just like Wasser. German W is not pronounced like English w.'],
  ['In Vogel (bird), how does V sound?', ['Like English F in fish','Like English V in van','Like English Y in yes'],0,'Vogel starts with an f sound, just like Vater. German V often has this sound in common native words; it does not always sound like English v.'],
  ['Which pair begins with the same sound?', ['Wasser and Winter','Vater and Winter','Jahr and Vater'],0,'Wasser and Winter both begin with the English v sound. Vater begins with f; Jahr begins with y. Match the spoken sound, rather than applying English letter sounds.']
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
   return {type:'grammar',prompt,options,answer:options.indexOf(correct),why,dlEnriched:true};
  });
  const listening=speaking.map(([word,,why])=>{
   const words=shuffle(speaking.map(([text])=>text));
   return {type:'sound-choice',prompt:'Which audio says “'+word+'”?',options:words.map((_,i)=>'Audio '+(i+1)),answer:words.indexOf(word),why,dlAudioWords:words,dlTarget:word,dlEnriched:true};
  });
  const speakingChecks=speaking.map(([word,meaning,why])=>({type:'speak-word',prompt:'Listen, then say this German word aloud',options:['Recognized','Try again'],answer:0,dlSpeakWord:word,dlSpeakMeaning:meaning,why}));
  // Keep rule application, listening and spoken production; avoid duplicate rule recall.
  fullSession.questions=[...knowledge.slice(0,2),listening[0],speakingChecks[0],knowledge[2],listening[1],speakingChecks[1],listening[2],speakingChecks[2],knowledge[3]];
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
