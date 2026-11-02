/* Hear German answer text when selecting it; selection/checking keep their native behavior. */
(function(){
 const normalize=s=>String(s||'').normalize('NFC').toLocaleLowerCase('de-DE').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const german=new Set(),english=new Set(),deWords=new Set(),enWords=new Set();
 const add=(de,en)=>{if(!de||!en)return;german.add(normalize(de));english.add(normalize(en));normalize(de).split(' ').forEach(w=>deWords.add(w));normalize(en).split(' ').forEach(w=>enWords.add(w));};
 for(const u of FULL_UNITS)for(const pair of u.examples||[])if(Array.isArray(pair))add(pair[0],pair[1]);
 for(const pack of Object.values(window.DL_LESSON_ENRICHMENT||{}))for(const pair of pack.examples||[])add(pair[0],pair[1]);
 function phrase(text,q){
  // Spelling-symbol choices use the question’s dedicated word recording.
  if(q?.options?.length&&q.options.every(option=>/^(?:ß|ss)$/i.test(String(option).trim())))return '';
  if(q?.dlAnswerLanguage==='en')return '';
  const value=String(text||'').split(/\s+[—–]\s+/)[0].replace(/\s*\([^)]*\)/g,'').trim();
  if(!value||!/[\p{L}]/u.test(value))return '';
  if(q?.dlAnswerLanguage==='de')return value;
  const key=normalize(value);
  if(german.has(key)&&!english.has(key))return value;
  if(english.has(key)&&!german.has(key))return '';
  // English sentences and grammar labels must never be spoken with a German voice.
  if(/\b(i|you|your|my|where|which|what|the|a|an|is|are|means|masculine|feminine|neuter|subject|object)\b/i.test(value))return '';
  if(/[äöüß]/i.test(value)||/\b(ich|du|er|sie|es|wir|ihr|der|die|das|den|dem|ein|eine|einen|ist|sind|wo|woher|wie|welche|nicht|ja|nein)\b/i.test(value))return value;
  let score=0;
  for(const word of key.split(' ')){if(deWords.has(word)&&!enWords.has(word))score++;if(enWords.has(word)&&!deWords.has(word))score--;}
  return score>0?value:'';
 }
 function play(q,i){const value=phrase(q?.options?.[i],q);if(value)speak(value);}
 const choose=dlChoose;
 dlChoose=function(i){
  if(typeof fullSession!=='undefined'&&fullSession&&!dlAnswered)play(fullSession.questions?.[fullSession.idx],i);
  return choose.apply(this,arguments);
 };
 const answer=curriculumReviewAnswer;
 curriculumReviewAnswer=function(i){
  const s=moduleSession,q=s?.questions?.[s.idx];
  // Custom dictation/comparison/matching controls submit synthetic choices, not tapped text.
  if(s&&!s.answered&&(!q?.dlReviewMode||q.dlReviewMode==='choice'))play(q,i);
  return answer.apply(this,arguments);
 };
 window.dlGermanAnswerPhrase=phrase;
})();
