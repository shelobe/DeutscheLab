
(function(){
 const conversation=FULL_UNITS.findIndex(u=>u.title==='Everyday conversations: Understanding in context');
 const pronouns=FULL_UNITS.findIndex(u=>u.title==='Personal pronouns: ich and du');
 if(conversation<0||pronouns<0)return;
 const u=FULL_UNITS[pronouns];
 u.title='Personal pronouns: ich, du, and Sie';
 u.rule="ICH — I\nUse ich when talking about yourself.\n\nDU — INFORMAL YOU\nUse du with a friend, family member, or someone you know well.\n\nSIE — FORMAL YOU\nUse Sie when politely addressing strangers, customers, or people in professional settings. It can address one person or several.\n\nCOMPARE\nDu lernst Deutsch. — You are learning German. (informal)\nSie lernen Deutsch. — You are learning German. (formal)\n\nREMEMBER\nFormal Sie always uses a capital S, even in the middle of a sentence. Lowercase sie means she or they."
 u.examples=[['ich','I'],['du','you (informal, singular)'],['Sie','you (formal, singular or plural)'],['Du lernst Deutsch.','You are learning German. (informal)'],['Sie lernen Deutsch.','You are learning German. (formal)'],['Können Sie mir helfen?','Can you help me? (formal)']];
 u.checkpoint={prompt:'Which pronoun means formal “you”?',options:['du','Sie','ich'],answer:1,why:'Sie (capital S) is formal you. Du is informal singular you; ich means I.'};
 // Move the pronoun lesson before conversation even when they are in different modules.
  // Preserve stable lesson IDs and existing completion scores.
  const groups=STRUCTURED_PATH.A1;
  const destination=groups.find(g=>g.ids.includes(conversation));
  if(destination){
    for(const group of groups)group.ids=group.ids.filter(id=>id!==pronouns);
    const position=destination.ids.indexOf(conversation);
    destination.ids.splice(position,0,pronouns);
  }
})();
