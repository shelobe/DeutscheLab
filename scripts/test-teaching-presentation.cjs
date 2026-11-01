/* DOM-only regression checks: no browser, network, storage or microphone. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Element{
 constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.parentElement=null;this.className='';this._text='';this.style={};this.hidden=false;this.classList={contains:c=>this.className.split(/\s+/).includes(c),add:(...cs)=>{this.className=[...new Set([...this.className.split(/\s+/).filter(Boolean),...cs])].join(' ')},toggle:(c,force)=>{const on=force??!this.classList.contains(c);this.className=this.className.split(/\s+/).filter(x=>x&&x!==c).concat(on?[c]:[]).join(' ');return on;}};}
 get textContent(){return this._text+this.children.map(n=>n.textContent).join(' ')}
 set textContent(s){this._text=String(s);for(const n of this.children)n.parentElement=null;this.children=[];}
 get previousElementSibling(){return this.parentElement?.children[this.parentElement.children.indexOf(this)-1]||null}
 get nextElementSibling(){return this.parentElement?.children[this.parentElement.children.indexOf(this)+1]||null}
 append(...nodes){for(const n of nodes){n.remove();n.parentElement=this;this.children.push(n)}}
 after(n){const p=this.parentElement,i=p.children.indexOf(this);n.remove();n.parentElement=p;p.children.splice(i+1,0,n)}
 remove(){if(this.parentElement){const p=this.parentElement;p.children=p.children.filter(n=>n!==this);this.parentElement=null}}
 matches(selector){return selector.split(',').some(s=>{const parts=s.trim().split(/\s+/),own=parts.pop(),tag=own.match(/^[\w-]+/)?.[0],id=own.match(/#([\w-]+)/)?.[1],classes=[...own.matchAll(/\.([\w-]+)/g)].map(m=>m[1]);if(tag&&this.tagName!==tag.toUpperCase()||id&&this.id!==id||classes.some(c=>!this.classList.contains(c)))return false;if(!parts.length)return true;for(let p=this.parentElement;p;p=p.parentElement)if(p.matches(parts.join(' ')))return true;return false})}
 closest(s){for(let n=this;n;n=n.parentElement)if(n.matches(s))return n;return null}
 querySelectorAll(s){return this.children.flatMap(n=>[...(n.matches(s)?[n]:[]),...n.querySelectorAll(s)])}
 querySelector(s){return this.querySelectorAll(s)[0]||null}
 setAttribute(k,v){this[k]=v}
 click(){this.onclick?.()}
}
const el=(tag,text='',cls='')=>{const n=new Element(tag);n.textContent=text;n.className=cls;return n};
const root=el('main'),head=el('head');let callback,heard=[],delegations=0;
const c={window:null,document:{getElementById:id=>id==='app'?root:null,createElement:t=>el(t),head},MutationObserver:class{constructor(cb){callback=cb}observe(){}},dlLessonIntro(){delegations++;return 'intro'},fullStudy(){delegations++;return 'study'}};c.window=c;vm.createContext(c);
vm.runInContext(fs.readFileSync('js/teaching-presentation.js','utf8'),c);
function clear(){for(const n of [...root.children])n.remove()}
function box(title,text,tag='h3'){const b=el('section');b.append(el(tag,title),el('p',text));return b}
function audio(word,meaning){const r=el('div','','vocab-row'),copy=el('div','','vocab-copy'),b=el('button','Listen');copy.append(el('strong',word),el('span',meaning));b.onclick=()=>heard.push(word);r.append(copy,b);return r}
for(const type of ['dl-lesson-guide','dl-pronoun-guide','dl-conversation-cards','dl-conversation-breakdown','dl-accusative-guide','dl-article-teaching']){
 clear();const guide=el('div','',type),remember=box('Remember','Key rule'),note=box('Coming up','Verbs later'),ordinary=box('How to use it','Usage'),examples=box('Examples','A separate sentence');guide.append(remember,note,examples,ordinary);root.append(guide);
 assert.equal(c.dlLessonIntro(), 'intro');assert(remember.classList.contains('dl-teaching-remember'),type);assert(note.classList.contains('dl-teaching-note'),type);assert(examples.classList.contains('dl-teaching-examples'));assert(!ordinary.classList.contains('dl-teaching-remember'),'Last card is not automatically highlighted');
}
clear();const order=el('div');order.id='dl-order-guide';const rule=box('Remember','Verb second');order.append(rule);root.append(order);callback();assert(rule.classList.contains('dl-teaching-remember'));
clear();const guide=el('div','','dl-lesson-guide'),teaching=box('A question','Wo wohnst du? — Where do you live?'),list=el('div','','dl-section-audio'),row=audio('Wo wohnst du?','Where do you live?'),extra=audio('Ich wohne hier.','I live here.'),start=el('button','Start practice','dl-flow-action');list.append(row,extra);guide.append(teaching,list);root.append(guide,start);const original=row.querySelector('button').onclick;
assert.equal(c.fullStudy(),'study');assert.equal(list.parentElement,teaching,'Playback is inside its explanation');assert(row.querySelector('.vocab-copy span').hidden,'Repeated English hidden');assert(!extra.querySelector('.vocab-copy span').hidden,'Unique translation retained');assert(row.classList.contains('dl-teaching-audio'));assert.equal(row.querySelector('button').onclick,original);row.querySelector('button').click();assert.equal(heard.at(-1),'Wo wohnst du?');
for(let i=0;i<5;i++)callback();assert.equal(root.querySelectorAll('.vocab-row').length,2);assert.equal(start.parentElement,root,'Navigation stays in place');
clear();const tip=box('Remember:','Only masculine changes','strong'),caseGuide=el('div','','dl-accusative-guide'),note=box('Note','Learn verb endings later');note.className='dl-pronoun-verb-note';caseGuide.append(tip);root.append(caseGuide,note);callback();assert(tip.classList.contains('dl-teaching-remember'));assert(note.classList.contains('dl-teaching-note'));
clear();const built=el('div','','lesson-note');built.append(el('strong','Your sentence:'),el('span','Hallo'));root.append(built);callback();assert(!built.classList.contains('dl-teaching-note'),'Sentence builder is not a Note card');
// Every authored guide gets semantic colors, irrespective of level or card order.
const packsContext={window:{}};vm.createContext(packsContext);for(const path of ['js/lesson-enrichment-data.js','js/a1-practical-data.js'])vm.runInContext(fs.readFileSync(path,'utf8'),packsContext);
let guides=0,reminders=0,notes=0;for(const pack of Object.values({...packsContext.window.DL_LESSON_ENRICHMENT,...packsContext.window.DL_A1_PRACTICAL_PACKS})){
 clear();const g=el('div','','dl-lesson-guide');for(const [title,body]of pack.sections||[])g.append(box(title,Array.isArray(body)?body.join('\n'):body));root.append(g);callback();guides++;for(const b of g.children){const title=b.querySelector('h3').textContent;if(/^(Remember|Keep in mind)\b/i.test(title)){assert(b.classList.contains('dl-teaching-remember'));reminders++}if(/^(Note|A note|Coming up|Looking ahead)\b/i.test(title)){assert(b.classList.contains('dl-teaching-note'));notes++}}
}
assert(guides>100);assert(reminders>20);assert(notes>0);assert(delegations>0);
const css=fs.readFileSync('css/teaching-presentation.css','utf8');assert(css.includes('[hidden]{display:none!important}'));assert(css.includes(':focus-visible'));
console.log(`PASS: ${guides} authored guides, ${reminders} Remember cards, ${notes} Note/forward-reference cards; custom guides, in-card audio, translation deduplication, playback identity, repeat rendering and navigation preservation.`);

{
 clear();
 const flow=el('section','','dl-flow-card'),g=el('div','','dl-lesson-guide'),s=box('Words','Meanings'),ul=el('ul'),li=el('li'),word=audio('wir','we'),phrase=audio('Wir lernen Deutsch.','We are learning German.');
 li.append(el('strong','wir — we'),word);ul.append(li);s.append(ul,phrase);g.append(s);flow.append(g);root.append(flow);
 const handler=phrase.querySelector('button').onclick;
 callback();
 assert.equal(word.parentElement,li,'Single word remains directly under its teaching item');
 assert.equal(phrase.closest('.dl-lesson-guide'),null,'Sentence audio leaves information box');
 assert(phrase.closest('.dl-separated-audio-examples'));
 assert(!phrase.querySelector('.vocab-copy span').hidden);
 assert.equal(phrase.querySelector('button').onclick,handler);
 for(let i=0;i<5;i++)callback();
 assert.equal(flow.querySelectorAll('.dl-separated-audio-examples').length,1);
 assert.equal(flow.querySelectorAll('.vocab-row').length,2);
 phrase.querySelector('button').click();assert.equal(heard.at(-1),'Wir lernen Deutsch.');
 let auditedRows=0;
 const isWord=s=>(s.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)||[]).length===1;
 for(const pack of Object.values({...packsContext.window.DL_LESSON_ENRICHMENT,...packsContext.window.DL_A1_PRACTICAL_PACKS})){
  clear();const card=el('section','','dl-flow-card'),g=el('div','','dl-lesson-guide'),section=box('Words and explanations','Teaching'),ul=el('ul');section.append(ul);g.append(section);card.append(g);root.append(card);
  const rows=[];
  for(const [de,en]of pack.examples||[]){const li=el('li'),r=audio(de,en);li.append(el('strong',de+' — '+en),r);ul.append(li);rows.push([de,r,li]);}
  callback();callback();
  for(const [de,r,li]of rows){if(isWord(de)){assert.equal(r.parentElement,li,de+' should stay under its word');assert.equal(r.closest('.dl-lesson-guide'),g)}else{assert.equal(r.closest('.dl-lesson-guide'),null,de+' must be outside the box');assert(r.closest('.dl-separated-audio-examples'))}auditedRows++;}
  assert.equal(card.querySelectorAll('.vocab-row').length,rows.length,'No rows lost or duplicated');
 }
 assert(auditedRows>200);
 console.log('PASS: single words inside matching items; phrases/sentences outside; '+auditedRows+' authored examples classified; repeat rendering and playback preserved.');
}

{
 Object.defineProperty(Element.prototype,'childNodes',{get(){return this._text?[{textContent:this._text},...this.children]:this.children}});
 Element.prototype.replaceWith=function(n){const p=this.parentElement,i=p.children.indexOf(this);n.remove();p.children[i]=n;n.parentElement=p;this.parentElement=null;};
 const packs={...packsContext.window.DL_LESSON_ENRICHMENT,...packsContext.window.DL_A1_PRACTICAL_PACKS};
 const units=Object.keys(packs).map(key=>({level:key.split('|')[0],title:key.split('|').slice(1).join('|'),dlPracticalCourse:true,rule:'Teaching',examples:packs[key].examples||[]}));
 let refresh;const d={window:null,FULL_UNITS:units,DL_LESSON_ENRICHMENT:packs,app:root,fullSession:null,fullQuestions(){return []},fullRender(){},dlCheck(){},dlLessonIntro(){},fullStudy(){},speak(){},document:{getElementById:id=>id==='app'?root:null,querySelector:s=>root.querySelector(s),createElement:t=>el(t),createTextNode:t=>el('#text',t),head},MutationObserver:class{constructor(cb){refresh=cb}observe(){}}};d.window=d;vm.createContext(d);
 for(const path of ['js/lesson-consistency.js','js/lesson-audio-layout.js','js/teaching-presentation.js'])vm.runInContext(fs.readFileSync(path,'utf8'),d);
 let total=0;
 for(let id=0;id<units.length;id++){
  clear();const card=el('section','','dl-flow-card');card.append(el('h2',"What you'll learn"),el('p','Teaching'));
  for(const [de,en]of units[id].examples)card.append(audio(de,en));
  root.append(card);d.fullStudy(id);refresh();
  const g=card.querySelector('.dl-lesson-guide'),rows=card.querySelectorAll('.vocab-row');
  for(const r of rows){const text=r.querySelector('.vocab-copy strong')?.textContent;if(!text)continue;const word=(text.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)||[]).length===1;
   if(word){assert.equal(r.closest('.dl-lesson-guide'),g,units[id].title+': word outside teaching box: '+text)}else assert.equal(r.closest('.dl-lesson-guide'),null,units[id].title+': phrase inside teaching box: '+text);
  }
  if(units[id].title==='Umlauts and ß'){
   assert.equal(rows.length,8);
   for(const r of rows){const word=r.querySelector('.vocab-copy strong').textContent;const item=r.closest('li');assert(item,'Umlaut word requires its own explanation bullet: '+word);assert(item.querySelector('strong').textContent.startsWith(word+' — '),'Audio must match the word above: '+word);assert.equal(item.querySelectorAll('.vocab-row').length,1);}
  }
  const count=rows.length;d.fullStudy(id);refresh();assert.equal(card.querySelectorAll('.vocab-row').length,count,'Repeat rendering duplicates '+units[id].title);total+=count;
 }
 console.log('PASS: real consistency/audio/presentation renderers across '+units.length+' authored guides; '+total+' rendered audio rows follow word/phrase placement without repeated-render duplicates.');
}

{
 clear();
 const g=el('div','','dl-lesson-guide'),s=box('Listen for the difference',''),ul=el('ul');
 for(const [teaching,word,meaning] of [
  ['J often sounds like English y: Januar (January), Jahr (year).','Januar','January — J sounds like English Y'],
  ['W sounds like English v: Wasser (water).','Wasser','water — W sounds like English V'],
  ['V often sounds like English f in familiar native words: Vater (father).','Vater','father — V often sounds like English F']
 ]){
  const li=el('li'),r=audio(word,meaning);li.append(el('span',teaching),r);ul.append(li);
 }
 const unique=audio('Hund','dog');const li=el('li');li.append(el('span','Hund has a final d sound.'),unique);ul.append(li);
 s.append(ul);g.append(s);root.append(g);callback();callback();
 for(const r of g.querySelectorAll('.vocab-row'))assert.equal(r.querySelector('.vocab-copy span').hidden,r!==unique,'Hide repeated sound explanations; retain unique translations');
 console.log('PASS: Januar/Wasser/Vater redundant audio captions hidden; unique meaning retained.');
}
