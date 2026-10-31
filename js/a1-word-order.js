/* A1 Basic word order: arrange supplied verb forms, rather than conjugate them. */
(function(){
 const unit=FULL_UNITS.find(u=>u.level==='A1'&&u.title==='Basic word order');
 if(!unit)return;
 const style=document.createElement('style');
 style.textContent=`.dl-order-question{padding-bottom:110px}.dl-order-check-dock{position:fixed;inset:auto 0 0;display:flex;justify-content:space-between;gap:14px;z-index:10020;padding:12px 18px calc(12px + env(safe-area-inset-bottom,0px));background:#142a3a;border-top:1px solid #4d797e;box-sizing:border-box}.dl-order-check-dock button{margin:0;min-height:54px}.dl-order-check-dock .dl-flow-action{width:auto;flex:1;max-width:65%}`;
 document.head.append(style);
 unit.rule='In an ordinary German statement, the conjugated verb stays in second position. Start with the subject, or put a time expression first and move the subject after the verb. A position can contain several words.';
 unit.examples=[
  ['Ich lerne heute Deutsch.','I am learning German today.'],
  ['Heute lerne ich Deutsch.','Today I am learning German.'],
  ['Wir trinken morgen Wasser.','We are drinking water tomorrow.'],
  ['Morgen trinken wir Wasser.','Tomorrow we are drinking water.'],
  ['Um sieben Uhr trinke ich Kaffee.','At seven o’clock I drink coffee.']
 ];
 const rows=[
  ['I am learning German today.','Ich','Ich lerne heute Deutsch','Heute lerne ich Deutsch','Ich heute lerne Deutsch','Ich is the subject in position one. Lerne is the conjugated verb in position two; heute adds when.'],
  ['Today I am learning German.','Heute','Heute lerne ich Deutsch','Ich lerne heute Deutsch','Heute ich lerne Deutsch','Heute takes position one. Lerne stays second, so ich follows the verb.'],
  ['We are drinking water tomorrow.','Wir','Wir trinken morgen Wasser','Morgen trinken wir Wasser','Wir morgen trinken Wasser','Wir comes first, trinken stays second, and morgen gives the time.'],
  ['Tomorrow we are drinking water.','Morgen','Morgen trinken wir Wasser','Wir trinken morgen Wasser','Morgen wir trinken Wasser','Morgen takes position one. The verb trinken follows immediately, then the subject wir.'],
  ['She is buying bread today.','Sie','Sie kauft heute Brot','Heute kauft sie Brot','Sie heute kauft Brot','Sie is the subject; kauft is the conjugated verb and stays second. Heute comes later in this version.'],
  ['Today she is buying bread.','Heute','Heute kauft sie Brot','Sie kauft heute Brot','Heute sie kauft Brot','Putting heute first changes the order to time → verb → subject: Heute kauft sie.'],
  ['At seven o’clock I drink coffee.','Um sieben Uhr','Um sieben Uhr trinke ich Kaffee','Ich trinke um sieben Uhr Kaffee','Um sieben Uhr ich trinke Kaffee','Um sieben Uhr is one time expression, even though it has three words. It fills position one; trinke is the next part, followed by ich.'],
  ['I drink coffee at seven o’clock.','Ich','Ich trinke um sieben Uhr Kaffee','Um sieben Uhr trinke ich Kaffee','Ich um sieben Uhr trinke Kaffee','Ich takes position one and trinke stays second. The time expression um sieben Uhr comes after the verb in this version.']
 ];
 const acceptedEndTime={
  'Ich lerne heute Deutsch':['Ich lerne Deutsch heute'],
  'Wir trinken morgen Wasser':['Wir trinken Wasser morgen'],
  'Sie kauft heute Brot':['Sie kauft Brot heute'],
  'Ich trinke um sieben Uhr Kaffee':['Ich trinke Kaffee um sieben Uhr']
 };
 const previousQuestions=fullQuestions;
 fullQuestions=function(u){
  if(u!==unit)return previousQuestions(u);
  return rows.map(([english,start,correct,alternative,wrong,why])=>({
   type:'grammar',dlOrder:true,dlStart:start,
   prompt:english+' Start with “'+start+'”.',
   // Real alternatives also keep this question usable in module review.
   options:[correct+'.',alternative+'.',wrong+'.'],answer:0,
   german:correct+'.',english,why,
   tokens:correct.split(' '),dlAccepted:[correct,...(acceptedEndTime[correct]||[])]
  }));
 };
 function guide(){
  if(FULL_UNITS[activeLessonScreen]!==unit||document.getElementById('dl-order-guide'))return;
  const heading=app.querySelector('.dl-flow-card h2'),paragraph=heading?.nextElementSibling;
  if(paragraph?.tagName!=='P')return;
  const parts=[
   ['The subject and the verb','The subject tells us who acts: ich (I), wir (we), sie (she). The conjugated verb expresses the action: lerne, trinken, kauft. In these statements, the verb stays in second position.'],
   ['Start with the subject','Ich | lerne | heute Deutsch.\nI am learning German today.\nPosition 1: Ich · Position 2: lerne · Time: heute.'],
   ['Move time to the front','Heute | lerne | ich Deutsch.\nToday I am learning German.\nHeute now fills position 1. Lerne stays in position 2, so ich moves after it. Do not use Heute ich lerne.'],
   ['Two ways to say it','Wir trinken morgen Wasser.\nMorgen trinken wir Wasser.\nBoth describe drinking water tomorrow. Starting with morgen puts the time first; it does not change the verb form.'],
   ['Position does not mean word number','Um sieben Uhr | trinke | ich Kaffee.\nAt seven o’clock I drink coffee.\nThe whole phrase Um sieben Uhr fills position 1. Trinke follows that phrase, even though it is the fourth written word.'],
   ['Remember','Subject first: subject → verb → time and details.\nTime first: time → verb → subject and details.\nIn practice, follow the requested opening. Another order can be grammatical but may not follow that instruction. The verb forms are supplied so you can focus on word order.']
  ];
  const div=document.createElement('div');div.id='dl-order-guide';div.className='dl-pronoun-guide';
  for(const [title,body] of parts){const section=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p');h.textContent=title;p.textContent=body;p.style.whiteSpace='pre-line';section.append(h,p);div.append(section);}
  paragraph.replaceWith(div);
 }
 const previousStudy=fullStudy,previousIntro=dlLessonIntro;
 fullStudy=function(id){const result=previousStudy.apply(this,arguments);if(FULL_UNITS[id]===unit)guide();return result;};
 dlLessonIntro=function(id){const result=previousIntro.apply(this,arguments);if(FULL_UNITS[id]===unit)guide();return result;};
 const previousRender=fullRender;
 fullRender=function(){
  const result=previousRender.apply(this,arguments);
  const s=fullSession,q=s?.questions?.[s.idx];if(!q?.dlOrder||FULL_UNITS[s.id]!==unit)return result;
  const choices=app.querySelector('.dl-flow-options');if(!choices)return result;
  app.querySelector('.dl-flow-label').textContent='BUILD THE GERMAN SENTENCE';
  const built=document.createElement('div');built.id='dl-order-built';built.className='game-built';built.textContent='Tap the German words below';
  built.setAttribute('aria-live','polite');
  const bank=document.createElement('div');bank.className='game-wordbank dl-order-bank';
  const order=q.tokens.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  for(const i of order){const button=document.createElement('button');button.className='secondary';button.type='button';button.textContent=q.tokens[i];button.dataset.wordIndex=i;button.onclick=()=>{
   if(dlAnswered||s.picks.includes(i))return;
   s.picks.push(i);button.disabled=true;refresh();
  };bank.append(button);}
  const controls=document.createElement('div');controls.className='dl-order-edit';
  for(const [label,action] of [['Undo last word',()=>s.picks.pop()],['Start over',()=>{s.picks=[];}]]){
   const button=document.createElement('button');button.className='secondary';button.type='button';button.textContent=label;button.onclick=()=>{if(dlAnswered)return;action();refresh();};controls.append(button);
  }
  choices.replaceWith(built,bank,controls);
  const flow=app.querySelector('.dl-flow');flow.classList.add('dl-order-question');
  const dock=document.createElement('div');dock.className='dl-order-check-dock';
  dock.append(flow.querySelector('.dl-flow-top button'),document.getElementById('dl-check'));flow.append(dock);
  function refresh(){
   built.textContent=s.picks.length?s.picks.map(i=>q.tokens[i]).join(' '):'Tap the German words below';
   bank.querySelectorAll('button').forEach(b=>{b.disabled=s.picks.includes(Number(b.dataset.wordIndex));});
   document.getElementById('dl-check').disabled=s.picks.length!==q.tokens.length;
  }
  return result;
 };
 const previousCheck=dlCheck;
 dlCheck=function(){
  const s=fullSession,q=s?.questions?.[s.idx];
  if(!q?.dlOrder||FULL_UNITS[s.id]!==unit)return previousCheck.apply(this,arguments);
  if(dlAnswered||s.picks.length!==q.tokens.length)return;
  const normalize=s=>s.toLocaleLowerCase('de-DE').replace(/[.!?]/g,'').replace(/\s+/g,' ').trim();
  const chosen=s.picks.map(i=>q.tokens[i]).join(' ');
  const ok=q.dlAccepted.some(answer=>normalize(chosen)===normalize(answer));
  dlSelected=ok?q.answer:2;
  if(!ok&&normalize(chosen)===normalize(q.options[1]))q.why='That order is grammatical, but this exercise asks you to start with “'+q.dlStart+'”. '+q.why;
  const dock=app.querySelector('.dl-order-check-dock');
  if(dock){app.querySelector('.dl-flow-top').prepend(dock.querySelector('button'));app.querySelector('.dl-flow-card').append(document.getElementById('dl-check'));dock.remove();}
  // Delegate sounds, feedback, score, results and continuation to the lesson flow.
  const result=previousCheck.apply(this,arguments);
  if(!ok){const feedback=document.querySelector('#dl-result .dl-flow-feedback');if(feedback){const correction=document.createElement('p');correction.textContent='Correct sentence: '+q.german;feedback.append(correction);}}
  app.querySelectorAll('.dl-order-bank,.dl-order-edit').forEach(el=>el.remove());
  return result;
 };
})();
