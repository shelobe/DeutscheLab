
(function(){
 const original=window.fullStudy;
 if(typeof original!=='function')return;
 window.fullStudy=function(id){
  const result=original.apply(this,arguments);
  const unit=FULL_UNITS[id];
  if(!unit||!/alphabet and spelling/i.test(unit.title||''))return result;
  const card=document.querySelector('#app .card');
  if(!card||card.querySelector('.dl-letters-intro'))return result;
  const section=document.createElement('section');section.className='dl-letters-intro';
  section.innerHTML='<h3>Hear the extra German letters first</h3><p>German also uses <strong>ä, ö, ü</strong> (umlauts) and <strong>ß</strong> (Eszett). Listen to each example before you begin the pronunciation exercises. The umlauts are distinct vowel sounds; ß represents an s sound.</p>'+
   '<div class="dl-letters-grid">'+[
    ['Ä / ä','Mädchen','The ä vowel in Mädchen (girl)'],
    ['Ö / ö','schön','The ö vowel in schön (beautiful)'],
    ['Ü / ü','Mütter','The ü vowel in Mütter (mothers)'],
    ['ẞ / ß','Straße','The ß sounds like ss in Straße (street)']
   ].map(x=>'<div class="dl-letter-item"><strong>'+x[0]+'</strong><span>'+x[2]+'</span><button type="button" class="secondary" data-german-audio="'+x[1]+'">▶ Hear '+x[1]+'</button></div>').join('')+'</div>';
  const examples=[...card.querySelectorAll('h3')].find(h=>h.textContent.trim()==='Examples');
  if(examples)examples.before(section);else card.prepend(section);
  section.querySelectorAll('[data-german-audio]').forEach(b=>b.addEventListener('click',()=>speak(b.dataset.germanAudio)));
  return result;
 };
})();

