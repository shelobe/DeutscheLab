
(function(){
 const prior=home;
 home=function(){
  const result=prior.apply(this,arguments);
  if(!app.querySelector('.dashboard-primary'))return result;
  if(app.querySelector('.dl-home-practice'))return result;
  const section=document.createElement('section');
  section.className='card dl-home-practice-section';
  section.innerHTML='<h2>Practice Hub</h2><p>Strengthen your German with quick, interactive exercises.</p><div class="game-grid dl-home-practice">'+
  '<button onclick="dlBuildModeMenu()"><span class="dl-practice-icon">🧩</span><span>Build sentences</span></button>'+
  '<button onclick="gameStart(\'match\')"><span class="dl-practice-icon">🔗</span><span>Match pairs</span></button>'+
  '<button onclick="listeningLevels()"><span class="dl-practice-icon">🎧</span><span>Listening</span></button>'+
  '<button onclick="photoMenu()"><span class="dl-practice-icon">🖼️</span><span>Picture practice</span></button>'+
  '<button onclick="articleHome()"><span class="dl-practice-icon">📚</span><span>Noun articles</span></button>'+
  '<button onclick="dlOpenOrganizedActivity(&quot;review&quot;)"><span class="dl-practice-icon">🧠</span><span>Review</span></button>'+
  '</div><button class="dl-practice-explore" onclick="practiceHub();window.scrollTo({top:0,left:0,behavior:\'instant\'})">Explore Practice Hub →</button>';
  const path=app.querySelector('.dashboard-primary');
  path.after(section);
  return result;
 };
 home();
})();

