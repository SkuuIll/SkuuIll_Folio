export {};
const shell=document.querySelector<HTMLElement>("[data-depth-shell]");
if(shell){
 const stage=shell.querySelector<HTMLElement>("[data-depth-stage]")!;
 const buttons=[...shell.querySelectorAll<HTMLButtonElement>("[data-depth-pick]")];
 const name=shell.querySelector<HTMLElement>("[data-depth-name]");
 const description=shell.querySelector<HTMLElement>("[data-depth-description]");
 const link=shell.querySelector<HTMLAnchorElement>("[data-depth-link]");
 const english=document.documentElement.lang.startsWith("en");
 const projects={
  vigia:{name:"Vigía",es:"Gestión hotelera y operaciones conectadas.",en:"Hotel management and connected operations."},
  cpaul:{name:"CPAUL Atelier",es:"Editor 3D y comercio personalizado.",en:"3D editor and customized commerce."},
  "pubg-map":{name:"Tactical Map",es:"Cartografía interactiva y herramientas PWA.",en:"Interactive cartography and PWA tools."}
 } as const;
 type Id=keyof typeof projects;
 const root=document.documentElement;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const allowTilt=()=>!reduced.matches && root.dataset.performance!=="lite" && matchMedia("(pointer:fine)").matches;
 const base=import.meta.env.BASE_URL + (english?"en/projects/":"proyectos/");
 let animation=0;
 const select=(id:Id)=>{
  stage.dataset.active=id;
  buttons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.depthPick===id)));
  const info=projects[id];
  if(name)name.textContent=info.name;
  if(description)description.textContent=english?info.en:info.es;
  if(link)link.href=base+id+"/";
 };
 buttons.forEach(button=>button.addEventListener("click",()=>{const id=button.dataset.depthPick as Id;if(id in projects)select(id)}));
 const reset=()=>{stage.style.setProperty("--rx","0deg");stage.style.setProperty("--ry","0deg");};
 stage.addEventListener("pointermove",event=>{
  if(!allowTilt())return;
  if(animation)cancelAnimationFrame(animation);
  const bounds=stage.getBoundingClientRect();
  const x=(event.clientX-bounds.left)/bounds.width-.5;
  const y=(event.clientY-bounds.top)/bounds.height-.5;
  animation=requestAnimationFrame(()=>{
   stage.style.setProperty("--ry",(x*11).toFixed(2)+"deg");
   stage.style.setProperty("--rx",(-y*8).toFixed(2)+"deg");
  });
 },{passive:true});
 stage.addEventListener("pointerleave",reset);
 reduced.addEventListener("change",reset);
 document.addEventListener("visibilitychange",()=>{if(document.hidden)reset()});
 window.addEventListener("pagehide",()=>{if(animation)cancelAnimationFrame(animation)},{once:true});
 select("vigia");
}
