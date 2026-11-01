/* Shared teaching presentation; never changes lesson data, scores or playback handlers. */
(function(){
 const root=document.getElementById('app');if(!root)return;
 const guideSelector='.dl-lesson-guide,.dl-pronoun-guide,.dl-conversation-cards,.dl-conversation-breakdown,.dl-accusative-guide,.dl-article-teaching,#dl-order-guide';
 const normal=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 function headingOf(box){return [...box.children].find(n=>/^H[2-4]$/.test(n.tagName)||n.tagName==='STRONG');}
 function classify(box){
  const heading=headingOf(box);if(!heading)return;
  const title=heading.textContent.trim();
  const remember=/^(remember|keep in mind)\b/i.test(title);
  const note=/^(note|a note|coming up|looking ahead)\b/i.test(title);
  box.classList.toggle('dl-teaching-remember',remember);
  box.classList.toggle('dl-teaching-note',note);
  box.classList.toggle('dl-teaching-examples',/^(?:useful examples|key examples|examples|see it in a sentence)$/i.test(title));
 }
 function enhance(){
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
   // Hide only an exact bilingual duplicate already taught in this card.
   const teaching=normal([...section.querySelectorAll('li,p,h3')].filter(n=>!n.querySelector('.vocab-row')&&!n.closest('.vocab-row')).map(n=>n.textContent).join(' '));
   const duplicate=teaching.includes(normal(word))&&teaching.includes(normal(meaning.textContent));
   if(duplicate)meaning.hidden=true;
  }
 }
 const intro=window.dlLessonIntro,study=window.fullStudy;
 if(typeof intro==='function')window.dlLessonIntro=function(){const result=intro.apply(this,arguments);enhance();return result;};
 if(typeof study==='function')window.fullStudy=function(){const result=study.apply(this,arguments);enhance();return result;};
 // Custom article/pronunciation screens also render outside the lesson wrappers.
 new MutationObserver(enhance).observe(root,{childList:true,subtree:true});
 enhance();
})();
