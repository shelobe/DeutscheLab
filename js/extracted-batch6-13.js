
(function(){
 const endpoint='https://api.web3forms.com/submit';
 // Replace this value with the Web3Forms access key issued for the receiving inbox.
 const accessKey='43637b95-3d3c-49e7-9551-07cce39724d0';
 function install(){
  const nav=document.getElementById('sideMenu');
  if(!nav||nav.querySelector('.dl-feedback-menu-entry'))return;
  const button=document.createElement('button');
  button.type='button';button.className='dl-feedback-menu-entry';
  button.textContent='✉ Send Feedback';
  button.addEventListener('click',function(){window.dlShowBetaFeedback()});
  nav.appendChild(button);
  const settings=nav.querySelector('.dl-settings-menu-entry');
  if(settings)settings.after(button);
 }
 window.dlShowBetaFeedback=function(){
  if(typeof window.toggleMenu==='function')window.toggleMenu(false);
  const app=document.getElementById('app');if(!app)return;
  app.innerHTML='<section class="card dl-beta-feedback"><h2>Send Feedback</h2><p>Found a bug or have an idea? Send it to the DeutschLab developer. No account or email required.</p>'+
   '<form id="dlBetaFeedbackForm">'+
   '<label for="dlFeedbackType">Feedback type</label><select id="dlFeedbackType" name="Feedback type" required><option value="Bug report">Bug report</option><option value="Suggestion">Suggestion</option><option value="Other">Other</option></select>'+
   '<label for="dlFeedbackArea">Where did it happen?</label><input id="dlFeedbackArea" name="Screen or lesson" maxlength="150" placeholder="e.g. Supermarkt, A1 Lesson 3">'+
   '<label for="dlFeedbackMessage">What happened, or what would you suggest?</label><textarea id="dlFeedbackMessage" name="Message" minlength="5" maxlength="5000" required placeholder="Describe the issue or suggestion"></textarea>'+
   '<p class="muted">Do not include passwords or API keys.</p>'+
   '<p id="dlFeedbackStatus" role="status" aria-live="polite"></p>'+
   '<div class="dl-feedback-actions"><button id="dlFeedbackSend" type="submit">Send Feedback</button><button type="button" class="secondary" onclick="home()">Back to Home</button></div></form></section>';
  const form=document.getElementById('dlBetaFeedbackForm');
  const status=document.getElementById('dlFeedbackStatus');
  const send=document.getElementById('dlFeedbackSend');
  if(!accessKey){send.disabled=true;status.textContent='Feedback is temporarily unavailable while the new service is being configured.';}
  form.addEventListener('submit',async function(event){
   event.preventDefault();
   if(!accessKey)return;
   send.disabled=true;status.textContent='Sending feedback…';
   const payload=new FormData(form);
   payload.append('access_key',accessKey);
   payload.append('subject','DeutschLab beta feedback');
   payload.append('from_name','DeutschLab Tester');
   try{
    const response=await fetch(endpoint,{method:'POST',body:payload,headers:{Accept:'application/json'}});
    const result=await response.json();
    if(!response.ok||!result.success)throw new Error('Submission failed');
    form.reset();status.textContent='Feedback sent successfully. Thank you!';
   }catch(error){status.textContent='Feedback could not be sent. Please try again later.';}
   finally{send.disabled=false;}
  });
  window.scrollTo(0,0);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
