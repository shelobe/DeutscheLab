
(function(){
 const prior=fullStudy;
 fullStudy=function(id){
  const result=prior.apply(this,arguments);
  if(FULL_UNITS[id]?.title!=='Everyday conversations: Understanding in context')return result;
  const card=Array.from(app.querySelectorAll('.card')).find(c=>/What you'll learn|Understand the rule/.test(c.querySelector('h2')?.textContent||''));
  if(!card)return result;
  const heading=card.querySelector('h2');
  const rule=heading?.nextElementSibling;
  if(!rule)return result;
  const sections=[
   ['When you need help','Use these expressions when you need help understanding someone.'],
   ['Ich verstehe die Frage nicht.','I do not understand the question.','ich = I','verstehe = understand','die Frage = the question','nicht = not','You can replace die Frage with das Wort (the word) or den Satz (the sentence).'],
   ['Können Sie mir helfen?','Can you help me?','können = can','Sie = formal you','mir = me','helfen = help'],
   ['Sprechen Sie bitte langsam.','Please speak slowly.','sprechen = speak','Sie = formal you','bitte = please','langsam = slowly']
  ];
  rule.innerHTML=sections.map((parts,i)=>'<section class="dl-conversation-section">'+
   '<h3>'+safeText(parts[0])+'</h3>'+
   (i===0?'<p>'+safeText(parts[1])+'</p>':'<p class="dl-conversation-translation">'+safeText(parts[1])+'</p><ul>'+parts.slice(2).map(t=>'<li>'+safeText(t)+'</li>').join('')+'</ul>')+
   '</section>').join('');
  rule.style.whiteSpace='normal';
  rule.classList.add('dl-conversation-breakdown');
  return result;
 };
})();

