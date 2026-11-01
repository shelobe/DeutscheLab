Warning: truncated output (original token count: 70033)
Total output lines: 11512

/* Practical A1 teaching and assessment. Correct options are shuffled at runtime. */
window.DL_A1_PRACTICAL_PACKS = {
 "A1|Greetings and introductions": {
  "sections": [
   [
    "What you will be able to do",
    "Greet someone, give your name and ask theirs."
   ],
   [
    "Choose a greeting",
    [
     "Hallo — hello",
     "Guten Morgen — good morning",
     "Guten Tag — good day",
     "Guten Abend — good evening",
     "Tschüss — bye (informal)",
     "Auf Wiedersehen — goodbye (polite/formal)"
    ]
   ],
   [
    "Names and origins",
    [
     "Ich heiße … — My name is …\nUse it to introduce yourself.",
     "Wie heißt du? — What is your name?\nUse it with one friend or someone you address informally.",
     "Ich komme aus … — I come from …\nUse it to say where you are from."
    ]
   ],
   [
    "Coming up",
    "For now, learn these as complete phrases. In a later lesson, you’ll learn how verbs change depending on who is speaking or acting—for example, ich heiße and du heißt."
   ],
   [
    "Ask how someone is",
    [
     "Wie geht es dir? — How are you?\nUse it with one person you address informally.",
     "Danke, gut. — Fine, thanks.\nUse it to answer how you are."
    ]
   ]
  ],
  "examples": [
   [
    "Ich heiße Lea.",
    "My name is Lea."
   ],
   [
    "Wie heißt du?",
    "What is your name?"
   ],
   [
    "Ich komme aus Kanada.",
    "I come from Canada."
   ],
   [
    "Wie geht es dir?",
    "How are you?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "It is morning. Greet your neighbor.",
    "options": [
     "Guten Morgen!",
     "Guten Abend!",
     "Tschüss!"
    ],
    "answer": 0,
    "why": "Guten Morgen is used in the morning.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "A friend asks “Wie heißt du?” Choose your reply.",
    "options": [
     "Ich heiße Lea.",
     "Guten Abend.",
     "Danke, gut."
    ],
    "answer": 0,
    "why": "Give your name with Ich heiße.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Complete your introduction: Ich ___ Lea.",
    "options": [
     "heiße",
     "geht",
     "aus"
    ],
    "answer": 0,
    "why": "Ich heiße means My name is.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Guten ___! (good morning)",
    "options": [
     "Morgen",
     "Abend",
     "Tag"
    ],
    "answer": 0,
    "why": "Guten Morgen means good morning.",
    "dlSkill": "write",
    "dlWriteAnswer": "Morgen"
   },
   {
    "type": "grammar",
    "prompt": "You are leaving a friend. Choose a goodbye.",
    "options": [
     "Tschüss!",
     "Hallo!",
     "Guten Morgen!"
    ],
    "answer": 0,
    "why": "Tschüss is an informal goodbye.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Wie geht ___ dir?",
    "options": [
     "es",
     "du",
     "aus"
    ],
    "answer": 0,
    "why": "The complete greeting is Wie geht es dir?",
    "dlSkill": "use"
   }
  ]
 },
 "A1|Greetings and goodbyes": {
  "sections": [
   [
    "What you will be able to do",
    "Greet someone, say goodbye, ask how they are, make polite requests, apologize and reply to thanks."
   ],
   [
    "Choose a greeting",
    [
     "Hallo — hello",
     "Guten Morgen — good morning",
     "Guten Tag — good day / hello",
     "Guten Abend — good evening"
    ]
   ],
   [
    "Say goodbye",
    [
     "Tschüss — bye / goodbye (informal)",
     "Bis bald! — See you soon! (friendly, when you expect to meet again)",
     "Auf Wiedersehen — goodbye (polite/formal)"
    ]
   ],
   [
    "Ask how someone is",
    [
     "Wie geht es dir? — How are you?\nUse it with one person you address informally.",
     "Danke, gut. — Fine, thanks.\nUse it to answer how you are."
    ]
   ],
   [
    "Being polite",
    [
     "Danke. — Thank you.\nUse it when someone helps you or gives you something.",
     "Bitte. — Please.\nUse it to make a request: Einen Kaffee, bitte. — A coffee, please.",
     "Entschuldigung. — Excuse me.\nUse it to politely get someone’s attention or to excuse a small interruption.",
     "Es tut mir leid. — I’m sorry.\nUse it to apologize or express regret about something that happened.",
     "Gern geschehen. — You’re welcome.\nUse it as a friendly reply when someone thanks you."
    ]
   ]
  ],
  "examples": [
   [
    "Hallo",
    "Hello"
   ],
   [
    "Guten Morgen",
    "Good morning"
   ],
   [
    "Guten Tag",
    "Good day / hello"
   ],
   [
    "Guten Abend",
    "Good evening"
   ],
   [
    "Tschüss",
    "Bye / goodbye (informal)"
   ],
   [
    "Auf Wiedersehen",
    "Goodbye (polite/formal)"
   ],
   [
    "Bis bald!",
    "See you soon!"
   ],
   [
    "Wie geht es dir?",
    "How are you?"
   ],
   [
    "Danke, gut.",
    "Fine, thanks."
   ],
   [
    "Danke.",
    "Thank you."
   ],
   [
    "Bitte.",
    "Please"
   ],
   [
    "Einen Kaffee, bitte.",
    "A coffee, please."
   ],
   [
    "Entschuldigung.",
    "Excuse me."
   ],
   [
    "Es tut mir leid.",
    "I’m sorry."
   ],
   [
    "Gern geschehen.",
    "You’re welcome."
   ]
  ],
  "questions": [
   {"type":"grammar","prompt":"You expect to see your friend again soon. What do you say as you leave?","options":["Bis bald!","Guten Morgen!","Es tut mir leid."],"answer":0,"why":"Bis bald! means See you soon and is a friendly goodbye.","dlSkill":"situation","dlTopic":"farewell"},
   {
    "type": "grammar",
    "prompt": "It is morning. Greet your neighbor.",
    "options": [
     "Guten Morgen!",
     "Guten Abend!",
     "Tschüss!"
    ],
    "answer": 0,
    "why": "Guten Morgen is a greeting used in the morning.",
    "dlSkill": "situation",
    "dlTopic": "greeting"
   },
   {
    "type": "grammar",
    "prompt": "You finish a formal appointment. Choose a goodbye.",
    "options": [
     "Auf Wiedersehen!",
     "Hallo!",
     "Guten Tag!"
    ],
    "answer": 0,
    "why": "Auf Wiedersehen is a polite goodbye.",
    "dlSkill": "situation",
    "dlTopic": "farewell"
   },
   {
    "type": "grammar",
    "prompt": "A friend asks “Wie geht es dir?” Choose a reply.",
    "options": [
     "Danke, gut.",
     "Auf Wiedersehen.",
     "Guten Morgen."
    ],
    "answer": 0,
    "why": "Danke, gut means Fine, thanks and answers how you are.",
    "dlSkill": "situation",
    "dlTopic": "wellbeing"
   },
   {
    "type": "grammar",
    "prompt": "Someone thanks you. Choose a reply.",
    "options": [
     "Gern geschehen!",
     "Guten Abend!",
     "Tschüss!"
    ],
    "answer": 0,
    "why": "Gern geschehen is a friendly reply to thanks, meaning You’re welcome.",
    "dlSkill": "situation",
    "dlTopic": "thanks-response"
   },
   {
    "type": "grammar",
    "prompt": "You ask for a coffee politely. Complete: Einen Kaffee, ___.",
    "options": [
     "bitte",
     "danke",
     "hallo"
    ],
    "answer": 0,
    "why": "Bitte means please in a request.",
    "dlSkill": "use",
    "dlTopic": "politeness"
   },
   {
    "type": "grammar",
    "prompt": "Write the German word for thank you.",
    "options": [
     "Danke",
     "Bitte",
     "Hallo"
    ],
    "answer": 0,
    "why": "Danke means thank you.",
    "dlSkill": "write",
    "dlWriteAnswer": "Danke",
    "dlTopic": "politeness"
   },
   {
    "type": "grammar",
    "prompt": "You leave a friend. Write the informal goodbye.",
    "options": [
     "Tschüss",
     "Hallo",
     "Danke"
    ],
    "answer": 0,
    "why": "Tschüss is an informal goodbye.",
    "dlSkill": "write",
    "dlWriteAnswer": "Tschüss",
    "dlTopic": "farewell"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the phrase you hear.",
    "options": [
     "Guten Abend",
     "Guten Morgen",
     "Guten Tag"
    ],
    "answer": 0,
    "why": "Guten Abend means good evening.",
    "dlSkill": "listen",
    "dlReviewAudio": "Guten Abend",
    "dlTopic": "greeting"
   },
   {
    "type": "grammar",
    "prompt": "You need to get a stranger’s attention politely. What do you say?",
    "options": [
     "Entschuldigung.",
     "Gern geschehen.",
     "Danke, gut."
    ],
    "answer": 0,
    "why": "Entschuldigung means excuse me and politely gets someone’s attention.",
    "dlSkill": "situation",
    "dlTopic": "excuse-me"
   },
   {
    "type": "grammar",
    "prompt": "You upset a friend and want to apologize. What do you say?",
    "options": [
     "Es tut mir leid.",
     "Gern geschehen.",
     "Guten Morgen."
    ],
    "answer": 0,
    "why": "Es tut mir leid means I’m sorry and expresses regret.",
    "dlSkill": "situation",
    "dlTopic": "apology"
   }
  ]
 },
 "A1|Introducing yourself: heißen and wohnen": {
  "sections": [
   [
    "What you will be able to do",
    "Give and ask for names, say where you live, and choose informal or polite questions."
   ],
   [
    "Names",
    [
     "Ich heiße … — My name is …\nUse it to introduce yourself: Ich heiße Lea.",
     "Wie heißt du? — What is your name?\nUse it with one person you address informally.",
     "Wie heißen Sie? — What is your name?\nUse it politely with a stranger or customer."
    ]
   ],
   [
    "Home",
    [
     "Ich wohne in Berlin. — I live in Berlin.\nUse wohnen in to say where you live now.",
     "Wo wohnst du? — Where do you live?\nUse it with one person you address informally.",
     "Wo wohnen Sie? — Where do you live?\nUse it when addressing someone politely."
    ]
   ],
   [
    "Coming up",
    "For now, learn these as complete phrases. In a later lesson, you’ll learn how verbs change depending on who is speaking or acting—for example, ich heiße and du heißt."
   ]
  ],
  "examples": [
   [
    "Ich heiße Lea.",
    "My name is Lea."
   ],
   [
    "Wie heißt du?",
    "What is your name? (informal)"
   ],
   [
    "Wie heißen Sie?",
    "What is your name? (polite)"
   ],
   [
    "Ich wohne in Berlin.",
    "I live in Berlin."
   ],
   [
    "Wo wohnst du?",
    "Where do you live? (informal)"
   ],
   [
    "Wo wohnen Sie?",
    "Where do you live? (polite)"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "A friend asks “Wie heißt du?” Choose your reply.",
    "options": [
     "Ich heiße Lea.",
     "Ich wohne in Berlin.",
     "Wo wohnst du?"
    ],
    "answer": 0,
    "why": "Ich heiße Lea gives your name.",
    "dlSkill": "situation",
    "dlTopic": "names"
   },
   {
    "type": "grammar",
    "prompt": "Ask a stranger their name politely.",
    "options": [
     "Wie heißen Sie?",
     "Wie heißt du?",
     "Ich wohne in Berlin."
    ],
    "answer": 0,
    "why": "Use Wie heißen Sie? to ask a name politely.",
    "dlSkill": "situation",
    "dlTopic": "names"
   },
   {
    "type": "grammar",
    "prompt": "A form asks where you live now. Which sentence supplies that information?",
    "options": [
     "Ich wohne in Berlin.",
     "Ich heiße Lea.",
     "Wie heißt du?"
    ],
    "answer": 0,
    "why": "Wohnen describes your current home.",
    "dlSkill": "situation",
    "dlTopic": "home"
   },
   {
    "type": "grammar",
    "prompt": "Ask a stranger where they live politely.",
    "options": [
     "Wo wohnen Sie?",
     "Wo wohnst du?",
     "Wie heißen Sie?"
    ],
    "answer": 0,
    "why": "Wo wohnen Sie? asks where someone lives using polite Sie.",
    "dlSkill": "situation",
    "dlTopic": "home"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich ___ Lea. (My name is Lea.)",
    "options": [
     "heiße",
     "wohne",
     "heißt"
    ],
    "answer": 0,
    "why": "Ich heiße is the phrase for introducing your name.",
    "dlSkill": "write",
    "dlWriteAnswer": "heiße",
    "dlTopic": "names"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the meaning of the sentence.",
    "options": [
     "I live in Berlin.",
     "My name is Lea.",
     "Where do you live?"
    ],
    "answer": 0,
    "why": "Ich wohne in Berlin gives the speaker’s current home.",
    "dlSkill": "listen",
    "dlReviewAudio": "Ich wohne in Berlin.",
    "dlTopic": "home"
   }
  ]
 },
 "A1|Countries, nationalities and languages": {
  "sections": [
   [
    "What you will be able to do",
    "Say where you come from, describe your nationality, and ask and answer which languages someone speaks."
   ],
   [
    "Where are you from?",
    [
     "Ich komme aus Kanada. — I come from Canada.\nUse kommen aus to say where you are from.",
     "Woher kommst du? — Where are you from?\nUse it with one person you address informally.",
     "Woher kommen Sie? — Where are you from?\nUse it when addressing someone politely.",
     "Ich komme aus Deutschland. — I come from Germany.",
     "Ich komme aus den USA. — I come from the USA."
    ]
   ],
   [
    "What does woher mean?",
    [
     "Woher? — Where … from?",
     "Woher kommst du? asks where you are from, rather than where you live.",
     "For now, learn this as a complete question. A later lesson explains question words and how to build your own questions."
    ]
   ],
   [
    "Example languages",
    [
     "Deutsch — German",
     "Englisch — English",
     "Französisch — French"
    ]
   ],
   [
    "Talk about the languages you speak",
    [
     "Ich spreche … — I speak …",
     "Ich spreche Englisch. — I speak English.",
     "Welche Sprachen sprichst du? — Which languages do you speak?",
     "Sprichst du Englisch? — Do you speak English?",
     "Ja, ich spreche Englisch. — Yes, I speak English."
    ]
   ],
   [
    "Coming up",
    "Some German verbs change their vowel with du and er/sie/es. With sprechen, e changes to i: ich spreche → du sprichst. For now, learn these as useful phrases. A later lesson explains this pattern and gives you more practice."
   ],
   [
    "Nationality",
    [
     "Ich bin Amerikanerin. — I am an American woman.",
     "Ich bin Amerikaner. — I am an American man.",
     "German nationality nouns and language names begin with capital letters."
    ]
   ],
   [
    "A note on noun endings",
    [
     "Amerikaner refers to a man; Amerikanerin refers to a woman. Here, adding -in changes the noun to the female form.",
     "The later Work and occupations lesson explains this common pattern with more examples and practice."
    ]
   ],
   [
    "Where you live versus where you are from",
    "Ich komme aus Kanada, aber ich wohne in Berlin. — I come from Canada, but I live in Berlin.\n\nYour origin and your current home can be different. Aber means but."
   ]
  ],
  "examples": [
   [
    "Ich komme aus Deutschland.",
    "I come from Germany."
   ],
   [
    "Ich komme aus Kanada.",
    "I come from Canada."
   ],
   [
    "Ich komme aus den USA.",
    "I come from the USA."
   ],
   [
    "Woher kommst du?",
    "Where are you from?"
   ],
   [
    "Deutsch",
    "German"
   ],
   [
    "Englisch",
    "English"
   ],
   [
    "Französisch",
    "French"
   ],
   [
    "Ich spreche Englisch.",
    "I speak English."
   ],
   [
    "Ich bin Amerikanerin.",
    "I am an American woman."
   ],
   [
    "Ich bin Amerikaner.",
    "I am an American man."
   ],
   [
    "Welche Sprachen sprichst du?",
    "Which languages do you speak?"
   ],
   [
    "Sprichst du Englisch?",
    "Do you speak English?"
   ],
   [
    "Ja, ich spreche Englisch.",
    "Yes, I speak English."
   ],
   [
    "Woher kommen Sie?",
    "Where are you from? (polite)"
   ],
   [
    "Ich komme aus Kanada, aber ich wohne in Berlin.",
    "I come from Canada, but I live in Berlin."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Someone asks “Woher kommst du?” Choose an answer.",
    "options": [
     "Ich komme aus Kanada.",
     "Ich wohne hier.",
     "Ich heiße Lea."
    ],
    "answer": 0,
    "why": "Woher asks your origin.",
    "dlSkill": "situation",
    "dlTopic": "country-origin"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Ich komme ___ Deutschland.",
    "options": [
     "aus",
     "in",
     "wie"
    ],
    "answer": 0,
    "why": "Aus gives origin.",
    "dlSkill": "use",
    "dlTopic": "country-origin"
   },
   {
    "type": "grammar",
    "prompt": "Write the German language name for English.",
    "options": [
     "Englisch",
     "Deutsch",
     "Französisch"
    ],
    "answer": 0,
    "why": "Englisch means English.",
    "dlSkill": "write",
    "dlWriteAnswer": "Englisch",
    "dlTopic": "languages"
   },
   {
    "type": "grammar",
    "prompt": "Ask a friend which languages they speak.",
    "options": [
     "Welche Sprachen sprichst du?",
     "Woher kommst du?",
     "Wie heißt du?"
    ],
    "answer": 0,
    "why": "Welche Sprachen sprichst du? asks which languages someone speaks.",
    "dlTopic": "languages",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "A friend asks “Sprichst du Englisch?” Choose a suitable reply.",
    "options": [
     "Ja, ich spreche Englisch.",
     "Ich komme aus Kanada.",
     "Ich heiße Lea."
    ],
    "answer": 0,
    "why": "Answer the language question with Ja, ich spreche Englisch.",
    "dlTopic": "languages",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Ask a friend where they are from.",
    "options": [
     "Woher kommst du?",
     "Wo wohnst du?",
     "Wie heißt du?"
    ],
    "answer": 0,
    "why": "Woher kommst du? asks about origin; Wo wohnst du? asks about current home.",
    "dlSkill": "situation",
    "dlTopic": "country-origin"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich komme ___ Kanada.",
    "options": [
     "aus",
     "in",
     "wie"
    ],
    "answer": 0,
    "why": "Ich komme aus gives your origin.",
    "dlSkill": "write",
    "dlWriteAnswer": "aus",
    "dlTopic": "country-origin"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the meaning of the sentence.",
    "options": [
     "I come from Canada, but I live in Berlin.",
     "I live in Canada, but I come from Berlin.",
     "My name is Lea and I live in Berlin."
    ],
    "answer": 0,
    "why": "Komme aus gives origin; wohne in gives current home. Aber means but.",
    "dlSkill": "listen",
    "dlReviewAudio": "Ich komme aus Kanada, aber ich wohne in Berlin.",
    "dlTopic": "country-origin"
   }
  ]
 },
 "A1|Personal pronouns: we, you all, they": {
  "sections": [
    [
      "Who is in the group?",
      [
        "wir — we: you include yourself and at least one other person.",
        "ihr — you all: you speak directly to several people informally.",
        "sie — they: you talk about other people as a group."
      ]
    ],
    [
      "Choose by your role",
      [
        "You and Paul talk about yourselves → wir (we).",
        "You speak to Anna and Paul, your friends → ihr (you all).",
        "You tell someone about Anna and Paul → sie (they)."
      ]
    ],
    [
      "Remember",
      [
        "Lowercase sie can mean she (Lesson 2) or they (this lesson). Anna → sie (she); Anna und Paul → sie (they).",
        "Formal Sie means polite you for one person or several (Lesson 1). It is not the same as lowercase sie meaning they. At the start of a sentence both are capitalized, so use context.",
        "Verb endings are taught in the regular-verb lesson; here, focus on who is speaking, being addressed or being discussed."
      ]
    ]
  ],
  "examples": [
    [
      "wir",
      "we"
    ],
    [
      "ihr",
      "you all (informal)"
    ],
    [
      "sie",
      "they"
    ]
  ],
  "questions": [
    {
      "type": "grammar",
      "prompt": "You and Paul are talking about yourselves. Choose the pronoun.",
      "options": [
        "wir",
        "ihr",
        "sie"
      ],
      "answer": 0,
      "why": "Wir includes the speaker.",
      "dlSkill": "use"
    },
    {
      "type": "grammar",
      "prompt": "You speak informally to two friends. Choose the pronoun.",
      "options": [
        "ihr",
        "du",
        "wir"
      ],
      "answer": 0,
      "why": "Ihr addresses several people informally.",
      "dlSkill": "use"
    },
    {
      "type": "grammar",
      "prompt": "You talk about Anna and Paul, who are not in your group. Choose the pronoun.",
      "options": [
        "sie",
        "wir",
        "ich"
      ],
      "answer": 0,
      "why": "Lowercase sie means they when referring to Anna and Paul together.",
      "dlSkill": "use"
    },
    {
      "type": "grammar",
      "prompt": "Write the German pronoun for we.",
      "options": [
        "wir",
        "ihr",
        "sie"
      ],
      "answer": 0,
      "why": "Wir means we.",
      "dlSkill": "write",
      "dlWriteAnswer": "wir"
    },
    {
      "type": "grammar",
      "prompt": "You politely address two customers. Which pronoun fits?",
      "options": [
        "Sie",
        "ihr",
        "sie"
      ],
      "answer": 0,
      "why": "Use formal Sie for polite address, whether one person or several. Ihr is informal; lowercase sie means they.",
      "dlSkill": "use"
    },
    {
      "type": "grammar",
      "prompt": "Anna and Paul are talking about themselves. Which German pronoun means we?",
      "options": [
        "wir",
        "ihr",
        "sie"
      ],
      "answer": 0,
      "why": "From their own perspective they use wir. Someone else talking about them would use sie.",
      "dlSkill": "use"
    }
  ]
},
 "A1|The verb sein: to be": {
  "sections": [
   [
    "What you will be able to do",
    "Say who someone is, how they feel and where they are."
   ],
   [
    "Forms of sein",
    [
     "ich bin — I am",
     "du bist — you are",
     "er/sie/es ist — he/she/it is",
     "wir sind — we are",
     "ihr seid — you all are",
     "sie/Sie sind — they are / formal you are"
    ]
   ],
   [
    "Useful descriptions",
    [
     "hier — here",
     "müde — tired",
     "zu Hause — at home",
     "Wir sind zu Hause. — We are at home."
    ]
   ],
   [
    "Useful examples",
    [
     "Ich bin müde. — I am tired.",
     "Du bist hier. — You are here.",
     "Anna ist hier. — Anna is here."
    ]
   ]
  ],
  "examples": [
   [
    "Ich bin müde.",
    "I am tired."
   ],
   [
    "Du bist hier.",
    "You are here."
   ],
   [
    "Anna ist hier.",
    "Anna is here."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Ich ___ müde.",
    "options": [
     "bin",
     "bist",
     "ist"
    ],
    "answer": 0,
    "why": "Ich uses bin.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Du ___ hier.",
    "options": [
     "bist",
     "bin",
     "seid"
    ],
    "answer": 0,
    "why": "Du uses bist.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Wir ___ zu Hause.",
    "options": [
     "sind",
     "ist",
     "seid"
    ],
    "answer": 0,
    "why": "Wir uses sind.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ihr ___ hier.",
    "options": [
     "seid",
     "sind",
     "bist"
    ],
    "answer": 0,
    "why": "Ihr uses seid.",
    "dlSkill": "write",
    "dlWriteAnswer": "seid"
   },
   {
    "type": "grammar",
    "prompt": "Anna and Paul are both here. Which sentence fits?",
    "options": [
     "Sie sind hier.",
     "Sie ist hier.",
     "Ich bin hier."
    ],
    "answer": 0,
    "why": "They are plural: sie sind.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Address a customer politely: Sie ___ hier.",
    "options": [
     "sind",
     "seid",
     "ist"
    ],
    "answer": 0,
    "why": "Formal Sie uses sind.",
    "dlSkill": "use"
   }
  ]
 },
 "A1|The verb haben: to have": {
  "sections": [
   [
    "What you will be able to do",
    "Say what you have or need in simple everyday situations."
   ],
   [
    "Forms of haben",
    [
     "ich habe — I have",
     "du hast — you have",
     "er/sie/es hat — he/she/it has",
     "wir haben — we have",
     "ihr habt — you all have",
     "sie/Sie haben — they have / formal you have"
    ]
   ],
   [
    "Useful phrases",
    [
     "Zeit haben — to have time",
     "Hunger haben — to be hungry",
     "Durst haben — to be thirsty",
     "Ich habe Zeit. — I have time."
    ]
   ],
   [
    "Useful examples",
    [
     "Hast du Zeit? — Do you have time?",
     "Ich habe Hunger. — I am hungry.",
     "Wir haben Durst. — We are thirsty."
    ]
   ]
  ],
  "examples": [
   [
    "Hast du Zeit?",
    "Do you have time?"
   ],
   [
    "Ich habe Hunger.",
    "I am hungry."
   ],
   [
    "Wir haben Durst.",
    "We are thirsty."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Du ___ Zeit.",
    "options": [
     "hast",
     "habe",
     "hat"
    ],
    "answer": 0,
    "why": "Du uses hast.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Anna ___ Hunger.",
    "options": [
     "hat",
     "hast",
     "haben"
    ],
    "answer": 0,
    "why": "Anna is one person: sie hat.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Wir ___ Durst.",
    "options": [
     "haben",
     "habt",
     "hat"
    ],
    "answer": 0,
    "why": "Wir uses haben.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ihr ___ Zeit.",
    "options": [
     "habt",
     "haben",
     "hast"
    ],
    "answer": 0,
    "why": "Ihr uses habt.",
    "dlSkill": "write",
    "dlWriteAnswer": "habt"
   },
   {
    "type": "grammar",
    "prompt": "You want a drink. Which phrase explains why?",
    "options": [
     "Ich habe Durst.",
     "Ich habe Zeit.",
     "Ich bin hier."
    ],
    "answer": 0,
    "why": "Durst means thirst.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "A stranger asks “Haben Sie Zeit?” What are they asking?",
    "options": [
     "Whether you have time",
     "Where you live",
     "Your name"
    ],
    "answer": 0,
    "why": "Zeit haben means to have time.",
    "dlSkill": "reading"
   }
  ]
 },
 "A1|Nouns and articles": {
  "sections": [
   [
    "What you will be able to do",
    "Learn nouns with der, die or das before changing their forms."
   ],
   [
    "Learn the whole word",
    [
     "der Tisch — table",
     "die Lampe — lamp",
     "das Buch — book"
    ]
   ],
   [
    "German noun gender",
    "Der is masculine, die is feminine and das is neuter. These are grammatical categories; the article is part of the vocabulary item. All German nouns begin with a capital letter."
   ],
   [
    "One and several",
    "Ein Tisch means a table; eine Lampe means a lamp; ein Buch means a book. In the subject form, plural nouns use die: die Bücher (the books)."
   ],
   [
    "Useful examples",
    [
     "Das ist ein Buch. — That is a book.",
     "Die Lampe ist neu. — The lamp is new."
    ]
   ]
  ],
  "examples": [
   [
    "Das ist ein Buch.",
    "That is a book."
   ],
   [
    "Die Lampe ist neu.",
    "The lamp is new."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Choose the complete word for the book.",
    "options": [
     "das Buch",
     "der Buch",
     "die Buch"
    ],
    "answer": 0,
    "why": "Learn Buch with das.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Das ist ___ Lampe.",
    "options": [
     "eine",
     "ein",
     "einen"
    ],
    "answer": 0,
    "why": "Lampe is feminine: eine Lampe.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Which spelling is suitable in a German sentence?",
    "options": [
     "das Buch",
     "das buch",
     "Das buch"
    ],
    "answer": 0,
    "why": "Nouns such as Buch are capitalized.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the article for Tisch in its basic subject form.",
    "options": [
     "der",
     "die",
     "das"
    ],
    "answer": 0,
    "why": "Tisch is learned with der.",
    "dlSkill": "write",
    "dlWriteAnswer": "der"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Die Lampe ist neu.” What is new?",
    "options": [
     "The lamp",
     "The book",
     "The table"
    ],
    "answer": 0,
    "why": "Die Lampe means the lamp.",
    "dlSkill": "reading"
   }
  ]
 },
 "A1|Common nouns and their articles": {
  "sections": [
   [
    "What you will be able to do",
    "Use common household nouns and a few helpful gender patterns."
   ],
   [
    "Useful nouns",
    [
     "der Tisch — table",
     "der Stuhl — chair",
     "die Tür — door",
     "das Buch — book"
    ]
   ],
   [
    "Helpful ending patterns",
    [
     "-ung, -heit, -keit and -schaft are feminine: die Einladung (invitation), die Freiheit (freedom), die Möglichkeit (possibility), die Freundschaft (friendship).",
     "Diminutives ending in -chen are neuter: das Brötchen (bread roll), das Häuschen (little house).",
     "Many words ending in -um or -ment are neuter: das Museum, das Instrument. This is a clue, not a rule for every possible noun."
    ]
   ],
   [
    "Use gender as a tool",
    "Start by learning each noun with its article. The patterns can help when you encounter a new word, but avoid guessing from an English translation."
   ],
   [
    "Useful examples",
    [
     "Die Tür ist offen. — The door is open.",
     "Der Stuhl ist neu. — The chair is new."
    ]
   ]
  ],
  "examples": [
   [
    "Die Tür ist offen.",
    "The door is open."
   ],
   [
    "Der Stuhl ist neu.",
    "The chair is new."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: ___ Tür ist offen.",
    "options": [
     "Die",
     "Der",
     "Das"
    ],
    "answer": 0,
    "why": "Tür is feminine.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the article for Einladung (invitation).",
    "options": [
     "die",
     "der",
     "das"
    ],
    "answer": 0,
    "why": "The noun ending -ung is feminine.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the article for Brötchen (bread roll).",
    "options": [
     "das",
     "die",
     "der"
    ],
    "answer": 0,
    "why": "The diminutive ending -chen is neuter.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the basic article for Stuhl.",
    "options": [
     "der",
     "die",
     "das"
    ],
    "answer": 0,
    "why": "Stuhl is masculine.",
    "dlSkill": "write",
    "dlWriteAnswer": "der"
   },
   {
    "type": "grammar",
    "prompt": "You are visiting a museum. Which spelling fits?",
    "options": [
     "das Museum",
     "die Museum",
     "der Museum"
    ],
    "answer": 0,
    "why": "Museum is neuter.",
    "dlSkill": "use"
   }
  ]
 },
 "A1|Plural nouns": {
  "sections": [
   [
    "What you will be able to do",
    "Recognize and use the plural of familiar nouns."
   ],
   [
    "Learn these pairs",
    [
     "der Tisch → die Tische — table → tables",
     "die Frau → die Frauen — woman → women",
     "das Kind → die Kinder — child → children",
     "das Auto → die Autos — car → cars",
     "das Buch → die Bücher — book → books"
    ]
   ],
   [
    "There is no single ending",
    "German plurals can add -e, -(e)n, -er or -s; some change the vowel. Learn the plural with each noun. The basic plural article is die."
   ],
   [
    "Useful examples",
    [
     "Zwei Kinder sind hier. — Two children are here.",
     "Die Bücher sind neu. — The books are new."
    ]
   ]
  ],
  "examples": [
   [
    "Zwei Kinder sind hier.",
    "Two children are here."
   ],
   [
    "Die Bücher sind neu.",
    "The books are new."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: ein Kind, zwei ___.",
    "options": [
     "Kinder",
     "Kind",
     "Kindes"
    ],
    "answer": 0,
    "why": "The plural is Kinder.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: ein Auto, drei ___.",
    "options": [
     "Autos",
     "Autoen",
     "Auto"
    ],
    "answer": 0,
    "why": "The plural is Autos.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the phrase for the books.",
    "options": [
     "die Bücher",
     "das Bücher",
     "der Bücher"
    ],
    "answer": 0,
    "why": "The plural of Buch is Bücher with die.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the plural of Tisch.",
    "options": [
     "Tische",
     "Tisch",
     "Tischen"
    ],
    "answer": 0,
    "why": "Learn der Tisch → die Tische.",
    "dlSkill": "write",
    "dlWriteAnswer": "Tische"
   }
  ]
 },
 "A1|Pronouns for animals and objects": {
  "sections": [
   [
    "What you will be able to do",
    "Refer back to a known noun without repeating it."
   ],
   [
    "The basic subject pattern",
    [
     "der Tisch → er — it",
     "die Lampe → sie — it",
     "das Buch → es — it"
    ]
   ],
   [
    "Meaning and grammar",
    "English often uses it for all three. In German, the noun’s article guides the subject pronoun. For a known animal, speakers may also refer to its sex."
   ],
   [
    "Examples to follow",
    [
     "Der Tisch ist neu. Er ist groß. — The table is new. It is big.",
     "Die Lampe ist hell. Sie ist neu. — The lamp is bright. It is new.",
     "Das Buch ist neu. Es ist interessant. — The book is new. It is interesting."
    ]
   ],
   [
    "Useful examples",
    [
     "Die Tür ist offen. Sie ist groß. — The door is open. It is big."
    ]
   ]
  ],
  "examples": [
   [
    "Die Tür ist offen. Sie ist groß.",
    "The door is open. It is big."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Die Lampe ist hell. ___ ist neu.",
    "options": [
     "Sie",
     "Er",
     "Es"
    ],
    "answer": 0,
    "why": "Lampe is feminine: sie.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Der Tisch ist groß. ___ ist neu.",
    "options": [
     "Er",
     "Sie",
     "Es"
    ],
    "answer": 0,
    "why": "Tisch is masculine: er.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Das Buch ist neu. ___ ist interessant.",
    "options": [
     "Es",
     "Er",
     "Sie"
    ],
    "answer": 0,
    "why": "Buch is neuter: es.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the pronoun replacing das Buch as the subject.",
    "options": [
     "es",
     "er",
     "sie"
    ],
    "answer": 0,
    "why": "Das becomes es as a subject pronoun.",
    "dlSkill": "write",
    "dlWriteAnswer": "es"
   }
  ]
 },
 "A1|Numbers: zero through ten": {
  "sections": [
   [
    "What you will be able to do",
    "Use these numbers for real quantities and amounts."
   ],
   [
    "Numbers to learn",
    [
     "null 0 · eins 1 · zwei 2 · drei 3 · vier 4",
     "fünf 5 · sechs 6 · sieben 7 · acht 8 · neun 9 · zehn 10"
    ]
   ],
   [
    "Useful examples",
    [
     "zwei Bücher — two books",
     "drei Euro — three euros"
    ]
   ]
  ],
  "examples": [
   [
    "zwei Bücher",
    "two books"
   ],
   [
    "drei Euro",
    "three euros"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You need two tickets. Choose the quantity.",
    "options": [
     "zwei",
     "drei",
     "zehn"
    ],
    "answer": 0,
    "why": "Zwei is two.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "A price is 5 €. Which word matches?",
    "options": [
     "fünf",
     "vier",
     "neun"
    ],
    "answer": 0,
    "why": "Fünf is five.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the German number for 8.",
    "options": [
     "acht",
     "neun",
     "eins"
    ],
    "answer": 0,
    "why": "Acht is eight.",
    "dlSkill": "write",
    "dlWriteAnswer": "acht"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the number.",
    "options": [
     "three",
     "two",
     "ten"
    ],
    "answer": 0,
    "why": "Drei means three.",
    "dlSkill": "listening",
    "dlReviewAudio": "drei"
   }
  ]
 },
 "A1|Numbers: eleven through twenty": {
  "sections": [
   [
    "What you will be able to do",
    "Use these numbers for real quantities and amounts."
   ],
   [
    "Numbers to learn",
    [
     "elf 11 · zwölf 12 · dreizehn 13 · vierzehn 14 · fünfzehn 15",
     "sechzehn 16 · siebzehn 17 · achtzehn 18 · neunzehn 19 · zwanzig 20",
     "Eleven and twelve have special forms. From 13–19, notice -zehn. Sixteen and seventeen shorten sechs and sieben."
    ]
   ],
   [
    "Useful examples",
    [
     "zwölf Euro — twelve euros",
     "siebzehn Jahre — seventeen years"
    ]
   ]
  ],
  "examples": [
   [
    "zwölf Euro",
    "twelve euros"
   ],
   [
    "siebzehn Jahre",
    "seventeen years"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "A ticket costs 12 €. Choose the amount.",
    "options": [
     "zwölf Euro",
     "zwanzig Euro",
     "zwei Euro"
    ],
    "answer": 0,
    "why": "Zwölf is twelve.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the spelling of 16.",
    "options": [
     "sechzehn",
     "sechszehn",
     "siebzehn"
    ],
    "answer": 0,
    "why": "Sechzehn drops the s from sechs.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the German number for 20.",
    "options": [
     "zwanzig",
     "zwölf",
     "zehn"
    ],
    "answer": 0,
    "why": "Zwanzig is twenty.",
    "dlSkill": "write",
    "dlWriteAnswer": "zwanzig"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the number.",
    "options": [
     "seventeen",
     "seven",
     "sixteen"
    ],
    "answer": 0,
    "why": "Siebzehn means seventeen.",
    "dlSkill": "listening",
    "dlReviewAudio": "siebzehn"
   }
  ]
 },
 "A1|Numbers: twenty-one through one hundred": {
  "sections": [
   [
    "What you will be able to do",
    "Use these numbers for real quantities and amounts."
   ],
   [
    "Numbers to learn",
    [
     "zwanzig 20 · dreißig 30 · vierzig 40 · fünfzig 50",
     "sechzig 60 · siebzig 70 · achtzig 80 · neunzig 90 · hundert 100",
     "For 21–99 say ones + und + tens: 24 = vierundzwanzig. Use ein rather than eins inside einundzwanzig."
    ]
   ],
   [
    "Useful examples",
    [
     "einundzwanzig — twenty-one",
     "zweiunddreißig — thirty-two",
     "vierundzwanzig Euro — twenty-four euros"
    ]
   ]
  ],
  "examples": [
   [
    "einundzwanzig",
    "twenty-one"
   ],
   [
    "zweiunddreißig",
    "thirty-two"
   ],
   [
    "vierundzwanzig Euro",
    "twenty-four euros"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "A price is 24 €. Which amount matches?",
    "options": [
     "vierundzwanzig Euro",
     "zweiundvierzig Euro",
     "vierzehn Euro"
    ],
    "answer": 0,
    "why": "German puts the ones before the tens.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Read: “zweiunddreißig”. Which number is it?",
    "options": [
     "32",
     "23",
     "13"
    ],
    "answer": 0,
    "why": "Zwei plus und plus dreißig is 32.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Write the German number for 21.",
    "options": [
     "einundzwanzig",
     "einsundzwanzig",
     "zwanzigeins"
    ],
    "answer": 0,
    "why": "The compound begins ein-, not eins-.",
    "dlSkill": "write",
    "dlWriteAnswer": "einundzwanzig"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the number.",
    "options": [
     "forty",
     "fourteen",
     "four"
    ],
    "answer": 0,
    "why": "Vierzig means forty.",
    "dlSkill": "listening",
    "dlReviewAudio": "vierzig"
   }
  ]
 },
 "A1|Numbers and ages": {
  "sections": [
   [
    "What you will be able to do",
    "Give your age and ask someone else theirs."
   ],
   [
    "Age uses sein",
    [
     "Ich bin zwanzig Jahre alt. — I am twenty years old.",
     "Wie alt bist du? — How old are you?",
     "Er ist zwölf Jahre alt. — He is twelve years old."
    ]
   ],
   [
    "Give a number",
    "Use the number vocabulary from the preceding lessons. Zwanzig is 20, zwölf is 12, einundzwanzig is 21. Do not use haben to state an age."
   ],
   [
    "Useful examples",
    [
     "Ich bin einundzwanzig Jahre alt. — I am twenty-one years old."
    ]
   ]
  ],
  "examples": [
   [
    "Ich bin einundzwanzig Jahre alt.",
    "I am twenty-one years old."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Ich ___ zwanzig Jahre alt.",
    "options": [
     "bin",
     "habe",
     "hat"
    ],
    "answer": 0,
    "why": "German uses sein for age.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Ask a friend their age.",
    "options": [
     "Wie alt bist du?",
     "Wie heißt du?",
     "Wo wohnst du?"
    ],
    "answer": 0,
    "why": "Wie alt asks how old.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Er ist zwölf Jahre alt.” How old is he?",
    "options": [
     "12",
     "20",
     "21"
    ],
    "answer": 0,
    "why": "Zwölf means twelve.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich bin zwanzig Jahre ___.",
    "options": [
     "alt",
     "Zeit",
     "Hunger"
    ],
    "answer": 0,
    "why": "Jahre alt means years old.",
    "dlSkill": "write",
    "dlWriteAnswer": "alt"
   }
  ]
 },
 "A1|Question words: who, what, where": {
  "sections": [
   [
    "What you will be able to do",
    "Ask for the specific information you need."
   ],
   [
    "Question words",
    [
     "wer — who",
     "was — what",
     "wo — where"
    ]
   ],
   [
    "Question order",
    "Put the question word first, the verb next and then the subject. Learn the examples as complete useful questions."
   ],
   [
    "Useful examples",
    [
     "Wer ist das? — Who is that?",
     "Was ist das? — What is that?",
     "Wo wohnst du? — Where do you live?"
    ]
   ]
  ],
  "examples": [
   [
    "Wer ist das?",
    "Who is that?"
   ],
   [
    "Was ist das?",
    "What is that?"
   ],
   [
    "Wo wohnst du?",
    "Where do you live?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You want to ask who. Choose the question word.",
    "options": [
     "wer",
     "was",
     "wo"
    ],
    "answer": 0,
    "why": "Wer asks who.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask what. Choose the question word.",
    "options": [
     "was",
     "wer",
     "wo"
    ],
    "answer": 0,
    "why": "Was asks what.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask where. Choose the question word.",
    "options": [
     "wo",
     "wer",
     "was"
    ],
    "answer": 0,
    "why": "Wo asks where.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the first word of this question: Who is that?",
    "options": [
     "wer",
     "was",
     "wo"
    ],
    "answer": 0,
    "why": "Use wer for who.",
    "dlSkill": "write",
    "dlWriteAnswer": "wer"
   }
  ]
 },
 "A1|Question words: when, why, how": {
  "sections": [
   [
    "What you will be able to do",
    "Ask for the specific information you need."
   ],
   [
    "Question words",
    [
     "wann — when",
     "warum — why",
     "wie — how"
    ]
   ],
   [
    "Question order",
    "Put the question word first, the verb next and then the subject. Learn the examples as complete useful questions."
   ],
   [
    "Useful examples",
    [
     "Wann kommst du? — When are you coming?",
     "Warum lernst du Deutsch? — Why are you learning German?",
     "Wie geht es dir? — How are you?"
    ]
   ]
  ],
  "examples": [
   [
    "Wann kommst du?",
    "When are you coming?"
   ],
   [
    "Warum lernst du Deutsch?",
    "Why are you learning German?"
   ],
   [
    "Wie geht es dir?",
    "How are you?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You want to ask when. Choose the question word.",
    "options": [
     "wann",
     "warum",
     "wie"
    ],
    "answer": 0,
    "why": "Wann asks when.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask why. Choose the question word.",
    "options": [
     "warum",
     "wann",
     "wie"
    ],
    "answer": 0,
    "why": "Warum asks why.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask how. Choose the question word.",
    "options": [
     "wie",
     "wann",
     "warum"
    ],
    "answer": 0,
    "why": "Wie asks how.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the first word of this question: When are you coming?",
    "options": [
     "wann",
     "warum",
     "wie"
    ],
    "answer": 0,
    "why": "Use wann for when.",
    "dlSkill": "write",
    "dlWriteAnswer": "wann"
   }
  ]
 },
 "A1|Question words: where from and where to": {
  "sections": [
   [
    "What you will be able to do",
    "Ask for the specific information you need."
   ],
   [
    "Question words",
    [
     "wo — where",
     "woher — where from",
     "wohin — where to"
    ]
   ],
   [
    "Question order",
    "Put the question word first, the verb next and then the subject. Learn the examples as complete useful questions."
   ],
   [
    "Useful examples",
    [
     "Wo bist du? — Where are you?",
     "Woher kommst du? — Where are you from?",
     "Wohin gehst du? — Where are you going?"
    ]
   ]
  ],
  "examples": [
   [
    "Wo bist du?",
    "Where are you?"
   ],
   [
    "Woher kommst du?",
    "Where are you from?"
   ],
   [
    "Wohin gehst du?",
    "Where are you going?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You want to ask where. Choose the question word.",
    "options": [
     "wo",
     "woher",
     "wohin"
    ],
    "answer": 0,
    "why": "Wo asks where.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask where from. Choose the question word.",
    "options": [
     "woher",
     "wo",
     "wohin"
    ],
    "answer": 0,
    "why": "Woher asks where from.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You want to ask where to. Choose the question word.",
    "options": [
     "wohin",
     "wo",
     "woher"
    ],
    "answer": 0,
    "why": "Wohin asks where to.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the first word of this question: Where are you?",
    "options": [
     "wo",
     "woher",
     "wohin"
    ],
    "answer": 0,
    "why": "Use wo for where.",
    "dlSkill": "write",
    "dlWriteAnswer": "wo"
   }
  ]
 },
 "A1|Questions and answers": {
  "sections": [
   [
    "What you will be able to do",
    "Ask and answer both information questions and yes/no questions."
   ],
   [
    "Information questions",
    "Question word + verb + subject: Wo wohnst du? — Where do you live?"
   ],
   [
    "Yes/no questions",
    "Start with the verb: Hast du Zeit? — Do you have time? Answer Ja, ich habe Zeit or Nein, ich habe keine Zeit. Ja is yes; nein is no."
   ],
   [
    "Match the reply",
    [
     "Wie heißt du? → Ich heiße Lea.",
     "Wo wohnst du? → Ich wohne in Berlin.",
     "Wann kommst du? → Am Montag. (On Monday.)"
    ]
   ],
   [
    "Useful examples",
    [
     "Hast du Zeit? — Do you have time?",
     "Ja, ich habe Zeit. — Yes, I have time."
    ]
   ]
  ],
  "examples": [
   [
    "Hast du Zeit?",
    "Do you have time?"
   ],
   [
    "Ja, ich habe Zeit.",
    "Yes, I have time."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Someone asks “Wo wohnst du?” Choose the answer.",
    "options": [
     "Ich wohne in Berlin.",
     "Ich heiße Lea.",
     "Ja, ich habe Zeit."
    ],
    "answer": 0,
    "why": "Wo asks where.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Choose the question asking whether a friend has time.",
    "options": [
     "Hast du Zeit?",
     "Du hast Zeit?",
     "Wo hast du Zeit?"
    ],
    "answer": 0,
    "why": "A neutral yes/no question starts with the verb.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Wie heißt du? — Ich heiße Lea.” What information was requested?",
    "options": [
     "A name",
     "A city",
     "A time"
    ],
    "answer": 0,
    "why": "Wie heißt du asks a name.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: ___ du Zeit?",
    "options": [
     "Hast",
     "Haben",
     "Hat"
    ],
    "answer": 0,
    "why": "The question is Hast du Zeit?",
    "dlSkill": "write",
    "dlWriteAnswer": "Hast"
   }
  ]
 },
 "A1|Negation: nicht and kein": {
  "sections": [
   [
    "What you will be able to do",
    "Say no, say what you do not have, and correct a description."
   ],
   [
    "Nicht",
    [
     "Ich komme nicht. — I am not coming.",
     "Das ist nicht teuer. — That is not expensive.",
     "Ich wohne nicht in Berlin. — I do not live in Berlin."
    ]
   ],
   [
    "Kein with a noun",
    [
     "Das ist kein Buch. — That is not a book.",
     "Ich habe kein Auto. — I do not have a car.",
     "Das ist keine Lampe. — That is not a lamp."
    ]
   ],
   [
    "Keep it simple first",
    "Use kein instead of ein and keine instead of eine in these examples. With a masculine direct object, use keinen: Ich habe keinen Hund. The direct-object lesson will explain this form fully."
   ],
   [
    "Useful examples",
    [
     "Nein, ich komme nicht. — No, I am not coming.",
     "Ich habe keine Zeit. — I have no time."
    ]
   ]
  ],
  "examples": [
   [
    "Nein, ich komme nicht.",
    "No, I am not coming."
   ],
   [
    "Ich habe keine Zeit.",
    "I have no time."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Ich komme ___.",
    "options": [
     "nicht",
     "kein",
     "keine"
    ],
    "answer": 0,
    "why": "Nicht negates the action.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Das ist ___ Buch.",
    "options": [
     "kein",
     "nicht",
     "keine"
    ],
    "answer": 0,
    "why": "Buch takes ein, so the negative is kein.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Das ist ___ Lampe.",
    "options": [
     "keine",
     "kein",
     "nicht"
    ],
    "answer": 0,
    "why": "Lampe takes eine, so use keine.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "You cannot meet because you have no time. Choose the reply.",
    "options": [
     "Ich habe keine Zeit.",
     "Ich bin Zeit.",
     "Ich habe Zeit."
    ],
    "answer": 0,
    "why": "Keine Zeit means no time.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Das ist ___ teuer. (not expensive)",
    "options": [
     "nicht",
     "kein",
     "keine"
    ],
    "answer": 0,
    "why": "Use nicht before an adjective such as teuer.",
    "dlSkill": "write",
    "dlWriteAnswer": "nicht"
   }
  ]
 },
 "A1|People and names: Vocabulary and meaning": {
  "sections": [
   [
    "Introduce yourself",
    [
     "Ich heiße … / Mein Name ist … — My name is …\nUse either phrase to give your own name."
    ]
   ],
   [
    "Introduce someone else",
    [
     "Das ist … — This is …\nUse this to introduce another person."
    ]
   ],
   [
    "Note: mein or meine?",
    [
     "Mein Name — my name\nName is masculine: der Name.",
     "Meine Mutter — my mother\nMutter is feminine: die Mutter.",
     "You’ll learn more about these endings in the possessives lesson."
    ]
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You are Lea. Give your name using Mein Name.",
    "options": [
     "Mein Name ist Lea.",
     "Das ist Lea.",
     "Das ist Paul."
    ],
    "answer": 0,
    "why": "Mein Name ist gives your own name.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You introduce Paul to a friend. What do you say?",
    "options": [
     "Das ist Paul.",
     "Mein Name ist Paul.",
     "Ich heiße Paul."
    ],
    "answer": 0,
    "why": "Das ist introduces another person; the other phrases give your own name.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "What does “Mein Name ist Lea.” mean?",
    "options": [
     "My name is Lea.",
     "This is Lea.",
     "This is Paul."
    ],
    "answer": 0,
    "why": "Mein Name means my name.",
    "dlSkill": "meaning"
   },
   {
    "type": "grammar",
    "prompt": "Which phrase gives the same information as “Ich heiße Lea.”?",
    "options": [
     "Mein Name ist Lea.",
     "Das ist Lea.",
     "Das ist Paul."
    ],
    "answer": 0,
    "why": "Ich heiße Lea and Mein Name ist Lea both give your name.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Mein ___ ist Lea.",
    "options": [
     "Name",
     "Paul",
     "Lea"
    ],
    "answer": 0,
    "why": "Mein Name ist Lea means My name is Lea.",
    "dlSkill": "write",
    "dlWriteAnswer": "Name"
   },
   {
    "type": "grammar",
    "prompt": "Listen and choose the meaning of the sentence.",
    "options": [
     "This is Paul.",
     "My name is Paul.",
     "My name is Lea."
    ],
    "answer": 0,
    "why": "Das ist Paul introduces Paul to someone else.",
    "dlSkill": "listen",
    "dlReviewAudio": "Das ist Paul."
   }
  ],
  "examples": [
   [
    "Ich heiße Lea.",
    "My name is Lea."
   ],
   [
    "Mein Name ist Lea.",
    "My name is Lea."
   ],
   [
    "Das ist Paul.",
    "This is Paul."
   ]
  ]
 },
 "A1|People and names: Sentence patterns": {
  "sections": [
   [
    "What you will be able to do",
    "Build short sentences using the examples below."
   ],
   [
    "When to use it",
    "Use the supplied vocabulary to complete sentence patterns."
   ],
   [
    "How the pattern works",
    "Introduce a person with Das ist …; introduce yourself with Mein Name ist … or Ich heiße … ."
   ],
   [
    "Build on it",
    "Names use heißen; homes use wohnen in; origins use kommen aus. The subject controls the verb form."
   ],
   [
    "Expressions you will practice",
    [
     "Das ist meine Freundin. — This is my friend.",
     "Mein Name ist Lea. — My name is Lea.",
     "Er heißt Thomas. — His name is Thomas.",
     "Sie wohnt in Hamburg. — She lives in Hamburg.",
     "Wir kommen aus Deutschland. — We come from Germany.",
     "Ich bin neu hier. — I am new here."
    ]
   ],
   [
    "Remember",
    "Freundin is a female friend; Freund is a male friend. Meine goes with feminine Freundin."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Das ___ meine Freundin.",
    "options": [
     "ist",
     "sind",
     "bist"
    ],
    "answer": 0,
    "why": "Das ist introduces one person.",
    "german": "Das ist meine Freundin.",
    "english": "This is my friend.",
    "dlSkill": "sentence"
   },
   {
    "type": "grammar",
    "prompt": "Mein ___ ist Lea.",
    "options": [
     "Name",
     "Haus",
     "Tag"
    ],
    "answer": 0,
    "why": "Mein Name ist … introduces your name.",
    "german": "Mein Name ist Lea.",
    "english": "My name is Lea.",
    "dlSkill": "sentence"
   },
   {
    "type": "grammar",
    "prompt": "Er ___ Thomas.",
    "options": [
     "heißt",
     "heiße",
     "heißen"
    ],
    "answer": 0,
    "why": "Er uses heißt.",
    "german": "Er heißt Thomas.",
    "english": "His name is Thomas.",
    "dlSkill": "sentence"
   },
   {
    "type": "grammar",
    "prompt": "Sie wohnt ___ Hamburg.",
    "options": [
     "in",
     "aus",
     "um"
    ],
    "answer": 0,
    "why": "Wohnen in gives a location.",
    "german": "Sie wohnt in Hamburg.",
    "english": "She lives in Hamburg.",
    "dlSkill": "sentence"
   },
   {
    "type": "grammar",
    "prompt": "Wir kommen ___ Deutschland.",
    "options": [
     "aus",
     "in",
     "um"
    ],
    "answer": 0,
    "why": "Kommen aus gives an origin.",
    "german": "Wir kommen aus Deutschland.",
    "english": "We come from Germany.",
    "dlSkill": "sentence"
   },
   {
    "type": "grammar",
    "prompt": "Ich ___ neu hier.",
    "options": [
     "bin",
     "ist",
     "sind"
    ],
    "answer": 0,
    "why": "Use ich bin when describing yourself.",
    "german": "Ich bin neu hier.",
    "english": "I am new here.",
    "dlSkill": "sentence"
   }
  ],
  "examples": [
   [
    "Das ist meine Freundin.",
    "This is my friend."
   ],
   [
    "Mein Name ist Lea.",
    "My name is Lea."
   ],
   [
    "Er heißt Thomas.",
    "His name is Thomas."
   ],
   [
    "Sie wohnt in Hamburg.",
    "She lives in Hamburg."
   ],
   [
    "Wir kommen aus Deutschland.",
    "We come from Germany."
   ],
   [
    "Ich bin neu hier.",
    "I am new here."
   ]
  ]
 },
 "A1|People and names: Understanding in context": {
  "sections": [
   [
    "What you will be able to do",
    "Choose an appropriate response in an everyday situation."
   ],
   [
    "When to use it",
    "Choose a response that solves the situation, not just a word translation."
   ],
   [
    "How the pattern works",
    "Introduce a person with Das ist …; introduce yourself with Mein Name ist … or Ich heiße … ."
   ],
   [
    "Build on it",
    "Names use heißen; homes use wohnen in; origins use kommen aus. The subject controls the verb form."
   ],
   [
    "Expressions you will practice",
    [
     "Das ist meine Freundin. — This is my friend.",
     "Mein Name ist Lea. — My name is Lea.",
     "Er heißt Thomas. — His name is Thomas.",
     "Sie wohnt in Hamburg. — She lives in Hamburg.",
     "Wir kommen aus Deutschland. — We come from Germany.",
     "Ich bin neu hier. — I am new here."
    ]
   ],
   [
    "Remember",
    "Freundin is a female friend; Freund is a male friend. Meine goes with feminine Freundin."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You introduce your female friend. What do you say?",
    "options": [
     "Das ist meine Freundin.",
     "Mein Name ist Lea.",
     "Sie wohnt in Hamburg."
    ],
    "answer": 0,
    "why": "Das ist introduces one person.",
    "german": "Das ist meine Freundin.",
    "english": "This is my friend.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Someone asks your name, which is Lea. Choose your reply.",
    "options": [
     "Mein Name ist Lea.",
     "Er heißt Thomas.",
     "Wir kommen aus Deutschland."
    ],
    "answer": 0,
    "why": "Mein Name ist … introduces your name.",
    "german": "Mein Name ist Lea.",
    "english": "My name is Lea.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You tell someone the man’s name is Thomas. Which sentence fits?",
    "options": [
     "Er heißt Thomas.",
     "Sie wohnt in Hamburg.",
     "Ich bin neu hier."
    ],
    "answer": 0,
    "why": "Er uses heißt.",
    "german": "Er heißt Thomas.",
    "english": "His name is Thomas.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Someone asks where she lives. Which sentence answers?",
    "options": [
     "Sie wohnt in Hamburg.",
     "Wi…40033 tokens truncated… ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete the destination: Ich fahre ___ Berlin.",
    "options": [
     "nach",
     "mit",
     "aus"
    ],
    "answer": 0,
    "why": "Use nach with a city destination.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Ich fahre ___ dem Bus.",
    "options": [
     "mit",
     "nach",
     "zu"
    ],
    "answer": 0,
    "why": "Mit dem Bus means by bus.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the sentence saying where you are now.",
    "options": [
     "Ich bin im Park.",
     "Ich gehe zum Bahnhof.",
     "Ich fahre nach Berlin."
    ],
    "answer": 0,
    "why": "Im Park describes a location.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich gehe nach ___. (home)",
    "options": [
     "Hause",
     "Haus",
     "Häuser"
    ],
    "answer": 0,
    "why": "Nach Hause is the destination phrase.",
    "dlSkill": "write",
    "dlWriteAnswer": "Hause"
   }
  ]
 },
 "A1|Dative: with and to": {
  "sections": [
   [
    "What you will be able to do",
    "Use common mit and zu phrases and identify a recipient."
   ],
   [
    "Article changes",
    [
     "der → dem: mit dem Mann — with the man",
     "die → der: mit der Frau — with the woman",
     "das → dem: mit dem Kind — with the child",
     "plural die → den: mit den Kindern — with the children"
    ]
   ],
   [
    "Useful contractions",
    "Zu dem becomes zum: zum Arzt. Zu der becomes zur: zur Schule. These are common destination phrases."
   ],
   [
    "With helfen",
    "Helfen means help and takes a dative person: Ich helfe dem Mann. Er hilft der Frau. Learn helps as hilft with er/sie/es."
   ],
   [
    "Useful examples",
    [
     "Ich fahre mit dem Bus. — I travel by bus.",
     "Ich gehe zum Arzt. — I go to the doctor.",
     "Ich helfe der Frau. — I help the woman."
    ]
   ]
  ],
  "examples": [
   [
    "Ich fahre mit dem Bus.",
    "I travel by bus."
   ],
   [
    "Ich gehe zum Arzt.",
    "I go to the doctor."
   ],
   [
    "Ich helfe der Frau.",
    "I help the woman."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Ich fahre mit ___ Bus.",
    "options": [
     "dem",
     "den",
     "der"
    ],
    "answer": 0,
    "why": "Bus is masculine; mit requires dative dem.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Ich helfe ___ Frau.",
    "options": [
     "der",
     "die",
     "den"
    ],
    "answer": 0,
    "why": "Frau is feminine; dative is der.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Which phrase means to the doctor?",
    "options": [
     "zum Arzt",
     "nach Arzt",
     "mit Arzt"
    ],
    "answer": 0,
    "why": "Zum is zu dem.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: mit ___ Kind",
    "options": [
     "dem",
     "das",
     "den"
    ],
    "answer": 0,
    "why": "Kind is neuter; dative is dem.",
    "dlSkill": "write",
    "dlWriteAnswer": "dem"
   }
  ]
 },
 "A1|Dative pronouns": {
  "sections": [
   [
    "What you will be able to do",
    "Ask for help and replace a recipient with the right pronoun."
   ],
   [
    "Singular",
    [
     "ich → mir — me",
     "du → dir — you",
     "er → ihm — him",
     "sie → ihr — her",
     "es → ihm — it"
    ]
   ],
   [
    "Plural and formal",
    [
     "wir → uns — us",
     "ihr → euch — you all",
     "sie → ihnen — them",
     "Sie → Ihnen — formal you"
    ]
   ],
   [
    "Compare the jobs",
    "Ich sehe dich means I see you: direct object. Ich helfe dir means I help you: helfen takes dative. With a polite stranger, use Können Sie mir helfen? — Can you help me?"
   ],
   [
    "Useful examples",
    [
     "Ich helfe dir. — I help you.",
     "Können Sie mir helfen? — Can you help me?",
     "Wir helfen Ihnen. — We help you (formal)."
    ]
   ]
  ],
  "examples": [
   [
    "Ich helfe dir.",
    "I help you."
   ],
   [
    "Können Sie mir helfen?",
    "Can you help me?"
   ],
   [
    "Wir helfen Ihnen.",
    "We help you (formal)."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Kannst du ___ helfen? (me)",
    "options": [
     "mir",
     "mich",
     "ich"
    ],
    "answer": 0,
    "why": "Helfen takes dative: mir.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Ich helfe ___. (one friend)",
    "options": [
     "dir",
     "dich",
     "du"
    ],
    "answer": 0,
    "why": "Dative dir is used with helfen.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "You politely offer help to a customer. Complete: Ich helfe ___.",
    "options": [
     "Ihnen",
     "Sie",
     "ihnen"
    ],
    "answer": 0,
    "why": "Formal Ihnen has a capital I.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Wir helfen ___. (them)",
    "options": [
     "ihnen",
     "sie",
     "Sie"
    ],
    "answer": 0,
    "why": "Dative ihnen means them.",
    "dlSkill": "write",
    "dlWriteAnswer": "ihnen"
   }
  ]
 },
 "A1|Health and appointments": {
  "sections": [
   [
    "What you will be able to do",
    "Describe a common symptom and arrange basic help."
   ],
   [
    "Symptoms",
    [
     "Ich habe Kopfschmerzen. — I have a headache.",
     "Ich habe Bauchschmerzen. — I have a stomachache.",
     "Mir ist schlecht. — I feel sick.",
     "Mein Hals tut weh. — My throat hurts."
    ]
   ],
   [
    "Advice and requests",
    [
     "Ich brauche einen Termin. — I need an appointment.",
     "Trinken Sie bitte Wasser. — Please drink water.",
     "Ich soll mich ausruhen. — I am supposed to rest.",
     "Sollen expresses advice or an instruction from someone: ich soll, du sollst, er/sie/es soll; wir sollen, ihr sollt, sie/Sie sollen."
    ]
   ],
   [
    "Appointment information",
    "Haben Sie am Montag Zeit? asks whether someone is available on Monday. You can answer Ja, um zehn Uhr (Yes, at ten)."
   ],
   [
    "Useful examples",
    [
     "Ich brauche einen Termin. — I need an appointment.",
     "Haben Sie am Montag Zeit? — Do you have time on Monday?"
    ]
   ]
  ],
  "examples": [
   [
    "Ich brauche einen Termin.",
    "I need an appointment."
   ],
   [
    "Haben Sie am Montag Zeit?",
    "Do you have time on Monday?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "You have a headache. What do you say?",
    "options": [
     "Ich habe Kopfschmerzen.",
     "Ich habe Hunger.",
     "Ich habe Zeit."
    ],
    "answer": 0,
    "why": "Kopfschmerzen means headache.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Trinken Sie bitte Wasser.” What should you do?",
    "options": [
     "Drink water",
     "Go home",
     "Eat bread"
    ],
    "answer": 0,
    "why": "Trinken means drink.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You need a doctor’s appointment. Choose the request.",
    "options": [
     "Ich brauche einen Termin.",
     "Ich heiße einen Termin.",
     "Ich bin einen Termin."
    ],
    "answer": 0,
    "why": "Einen Termin brauchen means need an appointment.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich ___ mich ausruhen. (am supposed to)",
    "options": [
     "soll",
     "sollst",
     "sollen"
    ],
    "answer": 0,
    "why": "Ich uses soll when reporting advice.",
    "dlSkill": "write",
    "dlWriteAnswer": "soll"
   }
  ]
 },
 "A1|Talking about yesterday: Perfekt": {
  "sections": [
   [
    "What you will be able to do",
    "Describe a completed everyday action with haben or sein."
   ],
   [
    "Build the sentence",
    "Use haben or sein in the present tense plus a past participle at the end: Ich habe Deutsch gelernt. — I learned German."
   ],
   [
    "Choose an auxiliary",
    [
     "Most verbs use haben: ich habe gelernt, du hast gearbeitet.",
     "Many verbs describing a change of place use sein: ich bin gegangen, wir sind gefahren.",
     "Learn the auxiliary with each verb rather than assuming every movement uses sein."
    ]
   ],
   [
    "Questions and negatives",
    [
     "Hast du gearbeitet? — Did you work?",
     "Ich habe nicht gearbeitet. — I did not work.",
     "Bist du nach Hause gegangen? — Did you go home?"
    ]
   ],
   [
    "Useful examples",
    [
     "Ich habe Deutsch gelernt. — I learned German.",
     "Wir sind nach Berlin gefahren. — We travelled to Berlin."
    ]
   ],
   [
    "Remember",
    "Gestern means yesterday. Change the auxiliary for the subject; keep the participle at the end."
   ]
  ],
  "examples": [
   [
    "Ich habe Deutsch gelernt.",
    "I learned German."
   ],
   [
    "Wir sind nach Berlin gefahren.",
    "We travelled to Berlin."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Ich ___ Deutsch gelernt.",
    "options": [
     "habe",
     "bin",
     "ist"
    ],
    "answer": 0,
    "why": "Lernen uses haben.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Wir ___ nach Berlin gefahren.",
    "options": [
     "sind",
     "haben",
     "seid"
    ],
    "answer": 0,
    "why": "Fahren to another place uses sein; wir sind.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the sentence for I did not work.",
    "options": [
     "Ich habe nicht gearbeitet.",
     "Ich nicht habe gearbeitet.",
     "Ich habe gearbeitet nicht."
    ],
    "answer": 0,
    "why": "Use habe and the participle at the end.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Hast du ___? (worked)",
    "options": [
     "gearbeitet",
     "arbeiten",
     "arbeitet"
    ],
    "answer": 0,
    "why": "The past participle of arbeiten is gearbeitet.",
    "dlSkill": "write",
    "dlWriteAnswer": "gearbeitet"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Gestern bin ich nach Hause gegangen.” What happened?",
    "options": [
     "I went home yesterday",
     "I am going home tomorrow",
     "I stayed at home today"
    ],
    "answer": 0,
    "why": "Gestern means yesterday; bin gegangen is a past action.",
    "dlSkill": "reading"
   }
  ]
 },
 "A1|Past events: common participles": {
  "sections": [
   [
    "What you will be able to do",
    "Use a small useful set of past forms, including was and had."
   ],
   [
    "Past participles",
    [
     "lernen → gelernt (haben)",
     "machen → gemacht (haben)",
     "arbeiten → gearbeitet (haben)",
     "kochen → gekocht (haben)",
     "essen → gegessen (haben)",
     "lesen → gelesen (haben)",
     "gehen → gegangen (sein)",
     "fahren → gefahren (sein)"
    ]
   ],
   [
    "Recognize the pattern",
    "Many regular verbs use ge- plus the stem plus -t. Arbeiten needs -et: gearbeitet. Irregular forms must be learned with the verb."
   ],
   [
    "Was and had",
    [
     "ich war / du warst / er war — I was / you were / he was",
     "wir waren / ihr wart / sie/Sie waren",
     "ich hatte / du hattest / er hatte — I had / you had / he had",
     "wir hatten / ihr hattet / sie/Sie hatten"
    ]
   ],
   [
    "Useful examples",
    [
     "Ich war müde. — I was tired.",
     "Wir hatten keine Zeit. — We had no time.",
     "Sie hat ein Buch gelesen. — She read a book."
    ]
   ]
  ],
  "examples": [
   [
    "Ich war müde.",
    "I was tired."
   ],
   [
    "Wir hatten keine Zeit.",
    "We had no time."
   ],
   [
    "Sie hat ein Buch gelesen.",
    "She read a book."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Complete: Sie hat ein Buch ___.",
    "options": [
     "gelesen",
     "lesen",
     "liest"
    ],
    "answer": 0,
    "why": "The participle is gelesen.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Ich habe eine Suppe ___.",
    "options": [
     "gekocht",
     "kochen",
     "koche"
    ],
    "answer": 0,
    "why": "The participle is gekocht.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Wir ___ keine Zeit. (had)",
    "options": [
     "hatten",
     "hatte",
     "hattenen"
    ],
    "answer": 0,
    "why": "Wir uses hatten.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Ich ___ müde. (was)",
    "options": [
     "war",
     "waren",
     "warst"
    ],
    "answer": 0,
    "why": "Ich uses war.",
    "dlSkill": "write",
    "dlWriteAnswer": "war"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Wir sind gefahren.” What happened?",
    "options": [
     "We travelled",
     "We are travelling now",
     "We want to travel"
    ],
    "answer": 0,
    "why": "Sind gefahren describes a completed journey.",
    "dlSkill": "reading"
   }
  ]
 },
 "A1|Family words": {
  "sections": [
   [
    "What you will be able to do",
    "Name family members in everyday introductions."
   ],
   [
    "Language to use",
    "Learn these as whole phrases. Read each example aloud, then connect it to an everyday situation."
   ],
   [
    "Useful examples",
    [
     "Das ist meine Mutter. — That is my mother.",
     "Das ist mein Vater. — That is my father.",
     "Das ist mein Bruder. — That is my brother.",
     "Das ist meine Schwester. — That is my sister.",
     "Das sind meine Eltern. — Those are my parents."
    ]
   ]
  ],
  "examples": [
   [
    "Das ist meine Mutter.",
    "That is my mother."
   ],
   [
    "Das ist mein Vater.",
    "That is my father."
   ],
   [
    "Das ist mein Bruder.",
    "That is my brother."
   ],
   [
    "Das ist meine Schwester.",
    "That is my sister."
   ],
   [
    "Das sind meine Eltern.",
    "Those are my parents."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Das ist meine Mutter.” What does it tell you?",
    "options": [
     "That is my mother.",
     "That is my father.",
     "That is my brother."
    ],
    "answer": 0,
    "why": "The phrase means That is my mother..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das ist mein Vater.” What does it tell you?",
    "options": [
     "That is my father.",
     "That is my mother.",
     "That is my brother."
    ],
    "answer": 0,
    "why": "The phrase means That is my father..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das ist mein Bruder.” What does it tell you?",
    "options": [
     "That is my brother.",
     "That is my mother.",
     "That is my father."
    ],
    "answer": 0,
    "why": "The phrase means That is my brother..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: That is my mother.",
    "options": [
     "Das ist meine Mutter.",
     "Das ist mein Vater.",
     "Das ist mein Bruder."
    ],
    "answer": 0,
    "why": "Use the complete phrase Das ist meine Mutter..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Food and drink vocabulary": {
  "sections": [
   [
    "What you will be able to do",
    "Recognize foods and drinks you can order."
   ],
   [
    "Language to use",
    "Learn the article with each food or drink. Ich möchte … means I would like … ."
   ],
   [
    "Useful examples",
    [
     "das Brot — the bread",
     "das Wasser — the water",
     "der Kaffee — the coffee",
     "der Tee — the tea",
     "der Apfel — the apple",
     "die Milch — the milk"
    ]
   ]
  ],
  "examples": [
   [
    "das Brot",
    "the bread"
   ],
   [
    "das Wasser",
    "the water"
   ],
   [
    "der Kaffee",
    "the coffee"
   ],
   [
    "der Tee",
    "the tea"
   ],
   [
    "der Apfel",
    "the apple"
   ],
   [
    "die Milch",
    "the milk"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “das Brot” What does it tell you?",
    "options": [
     "the bread",
     "the water",
     "the coffee"
    ],
    "answer": 0,
    "why": "The phrase means the bread.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “das Wasser” What does it tell you?",
    "options": [
     "the water",
     "the bread",
     "the coffee"
    ],
    "answer": 0,
    "why": "The phrase means the water.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “der Kaffee” What does it tell you?",
    "options": [
     "the coffee",
     "the bread",
     "the water"
    ],
    "answer": 0,
    "why": "The phrase means the coffee.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: the bread",
    "options": [
     "das Brot",
     "das Wasser",
     "der Kaffee"
    ],
    "answer": 0,
    "why": "Use the complete phrase das Brot.",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Places around town": {
  "sections": [
   [
    "What you will be able to do",
    "Identify useful destinations before asking for directions."
   ],
   [
    "Language to use",
    "Use Wo ist …? to ask where a place is: Wo ist der Bahnhof?"
   ],
   [
    "Useful examples",
    [
     "der Bahnhof — the train station",
     "die Apotheke — the pharmacy",
     "der Supermarkt — the supermarket",
     "die Schule — the school",
     "das Krankenhaus — the hospital"
    ]
   ]
  ],
  "examples": [
   [
    "der Bahnhof",
    "the train station"
   ],
   [
    "die Apotheke",
    "the pharmacy"
   ],
   [
    "der Supermarkt",
    "the supermarket"
   ],
   [
    "die Schule",
    "the school"
   ],
   [
    "das Krankenhaus",
    "the hospital"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “der Bahnhof” What does it tell you?",
    "options": [
     "the train station",
     "the pharmacy",
     "the supermarket"
    ],
    "answer": 0,
    "why": "The phrase means the train station.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “die Apotheke” What does it tell you?",
    "options": [
     "the pharmacy",
     "the train station",
     "the supermarket"
    ],
    "answer": 0,
    "why": "The phrase means the pharmacy.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “der Supermarkt” What does it tell you?",
    "options": [
     "the supermarket",
     "the train station",
     "the pharmacy"
    ],
    "answer": 0,
    "why": "The phrase means the supermarket.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: the train station",
    "options": [
     "der Bahnhof",
     "die Apotheke",
     "der Supermarkt"
    ],
    "answer": 0,
    "why": "Use the complete phrase der Bahnhof.",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Places and directions": {
  "sections": [
   [
    "What you will be able to do",
    "Ask where a place is and follow a short direction."
   ],
   [
    "Language to use",
    "Gehen Sie … is a polite instruction to walk/go. Learn it as a useful phrase first. Links is left; rechts is right; geradeaus is straight ahead."
   ],
   [
    "Useful examples",
    [
     "Wo ist der Bahnhof? — Where is the train station?",
     "Gehen Sie geradeaus. — Go straight ahead.",
     "Gehen Sie nach links. — Go to the left.",
     "Gehen Sie nach rechts. — Go to the right."
    ]
   ]
  ],
  "examples": [
   [
    "Wo ist der Bahnhof?",
    "Where is the train station?"
   ],
   [
    "Gehen Sie geradeaus.",
    "Go straight ahead."
   ],
   [
    "Gehen Sie nach links.",
    "Go to the left."
   ],
   [
    "Gehen Sie nach rechts.",
    "Go to the right."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Wo ist der Bahnhof?” What does it tell you?",
    "options": [
     "Where is the train station?",
     "Go straight ahead.",
     "Go to the left."
    ],
    "answer": 0,
    "why": "The phrase means Where is the train station?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Gehen Sie geradeaus.” What does it tell you?",
    "options": [
     "Go straight ahead.",
     "Where is the train station?",
     "Go to the left."
    ],
    "answer": 0,
    "why": "The phrase means Go straight ahead..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Gehen Sie nach links.” What does it tell you?",
    "options": [
     "Go to the left.",
     "Where is the train station?",
     "Go straight ahead."
    ],
    "answer": 0,
    "why": "The phrase means Go to the left..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: Where is the train station?",
    "options": [
     "Wo ist der Bahnhof?",
     "Gehen Sie geradeaus.",
     "Gehen Sie nach links."
    ],
    "answer": 0,
    "why": "Use the complete phrase Wo ist der Bahnhof?.",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Home and furniture": {
  "sections": [
   [
    "What you will be able to do",
    "Describe rooms and basic furniture."
   ],
   [
    "Language to use",
    "Es gibt means there is/there are. Zimmer means room; Küche is kitchen, Bad is bathroom, Bett is bed. Descriptions after ist do not need adjective endings here."
   ],
   [
    "Useful examples",
    [
     "Die Küche ist klein. — The kitchen is small.",
     "Das Bad ist sauber. — The bathroom is clean.",
     "Das Bett ist bequem. — The bed is comfortable.",
     "Es gibt zwei Zimmer. — There are two rooms."
    ]
   ]
  ],
  "examples": [
   [
    "Die Küche ist klein.",
    "The kitchen is small."
   ],
   [
    "Das Bad ist sauber.",
    "The bathroom is clean."
   ],
   [
    "Das Bett ist bequem.",
    "The bed is comfortable."
   ],
   [
    "Es gibt zwei Zimmer.",
    "There are two rooms."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Die Küche ist klein.” What does it tell you?",
    "options": [
     "The kitchen is small.",
     "The bathroom is clean.",
     "The bed is comfortable."
    ],
    "answer": 0,
    "why": "The phrase means The kitchen is small..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das Bad ist sauber.” What does it tell you?",
    "options": [
     "The bathroom is clean.",
     "The kitchen is small.",
     "The bed is comfortable."
    ],
    "answer": 0,
    "why": "The phrase means The bathroom is clean..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das Bett ist bequem.” What does it tell you?",
    "options": [
     "The bed is comfortable.",
     "The kitchen is small.",
     "The bathroom is clean."
    ],
    "answer": 0,
    "why": "The phrase means The bed is comfortable..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: The kitchen is small.",
    "options": [
     "Die Küche ist klein.",
     "Das Bad ist sauber.",
     "Das Bett ist bequem."
    ],
    "answer": 0,
    "why": "Use the complete phrase Die Küche ist klein..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Daily habits and schedules": {
  "sections": [
   [
    "What you will be able to do",
    "Describe when you do familiar actions."
   ],
   [
    "Language to use",
    "A time expression can come first. Keep the verb in second position: Am Montag arbeite ich. Morgens means in the mornings; abends means in the evenings."
   ],
   [
    "Useful examples",
    [
     "Ich frühstücke um acht. — I have breakfast at eight.",
     "Am Montag arbeite ich. — I work on Monday.",
     "Abends lese ich. — I read in the evenings.",
     "Ich gehe um zehn ins Bett. — I go to bed at ten."
    ]
   ]
  ],
  "examples": [
   [
    "Ich frühstücke um acht.",
    "I have breakfast at eight."
   ],
   [
    "Am Montag arbeite ich.",
    "I work on Monday."
   ],
   [
    "Abends lese ich.",
    "I read in the evenings."
   ],
   [
    "Ich gehe um zehn ins Bett.",
    "I go to bed at ten."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Ich frühstücke um acht.” What does it tell you?",
    "options": [
     "I have breakfast at eight.",
     "I work on Monday.",
     "I read in the evenings."
    ],
    "answer": 0,
    "why": "The phrase means I have breakfast at eight..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Am Montag arbeite ich.” What does it tell you?",
    "options": [
     "I work on Monday.",
     "I have breakfast at eight.",
     "I read in the evenings."
    ],
    "answer": 0,
    "why": "The phrase means I work on Monday..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Abends lese ich.” What does it tell you?",
    "options": [
     "I read in the evenings.",
     "I have breakfast at eight.",
     "I work on Monday."
    ],
    "answer": 0,
    "why": "The phrase means I read in the evenings..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: I have breakfast at eight.",
    "options": [
     "Ich frühstücke um acht.",
     "Am Montag arbeite ich.",
     "Abends lese ich."
    ],
    "answer": 0,
    "why": "Use the complete phrase Ich frühstücke um acht..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Daily routines": {
  "sections": [
   [
    "What you will be able to do",
    "Describe a routine with time and a separable verb."
   ],
   [
    "Language to use",
    "Jeden Abend means every evening. Time-first statements still put the verb second. Aufstehen splits into stehe … auf."
   ],
   [
    "Useful examples",
    [
     "Ich stehe um sieben Uhr auf. — I get up at seven.",
     "Morgens trinke ich Kaffee. — I drink coffee in the mornings.",
     "Wir lernen jeden Abend. — We study every evening.",
     "Ich arbeite am Montag. — I work on Monday."
    ]
   ]
  ],
  "examples": [
   [
    "Ich stehe um sieben Uhr auf.",
    "I get up at seven."
   ],
   [
    "Morgens trinke ich Kaffee.",
    "I drink coffee in the mornings."
   ],
   [
    "Wir lernen jeden Abend.",
    "We study every evening."
   ],
   [
    "Ich arbeite am Montag.",
    "I work on Monday."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Ich stehe um sieben Uhr auf.” What does it tell you?",
    "options": [
     "I get up at seven.",
     "I drink coffee in the mornings.",
     "We study every evening."
    ],
    "answer": 0,
    "why": "The phrase means I get up at seven..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Morgens trinke ich Kaffee.” What does it tell you?",
    "options": [
     "I drink coffee in the mornings.",
     "I get up at seven.",
     "We study every evening."
    ],
    "answer": 0,
    "why": "The phrase means I drink coffee in the mornings..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Wir lernen jeden Abend.” What does it tell you?",
    "options": [
     "We study every evening.",
     "I get up at seven.",
     "I drink coffee in the mornings."
    ],
    "answer": 0,
    "why": "The phrase means We study every evening..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: I get up at seven.",
    "options": [
     "Ich stehe um sieben Uhr auf.",
     "Morgens trinke ich Kaffee.",
     "Wir lernen jeden Abend."
    ],
    "answer": 0,
    "why": "Use the complete phrase Ich stehe um sieben Uhr auf..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Hobbies and interests": {
  "sections": [
   [
    "What you will be able to do",
    "Say what you enjoy doing and what you do not enjoy."
   ],
   [
    "Language to use",
    "Put gern after a verb to express enjoyment. Nicht gern means you do not enjoy it. Gern is not a conjugated verb."
   ],
   [
    "Useful examples",
    [
     "Ich lese gern. — I like reading.",
     "Wir spielen Fußball. — We play football.",
     "Ich höre gern Musik. — I like listening to music.",
     "Ich schwimme nicht gern. — I do not like swimming."
    ]
   ]
  ],
  "examples": [
   [
    "Ich lese gern.",
    "I like reading."
   ],
   [
    "Wir spielen Fußball.",
    "We play football."
   ],
   [
    "Ich höre gern Musik.",
    "I like listening to music."
   ],
   [
    "Ich schwimme nicht gern.",
    "I do not like swimming."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Ich lese gern.” What does it tell you?",
    "options": [
     "I like reading.",
     "We play football.",
     "I like listening to music."
    ],
    "answer": 0,
    "why": "The phrase means I like reading..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Wir spielen Fußball.” What does it tell you?",
    "options": [
     "We play football.",
     "I like reading.",
     "I like listening to music."
    ],
    "answer": 0,
    "why": "The phrase means We play football..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Ich höre gern Musik.” What does it tell you?",
    "options": [
     "I like listening to music.",
     "I like reading.",
     "We play football."
    ],
    "answer": 0,
    "why": "The phrase means I like listening to music..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: I like reading.",
    "options": [
     "Ich lese gern.",
     "Wir spielen Fußball.",
     "Ich höre gern Musik."
    ],
    "answer": 0,
    "why": "Use the complete phrase Ich lese gern..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Colors and describing things": {
  "sections": [
   [
    "What you will be able to do",
    "Describe a familiar object using color and size."
   ],
   [
    "Language to use",
    "Blau means blue, rot red, grün green, gelb yellow, schwarz black and weiß white. Use ist for one thing; an adjective after ist stays unchanged here."
   ],
   [
    "Useful examples",
    [
     "Das Buch ist blau. — The book is blue.",
     "Die Tasche ist rot. — The bag is red.",
     "Das Haus ist groß. — The house is big.",
     "Die Wohnung ist klein. — The apartment is small."
    ]
   ]
  ],
  "examples": [
   [
    "Das Buch ist blau.",
    "The book is blue."
   ],
   [
    "Die Tasche ist rot.",
    "The bag is red."
   ],
   [
    "Das Haus ist groß.",
    "The house is big."
   ],
   [
    "Die Wohnung ist klein.",
    "The apartment is small."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Das Buch ist blau.” What does it tell you?",
    "options": [
     "The book is blue.",
     "The bag is red.",
     "The house is big."
    ],
    "answer": 0,
    "why": "The phrase means The book is blue..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Die Tasche ist rot.” What does it tell you?",
    "options": [
     "The bag is red.",
     "The book is blue.",
     "The house is big."
    ],
    "answer": 0,
    "why": "The phrase means The bag is red..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das Haus ist groß.” What does it tell you?",
    "options": [
     "The house is big.",
     "The book is blue.",
     "The bag is red."
    ],
    "answer": 0,
    "why": "The phrase means The house is big..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: The book is blue.",
    "options": [
     "Das Buch ist blau.",
     "Die Tasche ist rot.",
     "Das Haus ist groß."
    ],
    "answer": 0,
    "why": "Use the complete phrase Das Buch ist blau..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Weather and seasons": {
  "sections": [
   [
    "What you will be able to do",
    "Understand simple weather information."
   ],
   [
    "Language to use",
    "The seasons are der Frühling (spring), der Sommer (summer), der Herbst (autumn), der Winter (winter). Use im with a season. Kalt means cold; sonnig means sunny."
   ],
   [
    "Useful examples",
    [
     "Es regnet. — It is raining.",
     "Es schneit. — It is snowing.",
     "Es ist warm. — It is warm.",
     "Im Winter ist es kalt. — It is cold in winter."
    ]
   ]
  ],
  "examples": [
   [
    "Es regnet.",
    "It is raining."
   ],
   [
    "Es schneit.",
    "It is snowing."
   ],
   [
    "Es ist warm.",
    "It is warm."
   ],
   [
    "Im Winter ist es kalt.",
    "It is cold in winter."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Es regnet.” What does it tell you?",
    "options": [
     "It is raining.",
     "It is snowing.",
     "It is warm."
    ],
    "answer": 0,
    "why": "The phrase means It is raining..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Es schneit.” What does it tell you?",
    "options": [
     "It is snowing.",
     "It is raining.",
     "It is warm."
    ],
    "answer": 0,
    "why": "The phrase means It is snowing..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Es ist warm.” What does it tell you?",
    "options": [
     "It is warm.",
     "It is raining.",
     "It is snowing."
    ],
    "answer": 0,
    "why": "The phrase means It is warm..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: It is raining.",
    "options": [
     "Es regnet.",
     "Es schneit.",
     "Es ist warm."
    ],
    "answer": 0,
    "why": "Use the complete phrase Es regnet..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Work and occupations": {
  "sections": [
   [
    "What you will be able to do",
    "Introduce your job and ask about someone else’s work."
   ],
   [
    "Language to use",
    "Als introduces a role; bei introduces an employer. Büro means office; Arbeit means work."
   ],
   [
    "Nouns for men and women",
    [
     "der Lehrer — male teacher",
     "die Lehrerin — female teacher",
     "der Amerikaner — American man",
     "die Amerikanerin — American woman",
     "Many nouns for people add -in to the male form to name a woman: Lehrer → Lehrerin; Amerikaner → Amerikanerin.",
     "This is a common pattern, not a rule for every noun. Learn each noun with its article.",
     "Ich arbeite als Lehrerin. — I work as a teacher (woman)."
    ]
   ],
   [
    "Useful examples",
    [
     "Was machst du beruflich? — What do you do for work?",
     "Ich arbeite als Lehrer. — I work as a teacher.",
     "Ich arbeite im Büro. — I work in an office.",
     "Ich suche Arbeit. — I am looking for work."
    ]
   ]
  ],
  "examples": [
   [
    "Was machst du beruflich?",
    "What do you do for work?"
   ],
   [
    "Ich arbeite als Lehrer.",
    "I work as a teacher."
   ],
   [
    "Ich arbeite im Büro.",
    "I work in an office."
   ],
   [
    "Ich suche Arbeit.",
    "I am looking for work."
   ],
   [
    "Ich arbeite als Lehrerin.",
    "I work as a teacher (woman)."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Was machst du beruflich?” What does it tell you?",
    "options": [
     "What do you do for work?",
     "I work as a teacher.",
     "I work in an office."
    ],
    "answer": 0,
    "why": "The phrase means What do you do for work?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Ich arbeite als Lehrer.” What does it tell you?",
    "options": [
     "I work as a teacher.",
     "What do you do for work?",
     "I work in an office."
    ],
    "answer": 0,
    "why": "The phrase means I work as a teacher..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Ich arbeite im Büro.” What does it tell you?",
    "options": [
     "I work in an office.",
     "What do you do for work?",
     "I work as a teacher."
    ],
    "answer": 0,
    "why": "The phrase means I work in an office..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: What do you do for work?",
    "options": [
     "Was machst du beruflich?",
     "Ich arbeite als Lehrer.",
     "Ich arbeite im Büro."
    ],
    "answer": 0,
    "why": "Use the complete phrase Was machst du beruflich?.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Which word refers to a female teacher?",
    "options": [
     "Lehrerin",
     "Lehrer",
     "Büro"
    ],
    "answer": 0,
    "why": "Lehrerin adds -in to Lehrer to refer to a woman.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "An American woman introduces her nationality. Choose her sentence.",
    "options": [
     "Ich bin Amerikanerin.",
     "Ich bin Amerikaner.",
     "Ich arbeite im Büro."
    ],
    "answer": 0,
    "why": "Amerikanerin is the noun for an American woman.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the noun for a female teacher: Ich arbeite als ___.",
    "options": [
     "Lehrerin",
     "Lehrer",
     "Arbeit"
    ],
    "answer": 0,
    "why": "The female form is Lehrerin.",
    "dlSkill": "write",
    "dlWriteAnswer": "Lehrerin"
   }
  ]
 },
 "A1|Days of the week": {
  "sections": [
   [
    "What you will be able to do",
    "Read a weekly plan and say which day an event happens."
   ],
   [
    "Weekdays",
    [
     "Montag — Monday",
     "Dienstag — Tuesday",
     "Mittwoch — Wednesday",
     "Donnerstag — Thursday",
     "Freitag — Friday",
     "Samstag — Saturday",
     "Sonntag — Sunday"
    ]
   ],
   [
    "Use am",
    "Am Montag means on Monday. Am Wochenende means at the weekend. Heute means today and morgen means tomorrow; do not put am before heute or morgen."
   ],
   [
    "Useful examples",
    [
     "Der Kurs ist am Dienstag. — The class is on Tuesday.",
     "Wir kommen am Freitag. — We are coming on Friday."
    ]
   ]
  ],
  "examples": [
   [
    "Der Kurs ist am Dienstag.",
    "The class is on Tuesday."
   ],
   [
    "Wir kommen am Freitag.",
    "We are coming on Friday."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "A plan says “Kurs: Mittwoch”. Which day is the class?",
    "options": [
     "Wednesday",
     "Tuesday",
     "Friday"
    ],
    "answer": 0,
    "why": "Mittwoch is Wednesday.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Complete: Wir kommen ___ Freitag.",
    "options": [
     "am",
     "um",
     "im"
    ],
    "answer": 0,
    "why": "Use am with a weekday.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Choose the sentence meaning I am coming tomorrow.",
    "options": [
     "Ich komme morgen.",
     "Ich komme am morgen.",
     "Ich komme im morgen."
    ],
    "answer": 0,
    "why": "Morgen needs no preposition here.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the German weekday for Sunday.",
    "options": [
     "Sonntag",
     "Samstag",
     "Montag"
    ],
    "answer": 0,
    "why": "Sonntag is Sunday.",
    "dlSkill": "write",
    "dlWriteAnswer": "Sonntag"
   }
  ]
 },
 "A1|Messages and invitations": {
  "sections": [
   [
    "What you will be able to do",
    "Understand a short invitation and choose a clear reply."
   ],
   [
    "A message",
    [
     "Hallo Lea! Hast du am Samstag um drei Uhr Zeit? Wir trinken Kaffee. Liebe Grüße, Anna.",
     "Hello Lea! Do you have time on Saturday at three? We are having coffee. Best wishes, Anna."
    ]
   ],
   [
    "Reply clearly",
    [
     "Ja, gern! Ich komme um drei. — Yes, gladly! I will come at three.",
     "Leider habe ich keine Zeit. — Unfortunately I do not have time.",
     "Können wir uns am Sonntag treffen? — Can we meet on Sunday?"
    ]
   ],
   [
    "A short message",
    "Start with Hallo plus the name, give the important day/time or request, then close with Liebe Grüße plus your name. Leider means unfortunately."
   ],
   [
    "Useful examples",
    [
     "Leider habe ich keine Zeit. — Unfortunately I do not have time."
    ]
   ]
  ],
  "examples": [
   [
    "Leider habe ich keine Zeit.",
    "Unfortunately I do not have time."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Hast du am Samstag um drei Uhr Zeit?” When is the invitation?",
    "options": [
     "Saturday at three",
     "Sunday at three",
     "Saturday at thirteen"
    ],
    "answer": 0,
    "why": "Samstag is Saturday; um drei means at three.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You cannot attend. Choose a clear polite reply.",
    "options": [
     "Leider habe ich keine Zeit.",
     "Ja, gern!",
     "Ich komme um drei."
    ],
    "answer": 0,
    "why": "Leider plus keine Zeit declines the invitation.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Choose a suitable closing for a friendly message.",
    "options": [
     "Liebe Grüße, Lea",
     "Wie viel, Lea",
     "Am Montag, Lea"
    ],
    "answer": 0,
    "why": "Liebe Grüße is a friendly closing.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word in a friendly reply: Ja, ___! (gladly)",
    "options": [
     "gern",
     "leider",
     "nicht"
    ],
    "answer": 0,
    "why": "Ja, gern accepts willingly.",
    "dlSkill": "write",
    "dlWriteAnswer": "gern"
   }
  ]
 },
 "A1|Forms and personal details": {
  "sections": [
   [
    "What you will be able to do",
    "Identify the information a simple form requests."
   ],
   [
    "Form fields",
    [
     "Vorname — first name",
     "Nachname — surname",
     "Straße / Hausnummer — street / house number",
     "Postleitzahl (PLZ) — postcode",
     "Wohnort — town/city where you live",
     "Geburtsdatum — date of birth",
     "Telefonnummer — telephone number",
     "E-Mail-Adresse — email address"
    ]
   ],
   [
    "Example form",
    [
     "Vorname: Lea — First name",
     "Nachname: Weber — Surname",
     "Wohnort: Berlin — City of residence",
     "Geburtsdatum: 03.05.1995 — Date of birth"
    ]
   ],
   [
    "A useful request",
    [
     "Können Sie das bitte buchstabieren? — Could you please spell that?",
     "Use this polite question when you need someone to spell a name or address."
    ]
   ],
   [
    "Useful examples",
    [
     "Mein Vorname ist Lea. — My first name is Lea.",
     "Mein Nachname ist Weber. — My surname is Weber.",
     "Ich wohne in Berlin. — I live in Berlin.",
     "Meine Postleitzahl ist 10115. — My postcode is 10115.",
     "Meine Telefonnummer ist 030 123456. — My telephone number is 030 123456."
    ]
   ]
  ],
  "examples": [
   ["Mein Vorname ist Lea.", "My first name is Lea."],
   ["Mein Nachname ist Weber.", "My surname is Weber."],
   ["Ich wohne in Berlin.", "I live in Berlin."],
   ["Meine Postleitzahl ist 10115.", "My postcode is 10115."],
   ["Können Sie das bitte buchstabieren?", "Could you please spell that?"]
  ],
  "questions": [
   {"type":"grammar","prompt":"Where would you enter 12 in the address Lindenstraße 12?","options":["Hausnummer","Wohnort","Postleitzahl"],"answer":0,"why":"Hausnummer is the house number.","dlSkill":"situation"},
   {"type":"grammar","prompt":"You need someone to spell their surname. What do you ask politely?","options":["Können Sie das bitte buchstabieren?","Wo wohnen Sie?","Wie spät ist es?"],"answer":0,"why":"Buchstabieren means to spell out.","dlSkill":"situation"},
   {
    "type": "grammar",
    "prompt": "A form asks for Wohnort. What should you enter?",
    "options": [
     "The city where you live",
     "Your first name",
     "Your age"
    ],
    "answer": 0,
    "why": "Wohnort means place of residence.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Vorname: Lea; Nachname: Weber”. What is the surname?",
    "options": [
     "Weber",
     "Lea",
     "Vorname"
    ],
    "answer": 0,
    "why": "Nachname identifies the surname.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Which field asks when you were born?",
    "options": [
     "Geburtsdatum",
     "Hausnummer",
     "Telefonnummer"
    ],
    "answer": 0,
    "why": "Geburtsdatum is date of birth.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Write the German field label for first name.",
    "options": [
     "Vorname",
     "Nachname",
     "Wohnort"
    ],
    "answer": 0,
    "why": "Vorname means first name.",
    "dlSkill": "write",
    "dlWriteAnswer": "Vorname"
   }
  ]
 },
 "A1|Schedules and notices": {
  "sections": [
   [
    "What you will be able to do",
    "Find a time, place or instruction in a short public notice."
   ],
   [
    "Words on notices",
    [
     "geöffnet — open",
     "geschlossen — closed",
     "Abfahrt — departure",
     "Ankunft — arrival",
     "Gleis — platform/track",
     "von … bis … — from … to …"
    ]
   ],
   [
    "Read the important details",
    [
     "Apotheke: Montag–Freitag, 9–18 Uhr. — Pharmacy: Monday–Friday, 9 a.m.–6 p.m.",
     "Zug nach Berlin: Abfahrt 14:30, Gleis 3. — Train to Berlin: departure 2:30 p.m., platform 3."
    ]
   ],
   [
    "Instructions",
    "Bitte warten! means Please wait! Eingang means entrance; Ausgang means exit. Look for the action and important time or place."
   ],
   [
    "Useful examples",
    [
     "Bitte warten! — Please wait!"
    ]
   ]
  ],
  "examples": [
   [
    "Bitte warten!",
    "Please wait!"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Apotheke: Montag–Freitag, 9–18 Uhr.” Is it listed as open on Sunday?",
    "options": [
     "No",
     "Yes, all day",
     "Yes, from 9 to 18"
    ],
    "answer": 0,
    "why": "Only Monday through Friday are listed.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Abfahrt 14:30, Gleis 3.” Which platform do you need?",
    "options": [
     "3",
     "14",
     "30"
    ],
    "answer": 0,
    "why": "Gleis gives the platform/track.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "A notice says “Bitte warten!” What should you do?",
    "options": [
     "Wait",
     "Leave immediately",
     "Pay by card"
    ],
    "answer": 0,
    "why": "Warten means wait.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the word meaning exit on a sign.",
    "options": [
     "Ausgang",
     "Eingang",
     "Ankunft"
    ],
    "answer": 0,
    "why": "Ausgang means exit.",
    "dlSkill": "write",
    "dlWriteAnswer": "Ausgang"
   }
  ]
 },
 "A1|Review: pronouns and questions": {
  "sections": [
   [
    "What you will be able to do",
    "Combine introductions, questions and simple personal information."
   ],
   [
    "Language to use",
    "This checkpoint revisits earlier lessons. Answer from meaning and context; use the prior teaching if you need a reminder."
   ],
   [
    "Useful examples",
    [
     "Wie heißt du? — What is your name?",
     "Wo wohnst du? — Where do you live?",
     "Hast du Zeit? — Do you have time?",
     "Wir lernen Deutsch. — We are learning German."
    ]
   ]
  ],
  "examples": [
   [
    "Wie heißt du?",
    "What is your name?"
   ],
   [
    "Wo wohnst du?",
    "Where do you live?"
   ],
   [
    "Hast du Zeit?",
    "Do you have time?"
   ],
   [
    "Wir lernen Deutsch.",
    "We are learning German."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Wie heißt du?” What does it tell you?",
    "options": [
     "What is your name?",
     "Where do you live?",
     "Do you have time?"
    ],
    "answer": 0,
    "why": "The phrase means What is your name?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Wo wohnst du?” What does it tell you?",
    "options": [
     "Where do you live?",
     "What is your name?",
     "Do you have time?"
    ],
    "answer": 0,
    "why": "The phrase means Where do you live?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Hast du Zeit?” What does it tell you?",
    "options": [
     "Do you have time?",
     "What is your name?",
     "Where do you live?"
    ],
    "answer": 0,
    "why": "The phrase means Do you have time?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: What is your name?",
    "options": [
     "Wie heißt du?",
     "Wo wohnst du?",
     "Hast du Zeit?"
    ],
    "answer": 0,
    "why": "Use the complete phrase Wie heißt du?.",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Review: articles and objects": {
  "sections": [
   [
    "What you will be able to do",
    "Combine noun articles, plurals, possession and direct objects."
   ],
   [
    "Language to use",
    "Identify the subject, object and noun first. Use article/pronoun forms already practiced in the earlier lessons."
   ],
   [
    "Useful examples",
    [
     "Ich sehe den Hund. — I see the dog.",
     "Das sind meine Bücher. — Those are my books.",
     "Sie hilft der Frau. — She helps the woman.",
     "Die Kinder sind hier. — The children are here."
    ]
   ]
  ],
  "examples": [
   [
    "Ich sehe den Hund.",
    "I see the dog."
   ],
   [
    "Das sind meine Bücher.",
    "Those are my books."
   ],
   [
    "Sie hilft der Frau.",
    "She helps the woman."
   ],
   [
    "Die Kinder sind hier.",
    "The children are here."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Ich sehe den Hund.” What does it tell you?",
    "options": [
     "I see the dog.",
     "Those are my books.",
     "She helps the woman."
    ],
    "answer": 0,
    "why": "The phrase means I see the dog..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Das sind meine Bücher.” What does it tell you?",
    "options": [
     "Those are my books.",
     "I see the dog.",
     "She helps the woman."
    ],
    "answer": 0,
    "why": "The phrase means Those are my books..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Sie hilft der Frau.” What does it tell you?",
    "options": [
     "She helps the woman.",
     "I see the dog.",
     "Those are my books."
    ],
    "answer": 0,
    "why": "The phrase means She helps the woman..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: I see the dog.",
    "options": [
     "Ich sehe den Hund.",
     "Das sind meine Bücher.",
     "Sie hilft der Frau."
    ],
    "answer": 0,
    "why": "Use the complete phrase Ich sehe den Hund..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Review: everyday situations": {
  "sections": [
   [
    "What you will be able to do",
    "Use everyday language to solve practical situations."
   ],
   [
    "Language to use",
    "Review short messages, requests, travel information and past activities. The final module review samples the whole course."
   ],
   [
    "Useful examples",
    [
     "Ich möchte einen Kaffee, bitte. — I would like a coffee, please.",
     "Können Sie mir helfen? — Can you help me?",
     "Leider habe ich keine Zeit. — Unfortunately I do not have time.",
     "Der Zug fährt um zehn Uhr. — The train leaves at ten."
    ]
   ]
  ],
  "examples": [
   [
    "Ich möchte einen Kaffee, bitte.",
    "I would like a coffee, please."
   ],
   [
    "Können Sie mir helfen?",
    "Can you help me?"
   ],
   [
    "Leider habe ich keine Zeit.",
    "Unfortunately I do not have time."
   ],
   [
    "Der Zug fährt um zehn Uhr.",
    "The train leaves at ten."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Read: “Ich möchte einen Kaffee, bitte.” What does it tell you?",
    "options": [
     "I would like a coffee, please.",
     "Can you help me?",
     "Unfortunately I do not have time."
    ],
    "answer": 0,
    "why": "The phrase means I would like a coffee, please..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Können Sie mir helfen?” What does it tell you?",
    "options": [
     "Can you help me?",
     "I would like a coffee, please.",
     "Unfortunately I do not have time."
    ],
    "answer": 0,
    "why": "The phrase means Can you help me?.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Leider habe ich keine Zeit.” What does it tell you?",
    "options": [
     "Unfortunately I do not have time.",
     "I would like a coffee, please.",
     "Can you help me?"
    ],
    "answer": 0,
    "why": "The phrase means Unfortunately I do not have time..",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "You want to say: I would like a coffee, please.",
    "options": [
     "Ich möchte einen Kaffee, bitte.",
     "Können Sie mir helfen?",
     "Leider habe ich keine Zeit."
    ],
    "answer": 0,
    "why": "Use the complete phrase Ich möchte einen Kaffee, bitte..",
    "dlSkill": "situation"
   }
  ]
 },
 "A1|Everyday conversations: Understanding in context": {
  "sections": [
   [
    "What you will be able to do",
    "Ask for help, slower speech or repetition when you do not understand."
   ],
   [
    "Ask for help",
    [
     "Können Sie mir helfen? — Can you help me?",
     "Sprechen Sie bitte langsam. — Please speak slowly.",
     "Können Sie das bitte wiederholen? — Could you please repeat that?"
    ]
   ],
   [
    "Say what you do not understand",
    [
     "Ich verstehe die Frage nicht. — I do not understand the question.",
     "Ich verstehe das Wort nicht. — I do not understand the word.",
     "Ich verstehe den Satz nicht. — I do not understand the sentence."
    ]
   ],
   [
    "Word by word",
    [
     "ich — I; verstehe — understand; nicht — not",
     "die Frage — the question; das Wort — the word; der Satz — the sentence",
     "Sie — formal you; mir — me; helfen — help",
     "bitte — please; langsam — slowly; wiederholen — repeat"
    ]
   ],
   [
    "Learn useful chunks first",
    "You can use these requests now without knowing every grammar rule. Later lessons explain modal verbs and the forms mir and den Satz."
   ],
   [
    "Useful examples",
    [
     "Können Sie das bitte wiederholen? — Could you please repeat that?"
    ]
   ]
  ],
  "examples": [
   [
    "Können Sie das bitte wiederholen?",
    "Could you please repeat that?"
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "Someone speaks too quickly. Choose a useful request.",
    "options": [
     "Sprechen Sie bitte langsam.",
     "Ich verstehe das Wort nicht.",
     "Ich verstehe den Satz nicht."
    ],
    "answer": 0,
    "why": "Langsam means slowly.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You did not catch what someone said. Ask for repetition.",
    "options": [
     "Können Sie das bitte wiederholen?",
     "Können Sie mir helfen?",
     "Ich verstehe die Frage nicht."
    ],
    "answer": 0,
    "why": "Wiederholen means repeat.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "You understand the sentence except one word. What do you say?",
    "options": [
     "Ich verstehe das Wort nicht.",
     "Ich verstehe den Satz nicht.",
     "Ich verstehe die Frage nicht."
    ],
    "answer": 0,
    "why": "Das Wort means the word.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: Sprechen Sie bitte ___. (slowly)",
    "options": [
     "langsam",
     "bitte",
     "nicht"
    ],
    "answer": 0,
    "why": "Langsam means slowly.",
    "dlSkill": "write",
    "dlWriteAnswer": "langsam"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Ich verstehe den Satz nicht.” What is not understood?",
    "options": [
     "The sentence",
     "The question",
     "The word"
    ],
    "answer": 0,
    "why": "Den Satz refers to the sentence.",
    "dlSkill": "reading"
   }
  ]
 },
 "A1|Understanding instructions": {
  "sections": [
   [
    "What you will be able to do",
    "Follow common polite instructions and understand simple public rules."
   ],
   [
    "Polite instructions",
    "Put the verb first, then Sie: Warten Sie bitte! (Please wait!) Gehen Sie geradeaus! (Go straight ahead!) Trinken Sie bitte Wasser! (Please drink water!)"
   ],
   [
    "Informal instructions",
    "Common short instructions to one friend include Komm! (Come!), Warte! (Wait!) and Lies bitte! (Please read!). Learn these useful forms as phrases; some change the vowel."
   ],
   [
    "Rules for everyone",
    "Man means people in general: Man darf hier nicht rauchen. — Smoking is not allowed here. This is not der Mann, meaning the man."
   ],
   [
    "Useful examples",
    [
     "Warten Sie bitte hier. — Please wait here.",
     "Man darf hier nicht rauchen. — Smoking is not allowed here."
    ]
   ]
  ],
  "examples": [
   [
    "Warten Sie bitte hier.",
    "Please wait here."
   ],
   [
    "Man darf hier nicht rauchen.",
    "Smoking is not allowed here."
   ]
  ],
  "questions": [
   {
    "type": "grammar",
    "prompt": "A staff member says “Warten Sie bitte hier.” What should you do?",
    "options": [
     "Wait here",
     "Go home",
     "Drink water"
    ],
    "answer": 0,
    "why": "Warten means wait.",
    "dlSkill": "situation"
   },
   {
    "type": "grammar",
    "prompt": "Politely ask someone to go straight ahead.",
    "options": [
     "Gehen Sie geradeaus.",
     "Sie geradeaus gehen.",
     "Geradeaus Sie gehen."
    ],
    "answer": 0,
    "why": "A polite instruction starts with the verb.",
    "dlSkill": "use"
   },
   {
    "type": "grammar",
    "prompt": "Read: “Man darf hier nicht rauchen.” Who does the rule apply to?",
    "options": [
     "People in general",
     "Only one man",
     "Only the speaker"
    ],
    "answer": 0,
    "why": "Man refers to people in general.",
    "dlSkill": "reading"
   },
   {
    "type": "grammar",
    "prompt": "Write the missing word: ___ Sie bitte hier! (Wait)",
    "options": [
     "Warten",
     "Wartet",
     "Warte"
    ],
    "answer": 0,
    "why": "The polite instruction is Warten Sie bitte hier.",
    "dlSkill": "write",
    "dlWriteAnswer": "Warten"
   }
  ]
 },
 "A1|Alphabet and spelling": {
  "sections": [
   [
    "What you will be able to do",
    "Connect familiar German spellings to the sounds you hear."
   ],
   [
    "Listen for the difference",
    [
     "J often sounds like English y: Januar (January), Jahr (year).",
     "W sounds like English v: Wasser (water).",
     "V often sounds like English f in familiar native words: Vater (father)."
    ]
   ],
   [
    "Use your ears",
    "Listen to the examples and repeat them. Spellings can look familiar while their sounds differ from English. The pronunciation drill introduces more combinations such as ei and ie."
   ],
   [
    "Remember",
    "You do not need to memorize letter counts or technical sound names. Aim to recognize and say useful words."
   ]
  ],
  "examples": [
   [
    "Januar",
    "January — J sounds like English Y"
   ],
   [
    "Wasser",
    "water — W sounds like English V"
   ],
   [
    "Vater",
    "father — V often sounds like English F"
   ]
  ],
  "questions": []
 }
};

