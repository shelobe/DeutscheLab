
/* Teach noun-gender patterns inside relevant lessons, then assess transfer to
   unfamiliar nouns. The article-patterns reference page remains available. */
(function(){
 const isGenderLesson=u=>!!u&&u.level==='A1'&&/(nouns? and (their )?articles?|noun gender|gender patterns)/i.test(u.title||'');
 const genderQuestions=[
  {type:'grammar',prompt:'A new German noun ends in -ung: ___ Einladung (invitation). Which article is most likely?',options:['die','der','das'],answer:0,why:'The ending -ung is a strong feminine noun pattern. Einladung is feminine: die Einladung.'},
  {type:'grammar',prompt:'A new noun ends in -chen: ___ Häuschen (little house). Choose the article.',options:['das','die','der'],answer:0,why:'The diminutive ending -chen makes a noun neuter, even when the original noun has another gender: das Häuschen.'},
  {type:'grammar',prompt:'Choose the article for ___ Freiheit (freedom). Use the noun ending.',options:['der','die','das'],answer:1,why:'Nouns ending in -heit are feminine: die Freiheit.'},
  {type:'grammar',prompt:'Which article goes with ___ Museum? Use the -um pattern.',options:['das','der','die'],answer:0,why:'Many German nouns ending in -um are neuter, including das Museum.'},
  {type:'grammar',prompt:'Choose the article for ___ Freundschaft (friendship).',options:['die','das','der'],answer:0,why:'The suffix -schaft forms feminine nouns: die Freundschaft.'},
  {type:'grammar',prompt:'Choose the article for ___ Brötchen (bread roll).',options:['der','das','die'],answer:1,why:'The ending -chen makes a noun neuter: das Brötchen.'},
  {type:'grammar',prompt:'Choose the article for ___ Möglichkeit (possibility).',options:['die','der','das'],answer:0,why:'The ending -keit forms feminine nouns: die Möglichkeit.'},
  {type:'grammar',prompt:'Choose the article for ___ Instrument (instrument).',options:['der','die','das'],answer:2,why:'Many nouns ending in -ment are neuter, including das Instrument. This ending is a clue, not a guarantee.'}
 ];
 const previousQuestions=fullQuestions;
 fullQuestions=function(unit){
  const original=previousQuestions(unit);
  if(!isGenderLesson(unit))return original;
  // Preserve the question set of an active attempt.
  if(fullSession&&fullSession.id===FULL_UNITS.indexOf(unit)&&fullSession.questions)return fullSession.questions;
  const existing=original.filter(q=>Array.isArray(q.options)&&q.options.length>1&&!/sound|listen/i.test(q.type));
  const chosen=[...genderQuestions].sort(()=>Math.random()-.5).slice(0,5);
  const questions=[...chosen,...existing.slice(0,3)];
  return questions.map(q=>{
   const choices=q.options.map((label,i)=>({label,correct:i===q.answer}));
   for(let i=choices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
   return {...q,options:choices.map(x=>x.label),answer:choices.findIndex(x=>x.correct)};
  });
 };
 const previousStudy=fullStudy;
 fullStudy=function(id){
  previousStudy(id);
  const u=FULL_UNITS[id];
  if(!isGenderLesson(u))return;
  const card=app.querySelector('.card');
  if(!card)return;
  const panel=document.createElement('section');
  panel.className='dl-article-teaching';
  panel.innerHTML='<h3>Spot the noun ending</h3>'+
   '<p>German nouns have a grammatical gender. Some endings give you a useful clue about which article to use.</p>'+
   '<div class="dl-article-example"><strong>Usually die (feminine)</strong><p><strong>-ung</strong>: die Zeitung · <strong>-heit</strong>: die Freiheit · <strong>-keit</strong>: die Möglichkeit · <strong>-schaft</strong>: die Freundschaft · <strong>-ion</strong>: die Nation · <strong>-in</strong>: die Lehrerin</p></div>'+
   '<div class="dl-article-example"><strong>Usually das (neuter)</strong><p><strong>-chen</strong>: das Mädchen · <strong>-ment</strong>: das Instrument · <strong>-um</strong>: das Museum</p></div>'+
   '<div class="dl-article-example"><strong>Often der (masculine)</strong><p>Days, months and seasons: der Montag, der Januar, der Winter. Some nouns ending in -er are masculine, but there are exceptions.</p></div>'+
   '<p><strong>Try the pattern:</strong> You will see unfamiliar nouns with these endings. Choose der, die or das using the ending, then read the explanation.</p>'+
   '<p>These are clues, not universal rules. Learn each noun together with its article.</p>';
  const first=card.querySelector('.unit-explain');
  if(first)first.after(panel);else card.prepend(panel);
 };
})();
