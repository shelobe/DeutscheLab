
/* Home Quick practice launches an activity immediately, rather than opening a menu. */
function quickRandomPractice(){
 const activities=[
  ()=>gameStart('build'),
  ()=>gameStart('match'),
  ()=>gameStart('listen', 'A1'),
  ()=>gameStart('listen', 'A2'),
  ()=>listeningPractice(),
  ()=>startSentenceRound()
 ];
 const choice=activities[Math.floor(Math.random()*activities.length)];
 choice();
 window.scrollTo(0,0);
}

