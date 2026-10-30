type Tech={name:string;projects:{title:string;href:string;id:string}[]};
document.querySelectorAll<HTMLElement>("[data-tech-explorer]").forEach(root=>{
 const data:Tech[]=JSON.parse(root.dataset.tech||"[]");
 const buttons=[...root.querySelectorAll<HTMLButtonElement>("[data-tech-pick]")];
 const title=root.querySelector<HTMLElement>("[data-tech-title]");
 const count=root.querySelector<HTMLElement>("[data-tech-count]");
 const results=root.querySelector<HTMLElement>("[data-tech-results]");
 const en=document.documentElement.lang.startsWith("en");
 const select=(i:number)=>{
  const tech=data[i];if(!tech||!results)return;
  buttons.forEach((b,n)=>b.setAttribute("aria-pressed",String(n===i)));
  if(title)title.textContent=tech.name;
  if(count)count.textContent=tech.projects.length+" "+(en?"documented projects":"proyectos documentados");
  results.replaceChildren();
  tech.projects.forEach(p=>{const a=document.createElement("a");a.href=p.href;a.textContent=p.title+" ↗";results.append(a)});
 };
 buttons.forEach((button,i)=>button.addEventListener("click",()=>select(i)));
 select(0);
});
