
(function(){
 function normalizeMenu(){
  const menu=document.getElementById('sideMenu');if(!menu)return;
  const profile=menu.querySelector('.dl-menu-profile-link');
  const placement=[...menu.querySelectorAll('button')].find(b=>b.textContent.trim()==='Placement test');
  if(profile&&placement){profile.after(placement);placement.classList.remove('dl-placement-subitem');}
 }
 function normalizeModules(){
  document.querySelectorAll('.curriculum-path-module>summary').forEach(summary=>{
   const heading=summary.querySelector('.curriculum-module-heading');
   if(!heading)return;
   const content=heading.querySelector('div');
   if(!content)return;
   // Gate status was inserted as a third flex child, squeezing the title to one character per line.
   summary.querySelectorAll(':scope > .dl-gate-status').forEach(status=>content.appendChild(status));
  });
 }
 normalizeMenu();
 const oldView=window.curriculumView;
 if(typeof oldView==='function')window.curriculumView=function(){const result=oldView.apply(this,arguments);normalizeModules();return result};
 // Insert letter-sound examples in the lesson's explanation, not at the end of the card.
 const oldStudy=window.fullStudy;
 if(typeof oldStudy==='function')window.fullStudy=function(id){
  const result=oldStudy.apply(this,arguments);
  const unit=FULL_UNITS[id];if(!unit||unit.level!=='A1'||!/alphabet and spelling/i.test(unit.title||''))return result;
  const card=document.querySelector('#app .card');if(!card)return result;
  card.querySelectorAll('.dl-letters-intro,.dl-alphabet-audio').forEach(el=>el.remove());
  const section=document.createElement('section');section.className='dl-alphabet-audio';
  const examples=[
   ['Ä / ä','Mädchen','ä as in Mädchen (girl)'],
   ['Ö / ö','schön','ö as in schön (beautiful)'],
   ['Ü / ü','Mütter','ü as in Mütter (mothers)'],
   ['ẞ / ß','Straße','ß makes a sharp s sound (street)']
  ];
  section.innerHTML='<h3>Hear the extra German letters</h3><p>German uses <strong>ä, ö, ü</strong> and <strong>ß</strong> in addition to the English alphabet. Listen to each example before starting the exercises.</p><div class="dl-alphabet-audio-grid">'+examples.map(e=>'<div class="dl-alphabet-audio-item"><strong>'+e[0]+'</strong><span>'+e[2]+'</span><button type="button" class="secondary" data-dl-letter-word="'+e[1]+'">Hear '+e[1]+'</button></div>').join('')+'</div><p>Ä, Ö and Ü are different vowel sounds, not just decorated letters. ß represents the sound of ss.</p>';
  const rule=card.querySelector('.unit-explain');
  if(rule)rule.after(section);else card.insertBefore(section,card.children[1]||null);
  section.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>speak(button.dataset.dlLetterWord)));
  return result;
 };
})();
