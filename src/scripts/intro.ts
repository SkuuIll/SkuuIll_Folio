export {};
const root=document.documentElement;
const overlay=document.querySelector<HTMLElement>("[data-sk-intro]");
if(overlay&&root.dataset.intro==="pending"){
 let finished=false;
 const skip=overlay.querySelector<HTMLButtonElement>("[data-intro-skip]");
 let finishTimer:ReturnType<typeof setTimeout>|undefined;
 let cleanupTimer:ReturnType<typeof setTimeout>|undefined;
 const finish=()=>{
  if(finished)return;finished=true;
  if(finishTimer!==undefined)clearTimeout(finishTimer);
  root.dataset.intro="leaving";
  cleanupTimer=setTimeout(()=>{
   root.dataset.intro="done";
   overlay.remove();
   if(document.activeElement===skip)document.querySelector<HTMLAnchorElement>(".skip-link")?.focus({preventScroll:true});
  },330);
 };
 try{sessionStorage.setItem("skull-intro-seen","1")}catch{}
 skip?.addEventListener("click",finish,{once:true});
 document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!finished)finish()});
 window.addEventListener("pagehide",()=>{
  if(finishTimer!==undefined)clearTimeout(finishTimer);
  if(cleanupTimer!==undefined)clearTimeout(cleanupTimer);
 },{once:true});
 // Progress means narrative timing, not fabricated network load.
 finishTimer=setTimeout(finish,1450);
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches)skip?.focus({preventScroll:true});
 else finish();
}
