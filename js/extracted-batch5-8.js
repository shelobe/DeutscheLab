
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
  "How many basic letters does German share with English?",
  [
   "26",
   "24",
   "30"
  ],
  "German uses the same 26 basic letters as English, with ä, ö, ü and ß added."
 ],
 [
  0,
  "Listen to the first sound. Which German letter makes it?",
  [
   "J",
   "W",
   "V"
  ],
  "German J sounds like English Y, as in Januar.",
  "Januar"
 ],
 [
  0,
  "Listen to this word. Which letter makes its first sound?",
  [
   "W",
   "V",
   "J"
  ],
  "Wasser starts with W, pronounced like English V.",
  "Wasser"
 ],
 [
  0,
  "How is V usually pronounced in Vater?",
  [
   "Like English F",
   "Like English W",
   "Like English Y"
  ],
  "In common words such as Vater, V sounds like English F."
 ],
 [
  0,
  "Which pair begins with the same sound?",
  [
   "Wasser and Winter",
   "Vater and Januar",
   "Januar and Wasser"
  ],
  "Both Wasser and Winter start with German W, pronounced like English V."
 ],
 [
  1,
  "Which set contains all three German umlaut vowels?",
  [
   "ä, ö, ü",
   "a, o, u",
   "ei, ie, eu"
  ],
  "The umlaut vowels are ä, ö and ü. They are distinct vowels."
 ],
 [
  1,
  "Listen to the first vowel. Which German letter makes this sound?",
  [
   "ä",
   "a",
   "ö"
  ],
  "Mädchen contains ä, a distinct German vowel that can sound similar to e in bed.",
  "Mädchen"
 ],
 [
  1,
  "What changes between schon and schön?",
  [
   "Both pronunciation and meaning",
   "Only capitalization",
   "Nothing"
  ],
  "Schon means already; schön means beautiful. The umlaut changes the vowel and meaning."
 ],
 [
  1,
  "What is the letter ß called?",
  [
   "Eszett",
   "Umlaut",
   "Be"
  ],
  "ß is called Eszett or scharfes S. It is not the letter B."
 ],
 [
  1,
  "What sound does ß represent in Straße?",
  [
   "A voiceless s sound",
   "A b sound",
   "An English z sound"
  ],
  "ß represents a voiceless s sound, as in Straße."
 ],
 [
  1,
  "Which spelling pattern is usual in German?",
  [
   "ß after a long vowel or diphthong; ss after a short vowel",
   "ß after a short vowel; ss after a long vowel",
   "ß and ss can always be swapped"
  ],
  "Compare Straße with its long vowel and Wasser with its short vowel. ß and ss are not freely interchangeable."
 ],
 [
  2,
  "How is z pronounced in zwei?",
  [
   "As a single ts sound",
   "Like English z",
   "Like sh"
  ],
  "German z combines t and s into one /ts/ sound."
 ],
 [
  2,
  "How is sch pronounced in Schule?",
  [
   "Like English sh",
   "Like sk",
   "Like ch in chair"
  ],
  "The three letters sch represent one sh sound."
 ],
 [
  2,
  "At the beginning of sprechen, how is sp pronounced?",
  [
   "shp",
   "sp as in English spin",
   "ts"
  ],
  "At the start of a word or stressed syllable, sp usually begins with sh followed by p."
 ],
 [
  2,
  "At the beginning of stehen, how is st pronounced?",
  [
   "sht",
   "st as in English stop",
   "ts"
  ],
  "Initial st usually begins with sh followed by t."
 ],
 [
  2,
  "Which description fits the soft ch in ich?",
  [
   "Friction with the middle of the tongue raised toward the roof of the mouth",
   "English sh",
   "A hard k sound"
  ],
  "The soft ch /ç/ after i is not English sh. Raise the middle of the tongue toward the roof of the mouth."
 ],
 [
  2,
  "How does ch in Buch differ from ch in ich?",
  [
   "It is made farther back in the mouth",
   "It is silent",
   "It is English sh"
  ],
  "After a, o or u, ch is usually the back friction sound /x/."
 ],
 [
  2,
  "Which sound does EI make in mein and Wein?",
  [
   "“Eye,” like the English letter I",
   "“Ee,” like the English letter E",
   "“Oy,” as in boy"
  ],
  "eI → eye: the second letter suggests its English letter name, I."
 ],
 [
  2,
  "Which sound does IE usually make in Liebe and Biene?",
  [
   "Long “ee,” like the English letter E",
   "“Eye,” like the English letter I",
   "“Ow,” as in cow"
  ],
  "iE → ee: the second letter suggests its English letter name, E. IE usually represents a long vowel."
 ],
 [
  2,
  "How does eu sound in neun and heute?",
  [
   "Similar to oy in boy",
   "Like eye",
   "Like long ee"
  ],
  "Eu makes the /ɔʏ/ diphthong; äu often makes the same sound."
 ],
 [
  2,
  "How does au sound in Haus?",
  [
   "Similar to ow in cow",
   "Like long ee",
   "Like oy in boy"
  ],
  "Au glides roughly like English ow in cow."
 ],
 [
  2,
  "Which English sound matches w in wir?",
  [
   "V",
   "W",
   "F"
  ],
  "German W sounds like English V; touch upper teeth lightly to the lower lip."
 ],
 [
  2,
  "Which statement about German v is accurate?",
  [
   "It often sounds like f, but some borrowed words use v",
   "It always sounds like English w",
   "It is always silent"
  ],
  "V often sounds like f in common German words such as Vater and vier; borrowed words can differ."
 ],
 [
  2,
  "In heißen, what sound does ß represent?",
  [
   "A voiceless s sound",
   "A b sound",
   "A sh sound"
  ],
  "ß sounds like a voiceless s, including after the diphthong ei in heißen."
 ],
 [
  2,
  "Listen to this vowel. Which German letter produces it?",
  [
   "ü",
   "u",
   "ö"
  ],
  "Fünf contains ü. Practice it by saying ee while rounding the lips as for oo.",
  "fünf"
 ],
 [
  2,
  "Listen to the vowel. Which German letter produces this sound?",
  [
   "ö",
   "o",
   "ü"
  ],
  "Schön contains ö: start with an eh-like front vowel and round your lips.",
  "schön"
 ]
];
  return shuffle(rows.map(([section,prompt,options,why,audio])=>{
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
