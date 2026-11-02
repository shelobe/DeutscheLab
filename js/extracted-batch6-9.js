
(function(){
 const lesson=FULL_UNITS.find(u=>u.level==='A1'&&u.title==='Alphabet and spelling');
 if(!lesson)return;
 lesson.rule='German uses the same 26 basic letters as English, but some are pronounced differently. German J sounds like English Y in yes; W sounds like English V; and V often sounds like English F. Listen to Jacke, Wasser and Vater, then practice recognizing those sounds. German also has additional letters, which you will learn in Lesson 2.';
 lesson.examples=[['Jacke','jacket — J sounds like English Y'],['Wasser','water — W sounds like English V'],['Vater','father — V often sounds like English F']];
 lesson.checkpoint={prompt:'In the German word Wasser, which letter makes the English V sound?',options:['W','J','V'],answer:0,why:'German W is pronounced like English V, as in Wasser.'};
 // Apply each taught sound rule to a word reserved for practice.
 const questions=[
  ['In Jacke (jacket), how does J sound?', ['Like English Y in yes','Like English J in jam','Like English V in van'],0,'Jacke starts with the y sound in English yes. German J does not make the English j sound in jam.'],
  ['In Winter (winter), how does W sound?', ['Like English V in van','Like English W in water','Like English F in fish'],0,'Winter starts with the English v sound, just like Wasser. German W is not pronounced like English w.'],
  ['In Vogel (bird), how does V sound?', ['Like English F in fish','Like English V in van','Like English Y in yes'],0,'Vogel starts with an f sound, just like Vater. German V often has this sound in common native words; it does not always sound like English v.'],
  ['Which pair begins with the same sound?', ['Wasser and Winter','Vater and Winter','Jacke and Vater'],0,'Wasser and Winter both begin with the English v sound. Vater begins with f; Jacke begins with y. Match the spoken sound, rather than applying English letter sounds.']
 ];
 const speaking=[
  ['Jacke','jacket','German J sounds like English Y. Listen to Jacke, then say it aloud.'],
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
  // Predict a taught letter sound in a new word before hearing that word.
  const predictions=[
   ['Jahr','J','Like English Y in yes',['Like English J in jam','Like English W in water'],'Jahr begins with the y sound in English yes. Apply the same German J rule as in Jacke. Jahr means year.'],
   ['Weg','W','Like English V in van',['Like English W in water','Like English F in fish'],'Weg begins with the English v sound. Apply the same German W rule as in Wasser. Weg means way or path.'],
   ['vier','V','Like English F in fish',['Like English V in van','Like English Y in yes'],'In vier, v sounds like English f, just as in Vater. This is common in native German words, but some borrowed words use a v sound. Vier means four.']
  ].map(([word,letter,correct,others,why])=>{
   const options=shuffle([correct,...others]);
   return {type:'grammar',prompt:'Look at this new word: '+word+'. How does the '+letter+' sound?',options,answer:options.indexOf(correct),why,dlEnriched:true,dlPredictionWord:word,dlPredictionLetter:letter};
  });
  const speakingChecks=speaking.map(([word,meaning,why])=>({type:'speak-word',prompt:'Listen, then say this German word aloud',options:['Recognized','Try again'],answer:0,dlSpeakWord:word,dlSpeakMeaning:meaning,why}));
  // Keep existing checks and speaking; replace only the three broad audio-choice slots.
  fullSession.questions=[...knowledge.slice(0,2),predictions[0],speakingChecks[0],knowledge[2],predictions[1],speakingChecks[1],predictions[2],speakingChecks[2],knowledge[3]];
  fullSession.idx=0;fullSession.score=0;fullSession.results=[];
  fullRender();
  return result;
 };
 // The target recording is available only after the native answer is checked.
 const priorCheck=dlCheck;
 dlCheck=function(){
  const result=priorCheck.apply(this,arguments);
  const session=fullSession,q=session?.questions?.[session.idx];
  if(FULL_UNITS[session?.id]!==lesson||!q?.dlPredictionWord||!dlAnswered)return result;
  const feedback=document.querySelector('#dl-result .dl-flow-feedback');
  if(!feedback||feedback.querySelector('.dl-prediction-playback'))return result;
  const button=document.createElement('button');button.type='button';button.className='secondary dl-prediction-playback';button.textContent='🔊 Hear '+q.dlPredictionWord;
  button.onclick=()=>{if(fullSession===session&&session.questions[session.idx]===q&&dlAnswered)speak(q.dlPredictionWord);};
  feedback.append(button);
  return result;
 };
 const priorRender=fullRender;
 fullRender=function(){
  const result=priorRender.apply(this,arguments);
  const session=fullSession,q=session?.questions?.[session.idx];
  if(FULL_UNITS[session?.id]!==lesson||!q?.dlPredictionWord)return result;
  const heading=document.querySelector('.dl-flow-card h2');
  if(heading){
   const word=document.createElement('span'),initial=document.createElement('strong');
   initial.textContent=q.dlPredictionWord[0];initial.style.textDecoration='underline';
   word.append(initial,document.createTextNode(q.dlPredictionWord.slice(1)));
   heading.replaceChildren(document.createTextNode('Look at this new word: '),word,document.createElement('br'),document.createTextNode('How does the '+q.dlPredictionLetter+' sound?'));
  }
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
