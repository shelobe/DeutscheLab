/* DeutschLab: progressive pronoun lessons. Loaded after the original curriculum. */
(function(){
 const find=title=>FULL_UNITS.find(u=>u.title===title);
 const make=(title,level,rule,examples)=>({level,title,rule,examples,checkpoint:{prompt:'Choose the correct pronoun.',options:['er','sie','es'],answer:0,why:'Choose the pronoun that matches the grammatical subject.'}});
 const nounTitle='Pronouns for animals and objects';
 const noun=make(nounTitle,'A1','For a noun used as the subject, der becomes er, die becomes sie, and das becomes es. For known animals, speakers can also use biological sex.',[['Der Tisch ist neu. Er ist groß.','The table is new. It is big.'],['Die Lampe ist schön. Sie ist hell.','The lamp is beautiful. It is bright.'],['Das Buch ist interessant. Es ist neu.','The book is interesting. It is new.']]);
 noun.checkpoint={prompt:'Die Lampe ist hell. ___ ist schön.',options:['Sie','Er','Es'],answer:0,why:'Lampe is feminine (die), so use sie.'};
 const nounId=FULL_UNITS.length;FULL_UNITS.push(noun);
 const groups=STRUCTURED_PATH.A1;
 const objectGroup=groups.find(g=>g.title==='Everyday objects and articles');
 if(objectGroup){const idx=objectGroup.ids.findIndex(id=>/articles|noun gender/i.test(FULL_UNITS[id]?.title||''));objectGroup.ids.splice(idx<0?objectGroup.ids.length:idx+1,0,nounId);}
 else groups.push({title:'Pronouns and noun gender',goal:'Use pronouns for objects and animals',ids:[nounId]});
 const acc=find('Accusative pronouns'),dat=find('Dative pronouns: to me and you');
 if(acc)acc.rule='Accusative pronouns replace direct objects. In order: ich → mich, du → dich, er → ihn, sie → sie, es → es, wir → uns, ihr → euch, sie → sie, Sie → Sie. Example: Ich sehe euch (I see you all).';
 if(dat){dat.title='Dative pronouns';dat.rule='Dative pronouns mark recipients and follow verbs such as helfen: ich → mir, du → dir, er → ihm, sie → ihr, es → ihm, wir → uns, ihr → euch, sie → ihnen, Sie → Ihnen. Example: Ich helfe euch (I help you all).';}
 const reflex=find('Reflexive verbs');
 if(reflex)reflex.rule='Reflexive pronouns refer back to the subject. Accusative: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch, sie/Sie → sich. Some verbs use dative reflexives, such as Ich wasche mir die Hände. Compare Ich freue mich and Ihr freut euch.';
 const oldIntro=dlLessonIntro;
 const guides={
  [nounTitle]:[['The basic rule','The article determines the subject pronoun: der → er, die → sie, das → es. English often uses it for all three.'],['der → er','Der Tisch ist groß.\nEr ist neu.\nThe table is big. It is new.'],['die → sie','Die Lampe ist schön.\nSie ist hell.\nThe lamp is beautiful. It is bright.'],['das → es','Das Buch ist neu.\nEs ist interessant.\nThe book is new. It is interesting.'],['Animals','Der Hund schläft. Er ist müde.\nDie Katze spielt. Sie ist schnell.\nFor pets, a known animal’s sex can also influence the pronoun.'],['Remember','Identify the noun and its article first. Then use the matching pronoun.']],
  'Accusative pronouns':[['When to use them','Use an accusative pronoun for the direct object: the person or thing receiving the action.'],['Singular','ich → mich (me) · du → dich (you)\ner → ihn (him) · sie → sie (her) · es → es (it)'],['Plural','wir → uns (us) · ihr → euch (you all) · sie → sie (them)'],['Formal','Sie → Sie (you, formal). Capitalization matters.'],['Examples','Ich sehe dich. — I see you.\nSie kennt ihn. — She knows him.\nIch sehe euch. — I see you all.'],['Remember','Ask: whom or what does the verb affect? Use the accusative form.']],
  'Dative pronouns':[['When to use them','Use dative pronouns for recipients and with dative verbs such as helfen (to help).'],['Singular','ich → mir (me) · du → dir (you)\ner → ihm (him) · sie → ihr (her) · es → ihm (it)'],['Plural','wir → uns (us) · ihr → euch (you all) · sie → ihnen (them)'],['Formal','Sie → Ihnen (you, formal). Capitalization matters.'],['Examples','Kannst du mir helfen? — Can you help me?\nIch helfe dir. — I help you.\nIch helfe euch. — I help you all.'],['Remember','Compare Ich sehe dich (accusative) with Ich helfe dir (dative). Euch is the same in both cases.']],
  'Reflexive verbs':[['What reflexive means','The action refers back to the subject: Ich wasche mich. — I wash myself.'],['Accusative forms','ich → mich · du → dich · er/sie/es → sich\nwir → uns · ihr → euch · sie/Sie → sich'],['Compare','Ich freue mich. — I am happy.\nDu freust dich. — You are happy.\nIhr freut euch. — You all are happy.'],['Dative reflexives','When there is another direct object, some verbs use a dative reflexive: Ich wasche mir die Hände. — I wash my hands.'],['Remember','Learn reflexive verbs together with their required case; not every reflexive verb uses the same case.']]
 };
 dlLessonIntro=function(id){
  const result=oldIntro.apply(this,arguments),u=FULL_UNITS[id],parts=guides[u?.title];
  if(!parts)return result;
  const heading=app.querySelector('.dl-flow-card h2'),intro=heading?.nextElementSibling;
  if(!intro)return result;
  intro.textContent=u.title===nounTitle?'Learn how er, sie, and es replace nouns for objects and animals.':u.title==='Reflexive verbs'?'Learn how German expresses actions that refer back to the subject.':'Learn the complete set of '+(u.title==='Accusative pronouns'?'accusative':'dative')+' personal pronouns.';
  const guide=document.createElement('div');guide.className='dl-pronoun-guide';
  for(const [name,body] of parts){const card=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=name;p.textContent=body;p.style.whiteSpace='pre-line';card.append(h,p);guide.append(card);}
  intro.insertAdjacentElement('afterend',guide);return result;
 };
 const banks={
  [nounTitle]:[
   ['Der Tisch ist neu. ___ ist groß.',['Er','Sie','Es'],0],['Die Lampe ist hell. ___ ist schön.',['Es','Sie','Er'],1],['Das Buch ist interessant. ___ ist neu.',['Sie','Er','Es'],2],['Der Hund schläft. ___ ist müde.',['Er','Es','Sie'],0],['Die Katze spielt. ___ ist schnell.',['Er','Sie','Es'],1],['Das Pferd läuft. ___ ist schnell.',['Es','Er','Sie'],0],['Die Tasche ist teuer. ___ ist schön.',['Er','Es','Sie'],2],['Der Stuhl ist alt. ___ ist bequem.',['Sie','Er','Es'],1],['Das Auto ist rot. ___ ist neu.',['Es','Sie','Er'],0],['Which pronoun replaces die Tür?',['er','sie','es'],1],['Which pronoun replaces das Fenster?',['sie','es','er'],1],['Which pronoun replaces der Baum?',['es','sie','er'],2]],
  'Accusative pronouns':[
   ['Ich sehe ___. (you all)',['euch','ihr','uns'],0],['Sie kennt ___. (him)',['ihm','ihn','er'],1],['Du hörst ___. (me)',['mir','ich','mich'],2],['Wir besuchen ___. (them)',['sie','ihnen','ihr'],0],['Er sieht ___. (us)',['wir','uns','euch'],1],['Ich sehe ___. (you, formal)',['Ihnen','Sie','dir'],1],['Sie sucht ___. (her)',['ihr','sie','ihnen'],1],['Wir hören ___. (it)',['es','ihm','er'],0],['Ich kenne ___. (you, singular informal)',['dir','du','dich'],2],['Er besucht ___. (them)',['ihnen','sie','euch'],1]],
  'Dative pronouns':[
   ['Ich helfe ___. (you all)',['euch','ihr','uns'],0],['Sie hilft ___. (him)',['ihn','ihm','er'],1],['Kannst du ___ helfen? (me)',['mich','ich','mir'],2],['Wir helfen ___. (them)',['ihnen','sie','ihr'],0],['Er hilft ___. (us)',['wir','uns','euch'],1],['Ich helfe ___. (you, formal)',['Sie','Ihnen','dir'],1],['Ich helfe ___. (her)',['ihr','sie','ihnen'],0],['Sie hilft ___. (it)',['es','ihm','er'],1],['Ich helfe ___. (you, singular informal)',['dich','du','dir'],2],['Er hilft ___. (them)',['sie','ihnen','euch'],1]],
  'Reflexive verbs':[
   ['Ich freue ___.',['mich','mir','dich'],0],['Du freust ___.',['mich','dich','sich'],1],['Er freut ___.',['ihn','ihm','sich'],2],['Wir freuen ___.',['uns','euch','sich'],0],['Ihr freut ___.',['sich','euch','uns'],1],['Sie (they) freuen ___.',['euch','uns','sich'],2],['Ich wasche ___ die Hände.',['mir','mich','sich'],0],['Du wäschst ___ die Hände.',['dich','dir','euch'],1],['Ihr beeilt ___.',['uns','sich','euch'],2],['Wir erinnern ___.',['uns','euch','sich'],0]]
 };
 const oldQuestions=fullQuestions;
 fullQuestions=function(unit){
  const bank=banks[unit?.title];if(!bank)return oldQuestions(unit);
  const id=FULL_UNITS.indexOf(unit);
  if(fullSession?.id===id&&fullSession.questions)return fullSession.questions;
  const selected=bank.slice().sort(()=>Math.random()-.5).slice(0,7).map(([prompt,options,correct])=>{
   const shuffled=options.map((label,i)=>({label,correct:i===correct})).sort(()=>Math.random()-.5);
   return {type:'grammar',prompt,options:shuffled.map(x=>x.label),answer:shuffled.findIndex(x=>x.correct),why:unit.rule};
  });
  if(fullSession?.id===id)fullSession.questions=selected;
  return selected;
 };
})();