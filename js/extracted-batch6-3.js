
(function(){
 const unit={
  level:'A1',title:'Building German sentences: Subject, verb and details',
  rule:'Start with WHO is doing something (the subject), then the conjugated verb, then the rest of the sentence. In ordinary German statements, the conjugated verb is in position two. A time word can go first, but the verb must still be second. Objects answer what or whom; places tell us where.',
  examples:[
   ['Ich lerne Deutsch.','I am learning German.'],
   ['Ich trinke heute Kaffee.','I am drinking coffee today.'],
   ['Heute trinke ich Kaffee.','Today I am drinking coffee.'],
   ['Wir lernen Deutsch zu Hause.','We are learning German at home.'],
   ['Morgen kaufe ich Brot.','Tomorrow I am buying bread.']
  ],
  checkpoint:{prompt:'Which sentence keeps the verb in second position?',options:['Heute lerne ich Deutsch.','Heute ich lerne Deutsch.','Heute Deutsch ich lerne.'],answer:0,why:'Heute occupies the first position, so lerne must come next.'}
 };
 const id=FULL_UNITS.length;FULL_UNITS.push(unit);
 const module=STRUCTURED_PATH.A1.find(m=>m.title==='Everyday conversations'&&m.ids.includes(83));
 if(module){const pos=module.ids.indexOf(83);module.ids.splice(pos,0,id);module.context='Build your own sentences first, then use practical phrases to ask for help and clarification.';}
 const priorQuestions=fullQuestions;
 fullQuestions=function(u){
  if(u!==unit)return priorQuestions(u);
  return [
   {type:'grammar',prompt:'Choose the correct basic statement.',options:['Ich lerne Deutsch.','Ich Deutsch lerne.','Lerne Deutsch ich.'],answer:0,why:'The subject Ich comes first and the conjugated verb lerne comes second.'},
   {type:'grammar',prompt:'Start with Heute (today). Which sentence is correct?',options:['Heute trinke ich Kaffee.','Heute ich trinke Kaffee.','Heute Kaffee trinke ich.'],answer:0,why:'Heute takes position one, trinke stays in position two, and ich follows the verb.'},
   {type:'grammar',prompt:'In “Wir lernen Deutsch zu Hause,” which word is the subject?',options:['Wir','lernen','Deutsch'],answer:0,why:'Wir means we: it tells who performs the action.'},
   {type:'grammar',prompt:'In “Ich kaufe Brot,” which word is the conjugated verb?',options:['kaufe','Ich','Brot'],answer:0,why:'Kaufe expresses the action and changes to agree with ich.'},
   {type:'grammar',prompt:'Which sentence adds a place naturally?',options:['Ich lerne Deutsch zu Hause.','Ich zu Hause lerne Deutsch.','Ich Deutsch zu Hause lerne.'],answer:0,why:'Ich is the subject, lerne is the second-position verb, and zu Hause adds where.'},
   {type:'grammar',prompt:'Which sentence begins with a time expression correctly?',options:['Morgen kaufe ich Brot.','Morgen ich kaufe Brot.','Morgen Brot ich kaufe.'],answer:0,why:'Morgen is first, so kaufe must immediately follow.'},
   {type:'grammar',prompt:'In “Ich trinke heute Kaffee,” what is Kaffee?',options:['What is being drunk','Who is drinking','The conjugated verb'],answer:0,why:'Kaffee is the object: it tells what the subject drinks.'}
  ];
 };
 const priorStudy=fullStudy;
 fullStudy=function(lessonId){
  const result=priorStudy.apply(this,arguments);
  if(lessonId!==id)return result;
  const h=Array.from(app.querySelectorAll('h2')).find(el=>el.textContent.includes("What you'll learn"));
  const p=h?.nextElementSibling;
  if(p?.tagName==='P'){
   p.outerHTML='<div class="dl-conversation-cards">'+[
    ['1. Subject — who?','Ich = I; wir = we. Start by identifying who is acting.'],
    ['2. Verb — what action?','Ich lerne Deutsch. The conjugated verb lerne takes the second position.'],
    ['3. Add an object','Ich trinke Kaffee. Kaffee tells us what is being drunk.'],
    ['4. Add time and place','Ich lerne heute zu Hause. Heute says when; zu Hause says where.'],
    ['5. Move time to the front','Heute lerne ich zu Hause. The verb stays second, so the subject moves after it.']
   ].map(x=>'<section class="dl-conversation-card"><h3>'+safeText(x[0])+'</h3><p>'+safeText(x[1])+'</p></section>').join('')+'</div>';
  }
  return result;
 };
})();
