
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
    "prompt": "Listen and choose the word you hear.",
    "options": [
      "Mädchen",
      "Madchen",
      "Mödchen"
    ],
    "answer": 0,
    "dlReviewAudio": "Mädchen",
    "dlEnriched": true,
    "why": "Mädchen means girl and contains ä. The dots change the vowel sound."
  },
  {
    "type": "grammar",
    "prompt": "Listen and choose the meaning of the word.",
    "options": [
      "Beautiful",
      "Already",
      "Five"
    ],
    "answer": 0,
    "dlReviewAudio": "schön",
    "dlEnriched": true,
    "why": "Schön means beautiful or nice; schon means already."
  },
  {
    "type": "grammar",
    "prompt": "Listen and choose the word you hear.",
    "options": [
      "fünf",
      "funf",
      "fönf"
    ],
    "answer": 0,
    "dlReviewAudio": "fünf",
    "dlEnriched": true,
    "why": "Fünf means five. Ü has a different sound from u and ö."
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "Straße",
      "Strabe",
      "Sträße"
    ],
    "answer": 0,
    "dlReviewAudio": "Straße",
    "dlEnriched": true,
    "why": "Straße means street. Its long a is followed by ß, which makes an s sound.",
    "dlWriteAnswer": "Straße",
    "dlStrictSpelling": true
  },
  {
    "type": "grammar",
    "prompt": "Listen and choose the word you hear.",
    "options": [
      "Käse",
      "Kase",
      "Köse"
    ],
    "answer": 0,
    "dlReviewAudio": "Käse",
    "dlEnriched": true,
    "why": "Käse means cheese and contains ä, a separate vowel sound."
  },
  {
    "type": "grammar",
    "prompt": "Listen and choose the meaning of the word.",
    "options": [
      "Already",
      "Beautiful",
      "Five"
    ],
    "answer": 0,
    "dlReviewAudio": "schon",
    "dlEnriched": true,
    "why": "Schon means already; schön, with ö, means beautiful or nice."
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "Fuß",
      "Fluss",
      "fünf"
    ],
    "answer": 0,
    "dlReviewAudio": "Fuß",
    "dlEnriched": true,
    "why": "Fuß means foot. Its long u is followed by ß.",
    "dlWriteAnswer": "Fuß",
    "dlStrictSpelling": true
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "Fluss",
      "Fuß",
      "fünf"
    ],
    "answer": 0,
    "dlReviewAudio": "Fluss",
    "dlEnriched": true,
    "why": "Fluss means river. Its short u is followed by ss.",
    "dlWriteAnswer": "Fluss",
    "dlStrictSpelling": true
  },
  {
    "type": "grammar",
    "prompt": "Complete the German word meaning “to be called”: hei__en.",
    "options": [
      "ß",
      "ss",
      "s"
    ],
    "answer": 0,
    "dlEnriched": true,
    "why": "Heißen uses ß after ei, a diphthong. This follows the same spelling rule as ß after a long vowel."
  },
  {
    "type": "grammar",
    "prompt": "Listen, then write the word you hear.",
    "options": [
      "groß",
      "gross",
      "groB"
    ],
    "answer": 0,
    "dlReviewAudio": "groß",
    "dlEnriched": true,
    "why": "Groß means big. Its long o is followed by ß. Use the Special characters control if needed.",
    "dlWriteAnswer": "groß",
    "dlStrictSpelling": true
  }
];

  session.idx=0;session.score=0;session.results=[];
  fullRender();
 };
})();
