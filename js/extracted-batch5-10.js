
/* Levelled sentence banks for both directions of sentence building. */
const DL_LEVEL_SENTENCES = {
 A1:[
 ['I am learning German.','Ich lerne Deutsch.'],['The child drinks milk.','Das Kind trinkt Milch.'],['We live in Berlin.','Wir wohnen in Berlin.'],['She has a red bag.','Sie hat eine rote Tasche.'],['My mother cooks soup.','Meine Mutter kocht Suppe.'],['The dog sleeps here.','Der Hund schläft hier.'],['I like this book.','Ich mag dieses Buch.'],['Today it is cold.','Heute ist es kalt.']
 ],
 A2:[
 ['I get up at seven o’clock.','Ich stehe um sieben Uhr auf.'],['Yesterday we visited our grandmother.','Gestern haben wir unsere Großmutter besucht.'],['I have to buy some bread today.','Ich muss heute Brot kaufen.'],['She takes the bus because it is raining.','Sie fährt mit dem Bus, weil es regnet.'],['Can you help me with my homework?','Kannst du mir bei den Hausaufgaben helfen?'],['On Saturday we are going to the cinema.','Am Samstag gehen wir ins Kino.'],['He has already cleaned his room.','Er hat sein Zimmer schon aufgeräumt.'],['I am waiting for the train at the station.','Ich warte am Bahnhof auf den Zug.']
 ],
 B1:[
 ['Although it is raining, we are going for a walk.','Obwohl es regnet, gehen wir spazieren.'],['I hope that you can come tomorrow.','Ich hoffe, dass du morgen kommen kannst.'],['If I had more time, I would learn Italian.','Wenn ich mehr Zeit hätte, würde ich Italienisch lernen.'],['The woman who lives next door is a doctor.','Die Frau, die nebenan wohnt, ist Ärztin.'],['After I finished work, I called my friend.','Nachdem ich die Arbeit beendet hatte, rief ich meinen Freund an.'],['I do not know whether the shop is still open.','Ich weiß nicht, ob das Geschäft noch geöffnet ist.'],['He studies every day in order to pass the exam.','Er lernt jeden Tag, um die Prüfung zu bestehen.'],['We decided to travel by train instead of flying.','Wir haben beschlossen, mit dem Zug zu fahren, statt zu fliegen.']
 ],
 B2:[
 ['Despite the unexpected delay, the meeting started on time.','Trotz der unerwarteten Verspätung begann die Besprechung pünktlich.'],['The proposal that was discussed yesterday will be revised.','Der Vorschlag, der gestern besprochen wurde, wird überarbeitet.'],['Had I known about the problem earlier, I would have helped.','Hätte ich früher von dem Problem gewusst, hätte ich geholfen.'],['The more often you practice, the more confident you become.','Je öfter du übst, desto sicherer wirst du.'],['The report must be submitted by the end of the week.','Der Bericht muss bis Ende der Woche eingereicht werden.'],['She behaved as if she had never heard of the incident.','Sie tat so, als hätte sie noch nie von dem Vorfall gehört.'],['Instead of making assumptions, we should examine the evidence.','Anstatt Vermutungen anzustellen, sollten wir die Beweise prüfen.'],['It remains unclear to what extent the changes will affect us.','Es bleibt unklar, inwieweit die Änderungen uns betreffen werden.']
 ]
};
const dlLevelIndices={};
for(const [level,rows] of Object.entries(DL_LEVEL_SENTENCES)){
 dlLevelIndices[level]=rows.map(([en,de])=>{
  const idx=GAME_ITEMS.length;
  GAME_ITEMS.push({en,de,tokens:de.replace(/[.!?]+$/,'').split(/\s+/)});
  return idx;
 });
}
let dlSentenceLevel='A1';
const dlHubBeforeLevels=gameHub;
gameHub=function(){
 dlHubBeforeLevels();
 const grid=app.querySelector('.game-grid');
 if(!grid)return;
 const section=document.createElement('div');
 section.style.cssText='grid-column:1/-1;padding:12px 0 4px';
 section.innerHTML='<label for="dlBuildLevel" style="display:block;margin-bottom:8px;font-weight:700">Sentence difficulty</label><select id="dlBuildLevel" aria-label="Sentence difficulty"><option value="A1">A1 · Beginner</option><option value="A2">A2 · Elementary</option><option value="B1">B1 · Intermediate</option><option value="B2">B2 · Upper intermediate</option></select><p class="muted" style="margin:8px 0 0">Applies to Build a Sentence and Build in English.</p>';
 grid.prepend(section);
 const select=section.querySelector('select');select.value=dlSentenceLevel;
 select.addEventListener('change',()=>{dlSentenceLevel=select.value;});
};
const dlStartBeforeLevels=gameStart;
gameStart=function(mode,level){
 if(mode==='build')return startSentenceRound();
 if(mode!=='reverse')return dlStartBeforeLevels(mode,level);
 const seq=[...dlLevelIndices[dlSentenceLevel]];
 for(let i=seq.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[seq[i],seq[j]]=[seq[j],seq[i]];}
 gameSession={mode,level:dlSentenceLevel,pool:GAME_ITEMS,seq:seq.slice(0,6),idx:0,correct:0,answered:false,picked:[],matches:[],selected:null};
 gameRender();
};
