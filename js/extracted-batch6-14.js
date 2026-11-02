
(function(){
 const umlautUnit=FULL_UNITS.find(u=>u.title==='Umlauts and ß');
 if(umlautUnit){
  umlautUnit.rule='German has three umlaut vowels: ä, ö and ü. Ä can sound similar to the e in English “bed” (as in Mädchen, girl, or Käse, cheese). Ö is a rounded front vowel, as in schön (beautiful). Ü is another rounded front vowel, as in fünf (five) and Tür (door). ß, called Eszett, represents a sharp s sound, as in Straße (street); it is not the letter B.';
  umlautUnit.examples=[
   ['Mädchen','girl — ä'],
   ['schön','beautiful — ö'],
   ['fünf','five — ü'],
   ['Tür','door — long ü'],
   ['Straße','street — ß'],
   ['schon / schön','already / beautiful — different vowels']
  ];
 }
 const oldBegin=fullBegin;
 fullBegin=function(id){
  oldBegin.apply(this,arguments);
  const session=fullSession,unit=FULL_UNITS[id];
  if(!session||unit?.title!=='Umlauts and ß')return;
  // Nine focused sound/spelling tasks; remove overlapping comparisons and matches.
  session.questions=[
    {
      "type": "grammar",
      "prompt": "Listen and complete: sch_n.",
      "options": [
        "o",
        "ö"
      ],
      "answer": 0,
      "why": "",
      "dlEnriched": true,
      "dlSoundFocus": "o-ö"
    },
    {
      "type": "grammar",
      "prompt": "Listen, then build the word.",
      "options": [
        "Käse",
        "Try again",
        "Another answer"
      ],
      "answer": 0,
      "why": "Käse means cheese and contains ä.",
      "dlEnriched": true,
      "dlStrictSpelling": true,
      "dlLessonMode": "tiles",
      "spellingWord": "Käse",
      "spellingDistractors": ["a"]
    },
    {
      "type": "grammar",
      "prompt": "Listen and complete: Fu_. Choose ß or ss.",
      "options": [
        "ß",
        "ss"
      ],
      "answer": 0,
      "why": "The word is Fuß (foot). The u is long, so standard German uses ß after it. ß represents an unvoiced s sound; it is not B.",
      "dlReviewAudio": "Fuß",
      "dlFeedbackAudio": "Fuß",
      "dlEnriched": true
    },
    {
      "type": "grammar",
      "prompt": "In Straße, how is ß pronounced?",
      "options": [
        "Like B in book",
        "Like S in see",
        "Like Z in zoo"
      ],
      "answer": 1,
      "why": "In Straße (street), ß represents an unvoiced s sound, like the s in English see. It is not the letter B or the voiced z sound.",
      "dlEnriched": true,
      "dlFeedbackAudio": "Straße"
    },
    {
      "type": "grammar",
      "prompt": "Listen, then build the word.",
      "options": [
        "Straße",
        "Try again",
        "Another answer"
      ],
      "answer": 0,
      "why": "Straße means street; its long a is followed by ß.",
      "dlEnriched": true,
      "dlStrictSpelling": true,
      "dlLessonMode": "tiles",
      "spellingWord": "Straße"
    },
    {
      "type": "grammar",
      "prompt": "Listen and complete: T_r.",
      "options": [
        "u",
        "ü"
      ],
      "answer": 1,
      "why": "The word is Tür (door). Its long rounded vowel is written ü, rather than plain u.",
      "dlEnriched": true,
      "dlReviewAudio": "Tür",
      "dlFeedbackAudio": "Tür"
    },
    {
      "type": "grammar",
      "prompt": "Listen and complete: Flu_. Choose ß or ss.",
      "options": [
        "ß",
        "ss"
      ],
      "answer": 1,
      "why": "The word is Fluss (river). The u is short, so standard German uses ss after it. The extra l is already supplied; listen to the vowel length to choose the spelling.",
      "dlReviewAudio": "Fluss",
      "dlFeedbackAudio": "Fluss",
      "dlEnriched": true
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

  // Vary both the recording and choice order: the umlaut is not always correct.
  const vowel=session.questions[0],word=Math.random()<.5?'schon':'schön';
  const letters=Math.random()<.5?['o','ö']:['ö','o'];
  vowel.options=letters;vowel.answer=letters.indexOf(word==='schon'?'o':'ö');
  vowel.dlReviewAudio=vowel.dlFeedbackAudio=word;
  vowel.why=word==='schon'?'The word is schon (already), with plain o. Schön (beautiful) has a different, rounded ö vowel.':'The word is schön (beautiful), with rounded ö. Schon (already) has a different, plain o vowel.';
  for(const q of session.questions.slice(1)){
   if(q.dlLessonMode||q.dlWriteAnswer)continue;
   const correct=q.options[q.answer];
   for(let i=q.options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[q.options[i],q.options[j]]=[q.options[j],q.options[i]];}
   q.answer=q.options.indexOf(correct);
  }
  session.idx=0;session.score=0;session.results=[];
  fullRender();
 };
 const previousCheck=dlCheck;
 dlCheck=function(){
  const result=previousCheck.apply(this,arguments);
  const session=fullSession,q=session?.questions?.[session.idx];
  if(FULL_UNITS[session?.id]!==umlautUnit||!dlAnswered||!q?.dlFeedbackAudio)return result;
  const box=document.querySelector('#dl-result .dl-flow-feedback');
  if(!box||box.querySelector('.dl-umlaut-replay'))return result;
  const button=document.createElement('button');button.type='button';button.className='secondary dl-umlaut-replay';button.textContent='🔊 Hear '+q.dlFeedbackAudio;
  button.onclick=()=>{if(fullSession===session&&session.questions[session.idx]===q&&dlAnswered)speak(q.dlFeedbackAudio);};
  box.append(button);return result;
 };
})();
