/* Foundation guides and real lesson input handlers, using a small DOM double. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
class Element{
 constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.style={};this.className='';this.textContent='';this.value='';this.disabled=false;this.classList={add:c=>this.className+=' '+c,contains:c=>this.className.split(' ').includes(c)}}
 append(...nodes){for(const n of nodes){n.parent=this;this.children.push(n)}}
 matches(s){return s.startsWith('.')?this.className.split(' ').includes(s.slice(1)):s.startsWith('#')?this.id===s.slice(1):this.tagName===s.toUpperCase()}
 querySelectorAll(s){return this.children.flatMap(n=>[...(s.split(',').some(x=>n.matches(x))?[n]:[]),...n.querySelectorAll(s)])}
 querySelector(s){return this.querySelectorAll(s)[0]||null}
 replaceWith(n){const list=this.parent.children;list[list.indexOf(this)]=n;n.parent=this.parent;this.parent=null}
 remove(){if(this.parent){this.parent.children=this.parent.children.filter(n=>n!==this);this.parent=null}}
 after(n){const list=this.parent.children;list.splice(list.indexOf(this)+1,0,n);n.parent=this.parent}
 get nextElementSibling(){const list=this.parent.children;return list[list.indexOf(this)+1]}
 setAttribute(k,v){this[k]=v}
 click(){if(!this.disabled)this.onclick?.()}
 focus(){}
 setRangeText(s,start=this.value.length,end=start){this.value=this.value.slice(0,start)+s+this.value.slice(end);this.selectionStart=this.selectionEnd=start+s.length}
}
let card,check,score=0,feedback;
const units=[{title:'Written test',level:'A1',rule:'',dlPracticalCourse:true}],played=[];
const q={type:'grammar',prompt:'Write the missing word: Du ___ Zeit.',options:['hast','habe','hat'],answer:0,why:'Du uses hast.',dlWriteAnswer:'hast'};
const intro=()=>{card=new Element('section');card.append(new Element('h2'),new Element('p'));const old=new Element('div');old.className='dl-pronoun-guide';card.append(old)};
const c={console,Math,window:{DL_LESSON_ENRICHMENT:{'A1|Written test':{sections:[['Forms',['ich habe','du hast']],['Remember','Use the subject.']],questions:[q]}}},FULL_UNITS:units,fullSession:null,dlAnswered:false,dlSelected:null,document:{head:new Element('head'),createElement:t=>new Element(t),getElementById:id=>id==='dl-check'?check:null,querySelector:()=>feedback},app:{querySelector:()=>card,querySelectorAll:s=>card.querySelectorAll(s)},fullQuestions:()=>[q],fullStudy:intro,dlLessonIntro:intro,speak:(...a)=>played.push(a),fullRender:()=>{card=new Element('section');const choices=new Element('div');choices.className='dl-flow-options';card.append(new Element('h2'),choices);check=new Element('button');check.onclick=()=>c.dlCheck();c.dlAnswered=false;c.dlSelected=null;feedback=new Element('div')},dlCheck:()=>{if(c.dlAnswered||c.dlSelected===null)return;c.dlAnswered=true;if(c.dlSelected===c.fullSession.questions[0].answer)score++}};
vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/lesson-consistency.js'),'utf8'),c);
c.dlLessonIntro(0);assert.equal(card.querySelectorAll('.dl-pronoun-guide').length,1);assert.equal(card.querySelector('ul').children.length,2);assert.ok(units[0].rule.includes('• du hast'));
function open(){c.fullSession={id:0,idx:0,questions:c.fullQuestions(units[0])};c.fullRender();return card.querySelector('input')}
let input=open();assert.equal(check.disabled,true);assert.equal(card.querySelector('.dl-flow-options'),null);assert.equal(input.autocomplete,'off');
input.value=' HAST ';input.oninput();assert.equal(check.disabled,false);check.click();check.click();assert.equal(score,1);assert.equal(card.querySelector('.dl-practical-input'),null);
input=open();input.value='habe';input.oninput();check.click();assert.equal(score,1);assert.equal(c.dlAnswered,true);
input=open();input.value='a';input.selectionStart=0;input.selectionEnd=1;card.querySelectorAll('button').find(b=>b.textContent==='ä').click();assert.equal(input.value,'ä');
input.value='';input.oninput();assert.equal(check.disabled,true);assert.equal(c.dlSelected,null);
input=open();input.value='hast';input.oninput();input.onkeydown({key:'Enter',preventDefault(){}});assert.equal(score,2);
const old=input;open();old.value='wrong';old.oninput();assert.equal(c.dlSelected,null,'Detached inputs cannot change the new question');
c.fullSession.questions[0]={...c.fullSession.questions[0],dlWriteAnswer:undefined,dlReviewAudio:'drei'};c.fullRender();const audio=card.querySelector('.dl-practical-audio');assert.ok(audio);audio.children[0].click();audio.children[1].click();assert.deepEqual(played,[['drei'],['drei',.7]]);
console.log('PASS: semantic lists replace old guide; written lesson answers hide choices, guard blanks, normalize case, score once, support Enter/special letters and clean feedback; stale input isolation; normal/slow audio works');
// Real greeting teaching keeps phrase/translation bold and usage on its own line.
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/a1-practical-data.js'),'utf8'),c);
const greeting=c.window.DL_A1_PRACTICAL_PACKS['A1|Greetings and introductions'];
c.window.DL_LESSON_ENRICHMENT['A1|Greetings and introductions']=greeting;
units.push({level:'A1',title:'Greetings and introductions',dlPracticalCourse:true});
c.dlLessonIntro(1);
assert.equal(card.querySelectorAll('.dl-phrase-usage').length,5);
for(const note of card.querySelectorAll('.dl-phrase-usage')){assert.equal(note.style.display,'block');assert.equal(note.parent.children[0].tagName,'STRONG');assert.ok(note.textContent.startsWith('Use it'));}
assert.ok(!card.querySelectorAll('h3').some(h=>h.textContent==='Useful examples'));
console.log('PASS: actual greeting guide has five bold bilingual phrases with separate usage lines and no redundant Useful examples card.');

assert.ok(!greeting.sections.some(([,body])=>Array.isArray(body)&&body.some(line=>line.includes("… ."))),"Phrase placeholders have no stray period after the ellipsis");
