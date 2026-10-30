
/* A1 verb variety and complete-sentence translation feedback. */
(function(){
 const verbRows=[
 ['Ich ___ jeden Morgen Kaffee.',['trinke','trinkst','trinkt'],0,'With ich, trinken becomes trinke.','I drink coffee every morning.'],
 ['Du ___ in Berlin.',['wohnst','wohne','wohnt'],0,'With du, wohnen becomes wohnst.','You live in Berlin.'],
 ['Er ___ ein Buch.',['liest','lese','lesen'],0,'Lesen changes its vowel in the third-person singular: er liest.','He reads a book.'],
 ['Wir ___ heute Pizza.',['essen','esst','isst'],0,'With wir, essen becomes essen.','We are eating pizza today.'],
 ['Sie (she) ___ Deutsch.',['spricht','sprechen','sprichst'],0,'Sprechen changes e to i with sie (she): sie spricht.','She speaks German.'],
 ['Ihr ___ am Samstag Fußball.',['spielt','spielen','spielst'],0,'With ihr, spielen becomes spielt.','You all play soccer on Saturday.'],
 ['Ich ___ eine Schwester.',['habe','hat','hast'],0,'With ich, haben becomes habe.','I have a sister.'],
 ['Du ___ sehr müde.',['bist','bin','ist'],0,'Sein is irregular: du bist.','You are very tired.'],
 ['Meine Mutter ___ im Krankenhaus.',['arbeitet','arbeiten','arbeite'],0,'Arbeiten adds -et with third-person singular: sie arbeitet.','My mother works at the hospital.'],
 ['Wir ___ morgen nach Hause.',['fahren','fährt','fahrt'],0,'With wir, fahren becomes fahren.','We are going home tomorrow.'],
 ['Das Kind ___ im Garten.',['spielt','spielen','spielst'],0,'With das Kind (third-person singular), spielen becomes spielt.','The child plays in the garden.'],
 ['Meine Freunde ___ Musik.',['hören','hört','höre'],0,'A plural subject takes hören.','My friends listen to music.'],
 ['Ich ___ jeden Tag um sieben Uhr auf.',['stehe','steht','stehst'],0,'With ich, aufstehen becomes ich stehe ... auf.','I get up at seven o’clock every day.'],
 ['Du ___ ein neues Fahrrad.',['kaufst','kauft','kaufe'],0,'With du, kaufen becomes kaufst.','You are buying a new bicycle.'],
 ['Sie (they) ___ im Park.',['laufen','läuft','lauft'],0,'With sie (they), laufen becomes laufen.','They are running in the park.'],
 ['Der Hund ___ laut.',['bellt','bellen','bellst'],0,'With der Hund, bellen becomes bellt.','The dog barks loudly.'],
 ['Wir ___ zusammen Deutsch.',['lernen','lernt','lerne'],0,'With wir, lernen becomes lernen.','We learn German together.'],
 ['Ich ___ meine Hausaufgaben.',['mache','macht','machst'],0,'With ich, machen becomes mache.','I do my homework.']
 ];
 const oldFullQuestions=fullQuestions;
 const translations={
  'Das Buch liegt auf dem Tisch.':'The book is on the table.',
  'Die Lampe ist hell.':'The lamp is bright.',
  'Der Tisch ist groß.':'The table is big.',
  'Das Kind spielt.':'The child plays.',
  'Die Katze schläft.':'The cat is sleeping.',
  'Der Hund bellt.':'The dog barks.',
  'Ich heiße Lena.':'My name is Lena.',
  'Guten Morgen!':'Good morning!',
  'Wie geht es dir?':'How are you?',
  'Ich komme aus Deutschland.':'I come from Germany.',
  'Wie heißt du?':'What is your name?',
  'Ich komme aus Kanada.':'I come from Canada.',
  'Wir lernen Deutsch.':'We learn German.',
  'Ich lerne Deutsch.':'I learn German.',
  'Du lernst Deutsch.':'You learn German.'
 };
 const shuffleA1=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 fullQuestions=function(unit){
   if(unit.level==='A1'&&unit.title==='Present-tense verbs'){
     return shuffleA1(verbRows).slice(0,12).map(([prompt,choices,correct,why,english])=>{
       const opts=shuffleA1(choices);
       return {type:'grammar',prompt,options:opts,answer:opts.indexOf(choices[correct]),why,english};
     });
   }
   return oldFullQuestions(unit);
 };
 const oldDlCheck=dlCheck;
 dlCheck=function(){
   const s=fullSession,q=s?.questions?.[s.idx],selected=dlSelected;
   oldDlCheck();
   if(!q||selected===null||!dlAnswered||!q.prompt.includes('___'))return;
   const answer=q.options[q.answer];
   const german=q.prompt.replace('___',answer);
   const english=q.english||translations[german];
   if(!english)return;
   const feedback=document.querySelector('#dl-result .dl-flow-feedback');
   if(!feedback||feedback.querySelector('.dl-a1-translation')||feedback.querySelector('.dl-article-translation'))return;
   const block=document.createElement('div');block.className='dl-a1-translation';
   const germanLine=document.createElement('p');
   const germanLabel=document.createElement('strong');germanLabel.textContent='German: ';
   germanLine.append(germanLabel,document.createTextNode(german));
   const englishLine=document.createElement('p');
   const englishLabel=document.createElement('strong');englishLabel.textContent='English: ';
   englishLine.append(englishLabel,document.createTextNode(english));
   block.append(germanLine,englishLine);feedback.appendChild(block);
 };
})();
