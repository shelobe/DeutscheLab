
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
  // One varied ten-question sequence: vowels, spelling, meaning, and ß.
  session.questions=[
  {
    "type": "grammar",
    "prompt": "Match each recording to its word.",
    "why": "Listen to the whole word, then check its spelling.",
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
    "why": "Listen to the whole word, then check its spelling.",
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
    "why": "Listen to the whole word, then check its spelling.",
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
    "why": "Fuß has a long u; Fluss has a short u. They mean foot and river.",
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
      "groß",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "Groß means big; its long o is followed by ß.",
    "dlEnriched": true,
    "dlWriteAnswer": "groß",
    "dlStrictSpelling": true,
    "dlReviewAudio": "groß"
  },
  {
    "type": "grammar",
    "prompt": "Write the German word meaning “to be called”.",
    "options": [
      "heißen",
      "Try again",
      "Another answer"
    ],
    "answer": 0,
    "why": "Heißen uses ß after the diphthong ei.",
    "dlEnriched": true,
    "dlWriteAnswer": "heißen",
    "dlStrictSpelling": true
  }
];

  session.idx=0;session.score=0;session.results=[];
  fullRender();
 };
})();
