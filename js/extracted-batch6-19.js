
(function(){
 const routes={review:'review',listening:'listeningPractice',sentences:'sentencePractice',findit:'findItHome',articles:'articleHome',pictures:'pictureHome',dialogue:'conversation',games:'gameHub'};
 window.dlOpenHubActivity=function(key){const fn=routes[key];if(typeof window[fn]!=='function')return;try{localStorage.setItem('dl_last_practice_activity',key)}catch(e){}window[fn]();window.scrollTo(0,0)};
 window.dlContinueHubActivity=function(){let key='review';try{key=localStorage.getItem('dl_last_practice_activity')||key}catch(e){}window.dlOpenHubActivity(key)};
 const previous=practiceHub;
 practiceHub=function(){previous();
  const cards=[['review','🧠','Review','Revisit missed answers and refresh your memory'],['listening','🎧','Listening','Understand spoken German'],['sentences','🧩','Build sentences','Put German words in order'],['findit','🔎','Find It!','Find objects in illustrated rooms'],['articles','📚','Noun Articles','Practice der, die and das'],['pictures','🖼️','Picture Practice','Learn words from pictures'],['dialogue','💬','Dialogue','Practice real conversations'],['games','🎮','Practice Games','Play vocabulary and language games']];
  const progress=app.querySelector('#progress')?.closest('.card');
  const oldCards=app.querySelector('.sceneCards');if(oldCards)oldCards.remove();
  const section=document.createElement('section');section.className='dl-hub-content';
  const card=(c)=>'<button class="secondary dl-hub-card" onclick="dlOpenHubActivity(\''+c[0]+'\')"><span class="dl-hub-icon" aria-hidden="true">'+c[1]+'</span><strong>'+c[2]+'</strong><small>'+c[3]+'</small></button>';
  section.innerHTML='<button class="dl-hub-continue" onclick="dlContinueHubActivity()">▶ Continue practicing</button><h2 class="dl-hub-heading">Daily practice</h2><div class="dl-hub-grid">'+cards.filter(c=>['review','listening','sentences','dialogue'].includes(c[0])).map(card).join('')+'</div><h2 class="dl-hub-heading">Practice games & activities</h2><div class="dl-hub-grid">'+cards.filter(c=>!['review','listening','sentences','dialogue'].includes(c[0])).map(card).join('')+'</div>';
  if(progress)progress.after(section);else app.appendChild(section);
 };
 const menu=document.getElementById('sideMenu');if(menu){
  const buttons=[...menu.querySelectorAll('button')];
  for(const b of buttons){if(/Find It!|Noun Articles|Picture practice|Dialogue|Review|Practice games/i.test(b.textContent||''))b.remove()}
  let hub=buttons.find(b=>/Practice Hub/i.test(b.textContent||''));
  if(hub){const headings=[...menu.querySelectorAll('.dl-menu-group')];const practice=headings.find(h=>/PRACTICE/i.test(h.textContent));if(practice)practice.after(hub)}
  const accountHeading=[...menu.querySelectorAll('.dl-menu-group')].find(h=>/ACCOUNT/i.test(h.textContent));if(accountHeading){const profile=buttons.find(b=>/Profile/i.test(b.textContent||''));if(profile)accountHeading.after(profile)}
 }
})();
