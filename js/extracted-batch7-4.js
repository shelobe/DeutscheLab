
(function(){
 const happy=['Sehr gut! Great job!','Wunderbar!','Richtig! You got it!','Weiter so! Keep going!'];
 const retry=['Almost! Check the explanation.','Try again—you can do it.','Look at the grammar rule.'];
 const greetings=['Hallo! Ready to learn?','Übung macht den Meister!','Tap me anytime!','Los geht’s!'];
 let timer=null,lastFeedback='',lastScene=null;
 function react(kind, message){
  const hero=document.querySelector('.scene-hero');if(!hero)return;
  const mascot=hero.querySelector('.hero-mascot');if(!mascot)return;
  mascot.classList.remove('companion-happy','companion-think','companion-wave');
  void mascot.offsetWidth;
  mascot.classList.add(kind==='happy'?'companion-happy':kind==='think'?'companion-think':'companion-wave');
  hero.querySelector('.companion-bubble')?.remove();
  const bubble=document.createElement('div');bubble.className='companion-bubble';bubble.setAttribute('role','status');bubble.textContent=message;hero.appendChild(bubble);
  clearTimeout(timer);timer=setTimeout(()=>{bubble.remove();mascot.classList.remove('companion-happy','companion-think','companion-wave')},2600);
 }
 function check(){
  const hero=document.querySelector('.scene-hero');if(!hero)return;
  const mascot=hero.querySelector('.hero-mascot');
  if(mascot&&!mascot.dataset.animated){mascot.dataset.animated='1';mascot.setAttribute('title','Tap for encouragement');mascot.setAttribute('role','button');mascot.setAttribute('tabindex','0');mascot.setAttribute('aria-label','Hear encouragement from your companion');const say=()=>react('wave',greetings[Math.floor(Math.random()*greetings.length)]);mascot.addEventListener('click',say);mascot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();say()}})}
  if(hero!==lastScene){lastScene=hero;lastFeedback=''}
  const feedback=document.querySelector('#fullFeedback,#deepFeedback,#courseFeedback,#practiceFeedback,#listenFeedback,#articleFeedback,#sentenceFeedback,#placeFeedback');
  if(!feedback||!feedback.textContent.trim())return;
  const signature=feedback.textContent.trim();if(signature===lastFeedback)return;lastFeedback=signature;
  if(/^(correct|richtig)|correct!|unit passed/i.test(signature)||/Correct answer/i.test(signature)&&/Correct!/i.test(signature))react('happy',happy[Math.floor(Math.random()*happy.length)]);
  else if(/not quite|incorrect|try again|wrong/i.test(signature))react('think',retry[Math.floor(Math.random()*retry.length)]);
 }
 const observer=new MutationObserver(check);observer.observe(document.getElementById('app')||document.body,{subtree:true,childList:true,characterData:true});check();
})();
