
(function(){
 const oldIntro=dlLessonIntro;
 function expandedIntro(id){
   const result=oldIntro.apply(this,arguments);
   if(FULL_UNITS[id]?.title!=='Personal pronouns: he, she, it')return result;
   const heading=app.querySelector('.dl-flow-card h2');
   const paragraph=heading?.nextElementSibling;
   if(!paragraph||paragraph.tagName!=='P')return result;
   const guide=document.createElement('div');
   guide.className='dl-pronoun-guide';
   const sections=[
     ['er — he','Use er when talking about a male person.\n\nEr ist hier. — He is here.'],
     ['sie — she','Use lowercase sie when talking about a female person.\n\nAnna lernt Deutsch. → Sie lernt Deutsch.\nAnna is learning German. → She is learning German.'],
     ['es — it','Use es for something referred to with the neuter pronoun. German grammatical gender matters: es does not always mean an object is lifeless.\n\nDas Kind spielt. → Es spielt.\nThe child is playing. → It is playing.'],
     ['Compare','Er lernt Deutsch. — He is learning German.\nSie lernt Deutsch. — She is learning German.\nEs ist neu. — It is new.'],
     ['Remember','Lowercase sie can also mean they. Look at the verb:\n\nsie lernt — she learns\n\nsie lernen — they learn\n\nCapitalized Sie is formal you.']
   ];
   for(const [title,body] of sections){
     const card=document.createElement('section');
     const h=document.createElement('h3');h.textContent=title;
     const p=document.createElement('p');p.textContent=body;p.style.whiteSpace='pre-line';
     card.append(h,p);guide.append(card);
   }
   paragraph.textContent='In this lesson, you’ll practice er, sie, and es when talking about people. These pronouns can also refer to animals and objects according to a noun’s grammatical gender (der, die, das). We’ll explore that use in a later lesson.';
   paragraph.insertAdjacentElement('afterend',guide);
   return result;
 }
 dlLessonIntro=expandedIntro;
 fullStudy=function(id){
   if(FULL_UNITS[id]?.title==='Personal pronouns: he, she, it')return expandedIntro(id);
   return oldIntro(id);
 };
})();
