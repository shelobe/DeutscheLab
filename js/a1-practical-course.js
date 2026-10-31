/* Practical A1: title-based lesson mapping and stable module keys.
 * Authored language content is original. Sequencing reference: DW Nicos Weg A1.
 */
(function(){
 const definitions=[
 {
  "key": "sounds",
  "title": "Alphabet, sounds and spelling",
  "goal": "Recognize German sounds and connect them to useful written words.",
  "lessons": [
   "Alphabet and spelling",
   "Umlauts and ß"
  ]
 },
 {
  "key": "introductions",
  "title": "Hello, names and personal information",
  "goal": "Greet someone, introduce yourself and give basic personal details.",
  "lessons": [
   "Greetings and introductions",
   "Greetings and goodbyes",
   "Introducing yourself: heißen and wohnen",
   "Countries, nationalities and languages",
   "People and names: Vocabulary and meaning",
   "Forms and personal details"
  ]
 },
 {
  "key": "pronouns",
  "title": "People, pronouns and asking for help",
  "goal": "Identify who is speaking and use helpful conversation requests.",
  "lessons": [
   "Personal pronouns: ich, du, and Sie",
   "Personal pronouns: he, she, it",
   "Personal pronouns: we, you all, they",
   "Everyday conversations: Understanding in context"
  ]
 },
 {
  "key": "verbs",
  "title": "Present-tense verbs",
  "goal": "Use regular endings, sein, haben and common vowel changes.",
  "lessons": [
   "Present-tense verbs",
   "The verb sein: to be",
   "The verb haben: to have",
   "Verbs that change a vowel",
   "People and names: Sentence patterns",
   "People and names: Understanding in context"
  ]
 },
 {
  "key": "nouns",
  "title": "Nouns, articles and plurals",
  "goal": "Name familiar things, recognize plurals and refer back to a noun.",
  "lessons": [
   "Nouns and articles",
   "Common nouns and their articles",
   "Plural nouns",
   "Pronouns for animals and objects"
  ]
 },
 {
  "key": "numbers",
  "title": "Numbers, ages and amounts",
  "goal": "Understand quantities, ages and numbers up to one hundred.",
  "lessons": [
   "Numbers: zero through ten",
   "Numbers: eleven through twenty",
   "Numbers: twenty-one through one hundred",
   "Numbers and ages"
  ]
 },
 {
  "key": "sentences",
  "title": "Statements and questions",
  "goal": "Arrange simple statements and ask for the information you need.",
  "lessons": [
   "Basic word order",
   "Question words: who, what, where",
   "Question words: when, why, how",
   "Question words: where from and where to",
   "Questions and answers"
  ]
 },
 {
  "key": "negation",
  "title": "Saying no and correcting information",
  "goal": "Use nicht and kein in short everyday statements.",
  "lessons": [
   "Negation: nicht and kein"
  ]
 },
 {
  "key": "family",
  "title": "Family, friends and possession",
  "goal": "Introduce relatives and describe who something belongs to.",
  "lessons": [
   "Family words",
   "Possessives: my and your",
   "Possessives: his, her, our",
   "Family and possessives",
   "Family and friends: Vocabulary and meaning",
   "Family and friends: Sentence patterns",
   "Family and friends: Understanding in context"
  ]
 },
 {
  "key": "home",
  "title": "At home",
  "goal": "Name rooms and furniture and describe a home.",
  "lessons": [
   "Home and furniture",
   "At home: Vocabulary and meaning",
   "At home: Sentence patterns",
   "At home: Understanding in context"
  ]
 },
 {
  "key": "objects",
  "title": "People and things as objects",
  "goal": "Use basic direct-object articles and pronouns.",
  "lessons": [
   "Accusative: direct objects",
   "Accusative pronouns"
  ]
 },
 {
  "key": "food",
  "title": "Food, drinks and ordering",
  "goal": "Understand food vocabulary and order politely.",
  "lessons": [
   "Food and drink vocabulary",
   "Food and ordering",
   "Food and drink: Vocabulary and meaning",
   "Food and drink: Sentence patterns",
   "Food and drink: Understanding in context"
  ]
 },
 {
  "key": "shopping",
  "title": "Shopping, prices and clothing",
  "goal": "Ask prices, choose quantities and request clothes in a suitable size.",
  "lessons": [
   "Shopping: prices and quantities",
   "Clothes and sizes",
   "Shopping and money: Vocabulary and meaning",
   "Shopping and money: Sentence patterns",
   "Shopping and money: Understanding in context"
  ]
 },
 {
  "key": "time",
  "title": "Days, dates and appointments",
  "goal": "Understand days, clock times and dates and arrange a meeting.",
  "lessons": [
   "Days of the week",
   "Months and basic dates",
   "Days, dates and time",
   "Time and appointments: Vocabulary and meaning",
   "Time and appointments: Sentence patterns",
   "Time and appointments: Understanding in context",
   "Messages and invitations"
  ]
 },
 {
  "key": "routines",
  "title": "Daily routines and separable verbs",
  "goal": "Describe daily activities and when they happen.",
  "lessons": [
   "Separable verbs: daily routine",
   "Daily habits and schedules",
   "Daily routines",
   "Everyday activities: Vocabulary and meaning",
   "Everyday activities: Sentence patterns",
   "Everyday activities: Understanding in context"
  ]
 },
 {
  "key": "hobbies",
  "title": "Hobbies, abilities and wishes",
  "goal": "Say what you enjoy, can do, need to do or would like.",
  "lessons": [
   "Modal verbs: can and must",
   "Wants and polite requests",
   "Hobbies and interests",
   "Free time and hobbies: Vocabulary and meaning",
   "Free time and hobbies: Sentence patterns",
   "Free time and hobbies: Understanding in context"
  ]
 },
 {
  "key": "weather",
  "title": "Colors, clothing and weather",
  "goal": "Describe objects, clothing and everyday weather conditions.",
  "lessons": [
   "Colors and describing things",
   "Weather and seasons",
   "Weather and clothing: Vocabulary and meaning",
   "Weather and clothing: Sentence patterns",
   "Weather and clothing: Understanding in context"
  ]
 },
 {
  "key": "travel",
  "title": "Around town and travelling",
  "goal": "Find places, follow directions and use common destination and dative phrases.",
  "lessons": [
   "Places around town",
   "Places and directions",
   "Prepositions: places and movement",
   "Dative: with and to",
   "Dative pronouns",
   "Getting around: Vocabulary and meaning",
   "Getting around: Sentence patterns",
   "Getting around: Understanding in context",
   "Schedules and notices",
   "Understanding instructions"
  ]
 },
 {
  "key": "work-health",
  "title": "Work, health and getting help",
  "goal": "Talk about work, explain common symptoms and arrange help.",
  "lessons": [
   "Work and occupations",
   "Health and appointments",
   "Health and wellbeing: Vocabulary and meaning",
   "Health and wellbeing: Sentence patterns",
   "Health and wellbeing: Understanding in context"
  ]
 },
 {
  "key": "conversation",
  "title": "Useful everyday conversations",
  "goal": "Choose clear requests, ask for clarification and understand practical replies.",
  "lessons": [
   "Everyday conversations: Vocabulary and meaning",
   "Everyday conversations: Sentence patterns"
  ]
 },
 {
  "key": "past",
  "title": "Talking about past events",
  "goal": "Describe a few familiar past activities using Perfekt, war and hatte.",
  "lessons": [
   "Talking about yesterday: Perfekt",
   "Past events: common participles"
  ]
 },
 {
  "key": "review",
  "title": "Putting A1 into practice",
  "goal": "Combine information, short messages, questions and everyday tasks across the course.",
  "lessons": [
   "Review: pronouns and questions",
   "Review: articles and objects",
   "Review: everyday situations"
  ]
 }
];
 const legacy=STRUCTURED_PATH.A1.map(g=>({...g,ids:[...g.ids]}));
 const packs=window.DL_LESSON_ENRICHMENT;
 Object.assign(packs,window.DL_A1_PRACTICAL_PACKS);
 const find=title=>FULL_UNITS.findIndex(u=>u.level==='A1'&&u.title===title);
 const needed=definitions.flatMap(g=>g.lessons);
 for(const title of needed){
  if(find(title)>=0)continue;
  const p=packs['A1|'+title];if(!p?.questions?.length)throw Error('Missing A1 teaching pack: '+title);
  FULL_UNITS.push({level:'A1',title,rule:'',examples:p.examples||[],checkpoint:p.questions[0]});
 }
 const groups=definitions.map(g=>({key:g.key,title:g.title,goal:g.goal,context:g.goal,ids:g.lessons.map(find)}));
 const linked=groups.flatMap(g=>g.ids);
 if(linked.some(i=>i<0)||new Set(linked).size!==linked.length)throw Error('Invalid A1 lesson mapping');
 for(const i of legacy.flatMap(g=>g.ids))if(!linked.includes(i))throw Error('Existing A1 lesson lost: '+FULL_UNITS[i]?.title);
 for(const unitId of linked){
  const u=FULL_UNITS[unitId];
  if(u.title==='Basic word order'&&!packs['A1|'+u.title])packs['A1|'+u.title]={sections:[['Build a statement',u.rule]],examples:u.examples,questions:[]};
  const p=packs['A1|'+u.title];
  if(!p?.sections?.length)throw Error('Missing A1 introduction: '+u.title);
  if(u.title!=='Basic word order'&&!p.questions?.length&&!/Alphabet|Umlauts/.test(u.title))throw Error('Missing A1 practice: '+u.title);
  u.dlPracticalCourse=true;
  if(p.questions?.length)u.checkpoint={...p.questions[0],options:[...p.questions[0].options]};
 }
 STRUCTURED_PATH.A1=groups;
 // Legacy units remain at their old IDs for saved results and direct links. Only
 // duplicated/unlinked legacy content stays outside the canonical path.
 const version='a1-practical-2026-01';
 const signature=g=>[...g.ids].sort((a,b)=>a-b).join(',');
 function migrate(){
  ensureLearning();const learning=state.learning;
  if(learning.a1Practical?.version===version)return;
  const oldReviews=learning.moduleReviews||{},oldAccess=new Set();let open=true;
  for(let n=0;n<legacy.length;n++){
   if(open)legacy[n].ids.forEach(i=>oldAccess.add(i));
   if(!oldReviews['A1-'+n]?.passed)open=false;
  }
  const archived=Object.fromEntries(Object.entries(oldReviews).filter(([key])=>/^A1-\d+$/.test(key)).map(([key,value])=>[key,{...value}]));
  learning.a1LegacyReviews??={};learning.a1LegacyReviews[version]=archived;
  const stable={},access=[];
  for(const g of groups){
   const prior=legacy.findIndex(x=>signature(x)===signature(g));
   if(prior>=0&&archived['A1-'+prior])stable[g.key]={...archived['A1-'+prior]};
   // Keep access to previously available lessons without assigning unearned review passes.
   if(g.ids.some(i=>oldAccess.has(i)))access.push(g.key);
  }
  for(const key of Object.keys(oldReviews))if(/^A1-\d+$/.test(key))delete oldReviews[key];
  learning.moduleReviews=oldReviews;
  groups.forEach((g,n)=>{if(stable[g.key])oldReviews['A1-'+n]={...stable[g.key]}});
  learning.a1Practical={version,reviews:stable,access};
  if(typeof save==='function')save();
 }
 migrate();
 const previousView=curriculumView;
 curriculumView=function(){migrate();return previousView.apply(this,arguments)};
 const previousLesson=curriculumLesson;
 curriculumLesson=function(){migrate();return previousLesson.apply(this,arguments)};
 const previousIntro=curriculumModuleIntro;
 curriculumModuleIntro=function(){migrate();return previousIntro.apply(this,arguments)};
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 function pool(unitId){
  return shuffle(fullQuestions(FULL_UNITS[unitId]).filter(q=>q.type!=='listen'&&Array.isArray(q.options)&&q.options.length>=2&&q.answer>=0&&q.answer<q.options.length).map(q=>({...q,options:[...q.options],unitId})));
 }
 function selected(pools,limit){
  const result=[],seen=new Set();
  while(result.length<limit&&pools.some(a=>a.length)){
   for(const a of pools){
    let q;while(a.length&&!q){const item=a.shift();if(!seen.has(item.prompt)){q=item;seen.add(item.prompt)}}
    if(q)result.push(q);if(result.length===limit)break;
   }
  }
  return result;
 }
 const previousReview=curriculumReview;
 curriculumReview=function(level,n){
  migrate();const result=previousReview.apply(this,arguments),s=moduleSession,g=STRUCTURED_PATH[level]?.[n];
  if(level!=='A1'||n===0||!s||s.level!==level||s.n!==n||!g)return result;
  let pools;
  if(g.key==='review'){
   // One task from each earlier practical topic: this is deliberately cumulative.
   pools=groups.slice(0,-1).map(topic=>shuffle(topic.ids.flatMap(pool)));
  }else pools=g.ids.map(pool);
  if(pools.some(a=>!a.length))throw Error('A1 review has an empty lesson pool');
  const available=pools.flat();
  // A normal review is at most 15; the final has one task per earlier topic.
  let questions=selected(pools,g.key==='review'?pools.length:15);
  const ensureFormat=predicate=>{
   if(questions.some(predicate))return;
   const candidate=available.find(predicate);if(!candidate)return;
   let index=questions.findLastIndex(q=>q.unitId===candidate.unitId);
   if(index<0&&g.key==='review'){
    const topic=groups.find(t=>t.ids.includes(candidate.unitId));
    index=questions.findIndex(q=>topic.ids.includes(q.unitId));
   }
   if(index>=0)questions[index]=candidate;
  };
  ensureFormat(q=>!!q.dlWriteAnswer);
  ensureFormat(q=>!!q.dlReviewAudio);
  questions=questions.map(q=>q.dlWriteAnswer?{...q,dlReviewMode:'write'}:q);
  s.questions=shuffle(questions);s.idx=0;s.score=0;s.answered=false;s.dlCoreScore=0;s.dlCoreCount=questions.length;s.dlMissed=[];
  curriculumReviewRender();return result;
 };
 const previousRender=curriculumReviewRender;
 curriculumReviewRender=function(){
  const s=moduleSession,finished=s?.level==='A1'&&s.idx>=s.questions.length;
  const result=previousRender.apply(this,arguments);
  if(finished){
   const key=groups[s.n]?.key,record=state.learning?.moduleReviews?.['A1-'+s.n];
   if(key&&record){migrate();state.learning.a1Practical.reviews[key]={...record};if(typeof save==='function')save();}
  }
  return result;
 };
})();
