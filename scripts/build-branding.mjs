
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const mint = "#76ffe0", blue = "#89abff", dark = "#0a1520";
const geometry = (fill="url(#g)") => `<path d="M20 8H44L55 19V41L44 54H20L9 41V19L20 8Z" fill="#14313a" stroke="${fill}" stroke-width="3.5"/><path d="M18 25 27 28 25 36 17 35 18 25ZM46 25 37 28 39 36 47 35 46 25Z" fill="#9dfff0"/><path d="M32 34 27 42H37L32 34Z" fill="#91adff"/><path d="M22 46H42M26 46V52M32 46V53M38 46V52" stroke="#9dfff0" stroke-width="3"/>`;
const logo = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${mint}"/><stop offset="1" stop-color="${blue}"/></linearGradient></defs><rect width="64" height="64" rx="13" fill="${dark}"/>${geometry()}</svg>`;
function cover(width, height) {
  const rings = Array.from({length:12},(_,i)=>`<circle cx="${width*.82}" cy="${height*.5}" r="${height*(.24+i*.023)}" fill="none" stroke="${i%3?mint:blue}" stroke-opacity=".16"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${mint}"/><stop offset="1" stop-color="${blue}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="${dark}"/>${rings}<path d="M48 74H${width-48}M48 ${height-74}H${width-48}" stroke="#35505d"/><g transform="translate(${width*.78-85} ${height*.48-85}) scale(2.6)"><rect width="64" height="64" rx="14" fill="#142d38" stroke="#446475"/>${geometry()}</g><g font-family="Arial,sans-serif"><text x="48" y="49" fill="#b7d4dc" font-size="15" letter-spacing="3">SKULL / DIGITAL STUDIO</text><text x="45" y="${height*.54}" fill="#f3fcfb" font-size="${height*.28}" font-weight="800" letter-spacing="-10">Skull<tspan fill="${mint}">.</tspan></text><text x="49" y="${height*.69}" fill="#c4d6da" font-size="28">Software real. Diseño con identidad.</text><text x="48" y="${height-39}" fill="#a5c5cb" font-size="13" letter-spacing="2">WEB / ANDROID / SYSTEMS / ARGENTINA</text></g></svg>`;
}
mkdirSync("public/media", {recursive:true});
mkdirSync("assets", {recursive:true});
writeFileSync("assets/profile-cover-2026.svg", cover(1280,420));
await sharp(Buffer.from(cover(1200,630))).png().toFile("public/media/social-cover.png");
for (const [name,size] of [["favicon-32.png",32],["apple-touch-icon.png",180],["icon-192.png",192],["icon-512.png",512]]) {
 await sharp(Buffer.from(logo(size))).png().toFile("public/"+name);
}
console.log("Generated geometric Skull emblem, favicon family, and new social card.");
