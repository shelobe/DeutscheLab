
/* Minimum six varied questions in each guided lesson; keep original bank and progress. */
(function(){
 const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
 const previousQuestions=fullQuestions;
 const focused={
  8:[
   ['Wie ___ du?',['heißt','heiße','heißen'],0,'With du, heißen becomes heißt.'],
   ['Ich ___ Lena.',['heiße','heißt','heißen'],0,'With ich, heißen becomes heiße.'],
   ['___ Morgen!',['Guten','Gute','Gutes'],0,'The standard morning greeting is Guten Morgen.'],
   ['Wie geht ___ dir?',['es','du','ich'],0,'The expression is Wie geht es dir? (How are you?)'],
   ['Ich ___ aus Deutschland.',['komme','kommt','kommen'],0,'With ich, kommen becomes komme.'],
   ['Which phrase means “Goodbye”?',['Auf Wiedersehen','Guten Morgen','Bitte'],0,'Auf Wiedersehen means goodbye.']
  ],
  9:[
   ['___ Buch liegt auf dem Tisch.',['Das','Der','Die'],0,'Buch is neuter: das Buch.'],
   ['___ Lampe ist hell.',['Die','Das','Der'],0,'Lampe is feminine: die Lampe.'],
   ['___ Tisch ist groß.',['Der','Die','Das'],0,'Tisch is masculine: der Tisch.'],
   ['___ Kind spielt.',['Das','Die','Der'],0,'Kind is neuter: das Kind.'],
   ['___ Katze schläft.',['Die','Der','Das'],0,'Katze is feminine: die Katze.'],
   ['___ Hund bellt.',['Der','Das','Die'],0,'Hund is masculine: der Hund.'],
   ['Which article is used with most plural nouns in the nominative?',['die','der','das'],0,'The nominative plural definite article is die, regardless of singular gender.']
  ]
 };
 function toQuestion(row){const [prompt,options,answer,why]=row;const correct=options[answer];const shuffled=shuffle(options);return {type:'grammar',prompt,options:shuffled,answer:shuffled.indexOf(correct),why};}
 fullQuestions=function(unit){
  const original=previousQuestions(unit),id=FULL_UNITS.indexOf(unit);
  if(fullSession?.id===id&&fullSession.questions)return fullSession.questions;
  const result=[...original],seen=new Set(result.map(q=>q.prompt));
  const extras=focused[id]||[];
  for(const row of shuffle(extras)){if(!seen.has(row[0])){result.push(toQuestion(row));seen.add(row[0]);}}
  if(result.length<6){
   const examples=unit.examples||[];
   for(let i=0;i<examples.length&&result.length<6;i++){
    const [de,en]=examples[i];
    const alternatives=examples.filter((_,j)=>j!==i).map(x=>x[1]);
    if(alternatives.length<2)continue;
    const prompt='What does “'+de+'” mean?';
    if(!seen.has(prompt)){
     result.push(toQuestion([prompt,[en,...alternatives.slice(0,2)],0,'“'+de+'” means “'+en+'”.']));seen.add(prompt);
    }
   }
   if(result.length<6&&examples.length>=3){
    for(let i=0;i<examples.length&&result.length<6;i++){
     const [de,en]=examples[i],prompt='Choose the German for “'+en+'”.';
     if(seen.has(prompt))continue;
     result.push(toQuestion([prompt,[de,...examples.filter((_,j)=>j!==i).map(x=>x[0]).slice(0,2)],0,'The German expression is “'+de+'”.']));seen.add(prompt);
    }
   }
  }
  return shuffle(result);
 };
 FULL_UNITS[9].rule='German nouns have three grammatical genders: der (masculine), die (feminine), and das (neuter). Learn each noun together with its article. In the nominative plural, the definite article is die.';
 FULL_UNITS[9].checkpoint.why='Tisch is masculine, so its nominative article is der. Compare die Lampe (feminine) and das Buch (neuter).';
 FULL_UNITS[8].rule='Use Hallo for an informal hello, Guten Morgen in the morning, Guten Tag during the day, and Auf Wiedersehen to say goodbye. To introduce yourself, say Ich heiße ... or Ich komme aus ... .';
})();
