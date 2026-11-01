/* Shared teaching presentation; never changes lesson data, scores or playback handlers. */
(function(){
 const root=document.getElementById('app');if(!root)return;
 const guideSelector='.dl-lesson-guide,.dl-pronoun-guide,.dl-conversation-cards,.dl-conversation-breakdown,.dl-accusative-guide,.dl-article-teaching,#dl-order-guide';
 const normal=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 function headingOf(box){return [...(box?.children||[])].find(n=>/^H[2-4]$/.test(n.tagName)||n.tagName==='STRONG');}
 const singleWord=text=>(String(text||'').match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)||[]).length===1;
 const paragraphPlacements=new WeakMap();
 function textWithoutAudio(node){
  if(node.classList?.contains('vocab-row')||node.classList?.contains('dl-section-audio'))return '';
  if(!node.children?.length)return node.textContent||'';
  return [...(node.childNodes||node.children)].map(textWithoutAudio).join(' ');
 }
 function arrangeAudio(card,guide){
  let separate=card.querySelector('.dl-separated-audio-examples');
  for(const row of [...card.querySelectorAll('.vocab-row')]){
   const word=row.querySelector('.vocab-copy strong')?.textContent;
   if(!word||!row.querySelector('button,audio'))continue;
   // The group-pronoun sentence section already has its approved external layout.
   if(row.closest('.dl-pronoun-sentence-examples'))continue;
   if(!singleWord(word)&&card.classList.contains('dl-integrated-greeting-audio')){row.classList.add('dl-compact-phrase-audio');continue;}
   if(!singleWord(word)){
    if(row.closest('.dl-separated-audio-examples'))continue;
    if(!separate){separate=document.createElement('div');separate.className='dl-separated-audio-examples';const h=document.createElement('h3');h.textContent='Phrases and sentences';separate.append(h);guide.after(separate);}
    const translation=row.querySelector('.vocab-copy span');if(translation)translation.hidden=false;
    const li=row.closest('li'),box=row.closest('section');
    const exampleOnly=/^(?:useful examples|key examples|examples|examples to follow|examples to recognize|expressions you will practice|use them in a sentence)$/i.test(headingOf(box||{})?.textContent?.trim()||'');
    const usage=exampleOnly?li?.querySelector('.dl-phrase-usage'):null;
    const entry=document.createElement('article');entry.className='dl-separated-example';entry.append(row);if(usage)entry.append(usage);separate.append(entry);
    if(exampleOnly&&li)li.remove();
    continue;
   }
   if(row.closest('li')?.closest(guideSelector)===guide)continue;
   const key=' '+normal(word)+' ';
   const current=row.closest('section');
   const scope=current?.closest(guideSelector)===guide?current:guide;
   const item=[...scope.querySelectorAll('li')].find(n=>(' '+normal(textWithoutAudio(n))+' ').includes(key));
   if(item){if(row.parentElement!==item)item.append(row);continue;}
   // An explanation paragraph can teach a single word without a bullet list.
   const paragraph=[...scope.querySelectorAll('p')].find(n=>!n.closest('.vocab-row')&&(' '+normal(n.textContent)+' ').includes(key));
   if(paragraph){if(paragraphPlacements.get(row)!==paragraph||row.parentElement!==paragraph.parentElement){paragraph.after(row);paragraphPlacements.set(row,paragraph);}continue;}
   if(row.closest(guideSelector)===guide)continue;
   const words=document.createElement('section');words.className='dl-word-playback';
   const h=document.createElement('h3');h.textContent=word;words.append(h);
   const meaning=row.querySelector('.vocab-copy span')?.textContent;
   if(meaning){const p=document.createElement('p');p.textContent=meaning;words.append(p);}
   words.append(row);guide.append(words);
  }
  for(const list of [...guide.querySelectorAll('.dl-section-audio')])if(!list.querySelector('.vocab-row'))list.remove();
  for(const box of [...guide.querySelectorAll('.dl-audio-only-section')])if(!box.querySelector('.vocab-row'))box.remove();
  for(const box of [...guide.querySelectorAll('section')]){
   if(!/^(?:useful examples|key examples|examples|examples to follow|examples to recognize|expressions you will practice|use them in a sentence)$/i.test(headingOf(box)?.textContent?.trim()||''))continue;
   if(!box.querySelector('li,p,.vocab-row'))box.remove();
  }
 }
 function classify(box){
  const heading=headingOf(box);if(!heading)return;
  const title=heading.textContent.trim();
  const remember=/^(remember|keep in mind)\b/i.test(title);
  const note=/^(note|a note|coming up|looking ahead)\b/i.test(title);
  box.classList.toggle('dl-teaching-remember',remember);
  box.classList.toggle('dl-teaching-note',note);
  const wordAudio=[...box.querySelectorAll('.vocab-row')].some(row=>singleWord(row.querySelector('.vocab-copy strong')?.textContent));
  box.classList.toggle('dl-teaching-examples',!wordAudio&&/^(?:useful examples|key examples|examples|see it in a sentence)$/i.test(title));
 }
 function enhance(){
  for(const card of root.querySelectorAll('.dl-flow-card')){const guide=card.querySelector(guideSelector);if(guide)arrangeAudio(card,guide);}
  for(const guide of root.querySelectorAll(guideSelector)){
   guide.classList.add('dl-shared-teaching');
   for(const box of guide.querySelectorAll('section,.lesson-note,.dl-conversation-card,.dl-conversation-section'))classify(box);
   // Pronunciation and older guides can still supply sibling playback groups.
   for(const list of [...guide.querySelectorAll('.dl-section-audio')]){
    const previous=list.previousElementSibling;
    if(previous?.tagName==='SECTION')previous.append(list);
   }
  }
  for(const box of root.querySelectorAll('.lesson-note,.dl-pronoun-verb-note'))classify(box);
  for(const row of root.querySelectorAll('.vocab-row')){
   if(!row.querySelector('button,audio'))continue;
   row.classList.add('dl-teaching-audio');
   const section=row.closest('section');
   if(!section||!section.closest(guideSelector))continue;
   const word=row.querySelector('.vocab-copy strong')?.textContent;
   const meaning=row.querySelector('.vocab-copy span');
   if(!word||!meaning?.textContent.trim())continue;
   // Inline word rows need no repeated translation or sound explanation.
   // Compare against the matching teaching item, excluding every audio row.
   const item=row.closest('li');
   const localTeaching=normal(textWithoutAudio(item||section));
   const localWords=new Set(localTeaching.split(' '));
   const repeatsInline=singleWord(word)&&localTeaching.split(' ').includes(normal(word))&&normal(meaning.textContent).split(' ').every(token=>localWords.has(token));
   // Retain unique meanings and all external phrase/sentence context.
   const teaching=normal([...section.querySelectorAll('li,p,h3,strong')].filter(n=>!n.querySelector('.vocab-row')&&!n.closest('.vocab-row')).map(n=>n.textContent).join(' '));
   const duplicate=teaching.includes(normal(word))&&teaching.includes(normal(meaning.textContent));
   if(duplicate||repeatsInline)meaning.hidden=true;
  }
 }
 const intro=window.dlLessonIntro,study=window.fullStudy;
 if(typeof intro==='function')window.dlLessonIntro=function(){const result=intro.apply(this,arguments);enhance();return result;};
 if(typeof study==='function')window.fullStudy=function(){const result=study.apply(this,arguments);enhance();return result;};
 // Custom article/pronunciation screens also render outside the lesson wrappers.
 new MutationObserver(enhance).observe(root,{childList:true,subtree:true});
 enhance();
})();
