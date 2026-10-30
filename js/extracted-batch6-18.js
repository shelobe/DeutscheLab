
/* A1 foundations data pack. Keep the rest of the app and existing lesson IDs unchanged. */
const dlA1Pack = {loaded:false, promise:null, byTitle:new Map()};
async function dlLoadA1Pack(){
 if(dlA1Pack.loaded)return true;
 if(!dlA1Pack.promise)dlA1Pack.promise=fetch('./a1_foundations.json',{cache:'no-cache'})
  .then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()})
  .then(data=>{
    if(data.schemaVersion!==1||data.level!=='A1'||!Array.isArray(data.lessons))throw Error('Invalid A1 course data');
    for(const lesson of data.lessons){
      if(!lesson.title||!Array.isArray(lesson.questions)||lesson.questions.length<10)throw Error('Incomplete lesson '+lesson.title);
      for(const q of lesson.questions){if(!Array.isArray(q.options)||q.options.length!==3||!Number.isInteger(q.answer)||q.answer<0||q.answer>2||!q.german||!q.english)throw Error('Invalid question in '+lesson.title)}
      dlA1Pack.byTitle.set(lesson.title,lesson.questions);
    }
    dlA1Pack.loaded=true;return true;
  }).catch(e=>{console.error('A1 data pack failed to load:',e);dlA1Pack.promise=null;return false});
 return dlA1Pack.promise;
}
const dlA1PreviousQuestions=fullQuestions;
fullQuestions=function(unit){
 const bank=unit?.level==='A1'?dlA1Pack.byTitle.get(unit.title):null;
 if(!bank)return dlA1PreviousQuestions(unit);
 const questions=bank.map(q=>{
   const options=[...q.options];
   for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
   return {...q,options,answer:options.indexOf(q.options[q.answer])};
 });
 for(let i=questions.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[questions[i],questions[j]]=[questions[j],questions[i]];}
 return questions.slice(0,12);
};
const dlA1PreviousBegin=fullBegin;
fullBegin=async function(id){
 const unit=FULL_UNITS[id];
 if(unit?.level==='A1' && ['Greetings and introductions','Nouns and articles','Present-tense verbs','Basic word order'].includes(unit.title)){
   const loaded=await dlLoadA1Pack();
   if(!loaded){alert('The new A1 course file is missing. Upload a1_foundations.json alongside index.html to GitHub.');return;}
 }
 return dlA1PreviousBegin(id);
};
const dlA1PreviousCheck=dlCheck;
dlCheck=function(){
 const s=fullSession, q=s?.questions?.[s.idx];
 dlA1PreviousCheck();
 if(!q?.german||!q?.english||!dlAnswered)return;
 const feedback=document.querySelector('#dl-result .dl-flow-feedback');
 if(!feedback)return;
 feedback.querySelectorAll('.dl-a1-translation,.dl-article-translation').forEach(el=>el.remove());
 const div=document.createElement('div');div.className='dl-a1-translation';
 const de=document.createElement('p'),en=document.createElement('p');
 const deLabel=document.createElement('strong');deLabel.textContent='German: ';
 const enLabel=document.createElement('strong');enLabel.textContent='English: ';
 de.append(deLabel,document.createTextNode(q.german));
 en.append(enLabel,document.createTextNode(q.english));
 div.append(de,en);feedback.append(div);
};
