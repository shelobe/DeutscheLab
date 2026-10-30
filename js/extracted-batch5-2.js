
const GUIDE={
'A1|Greetings and introductions':['German greetings change with context. Hallo is informal; Guten Tag works in more formal settings. Auf Wiedersehen means goodbye.','Hallo, ich heiße Mia.','Hello, my name is Mia.'],
'A1|Nouns and articles':['German nouns have grammatical gender: der (masculine), die (feminine), das (neuter). Always memorize the article together with the noun. Plural nouns generally use die in the nominative.','der Tisch · die Lampe · das Buch','the table · the lamp · the book'],
'A1|Present-tense verbs':['Regular verbs change endings with the subject: ich -e, du -st, er/sie/es -t, wir/sie/Sie -en, ihr -t. The stem of lernen is lern-.','Ich lerne. Du lernst. Wir lernen.','I learn. You learn. We learn.'],
'A1|Basic word order':['In a German main clause, the conjugated verb is in position TWO. A time expression can come first, but the verb must still come next.','Heute gehe ich einkaufen.','Today I am going shopping.'],
'A2|Accusative articles':['The accusative marks the direct object. Only masculine definite articles change: der → den; die and das stay the same. Masculine ein → einen.','Der Hund schläft. Ich sehe den Hund.','The dog sleeps. I see the dog.'],
'A2|Dative articles':['Dative often marks the recipient or follows verbs such as helfen. Articles change: der → dem, die → der, das → dem; plural die → den.','Ich helfe der Frau.','I help the woman.'],
'A2|Perfect tense':['The spoken past (Perfekt) usually uses haben or sein plus a past participle. Many motion/change-of-state verbs use sein; most other verbs use haben.','Ich habe gekocht. Ich bin gegangen.','I cooked. I went.'],
'A2|Separable verbs':['Some verbs split in a main clause: the conjugated verb goes second and the prefix goes at the end. In an infinitive, the prefix stays attached.','Ich stehe um sieben Uhr auf.','I get up at seven o’clock.'],
'B1|Subordinate clauses':['After subordinating conjunctions like weil, dass and ob, the conjugated verb normally moves to the end of its clause.','Ich bleibe zu Hause, weil ich krank bin.','I stay home because I am sick.'],
'B1|Relative clauses':['A relative pronoun agrees in gender/number with the noun it refers to, but its case depends on its job within the relative clause.','Das ist der Mann, der hier arbeitet.','That is the man who works here.'],
'B1|Konjunktiv II':['Use Konjunktiv II to express wishes, hypotheticals and polite requests. Würde + infinitive is common for many verbs.','Wenn ich Zeit hätte, würde ich reisen.','If I had time, I would travel.'],
'B1|Prepositions and cases':['Certain verbs require a fixed preposition and case. Learn them as chunks: sich interessieren für + accusative; sprechen mit + dative.','Ich interessiere mich für Musik.','I am interested in music.'],
'B2|Passive voice':['The process passive uses werden + past participle. Change werden into the appropriate tense: wird (present), wurde (simple past).','Der Brief wurde gestern geschrieben.','The letter was written yesterday.'],
'B2|Advanced connectors':['Obwohl means although and introduces a subordinate clause with the verb at the end. Dennoch means nevertheless and begins a main clause.','Obwohl es regnete, gingen wir spazieren.','Although it rained, we went for a walk.'],
'B2|Reported speech':['Konjunktiv I is often used in formal reported speech to mark that a statement is being reported, not directly asserted.','Er sagt, er habe keine Zeit.','He says he has no time.'],
'B2|Nuanced vocabulary':['Allerdings can mean indeed (emphasis) or however (contrast), depending on context. Read the surrounding sentence to decide.','Das ist allerdings schwierig.','That is indeed difficult.']
};
function guideHtml(m){
 let g=GUIDE[m.level+'|'+m.title]||['Read the example, identify the pattern, then try the question.',m.q,m.why];
 return `<div class="explain-box"><h3>Why this works</h3><p>${safeText(g[0])}</p><div class="explain-example"><strong>${safeText(g[1])}</strong><br><span class="muted">${safeText(g[2])}</span></div><button class="secondary" onclick="speak(${JSON.stringify(g[1]).replace(/"/g,'&quot;')})">🔊 Hear example</button></div>`;
}
courseLesson=function(id){
 let m=COURSE[id];if(!m||!m.words.length)return courseMenu();
 app.innerHTML=illustratedHero(m.title,`${m.level} · ${m.skill}`,m.skill==='cases'?'cafe':'village',id%2?'katze.png':'hund.png')+`<section class="card"><h3>Learn the rule</h3>${guideHtml(m)}<h3>Vocabulary and examples</h3>${m.words.map(w=>`<div class="vocab-row"><div class="vocab-copy"><strong>${safeText(w[0])}</strong><span>${safeText(w[1])}</span></div><button class="secondary" onclick="speak(${JSON.stringify(w[0]).replace(/"/g,'&quot;')})">🔊</button></div>`).join('')}<button onclick="courseQuiz(${id})">Practice</button><button class="secondary" onclick="courseMenu('${m.level}')">Back to lessons</button></section>`;
};
courseAnswer=function(id,i){
 let m=COURSE[id],ok=i===m.ans;
 app.querySelectorAll('.card button').forEach(b=>b.disabled=true);
 if(ok){ensureLearning();if(!state.learning.completed.includes(id))state.learning.completed.push(id);save()}
 if(typeof recordQuestion==='function')recordQuestion(m,ok);
 document.getElementById('courseFeedback').innerHTML=`<p class="${ok?'correct':'wrong'}">${ok?'Correct!':'Not quite. Correct answer: '+safeText(m.opts[m.ans])}</p><div class="explain-box"><h3>Answer explained</h3><p>${safeText(m.why)}</p><p><strong>Complete answer:</strong> ${safeText(m.q.replace('___',m.opts[m.ans]))}</p></div><button onclick="courseMenu('${m.level}')">Back to lessons</button><button class="secondary" onclick="courseQuiz(${id})">Try again</button>`;
};
const previousPracticeAnswer=practiceAnswer;
practiceAnswer=function(id,i,mode){
 previousPracticeAnswer(id,i,mode);
 let m=COURSE[id],box=document.getElementById('practiceFeedback');
 if(box&&m.words.length)box.insertAdjacentHTML('beforeend',guideHtml(m));
};
const previousListeningAnswer=listeningAnswer;
listeningAnswer=function(choice,answer,german){
 previousListeningAnswer(choice,answer,german);
 document.getElementById('listenFeedback').insertAdjacentHTML('beforeend',`<div class="explain-box"><h3>Listen and compare</h3><p><strong>German:</strong> ${safeText(german)}</p><p><strong>Meaning:</strong> ${safeText(answer)}</p><p>Listen again and connect each word to its meaning.</p><button class="secondary" onclick="speak(${JSON.stringify(german).replace(/"/g,'&quot;')})">🔊 Replay</button></div>`);
};
const previousArticleAnswer=articleAnswer;
articleAnswer=function(chosen,correct){
 previousArticleAnswer(chosen,correct);
 let x=articleSession,w=x.pool[x.i],mode=x.mode==='review'?'gender':x.mode;
 let reason=mode==='gender'?`This noun is ${w[2]} ${w[0]}. Learn the article with the noun; endings can provide clues, but not every noun follows a rule.`:mode==='plural'?`The plural is die ${w[3]}. Plural nouns use die in nominative; the noun itself may also change.`:mode==='acc'?`The accusative marks a direct object. Masculine der becomes den; feminine die and neuter das do not change.`:`The dative often marks the recipient or follows certain verbs and prepositions. The definite articles are dem (masculine), der (feminine), dem (neuter).`;
 let target=document.getElementById('articleFeedback');if(target)target.insertAdjacentHTML('afterbegin',`<div class="explain-box"><h3>Why?</h3><p>${safeText(reason)}</p></div>`);
};
const previousSentenceWord=chooseSentenceWord;
chooseSentenceWord=function(i,w){
 previousSentenceWord(i,w);
 if(sentenceChosen.length===sentenceTarget.length){let box=document.getElementById('sentenceFeedback');if(box)box.insertAdjacentHTML('beforeend',`<div class="explain-box"><h3>Sentence structure</h3><p>In a standard German main clause, the conjugated verb takes the second position. Look for the subject, verb and any time expressions.</p></div>`)}
};
