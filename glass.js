/* Adds missing navigation behaviour. Existing inline code owns the planner,
   catalogue filters; enquiry and floating social controls live below. */
(() => {
 const header=document.querySelector('header'),nav=header?.querySelector('nav');
 if(!nav)return;
 nav.id='primary-navigation';nav.classList.add('site-mobile-nav');
 const menu=document.createElement('button');menu.type='button';menu.className='menu';menu.textContent='Menu ☰';menu.setAttribute('aria-controls',nav.id);menu.setAttribute('aria-expanded','false');header.insertBefore(menu,nav);
 function close(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();menu.focus()}});
 document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 const main=document.querySelector('main');if(main){main.id='main-content';const skip=document.createElement('a');skip.className='skip-link';skip.href='#main-content';skip.textContent='Skip to content';document.body.prepend(skip)}
 const form=document.querySelector('#quoteform');if(form){for(const el of form.querySelectorAll('input,textarea'))el.maxLength=el.tagName==='TEXTAREA'?3000:150;form.querySelector('[name="contact"]')?.setAttribute('autocomplete','email')}
 const sectionLabel=header.querySelector('.current-section');
 const sections=[...document.querySelectorAll('[data-section-title]')], links=[...nav.querySelectorAll('a')];
 let frame=0, previous=null;
 function updateCurrent(){
  frame=0;
  const line=header.getBoundingClientRect().bottom+24;
  let current=sections[0];
  for(const section of sections){if(section.getBoundingClientRect().top<=line)current=section;else break}
  const last=sections[sections.length-1];
  if(last&&window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2&&last.getBoundingClientRect().top<window.innerHeight)current=last;
  if(!current||current===previous)return;
  previous=current;
  if(sectionLabel)sectionLabel.textContent=current.dataset.sectionTitle;
  for(const link of links){if(link.getAttribute('href')==='#'+current.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')}
 }
 function current(){if(!frame)frame=requestAnimationFrame(updateCurrent)}
 window.addEventListener('scroll',current,{passive:true});window.addEventListener('resize',current);window.addEventListener('pageshow',current);
 window.addEventListener('hashchange',current);current();
})();

(() => {
 const video=document.querySelector('.glass-hero-video');if(!video)return;
 video.defaultMuted=true;video.muted=true;video.volume=0;video.autoplay=true;video.loop=true;video.playsInline=true;video.controls=false;
 video.disablePictureInPicture=true;video.setAttribute('disablepictureinpicture','');video.setAttribute('disableremoteplayback','');
 function play(){if(!document.hidden)video.play().catch(()=>{})}
 video.addEventListener('volumechange',()=>{if(!video.muted||video.volume!==0){video.muted=true;video.volume=0}});
 video.addEventListener('canplay',play);document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else play()});play();
})();

(() => {
 const form=document.querySelector('#quoteform'), whatsapp=document.querySelector('.sun-panel .social-whatsapp');
 if(!form||!whatsapp)return;
 const status=form.querySelector('#status'), messageLink=form.querySelector('#whatsapp-enquiry-link');
 const fields=[['name','Name'],['contact','Phone or email'],['location','Location'],['interest','Interested in'],['needs','What I would like to power']];
 function enquiry(){
  const data=new FormData(form);
  for (const key of ['name','contact','location','needs']) {const input=form.elements.namedItem(key);input.setCustomValidity(String(data.get(key)||'').trim()?'':'Please enter a value.');}
  if(!form.reportValidity())return null;
  const lines=fields.map(([key,label])=>label+': '+String(data.get(key)||'').trim());
  const load=document.querySelector('#load'),hours=document.querySelector('#hours');
  if(load&&hours)lines.push('Planning example: '+load.value+' W for '+hours.value+' hours.');
  return 'Hello MaxTT, I would like a quote.\n\n'+lines.join('\n\n');
 }
 form.addEventListener('submit',event=>{
  event.preventDefault();const message=enquiry();if(!message)return;
  const url=new URL(whatsapp.href);url.searchParams.set('text',message);
  messageLink.href=url.href;messageLink.hidden=false;messageLink.click();
  status.textContent='Review your enquiry in WhatsApp and tap Send. If it did not open, use the link below.';
 });
 form.querySelector('#download-enquiry').addEventListener('click',()=>{
  const message=enquiry();if(!message)return;
  const url=URL.createObjectURL(new Blob([message+'\n\nPrepared locally; not submitted to MaxTT.'],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='MaxTT-Power-Enquiry.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  status.textContent='Your copy is ready to download. It has not been sent.';
 });
 form.addEventListener('input',event=>{event.target.setCustomValidity?.('');messageLink.hidden=true;status.textContent=''});
})();

(() => {
 const sun=document.querySelector('.social-sun');if(!sun)return;
 const toggle=sun.querySelector('.sun-toggle'),panel=sun.querySelector('.sun-panel');
 function setOpen(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close contact and social links':'Open contact and social links')}
 toggle.addEventListener('click',()=>setOpen(panel.hidden));
 document.addEventListener('click',event=>{if(!panel.hidden&&!sun.contains(event.target))setOpen(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setOpen(false);toggle.focus()}});
})();
