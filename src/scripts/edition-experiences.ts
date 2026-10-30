export {};
type Project = {id:string; title:string; summary:string; label:string; href:string; image:string};
type Story = {number:string;title:string;body:string};
const shell=document.querySelector<HTMLElement>("[data-edition-experiences]");
if(shell){
 const en=document.documentElement.lang.startsWith("en");
 const tr=(es:string,english:string)=>en?english:es;
 const projectList:Project[]=JSON.parse(shell.dataset.projects||"[]");
 const steps:Story[]=JSON.parse(shell.dataset.storySteps||"[]");
 const set=(root:ParentNode,selector:string,value:string)=>{const node=root.querySelector<HTMLElement>(selector);if(node)node.textContent=value};
 const projectBy=(id:string)=>projectList.find(item=>item.id===id)??projectList[0];
 // SKULL OS: one window, four authentic project entries. No iframe or remote service.
 const os=shell.querySelector<HTMLElement>("[data-os]")!;
 if(os){
  const buttons=[...os.querySelectorAll<HTMLButtonElement>("[data-os-open]")];
  function open(id:string){
   const p=projectBy(id);if(!p)return;
   buttons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.osOpen===p.id)));
   set(os,"[data-os-window-title]",p.title);set(os,"[data-os-type]",p.label);
   set(os,"[data-os-name]",p.title);set(os,"[data-os-summary]",p.summary);
   const link=os.querySelector<HTMLAnchorElement>("[data-os-link]");if(link)link.href=p.href;
   const img=os.querySelector<HTMLImageElement>("[data-os-image]");
   const placeholder=os.querySelector<HTMLElement>("[data-os-placeholder]");
   if(img){img.hidden=!p.image;if(p.image){img.src=p.image;img.alt=tr("Captura de ","Screenshot of ")+p.title}}
   if(placeholder)placeholder.hidden=Boolean(p.image);
  }
  // A real window: reopen via its app icon, maximize/restores, and drag using
  // the titlebar on fine-pointer desktops. Drag distance is bounded.
  const windowPanel=os.querySelector<HTMLElement>("[data-os-window]")!;
  const bar=os.querySelector<HTMLElement>("[data-os-drag-handle]");
  os.querySelector("[data-os-close]")?.addEventListener("click",()=>{
   windowPanel.hidden=true;
   buttons.forEach(button=>button.setAttribute("aria-pressed","false"));
  });
  os.querySelector("[data-os-max]")?.addEventListener("click",()=>{
   windowPanel.classList.toggle("is-maximized");
   windowPanel.style.setProperty("--os-x","0px");
   windowPanel.style.setProperty("--os-y","0px");
  });
  let grabbing=false,originX=0,originY=0,offX=0,offY=0;
  bar?.addEventListener("pointerdown",event=>{
   if(event.pointerType!=="mouse"||event.button!==0||
    (event.target as Element).closest("button")||
    window.matchMedia("(max-width:767px)").matches||
    windowPanel.classList.contains("is-maximized"))return;
   grabbing=true;originX=event.clientX-offX;originY=event.clientY-offY;
   bar.setPointerCapture(event.pointerId);
  });
  bar?.addEventListener("pointermove",event=>{
   if(!grabbing)return;
   offX=Math.max(-125,Math.min(125,event.clientX-originX));
   offY=Math.max(-85,Math.min(85,event.clientY-originY));
   windowPanel.style.setProperty("--os-x",offX+"px");
   windowPanel.style.setProperty("--os-y",offY+"px");
  });
  const finish=()=>{grabbing=false};
  bar?.addEventListener("pointerup",finish);
  bar?.addEventListener("pointercancel",finish);
  buttons.forEach(button=>button.addEventListener("click",()=>{
   windowPanel.hidden=false;open(button.dataset.osOpen||"vigia");
  }));
  open("vigia");
 }
 // X-ray: interactive isometric separation, no WebGL context.
 const xray=shell.querySelector<HTMLElement>("[data-xray]");
 if(xray){
  const buttons=[...xray.querySelectorAll<HTMLButtonElement>("[data-xray-pick]")];
  const labels=en?["Interface","API","Data","Operations"]:["Interfaz","API","Datos","Operaciones"];
  const descriptions=en?["Screens, components and accessibility.","Business logic, permissions and contracts.","Persistence, queries and validation.","Deployment, tests and monitoring."]:["Pantallas, componentes y accesibilidad.","Lógica, permisos y contratos.","Persistencia, consultas y validación.","Despliegue, pruebas y monitoreo."];
  buttons.forEach((button,i)=>button.addEventListener("click",()=>{
   xray.dataset.step=String(i);
   buttons.forEach((b,n)=>b.setAttribute("aria-pressed",String(i===n)));
   set(xray,"[data-xray-count]",String(i+1).padStart(2,"0"));
   set(xray,"[data-xray-title]",labels[i]);
   set(xray,"[data-xray-description]",descriptions[i]);
  }));
  xray.dataset.step="0";
 }
 // Museum: curated exhibit, proper alt text and no fabricated mockups.
 const museum=shell.querySelector<HTMLElement>("[data-museum]")!;
 if(museum&&projectList.length){
  let current=0;
  const image=museum.querySelector<HTMLImageElement>("[data-museum-image]");
  const placeholder=museum.querySelector<HTMLElement>("[data-museum-placeholder]");
  const link=museum.querySelector<HTMLAnchorElement>("[data-museum-link]");
  function exhibit(i:number){
   current=(i+projectList.length)%projectList.length;
   const p=projectList[current];
   set(museum,"[data-museum-title]",p.title);set(museum,"[data-museum-desc]",p.summary);
   set(museum,"[data-museum-index]",String(current+1).padStart(2,"0")+" / "+String(projectList.length).padStart(2,"0"));
   if(link)link.href=p.href;
   if(image){image.hidden=!p.image;if(p.image){image.src=p.image;image.alt=tr("Captura de ","Screenshot of ")+p.title}}
   if(placeholder)placeholder.hidden=Boolean(p.image);
  }
  museum.querySelector("[data-museum-next]")?.addEventListener("click",()=>exhibit(current+1));
  museum.querySelector("[data-museum-previous]")?.addEventListener("click",()=>exhibit(current-1));
  exhibit(0);
 }
 // Terminal: safe command interpreter, no eval/network, escaped output via textContent.
 const terminal=shell.querySelector<HTMLElement>("[data-terminal]");
 if(terminal){
  const form=terminal.querySelector<HTMLFormElement>("[data-terminal-form]");
  const input=terminal.querySelector<HTMLInputElement>("[data-terminal-input]");
  const history=terminal.querySelector<HTMLElement>("[data-terminal-history]");
  const prompt="skull@portfolio $ ";
  const add=(line:string,href?:string)=>{
   if(!history)return;
   const p=document.createElement("p");
   if(href){const a=document.createElement("a");a.href=href;a.textContent=line;p.append(a)}
   else p.textContent=line;
   history.append(p);history.scrollTop=history.scrollHeight;
  };
  const run=(raw:string)=>{
   const command=raw.trim().toLowerCase().slice(0,50);
   if(!command)return;
   add(prompt+command);
   switch(command){
    case "help":add(tr("Comandos: help, projects, skills, contact, about, clear","Commands: help, projects, skills, contact, about, clear"));break;
    case "projects":projectList.forEach(p=>add(p.title+" ↗",p.href));break;
    case "skills":add(tr("Web · Android · APIs · Automatización · Linux","Web · Android · APIs · Automation · Linux"));break;
    case "contact":add("moreappmix@gmail.com ↗","mailto:moreappmix@gmail.com");break;
    case "about":add(tr("Skull: desarrollador independiente de software desde Chaco, Argentina.","Skull: independent software developer from Chaco, Argentina."));break;
    case "clear":history?.replaceChildren();break;
    default:add(tr("Comando no reconocido. Escribí help.","Unknown command. Type help."));
   }
  };
  form?.addEventListener("submit",event=>{event.preventDefault();run(input?.value||"");if(input)input.value=""});
  terminal.querySelectorAll<HTMLButtonElement>("[data-terminal-quick]").forEach(button=>button.addEventListener("click",()=>{run(button.dataset.terminalQuick||"");input?.focus()}));
 }
 // Infinite canvas: bounded transform, keyboard equivalent to all pointer actions.
 const canvas=shell.querySelector<HTMLElement>("[data-canvas]");
 if(canvas){
  const viewport=canvas.querySelector<HTMLElement>("[data-canvas-viewport]");
  const space=canvas.querySelector<HTMLElement>("[data-canvas-space]");
  let x=0,y=0,zoom=1;
  const paint=()=>{
   if(space){space.style.setProperty("--pan-x",x+"px");space.style.setProperty("--pan-y",y+"px");space.style.setProperty("--zoom",String(zoom))}
   set(canvas,"[data-canvas-zoom]",Math.round(zoom*100)+"%");
  };
  const pan=(direction:string)=>{
   const distance=75;
   if(direction==="left")x+=distance;
   if(direction==="right")x-=distance;
   if(direction==="up")y+=distance;
   if(direction==="down")y-=distance;
   x=Math.max(-360,Math.min(360,x));y=Math.max(-250,Math.min(250,y));paint();
  };
  const change=(direction:string)=>{
   if(direction==="reset"){x=0;y=0;zoom=1}
   else zoom=Math.max(.65,Math.min(1.5,Math.round((zoom+(direction==="in"?.15:-.15))*100)/100));
   paint();
  };
  // Zine-style reversible covers: native buttons, no nested interactive links,
  // and the hidden side is absent from keyboard and assistive navigation.
  canvas.querySelectorAll<HTMLButtonElement>("[data-canvas-flip]").forEach(button=>{
   button.addEventListener("click",()=>{
    const card=button.closest<HTMLElement>("[data-canvas-card]");
    const front=card?.querySelector<HTMLElement>("[data-canvas-front]");
    const back=card?.querySelector<HTMLElement>("[data-canvas-back]");
    if(!card||!front||!back)return;
    const showBack=Boolean(back.hidden);
    back.hidden=!showBack;front.hidden=showBack;
    card.classList.toggle("is-flipped",showBack);
    const next=card.querySelector<HTMLButtonElement>(showBack?".canvas-card-back [data-canvas-flip]":".canvas-card-front [data-canvas-flip]");
    next?.focus({preventScroll:true});
   });
  });
  canvas.querySelectorAll<HTMLButtonElement>("[data-pan]").forEach(b=>b.addEventListener("click",()=>pan(b.dataset.pan||"")));
  canvas.querySelectorAll<HTMLButtonElement>("[data-zoom]").forEach(b=>b.addEventListener("click",()=>change(b.dataset.zoom||"")));
  viewport?.addEventListener("keydown",e=>{
   const keys:Record<string,string>={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};
   if(keys[e.key]){e.preventDefault();pan(keys[e.key])}
   else if(e.key==="+"||e.key==="="){e.preventDefault();change("in")}
   else if(e.key==="-"){e.preventDefault();change("out")}
   else if(e.key==="Home"){e.preventDefault();change("reset")}
  });
  let dragging=false,lastX=0,lastY=0;
  viewport?.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button!==0|| (e.target as Element).closest("a,button"))return;dragging=true;lastX=e.clientX;lastY=e.clientY});
  viewport?.addEventListener("pointermove",e=>{if(!dragging)return;x=Math.max(-360,Math.min(360,x+e.clientX-lastX));y=Math.max(-250,Math.min(250,y+e.clientY-lastY));lastX=e.clientX;lastY=e.clientY;paint()});
  window.addEventListener("pointerup",()=>{dragging=false});
  paint();
 }
 const brutal=shell.querySelector<HTMLElement>("[data-brutal]");
 if(brutal){
  const buttons=[...brutal.querySelectorAll<HTMLButtonElement>("[data-brutal-pick]")];
  buttons.forEach((button,i)=>button.addEventListener("click",()=>{
   const step=steps[i];if(!step)return;
   buttons.forEach((b,n)=>b.setAttribute("aria-pressed",String(n===i)));
   set(brutal,"[data-brutal-count]",step.number+" / 04");
   set(brutal,"[data-brutal-title]",step.title);
   set(brutal,"[data-brutal-description]",step.body);
  }));
 }
 const story=shell.querySelector<HTMLElement>("[data-story]");
 if(story){
  let chapter=0;
  const buttons=[...story.querySelectorAll<HTMLButtonElement>("[data-story-pick]")];
  const storyImage=story.querySelector<HTMLImageElement>("[data-story-photo]");
  const storyVisualIds=["vigia","cpaul","pubg-map","vigia"];
  const choose=(i:number)=>{
   chapter=(i+steps.length)%steps.length;
   const step=steps[chapter];
   set(story,"[data-story-index]",step.number);
   set(story,"[data-story-title]",step.title);
   set(story,"[data-story-description]",step.body);
   set(story,"[data-story-seal-number]",step.number);
   story.querySelector<HTMLElement>("[data-story-route-fill]")?.style.setProperty("--chapter-progress",String((chapter+1)/steps.length));
   const picture=projectBy(storyVisualIds[chapter]);
   if(storyImage&&picture?.image)storyImage.src=picture.image;
   buttons.forEach((button,n)=>{if(n===chapter)button.setAttribute("aria-current","step");else button.removeAttribute("aria-current")});
  };
  buttons.forEach((b,i)=>b.addEventListener("click",()=>choose(i)));
  story.querySelector("[data-story-next]")?.addEventListener("click",()=>choose(chapter+1));
  story.addEventListener("keydown",event=>{
   if((event.target as Element).closest("button,a,input,select"))return;
   if(event.key==="ArrowRight"){event.preventDefault();choose(chapter+1)}
   if(event.key==="ArrowLeft"){event.preventDefault();choose(chapter-1)}
  });
  choose(0);
 }
}
