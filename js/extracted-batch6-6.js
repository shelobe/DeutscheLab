
const dlSentenceGrammar = {
 'Die Katze schläft auf dem Bett.':'Die Katze is the subject. Schläft is the conjugated verb in second position. Auf dem Bett describes where the cat sleeps.',
 'Ich trinke morgens Wasser.':'Ich is the subject and trinke is the verb in second position. Morgens tells when; Wasser is the object.',
 'Wir gehen zum Bahnhof.':'Wir is the subject, followed by the conjugated verb gehen. Zum means zu dem (to the).',
 'Mein Bruder hat ein Fahrrad.':'Mein Bruder is the subject. Hat is the third-person singular form of haben (to have).',
 'Morgen kaufe ich Äpfel.':'Morgen comes first for emphasis, so the verb kaufe remains in second position, before ich.',
 'Sie liest ein Buch.':'Sie is the subject. Liest is the third-person singular form of lesen (to read).',
 'Die Kinder spielen draußen.':'Die Kinder is plural, so the verb is spielen. Draußen means outside.',
 'Ich suche meine Schlüssel.':'Ich takes the verb form suche. Meine Schlüssel is the plural object.',
 'Wir essen Brot und Käse.':'Wir takes essen. Und connects the two foods, Brot and Käse.',
 'Der Hund sitzt unter dem Tisch.':'Der Hund is the subject. Unter dem Tisch uses dative to describe a fixed location.',
 'Ich habe einen Hund':'Ich takes habe. Einen Hund is accusative because Hund is the direct object.',
 'Heute gehe ich einkaufen':'Heute occupies first position, so gehe comes second, before ich. Einkaufen stays at the end.',
 'Wir lernen Deutsch':'Wir is plural, so the verb is lernen. Deutsch is what we are learning.',
 'Die Katze schläft auf dem Sofa':'Die Katze is the subject, followed by schläft. Auf dem Sofa uses dative for a location.',
 'Morgen rufe ich dich an':'Morgen is first, rufe is second, and the separable prefix an goes at the end.'
};
function dlSentenceHelpToggle(){
 const box=document.getElementById('dlSentenceHelp');if(!box)return;
 const g=typeof gameSession!=='undefined'?gameSession:null;
 const key=g&&g.mode==='build'&&g.seq&&g.idx<g.seq.length?GAME_ITEMS[g.seq[g.idx]].de:(typeof sentenceTarget!=='undefined'?sentenceTarget.join(' '):'');
 const level=(g&&g.level)||'A1';
 const explanation=dlSentenceGrammar[key] || (
  /\b(weil|dass|obwohl|wenn|damit)\b/i.test(key) ? 'This sentence includes a subordinate clause. In German, the conjugated verb normally moves to the end of that clause.' :
  /\b(habe|hat|haben|bin|ist|sind)\b.*\b(ge\w+|\w+t)\b/i.test(key) ? 'The perfect tense combines a form of haben or sein with a past participle, usually placed at the end.' :
  /\b(würde|wäre|hätte|könnte)\b/i.test(key) ? 'These are subjunctive forms used for hypothetical situations, wishes, or polite requests.' :
  /\b(muss|müssen|kann|können|will|möchte|soll)\b/i.test(key) ? 'With a modal verb, the modal is conjugated and the main verb stays in the infinitive at the end.' :
  /\b(heute|morgen|gestern|danach|trotzdem)\b/i.test(key) ? 'When a time word or adverb begins the main clause, the conjugated verb still stays in second position, before the subject.' :
  level==='B2' ? 'Look at how the clauses connect and how the verb forms express the relationship between events.' :
  level==='B1' ? 'Pay attention to clause order, the conjugated verb, and any prepositions or case endings.' :
  level==='A2' ? 'In a main clause, the conjugated verb takes second position. Check the verb ending and word order.' :
  'In a German main clause, the conjugated verb normally takes second position. Check that the subject and verb agree.'
 );
 box.textContent=explanation;
 box.hidden=!box.hidden;
 const btn=[...box.parentElement.querySelectorAll('button')].find(b=>b.textContent==='Show grammar help'||b.textContent==='Hide grammar help');if(btn)btn.textContent=box.hidden?'Show grammar help':'Hide grammar help';
}
