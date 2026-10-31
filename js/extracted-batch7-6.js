
/* Curriculum-only sequencing: preserve all lesson IDs, scores, exercises and games. */
(function(){
 const groups=STRUCTURED_PATH.A1;
 if(!Array.isArray(groups)||!groups.length)return;
 const original=groups.flatMap(g=>g.ids);
 const find=title=>groups.find(g=>g.title===title);
 const move=(id,targetTitle,position)=>{
   const target=find(targetTitle);
   if(!target||!original.includes(id))return;
   for(const g of groups)g.ids=g.ids.filter(x=>x!==id);
   target.ids.splice(Math.min(position,target.ids.length),0,id);
 };
 const moveTitle=(title,targetTitle,position)=>{
   const id=FULL_UNITS.findIndex(u=>u.title===title);
   if(id>=0)move(id,targetTitle,position);
 };
 // Introduce sentence patterns alongside essential verbs, before long vocabulary units.
 const sentences=find('Building German sentences');
 const verbs=find('Essential verbs: be, have, live');
 if(sentences&&verbs){
   const idx=groups.indexOf(sentences);
   const target=groups.indexOf(verbs);
   if(idx>target+1){groups.splice(idx,1);groups.splice(target+1,0,sentences);}
 }
 // Teach noun gender before possessive endings and family descriptions.
 const objects=find('Everyday objects and articles');
 const family=find('People and family');
 if(objects&&family&&groups.indexOf(objects)>groups.indexOf(family)){
   groups.splice(groups.indexOf(objects),1);
   groups.splice(groups.indexOf(family),0,objects);
 }
 // Build basic questions immediately after sentence structure.
 const questions=find('Questions and answers');
 const sentenceGroup=find('Building German sentences');
 if(questions&&sentenceGroup&&groups.indexOf(questions)>groups.indexOf(sentenceGroup)+1){
   groups.splice(groups.indexOf(questions),1);
   groups.splice(groups.indexOf(sentenceGroup)+1,0,questions);
 }
 // Introduce cases in a progression before applied movement/preposition lessons.
 moveTitle('Accusative: direct objects','Building German sentences',99);
 moveTitle('Accusative pronouns','Building German sentences',99);
 moveTitle('Dative: with and to','Places and directions',0);
 moveTitle('Dative pronouns: to me and you','Places and directions',1);
 // Keep consolidated formal-address lesson early, rather than buried in conversations.
 moveTitle('Personal pronouns: ich, du, and Sie','I, you, we: personal pronouns',0);
 // Leave all other lessons, stable IDs and completion data untouched.
 const after=groups.flatMap(g=>g.ids);
 if(after.length!==original.length||new Set(after).size!==after.length||
    original.some(id=>!after.includes(id)))console.warn('A1 sequence integrity check failed');
})();
