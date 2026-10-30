import type { APIRoute } from "astro";
import { projects } from "../data/projects";
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const origin = site ?? new URL("https://skuull.pages.dev");
  const paths = ["", "proyectos/", ...projects.map((project) => "proyectos/" + project.id + "/"), "en/", "en/projects/", ...projects.map((project) => "en/projects/" + project.id + "/")];
  const xml = paths.map((path) => "<url><loc>" + new URL(base + path, origin).href + "</loc></url>").join("");
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + xml + "</urlset>",
    { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
};
