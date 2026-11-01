/* Keep lesson playback beside the explanation it illustrates. */
(function(){
 const normalize=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const greetingAudio={
  'Umlauts and ß':[
   ['Ä — a separate vowel',[['Mädchen','girl — ä']]],
   ['Ö — round your lips',[['schön','beautiful — ö'],['schon','already — o, without an umlaut']]],
   ['Ü — a different rounded vowel',[['fünf','five — ü']]],
   ['ß — Eszett, or sharp S',[['Straße','street — ß, pronounced with an s sound'],['Fuß / Fluss','foot / river — long u + ß / short u + ss'],['heißen','to be called — ei + ß']]]
  ],
  'People and names: Vocabulary and meaning':[
   ['Introduce yourself',[['Ich heiße Lea.','My name is Lea.'],['Mein Name ist Lea.','My name is Lea.']]],
   ['Introduce someone else',[['Das ist Paul.','This is Paul.']]]
  ],
  'Greetings and introductions':[
   ['Choose a greeting',[['Hallo','Hello'],['Guten Morgen','Good morning'],['Guten Tag','Good day / hello'],['Guten Abend','Good evening'],['Tschüss','Bye / goodbye (informal)'],['Auf Wiedersehen','Goodbye (polite/formal)']]],
   ['Names and origins',[['Ich heiße Lea.','My name is Lea.'],['Wie heißt du?','What is your name?'],['Ich komme aus Kanada.','I come from Canada.']]],
   ['Ask how someone is',[['Wie geht es dir?','How are you?'],['Danke, gut.','Fine, thanks.']]]
  ],
  'Greetings and goodbyes':[
   ['Choose a greeting',[['Hallo','Hello'],['Guten Morgen','Good morning'],['Guten Tag','Good day / hello'],['Guten Abend','Good evening']]],
   ['Say goodbye',[['Tschüss','Bye / goodbye (informal)'],['Auf Wiedersehen','Goodbye (polite/formal)']]],
   ['Ask how someone is',[['Wie geht es dir?','How are you?'],['Danke, gut.','Fine, thanks.']]],
   ['Being polite',[['Danke.','Thank you.'],['Bitte.','Please'],['Einen Kaffee, bitte.','A coffee, please.'],['Entschuldigung.','Excuse me.'],['Es tut mir leid.','I’m sorry.'],['Gern geschehen.','You’re welcome.']]]
  ],
  'Introducing yourself: heißen and wohnen':[
   ['Names',[['Ich heiße Lea.','My name is Lea.'],['Wie heißt du?','What is your name? (informal)'],['Wie heißen Sie?','What is your name? (polite)']]],
   ['Home',[['Ich wohne in Berlin.','I live in Berlin.'],['Wo wohnst du?','Where do you live? (informal)'],['Wo wohnen Sie?','Where do you live? (polite)']]],

  ]
 };
 function audioRow(de,en){
  const row=document.createElement('div');row.className='vocab-row';
  const copy=document.createElement('div');copy.className='vocab-copy';
  const word=document.createElement('strong');word.textContent=de;
  const meaning=document.createElement('span');meaning.textContent=en;
  const button=document.createElement('button');button.type='button';button.className='secondary';button.textContent='Listen';button.setAttribute('aria-label','Listen to '+de);
  button.onclick=()=>speak(typeof dlAudioExample==='function'?dlAudioExample(de):de);
  copy.append(word);if(en)copy.append(meaning);row.append(copy,button);return row;
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
  if(u.title==='Personal pronouns: he, she, it'){
   for(const section of guide.querySelectorAll('section')){
    if((section.querySelector('h3')?.textContent||'').trim()==='Useful words in the examples')section.remove();
   }
  }
  if(u.title==='Personal pronouns: we, you all, they'){
   // Replace the bundled pronoun playback with individual controls at the
   // matching teaching lines, rather than leaving an orphan Examples card.
   const items=[...guide.querySelectorAll('li')];
   card.classList.add('dl-group-pronoun-guide');
   for(const li of items){
    // Preserve the phrase/usage line break supplied by the shared guide.
    const phrase=li.querySelector('strong');
    const host=phrase||li;
    const text=host.textContent;
    const match=text.match(/^(wir|ihr|sie|Sie)(?=\s*[—:])/);
    if(!match)continue;
    const word=document.createElement('strong');word.className='dl-pronoun-keyword';word.textContent=match[1];
    host.textContent='';host.append(word,document.createTextNode(text.slice(match[1].length)));
   }
   const targets=[['wir','we'],['ihr','you all'],['sie','they']];
   let placed=0;
   for(const [pronoun,meaning] of targets){
    const li=items.find(item=>normalize(item.textContent).startsWith(pronoun+' '+meaning));
    if(!li)continue;
    const row=audioRow(pronoun,'');
    row.classList.add('dl-pronoun-inline-audio');
    li.append(row);
    placed++;
   }
   if(placed===targets.length){
    for(const sentence of ['Wir lernen Deutsch.','Ihr lernt Deutsch.','Sie lernen Deutsch.']){
     const li=items.find(item=>item.textContent.startsWith(sentence+' — '));
     if(li){const row=audioRow(sentence,'');row.classList.add('dl-pronoun-inline-audio');li.append(row);}
    }
    for(const row of [...card.querySelectorAll('.vocab-row')]){
     if(row.classList.contains('dl-pronoun-inline-audio'))continue;
     const word=normalize(row.querySelector('.vocab-copy strong')?.textContent||row.querySelector('strong')?.textContent);
     if(word==='wir ihr sie'||word==='wir'||word==='ihr'||word==='sie')row.remove();
    }
    for(const section of [...guide.querySelectorAll('section')]){
     const heading=(section.querySelector('h3')?.textContent||'').trim();
     if(heading==='See it in a sentence')section.classList.add('dl-pronoun-sentence-examples');
     if(heading==='Examples'&&!section.textContent.trim().replace(/^Examples/,'').trim())section.remove();
    }
    [...card.querySelectorAll('h3')].filter(h=>h.parentElement===card&&h.textContent.trim()==='See it in German').forEach(h=>h.remove());
    card.classList.add('dl-inline-lesson-audio');
    return;
   }
   guide.querySelectorAll('.dl-pronoun-inline-audio').forEach(row=>row.remove());
  }
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
   // The short pronoun "du" is excluded by the generic fuzzy matcher.
   // Place its audio with the teaching card specifically explaining "du".
   if(u.title==='Personal pronouns: ich, du, and Sie'&&normalize(de)==='du'){
    const duCard=sections.find(sec=>/\bdu\b/i.test(sec.querySelector('h3')?.textContent||''))
      ||sections.find(sec=>/\bdu\s*[—–:-]\s*you\b/i.test(sec.textContent||''));
    if(duCard)section=duCard;
   }
   if(!section){section=document.createElement('section');const h=document.createElement('h3');h.textContent='Examples';section.append(h);guide.append(section);fallback=section;}
   put(section,row,de);
  }
  // This card is a phrase list, so the playable rows replace its plain list.
  const phraseOnly=u.level==='A1'&&(u.title==='Greetings and introductions'?['Choose a greeting']:u.title==='Greetings and goodbyes'?['Choose a greeting','Say goodbye']:[]);
  for(const title of phraseOnly||[]){
   const section=sections.find(s=>s.querySelector('h3')?.textContent===title);
   const list=insertions.get(section);
   if(list){
    [...section.children].filter(child=>child.tagName!=='H3').forEach(child=>child.remove());
    section.classList.add('dl-audio-only-section');section.append(list);
   }
  }
  if(u.level==='A1'&&u.title==='People and names: Vocabulary and meaning'){
   for(const [section,list]of insertions)section.append(list);
  }
  if(u.title==='Personal pronouns: he, she, it'){
   // Playback has moved beside its teaching; discard empty example shells.
   for(const section of [...guide.querySelectorAll('section')]){
    const title=(section.querySelector('h3')?.textContent||'').trim();
    if(!/^(?:Useful examples|Key examples|Examples)$/.test(title))continue;
    const hasText=[...section.children].some(child=>child.tagName!=='H3'&&child.textContent.trim());
    if(!hasText&&!section.querySelector('.vocab-row,button,audio,input'))section.remove();
   }
  }
  if(insertions.size){heading?.remove();card.classList.add('dl-inline-lesson-audio');}
 }
 const previousIntro=dlLessonIntro,previousStudy=fullStudy;
 dlLessonIntro=function(id){const result=previousIntro.apply(this,arguments);placeAudio(id);return result};
 fullStudy=function(id){const result=previousStudy.apply(this,arguments);placeAudio(id);return result};
 const style=document.createElement('style');
 style.textContent='.dl-audio-only-section .dl-section-audio{margin:12px 0 0}.dl-audio-only-section .vocab-row{background:transparent;border:0;border-radius:0;padding:12px 0;box-shadow:none}.dl-section-audio{display:grid;gap:10px;margin:0 0 20px;min-width:0}.dl-section-audio .vocab-row{margin:0;min-width:0}.dl-section-audio .vocab-copy{min-width:0;overflow-wrap:anywhere}.dl-section-audio button{flex-shrink:0;min-height:44px}body.lesson-screen .dl-flow-card.dl-inline-lesson-audio{padding-bottom:100px}body.lesson-screen .dl-flow-card.dl-inline-lesson-audio>.dl-flow-action{position:fixed;bottom:max(12px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);width:min(calc(100vw - 48px),640px);z-index:1000;margin:0;box-shadow:0 8px 30px rgba(0,0,0,.45)}';
 style.textContent+=' .dl-pronoun-inline-audio{margin:10px 0 4px}.dl-pronoun-inline-audio .vocab-copy{min-width:0}.dl-pronoun-inline-audio button{flex-shrink:0;min-height:44px}';
 style.textContent+=' .dl-group-pronoun-guide .dl-pronoun-keyword{font-size:1.2em;font-weight:800;line-height:1.35}.dl-group-pronoun-guide .dl-pronoun-inline-audio .vocab-copy strong{font-size:1.3em;font-weight:800;line-height:1.35}';
 style.textContent+=' .dl-group-pronoun-guide .dl-phrase-usage{display:block;margin-top:6px;font-weight:400}.dl-group-pronoun-guide .dl-pronoun-inline-audio .vocab-copy strong{overflow-wrap:anywhere}';
 style.textContent+=' #app .dl-group-pronoun-guide .dl-pronoun-sentence-examples{background:transparent;border:0;box-shadow:none;padding:0;margin-top:24px}.dl-group-pronoun-guide .dl-pronoun-sentence-examples>ul{list-style:none;padding-left:0}.dl-group-pronoun-guide .dl-pronoun-sentence-examples>ul>li{margin:0 0 24px}';
 document.head.append(style);
})();
