
/* Feedback de-duplication: explanations must teach, not restate translations. */
(function(){
  function current(){const s=fullSession;return s?.questions?.[s.idx]||null;}
  function clean(v){return String(v||'').replace(/[“”"'‘’]/g,'').replace(/\s+/g,' ').trim().toLowerCase().replace(/[.!?]+$/,'');}
  function isTranslationOnly(q){
    const why=clean(q?.why),de=clean(q?.german),en=clean(q?.english);
    if(!why)return true;
    if(de&&en&&(why.includes(de)&&why.includes(en)))return true;
    if(/^the correct sentence is\b|^the correct answer is\b|^the sentence means\b|^this means\b|^.+ means .+$/i.test(why))return true;
    return false;
  }
  function explanation(q){
    if(!q)return '';
    const de=String(q.german||'');
    if(/\bnicht\b/i.test(de)){
      if(/\bkomme nicht\b/i.test(de))return 'Nicht negates the action here. In this short main clause it follows the conjugated verb komme.';
      return 'Nicht negates a verb, adjective, or phrase. Its position depends on which part of the sentence is being negated.';
    }
    return isTranslationOnly(q)?'':String(q.why||'').trim();
  }
  function teachingHint(q){
    const prompt=String(q?.prompt||'');
    const options=(q?.options||[]).map(String);
    const all=(prompt+' '+options.join(' ')).toLowerCase();
    // A question asking for the meaning of a German word is vocabulary recognition,
    // not a German question-formation exercise. Inspect the quoted target first.
    const meaningMatch=prompt.match(/what does\s+[“"']([^”"']+)[”"']\s+mean/i);
    if(meaningMatch){
      const term=meaningMatch[1].trim().toLowerCase();
      if(['ich','du','er','sie','es','wir','ihr','sie (plural)','sie (formal)'].includes(term))
        return 'This lesson is about personal pronouns, which replace names. First person refers to the speaker, second person to the listener, and third person to someone else. German also distinguishes talking to one person (singular) from talking to several people (plural). Compare: du lernst (one person) and ihr lernt (several people).';
      if(['wer','was','wo','wann','warum','wie','woher','wohin'].includes(term))
        return 'This is question-word vocabulary. German has different words for asking about a person, a thing, a location, a time, a reason, or a manner. Think about what kind of information the word requests, rather than German sentence order.';
      if(/^(?:\d+|null|eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig)$/.test(term))
        return 'This is a number-recognition exercise. Recall the counting sequence and compare nearby numbers; you do not need a sentence grammar rule.';
      return 'This asks for the meaning of a German vocabulary word. Recall where you learned it and compare the meanings of the options; verb endings and question word order are not relevant.';
    }
    // Hints describe transferable grammar, never reveal the selected answer.
    // Classify the actual task before inspecting distractor answers.
    // Vocabulary recognition should not trigger conjugation rules merely because
    // a distractor contains a pronoun or a verb.
    if(/choose the german for|what is the german for|translate (?:the word|\")/i.test(prompt)){
      if(/\b(i|you|he|she|it|we|they)\b[”"'.?! ]*$/i.test(prompt))return 'This is a personal-pronoun question. Pronouns stand in for people or things. German distinguishes the speaker (first person), the person being addressed (second person), and someone being talked about (third person). Match the English pronoun by person and number; no verb ending is needed here.';
      if(/\b(who|what|where|when|why|how)\b[”"'.?! ]*$/i.test(prompt))return 'This is a question-word vocabulary question. Decide whether the English word asks about a person, thing, place, time, reason, or manner. Then choose the corresponding German question word; you do not need to conjugate a verb.';
      if(/\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|[0-9]+)\b/i.test(prompt))return 'This is a number-recognition question. Focus on the number itself rather than sentence grammar. German numbers from 13–19 often combine a unit with -zehn; from 21 onward, many numbers place the unit before und and the tens.';
      return 'This is a vocabulary question. Identify what the English word means and compare the meanings of the German choices. No verb conjugation or sentence word-order rule is needed.';
    }
    if(/where do you live|wo wohnst|wo wohnen/i.test(all))return 'Question-word questions use: question word + conjugated verb + subject. Wohnen means “to live.” With du (informal you), regular verbs usually end in -st; with Sie (formal you), they use the infinitive form. Compare: Wo arbeitest du? (Where do you work?)';
    if(/wie heißt|what is your name|heiße|heißen/i.test(all))return 'Heißen means “to be called.” Verb endings change with the subject: ich commonly takes -e, du commonly takes -st (with spelling adjustments), and wir/Sie take -en. In a question, the verb usually comes before the subject.';
    if(/nicht|kein/i.test(all))return 'Nicht negates verbs, adjectives, or a whole statement; kein negates nouns that would otherwise use ein/eine or no article. Compare: Ich komme nicht. (I am not coming.) / Ich habe kein Auto. (I have no car.)';
    if(/\b(der|die|das|ein|eine)\b/i.test(all)&&/___|article|choose/i.test(prompt))return 'German nouns have grammatical gender: der (masculine), die (feminine), das (neuter). The article also changes with grammatical case. Learn the article together with each noun rather than guessing from its English meaning.';
    if(/\b(ich|du|er|sie|wir|ihr)\b/i.test(all)&&/___|correct|choose/i.test(prompt))return 'Look at the subject first, then choose the matching verb ending. For most regular present-tense verbs: ich → -e, du → -st, er/sie/es → -t, wir/sie/Sie → -en. Example: ich lerne, du lernst, er lernt.';
    if(/where|when|what|who|why|how|\bwo\b|\bwann\b|\bwer\b|\bwarum\b/i.test(all))return 'For a German question with a question word, use question word + conjugated verb + subject. For yes/no questions, put the conjugated verb first. Example: Wann kommst du? / Kommst du morgen?';
    if(/word order|sentence|___/i.test(prompt))return 'In a normal German main clause, the conjugated verb takes the second position. If a time expression comes first, the subject moves after the verb: Heute lerne ich Deutsch. (Today I study German.)';
    return 'Look for the grammatical subject and the verb, then check their agreement and word order. In German main clauses, the conjugated verb normally occupies the second position; in yes/no questions, it comes first.';
  }
  function updateHelp(){
    const q=current(),tip=document.getElementById('dl-tip'),btn=document.getElementById('dl-help-btn');
    if(!tip||!btn||!q)return;
    const prompt=String(q.prompt||'');
    const target=(prompt.match(/what does\s+[“"']([^”"']+)[”"']\s+mean/i)||[])[1]||'';
    // Vocabulary recognition and straightforward phrase translation do not need grammar help.
    // Only show an explanation when the task tests a grammatical choice.
    const isRecall=/what does\s+[“"']|choose the german for|what is the german for|what is the english for|translate (?:this|the|into|to)|what does .* mean|match the (?:word|meaning)|which word means/i.test(prompt);
    const isGrammar=/\b(?:article|accusative|dative|nominative|plural form|possessive|conjugat|verb form|word order|correct sentence|correct ending|negat|separable|modal verb|fill in the blank)\b/i.test(prompt)
      || /_{2,}/.test(prompt)
      || /\b(?:der|die|das|den|dem|des|ein|eine|einen|einem|kein|keine|nicht)\b/i.test(prompt) && /\b(?:choose|correct|complete|fill)\b/i.test(prompt);
    const show=!isRecall && isGrammar;
    btn.hidden=!show;
    tip.hidden=true;
    btn.textContent='Show grammar explanation';
    const heading=tip.querySelector('strong');if(heading)heading.textContent='Grammar explanation';
    const paragraph=tip.querySelector('p');if(paragraph&&show)paragraph.textContent=teachingHint(q);
  }
  const previousRender=fullRender;
  fullRender=function(){const result=previousRender.apply(this,arguments);updateHelp();return result;};
  const previousCheck=dlCheck;
  dlCheck=function(){
    const q=current(),answer=q?.options?.[q.answer];
    const result=previousCheck.apply(this,arguments);
    if(!q||!dlAnswered)return result;
    const box=document.querySelector('#dl-result .dl-flow-feedback');
    if(!box)return result;
    const paragraphs=[...box.querySelectorAll(':scope > p')];
    // Correct choice is already highlighted above; do not repeat it.
    if(paragraphs[0]&&clean(paragraphs[0].textContent)===clean(answer))paragraphs[0].remove();
    // Translation-only 'why' is redundant; reserve explanation for actual grammar.
    if(paragraphs[1]){
      const detail=explanation(q);
      if(detail)paragraphs[1].textContent=detail;
      else paragraphs[1].remove();
    }
    const prompt=clean(q.prompt),options=(q.options||[]).map(clean);
    const hasGerman=!!q.german&&(prompt.includes(clean(q.german))||options.includes(clean(q.german)));
    const hasEnglish=!!q.english&&(prompt.includes(clean(q.english))||options.includes(clean(q.english)));
    // Only display a translation when it supplies a language missing from the exercise.
    box.querySelectorAll('.dl-a1-translation,.dl-article-translation').forEach(block=>{
      if(hasGerman&&hasEnglish){block.remove();return;}
      const lines=[...block.querySelectorAll('p')];
      for(const line of lines){
        const label=line.querySelector('strong')?.textContent?.toLowerCase()||'';
        if((hasGerman&&/german/.test(label))||(hasEnglish&&/english/.test(label)))line.remove();
      }
      if(!block.querySelector('p'))block.remove();
    });
    // After checking, the feedback card already provides the grammar explanation.
    // Do not show the same explanation a second time below it.
    const grammarTip=document.getElementById('dl-tip');
    const grammarButton=document.getElementById('dl-help-btn');
    if(grammarTip)grammarTip.hidden=true;
    if(grammarButton)grammarButton.hidden=true;
    return result;
  };
})();
