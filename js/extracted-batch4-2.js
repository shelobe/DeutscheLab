
/* Guided, single-question lesson flow; all questions are sourced from the separate fresh bank. */
let dlSelected=null,dlAnswered=false,dlShowTip=false;
function dlEscape(value){return safeText(String(value??''))}
function dlLessonIntro(id){
 const u=FULL_UNITS[id];if(!u)return;
 activeLessonScreen=id;document.body.classList.add('lesson-screen');
 app.innerHTML=`<div class="dl-flow"><div class="dl-flow-top"><button class="secondary" onclick="leaveLessonScreen()">Back</button><div class="dl-flow-progress"><span style="width:0%"></span></div></div>
 <section class="dl-flow-card"><div class="dl-flow-label">${dlEscape(u.level)} · ${dlEscape(u.title)}</div><h2>What you'll learn</h2>
 ${u.title==='Everyday conversations: Understanding in context'?
 '<div class="dl-conversation-cards">'+[
  ['When you need help','These phrases help you ask for clarification politely.'],
  ['Ich verstehe die Frage nicht.','I do not understand the question.','ich — I','verstehe — understand','die Frage — the question','nicht — not','Swap die Frage for das Wort (the word) or den Satz (the sentence).'],
  ['Können Sie mir helfen?','Can you help me?','können — can','Sie — formal you','mir — me','helfen — help'],
  ['Sprechen Sie bitte langsam.','Please speak slowly.','sprechen — speak','Sie — formal you','bitte — please','langsam — slowly']
 ].map((part,i)=>'<section class="dl-conversation-card"><h3>'+dlEscape(part[0])+'</h3><p>'+dlEscape(part[1])+'</p>'+(i?'<ul>'+part.slice(2).map(t=>'<li>'+dlEscape(t)+'</li>').join('')+'</ul>':'')+'</section>').join('')+'</div>':
 (u.level==='A2'&&u.title==='Accusative articles'?
 '<div class="dl-accusative-guide">'+
 '<section class="dl-accusative-intro"><h3>What is the accusative?</h3><p><strong>The accusative identifies the direct object</strong> — the person or thing receiving the action.</p><div class="dl-accusative-example"><span>Example</span><strong>Ich sehe <em>den Hund</em>.</strong><small>I see the dog.</small><p><strong>Ich</strong> is the subject (the person seeing). <strong>Den Hund</strong> is the direct object (the dog being seen), so it is in the <strong>accusative case</strong>. Because Hund is masculine, <strong>der</strong> changes to <strong>den</strong>.</p></div></section>'+
 '<section class="dl-accusative-panel"><h3>Definite articles <small>(the)</small></h3><table class="dl-article-table"><thead><tr><th>Gender</th><th>Before</th><th>Accusative</th></tr></thead><tbody><tr><td>Masculine</td><td>der</td><td><strong>den</strong></td></tr><tr><td>Feminine</td><td>die</td><td>die</td></tr><tr><td>Neuter</td><td>das</td><td>das</td></tr><tr><td>Plural</td><td>die</td><td>die</td></tr></tbody></table></section>'+
 '<section class="dl-accusative-panel"><h3>Indefinite articles <small>(a/an)</small></h3><table class="dl-article-table"><thead><tr><th>Gender</th><th>Before</th><th>Accusative</th></tr></thead><tbody><tr><td>Masculine</td><td>ein</td><td><strong>einen</strong></td></tr><tr><td>Feminine</td><td>eine</td><td>eine</td></tr><tr><td>Neuter</td><td>ein</td><td>ein</td></tr></tbody></table></section>'+
 '<section class="dl-accusative-tip"><strong>Remember:</strong> Only masculine articles change. <span>der → den · ein → einen</span></section>'+
 '</div>':
 (u.level==='A2'&&u.title==='Dative articles'?
 '<div class="dl-accusative-guide">'+
 '<section class="dl-accusative-intro"><h3>What is the dative?</h3><p>The <strong>dative case</strong> often identifies the indirect object — the person receiving something. Certain verbs and prepositions also require dative.</p><div class="dl-accusative-example"><span>Example</span><strong>Ich gebe <em>dem Mann</em> ein Buch.</strong><small>I give the man a book.</small><p><strong>Ich</strong> is the subject (who gives). <strong>Ein Buch</strong> is the direct object (what is given). <strong>Dem Mann</strong> is the indirect object (who receives it), so <strong>der Mann</strong> changes to <strong>dem Mann</strong>.</p></div></section>'+
 '<section class="dl-accusative-panel"><h3>Definite articles <small>(the)</small></h3><table class="dl-article-table"><thead><tr><th>Gender</th><th>Before</th><th>Dative</th></tr></thead><tbody><tr><td>Masculine</td><td>der</td><td><strong>dem</strong></td></tr><tr><td>Feminine</td><td>die</td><td><strong>der</strong></td></tr><tr><td>Neuter</td><td>das</td><td><strong>dem</strong></td></tr><tr><td>Plural</td><td>die</td><td><strong>den</strong></td></tr></tbody></table><p>Plural nouns usually add <strong>-n</strong>: die Kinder → den Kindern. Nouns already ending in -n or -s do not add another -n.</p></section>'+
 '<section class="dl-accusative-panel"><h3>Indefinite articles <small>(a/an)</small></h3><table class="dl-article-table"><thead><tr><th>Gender</th><th>Before</th><th>Dative</th></tr></thead><tbody><tr><td>Masculine</td><td>ein</td><td><strong>einem</strong></td></tr><tr><td>Feminine</td><td>eine</td><td><strong>einer</strong></td></tr><tr><td>Neuter</td><td>ein</td><td><strong>einem</strong></td></tr></tbody></table></section>'+
 '<section class="dl-accusative-panel"><h3>When do you use dative?</h3><p><strong>Common verbs:</strong> helfen (help), danken (thank), gefallen (be pleasing to).</p><p><strong>Common prepositions:</strong> mit (with), bei (at/near), nach (after/to), aus (out of/from), von (from/of), zu (to), seit (since/for).</p><div class="dl-accusative-example"><span>Examples</span><strong>Ich helfe der Frau.</strong><small>I help the woman. (helfen requires dative)</small><strong>Ich spreche mit dem Kind.</strong><small>I speak with the child. (mit requires dative)</small></div></section>'+
 '</div>':
 '<p>'+dlEscape(u.rule)+'</p>'))}<h3>See it in German</h3>
 ${u.examples.map(([de,en])=>`<div class="vocab-row"><div class="vocab-copy"><strong>${dlEscape(de)}</strong><span>${dlEscape(en)}</span></div><button class="secondary" onclick='speak(${JSON.stringify(dlAudioExample(de))})'>Listen</button></div>`).join('')}
 <button class="dl-flow-action" onclick="fullBegin(${id})">Start practice</button></section></div>`;
 window.scrollTo(0,0);
}
fullStudy=dlLessonIntro;
const dlBeginPrevious=fullBegin;
fullBegin=function(id){dlSelected=null;dlAnswered=false;dlShowTip=false;dlBeginPrevious(id)};
fullRender=function(){
 const s=fullSession;if(!s)return;
 if(s.idx>=s.questions.length){fullFinish();return}
 const u=FULL_UNITS[s.id],q=s.questions[s.idx];
 dlSelected=null;dlAnswered=false;dlShowTip=false;s.picks=[];
 activeLessonScreen=s.id;document.body.classList.add('lesson-screen');
 const pct=Math.round(100*s.idx/s.questions.length);
 app.innerHTML=`<div class="dl-flow"><div class="dl-flow-top"><button class="secondary" onclick="leaveLessonScreen()">Back</button><div class="dl-flow-progress" role="progressbar" aria-valuenow="${s.idx}" aria-valuemax="${s.questions.length}"><span style="width:${pct}%"></span></div></div>
 <div class="dl-flow-stats"><span>${dlEscape(u.level)} · ${dlEscape(u.title)}</span><span>${s.idx+1} of ${s.questions.length}</span></div>
 <section class="dl-flow-card"><div class="dl-flow-label">${q.type==='listen'?'LISTEN AND CHOOSE':'CHOOSE THE CORRECT ANSWER'}</div>
 <h2>${dlEscape(q.prompt)}</h2>
 ${q.type==='listen'?`<button class="secondary" onclick='speak(${JSON.stringify(q.prompt)})'>Play German audio</button>`:''}
 <div class="dl-flow-options">${q.options.map((o,i)=>`<button id="dl-option-${i}" class="secondary" onclick="dlChoose(${i})">${dlEscape(o)}</button>`).join('')}</div>
 <div id="dl-result" aria-live="polite"></div>
 <button id="dl-check" class="dl-flow-action" disabled onclick="dlCheck()">Check answer</button>
 <div id="dl-tip" class="dl-flow-tip" hidden><strong>Grammar help</strong><p>${dlEscape(q.why || u.rule)}</p></div>
 <button class="secondary" id="dl-help-btn" onclick="dlToggleTip()">Show grammar help</button>
 </section></div>`;
 window.scrollTo(0,0);
};
function dlChoose(i){
 if(dlAnswered)return;dlSelected=i;
 app.querySelectorAll('.dl-flow-options button').forEach((b,j)=>b.classList.toggle('dl-selected',i===j));
 document.getElementById('dl-check').disabled=false;
}
function dlToggleTip(){let tip=document.getElementById('dl-tip'),btn=document.getElementById('dl-help-btn');tip.hidden=!tip.hidden;btn.textContent=tip.hidden?'Show grammar explanation':'Hide grammar explanation'}
function dlCheck(){
 const s=fullSession;if(!s||dlAnswered||dlSelected===null)return;
 const q=s.questions[s.idx],ok=dlSelected===q.answer;dlAnswered=true;
 s.results.push(ok);if(ok)s.score++;
 if(typeof feedbackSound==='function')feedbackSound(ok);
 app.querySelectorAll('.dl-flow-options button').forEach((b,i)=>{b.disabled=true;b.classList.remove('dl-selected');if(i===q.answer)b.classList.add('dl-correct');else if(i===dlSelected)b.classList.add('dl-wrong')});
 document.getElementById('dl-result').innerHTML=`<div class="dl-flow-feedback"><strong>${ok?'Correct!':'Not quite'}</strong><p>${dlEscape(q.options[q.answer])}</p><p>${dlEscape(q.why||FULL_UNITS[s.id].rule)}</p></div>`;
 const btn=document.getElementById('dl-check');btn.textContent=s.idx===s.questions.length-1?'Finish lesson':'Continue';btn.disabled=false;btn.onclick=()=>{s.idx++;fullRender()};
}

/* Show the complete German sentence and English meaning after article questions. */
const dlArticleTranslations = {
 'Das Buch liegt auf dem Tisch.':'The book is on the table.',
 'Die Lampe ist hell.':'The lamp is bright.',
 'Der Tisch ist groß.':'The table is big.',
 'Das Kind spielt.':'The child is playing.',
 'Die Katze schläft.':'The cat is sleeping.',
 'Der Hund bellt.':'The dog barks.'
};
const dlOriginalCheckWithTranslation = dlCheck;
dlCheck = function(){
 const s=fullSession;
 const q=s&&s.questions&&s.questions[s.idx];
 const selected=dlSelected;
 dlOriginalCheckWithTranslation();
 if(!q||selected===null||!dlAnswered||!q.prompt.includes('___'))return;
 const answer=q.options[q.answer];
 if(!/^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)$/i.test(answer))return;
 const german=q.prompt.replace('___',answer);
 const english=dlArticleTranslations[german];
 if(!english)return;
 const feedback=document.querySelector('#dl-result .dl-flow-feedback');
 if(feedback){
   const block=document.createElement('div');
   block.className='dl-article-translation';
   block.innerHTML='<p><strong>Full German sentence:</strong> '+dlEscape(german)+'</p><p><strong>English:</strong> '+dlEscape(english)+'</p>';
   feedback.appendChild(block);
 }
};

// Existing completion handler preserves saved scores and returns to the course menu.
