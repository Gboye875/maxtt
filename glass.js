/* Adds missing navigation behaviour. Existing inline code owns the planner,
   catalogue filters and enquiry downloads, avoiding duplicate listeners. */
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
