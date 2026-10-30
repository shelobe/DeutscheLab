
(function(){
const NEW_QUESTIONS={"0": [["Meine Schwester ist ___ Jahre alt.", ["zwanzig", "zwanzigste", "zwanziger"], 0, "A person's age uses a cardinal number: zwanzig Jahre alt."], ["Wie alt ___ dein Bruder?", ["ist", "sind", "bist"], 0, "Dein Bruder is third-person singular, so use ist."]], "1": [["Das ist ___ Vater.", ["mein", "meine", "meinen"], 0, "Vater is masculine nominative; use mein."], ["Anna besucht ___ Schwester.", ["ihre", "ihr", "ihren"], 0, "Schwester is feminine accusative, so use ihre."]], "2": [["Ich hätte gern ___ Wasser.", ["ein", "einen", "eine"], 0, "Wasser is neuter: ein Wasser."], ["___ kostet der Kaffee?", ["Wie viel", "Wie viele", "Wo"], 0, "Wie viel asks about a price."]], "3": [["Der Termin ist ___ Montag.", ["am", "um", "im"], 0, "Use am with days of the week."], ["Der Zug fährt ___ acht Uhr.", ["um", "am", "in"], 0, "Use um with a clock time."]], "4": [["___ wohnst du?", ["Wo", "Wer", "Wann"], 0, "Wo asks about location."], ["___ heißt deine Lehrerin?", ["Wie", "Was", "Wohin"], 0, "Wie heißt ... asks for a name."]], "5": [["Ich habe ___ Auto.", ["kein", "nicht", "keine"], 0, "Kein negates an indefinite neuter noun: kein Auto."], ["Heute komme ich ___.", ["nicht", "kein", "keine"], 0, "Nicht negates the action of coming."]], "6": [["Jeden Morgen ___ ich Kaffee.", ["trinke", "trinkst", "trinkt"], 0, "Ich takes the -e verb ending."], ["Sie ___ um sechs Uhr auf.", ["steht", "stehen", "stehe"], 0, "Aufstehen is separable: sie steht ... auf."]], "7": [["Entschuldigung, wo ist ___ Bahnhof?", ["der", "die", "das"], 0, "Bahnhof is masculine: der Bahnhof."], ["Gehen Sie ___ links.", ["nach", "in", "zu"], 0, "Nach links means to the left."]], "8": [["___ Abend, Frau Müller!", ["Guten", "Gute", "Gut"], 0, "The greeting is Guten Abend."], ["Ich ___ aus Kanada.", ["komme", "kommt", "kommen"], 0, "With ich, the verb kommen takes the -e ending: ich komme. Ich komme aus Kanada means I come from Canada."]], "9": [["___ Fenster ist offen.", ["Das", "Der", "Die"], 0, "Fenster is neuter."], ["___ Zeitung liegt hier.", ["Die", "Das", "Der"], 0, "Zeitung is feminine; -ung is a common feminine ending."]], "10": [["Meine Freunde ___ in Hamburg.", ["wohnen", "wohnt", "wohnst"], 0, "Plural Freunde uses wohnen."], ["Du ___ gern Musik.", ["hörst", "hört", "höre"], 0, "Du takes -st."]], "11": [["Morgen ___ wir ins Kino.", ["gehen", "wir gehen", "geht"], 0, "After Morgen, the finite verb must come second."], ["Which sentence is correct?", ["Am Sonntag besuche ich Oma.", "Am Sonntag ich besuche Oma.", "Am Sonntag Oma ich besuche."], 0, "A main-clause finite verb is in second position."]], "12": [["Ich stelle die Tasse auf ___ Tisch.", ["den", "dem", "der"], 0, "Placing the cup answers wohin?; masculine accusative is den."], ["Die Jacke hängt an ___ Tür.", ["der", "die", "den"], 0, "A fixed location answers wo?; feminine dative is der."], ["Wir fahren in ___ Stadt.", ["die", "der", "den"], 0, "Movement toward a destination takes accusative: in die Stadt."]], "13": [["Du ___ hier nicht rauchen.", ["darfst", "dürfen", "darf"], 0, "Du darfst expresses permission/prohibition."], ["Wir ___ morgen früh aufstehen.", ["müssen", "muss", "musst"], 0, "Wir uses müssen."]], "14": [["Dieser Film ist ___ als der andere.", ["spannender", "spannendste", "spannend"], 0, "Comparisons with als use the comparative."], ["Von allen ist Lara ___ .", ["am schnellsten", "schneller", "schnell"], 0, "Am ... -sten expresses the superlative."]], "15": [["Ich ___ mich auf den Urlaub.", ["freue", "freut", "freuen"], 0, "Sich freuen is reflexive; ich freue mich."], ["Er wäscht ___ die Hände.", ["sich", "ihn", "ihm"], 0, "Sich die Hände waschen uses reflexive sich."]], "16": [["___ bitte die Tür!", ["Öffne", "Öffnest", "Öffnen"], 0, "Informal singular imperative: Öffne!"], ["___ Sie bitte hier.", ["Warten", "Wartet", "Warte"], 0, "Formal imperative uses infinitive + Sie."]], "17": [["Ich trage einen ___ Mantel.", ["roten", "roter", "rotes"], 0, "After einen, masculine accusative adjective ends -en."], ["Das ist ein ___ Haus.", ["kleines", "kleine", "kleinen"], 0, "After ein, neuter nominative adjective ends -es."]], "18": [["Nächste Woche ___ ich nach Köln fahren.", ["werde", "wirst", "wird"], 0, "Ich werde + infinitive expresses future."], ["Morgen ___ wir unsere Freunde.", ["besuchen", "besucht", "besuche"], 0, "Present tense can describe a planned future event."]], "19": [["Ich möchte ein Zimmer ___ zwei Nächte.", ["für", "mit", "nach"], 0, "Für introduces a duration or purpose."], ["Wo kann ich ___ einchecken?", ["mich", "mir", "mein"], 0, "Einchecken is often used reflexively: mich einchecken."]], "20": [["Ich sehe ___ Lehrer.", ["den", "dem", "der"], 0, "Lehrer is masculine; direct object takes den."], ["Wir kaufen ___ Banane.", ["eine", "einen", "ein"], 0, "Banane is feminine; accusative eine."]], "21": [["Ich fahre mit ___ Fahrrad.", ["dem", "das", "den"], 0, "Mit always takes dative; das Fahrrad → dem Fahrrad."], ["Sie gibt ___ Kind ein Geschenk.", ["dem", "das", "den"], 0, "Recipient is dative: dem Kind."]], "22": [["Gestern ___ wir viel gelernt.", ["haben", "sind", "werden"], 0, "Lernen forms Perfekt with haben."], ["Sie ist nach München ___.", ["gefahren", "gefährt", "fahren"], 0, "Fahren's past participle is gefahren."]], "23": [["Ich ___ meine Freundin heute ___.", ["rufe ... an", "anrufe ...", "rufe ... auf"], 0, "Anrufen splits: rufe ... an."], ["Wann ___ der Film ___?", ["fängt ... an", "anfängt ...", "fängt ... auf"], 0, "Anfangen splits in a main clause: fängt ... an."]]};
const originalQuestions=fullQuestions;
const seeded=(arr,seed)=>{let copy=[...arr];for(let i=copy.length-1;i>0;i--){seed=(seed*1664525+1013904223)>>>0;let j=seed%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy};
fullQuestions=function(u){
 let id=FULL_UNITS.indexOf(u),fresh=NEW_QUESTIONS[id];
 if(!fresh)return originalQuestions(u);
 let n=(state.learning?.fullAttempts?.[id]||0),base=originalQuestions(u);
 let newItems=fresh.map((row,i)=>{
  let [prompt,opts,answer,why]=row,correct=opts[answer],shuffled=seeded(opts,(id+1)*101+(n+1)*67+i*31);
  return {type:'grammar',prompt,options:shuffled,answer:shuffled.indexOf(correct),why};
 });
 // Mix unseen sentences with previously taught material; repeat attempts rotate question order.
 let mixed=[...newItems,...base.filter(q=>q.type==='grammar'||q.type==='order'),...base.filter(q=>q.type==='translate'||q.type==='listen'||q.type==='recall')];
 return seeded(mixed,(id+7)*1231+(n+1)*79).slice(0,7);
};
const originalBegin=fullBegin;
fullBegin=function(id){
 ensureLearning();state.learning.fullAttempts??={};state.learning.fullAttempts[id]=(state.learning.fullAttempts[id]||0)+1;save();
 originalBegin(id);
};
const originalRender=fullRender;
fullRender=function(){
 originalRender();
 if(!fullSession)return;
 let title=app.querySelector('.card .muted');
 if(title)title.insertAdjacentHTML('beforebegin',`<p class="dynamic-progress">Practice new sentences — not just the lesson examples.</p>`);
};
const originalMark=fullMark;
fullMark=function(ok,answer,why){
 originalMark(ok,answer,why);
 let box=document.querySelector('#fullFeedback .unit-explain');
 if(box)box.insertAdjacentHTML('beforeend',`<p class="muted">Focus on the grammar pattern so you can use it in sentences you haven't seen before.</p>`);
};
function fixBack(){
 let b=document.getElementById('screenBack');
 if(!b||b.dataset.fixed)return;
 b.dataset.fixed='yes';
 b.onclick=(e)=>{
  e.preventDefault();e.stopImmediatePropagation();
  let id=fullSession?.id;
  if(id!==undefined&&id!==null){fullStudy(id)}
  else if(app.querySelector('.lesson-welcome')){let title=app.querySelector('.lesson-welcome h2')?.textContent||'';let level=state.learning?.placement?.recommended||'A1';let u=FULL_UNITS.find(x=>title.includes(x.title));friendlyCourse(u?.level||level)}
  else home();
  window.scrollTo(0,0);
 };
}
new MutationObserver(fixBack).observe(app,{childList:true,subtree:false});fixBack();
})();
