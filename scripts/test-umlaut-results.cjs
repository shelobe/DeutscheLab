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
 moduleSession:null,curriculumReview(){},curriculumReviewAnswer(i){const s=this.moduleSession;if(s&&!s.answered){s.answered=true;if(i===s.questions[s.idx].answer)s.score++}},curriculumReviewRender(){},state:{learning:{}},ensureLearning(){},save(){saves++},safeText:s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])),
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
complete(0);const initial=app.innerHTML,beforeSaves=saves;assert(initial.includes('1.1 · Umlauts and ß'));
ids['dl-umlaut-review-mistakes'].onclick();assert(app.innerHTML.includes('1.1 · Umlauts and ß · Mistake'));assert(app.innerHTML.includes('schon · schön'));assert(app.innerHTML.includes('Reason 0'));
ids['dl-umlaut-mistake-audio'].children[0].onclick();assert.deepEqual(route.at(-1),['audio','schon']);
for(let i=1;i<10;i++){dock().children[1].onclick();assert(app.innerHTML.includes('Reason '+i))}
dock().children[1].onclick();assert.equal(app.innerHTML,initial);assert.equal(saves,beforeSaves,'Mistake review never saves or scores');
dock().children[1].onclick();assert.deepEqual(route.at(-1),['retry',0]);
complete(8);dock().children[1].onclick();assert.deepEqual(route.at(-1),['pronunciation']);
c.STRUCTURED_PATH.A1[0].ids=[0,1];complete(8);dock().children[1].onclick();assert.deepEqual(route.at(-1),['lesson',1]);
dock().children[0].onclick();assert.deepEqual(route.at(-1),['lessons','A1']);
// Every curriculum lesson now uses shared results and its own total.
c.activeLessonScreen=null;c.fullSession={id:1,score:6,questions,results:Array(10).fill(true)};c.fullFinish();assert(ids['dl-umlaut-results']);assert(app.innerHTML.includes('60%'));assert.equal(c.state.learning.fullScores[1].passed,false);
console.log('PASS: all score boundaries, both character branches, native saves/mistakes, prior pass retention, read-only review/audio, retry/continue/back and other-lesson isolation');

for(const level of ['A1','A2','B1','B2']){
 c.FULL_UNITS[1].level=level;c.state.learning={};c.fullSession={id:1,score:4,questions:questions.slice(0,5),results:[true,true,true,true,false]};c.fullFinish();assert(app.innerHTML.includes('80%'));assert(c.state.learning.fullScores[1].passed);assert.equal(c.state.learning.fullScores[1].total,5);
}
const reviewSource=fs.readFileSync('js/extracted-batch3-3.js','utf8');
const nativeReview=reviewSource.slice(reviewSource.indexOf('function curriculumReviewRender(){'),reviewSource.indexOf('function curriculumReviewAnswer('));
// Execute real native review completion underneath the shared-results wrapper.
const resultsSource=fs.readFileSync('js/umlaut-results.js','utf8');
const c2={...c,window:{...c.window},state:{learning:{}},fullFinish(){},curriculumReviewAnswer(i){const s=c2.moduleSession;if(s&&!s.answered){s.answered=true;if(i===s.questions[s.idx].answer)s.score++}},curriculumReview(){},moduleSession:null};
vm.createContext(c2);vm.runInContext(nativeReview,c2);vm.runInContext(fs.readFileSync('js/extracted-batch5-1.js','utf8'),c2);vm.runInContext(resultsSource,c2);
for(const level of ['A1','A2','B1','B2']){
 c2.STRUCTURED_PATH[level]=[{title:'Test module',ids:[0]}];
 const s=c2.moduleSession={level,n:0,idx:0,score:0,questions:questions.slice(0,5)};
 c2.curriculumReviewAnswer(1);assert.equal(s.dlResultMissed.length,1);assert.equal(s.dlResultMissed[0].question.why,'Reason 0');
 s.idx=5;s.score=4;c2.curriculumReviewRender();
 assert(app.innerHTML.includes('1 · Test module · Review'));assert.equal(c2.moduleSession,null);assert(c2.state.learning.moduleReviews[level+'-0'].passed);assert(ids['dl-umlaut-results']);assert(app.innerHTML.includes('80%'));assert(ids['dl-umlaut-review-mistakes']);
}
c2.window.dlShowPracticeCompletion({title:'German pronunciation',count:'15 sounds practiced',continueAction(){}});
assert(app.innerHTML.includes('1.3 · German pronunciation'));assert(app.innerHTML.includes('15 sounds practiced'));assert(!app.innerHTML.includes('%'));assert(!app.innerHTML.includes('Every answer correct'));
console.log('PASS: global lessons with variable totals, native module saving across four levels, missed-question capture and unscored practice completion');

const enhanced=c2.moduleSession={level:'A1',n:0,idx:6,score:5,questions:[...questions.slice(0,5),{dlStretch:true}],dlReviewEnhanced:true,dlCoreCount:5,dlCoreScore:4,dlMissed:[]};
c2.curriculumReviewRender();assert(app.innerHTML.includes('80%'));assert.equal(c2.state.learning.moduleReviews['A1-0'].total,5);assert.equal(c2.state.learning.moduleReviews['A1-0'].best,4);
console.log('PASS: enhanced reviews retain native core scoring and exclude optional challenge from percentage');
