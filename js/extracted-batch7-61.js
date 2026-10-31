
(function(){
 const unit=FULL_UNITS.find(u=>u.level==='A2'&&u.title==='Dative articles');if(!unit)return;
 unit.examples=[['Ich helfe der Frau.','I help the woman. (feminine: die → der)'],['Ich spreche mit dem Hund.','I speak with the dog. (masculine: der → dem)'],['Wir spielen mit den Kindern.','We play with the children. (plural: die Kinder → den Kindern)']];
 const prior=fullQuestions;
 fullQuestions=function(u){if(u!==unit)return prior(u);return [
 {type:'grammar',prompt:'Ich helfe ___ Frau. (feminine)',options:['die','der','dem'],answer:1,why:'Helfen requires dative; feminine die becomes der.'},
 {type:'grammar',prompt:'Ich spiele mit ___ Hund. (masculine)',options:['dem','den','der'],answer:0,why:'Mit requires dative; masculine der becomes dem.'},
 {type:'grammar',prompt:'Sie spricht mit ___ Kind. (neuter)',options:['das','dem','den'],answer:1,why:'Mit requires dative; neuter das becomes dem.'},
 {type:'grammar',prompt:'Wir danken ___ Lehrer. (masculine, a teacher)',options:['ein','einem','einen'],answer:1,why:'Danken requires dative; masculine ein becomes einem.'},
 {type:'grammar',prompt:'Er gibt ___ Frau ein Buch. (feminine, a woman)',options:['einer','eine','einem'],answer:0,why:'The woman receives the book, so feminine eine becomes einer in the dative.'},
 {type:'grammar',prompt:'Sie spielt mit ___ Kindern. (plural)',options:['die','den','dem'],answer:1,why:'Mit requires dative; plural die becomes den, and Kinder becomes Kindern.'},
 {type:'grammar',prompt:'Ich fahre zu ___ Schule. (feminine)',options:['die','der','das'],answer:1,why:'Zu requires dative; feminine die becomes der.'}
 ];};
})();

