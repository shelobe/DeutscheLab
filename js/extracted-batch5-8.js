
/* Reviews assess taught skills. Transfer questions reuse a taught grammar rule, never next-module vocabulary. */
(function(){
 const prior=curriculumReview;
 function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function isSoundGloss(x){return /\([^)]*(sounds? like|pronounced|letter|vowel|different from|compare|unlike)[^)]*\)/i.test(String(x));}
 function cleanAnswer(x){return String(x).replace(/\s*\([^)]*\)/g,'').trim();}
 function soundReview(id){
  const make=(prompt,options,correct,why,audio)=>{const opts=shuffle(options.slice());return {type:'grammar',unitId:id,prompt,options:opts,answer:opts.indexOf(correct),why,...(audio?{dlReviewAudio:audio}:{})};};
  return [
   make('Listen to the first sound. Which German letter makes it?',['J','W','V'],'J','Junge begins with J, pronounced like English Y.','Junge'),
   make('You encounter “Wolke” (cloud) for the first time. How is W pronounced?',['Like English V','Like English W','Like English F'],'Like English V','German W sounds like English V.'),
   make('Listen to the vowel sound. Which German letter produces it?',['ö','o','ü'],'ö','Schön uses ö, a rounded front vowel.','schön'),
   make('In the new word “Vogel” (bird), how is the initial V usually pronounced?',['Like English F','Like English V','Like English Y'],'Like English F','Vogel begins with an F sound.'),
   make('Listen to the vowel sound. Which German letter produces it?',['ü','u','ö'],'ü','Fünf contains the vowel ü.','fünf'),
   make('What changes when you write schon as schön?',['The pronunciation and meaning','Only the capitalization','Nothing; they are interchangeable'],'The pronunciation and meaning','Schon means already; schön means beautiful.'),
   make('Listen to the first vowel sound. Which German letter produces it?',['ä','a','ö'],'ä','Mädchen contains ä.','Mädchen'),
   make('You see the unfamiliar word “Fuß” (foot). What sound does ß represent?',['An s sound','A b sound','A z sound'],'An s sound','ß represents a voiceless s sound.'),
   make('Listen to the first sound. Which German letter makes it?',['W','V','J'],'W','Wasser begins with W, pronounced like English V.','Wasser'),
   make('Listen to the German word. Which vowel sound do you hear?',['ü','u','ö'],'ü','The word grün contains the German ü vowel.','grün')
  ];
 }
 curriculumReview=function(level,n){
  prior(level,n);
  const s=moduleSession,g=STRUCTURED_PATH[level]?.[n];
  if(!s||!g||level!=='A1')return;
  // A module review must never draw its bonus from the following module.
  s.questions=s.questions.filter(q=>!q.dlStretch);
  const clean=[];
  const seen=new Set();
  for(const id of g.ids){
   const u=FULL_UNITS[id];if(!u)continue;
   const qs=fullQuestions(u).filter(q=>Array.isArray(q.options)&&q.options.length>=2&&q.answer>=0&&q.answer<q.options.length&&q.type!=='listen'&&!q.options.some(isSoundGloss));
   for(const q of shuffle(qs)){
    const key=String(q.prompt).trim().toLowerCase();
    if(seen.has(key))continue;
    seen.add(key);
    const opts=q.options.map(cleanAnswer);
    if(opts.some(x=>!x)||new Set(opts.map(x=>x.toLowerCase())).size!==opts.length)continue;
    clean.push({...q,options:opts,unitId:id});
   }
  }
  // Generalization: apply the already-taught regular present-tense pattern to a new verb.
  const taughtRule=g.ids.some(id=>/regular (?:present|verb)|present.tense (?:verb|ending)|verb endings|conjugat(?:e|ion|ing)/i.test(FULL_UNITS[id]?.rule||''));
  if(taughtRule){
   const choices=shuffle([{subject:'du',form:'spielst',stem:'spiel',ending:'-st'}, {subject:'er',form:'spielt',stem:'spiel',ending:'-t'}, {subject:'ich',form:'spiele',stem:'spiel',ending:'-e'}]);
   const target=choices[0];
   const opts=shuffle(['spiele','spielst','spielt']);
   clean.push({type:'grammar',unitId:g.ids[0],prompt:`Apply the verb ending you learned: ${target.subject} ___ (spielen = to play)`,options:opts,answer:opts.indexOf(target.form),why:`Spielen means “to play.” The subject ${target.subject} takes the regular present-tense ending ${target.ending}, so spiel- becomes ${target.form}.`,dlTransfer:true});
  }
  if(clean.length){
   const isAlphabet=n===0&&/alphabet|spelling/i.test(g.title||'');
   const candidates=isAlphabet?soundReview(g.ids[0]):clean;
   // Interleave different exercise types instead of repeating one prompt pattern.
   const buckets=new Map();
   for(const q of shuffle(candidates)){
    const kind=q.type==='grammar'?'grammar':/what does|translate|mean\?/i.test(q.prompt)?'translation':/which|choose|select/i.test(q.prompt)?'recognition':'other';
    if(!buckets.has(kind))buckets.set(kind,[]);
    buckets.get(kind).push(q);
   }
   const mixed=[];
   while(mixed.length<10&&[...buckets.values()].some(a=>a.length)){
    for(const bucket of buckets.values())if(bucket.length&&mixed.length<10)mixed.push(bucket.shift());
   }
   s.questions=mixed;
   s.idx=0;s.score=0;s.answered=false;s.dlCoreScore=0;s.dlCoreCount=s.questions.length;s.dlMissed=[];
  }else{
   s.dlCoreCount=s.questions.length;
  }
  curriculumReviewRender();
 };
})();
