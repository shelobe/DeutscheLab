
(function(){
 const specs=[
  {title:'Personal pronouns and verb endings',module:'Getting started',at:2,rule:'The subject tells who acts: ich (I), du (you), er/sie/es (he/she/it), wir (we), ihr (you plural), sie/Sie (they/formal you). Regular verbs change endings: ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen.',examples:[['Ich lerne Deutsch.','I learn German.'],['Du lernst Deutsch.','You learn German.'],['Wir lernen zusammen.','We learn together.']],questions:[['Choose the correct form: Du ___ Deutsch.',['lernst','lerne','lernen'],0,'Du takes -st.'],['Which pronoun means “we”?',['wir','ihr','sie'],0,'Wir means we.'],['Choose: Er ___ heute.',['arbeitet','arbeiten','arbeite'],0,'Er takes -t.'],['Choose: Wir ___ Deutsch.',['lernen','lernt','lernst'],0,'Wir takes -en.'],['Which is formal “you”?',['Sie','du','ihr'],0,'Capitalized Sie is formal you.'],['Choose: Ich ___ hier.',['wohne','wohnt','wohnen'],0,'Ich takes -e.'],['Choose: Ihr ___ zusammen.',['lernt','lernen','lernst'],0,'Ihr takes -t.']]},
  {title:'Sein and haben in everyday sentences',module:'Getting started',at:3,rule:'Sein means to be: ich bin, du bist, er/sie ist, wir sind, ihr seid, sie/Sie sind. Haben means to have: ich habe, du hast, er/sie hat, wir haben, ihr habt, sie/Sie haben. These are irregular and must be learned as patterns.',examples:[['Ich bin müde.','I am tired.'],['Du hast Zeit.','You have time.'],['Wir sind zu Hause.','We are at home.']],questions:[['Ich ___ müde.',['bin','bist','ist'],0,'Ich bin means I am.'],['Du ___ Zeit.',['hast','hat','habe'],0,'Du hast means you have.'],['Wir ___ zu Hause.',['sind','seid','ist'],0,'Wir sind means we are.'],['Er ___ einen Hund.',['hat','hast','haben'],0,'Er hat means he has.'],['Ihr ___ freundlich.',['seid','sind','bist'],0,'Ihr seid means you all are.'],['Sie (formal) ___ Zeit.',['haben','hat','hast'],0,'Formal Sie uses haben.'],['Ich ___ eine Katze.',['habe','hat','hast'],0,'Ich habe means I have.']]},
  {title:'Direct objects: der, den and einen',module:'Where you’re from and first sentences',at:3,rule:'A subject does the action; a direct object receives it. Masculine articles change in the accusative: der → den and ein → einen. Feminine die/eine and neuter das/ein stay the same. Example: Der Mann kauft einen Apfel.',examples:[['Ich sehe den Hund.','I see the dog.'],['Ich kaufe einen Apfel.','I buy an apple.'],['Sie hat eine Katze.','She has a cat.']],questions:[['Ich sehe ___ Hund.',['den','der','das'],0,'Hund is masculine and the direct object, so use den.'],['Ich kaufe ___ Apfel.',['einen','ein','eine'],0,'Apfel is masculine: ein changes to einen.'],['Sie hat ___ Katze.',['eine','einen','ein'],0,'Katze is feminine: eine remains eine.'],['___ Hund schläft.',['Der','Den','Einen'],0,'The dog is the subject, so der.'],['Ich brauche ___ Buch.',['ein','einen','eine'],0,'Buch is neuter: ein remains ein.'],['Wir besuchen ___ Mann.',['den','der','die'],0,'Mann is a masculine direct object.'],['Which word is the object in “Ich trinke Wasser”?',['Wasser','Ich','trinke'],0,'Wasser is what is being drunk.']]},
  {title:'Modal verbs and polite requests',module:'Everyday conversations',at:0,rule:'Modal verbs express ability, necessity and wishes. Können = can, müssen = must, wollen = want. Möchten is the polite way to say would like. Conjugate the modal in position two and place the second verb in its infinitive form at the end: Ich kann Deutsch sprechen.',examples:[['Ich kann Deutsch sprechen.','I can speak German.'],['Ich muss heute arbeiten.','I must work today.'],['Ich möchte einen Tee.','I would like a tea.']],questions:[['Ich ___ Deutsch sprechen.',['kann','können','kannst'],0,'Ich kann; sprechen stays at the end.'],['Du ___ gehen.',['musst','muss','müssen'],0,'Du musst means you must.'],['Which is the polite request?',['Ich möchte Wasser.','Ich wollen Wasser.','Ich muss Wasser.'],0,'Möchte expresses would like.'],['Wir ___ heute lernen.',['wollen','will','wollt'],0,'Wir wollen; lernen stays at the end.'],['Where does sprechen go in “Ich kann Deutsch sprechen”?',['At the end','Before ich','Immediately after ich'],0,'With a modal verb, the second verb is an infinitive at the end.'],['Er ___ heute arbeiten.',['muss','musst','müssen'],0,'Er muss means he must.'],['___ Sie mir helfen?',['Können','Kann','Kannst'],0,'Formal Sie takes können.']]},
  {title:'Separable verbs for daily routines',module:'People and everyday life',at:2,rule:'Some German verbs have a separable prefix. In a main-clause statement, conjugate the verb stem in second position and move the prefix to the end: aufstehen → Ich stehe um sieben Uhr auf. With a modal, the whole infinitive stays together: Ich muss früh aufstehen.',examples:[['Ich stehe um sieben Uhr auf.','I get up at seven.'],['Wir kaufen heute ein.','We shop today.'],['Ich muss früh aufstehen.','I must get up early.']],questions:[['Ich ___ um sieben Uhr ___.',['stehe / auf','auf / stehe','stehen / auf'],0,'Stehe is second and auf goes at the end.'],['Wir ___ heute ___.',['kaufen / ein','ein / kaufen','kauft / ein'],0,'Wir kaufen ... ein.'],['Choose the correct sentence.',['Ich rufe dich an.','Ich anrufe dich.','Ich rufe an dich.'],0,'The prefix an moves to the end.'],['With a modal: Ich muss früh ___.',['aufstehen','stehe auf','auf stehe'],0,'After muss, the complete infinitive stays together.'],['What is the infinitive of “ich stehe auf”?',['aufstehen','stehenauf','steheauf'],0,'The prefix is attached in the infinitive.'],['Er ___ seine Mutter ___.',['ruft / an','rufen / an','an / ruft'],0,'Er ruft ... an.'],['Choose the correct sentence.',['Heute kaufe ich ein.','Heute ich kaufe ein.','Heute ein kaufe ich.'],0,'The conjugated verb stays second; prefix goes last.']]},
  {title:'Prepositions for places and movement',module:'Getting around',at:0,rule:'Prepositions connect places and movement. In = in; auf = on; mit = with/by; nach = to (most cities and countries); zu = to (people and destinations); aus = from. Some require a particular case: mit dem Bus, zu der Schule (zur Schule). Learn each phrase as a unit.',examples:[['Ich fahre mit dem Bus.','I travel by bus.'],['Wir fahren nach Berlin.','We travel to Berlin.'],['Ich gehe zur Schule.','I go to school.']],questions:[['Ich fahre ___ Berlin.',['nach','mit','aus'],0,'Nach is used for most cities.'],['Ich fahre ___ dem Bus.',['mit','nach','zu'],0,'Mit dem Bus means by bus.'],['Ich komme ___ Deutschland.',['aus','nach','mit'],0,'Aus means from.'],['Ich gehe ___ Schule.',['zur','nach','mit'],0,'Zur Schule means to school.'],['Das Buch liegt ___ dem Tisch.',['auf','nach','aus'],0,'Auf means on.'],['Ich wohne ___ Berlin.',['in','nach','mit'],0,'In Berlin means in Berlin.'],['Ich gehe ___ meiner Freundin.',['zu','nach','aus'],0,'Zu indicates going to a person.']]}
 ];
 const units=[];
 for(const spec of specs){
  const u={level:'A1',title:spec.title,rule:spec.rule,examples:spec.examples,checkpoint:{prompt:spec.questions[0][0],options:spec.questions[0][1],answer:spec.questions[0][2],why:spec.questions[0][3]}};
  const id=FULL_UNITS.length;FULL_UNITS.push(u);units.push({u,id,spec});
  const mod=STRUCTURED_PATH.A1.find(m=>m.title===spec.module);
  if(mod)mod.ids.splice(Math.min(spec.at,mod.ids.length),0,id);
 }
 const oldQuestions=fullQuestions;
 fullQuestions=function(u){
  const match=units.find(x=>x.u===u);
  if(!match)return oldQuestions(u);
  return match.spec.questions.map(([prompt,options,answer,why])=>({type:'grammar',prompt,options,answer,why}));
 };
 const oldStudy=fullStudy;
 fullStudy=function(id){
  const result=oldStudy.apply(this,arguments);
  const match=units.find(x=>x.id===id);
  if(!match)return result;
  const heading=Array.from(app.querySelectorAll('h2')).find(h=>h.textContent==="What you'll learn");
  const p=heading?.nextElementSibling;
  if(p?.tagName==='P')p.outerHTML='<div class="dl-conversation-card"><h3>Learn the pattern</h3><p>'+safeText(match.spec.rule)+'</p></div>';
  return result;
 };
 // Brief, reusable character dialogues inside the existing course lessons.
 const dialogues={
  'Greetings and introductions':[['Katze','Hallo! Wie heißt du?'],['Hund','Ich heiße Fritzi. Und du?'],['Katze','Ich heiße Minka. Freut mich!']],
  'Food and ordering':[['Katze','Guten Tag! Was möchten Sie?'],['Hund','Ich möchte einen Tee, bitte.'],['Katze','Gern. Sonst noch etwas?'],['Hund','Nein, danke.']],
  'Places and directions':[['Hund','Entschuldigung, wo ist der Bahnhof?'],['Katze','Gehen Sie geradeaus und dann links.'],['Hund','Vielen Dank!']],
  'Daily routines':[['Katze','Wann stehst du auf?'],['Hund','Ich stehe um sieben Uhr auf.'],['Katze','Und wann arbeitest du?'],['Hund','Um acht Uhr.']],
  'Everyday conversations: Understanding in context':[['Katze','Können Sie mir helfen?'],['Hund','Ja, natürlich.'],['Katze','Sprechen Sie bitte langsam.'],['Hund','Ja, gern.']]
 };
 const previousStudy=fullStudy;
 fullStudy=function(id){
  const result=previousStudy.apply(this,arguments);
  const u=FULL_UNITS[id],lines=dialogues[u?.title];
  if(!lines)return result;
  const card=app.querySelector('.dl-flow-card')||app.querySelector('.card');
  const start=card?.querySelector('.dl-flow-action');
  if(!card||card.querySelector('.dl-a1-dialogue'))return result;
  const block=document.createElement('section');block.className='dl-a1-dialogue';
  block.innerHTML='<h3>Short conversation</h3><p class="muted">Listen to each line, then try saying it yourself.</p>'+lines.map(([speaker,line])=>'<div class="dl-a1-dialogue-line"><div class="dl-speaker"><img class="dl-conversation-avatar" src="./'+(speaker==='Katze'?'file_000000003ba881f5874140d280c0ed4d.png':'file_00000000c71081f5ae55b48a9389c582.png')+'" alt="" loading="lazy"><strong>'+safeText(speaker==='Katze'?'Minka':'Fritzi')+'</strong></div><span>'+safeText(line)+'</span><button type="button" class="secondary" data-line="'+encodeURIComponent(line)+'">Hear</button></div>').join('');
  block.querySelectorAll('[data-line]').forEach(btn=>btn.addEventListener('click',()=>speak(decodeURIComponent(btn.dataset.line))));
  if(start)start.before(block);else card.append(block);
  return result;
 };
})();
