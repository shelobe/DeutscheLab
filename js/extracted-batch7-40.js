
/* Rotate the home greeting instead of repeating Welcome back. */
(function(){
 const greetings=['Willkommen zurück!','Schön, dass du da bist!','Bereit für Deutsch?','Weiter so!','Zeit für Deutsch!','Du schaffst das!','Auf geht’s!'];
 let last=-1;
 function updateGreeting(){
  const heading=[...document.querySelectorAll('#app h2')].find(h=>['Welcome back','Willkommen zurück!',...greetings].includes(h.textContent.trim()));
  if(!heading)return;
  let next=Math.floor(Math.random()*greetings.length);
  if(next===last)next=(next+1)%greetings.length;
  last=next;heading.textContent=greetings[next];
 }
 const originalHome=window.home;
 if(typeof originalHome==='function'){
  window.home=function(...args){const result=originalHome.apply(this,args);updateGreeting();return result};
 }
 updateGreeting();
})();

