/* Keep lesson playback inside the explanation it illustrates. */
(function(){
 const normalize=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const greetingAudio={
  'People and names: Vocabulary and meaning':[
   ['Introduce yourself',[['Ich heiße Lea.','My name is Lea.'],['Mein Name ist Lea.','My name is Lea.']]],
   ['Introduce someone else',[['Das ist Paul.','This is Paul.']]]
  ],
  'Greetings and introductions':[
   ['Choose a greeting',[['Hallo','Hello'],['Guten Morgen','Good morning'],['Guten Tag','Good day / hello'],['Guten Abend','Good evening'],['Tschüss','Bye / goodbye (informal)'],['Auf Wiedersehen','Goodbye (polite/formal)']]],
   ['Names and origins',[['Ich heiße Lea.','My name is Lea.'],['Wie heißt du?','What is your name?'],['Ich komme aus Kanada.','I come from Canada.']]],
   ['Ask how someone is',[['Wie geht es dir?','How are you?'],['Danke, gut.','Fine, thanks.']]]
  ],
  'Greetings and polite expressions':[
   ['Saying hello',[['Hallo','Hello (informal)'],['Guten Morgen','Good morning'],['Guten Tag','Hello (polite)'],['Guten Abend','Good evening']]],
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
  const candidates=sections.filter(s=>! /remember|coming up|\\bnote\\b|what you will|useful examples|key examples/i.test(s.querySelector('h3')?.textContent||''));
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
  if(u.level==='A1'&&u.title==='People and names: Understanding in context'){
   // Render this applied lesson as short exchanges, not repeated phrase bullets.
   const nativeRows=[...card.querySelectorAll('.vocab-row')];
   const playback=(de,en)=>{
    const row=nativeRows.find(row=>normalize(row.querySelector('.vocab-copy strong')?.textContent)===normalize(de))||audioRow(de,en);
    const copy=row.querySelector('.vocab-copy');let meaning=copy.querySelector('span');
    if(!meaning){meaning=document.createElement('span');copy.append(meaning);}
    meaning.textContent=en;meaning.hidden=false;meaning.style.display='block';
    return row;
   };
   const section=(title)=>{
    const box=document.createElement('section'),h=document.createElement('h3');h.textContent=title;box.append(h);guide.append(box);return box;
   };
   const paragraph=(box,text)=>{const p=document.createElement('p');p.textContent=text;box.append(p);};
   const label=(box,text)=>{const p=document.createElement('p');p.className='dl-context-label';p.textContent=text;box.append(p);};
   guide.replaceChildren();
   guide.classList.add('dl-context-readable');
   const goal=section('Use what you know');
   paragraph(goal,'Understand who someone is, where they live and where they come from. Choose a reply that answers the question.');
   const recap=section('Three things to listen for');
   for(const [de,en,note] of [
    ['Mein Name ist … / Ich heiße …','My name is …','The speaker gives their own name.'],
    ['wohnen in','to live in','Current home. In means “in” here.'],
    ['kommen aus','to come from','Origin. Aus means “from” here.']
   ]){
    const item=document.createElement('div');item.className='dl-context-item';
    const strong=document.createElement('strong'),meaning=document.createElement('span');strong.textContent=de;meaning.textContent=en;meaning.style.display='block';
    item.append(strong,meaning);paragraph(item,note);recap.append(item);
   }
   for(const [title,question,translation,reply,english] of [
    ['Ask a name','Wie heißt du?','What is your name?','Mein Name ist Lea.','My name is Lea.'],
    ['Ask about a current home','Wo wohnst du?','Where do you live?','Ich wohne in Hamburg.','I live in Hamburg.'],
    ['Ask about origin','Woher kommst du?','Where are you from?','Ich komme aus Deutschland.','I come from Germany.']
   ]){
    const box=section(title);label(box,'Question');box.append(playback(question,translation));label(box,'Reply');box.append(playback(reply,english));
   }
   const contrast=section('Home and origin can be different');
   contrast.append(playback('Ich komme aus Deutschland, aber ich wohne in Hamburg.','I come from Germany, but I live in Hamburg.'));
   paragraph(contrast,'From: Germany.');paragraph(contrast,'Lives now: Hamburg.');paragraph(contrast,'Aber means “but”.');
   const friend=section('Introducing another person');
   friend.append(playback('Das ist meine Freundin. Sie wohnt in Hamburg.','This is my friend. She lives in Hamburg.'));
   paragraph(friend,'The speaker introduces a female friend. Sie refers to that friend.');
   const name=section('Giving someone else’s name');
   name.append(playback('Er heißt Thomas.','His name is Thomas.'));
   paragraph(name,'Er refers to another person, rather than the speaker.');
   for(const row of nativeRows)if(!guide.contains(row))row.remove();
   [...card.querySelectorAll('h3')].filter(h=>h.parentElement===card&&h.textContent.trim()==='See it in German').forEach(h=>h.remove());
   card.classList.add('dl-inline-lesson-audio');
   return;
  }
  if(u.level==='A1'&&u.title==='Greetings and polite expressions')card.classList.add('dl-integrated-greeting-audio');
  if(u.level==='A1'&&u.title==='The verb sein: to be'){
   const forms=[...guide.querySelectorAll('section')].find(section=>section.querySelector('h3')?.textContent.trim()==='Forms of sein');
   const spoken=['ich bin','du bist','er ist. sie ist. es ist','wir sind','ihr seid','sie sind. Sie sind'];
   [...(forms?.querySelectorAll('li')||[])].forEach((li,index)=>{
    if(!spoken[index]||li.querySelector('.dl-sein-listen'))return;
    const button=document.createElement('button');
    button.type='button';button.className='secondary dl-sein-listen';button.textContent='Listen';
    button.setAttribute('aria-label','Listen to '+spoken[index]);
    button.style.cssText='display:block;margin:8px 0 0;min-height:44px';
    button.onclick=()=>speak(spoken[index]);
    li.append(button);
   });
  }
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
    const sentenceSection=[...guide.querySelectorAll('section')].find(s=>s.querySelector('h3')?.textContent.trim()==='See it in a sentence');
    if(sentenceSection){
     const examples=document.createElement('div');examples.className='dl-pronoun-sentence-examples';
     const title=document.createElement('h3');title.textContent='See it in a sentence';examples.append(title);
     for(const li of sentenceSection.querySelectorAll('li')){
      const phrase=li.querySelector('strong')?.textContent||'';
      const split=phrase.indexOf(' — ');if(split<0)continue;
      const de=phrase.slice(0,split),en=phrase.slice(split+3);
      const item=document.createElement('article');item.className='dl-sentence-example';
      const row=audioRow(de,'');row.classList.add('dl-pronoun-inline-audio');
      const translation=document.createElement('p');translation.className='dl-sentence-translation';translation.textContent=en;
      const context=document.createElement('p');context.className='dl-phrase-usage';context.textContent=li.querySelector('.dl-phrase-usage')?.textContent||'';
      item.append(row,translation,context);examples.append(item);
     }
     const note=document.createElement('section');note.className='dl-pronoun-verb-note';
     const noteTitle=document.createElement('h3');noteTitle.textContent='Note';
     const noteText=document.createElement('p');noteText.textContent='You’ll learn more about verb endings in the Present-tense verbs lesson.';
     note.append(noteTitle,noteText);examples.append(note);
     title.remove();
     [...sentenceSection.children].filter(n=>n.tagName!=='H3').forEach(n=>n.remove());
     sentenceSection.append(examples);
    }
    for(const row of [...card.querySelectorAll('.vocab-row')]){
     if(row.classList.contains('dl-pronoun-inline-audio'))continue;
     const word=normalize(row.querySelector('.vocab-copy strong')?.textContent||row.querySelector('strong')?.textContent);
     if(word==='wir ihr sie'||word==='wir'||word==='ihr'||word==='sie')row.remove();
    }
    for(const section of [...guide.querySelectorAll('section')]){
     const heading=(section.querySelector('h3')?.textContent||'').trim();
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
  const put=(section,row,de)=>{
   const key=normalize(de);if(seen.has(key)){row.remove();return}seen.add(key);
   const phraseOnly=/^(Choose a greeting|Saying hello|Say goodbye)$/.test(section.querySelector('h3')?.textContent||'');
   // Match a whole word/phrase in the teaching, never text from already placed audio.
   const item=phraseOnly?null:[...section.querySelectorAll('li')].find(li=>{
    const text=normalize([...li.childNodes].filter(n=>!n.classList?.contains('dl-section-audio')).map(n=>n.textContent).join(' '));
    return (' '+text+' ').includes(' '+key+' ');
   });
   const host=item||section;let list=insertions.get(host);
   if(!list){list=document.createElement('div');list.className='dl-section-audio';host.append(list);insertions.set(host,list)}
   list.append(row);
  };
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
  if(u.level==='A1'&&u.title==='People and names: Sentence patterns'){
   const expressions=sections.find(section=>section.querySelector('h3')?.textContent.trim()==='Expressions you will practice');
   if(expressions&&rows.length){
    const list=document.createElement('div');list.className='dl-section-audio';
    for(const row of rows){
     const meaning=row.querySelector('.vocab-copy span');
     if(meaning){meaning.hidden=false;meaning.style.display='block';}
     list.append(row);
    }
    [...expressions.children].filter(child=>child.tagName!=='H3').forEach(child=>child.remove());
    expressions.append(list);
   }
  }
  // This card is a phrase list, so the playable rows replace its plain list.
  const phraseOnly=u.level==='A1'&&(u.title==='Greetings and introductions'?['Choose a greeting']:u.title==='Greetings and polite expressions'?['Saying hello','Say goodbye']:[]);
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
 style.textContent+=' #app .dl-group-pronoun-guide .dl-pronoun-guide section:last-child:not(.dl-lesson-remember){background:#293f58;border:1px solid #405c72;box-shadow:none}#app .dl-group-pronoun-guide .dl-pronoun-sentence-examples{margin:24px 0;padding:0;border:0;background:transparent;box-shadow:none}#app .dl-group-pronoun-guide .dl-pronoun-sentence-examples h3{font-size:1.3rem;color:#9bdcd1;margin:0 0 14px}.dl-group-pronoun-guide .dl-sentence-example{margin:0 0 24px}.dl-group-pronoun-guide .dl-sentence-example p{margin:8px 0;line-height:1.5}.dl-group-pronoun-guide .dl-sentence-translation{font-weight:600}.dl-group-pronoun-guide .dl-sentence-example .vocab-row{display:flex;align-items:center;gap:12px}.dl-group-pronoun-guide .dl-sentence-example .vocab-copy{flex:1;min-width:0}.dl-group-pronoun-guide .dl-sentence-example .vocab-copy strong{font-size:1.1em}';
 style.textContent+=' #app .dl-group-pronoun-guide .dl-pronoun-verb-note{padding:15px 17px;border-radius:15px;background:#293f58;border:1px solid #405c72;margin-top:16px}#app .dl-group-pronoun-guide .dl-pronoun-verb-note p{margin:0;line-height:1.5}body.lesson-screen #app .dl-flow-card.dl-group-pronoun-guide{padding-bottom:24px;margin-bottom:100px}.dl-group-pronoun-guide .dl-sentence-example:last-of-type{margin-bottom:0}';
 style.textContent+=' #app .dl-context-readable .dl-context-item{margin:16px 0}#app .dl-context-readable .dl-context-item strong{display:block}#app .dl-context-readable .dl-context-item p{margin:6px 0 0}#app .dl-context-readable .dl-context-label{font-size:.9em;font-weight:700;color:#b4ddd6;margin:16px 0 6px}#app .dl-context-readable .vocab-copy span{display:block;font-weight:400;margin-top:6px;line-height:1.45}#app .dl-context-readable .vocab-row{margin:0 0 12px}';
 document.head.append(style);
})();
