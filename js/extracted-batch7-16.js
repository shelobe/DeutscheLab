
(function(){
 const target='Personal pronouns: he, she, it';
 const pool=[
  ['Anna ist hier. ___ lernt Deutsch.',['Sie','Er','Es'],0,'Anna is referred to with sie (she).'],
  ['Paul wohnt in Berlin. ___ spricht Deutsch.',['Es','Er','Sie'],1,'Paul is referred to with er (he).'],
  ['Maria arbeitet heute. ___ ist beschäftigt.',['Er','Sie','Es'],1,'Use sie for Maria.'],
  ['Max ist müde. ___ schläft jetzt.',['Er','Es','Sie'],0,'Use er for Max.'],
  ['Lisa spricht Deutsch. ___ lernt Englisch.',['Es','Er','Sie'],2,'Use sie for Lisa.'],
  ['Tom und Anna lernen. ___ sprechen Deutsch.',['Sie','Er','Es'],0,'Plural sie refers to both people.'],
  ['Which pronoun means “he”?',['sie','es','er'],2,'Er means he.'],
  ['Which pronoun means “she”?',['er','sie','es'],1,'Sie means she.'],
  ['Which sentence means “She is here”?',['Sie ist hier.','Er ist hier.','Es ist hier.'],0,'Sie ist hier means She is here.'],
  ['Which sentence means “He is learning German”?',['Sie lernt Deutsch.','Es lernt Deutsch.','Er lernt Deutsch.'],2,'Er is he, and lernt means learns.'],
  ['Anna und Paul sind hier. Which means “They are here”?',['Sie sind hier.','Sie ist hier.','Er ist hier.'],0,'Plural sie uses sind; singular sie uses ist.'],
 ];
 const prior=fullQuestions;
 fullQuestions=function(unit){
   if(unit?.title!==target)return prior(unit);
   if(fullSession?.id===FULL_UNITS.indexOf(unit)&&fullSession.questions)return fullSession.questions;
   // Mix recognition, contextual substitution and short sentence comprehension.
   const shuffled=pool.map((row,i)=>({row,i})).sort(()=>Math.random()-.5).slice(0,7);
   return shuffled.map(({row})=>{
     const [prompt,options,correct,why]=row;
     const shuffledOptions=options.map((label,i)=>({label,correct:i===correct})).sort(()=>Math.random()-.5);
     return {type:'grammar',prompt,options:shuffledOptions.map(o=>o.label),answer:shuffledOptions.findIndex(o=>o.correct),why};
   });
 };
})();
