/* Small, one-time entrances. Content is never hidden while waiting for JS. */
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const running=new Set();
 function reveal(element,delay=0){
  if(preference.matches||!element||element.hidden)return;
  try{
   const frames={opacity:[0,1],transform:['translateY(12px)','translateY(0px)']};
   if(window.Motion?.animate){const a=window.Motion.animate(element,frames,{duration:.42,delay,ease:[.22,1,.36,1]});running.add(a);Promise.resolve(a).finally(()=>running.delete(a));}
   else if(element.animate){const a=element.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0px)'}],{duration:420,delay:delay*1000,easing:'ease-out'});running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a));}
  }catch{/* Keep ordinary readable content if animation is unsupported. */}
 }
 document.querySelectorAll('.hero-copy>.eyebrow,.hero-copy>h1,.hero-copy>p,.hero-copy>.btn').forEach((el,i)=>reveal(el,i*.07));
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;observer.unobserve(el);let delay=0;if(el.matches('.card,.product,.step'))delay=Math.min([...el.parentElement.children].indexOf(el)*.07,.21);reveal(el,delay)}},{threshold:.12});
  document.querySelectorAll('section h2,.card,.product,.step').forEach(el=>observer.observe(el));
  // Inline catalogue code remains responsible for filtering. Animate only results.
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.product:not([hidden])').forEach((el,i)=>{observer.unobserve(el);reveal(el,i*.05)})}));
 }
 const energy=document.querySelector('#energy'),load=document.querySelector('#load'),hours=document.querySelector('#hours');
 if(energy&&load&&hours){let displayed=Number(load.value)*Number(hours.value)/1000,frame=0;
  function easeResult(){cancelAnimationFrame(frame);const target=Number(load.value)*Number(hours.value)/1000,start=performance.now(),from=displayed;if(preference.matches){displayed=target;energy.textContent=target.toFixed(1)+' kWh';return}function tick(now){const t=Math.min((now-start)/220,1);displayed=from+(target-from)*(1-(1-t)**3);energy.textContent=displayed.toFixed(1)+' kWh';if(t<1)frame=requestAnimationFrame(tick)}frame=requestAnimationFrame(tick)}
  load.addEventListener('input',easeResult);hours.addEventListener('input',easeResult);
 }
 document.querySelectorAll('.faq details').forEach(details=>{let busy=false;const summary=details.querySelector('summary');summary.addEventListener('click',event=>{if(preference.matches||!details.animate)return;event.preventDefault();if(busy)return;busy=true;const wasOpen=details.open,from=details.getBoundingClientRect().height;details.open=!wasOpen;const to=details.getBoundingClientRect().height;details.open=true;details.style.overflow='hidden';const a=details.animate({height:[from+'px',to+'px']},{duration:220,easing:'ease-out'});running.add(a);const finish=()=>{details.open=!wasOpen;details.style.overflow='';busy=false;running.delete(a)};a.onfinish=finish;a.oncancel=finish;})});
 preference.addEventListener('change',()=>{if(preference.matches)for(const a of running){try{a.finish?.();a.complete?.()}catch{}}});
})();

