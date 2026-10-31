/* Keep lesson playback beside the explanation it illustrates. */
(function(){
 const normalize=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const greetingAudio={
  'Greetings and introductions':[
   ['Choose a greeting',[['Hallo','Hello'],['Guten Morgen','Good morning'],['Guten Tag','Good day / hello'],['Guten Abend','Good evening'],['Tschüss','Bye / goodbye (informal)'],['Auf Wiedersehen','Goodbye (polite/formal)']]],
   ['Names and origins',[['Ich heiße Lea.','My name is Lea.'],['Wie heißt du?','What is your name?'],['Ich komme aus Kanada.','I come from Canada.']]],
   ['Ask how someone is',[['Wie geht es dir?','How are you?'],['Danke, gut.','Fine, thanks.']]]
  ],
  'Greetings and goodbyes':[
   ['Time of day',[['Guten Morgen','Good morning'],['Guten Tag','Good day / hello'],['Guten Abend','Good evening']]],
   ['Tone',[['Hallo','Hello'],['Tschüss','Bye / goodbye (informal)'],['Auf Wiedersehen','Goodbye (polite/formal)'],['Danke','Thank you'],['Bitte','Please / you are welcome']]]
  ]
 };
 function audioRow(de,en){
  const row=document.createElement('div');row.className='vocab-row';
  const copy=document.createElement('div');copy.className='vocab-copy';
  const word=document.createElement('strong');word.textContent=de;
  const meaning=document.createElement('span');meaning.textContent=en;
  const button=document.createElement('button');button.type='button';button.className='secondary';button.textContent='Listen';button.setAttribute('aria-label','Listen to '+de);
  button.onclick=()=>speak(typeof dlAudioExample==='function'?dlAudioExample(de):de);
  copy.append(word,meaning);row.append(copy,button);return row;
 }
 function targetFor(sections,de,en){
  const candidates=sections.filter(s=>! /remember|coming up|what you will|useful examples|key examples/i.test(s.querySelector('h3')?.textContent||''));
  const word=normalize(de),meaning=normalize(en);
  let best=null,bestScore=0;
  for(const section of candidates){
   const text=normalize(section.textContent);
   const score=(word.length>2&&text.includes(word)?100+word.length:0)+(meaning.length>3&&text.includes(meaning)?meaning.length:0);
   if(score>bestScore){best=section;bestScore=score;}
  }
  return best;
 }
 function placeAudio(id){
  const u=FULL_UNITS[id],card=app.querySelector('.dl-flow-card');if(!u||!card||card.classList.contains('dl-inline-lesson-audio'))return;
  const guide=card.querySelector('.dl-lesson-guide,.dl-pronoun-guide,.dl-conversation-cards,.dl-accusative-guide,#dl-order-guide');if(!guide)return;
  const sections=[...guide.querySelectorAll('section')];if(!sections.length)return;
  // Only move the native example bank; preserve bespoke controls and their handlers.
  const rows=[...card.querySelectorAll('.vocab-row')].filter(row=>row.parentElement===card);
  const heading=[...card.querySelectorAll('h3')].find(h=>h.parentElement===card&&h.textContent.trim()==='See it in German');
  const seen=new Set(),insertions=new Map();
  const put=(section,row,de)=>{const key=normalize(de);if(seen.has(key)){row.remove();return}seen.add(key);let list=insertions.get(section);if(!list){list=document.createElement('div');list.className='dl-section-audio';section.after(list);insertions.set(section,list)}list.append(row)};
  for(const [title,examples] of (u.level==='A1'?greetingAudio[u.title]:null)||[]){
   const section=sections.find(s=>s.querySelector('h3')?.textContent===title);if(section)for(const [de,en]of examples)put(section,audioRow(de,en),de);
  }
  let fallback=sections.find(s=>/useful examples|key examples|examples/i.test(s.querySelector('h3')?.textContent||''));
  for(const row of rows){
   const de=row.querySelector('.vocab-copy strong')?.textContent||row.querySelector('strong')?.textContent;
   if(!de)continue;
   if(seen.has(normalize(de))){row.remove();continue}
   const en=row.querySelector('.vocab-copy span')?.textContent||'';
   let section=targetFor(sections,de,en)||fallback;
   if(!section){section=document.createElement('section');const h=document.createElement('h3');h.textContent='Examples';section.append(h);guide.append(section);fallback=section;}
   put(section,row,de);
  }
  // This card is a phrase list, so the playable rows replace its plain list.
  if(u.level==='A1'&&u.title==='Greetings and introductions'){
   const section=sections.find(s=>s.querySelector('h3')?.textContent==='Choose a greeting');
   const list=insertions.get(section);
   if(list){
    [...section.children].filter(child=>child.tagName!=='H3').forEach(child=>child.remove());
    section.classList.add('dl-audio-only-section');section.append(list);
   }
  }
  if(insertions.size){heading?.remove();card.classList.add('dl-inline-lesson-audio');}
 }
 const previousIntro=dlLessonIntro,previousStudy=fullStudy;
 dlLessonIntro=function(id){const result=previousIntro.apply(this,arguments);placeAudio(id);return result};
 fullStudy=function(id){const result=previousStudy.apply(this,arguments);placeAudio(id);return result};
 const style=document.createElement('style');
 style.textContent='.dl-audio-only-section .dl-section-audio{margin:12px 0 0}.dl-audio-only-section .vocab-row{background:transparent;border:0;border-radius:0;padding:12px 0;box-shadow:none}.dl-section-audio{display:grid;gap:10px;margin:0 0 20px;min-width:0}.dl-section-audio .vocab-row{margin:0;min-width:0}.dl-section-audio .vocab-copy{min-width:0;overflow-wrap:anywhere}.dl-section-audio button{flex-shrink:0;min-height:44px}body.lesson-screen .dl-flow-card.dl-inline-lesson-audio{padding-bottom:100px}body.lesson-screen .dl-flow-card.dl-inline-lesson-audio>.dl-flow-action{position:fixed;bottom:max(12px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(calc(100vw - 48px),640px);z-index:1000;margin:0;box-shadow:0 8px 30px rgba(0,0,0,.45)}';
 document.head.append(style);
})();
