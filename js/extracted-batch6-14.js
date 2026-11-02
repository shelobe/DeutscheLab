
(function(){
 const umlautUnit=FULL_UNITS.find(u=>u.title==='Umlauts and ß');
 if(umlautUnit){
  umlautUnit.rule='German has three umlaut vowels: ä, ö and ü. Ä can sound similar to the e in English “bed” (as in Mädchen, girl, or Käse, cheese). Ö is a rounded front vowel, as in schön (beautiful). Ü is another rounded front vowel, as in fünf (five). ß, called Eszett, represents a sharp s sound, as in Straße (street); it is not the letter B.';
  umlautUnit.examples=[
   ['Mädchen','girl — ä'],
   ['schön','beautiful — ö'],
   ['fünf','five — ü'],
   ['Straße','street — ß'],
   ['schon / schön','already / beautiful — different vowels']
  ];
 }
 const oldBegin=fullBegin;
 fullBegin=function(id){
  oldBegin.apply(this,arguments);
  const session=fullSession,unit=FULL_UNITS[id];
  if(!session||unit?.title!=='Umlauts and ß')return;
  // Ten sound/spelling tasks using taught words; meanings support feedback only.
  session.questions=[
  {
    "type": "grammar",
    "prompt": "Match each recording to its word.",
    "why": "Schon (already) has plain o; schön (beautiful) has rounded ö. The two spellings represent different vowel sounds.",
    "options": [
      "Correct match",
      "Try again"
    ],
    "answer": 0,
    "dlEnriched": true,
    "dlLessonMode": "match",
    "words": [
      "schon",
      "schön"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Do the recordings say the same word or different words?",
    "why": "Both recordings say schon, meaning already.",
    "options": [
      "Same word",
      "Different words"
    ],
    "answer": 0,
    "dlEnriched": true,
    "dlLessonMode": "compare",
    "clips": [
      "schon",
      "schon"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "Käse",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "Käse means cheese and contains ä.",
    "dlEnriched": true,
    "dlWriteAnswer": "Käse",
    "dlStrictSpelling": true,
    "dlReviewAudio": "Käse"
  },
  {
    "type": "grammar",
    "prompt": "Match each recording to its word.",
    "why": "Fuß (foot) has a long u followed by ß; Fluss (river) has an l and a short u followed by ss. Both ß and ss represent an unvoiced s sound.",
    "options": [
      "Correct match",
      "Try again"
    ],
    "answer": 0,
    "dlEnriched": true,
    "dlLessonMode": "match",
    "words": [
      "Fuß",
      "Fluss"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Do the recordings say the same word or different words?",
    "why": "Schon means already; schön means beautiful. The vowel sounds differ.",
    "options": [
      "Same word",
      "Different words"
    ],
    "answer": 1,
    "dlEnriched": true,
    "dlLessonMode": "compare",
    "clips": [
      "schon",
      "schön"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "Straße",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "Straße means street; its long a is followed by ß.",
    "dlEnriched": true,
    "dlWriteAnswer": "Straße",
    "dlStrictSpelling": true,
    "dlReviewAudio": "Straße"
  },
  {
    "type": "grammar",
    "prompt": "Match each recording to its word.",
    "why": "Mädchen (girl) and Käse (cheese) contain ä; fünf (five) contains rounded ü. Listen to the vowel in each complete word, rather than matching by word length.",
    "options": [
      "Correct match",
      "Try again"
    ],
    "answer": 0,
    "dlEnriched": true,
    "dlLessonMode": "match",
    "words": [
      "Mädchen",
      "Käse",
      "fünf"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Do the recordings say the same word or different words?",
    "why": "The recordings are different: Fuß (foot) has long u and no l; Fluss (river) includes l and short u. Long u is followed by ß, while short u is followed by ss.",
    "options": [
      "Same word",
      "Different words"
    ],
    "answer": 1,
    "dlEnriched": true,
    "dlLessonMode": "compare",
    "clips": [
      "Fuß",
      "Fluss"
    ]
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "fünf",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "Fünf means five and contains the rounded vowel ü.",
    "dlEnriched": true,
    "dlWriteAnswer": "fünf",
    "dlStrictSpelling": true,
    "dlReviewAudio": "fünf"
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "heißen",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "The word is heißen (to be called). Write ß after the diphthong ei; B is a different letter and ss is not the standard spelling here.",
    "dlEnriched": true,
    "dlWriteAnswer": "heißen",
    "dlReviewAudio": "heißen",
    "dlStrictSpelling": true
  }
];

  // Pilot spelling formats use only words introduced in this lesson.
  session.questions[1]={type:'grammar',prompt:'Listen and complete the word.',options:['schön','Try again'],answer:0,why:'The recording says schön (beautiful), so the missing vowel is ö. Plain o would spell schon (already), a different word with a different vowel sound.',dlEnriched:true,dlLessonMode:'gap',spellingWord:'schön',spellingBefore:'sch',spellingAfter:'n',spellingAnswer:'ö'};
  for(const i of [2,5]){
   const q=session.questions[i];q.dlLessonMode='tiles';q.spellingWord=q.dlWriteAnswer;q.prompt='Listen, then build the word.';
   delete q.dlWriteAnswer;delete q.dlReviewAudio;
  }
  session.idx=0;session.score=0;session.results=[];
  fullRender();
 };
})();
