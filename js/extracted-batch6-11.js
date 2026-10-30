
(function(){
 const id=FULL_UNITS.findIndex(u=>u.title==='Everyday conversations: Understanding in context');
 if(id<0)return;
 const u=FULL_UNITS[id];
 u.rule='Use these phrases when you need help in a conversation.\n\nICH VERSTEHE DIE FRAGE NICHT.\nI do not understand the question.\n• ich = I\n• verstehe = understand\n• die Frage = the question\n• nicht = not\nTry replacing die Frage with das Wort (the word) or den Satz (the sentence).\n\nKÖNNEN SIE MIR HELFEN?\nCan you help me?\n• können = can\n• Sie = formal you\n• mir = me\n• helfen = help\n\nSPRECHEN SIE BITTE LANGSAM.\nPlease speak slowly.\n• sprechen = speak\n• Sie = formal you\n• bitte = please\n• langsam = slowly.';
 u.examples=[['Ich verstehe die Frage nicht.','I do not understand the question.'],['Ich verstehe das Wort nicht.','I do not understand the word.'],['Können Sie mir helfen?','Can you help me?'],['Sprechen Sie bitte langsam.','Please speak slowly.'],['Ich verstehe den Satz nicht.','I do not understand the sentence.'],['Können Sie das bitte wiederholen?','Could you please repeat that?']];
 u.checkpoint={prompt:'Which phrase asks someone to speak more slowly?',options:['Sprechen Sie bitte langsam.','Ich verstehe die Frage nicht.','Können Sie mir helfen?'],answer:0,why:'Sprechen Sie bitte langsam is a polite request. Sie is the formal you; bitte means please; langsam means slowly.'};
 const previous=fullQuestions;
 fullQuestions=function(unit){
  if(unit!==u)return previous(unit);
  return [
   {type:'grammar',prompt:'Someone speaks too quickly. What would you say?',options:['Sprechen Sie bitte langsam.','Ich verstehe das Wort nicht.','Können Sie mir helfen?'],answer:0,why:'Sprechen Sie bitte langsam asks a person to speak slowly. Bitte softens the request.'},
   {type:'grammar',prompt:'In “Ich verstehe die Frage nicht,” what does “nicht” do?',options:['Makes the statement negative','Turns it into a question','Makes it more polite'],answer:0,why:'Nicht negates the verb verstehe: I do not understand.'},
   {type:'grammar',prompt:'You understand the question, but not one word. Which sentence fits?',options:['Ich verstehe das Wort nicht.','Ich verstehe die Frage nicht.','Sprechen Sie bitte langsam.'],answer:0,why:'Das Wort means the word. Replace die Frage with das Wort while keeping Ich verstehe … nicht.'},
   {type:'grammar',prompt:'What does “Sie” mean in “Können Sie mir helfen?”',options:['Formal you','She','We'],answer:0,why:'Capitalized Sie is the formal form of you in this question. Können Sie …? is a polite way to ask someone.'},
   {type:'grammar',prompt:'Which phrase politely asks someone to repeat something?',options:['Können Sie das bitte wiederholen?','Ich verstehe den Satz nicht.','Sprechen Sie bitte langsam.'],answer:0,why:'Wiederholen means repeat. Können Sie …? makes a polite request; bitte means please.'},
   {type:'grammar',prompt:'Which German noun means “sentence” in “Ich verstehe den Satz nicht”?',options:['Satz','Frage','Wort'],answer:0,why:'Der Satz means sentence; it becomes den Satz as the direct object of verstehen.'},
   {type:'grammar',prompt:'A stranger offers to explain something. How do you ask for help politely?',options:['Können Sie mir helfen?','Ich verstehe das Wort nicht.','Sprechen Sie bitte langsam.'],answer:0,why:'Können Sie mir helfen? means Can you help me? Mir is the form of I used for the person receiving help.'}
  ];
 };
})();
