
/* Local-only profile rewards: no account or network service required. */
(function(){
 const animals=[
  {id:'dog',name:'Fritzi · Dog',min:0,kind:'dog',color:'#df9a4d'},
  {id:'cat',name:'Minka · Cat',min:0,kind:'cat',color:'#b9b7c7'},
  {id:'fox',name:'Fuchsie · Fox',min:250,kind:'fox',color:'#e99149'},
  {id:'owl',name:'Oskar · Owl',min:500,kind:'owl',color:'#b58c68'},
  {id:'rabbit',name:'Hoppel · Rabbit',min:1000,kind:'rabbit',color:'#d4c3d2'},
  {id:'panda',name:'Rudi · Red panda',min:2000,kind:'panda',color:'#cb754f'}
 ];
 const ranks=[['Beginner',0],['Explorer',100],['Apprentice',250],['Conversationalist',500],['Skilled Speaker',1000],['German Enthusiast',2000],['Language Master',5000]];
 const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function xp(){return Math.max(0,Number(practiceState().xp)||0)}
 function profile(){ensureLearning();state.learning.profile??={avatar:'dog',badges:{}};return state.learning.profile}
 function avatarSVG(a){
  return '<img class="dl-animal-art" src="avatar_'+a.id+'.webp" alt="'+esc(a.name)+'" loading="lazy">';
 }
 function current(){return animals.find(a=>a.id===profile().avatar&&xp()>=a.min)||animals[0]}
 function achievements(){
  const scores=state.learning?.fullScores||{};
  const completed=Object.values(scores).filter(s=>s?.passed).length;
  const streak=practiceStreak();
  const p=profile();
  const specs=[['first','First Steps','Earn your first 10 XP',xp()>=10],['hundred','XP Explorer','Earn 100 XP',xp()>=100],['lessons','Getting Started','Complete 10 lessons',completed>=10],['streak','On a Roll','Practice 7 days in a row',streak>=7],['dialogues','Conversation Starter','Complete 5 different dialogues',Object.keys(p.dialogues||{}).length>=5],['perfect','Perfect Round','Complete a dialogue with no mistakes',!!p.perfectDialogue]];
  let changed=false;for(const [id,,,earned] of specs){if(earned&&!p.badges[id]){p.badges[id]=true;changed=true}}if(changed)save();return specs.map(([id,name,description])=>({name,description,earned:!!p.badges[id]}));
 }
 window.dlProfile=function(){
  const total=xp(),a=current(),r=ranks.filter(x=>total>=x[1]).at(-1),next=ranks.find(x=>x[1]>total),pct=next?Math.round((total-r[1])/(next[1]-r[1])*100):100;
  app.innerHTML='<section class="card"><h2>My German profile</h2><div class="dl-profile-top"><div class="dl-avatar-large">'+avatarSVG(a)+'</div><div><h3 style="margin:0">'+esc(a.name)+'</h3><p class="muted">'+esc(r[0])+' · '+total+' total XP</p></div></div><h3>Next rank</h3><p>'+(next?esc(next[0])+' · '+(next[1]-total)+' XP to go':'Highest rank achieved')+'</p><div class="dl-rank-track"><div style="width:'+pct+'%"></div></div><p class="muted">XP unlocks avatars and ranks. Lessons stay open at every rank.</p></section><section class="card"><h2>Choose your animal</h2><div class="dl-avatar-grid">'+animals.map(v=>'<button class="dl-avatar-option '+(a.id===v.id?'selected ':'')+(total<v.min?'locked':'')+'" onclick="dlChooseAvatar(\''+v.id+'\')" '+(total<v.min?'disabled':'')+'>'+avatarSVG(v)+'<strong>'+esc(v.name)+'</strong><small>'+(total<v.min?'Unlock at '+v.min+' XP':a.id===v.id?'Selected':'Choose avatar')+'</small></button>').join('')+'</div></section><section class="card"><h2>Achievements</h2>'+achievements().map(b=>'<div class="dl-badge '+(b.earned?'':'locked')+'"><strong>'+(b.earned?'✓ ':'○ ')+esc(b.name)+'</strong><div class="muted">'+esc(b.description)+'</div></div>').join('')+'</section><section class="card dl-reset-section"><h2>Testing and progress</h2><p class="muted">Start over to test the learning path from Module 1.</p><button type="button" class="dl-reset-button" onclick="dlResetAllProgress()">Reset all progress</button></section><button class="secondary dl-profile-button" onclick="practiceHub()">Back to practice</button>';
  window.scrollTo(0,0);
 };
 window.dlChooseAvatar=function(id){const a=animals.find(x=>x.id===id);if(!a||xp()<a.min)return;profile().avatar=id;save();updateMenuAvatar();dlProfile()};
 // Add profile to the navigation without changing existing navigation handlers.
 const menu=document.getElementById('sideMenu');
 function updateMenuAvatar(){
  if(!menu)return;
  const a=current();
  const image=menu.querySelector('.dl-menu-avatar');
  if(image){image.src='avatar_'+a.id+'.webp';image.alt=a.name;}
 }
 if(menu){
  const heading=menu.querySelector('.menu-heading');
  if(heading && !heading.querySelector('.dl-menu-avatar')){
   const headerAvatar=document.createElement('img');
   headerAvatar.className='dl-menu-avatar';
   headerAvatar.alt='Current animal avatar';
   heading.prepend(headerAvatar);
  }

  const btn=document.createElement('button');
  btn.className='dl-menu-profile-link';
  btn.textContent='Profile';
  btn.onclick=function(){toggleMenu(false);dlProfile()};
  const placementButton=[...menu.querySelectorAll('button')].find(b=>b.textContent.includes('Placement test'));
  if(placementButton)menu.insertBefore(btn,placementButton);else menu.appendChild(btn);
  updateMenuAvatar();
  const previousToggle=toggleMenu;
  toggleMenu=function(open){if(open)updateMenuAvatar();return previousToggle(open)};
 }
 const oldHub=practiceHub;practiceHub=function(){oldHub();const card=app.querySelector('.card');if(card){const a=current();const b=document.createElement('button');b.className='secondary dl-profile-button';b.innerHTML=avatarSVG(a)+' My profile, ranks & rewards';b.querySelector('img').style.cssText='height:36px;width:36px;object-fit:cover;border-radius:9px;vertical-align:middle;margin-right:8px';b.onclick=dlProfile;card.appendChild(b)}};
 const oldLog=practiceLog;practiceLog=function(points){const before=xp();oldLog(points);const after=xp();if(ranks.some(r=>r[1]>before&&r[1]<=after)||animals.some(a=>a.min>before&&a.min<=after)){profile().newUnlock=true;save()}};
 // Count unique completed dialogues and record perfect attempts for badges.
 const oldStart=window.startDialogue;window.startDialogue=function(id){window.dlDialogueStarted=id;window.dlDialogueMissed=false;return oldStart(id)};
 const oldAnswer=window.answerDialogue;window.answerDialogue=function(i){const before=document.getElementById('dialogue-feedback');const old=before?.textContent||'';oldAnswer(i);const now=document.getElementById('dialogue-feedback')?.textContent||'';if(now.includes('Not quite')&&now!==old)window.dlDialogueMissed=true};
 const oldNext=window.nextDialogueStep;window.nextDialogueStep=function(){oldNext();if(app.textContent.includes('Conversation complete')&&window.dlDialogueStarted){const p=profile();p.dialogues??={};p.dialogues[window.dlDialogueStarted]=true;if(!window.dlDialogueMissed)p.perfectDialogue=true;save();window.dlDialogueStarted=null}};
})();
