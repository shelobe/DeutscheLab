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
 assert.equal(bank.filter(q=>q.type==='grammar').length,7);
 assert.equal(bank.filter(q=>q.type==='sound-choice').length,0);
 assert.equal(bank.filter(q=>q.type==='speak-word').length,3);
 for(const q of bank){assert.ok(q.why);assert.ok(q.options[q.answer]);assert.equal(new Set(q.options).size,q.options.length);}
 const predictions=bank.filter(q=>q.dlPredictionWord);
 assert.deepEqual(predictions.map(q=>q.dlPredictionWord),['Jahr','Weg','vier']);
 for(const q of predictions){
  assert.ok(!q.dlReviewAudio&&!q.dlAudioWords,'No target playback before answering');
  assert.ok(q.options[q.answer].includes(q.dlPredictionLetter==='J'?'Y in yes':q.dlPredictionLetter==='W'?'V in van':'F in fish'));
  answerPositions.add(q.answer);
 }
 assert.deepEqual(bank.filter(q=>q.type==='speak-word').map(q=>q.dlSpeakWord),['Jacke','Winter','Vogel']);
 assert.equal(bank.filter(q=>q.prompt.includes('Jahr')).length,1,'Jahr stays unfamiliar until its prediction');
 assert.ok(bank.every(q=>!/[äöüß]/i.test(q.prompt)),'No umlauts in Lesson 1');
 assert.ok(!bank.some(q=>/letter.*count|how many letters|word meaning/i.test(q.prompt)));
}
assert.equal(answerPositions.size,3,'Prediction correct positions must vary');
const intro=plain(run('DL_LESSON_ENRICHMENT["A1|Alphabet and spelling"]'));
assert.deepEqual(intro.examples.map(x=>x[0]),['Jacke','Wasser','Vater']);
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
console.log('PASS: actual script order; 40 alphabet sessions with 4 existing applied checks, 3 new-word predictions and 3 retained speaking tasks; practice-only words; ten mixed umlaut tasks; answer-specific feedback; strict heißen dictation; stable lesson IDs.');

// Exercise the actual scoped prediction renderer and post-check audio handler.
class NodeDouble{
 constructor(tag){this.tag=tag;this.children=[];this.style={};this.textContent='';}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 querySelector(selector){return this.children.find(n=>n.className?.split(' ').includes(selector.slice(1)))||null;}
}
const heading=new NodeDouble('h2'),feedback=new NodeDouble('div'),played=[];
const p={FULL_UNITS:[{level:'A1',title:'Alphabet and spelling'}],fullSession:null,dlAnswered:false,dlSelected:null,
 document:{createElement:tag=>new NodeDouble(tag),createTextNode:text=>({textContent:text}),querySelector:s=>s==='.dl-flow-card h2'?heading:s==='#dl-result .dl-flow-feedback'?feedback:null,querySelectorAll:()=>[]},
 speak:word=>played.push(word),fullRender(){},fullStudy(){}
};
// Native globals are functions, so avoid relying on a method receiver in the double.
p.fullBegin=id=>{p.fullSession={id,idx:0,score:0,results:[]};};
p.dlCheck=()=>{if(p.dlAnswered||p.dlSelected===null)return;p.dlAnswered=true;if(p.dlSelected===p.fullSession.questions[p.fullSession.idx].answer)p.fullSession.score++;};
vm.createContext(p);vm.runInContext(fs.readFileSync(path.join(repo,'js/extracted-batch6-9.js'),'utf8'),p);
for(const correct of [true,false]){
 p.fullBegin(0);const index=p.fullSession.questions.findIndex(q=>q.dlPredictionWord==='Weg');p.fullSession.idx=index;
 const q=p.fullSession.questions[index];p.dlAnswered=false;p.dlSelected=null;feedback.replaceChildren();p.fullRender();
 assert.equal(heading.children[1].children[0].textContent,'W');
 assert.equal(heading.children[1].children[0].style.textDecoration,'underline');
 assert.equal(played.length,0);p.dlCheck();assert.equal(feedback.children.length,0,'No playback until an answer is checked');
 p.dlSelected=correct?q.answer:(q.answer+1)%q.options.length;p.dlCheck();p.dlCheck();
 assert.equal(feedback.children.length,1,'One playback control per checked answer');assert.equal(p.fullSession.score,correct?1:0);
 const playback=feedback.children[0];assert.equal(playback.textContent,'🔊 Hear Weg');playback.onclick();assert.equal(played.pop(),'Weg');
 p.fullSession.idx++;playback.onclick();assert.equal(played.length,0,'Stale feedback cannot play into the next question');
}
console.log('PASS: initial-letter emphasis; no pre-answer audio; post-answer playback for correct/incorrect choices; no duplicate scoring/buttons; stale playback isolation.');
