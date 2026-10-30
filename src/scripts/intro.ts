export {};
const root=document.documentElement;
const overlay=document.querySelector<HTMLElement>("[data-sk-intro]");
if(overlay&&root.dataset.intro==="pending"){
 let finished=false;
 const skip=overlay.querySelector<HTMLButtonElement>("[data-intro-skip]");
 const priorOverflow=document.body.style.overflow;
 document.body.style.overflow="hidden";
 const beatTimers:ReturnType<typeof setTimeout>[]=[];
 let finishTimer:ReturnType<typeof setTimeout>|undefined;
 let cleanupTimer:ReturnType<typeof setTimeout>|undefined;
 const finish=()=>{
  if(finished)return;finished=true;
  if(finishTimer!==undefined)clearTimeout(finishTimer);
  beatTimers.forEach(clearTimeout);
  root.dataset.intro="leaving";
  cleanupTimer=setTimeout(()=>{
   document.body.style.overflow=priorOverflow;
   root.dataset.intro="done";
   overlay.remove();
   if(document.activeElement===skip)document.querySelector<HTMLAnchorElement>(".skip-link")?.focus({preventScroll:true});
  },420);
 };
 try{sessionStorage.setItem("skull-intro-seen","1")}catch{}
 skip?.addEventListener("click",finish,{once:true});
 document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&!finished){event.preventDefault();finish()}
  if(event.key==="Tab"&&!finished){event.preventDefault();skip?.focus({preventScroll:true})}
 });
 window.addEventListener("pagehide",()=>{
  beatTimers.forEach(clearTimeout);
  document.body.style.overflow=priorOverflow;
  if(finishTimer!==undefined)clearTimeout(finishTimer);
  if(cleanupTimer!==undefined)clearTimeout(cleanupTimer);
 },{once:true});
 // Editorial beats only; never pretend to measure network requests.
 const beats=Array.from(overlay.querySelectorAll<HTMLElement>("[data-intro-beat]"));
 const status=overlay.querySelector<HTMLElement>(".sk-intro-status");
 const words=root.lang.startsWith("en")
  ? ["INITIALIZING IDENTITY","CONNECTING IDEAS","ENTERING EXPERIENCE"]
  : ["PRESENTANDO IDENTIDAD","CONECTANDO IDEAS","ENTRANDO A SKULL"];
 [0,970,1900].forEach((at,i)=>beatTimers.push(setTimeout(()=>{
  if(finished)return;
  beats.forEach((el,index)=>el.dataset.active=String(index===i));
  if(status)status.textContent=words[i];
 },at)));
 finishTimer=setTimeout(finish,2750);
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches)skip?.focus({preventScroll:true});
 else finish();
}
