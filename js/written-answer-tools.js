/* Keyboard access and directional substitutes for general written German. */
(function(){
 const norm=s=>String(s||'').normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/[.!?]+$/,'');
 window.dlWrittenMatch=function(actual,expected,strict=false){
  actual=norm(actual);expected=norm(expected);
  if(actual===expected)return true;
  if(strict)return false;
  const variants={'ä':'(?:ä|ae)','ö':'(?:ö|oe)','ü':'(?:ü|ue)','ß':'(?:ß|ss)'};
  const pattern=[...expected].map(ch=>variants[ch]||('.*+?^$()|[]{}\\'.includes(ch)?'\\'+ch:ch)).join('');
  return new RegExp('^'+pattern+'$','u').test(actual);
 };
 window.dlStrictSpelling=function(q,u){
  return !!q?.dlStrictSpelling||/alphabet|umlaut|pronunciation|spelling/i.test(u?.title||'')||q?.dlReviewMode==='type'||/spell|dictation/i.test([q?.dlSkill,q?.type,q?.kind].join(' '));
 };
 window.dlSpellingNote=function(box,actual,expected,strict=false){
  if(!box||norm(actual)===norm(expected)||!window.dlWrittenMatch(actual,expected,strict)||box.querySelector('.dl-standard-spelling'))return;
  const p=document.createElement('p');p.className='dl-standard-spelling';p.textContent='Correct — standard spelling: '+expected;box.append(p);
 };
 window.dlCharacterToggle=function(keys){
  if(!keys||keys.parentElement?.classList.contains('dl-character-toggle'))return;
  const details=document.createElement('details'),summary=document.createElement('summary');
  details.className='dl-character-toggle';summary.textContent='Special characters';
  keys.replaceWith(details);details.append(summary,keys);
 };
 const refresh=()=>document.querySelectorAll('.dl-practical-keys,.dl-review-character-keys').forEach(window.dlCharacterToggle);
 const root=document.getElementById('app');if(root)new MutationObserver(refresh).observe(root,{childList:true,subtree:true});
 const style=document.createElement('style');style.textContent='.dl-character-toggle{width:100%;margin-top:8px}.dl-character-toggle summary{cursor:pointer;color:#b8d9dc;font-size:.9rem;padding:8px 0;min-height:28px}.dl-character-toggle[open] summary{margin-bottom:6px}';document.head.append(style);refresh();
})();
