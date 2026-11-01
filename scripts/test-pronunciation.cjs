const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let nodes={},html='',recognition;const played=[];
const node=()=>({textContent:'',disabled:false,hidden:true,isConnected:true});
const root={set innerHTML(s){html=s;nodes={}},get innerHTML(){return html},querySelector(s){return nodes[s]??=node()},querySelectorAll(){return [...html.matchAll(/data-dl-pron-word="([^"]+)"/g)].map(m=>({dataset:{dlPronWord:m[1]},set onclick(fn){played.push([m[1],fn])}}))}};
class Recognition{constructor(){recognition=this}start(){}stop(){}abort(){}}
const c={window:{SpeechRecognition:Recognition,scrollTo(){}},document:{head:{append(){}},createElement:()=>node(),getElementById:()=>root,querySelectorAll:()=>[],querySelector:s=>root.querySelector(s)},speak:w=>played.push(w),setTimeout:()=>1,clearTimeout(){},curriculumView(){},ensureLearning(){},state:{learning:{}},save(){}};
vm.createContext(c);vm.runInContext(fs.readFileSync('js/extracted-batch7-1.js','utf8'),c);c.dlPronunciationHome=c.window.dlPronunciationHome;c.dlPronunciationComplete=c.window.dlPronunciationComplete;
c.window.dlPronunciationIntro();assert.equal((html.match(/<li>/g)||[]).length,15);assert(!/How to practice|<h3>Remember|dl-tsch-listen/.test(html));assert(html.includes('vocab-row'));assert(!html.includes('Rounded vowels'));const drills=vm.runInNewContext(fs.readFileSync('js/extracted-batch7-1.js','utf8').match(/const drills=(\[[\s\S]*?\n \]);/)[1]);assert.equal(drills.length,15);assert(!drills.some(d=>d.sound==='ö'||d.sound==='ü'));assert.equal(played.length,15);played.find(x=>x[0]==='Tschüss')[1]();assert.equal(played.at(-1),'Tschüss');
const soundItems=html.split('<li>').slice(1).map(s=>s.split('</li>')[0]);
for(const drill of drills){
 const item=soundItems.find(text=>text.startsWith('<strong>'+drill.sound+'</strong>'));
 assert(item,'Missing sound item '+drill.sound);
 assert(item.includes('<strong>'+drill.word+'</strong>'),'Audio must be directly under '+drill.sound);
 assert(item.includes('data-dl-pron-word="'+drill.word+'"'),'Matching playback missing');
 assert.equal(item.split('class="vocab-row"').length-1,1,'Exactly one paired example per sound');
}
assert.equal(html.split('data-dl-pron-word="Straße"').length-1,2,'Both st and ß need their own matching example');
function open(){c.window.dlPronunciationHome(1);root.querySelector('#dl-sound-speak').onclick();return recognition}
let r=open();r.onerror({error:'no-speech'});assert.match(nodes['#dl-sound-status'].textContent,/No speech was detected/);assert.equal(nodes['#dl-sound-next'].disabled,true);
r=open();r.onspeechstart();r.onend();assert.match(nodes['#dl-sound-status'].textContent,/Speech was detected, but no words/);assert.equal(nodes['#dl-sound-next'].disabled,false);
r=open();r.onresult({results:[[{transcript:'Schule'}]]});assert.match(nodes['#dl-sound-status'].textContent,/did not match/);assert.equal(nodes['#dl-sound-next'].disabled,false);
r=open();r.onresult({results:[[{transcript:'Tschüss'}]]});assert.match(nodes['#dl-sound-status'].textContent,/Richtig/);
r=open();r.onspeechstart();r.onresult({results:[[{transcript:''}]]});assert.match(nodes['#dl-sound-status'].textContent,/Speech was detected/);
r=open();r.onnomatch();assert.match(nodes['#dl-sound-status'].textContent,/could not be checked/);
console.log('PASS: all 15 sounds, 15 individually paired word rows and Tschüss playback; silence, detected/unrecognized speech, mismatched transcript, correct result and no-match states.');
