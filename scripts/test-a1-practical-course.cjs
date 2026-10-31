/* Execute actual script order with inert DOM/storage doubles; no browser/network. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'..'),base=process.env.DL_TEST_BASE||repo;
const changed=/a1-verb-sequence|a1-practical-|lesson-consistency|extracted-batch7-7\.js|module-one-review/;
const dummy=new Proxy(function(){return dummy},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:k==='then'?undefined:k==='length'?0:k==='querySelectorAll'?()=>[]:k==='querySelector'?s=>s==='.menu-heading'?dummy:null:k==='getItem'?()=>null:k==='style'?{}:k==='classList'?{add(){},remove(){},toggle(){},contains(){return false}}:dummy,set(){return true}});
const document={querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>dummy,createElement:()=>dummy,createDocumentFragment:()=>dummy,head:dummy,body:dummy,documentElement:dummy,addEventListener(){}};
const c={console:{log(){},warn(){},error(){}},document,localStorage:dummy,sessionStorage:dummy,navigator:{},location:{pathname:'/',hash:'',search:''},history:dummy,screen:dummy,performance:{now:()=>0},setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},MutationObserver:class{observe(){}disconnect(){}},ResizeObserver:class{observe(){}},Audio:class{},Image:class{},URL,URLSearchParams,fetch:()=>Promise.reject(Error('Unexpected network request')),addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}}),getComputedStyle:()=>({}),speechSynthesis:dummy,SpeechSynthesisUtterance:class{},confirm:()=>false,alert(){}};c.window=c;vm.createContext(c);
const run=code=>vm.runInContext(code,c,{timeout:2000});const plain=value=>JSON.parse(JSON.stringify(value));let before;
for(const m of fs.readFileSync(path.join(repo,'index.html'),'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
 const src=m[1].match(/src="([^"?]+)/)?.[1];let code=src?fs.readFileSync(path.join(changed.test(src)?repo:base,src),'utf8'):m[2];if(!code.trim())continue;
 if(src?.includes('a1-practical-course')){
  before=plain(run('({groups:STRUCTURED_PATH,units:FULL_UNITS.map(u=>({title:u.title,level:u.level})),scores:state.learning?.fullScores||{}})'));
  run('ensureLearning();state.learning.fullScores??={};state.learning.fullScores[85]={passed:true,best:6};state.learning.moduleReviews={"A1-0":{passed:true,best:15,total:15},"A1-1":{passed:true,best:18,total:18},"A2-0":{passed:true,best:5,total:5}}');
 }
 assert.doesNotThrow(()=>vm.runInContext(code,c,{filename:src||'inline',timeout:2000}),src||'inline script');
}
const data=plain(run('({groups:STRUCTURED_PATH,units:FULL_UNITS,packs:DL_LESSON_ENRICHMENT,progress:state.learning})'));
assert.equal(data.groups.A1.length,22);const ids=data.groups.A1.flatMap(g=>g.ids);assert.equal(ids.length,101);assert.equal(new Set(ids).size,ids.length);assert.ok(data.groups.A1.every(g=>g.ids.length&&g.key&&g.goal));
for(const id of before.groups.A1.flatMap(g=>g.ids))assert.ok(ids.includes(id),'Lost old lesson '+id);
for(const [i,u]of before.units.entries()){assert.equal(data.units[i].title,u.title);assert.equal(data.units[i].level,u.level)}
assert.deepEqual(data.groups.A2,before.groups.A2);assert.deepEqual(data.groups.B1,before.groups.B1);
assert.equal(data.progress.fullScores[85].passed,true);assert.equal(data.progress.a1LegacyReviews['a1-practical-2026-01']['A1-1'].passed,true);assert.equal(data.progress.moduleReviews['A2-0'].passed,true);
assert.equal(data.progress.moduleReviews['A1-0'].passed,true);assert.equal(data.progress.moduleReviews['A1-1'],undefined,'A pronoun pass must not become an introductions pass');assert.ok(data.progress.a1Practical.access.includes('pronouns'));
run('curriculumReviewRender=function(){};state.learning.moduleReviews=Object.fromEntries(STRUCTURED_PATH.A1.map((g,i)=>["A1-"+i,{passed:true}]))');
let questionCount=0;
for(const id of ids){
 const qs=plain(run('fullQuestions(FULL_UNITS['+id+'])'));assert.ok(qs.length,'No questions for '+id);questionCount+=qs.length;
 const p=data.packs['A1|'+data.units[id].title];assert.ok(p?.sections?.length,'No guide for '+id);
 for(const q of qs){assert.ok(q.prompt&&q.why);assert.ok(q.options[q.answer]);assert.equal(new Set(q.options).size,q.options.length);if(q.dlWriteAnswer)assert.equal(q.options[q.answer],q.dlWriteAnswer)}
}
for(let trial=0;trial<40;trial++)for(const [n,g]of data.groups.A1.entries()){
 run('moduleSession=null;curriculumReview("A1",'+n+')');const s=plain(run('moduleSession'));assert.ok(s&&s.questions.length,'Empty review '+n);
 const unique=new Set(s.questions.map(q=>q.prompt));if(n!==0)assert.equal(unique.size,s.questions.length);
 if(g.key==='review'){
  assert.equal(s.questions.length,21);for(const topic of data.groups.A1.slice(0,-1))assert.ok(s.questions.some(q=>topic.ids.includes(q.unitId)),'Final missed topic '+topic.key);
 }else if(n!==0){
  assert.ok(s.questions.length<=15);for(const id of g.ids)assert.ok(s.questions.some(q=>q.unitId===id),'Review misses '+id);
  assert.ok(s.questions.every(q=>g.ids.includes(q.unitId)),'Review imports an untaught lesson');
 }
 for(const q of s.questions){assert.ok(q.options[q.answer]);if(q.dlWriteAnswer)assert.equal(q.dlReviewMode,'write')}
}
// Migration is idempotent and works again if a later cloud load brings old progress.
run('state.learning.moduleReviews={};state.learning.fullScores={85:{passed:true,best:6}};delete state.learning.a1Practical;curriculumView("A1")');
assert.equal(run('state.learning.fullScores[85].best'),6);assert.equal(run('state.learning.moduleReviews["A1-1"]?.passed'),undefined);
const migrated=JSON.stringify(plain(run('state.learning.a1Practical')));run('curriculumView("A1")');assert.equal(JSON.stringify(plain(run('state.learning.a1Practical'))),migrated);
console.log('PASS: actual load order; 22 nonempty modules/101 unique lessons; '+questionCount+' lesson tasks; 880 review runs; full per-module/final-topic coverage; stable IDs, archived passes, retained lesson results/access; A2/B1 isolation; idempotent migration');
