
/* Unify standalone Listening Practice with the app's avatar feedback convention. */
(function(){
 const oldPractice=listeningPractice;
 listeningPractice=function(){oldPractice();const card=document.getElementById('listenFeedback')?.closest('.card');if(!card)return;card.classList.add('dl-listen-practice-card');card.querySelectorAll('button[onclick^="listeningAnswer("]').forEach(b=>b.classList.add('dl-listen-choice'));const h=[...card.querySelectorAll('h3')].find(el=>el.textContent.trim()==='What did you hear?');h?.classList.add('dl-listen-prompt')};
 const oldAnswer=listeningAnswer;
 listeningAnswer=function(choice,answer,german){oldAnswer(choice,answer,german);const box=document.getElementById('listenFeedback');if(!box)return;const card=box.closest('.card');card?.classList.add('dl-listen-complete');const ok=choice===answer;const label=box.querySelector('.correct,.wrong');if(!label)return;
  const badge=document.createElement('div');badge.className='dl-result-badge '+(ok?'dl-result-good':'dl-result-bad');
  const avatar=document.createElement('img');const names=['dog','cat','panda'];const name=names[Math.floor(Math.random()*names.length)];const files={dog:['correct_dog_transparent.png','incorrect_dog_transparent.png'],cat:['file_00000000392481f5808e9f44f95b1e2d.png','file_0000000094cc81f586867a5e426d23a4.png'],panda:['a_clean_high_resolution_png_style_illustration_o-8%20(1).png','a_crisp_high_resolution_cartoon_illustration_sty.png']};avatar.src=files[name][ok?0:1];avatar.alt=ok?'Happy animal avatar':'Encouraging animal avatar';avatar.onerror=()=>{avatar.onerror=null;avatar.src='avatar_'+name+'.webp'};
  const title=document.createElement('strong');title.className='dl-result-label';title.textContent=ok?'Well done!':'Not quite!';badge.append(avatar,title);label.replaceWith(badge);
  const explain=box.querySelector('.explain-box');if(explain){const germanLine=box.querySelector(':scope > p');if(germanLine)germanLine.remove();explain.querySelector('h3')?.remove()}
  const actions=[...box.querySelectorAll(':scope > button')];if(actions.length){const row=document.createElement('div');row.className='dl-listen-actions';row.style.cssText='display:flex;gap:10px;flex-wrap:wrap;margin:10px 0';actions[0].before(row);actions.forEach(b=>row.append(b))}
 };
})();
