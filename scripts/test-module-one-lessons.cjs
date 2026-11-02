/* Execute actual script order with inert DOM/storage doubles; no browser/network. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'..');
const dummy=new Proxy(function(){return dummy},{get:(t,k)=>k===Symbol.toPrimitive?()=>0:k==='then'?undefined:k==='length'?0:k==='querySelectorAll'?()=>[]:k==='querySelector'?s=>s==='.menu-heading'?dummy:null:k==='getItem'?()=>null:k==='style'?{}:k==='classList'?{add(){},remove(){},toggle(){},contains(){return false}}:dummy,set(){return true}});
const document={querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>dummy,createElement:()=>dummy,createDocumentFragment:()=>dummy,head:dummy,body:dummy,documentElement:dummy,addEventListener(){}};
const c={console:{log(){},warn(){},error(){}},document,localStorage:dummy,sessionStorage:dummy,navigator:{},location:{pathname:'/',hash:'',search:''},history:dummy,screen:dummy,performance:{now:()=>0},setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame:()=>0,cancelAnimationFrame(){},MutationObserver:class{observe(){}disconnect(){}},ResizeObserver:class{observe(){}},Audio:class{},Image:class{},URL,URLSearchParams,fetch:()=>Promise.reject(Error('Unexpected network request')),addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}}),getComputedStyle:()=>({}),speechSynthesis:dummy,SpeechSynthesisUtterance:class{},confirm:()=>false,alert(){}};c.window=c;vm.createContext(c);
const run=code=>vm.runInContext(code,c,{timeout:2000});const plain=value=>JSON.parse(JSON.stringify(value));
for(const m of fs.readFileSync(path.join(repo,'index.html'),'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
 const src=m[1].match(/src="([^"?]+)/)?.[1];let code=src?fs.readFileSync(path.join(repo,src),'utf8'):m[2];if(!code.trim())continue;
 assert.doesNotThrow(()=>vm.runInContext(code,c,{filename:src||'inline',timeout:2000}),src||'inline script');
}

// Exercise effective fullBegin wrappers after loading the actual index script order.
const moduleIds=plain(run('STRUCTURED_PATH.A1[0].ids'));
assert.deepEqual(moduleIds.map(id=>run('FULL_UNITS['+id+'].title')),['Alphabet and spelling','Umlauts and ß']);
const beforeUnits=plain(run('FULL_UNITS.map(u=>({title:u.title,level:u.level}))'));
run('fullRender=function(){}');
const answerPositions=new Set();
for(let attempt=0;attempt<40;attempt++){
 run('fullBegin('+moduleIds[0]+')');
 const bank=plain(run('fullSession.questions'));
 assert.equal(bank.length,10);
 assert.equal(bank.filter(q=>q.type==='grammar').length,4);
 assert.equal(bank.filter(q=>q.type==='sound-choice').length,3);
 assert.equal(bank.filter(q=>q.type==='speak-word').length,3);
 for(const q of bank){assert.ok(q.why);assert.ok(q.options[q.answer]);assert.equal(new Set(q.options).size,q.options.length);}
 for(const q of bank.filter(q=>q.type==='sound-choice')){
  assert.equal(q.dlAudioWords[q.answer],q.dlTarget);
  assert.deepEqual([...q.dlAudioWords].sort(),['Jahr','Vogel','Winter']);
  assert.deepEqual(q.options,['Audio 1','Audio 2','Audio 3']);answerPositions.add(q.answer);
 }
 assert.deepEqual(bank.filter(q=>q.type==='speak-word').map(q=>q.dlSpeakWord),['Jahr','Winter','Vogel']);
 assert.ok(bank.every(q=>!/[äöüß]/i.test(q.prompt)),'No umlauts in Lesson 1');
 assert.ok(!bank.some(q=>/letter.*count|how many letters|word meaning/i.test(q.prompt)));
}
assert.equal(answerPositions.size,3,'Listening correct positions must vary');
const intro=plain(run('DL_LESSON_ENRICHMENT["A1|Alphabet and spelling"]'));
assert.deepEqual(intro.examples.map(x=>x[0]),['Januar','Wasser','Vater']);
assert.ok(!/Jahr|Winter|Vogel/.test(JSON.stringify(intro.sections)),'Transfer words are reserved for practice');
run('fullBegin('+moduleIds[1]+')');
const umlaut=plain(run('fullSession.questions'));
assert.equal(umlaut.length,10);
assert.equal(umlaut.filter(q=>q.dlLessonMode==='match').length,3);
assert.equal(umlaut.filter(q=>q.dlLessonMode==='tiles').length,2);
assert.equal(umlaut.filter(q=>q.dlLessonMode==='gap').length,1);
for(const q of umlaut.filter(q=>q.dlLessonMode==='match'))for(const word of q.words)assert.ok(q.why.toLocaleLowerCase('de-DE').includes(word.toLocaleLowerCase('de-DE')),'Feedback identifies '+word);
const recall=umlaut.find(q=>q.dlWriteAnswer==='heißen');
assert.equal(recall.dlReviewAudio,'heißen');assert.equal(recall.dlStrictSpelling,true);
assert.ok(!/to be called|heißen/.test(recall.prompt),'Do not reveal the dictated answer');
assert.ok(umlaut.find(q=>q.dlLessonMode==='gap').why.includes('schon'));
assert.deepEqual(plain(run('FULL_UNITS.map(u=>({title:u.title,level:u.level}))')),beforeUnits);
console.log('PASS: actual script order; 40 alphabet sessions with 4 applied checks, 3 shuffled audio choices and 3 retained speaking tasks; practice-only words; ten mixed umlaut tasks; answer-specific feedback; strict heißen dictation; stable lesson IDs.');
