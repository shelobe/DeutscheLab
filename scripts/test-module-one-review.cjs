/* Lightweight DOM double: runs the real review handlers without launching a browser. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.parent=null;this.disabled=false;this.value='';this.textContent='';this.className='';this.attributes={};this.style={};this.classList={add:c=>{this.className=[...new Set([...this.className.split(' ').filter(Boolean),c])].join(' ')},remove:c=>{this.className=this.className.split(' ').filter(x=>x!==c).join(' ')}}}
 appendChild(n){this.append(n)}
 getBoundingClientRect(){return {width:this.className.includes('dl-hidden-original-next')?0:100,height:48}}
 closest(){return null}
 scrollIntoView(){this.scrolled=true}
 append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n)}}
 get isConnected(){return this===app||this===head||this===body||!!this.parent?.isConnected}
 setAttribute(k,v){this.attributes[k]=v}
 replaceWith(n){const a=this.parent.children;n.parent=this.parent;a[a.indexOf(this)]=n;this.parent=null}
 remove(){if(this.parent){this.parent.children=this.parent.children.filter(x=>x!==this);this.parent=null}}
 matches(s){
  if(s.includes(':not(:empty)'))return this.id===s.split(':')[0].slice(1)&&this.children.length>0;
  if(s.startsWith('#'))return this.id===s.slice(1);
  if(s==='button.dl-hidden-original-next')return this.tag==='button'&&this.className.split(' ').includes('dl-hidden-original-next');
  if(s==='[data-dl-review-action]')return Object.hasOwn(this.attributes,'data-dl-review-action');
  return s[0]==='.'?this.className.split(' ').includes(s.slice(1)):s==='p.muted'?this.tag==='p'&&this.className==='muted':this.tag===s}
 querySelectorAll(selector){const wanted=selector.split(',');return this.children.flatMap(n=>[...(wanted.some(s=>n.matches(s))?[n]:[]),...n.querySelectorAll(selector)])}
 querySelector(s){if(s==='.dl-review-controls [data-dl-review-action]')return this.querySelector('.dl-review-controls')?.querySelector('[data-dl-review-action]')||null;return this.querySelectorAll(s)[0]||null}
 click(){if(!this.disabled)this.onclick?.()}
 focus(){}
 setRangeText(s,start=0,end=0){this.value=this.value.slice(0,start)+s+this.value.slice(end);this.selectionStart=this.selectionEnd=start+s.length}
}
const app=new Element('main'),head=new Element('head'),body=new Element('body'),played=[],timers=new Map();let timerId=0,cancelCount=0;
const context={console,Math,Set,Map,Array,String,Number,document:{head,body,addEventListener(){},getElementById:id=>id==='app'?app:body.querySelector('#'+id),createElement:t=>new Element(t),querySelector:s=>s.includes('.dl-review-controls')?app.querySelector('.dl-review-controls'):null},app,FULL_UNITS:[{title:'Alphabet and spelling'},{title:'Umlauts and ß'}],STRUCTURED_PATH:{A1:[{title:'Alphabet, sounds and spelling',ids:[0,1]},{title:'Other',ids:[0]}]},moduleSession:null,window:{addEventListener(){}},requestAnimationFrame:()=>{},speak:(...args)=>played.push(args),MutationObserver:class{observe(){}},setTimeout:fn=>{timers.set(++timerId,fn);return timerId},clearTimeout:id=>timers.delete(id)};
context.curriculumReview=(level,n)=>{context.moduleSession={level,n,questions:[{prompt:'Other module',options:['a','b'],answer:0}],idx:0,score:0,dlCoreScore:0}};
context.curriculumReviewRender=()=>{
 for(const n of [...app.children])n.remove();const card=new Element('section');card.className='card';const h=new Element('h2'),label=new Element('p'),choices=new Element('div');label.className='muted';choices.className='picture-choices';const feedback=new Element('div');feedback.id='moduleFeedback';card.append(label,h,choices,feedback);app.append(card);
 const q=context.moduleSession?.questions[context.moduleSession.idx];if(!q)return;
 h.textContent=q.prompt;
 q.options.forEach((text,i)=>{const b=new Element('button');b.textContent=text;b.onclick=()=>context.curriculumReviewAnswer(i);choices.append(b)});
};
context.curriculumReviewAnswer=i=>{const s=context.moduleSession;if(s.answered)return;s.answered=true;const ok=i===s.questions[s.idx].answer;if(ok){s.score++;s.dlCoreScore++}
 const next=new Element('button');next.textContent='Next question';next.onclick=()=>{s.idx++;s.answered=false;context.curriculumReviewRender()};app.querySelector('#moduleFeedback').append(next);
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/extracted-batch7-11.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/module-one-review.js'),'utf8'),context);
const buttons=()=>app.querySelectorAll('button'),button=text=>{const b=buttons().find(b=>b.textContent===text);assert.ok(b,'Missing button '+text);return b};
const current=()=>context.moduleSession.questions[context.moduleSession.idx];
function open(mode){context.curriculumReview('A1',0);const s=context.moduleSession;s.idx=s.questions.findIndex(q=>q.dlReviewMode===mode);context.curriculumReviewRender();return current()}
function answerType(text){button('Play word').click();const input=app.querySelector('input');input.value=text;input.oninput();button('Check answer').click()}
for(let run=0;run<100;run++){
 context.curriculumReview('A1',0);const qs=context.moduleSession.questions,counts={};qs.forEach(q=>{counts[q.dlReviewMode]=(counts[q.dlReviewMode]||0)+1;assert.ok(q.prompt);assert.ok(q.why);assert.ok(q.options[q.answer])});
 assert.equal(qs.length,15);for(const n of ['choice','type','speak','compare','match'])assert.equal(counts[n],3);
 assert.ok(qs.some(q=>q.dlReviewMode==='type'&&q.options[0]==='Wein'));assert.ok(qs.some(q=>q.dlReviewMode==='type'&&q.options[0]==='Liebe'));
 for(let i=0;i<15;i+=5)assert.equal(new Set(qs.slice(i,i+5).map(q=>q.dlReviewMode)).size,5);
}
console.log('PASS: 100 runs retain 15 tasks, five formats, EI/IE and interleaving');
let q=open('type');assert.equal(app.querySelector('input').autocomplete,'off');assert.equal(button('Check answer').disabled,true);assert.ok(!app.querySelector('.dl-review-controls').textContent.includes(q.options[0]));answerType(' '+q.options[0].toUpperCase()+' ');assert.equal(context.moduleSession.score,1);context.curriculumReviewAnswer(0);assert.equal(context.moduleSession.score,1);assert.equal(app.querySelector('.dl-review-controls'),null);assert.equal(app.querySelector('.picture-choices'),null);
open('type');answerType('wrong');assert.equal(context.moduleSession.score,0);assert.equal(context.moduleSession.answered,true);
open('type');const input=app.querySelector('input');input.value='Kase';input.selectionStart=1;input.selectionEnd=2;button('ä').click();assert.equal(input.value,'Käse');
q=open('compare');assert.equal(button('Same word').disabled,true);button('Play recording 1').click();assert.equal(button('Same word').disabled,true);button('Play recording 2').click();button(q.options[q.answer]).click();button('Check answer').click();assert.equal(context.moduleSession.score,1);
q=open('compare');button('Play recording 1').click();button('Play recording 2').click();button(q.options[1-q.answer]).click();button('Check answer').click();assert.equal(context.moduleSession.score,0);
q=open('match');assert.equal(button('Check matches').disabled,true);q.clipOrder.forEach((word,i)=>{button('Recording '+(i+1)).click();button(word).click()});assert.equal(button('Check matches').disabled,false);button('Check matches').click();assert.equal(context.moduleSession.score,1);
q=open('match');q.clipOrder.forEach((word,i)=>{button('Recording '+(i+1)).click();button(q.clipOrder[(i+1)%3]).click()});button('Check matches').click();assert.equal(context.moduleSession.score,0);
console.log('PASS: typing, special keys, blank-answer guard, compare, matching and once-only scoring');
class Recognition{constructor(){Recognition.current=this}start(){}stop(){}abort(){cancelCount++}}
context.window.SpeechRecognition=Recognition;
q=open('speak');button('Speak now').click();let rec=Recognition.current;rec.onresult({results:[[{transcript:'wrong'}]]});assert.equal(context.moduleSession.answered,false);button('Speak now').click();Recognition.current.onresult({results:[[{transcript:q.options[0]}]]});assert.equal(context.moduleSession.score,1);
open('speak');button('Speak now').click();Recognition.current.onerror({error:'no-speech'});assert.equal(context.moduleSession.answered,false);button('Use a listening question instead').click();assert.equal(current().dlReviewMode,'choice');assert.ok(current().options.includes(current().dlReviewAudio));button(current().dlReviewAudio).click();assert.equal(context.moduleSession.score,1);
open('speak');button('Speak now').click();rec=Recognition.current;open('type');rec.onresult({results:[[{transcript:'Schule'}]]});assert.equal(context.moduleSession.score,0);assert.ok(cancelCount>0);
open('speak');button('Speak now').click();for(const fn of [...timers.values()])fn();assert.equal(button('Speak now').disabled,false);assert.equal(context.moduleSession.answered,false);
delete context.window.SpeechRecognition;open('speak');button('Speak now').click();assert.equal(context.moduleSession.answered,false);button('Use a listening question instead').click();assert.equal(current().dlReviewMode,'choice');
context.curriculumReview('A1',1);assert.equal(context.moduleSession.questions[0].prompt,'Other module');
console.log('PASS: simulated speech success, misrecognition, silence, timeout, cancellation, fallback and other-module isolation');

const dock=body.querySelector('#dl-fixed-next'),dockButton=dock.querySelector('button');
function refreshDock(){context.window.dlRefreshFixedNext()}
q=open('type');refreshDock();assert.equal(dock.style.display,'flex');assert.equal(dockButton.textContent,'Check answer');assert.equal(dockButton.disabled,true);
button('Play word').click();app.querySelector('input').value=q.options[0];app.querySelector('input').oninput();refreshDock();
assert.equal(dockButton.disabled,false);refreshDock();assert.equal(dock.style.display,'flex','Dock persists across repeated updates');dockButton.click();
assert.equal(app.querySelector('.dl-review-controls'),null);assert.equal(dockButton.textContent,'Next question');assert.equal(app.querySelector('#moduleFeedback').scrolled,true);dockButton.click();assert.equal(context.moduleSession.answered,false);
q=open('match');const columns=app.querySelector('.dl-review-match-columns');assert.equal(columns.children.length,2);assert.equal(columns.children[0].children.length,3);assert.equal(columns.children[1].children.length,3);
q.clipOrder.forEach((word,i)=>{button('Recording '+(i+1)).click();button(word).click()});refreshDock();assert.equal(dockButton.textContent,'Check matches');assert.equal(dockButton.disabled,false);dockButton.click();assert.equal(app.querySelector('.dl-review-match-columns'),null);assert.equal(dockButton.textContent,'Next question');
context.window.SpeechRecognition=Recognition;open('speak');refreshDock();assert.equal(dockButton.textContent,'Use a listening question instead');button('Speak now').click();Recognition.current.onresult({results:[[{transcript:'schuler'}]]});refreshDock();assert.equal(dockButton.disabled,false);dockButton.click();assert.equal(current().dlReviewMode,'choice');button(current().dlReviewAudio).click();assert.equal(app.querySelector('.picture-choices'),null);refreshDock();assert.equal(dockButton.textContent,'Next question');dockButton.click();assert.equal(context.moduleSession.answered,false);
context.curriculumReview('A1',1);context.curriculumReviewRender();refreshDock();assert.equal(dock.style.display,'none');
console.log('PASS: real shared dock, disabled checks, repeated refresh, match columns, submitted bank cleanup, feedback visibility, speech fallback through Next, navigation cleanup');
