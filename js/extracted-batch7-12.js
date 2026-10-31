
(function(){
const oldStudy=fullStudy;
fullStudy=function(id){
 oldStudy(id);
 const u=FULL_UNITS[id],card=app.querySelector('.card');
 if(!u||!card)return;
 // The old rule explained masculine accusative den but omitted an example.
 if(u.title==='Two-way prepositions'){
  const examplesHeading=[...card.querySelectorAll('h3')].find(h=>h.textContent.trim()==='Examples');
  const lastExample=examplesHeading?.nextElementSibling?.nextElementSibling?.nextElementSibling;
  if(lastExample&&lastExample.classList.contains('vocab-row')){
   lastExample.insertAdjacentHTML('afterend',`<div class="vocab-row"><div class="vocab-copy"><strong>Ich lege das Buch auf den Tisch.</strong><span>I put the book onto the table.</span></div><button class="secondary" onclick="speak('Ich lege das Buch auf den Tisch.')">🔊</button></div>`);
  }
 }
 const oldTitle=card.querySelector('h2');
 if(oldTitle)oldTitle.textContent='Let’s learn together';
 const oldButtons=[...card.querySelectorAll('button')].filter(b=>!b.closest('.vocab-row'));
 const main=oldButtons.find(b=>/Start 7 exercises|Try what you learned|Start exercises/i.test(b.textContent));
 if(main){main.textContent='Ready? Let’s practice';main.classList.add('lesson-next');}
 const back=oldButtons.find(b=>/Back to course|Back to my learning path/i.test(b.textContent));
 if(back){back.textContent='My learning path';back.classList.add('secondary');}
 const extra=card.querySelector('.unit-explain:has(button)');
 if(extra&&/Extended skill practice/i.test(extra.textContent)){
  const details=document.createElement('details');details.className='lesson-more';
  details.innerHTML='<summary>Want more practice? ▾</summary>';
  extra.parentNode.insertBefore(details,extra);details.appendChild(extra);
  const h=extra.querySelector('h3');if(h)h.textContent='Practice a little more';
  const btn=extra.querySelector('button');if(btn)btn.textContent='Try extra activities';
 }
 card.insertAdjacentHTML('afterbegin',`<div class="lesson-welcome"><img src="${id%2?'katze.png':'hund.png'}" alt="Your learning companion"><div><h2>Lesson ${FULL_UNITS.filter(x=>x.level===u.level).findIndex(x=>x===u)+1}: ${safeText(u.title)}</h2><p>First, learn the pattern. Then try it yourself.</p></div></div>`);
};
})();
