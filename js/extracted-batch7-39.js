
/* Organize navigation consistently after all feature buttons have been registered. */
(function(){
 const nav=document.getElementById('sideMenu');
 if(!nav)return;
 const buttons=Array.from(nav.querySelectorAll('button'));
 const pick=(needle)=>buttons.find(b=>b.textContent.toLowerCase().includes(needle.toLowerCase()));
 const makeHeading=(name)=>{const p=document.createElement('p');p.className='muted dl-menu-group';p.textContent=name;return p};
 const items=[
 ['', ['Home']],
 ['LEARNING',['Lessons','Placement test']],
 ['PRACTICE',['Practice Hub','AI Tutor & Voice']],
 ['ACCOUNT',['Profile']],
 ['SUPPORT',[]]
 ];
 const frag=document.createDocumentFragment();
 for(const [title,names] of items){
  if(title)frag.appendChild(makeHeading(title));
  for(const name of names){const btn=pick(name);if(btn){frag.appendChild(btn)}}
 }
 const heading=nav.querySelector('.menu-heading');
 nav.querySelectorAll('p.muted').forEach(p=>p.remove());
 heading.after(frag);
})();

