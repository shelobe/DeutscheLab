
/* Reviews assess taught skills. Transfer questions reuse a taught grammar rule, never next-module vocabulary. */
(function(){
 const prior=curriculumReview;
 function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function isSoundGloss(x){return /\([^)]*(sounds? like|pronounced|letter|vowel|different from|compare|unlike)[^)]*\)/i.test(String(x));}
 function cleanAnswer(x){return String(x).replace(/\s*\([^)]*\)/g,'').trim();}
 function soundReview(group){
  const alphabet=group.ids.find(id=>/alphabet|spelling/i.test(FULL_UNITS[id]?.title||''))??group.ids[0];
  const umlauts=group.ids.find(id=>/umlaut/i.test(FULL_UNITS[id]?.title||''))??alphabet;
  // Pronunciation is a separate drill route, not a FULL_UNITS lesson ID.
  const ids=[alphabet,umlauts,alphabet];
  const rows=[
 [
  0,
  "Listen and choose the word you hear (first word).",
  [
   "Jahr",
   "wir",
   "vier"
  ],
  "You heard Jahr (year). Its J sounds like English Y.",
  "Jahr"
 ],
 [
  0,
  "Listen and choose the word you hear (season).",
  [
   "Winter",
   "Vater",
   "Januar"
  ],
  "You heard Winter (winter). German W sounds like English V.",
  "Winter"
 ],
 [
  0,
  "Listen and choose the word you hear (family word).",
  [
   "Vater",
   "Wasser",
   "Jahr"
  ],
  "You heard Vater (father). Here V sounds like English F.",
  "Vater"
 ],
 [
  0,
  "Listen and choose the word you hear (month).",
  [
   "Januar",
   "Winter",
   "Vater"
  ],
  "You heard Januar (January). Its J sounds like English Y.",
  "Januar"
 ],
 [
  0,
  "Listen and choose the word you hear (everyday word).",
  [
   "Wasser",
   "Vater",
   "Jahr"
  ],
  "You heard Wasser (water). Its W sounds like English V.",
  "Wasser"
 ],
 [
  1,
  "Listen and choose the word you hear (ä).",
  [
   "Käse",
   "Kasse",
   "Kiste"
  ],
  "You heard Käse (cheese). The ä vowel is different from the short a in Kasse.",
  "Käse"
 ],
 [
  1,
  "Listen and choose the word you hear (ö).",
  [
   "schön",
   "schon",
   "Schule"
  ],
  "You heard schön (beautiful), not schon (already). The umlaut changes the sound and meaning.",
  "schön"
 ],
 [
  1,
  "Listen and choose the word you hear (ü).",
  [
   "fünf",
   "fand",
   "fein"
  ],
  "You heard fünf (five). Listen for the rounded ü vowel.",
  "fünf"
 ],
 [
  1,
  "You want to write “street.” Which spelling is correct?",
  [
   "Straße",
   "Strabe",
   "Strase"
  ],
  "Straße means street. ß represents an s sound, not a b sound."
 ],
 [
  1,
  "Someone describes a place as beautiful. Which word fits?",
  [
   "schön",
   "schon",
   "Schule"
  ],
  "Schön means beautiful. Schon means already; the umlaut matters."
 ],
 [
  1,
  "Listen and choose the word you hear (spelling with ß).",
  [
   "heißen",
   "heilen",
   "heizen"
  ],
  "You heard heißen (to be called). Its ß is a voiceless s sound.",
  "heißen"
 ],
 [
  2,
  "Listen and choose the word you hear (z).",
  [
   "zwei",
   "frei",
   "drei"
  ],
  "You heard zwei (two). Z makes a single ts sound.",
  "zwei"
 ],
 [
  2,
  "Listen and choose the word you hear (sch).",
  [
   "Schule",
   "Stuhl",
   "Schale"
  ],
  "You heard Schule (school). Sch makes a sh sound.",
  "Schule"
 ],
 [
  2,
  "Listen and choose the word you hear (sp).",
  [
   "sprechen",
   "brechen",
   "rechnen"
  ],
  "You heard sprechen (to speak). At the beginning, sp sounds like shp.",
  "sprechen"
 ],
 [
  2,
  "Listen and choose the word you hear (st).",
  [
   "stehen",
   "sehen",
   "gehen"
  ],
  "You heard stehen (to stand). At the beginning, st sounds like sht.",
  "stehen"
 ],
 [
  2,
  "Listen and choose the word you hear (soft ch).",
  [
   "ich",
   "ist",
   "ihr"
  ],
  "You heard ich (I). Its soft ch is different from sch.",
  "ich"
 ],
 [
  2,
  "Listen and choose the word you hear (back ch).",
  [
   "Buch",
   "Bus",
   "Bauch"
  ],
  "You heard Buch (book). Ch after u is made farther back in the mouth.",
  "Buch"
 ],
 [
  2,
  "Listen and choose the word you hear (EI versus IE).",
  [
   "Wein",
   "Wien",
   "Wahn"
  ],
  "You heard Wein (wine), not Wien (Vienna). EI sounds like eye: remember the English letter I.",
  "Wein"
 ],
 [
  2,
  "Listen and choose the word you hear (IE versus EI).",
  [
   "Liebe",
   "Leibe",
   "Löwe"
  ],
  "You heard Liebe (love). IE sounds like long ee: remember the English letter E.",
  "Liebe"
 ],
 [
  2,
  "Listen and choose the word you hear (eu).",
  [
   "neun",
   "nein",
   "nun"
  ],
  "You heard neun (nine), not nein (no). Eu has an oy-like sound.",
  "neun"
 ],
 [
  2,
  "Listen and choose the word you hear (au).",
  [
   "Haus",
   "Hase",
   "Hose"
  ],
  "You heard Haus (house). Au sounds roughly like ow in cow.",
  "Haus"
 ],
 [
  2,
  "Listen and choose the word you hear (w).",
  [
   "wir",
   "vier",
   "Bier"
  ],
  "You heard wir (we). German W sounds like English V.",
  "wir"
 ],
 [
  2,
  "Listen and choose the word you hear (v).",
  [
   "vier",
   "wir",
   "Tier"
  ],
  "You heard vier (four). Here V sounds like English F.",
  "vier"
 ],
 [
  2,
  "Listen and choose the word you hear (ß).",
  [
   "Straße",
   "Strafe",
   "Sprache"
  ],
  "You heard Straße (street). ß represents a voiceless s sound.",
  "Straße"
 ],
 [
  2,
  "Listen and choose the word you hear (rounded ü).",
  [
   "Tür",
   "Tier",
   "Tor"
  ],
  "You heard Tür (door). Ü is distinct from ie and o.",
  "Tür"
 ],
 [
  2,
  "Listen and choose the word you hear (rounded ö).",
  [
   "hören",
   "Herren",
   "Haare"
  ],
  "You heard hören (to hear). Keep the ö vowel distinct from e and u.",
  "hören"
 ]
];
  const alphabetRows=shuffle(rows.filter(row=>row[0]===0)).slice(0,3);
  const umlautRows=shuffle(rows.filter(row=>row[0]===1)).slice(0,4);
  const sounds=rows.filter(row=>row[0]===2);
  const required=sounds.filter(row=>row[4]==='Wein'||row[4]==='Liebe');
  const rotating=shuffle(sounds.filter(row=>!required.includes(row))).slice(0,6);
  const selected=[...alphabetRows,...umlautRows,...required,...rotating];
  return shuffle(selected.map(([section,prompt,options,why,audio])=>{
   const correct=options[0],choices=shuffle(options.slice());
   return {type:'grammar',unitId:ids[section],prompt,options:choices,answer:choices.indexOf(correct),why,...(audio?{dlReviewAudio:audio}:{}),dlReviewTopic:['Alphabet and spelling','Umlauts and ß','German pronunciation'][section]};
  }));
 }
 function personalPronounReview(group){
  const titles=['Personal pronouns: ich, du, and Sie','Everyday conversations: Understanding in context','Personal pronouns: he, she, it'];
  const ids=titles.map(title=>group.ids.find(id=>FULL_UNITS[id]?.title===title));
  if(ids.some(id=>id===undefined))return null;
  const banks=[
  [
    [
      "You are talking about yourself. Which pronoun means “I”?",
      [
        "ich",
        "du",
        "Sie"
      ],
      "Ich means I: use it to talk about yourself."
    ],
    [
      "You are speaking to one close friend. Which pronoun fits informal “you”?",
      [
        "du",
        "Sie",
        "ich"
      ],
      "Du is informal you for one person, including a friend or family member."
    ],
    [
      "You address a customer you do not know. Which sentence uses formal “you”?",
      [
        "Sie lernen Deutsch.",
        "Du lernst Deutsch.",
        "Ich lerne Deutsch."
      ],
      "Use capitalized Sie to address a customer politely."
    ],
    [
      "You politely address two customers together. Which pronoun can you use?",
      [
        "Sie",
        "du",
        "ich"
      ],
      "Formal Sie can address one person or several people."
    ],
    [
      "Which spelling means formal “you” in the middle of a sentence?",
      [
        "Sie",
        "sie",
        "ich"
      ],
      "Formal Sie always has a capital S. Lowercase sie means she or they."
    ],
    [
      "Someone says “Wir können uns duzen.” What are they suggesting?",
      [
        "Using informal du with each other",
        "Continuing to use formal Sie",
        "Talking only about yourself"
      ],
      "Wir können uns duzen means we can use du with each other."
    ]
  ],
  [
    [
      "Someone speaks too quickly. What do you say?",
      [
        "Sprechen Sie bitte langsam.",
        "Ich verstehe das Wort nicht.",
        "Können Sie mir helfen?"
      ],
      "Sprechen Sie bitte langsam means Please speak slowly."
    ],
    [
      "You did not catch what someone said. Ask them to repeat it.",
      [
        "Können Sie das bitte wiederholen?",
        "Ich verstehe die Frage nicht.",
        "Sprechen Sie bitte langsam."
      ],
      "Können Sie das bitte wiederholen? politely asks Could you please repeat that?"
    ],
    [
      "You need assistance from a stranger. Which request fits?",
      [
        "Können Sie mir helfen?",
        "Ich verstehe den Satz nicht.",
        "Sprechen Sie bitte langsam."
      ],
      "Können Sie mir helfen? means Can you help me? Sie makes the request formal."
    ],
    [
      "You understand the question except for one word. What do you say?",
      [
        "Ich verstehe das Wort nicht.",
        "Ich verstehe die Frage nicht.",
        "Ich verstehe den Satz nicht."
      ],
      "Das Wort means the word: Ich verstehe das Wort nicht means I do not understand the word."
    ],
    [
      "Which sentence means “I do not understand the question”?",
      [
        "Ich verstehe die Frage nicht.",
        "Ich verstehe den Satz nicht.",
        "Ich verstehe das Wort nicht."
      ],
      "Die Frage means the question; nicht makes the statement negative."
    ],
    [
      "In “Ich verstehe den Satz nicht,” what is not understood?",
      [
        "The sentence",
        "The question",
        "The word"
      ],
      "Der Satz means sentence. Den Satz is the direct-object form in this sentence."
    ]
  ],
  [
    [
      "Paul ist hier. ___ lernt Deutsch.",
      [
        "Er",
        "Sie",
        "Es"
      ],
      "Use er (he) when referring to Paul."
    ],
    [
      "Anna ist hier. ___ lernt Deutsch.",
      [
        "Sie",
        "Er",
        "Es"
      ],
      "Use sie (she) when referring to Anna. It is capitalized here because it begins the sentence."
    ],
    [
      "Das Kind spielt. ___ spielt.",
      [
        "Es",
        "Er",
        "Sie"
      ],
      "Das Kind is grammatically neuter, so es can replace it."
    ],
    [
      "Anna und Paul sind hier. Which sentence means “They are learning German”?",
      [
        "Sie lernen Deutsch.",
        "Sie lernt Deutsch.",
        "Er lernt Deutsch."
      ],
      "Plural sie means they and uses lernen."
    ],
    [
      "What does lowercase “sie” mean in “Heute lernt sie Deutsch”?",
      [
        "She",
        "They",
        "Formal you"
      ],
      "The singular verb lernt shows that sie means she. They and formal you use lernen."
    ],
    [
      "What does lowercase “sie” mean in “Heute lernen sie Deutsch”?",
      [
        "They",
        "She",
        "Formal you"
      ],
      "Lowercase sie with the plural verb lernen means they. Formal you would be capitalized Sie."
    ]
  ]
];
  return shuffle(banks.flatMap((bank,section)=>bank.map(([prompt,options,why])=>{
   const correct=options[0],choices=shuffle(options.slice());
   return {type:'grammar',unitId:ids[section],prompt,options:choices,answer:choices.indexOf(correct),why};
  })));
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
   const candidates=isAlphabet?soundReview(g):clean;
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
   // Cover every taught distinction in this three-lesson module.
   const pronouns=g.title==='I, you, we: personal pronouns'?personalPronounReview(g):null;
   s.questions=isAlphabet?candidates:(pronouns||mixed);
   s.idx=0;s.score=0;s.answered=false;s.dlCoreScore=0;s.dlCoreCount=s.questions.length;s.dlMissed=[];
  }else{
   s.dlCoreCount=s.questions.length;
  }
  curriculumReviewRender();
 };
 const previousReviewRender=curriculumReviewRender;
 curriculumReviewRender=function(){
  const result=previousReviewRender.apply(this,arguments);
  const q=moduleSession?.questions?.[moduleSession.idx];
  const label=document.querySelector('#app .card > p.muted');
  if(q?.dlReviewTopic&&label)label.textContent=q.dlReviewTopic;
  return result;
 };
})();
