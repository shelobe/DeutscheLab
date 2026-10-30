
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
   {type:'grammar',prompt:'Which letter is used in the German word for “five”?',options:['ü','u','ö'],answer:0,why:'Fünf is spelled with ü, which has a distinct vowel sound.'},
   {type:'sound-choice',prompt:'Which audio says “schön”?',options:['Audio 1','Audio 2','Audio 3'],answer:1,dlAudioWords:['schon','schön','Sohn'],dlTarget:'schön',why:'Schön has ö; schon and Sohn have an o sound.'},
   {type:'grammar',prompt:'What sound does ß represent in Straße?',options:['An s sound','A b sound','A z sound'],answer:0,why:'ß is called Eszett or sharp S. It represents an unvoiced s sound, not a b sound.'},
   {type:'grammar',prompt:'Choose the correctly spelled German word for “street.”',options:['Straße','StraBe','Sträße'],answer:0,why:'Straße uses ß after a long vowel. The letter ß is not the letter B.'},
   {type:'sound-choice',prompt:'Which audio says “Mütter”?',options:['Audio 1','Audio 2','Audio 3'],answer:2,dlAudioWords:['Mutter','Meter','Mütter'],dlTarget:'Mütter',why:'Mütter has ü; Mutter has u.'},
   {type:'sound-choice',prompt:'Which audio says “Mädchen”?',options:['Audio 1','Audio 2','Audio 3'],answer:1,dlAudioWords:['Machen','Mädchen','Möchten'],dlTarget:'Mädchen',why:'Mädchen (girl) contains ä. Listen for the different vowel compared with machen.'},
   {type:'grammar',prompt:'In Mädchen, which English vowel is ä closest to?',options:['The e in “bed”','The oo in “moon”','The ee in “see”'],answer:0,why:'The ä in Mädchen is similar to the short e in English bed. The German sound can vary by word and accent.'},
   {type:'grammar',prompt:'Which pair changes meaning when an umlaut is added?',options:['schon → schön','Haus → Haus','und → und'],answer:0,why:'Schon means already; schön means beautiful or nice.'},
   {type:'grammar',prompt:'Which spelling uses ß correctly?',options:['groß','groB','gröss'],answer:0,why:'Groß means big; ß represents the s sound after the long o.'},
   {type:'grammar',prompt:'Which statement about German ß is correct?',options:['It is a distinct letter, not a capital B','It is pronounced like English B','It always makes a sh sound'],answer:0,why:'ß is a separate German letter called Eszett; it typically represents a sharp s sound.'}
  ];
  session.idx=0;session.score=0;session.results=[];
  fullRender();
 };
})();
