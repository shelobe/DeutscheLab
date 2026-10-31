
const dlMascotFiles=['correct_dog_transparent.png','incorrect_dog_transparent.png','a_clean_high_resolution_png_style_illustration_o-8%20(1).png','a_crisp_high_resolution_cartoon_illustration_sty.png','file_00000000392481f5808e9f44f95b1e2d.png','file_0000000094cc81f586867a5e426d23a4.png'];
const dlMascotPreloads=dlMascotFiles.map(src=>{const img=new Image();img.src=src;return img});

(function(){
 const root=document.getElementById('app');if(!root)return;
 const selectors='#fullFeedback,#moduleFeedback,#courseFeedback,#practiceFeedback,#gameFeedback,#pictureFeedback,#dialogue-feedback,#reviewFeedback,#articleFeedback,#a12Feedback,#dl-result,.dl-flow-feedback';
 function apply(){for(const area of root.querySelectorAll(selectors)){
  const label=[...area.querySelectorAll('.correct,.wrong,.unit-explain>strong,.dl-flow-feedback>strong,.game-feedback>strong,.picture-answer>h3')].find(el=>/^(correct!?|not quite[.!]?|richtig!?)/i.test((el.textContent||'').trim()));
  if(!label||label.classList.contains('dl-result-label'))continue;
  const good=/^(correct|richtig)/i.test(label.textContent.trim());
  const box=document.createElement('div');box.className='dl-result-badge '+(good?'dl-result-good':'dl-result-bad');
  const icon=document.createElement('img');
  const ids=['dog','panda','cat'];const id=ids[Math.floor(Math.random()*ids.length)];
  const images={dog:['correct_dog_transparent.png','incorrect_dog_transparent.png'],panda:['a_clean_high_resolution_png_style_illustration_o-8%20(1).png','a_crisp_high_resolution_cartoon_illustration_sty.png'],cat:['file_00000000392481f5808e9f44f95b1e2d.png','file_0000000094cc81f586867a5e426d23a4.png']};
  icon.src=images[id][good?0:1];icon.classList.add('dl-avatar-'+id);icon.alt=(good?'Happy ':'Thoughtful ')+({dog:'German Shepherd',panda:'red panda',cat:'gray tabby cat'}[id]);
  icon.onerror=function(){this.onerror=null;this.src='avatar_'+id+'.webp'};
  label.classList.add('dl-result-label');label.textContent=good?'Well done!':'Not quite!';label.before(box);box.append(icon,label);
 }}
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}).observe(root,{childList:true,subtree:true});apply();
})();
