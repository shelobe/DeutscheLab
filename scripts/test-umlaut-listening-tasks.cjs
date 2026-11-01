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
 blur(){}
 setRangeText(s,start=0,end=0){this.value=this.value.slice(0,start)+s+this.value.slice(end);this.selectionStart=this.selectionEnd=start+s.length}
}
const app=new Element('main'),head=new Element('head'),body=new Element('body');let check,submissions=[],played=[];
const c={app,document:{head,createElement:t=>new Element(t),getElementById:id=>id==='dl-check'?check:null},window:{dlRefreshFixedNext(){}},fullSession:null,dlAnswered:false,dlSelected:null,speak:t=>played.push(t),fullRender(){app.children=[];const card=new Element('section');card.className='dl-flow-card';app.append(card);const label=new Element('div');label.className='dl-flow-label';const options=new Element('div');options.className='dl-flow-options';check=new Element('button');check.id='dl-check';card.append(label,options,check);},dlCheck(){submissions.push(c.dlSelected);c.dlAnswered=true;app.querySelectorAll('.dl-practical-input').forEach(e=>e.remove());}};
vm.createContext(c);vm.runInContext(fs.readFileSync('js/spelling-activities.js','utf8'),c);vm.runInContext(fs.readFileSync('js/umlaut-listening-tasks.js','utf8'),c);
function open(q){c.dlAnswered=false;played=[];c.fullSession={idx:0,questions:[q]};c.fullRender();}
const button=text=>app.querySelectorAll('button').find(b=>b.textContent===text);
open({dlLessonMode:'compare',clips:['schon','schön'],options:['Same word','Different words'],answer:1});assert(check.disabled);assert(button('Different words').disabled);button('Listen A').click();assert(button('Different words').disabled);button('Listen B').click();button('Different words').click();assert(!check.disabled);check.onclick();assert.equal(submissions.at(-1),1);assert.equal(app.querySelector('.dl-practical-input'),null);
open({dlLessonMode:'compare',clips:['schon','schon'],options:['Same word','Different words'],answer:0});button('Listen A').click();button('Listen B').click();button('Different words').click();check.onclick();assert.equal(submissions.at(-1),1);
open({dlLessonMode:'match',words:['schon','schön'],options:['Correct match','Try again'],answer:0});for(const label of ['Listen A','Listen B']){button(label).click();const word=played.at(-1);button(word).click();}assert(!check.disabled);check.onclick();assert.equal(submissions.at(-1),0);assert.equal(app.querySelector('.dl-practical-input'),null);
open({dlLessonMode:'match',words:['schon','schön'],options:['Correct match','Try again'],answer:0});const stale=button('Listen A');c.fullSession.idx=1;stale.click();assert.equal(played.length,0);
console.log('PASS: listening guards, correct/incorrect comparison, shuffled matching, native check delegation, cleanup and stale-control isolation');

open({dlLessonMode:'tiles',spellingWord:'Straße',options:['Straße','Try again'],answer:0});
for(const ch of 'Straße')app.querySelectorAll('button').find(b=>b.textContent===ch&&!b.disabled).click();
button('Undo').click();assert(check.disabled);button('e').click();check.onclick();assert.equal(submissions.at(-1),0);
open({dlLessonMode:'tiles',spellingWord:'heißen',options:['heißen','Try again'],answer:0});
for(const ch of 'heißen')app.querySelectorAll('button').find(b=>b.textContent===ch&&!b.disabled).click();check.onclick();assert.equal(submissions.at(-1),0);
open({dlLessonMode:'gap',spellingWord:'schön',spellingBefore:'sch',spellingAfter:'n',spellingAnswer:'ö',options:['schön','Try again'],answer:0});
const gap=app.querySelector('input');assert.equal(gap.placeholder,undefined);gap.value='o';gap.oninput();check.onclick();assert.equal(submissions.at(-1),1);
open({dlLessonMode:'gap',spellingWord:'schön',spellingBefore:'sch',spellingAfter:'n',spellingAnswer:'ö',options:['schön','Try again'],answer:0});
button('ö').click();check.onclick();assert.equal(submissions.at(-1),0);assert.equal(app.querySelector('.dl-practical-input'),null);
console.log('PASS: tiles, repeated letters, Undo, strict inline umlaut scoring, native submission and cleanup');

const dataContext={FULL_UNITS:[{title:'Umlauts and ß'}],fullSession:{},fullBegin(){},fullRender(){}};
vm.createContext(dataContext);vm.runInContext(fs.readFileSync('js/extracted-batch6-14.js','utf8'),dataContext);dataContext.fullBegin(0);
const bank=dataContext.fullSession.questions;assert.equal(bank.length,10);assert.equal(bank.filter(q=>q.dlLessonMode==='tiles').length,2);assert.equal(bank.filter(q=>q.dlLessonMode==='gap').length,1);assert(bank.some(q=>q.dlWriteAnswer==='fünf'));assert(bank.some(q=>q.dlWriteAnswer==='heißen'));
const previewSource=fs.readFileSync('js/spelling-preview.js','utf8');const back=previewSource.match(/btn\('Back',(\(\)=>\{.*?\}),foot\);/)[1];
let allowed=false,closed=0,lessons=0,warnings=0;
const backContext={window:{confirm(message){warnings++;assert(message.includes('lost'));return allowed}},close(){closed++},lessonMenu(){lessons++}};vm.createContext(backContext);const goBack=vm.runInContext(back,backContext);
goBack();assert.equal(closed,0);assert.equal(lessons,0);allowed=true;goBack();assert.equal(closed,1);assert.equal(lessons,1);assert.equal(warnings,2);
console.log('PASS: ten-question pilot bank and Back warning cancellation/confirmed Lessons destination');

open({dlLessonMode:'match',words:['Käse','fünf','Mädchen'],options:['Correct','Wrong'],answer:0});
const labels=['Listen A','Listen B','Listen C'];
labels.forEach(label=>{button(label).click();button(played.at(-1)).click();assert(button(label),'Audio label must stay unchanged')});
const links=app.querySelector('.dl-umlaut-match-lines');assert.equal((links.innerHTML.match(/<path /g)||[]).length,3);
button('Listen A').click();const firstWord=played.at(-1);button('Listen B').click();button(firstWord).click();
assert(check.disabled,'Reassigning a used word leaves its previous recording unmatched');assert.equal((links.innerHTML.match(/<path /g)||[]).length,2);
assert(button('Listen B').attributes['aria-label'].includes(firstWord));
console.log('PASS: stable audio labels, SVG connectors, accessible pairing and reassignment');
