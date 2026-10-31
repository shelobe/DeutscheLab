
// Shared web lesson improvement. Android branch intentionally unchanged.
(function(){
 const unit=FULL_UNITS.find(u=>u.level==='A2'&&u.title==='Accusative articles');
 if(!unit)return;
 unit.rule='The accusative marks the direct object: the person or thing receiving the action.\n\nDEFINITE ARTICLES (the):\nMasculine: der → den (der Hund → den Hund).\nFeminine: die → die (die Katze → die Katze).\nNeuter: das → das (das Buch → das Buch).\nPlural: die → die (die Bücher → die Bücher).\n\nINDEFINITE ARTICLES (a/an):\nMasculine: ein → einen (ein Apfel → einen Apfel).\nFeminine: eine → eine (eine Banane → eine Banane).\nNeuter: ein → ein (ein Buch → ein Buch).\n\nOnly masculine articles change in the accusative. Compare: Der Hund schläft (subject), but Ich sehe den Hund (direct object).';
 unit.examples=[['Ich sehe den Hund.','I see the dog. (masculine: der → den)'],['Sie kauft eine Banane.','She buys a banana. (feminine: eine stays eine)'],['Wir lesen das Buch.','We read the book. (neuter: das stays das)']];
 unit.checkpoint={prompt:'Ich kaufe ___ Apfel.',options:['einen','ein','eine'],answer:0,why:'Apfel is masculine and the direct object, so ein changes to einen.'};
 const previous=fullQuestions;
 fullQuestions=function(u){
  if(u!==unit)return previous(u);
  return [
   {type:'grammar',prompt:'Ich sehe ___ Hund. (masculine)',options:['der','den','dem'],answer:1,why:'Hund is masculine; the definite article der becomes den for a direct object.'},
   {type:'grammar',prompt:'Sie kauft ___ Apfel. (masculine)',options:['eine','einen','ein'],answer:1,why:'Apfel is masculine; indefinite ein becomes einen in the accusative.'},
   {type:'grammar',prompt:'Ich habe ___ Katze. (feminine)',options:['einen','ein','eine'],answer:2,why:'Katze is feminine. Eine stays eine in the accusative.'},
   {type:'grammar',prompt:'Wir lesen ___ Buch. (neuter)',options:['das','den','die'],answer:0,why:'Buch is neuter. The definite article das does not change in the accusative.'},
   {type:'grammar',prompt:'Er braucht ___ Auto. (neuter)',options:['einen','eine','ein'],answer:2,why:'Auto is neuter. Indefinite ein stays ein in the accusative.'},
   {type:'grammar',prompt:'Ich sehe ___ Kinder. (plural)',options:['den','das','die'],answer:2,why:'Kinder is plural. The plural definite article die stays die in the accusative.'},
   {type:'grammar',prompt:'___ Mann liest ein Buch. (masculine · subject)',options:['Den','Der','Dem'],answer:1,why:'Mann is the subject, not the direct object, so nominative der is required. Buch is a neuter object and keeps ein.'}
  ];
 };
})();
