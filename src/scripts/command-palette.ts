type Entry={title:string;subtitle:string;keywords?:string;href:string;group:string};
const dialog=document.querySelector<HTMLDialogElement>("[data-command-dialog]");
const trigger=document.querySelector<HTMLButtonElement>("[data-command-trigger]");
const input=dialog?.querySelector<HTMLInputElement>("[data-command-input]");
const results=dialog?.querySelector<HTMLElement>("[data-command-results]");
const count=dialog?.querySelector<HTMLElement>("[data-command-count]");
const close=dialog?.querySelector<HTMLButtonElement>("[data-command-close]");
const editionShortcut=dialog?.querySelector<HTMLButtonElement>("[data-command-editions]");
const en=document.documentElement.lang.startsWith("en");
const entries:Entry[]=dialog?JSON.parse(dialog.dataset.commandItems||"[]"):[];
const normalize=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
let visible:Entry[]=[];
let selected=0;
const buttons=()=>[...(results?.querySelectorAll<HTMLButtonElement>("[data-command-result]")||[])];
function activate(index:number){
 const controls=buttons();if(!controls.length)return;
 selected=(index+controls.length)%controls.length;
 controls.forEach((button,i)=>{button.setAttribute("aria-selected",String(i===selected));button.tabIndex=i===selected?0:-1});
 input?.setAttribute("aria-activedescendant",controls[selected].id);
 controls[selected].scrollIntoView({block:"nearest"});
}
function render(){
 if(!input||!results)return;
 const query=normalize(input.value.trim());
 visible=entries.map((item,i)=>({item,i,score:query?normalize(item.title).startsWith(query)?0:normalize(item.title).includes(query)?1:normalize(item.subtitle+" "+(item.keywords||"")).includes(query)?2:normalize(item.group).includes(query)?3:100: i})).filter(x=>x.score<100).sort((a,b)=>a.score-b.score||a.i-b.i).slice(0,query==="ediciones"||query==="editions"?20:12).map(x=>x.item);
 results.replaceChildren();
 visible.forEach((entry,i)=>{
  const button=document.createElement("button");button.type="button";button.id="command-result-"+i;button.dataset.commandResult="";button.setAttribute("role","option");
  const main=document.createElement("strong");main.textContent=entry.title;
  const detail=document.createElement("small");detail.textContent=entry.group+" · "+entry.subtitle;
  button.append(main,detail);
  button.addEventListener("click",()=>{window.location.assign(entry.href)});
  results.append(button);
 });
 if(count)count.textContent=visible.length?(en?visible.length+" results":visible.length+" resultados"):(en?"No matches. Try another keyword.":"Sin coincidencias. Probá otra palabra.");
 if(visible.length)activate(0);else input.removeAttribute("aria-activedescendant");
}
function open(){if(!dialog||dialog.open)return;dialog.showModal();if(input){input.value="";render();input.focus()}}
function dismiss(){dialog?.close();trigger?.focus({preventScroll:true})}
trigger?.addEventListener("click",open);
close?.addEventListener("click",dismiss);
editionShortcut?.addEventListener("click",()=>{if(!input)return;input.value=en?"editions":"ediciones";render();input.focus();});
dialog?.addEventListener("click",event=>{if(event.target===dialog)dismiss()});
dialog?.addEventListener("close",()=>trigger?.focus({preventScroll:true}));
document.addEventListener("keydown",event=>{
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();dialog?.open?dismiss():open();return}
 if(!dialog?.open)return;
 if(event.key==="ArrowDown"){event.preventDefault();activate(selected+1)}
 else if(event.key==="ArrowUp"){event.preventDefault();activate(selected-1)}
 else if(event.key==="Enter"&&document.activeElement===input&&visible[selected]){event.preventDefault();window.location.assign(visible[selected].href)}
});
input?.addEventListener("input",render);
