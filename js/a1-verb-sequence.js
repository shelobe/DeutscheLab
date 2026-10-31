/* Foundational A1 teaching packs, informed by DW Nicos Weg A1 grammar overview.
 * Keep module positions and existing lesson IDs stable for saved progress.
 * Reference: https://static.dw.com/downloads/52718691/grammar-overview-nicos-weg-a1.pdf
 */
(function(){
 const groups=STRUCTURED_PATH.A1;
 const pronouns=groups.find(g=>g.title==='I, you, we: personal pronouns');
 const essential=groups.find(g=>g.title==='Essential verbs: be, have, live');
 const sentences=groups.find(g=>g.title==='Building German sentences');
 const id=title=>FULL_UNITS.findIndex(u=>u.title===title);
 const regular=id('Present-tense verbs'),first=id('Personal pronouns: ich, du, and Sie'),third=id('Personal pronouns: he, she, it');
 if(!pronouns||!essential||!sentences||[regular,first,third].some(i=>i<0))return;
 const packs=window.DL_LESSON_ENRICHMENT;
 const q=(prompt,options,why)=>({type:'grammar',prompt,options,answer:0,why});
 packs['A1|'+FULL_UNITS[first].title]={sections:[
  ['Who is speaking?',['ich — I: use it to talk about yourself.','du — you: use it for one friend, family member or child.','Sie — you: use it politely for a stranger or customer, or in a professional conversation.']],
  ['One person or a group?','Du addresses one person informally. Formal Sie can address one person or several people. You will learn informal you for a group (ihr) in the next lesson.'],
  ['Formal or informal?','When you are unsure, start with Sie. “Wir können uns duzen” means “We can use du with each other.” This is an invitation to speak informally.'],
  ['Examples to recognize',['Ich lerne Deutsch. — I am learning German.','Du lernst Deutsch. — You are learning German (informal).','Sie lernen Deutsch. — You are learning German (formal).']],
  ['What to focus on','For now, identify who the pronoun refers to. You do not need to work out lerne, lernst or lernen yet; the regular verb lesson in the next module explains those endings.'],
  ['Remember','Formal Sie always has a capital S, even in the middle of a sentence. Lowercase sie means she or they; the next lesson explains these meanings. Any word is capitalized at the start of a sentence, so use the context too.']
 ],examples:[['ich','I'],['du','you (one person, informal)'],['Sie','you (formal, one person or several)'],['Wir können uns duzen.','We can use du with each other.']],questions:[
  q('You are talking about yourself. Which pronoun fits?',['ich','du','Sie'],'Ich means I.'),
  q('Which pronoun means informal you when speaking to one close friend?',['du','Sie','ich'],'Du addresses one person informally.'),
  q('You politely address a customer you do not know. Which pronoun fits?',['Sie','du','ich'],'Use formal Sie with an unfamiliar customer.'),
  q('You politely address two customers together. Which pronoun fits?',['Sie','du','ich'],'Formal Sie works for one person or several.'),
  q('Which spelling means formal you in the middle of a sentence?',['Sie','sie','ich'],'Formal Sie keeps its capital S.'),
  q('Someone says “Wir können uns duzen.” What are they suggesting?',['Use informal du with each other','Keep using formal Sie','Talk only about yourself'],'This phrase invites you to use du with each other.'),
  q('You speak to a family member informally. Which pronoun fits?',['du','Sie','ich'],'Use du with one family member.'),
  q('In “Ich lerne Deutsch,” who is learning?',['The speaker','The person being addressed','Several customers'],'Ich means I: the speaker is talking about themself.')
 ]};
 packs['A1|'+FULL_UNITS[third].title]={sections:[
  ['Talking about one person',['er — he: Paul ist hier. Er ist hier. — Paul is here. He is here.','sie — she: Anna ist hier. Sie ist hier. — Anna is here. She is here.','es — it: Das Kind spielt. Es spielt. — The child is playing.']],
  ['Why es with das Kind?','Das Kind means the child. The German noun Kind is grammatically neuter, so es can replace it even though a child is a person. Later lessons explain noun gender and pronouns for other animals and objects.'],
  ['Talking about a group',['wir — we: the speaker and at least one other person.','ihr — you all: several people you address informally.','sie — they: a group you are talking about, such as Anna and Paul.']],
  ['Compare the meanings',['Anna → sie — she','Anna und Paul → sie — they','You and your friend, speaking about yourselves → wir — we','Speaking informally to two friends → ihr — you all']],
  ['Useful words in the examples',['hier — here','ist hier — is here','das Kind — the child','spielt — is playing']],
  ['Remember','Lowercase sie can mean she or they. Use the people named in the context for now. Capitalized Sie can mean formal you, but a pronoun at the beginning of a sentence is also capitalized. The regular-verb lesson explains how verb endings help distinguish sie lernt (she learns) and sie lernen (they learn).']
 ],examples:[['Paul ist hier. Er ist hier.','Paul is here. He is here.'],['Anna ist hier. Sie ist hier.','Anna is here. She is here.'],['Das Kind spielt. Es spielt.','The child is playing.'],['wir · ihr · sie','we · you all · they']],questions:[
  q('Paul ist hier. ___ ist hier.',['Er','Sie','Es'],'Paul is referred to with er (he).'),
  q('Anna ist hier. ___ ist hier.',['Sie','Er','Es'],'Anna is referred to with sie (she). It is capitalized at the start of this sentence.'),
  q('Das Kind spielt. ___ spielt.',['Es','Er','Sie'],'Das Kind is grammatically neuter, so es can replace it.'),
  q('You and a friend are talking about yourselves. Which pronoun means we?',['wir','ihr','sie'],'Wir includes the speaker and another person.'),
  q('You address two friends informally. Which pronoun fits?',['ihr','du','wir'],'Ihr is informal you for several people.'),
  q('You are talking about Anna and Paul together. Which pronoun means they?',['sie','er','es'],'Lowercase sie can refer to a group: they.'),
  q('In “Anna ist hier,” which pronoun could replace Anna?',['sie','er','wir'],'Use sie (she) for Anna.'),
  q('Which pronoun refers to one male person you are talking about?',['er','ihr','wir'],'Er means he; ihr means you all and wir means we.')
 ]};
 packs['A1|Present-tense verbs']={sections:[
  ['Find the stem','For a regular verb, remove -en: lernen → lern-. Add the ending for the subject. Lernen means to learn.'],
  ['Regular endings',[
   'ich → lern + -e = lerne — I learn',
   'du → lern + -st = lernst — you learn (one person, informal)',
   'er/sie/es → lern + -t = lernt — he/she/it learns',
   'wir → lern + -en = lernen — we learn',
   'ihr → lern + -t = lernt — you all learn (informal)',
   'sie/Sie → lern + -en = lernen — they learn / you learn (formal)'
  ]],
  ['Use the pattern',['Ich lerne Deutsch. — I am learning German.','Du lernst Deutsch. — You are learning German.','Wir lernen Deutsch. — We are learning German.']],
  ['Some verbs change','Some verbs also change a vowel in the stem with du and er/sie/es. You do not need to memorize those changes here. A later lesson in this module teaches them in “Verbs that change a vowel.”'],
  ['Remember','Choose the subject first, then the ending. Lowercase sie lernt means she learns; sie lernen means they learn. Formal Sie always uses lernen.']
 ],examples:[['Ich lerne Deutsch.','I am learning German.'],['Du lernst Deutsch.','You are learning German.'],['Wir lernen Deutsch.','We are learning German.']],questions:[
  q('Ich ___ Deutsch.',['lerne','lernst','lernt'],'Ich takes -e: ich lerne.'),
  q('Du ___ Deutsch.',['lernst','lernen','lerne'],'Du takes -st: du lernst.'),
  q('Anna lernt Deutsch. Which sentence talks about her?',['Sie lernt Deutsch.','Sie lernen Deutsch.','Du lernst Deutsch.'],'Anna is one person: sie lernt.'),
  q('Wir ___ Deutsch.',['lernen','lernt','lerne'],'Wir takes -en: wir lernen.'),
  q('You are talking to several friends: Ihr ___ Deutsch.',['lernt','lernst','lernen'],'Informal plural ihr takes -t: ihr lernt.'),
  q('Anna und Paul ___ Deutsch.',['lernen','lernt','lernst'],'They are plural: sie lernen.')
 ]};
 const stemTitle='Verbs that change a vowel';
 const stemPack={sections:[
  ['When the vowel changes','Some common present-tense verbs change a vowel in the stem with du and er/sie/es. The normal endings still matter. These changes do not happen with ich, wir, ihr or sie/Sie.'],
  ['e → i: sprechen (to speak)',['ich spreche — I speak','du sprichst — you speak','er/sie/es spricht — he/she/it speaks','wir sprechen — we speak','ihr sprecht — you all speak','sie/Sie sprechen — they speak / you speak (formal)']],
  ['e → ie: lesen (to read)',['ich lese — I read','du liest — you read','er/sie/es liest — he/she/it reads','wir lesen — we read','ihr lest — you all read','sie/Sie lesen — they read / you read (formal)']],
  ['a → ä: fahren (to travel or drive)',['ich fahre — I travel/drive','du fährst — you travel/drive','er/sie/es fährt — he/she/it travels/drives','wir fahren — we travel/drive','ihr fahrt — you all travel/drive','sie/Sie fahren — they travel/drive / you travel/drive (formal)']],
  ['Use them in a sentence',['Du sprichst Deutsch. — You speak German.','Anna liest ein Buch. — Anna is reading a book.','Er fährt nach Berlin. — He is travelling to Berlin.']],
  ['Remember','These patterns apply to particular verbs, not every verb with e or a. Learn each new verb with its du and er/sie/es forms. Ihr does not take the changed vowel: ihr sprecht, ihr lest, ihr fahrt.']
 ],examples:[['Du sprichst Deutsch.','You speak German.'],['Anna liest ein Buch.','Anna is reading a book.'],['Er fährt nach Berlin.','He is travelling to Berlin.']],questions:[
  q('Du ___ Deutsch.',['sprichst','sprechst','sprecht'],'Sprechen changes e to i with du: du sprichst.'),
  q('Anna ___ Deutsch.',['spricht','sprechen','sprichst'],'With Anna (sie), sprechen becomes spricht.'),
  q('Wir ___ Deutsch.',['sprechen','spricht','sprichst'],'Wir keeps the original vowel: wir sprechen.'),
  q('Anna ___ ein Buch.',['liest','lesen','lese'],'Lesen changes e to ie with sie: sie liest.'),
  q('Du ___ ein Buch.',['liest','lest','lese'],'Du uses liest, not lest.'),
  q('Ihr ___ ein Buch.',['lest','liest','lesen'],'Ihr keeps the original vowel and takes -t: ihr lest.'),
  q('Er ___ nach Berlin.',['fährt','fahren','fährst'],'Fahren changes a to ä with er: er fährt.'),
  q('Wir ___ nach Berlin.',['fahren','fährt','fährst'],'Wir keeps a: wir fahren.')
 ]};
 packs['A1|'+stemTitle]=stemPack;
 let stem=id(stemTitle);
 if(stem<0){stem=FULL_UNITS.length;FULL_UNITS.push({level:'A1',title:stemTitle,rule:'Learn present-tense stem-vowel changes with du and er/sie/es.',examples:stemPack.examples,checkpoint:stemPack.questions[0]});}
})();
