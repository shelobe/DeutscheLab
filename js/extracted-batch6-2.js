
/* Small synthesized feedback tones. No audio files or network connection required. */
let feedbackAudioContext;
function feedbackEnabled(){return localStorage.getItem('deutschlab-feedback-sounds')!=='off'}
function feedbackSound(correct){
 if(!feedbackEnabled())return;
 try{
  const AudioContextType=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextType)return;
  feedbackAudioContext??=new AudioContextType();
  if(feedbackAudioContext.state==='suspended')feedbackAudioContext.resume();
  const now=feedbackAudioContext.currentTime+.015;
  const notes=correct?[[523.25,0,.11],[659.25,.115,.11],[783.99,.23,.19]]:[[330,0,.13],[261.63,.15,.22]];
  notes.forEach(([freq,delay,duration])=>{
   let osc=feedbackAudioContext.createOscillator(),gain=feedbackAudioContext.createGain();
   osc.type=correct?'sine':'triangle';osc.frequency.setValueAtTime(freq,now+delay);
   gain.gain.setValueAtTime(.0001,now+delay);
   gain.gain.exponentialRampToValueAtTime(correct?.12:.075,now+delay+.018);
   gain.gain.exponentialRampToValueAtTime(.0001,now+delay+duration);
   osc.connect(gain);gain.connect(feedbackAudioContext.destination);
   osc.start(now+delay);osc.stop(now+delay+duration+.02);
  });
 }catch(e){/* Silent fallback if audio is unavailable. */}
}
function soundSettingHTML(){return `<div class="sound-setting"><span>Answer sounds</span><button class="secondary" onclick="toggleFeedbackSound()">${feedbackEnabled()?'On':'Off'}</button></div>`}
function toggleFeedbackSound(){localStorage.setItem('deutschlab-feedback-sounds',feedbackEnabled()?'off':'on');document.querySelectorAll('.sound-setting').forEach(el=>el.outerHTML=soundSettingHTML());if(feedbackEnabled())feedbackSound(true)}
const soundOldFullMark=fullMark;
fullMark=function(ok,answer,why){let s=fullSession;if(!s||s.results.length!==s.idx)return;feedbackSound(ok);return soundOldFullMark(ok,answer,why)};
const soundOldGameMark=gameMark;
gameMark=function(ok,answer){let s=gameSession;if(!s||s.answered)return;feedbackSound(ok);return soundOldGameMark(ok,answer)};
const soundOldPhotoGrade=photoGrade;
photoGrade=function(id,choice){let s=pictureSession;if(!s||s.answered)return;let w=PHOTO_WORDS[id],answer=choice===null?document.getElementById('photoInput')?.value:PHOTO_WORDS[choice]?.[0];if(answer!==undefined)feedbackSound(answer.toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' ')===w[0].toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' '));return soundOldPhotoGrade(id,choice)};
const soundOldPictureGrade=pictureGrade;
pictureGrade=function(...args){let s=pictureSession;if(s?.photo)return soundOldPictureGrade(...args);let before=s?.answered;if(!before){let correct=args[0],chosen=args[1];feedbackSound(String(PICTURE_WORDS[correct]?.[0]||'').toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' ')===String(chosen||'').toLocaleLowerCase('de-DE').trim().replace(/\s+/g,' '))}return soundOldPictureGrade(...args)};
const soundOldReviewAnswer=curriculumReviewAnswer;
curriculumReviewAnswer=function(i){let s=moduleSession;if(s&&!s.answered)feedbackSound(i===s.questions[s.idx].answer);return soundOldReviewAnswer(i)};
const soundOldHome=home;
home=function(){soundOldHome()};
function dlShowSettings(){
 if(typeof toggleMenu==='function')toggleMenu(false);
 app.innerHTML='<section class="card"><h2>Settings</h2><p class="muted">Choose your practice preferences.</p><div id="dlSoundSettings"></div><button class="secondary" onclick="home()">Back to Home</button></section>';
 document.getElementById('dlSoundSettings').innerHTML=soundSettingHTML();
 window.scrollTo(0,0);
}
function dlInstallSettingsMenu(){
 const nav=document.getElementById('sideMenu');
 if(!nav||nav.querySelector('.dl-settings-menu-entry'))return;
 const button=document.createElement('button');
 button.type='button';button.className='dl-settings-menu-entry';
 button.textContent='⚙ Settings';button.addEventListener('click',()=>window.dlShowSettings());
 nav.appendChild(button);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',dlInstallSettingsMenu);else dlInstallSettingsMenu();
