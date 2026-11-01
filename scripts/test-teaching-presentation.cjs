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
