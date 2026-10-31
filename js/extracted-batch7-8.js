
(function(){
 const previousHub=practiceHub;
 const activityRoutes={
  quick:()=>quickRandomPractice(),review:()=>review(),mistakes:()=>practiceQuiz('mistakes'),
  listening:()=>listeningLevels(),articles:()=>articleHome(),
  build:()=>gameStart('build'),reverse:()=>gameStart('reverse'),
  findit:()=>findItHome(),match:()=>gameStart('match'),pictures:()=>photoMenu(),supermarkt:()=>supermarktHome(),
  dialogues:()=>typeof dialoguesHome==='function'?dialoguesHome():conversation(),
  ai:()=>aiTutor()
 };
 window.dlOpenOrganizedActivity=function(key){
  const fn=activityRoutes[key];if(fn){fn();window.scrollTo({top:0,left:0,behavior:'instant'})}
 };
 const sections=[
  ['Daily Practice','Reinforce vocabulary, grammar and comprehension.',[
   ['quick','⭐','Quick Practice','A short mixed exercise'],['review','🧠','Review','Refresh learned material'],
   ['mistakes','🔁','Fix Mistakes','Retry missed questions'],['listening','🎧','Listening','Understand spoken German'],
   ['articles','📚','Noun Articles','Practice der, die and das'],['build','🧩','Build Sentences','Put German words in order'],
   ['reverse','🔤','Build in English','Translate German sentences']]],
  ['Games','Learn through interactive challenges.',[
   ['findit','🔎','Find It!','Explore illustrated rooms'],['match','🔗','Match Pairs','German and English word pairs'],
   ['pictures','🖼️','Picture Practice','Identify pictured vocabulary'],['supermarkt','🛒','Supermarkt (Test)','Shop with a German list']]],
  ['Conversations','Practice using German in context.',[
   ['dialogues','💬','Dialogues','Guided everyday conversations'],['ai','🎙️','AI Conversation','Free-form speaking practice']]]
 ];
 const card=c=>'<button class="secondary dl-hub-card" onclick="dlOpenOrganizedActivity(\''+c[0]+'\')"><span class="dl-hub-icon">'+c[1]+'</span><strong>'+c[2]+'</strong><small>'+c[3]+'</small></button>';
 practiceHub=function(){
  previousHub();
  const old=app.querySelector('.dl-hub-content');
  if(!old)return;
  old.innerHTML='<button class="dl-hub-continue" onclick="dlOpenOrganizedActivity(\'quick\')">▶ Quick Practice</button>'+
   sections.map(([name,desc,cards])=>'<h2 class="dl-hub-heading">'+name+'</h2><p class="dl-hub-subtitle">'+desc+'</p><div class="dl-hub-grid">'+cards.map(card).join('')+'</div>').join('');
  app.querySelectorAll('.card').forEach(el=>{
   if(el.textContent.trim()==='Continue learning')el.remove();
  });
 };
})();
