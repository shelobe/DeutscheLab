const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Node{
 constructor(){this.children=[];this.className='';this.textContent='';this.classList={remove(){},add(){}}}
 append(...nodes){this.children.push(...nodes)}
 querySelector(){return null}
 set innerHTML(html){this.html=html;this.children=[];if(this===app){ids={};for(const m of html.matchAll(/id="([^"]+)"/g))ids[m[1]]=new Node()}}
 get innerHTML(){return this.html||''}
}
let ids={},app=new Node(),saves=0,route=[],random=0,nativeCalls=0;
const c={app,FULL_UNITS:[{level:'A1',title:'Umlauts and ß'},{level:'A1',title:'Other'}],fullSession:null,activeLessonScreen:0,
 state:{learning:{}},ensureLearning(){},save(){saves++},safeText:s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])),
 illustratedHero:()=>'',fullStudy(){},fullMenu(){},document:{body:new Node(),createElement:()=>new Node(),getElementById:id=>ids[id]||null},
 window:{scrollTo(){},dlRefreshFixedNext(){}},Math:Object.assign(Object.create(Math),{random:()=>random}),Date,
 STRUCTURED_PATH:{A1:[{ids:[0]}]},curriculumView:level=>route.push(['lessons',level]),curriculumLesson:id=>route.push(['lesson',id]),
 dlPronunciationIntro:()=>route.push(['pronunciation']),fullBegin:id=>route.push(['retry',id]),speak:word=>route.push(['audio',word])};
vm.createContext(c);
const native=fs.readFileSync('js/legacy-part-1.js','utf8').split('\n').find(line=>line.startsWith('function fullFinish()'));
vm.runInContext(native,c);
const realFinish=c.fullFinish;c.fullFinish=function(){nativeCalls++;return realFinish()};
const flow=fs.readFileSync('js/extracted-batch6-16.js','utf8');
vm.runInContext(flow.slice(flow.indexOf('const lessonOriginalFinish='),flow.indexOf('const lessonOriginalMenu=')),c);
vm.runInContext(fs.readFileSync('js/umlaut-results.js','utf8'),c);
const questions=Array.from({length:10},(_,i)=>({prompt:'Prompt '+i,options:['correct','wrong'],answer:0,why:'Reason '+i,dlLessonMode:i===0?'match':undefined,words:i===0?['schon','schön']:undefined}));
function complete(score,priorPassed=false){c.state.learning={fullScores:{0:{best:9,passed:priorPassed}}};c.fullSession={id:0,score,idx:10,questions,results:questions.map((_,i)=>i<score)};c.activeLessonScreen=0;route=[];c.fullFinish();}
function dock(){return ids['dl-umlaut-results'].children.at(-1)}
for(random of [0,.99])for(let score=0;score<=10;score++){
 complete(score);assert.equal(c.state.learning.fullScores[0].passed,score>=8);assert.equal(c.state.learning.fullScores[0].total,10);
 assert.equal(c.state.learning.fullScores[0].last,score);assert.equal(c.state.learning.fullMistakes.length,10-score);assert.equal(c.fullSession,null);assert.equal(c.activeLessonScreen,null);
 assert(app.innerHTML.includes(score*10+'%'));assert(app.innerHTML.includes((random<.5?'hoppel':'fuchsie')+'-'+(score>=8?'celebrate':'encourage')+'.webp'));
 assert.equal(dock().children[1].textContent,score>=8?'Continue':'Try again');assert.equal(route.length,0,'Completion remains on results');
 if(score===10)assert(!ids['dl-umlaut-review-mistakes']);
}
assert.equal(nativeCalls,22);
complete(6,true);assert(c.state.learning.fullScores[0].passed,'Earlier pass survives a lower attempt');assert(app.innerHTML.includes('encourage.webp'));
complete(0);const initial=app.innerHTML,beforeSaves=saves;
ids['dl-umlaut-review-mistakes'].onclick();assert(app.innerHTML.includes('schon · schön'));assert(app.innerHTML.includes('Reason 0'));
ids['dl-umlaut-mistake-audio'].children[0].onclick();assert.deepEqual(route.at(-1),['audio','schon']);
for(let i=1;i<10;i++){dock().children[1].onclick();assert(app.innerHTML.includes('Reason '+i))}
dock().children[1].onclick();assert.equal(app.innerHTML,initial);assert.equal(saves,beforeSaves,'Mistake review never saves or scores');
dock().children[1].onclick();assert.deepEqual(route.at(-1),['retry',0]);
complete(8);dock().children[1].onclick();assert.deepEqual(route.at(-1),['pronunciation']);
c.STRUCTURED_PATH.A1[0].ids=[0,1];complete(8);dock().children[1].onclick();assert.deepEqual(route.at(-1),['lesson',1]);
dock().children[0].onclick();assert.deepEqual(route.at(-1),['lessons','A1']);
// Another lesson still runs native completion and its usual automatic menu return.
c.activeLessonScreen=null;c.fullSession={id:1,score:6,questions,results:Array(10).fill(true)};c.fullFinish();assert(app.innerHTML.includes('Unit results')||app.innerHTML.includes('6/7 correct'));assert(!ids['dl-umlaut-results']);
console.log('PASS: all score boundaries, both character branches, native saves/mistakes, prior pass retention, read-only review/audio, retry/continue/back and other-lesson isolation');
