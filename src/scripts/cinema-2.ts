/* SKULL CINEMA — progressive enhancement, no scroll hijacking. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const root=document.documentElement;
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const coarse=window.matchMedia("(pointer: coarse)");
const lowPower=root.dataset.performance==="lite";
const canAnimate=()=>!reduced.matches&&!lowPower;
if(canAnimate()){
 gsap.registerPlugin(ScrollTrigger);
 const cards=gsap.utils.toArray<HTMLElement>(".portfolio-work-card,.case-gallery figure,.case-visual,.portfolio-capability-card,.tech-explorer-layout");
 cards.forEach((element)=>{
  gsap.fromTo(element,{autoAlpha:.72,y:coarse.matches?22:46},{
   autoAlpha:1,y:0,duration:coarse.matches?.75:1.05,ease:"power3.out",
   scrollTrigger:{trigger:element,start:"top 94%",once:true}
  });
 });
 gsap.utils.toArray<HTMLElement>(".case-section").forEach((element)=>{
  gsap.fromTo(element,{autoAlpha:.6,y:24},{autoAlpha:1,y:0,duration:.85,ease:"power2.out",
   scrollTrigger:{trigger:element,start:"top 92%",once:true}});
 });
 const title=document.querySelector<HTMLElement>(".sp-hero h1");
 if(title)gsap.fromTo(title,{autoAlpha:0,y:coarse.matches?20:48},{autoAlpha:1,y:0,duration:1.15,ease:"power3.out",delay:.12});
 const lead=document.querySelector<HTMLElement>(".sp-hero .sp-lead");
 if(lead)gsap.fromTo(lead,{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.85,ease:"power2.out",delay:.35});
 if(!coarse.matches){
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element)=>{
   const move=(event:PointerEvent)=>{
    if(event.pointerType==="touch")return;
    const rect=element.getBoundingClientRect();
    const x=(event.clientX-rect.left-rect.width/2)*.12;
    const y=(event.clientY-rect.top-rect.height/2)*.12;
    gsap.to(element,{x,y,duration:.35,ease:"power2.out",overwrite:true});
   };
   element.addEventListener("pointermove",move,{passive:true});
   element.addEventListener("pointerleave",()=>gsap.to(element,{x:0,y:0,duration:.55,ease:"elastic.out(1,.6)",overwrite:true}));
  });
 }
 const gallery=document.querySelector<HTMLElement>(".case-gallery");
 if(gallery){
  gallery.querySelectorAll<HTMLImageElement>("img").forEach(image=>{
   gsap.fromTo(image,{scale:1.055},{scale:1,duration:1.5,ease:"power2.out",scrollTrigger:{trigger:image,start:"top 95%",once:true}});
  });
 }
}
