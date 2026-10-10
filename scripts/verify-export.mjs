import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const exportRoot = resolve("out");
const html = readFileSync(resolve(exportRoot, "index.html"), "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
let checks = 0;
function check(condition, message) {
  assert.ok(condition, message);
  checks++;
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
    .map(([, key, value]) => [key, value.replaceAll("&amp;", "&")]));
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, "Section IDs must be unique");
const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
  .map(([, tag, content]) => ({ ...attributes(tag), content }));
for (const link of anchors.filter((link) => link.href?.startsWith("#"))) {
  check(ids.includes(link.href.slice(1)), `Navigation target must exist: ${link.href}`);
}

const experience = html.match(/<section\b[^>]*\bid="ki-experience"[^>]*>([\s\S]*?)<\/section>/)?.[1];
check(experience, "Experience section must be exported");
check(experience.includes("From features to ownership."), "Approved journey heading must be present");
const cards = [...experience.matchAll(/<article\b[^>]*class="ka-journey-step"[^>]*>([\s\S]*?)<\/article>/g)]
  .map((match) => match[1]);
check(cards.length === 3, "All three journey cards must be included in the static page");
for (const [index, period] of ["2020 — 2021", "2021 — 2024", "2024 — 2026"].entries()) {
  check(cards[index].includes(period), `Journey period must be restored: ${period}`);
}
check((experience.match(/class="ka-career-item"/g) || []).length === 5, "Detailed career history must stay present");

const skills = html.match(/<section\b[^>]*\bid="ki-skills"[^>]*>([\s\S]*?)<\/section>/)?.[1];
check(skills, "Dedicated Skills section must be exported");
check(anchors.some((link) => link.href === "#ki-skills" && link.content === "Skills"), "Skills must be reachable from navigation");
const skillGroups = [...skills.matchAll(/data-skill-group="([^"]+)"/g)].map((match) => match[1]);
check(skillGroups.length === 6 && new Set(skillGroups).size === 6, "All six skill groups must be present");
const skillItems = [...skills.matchAll(/<li\b[^>]*class="ka-skill-item"[^>]*>([\s\S]*?)<\/li>/g)];
check(skillItems.length === 30, "All 30 skills must be included in static HTML");
for (const [, item] of skillItems) {
  check(/<svg\b[^>]*data-skill-icon="[^"]+"/.test(item) && /class="ka-skill-label">[^<]+/.test(item), "Each skill needs an inline icon and a readable label");
}
check(skills.includes("This portfolio"), "Next.js experience context must remain explicit");

const svgs = [...html.matchAll(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/g)];
check(svgs.length > 30, "Icons must be rendered in HTML without a CDN or client script");
for (const [, tag, content] of svgs) {
  const attrs = attributes(tag);
  check(Number(attrs.width) > 0 && Number(attrs.height) > 0 && /<(path|rect|circle|line|polyline|polygon|ellipse)\b/.test(content), "SVG icons need visible dimensions and vector geometry");
}
check(!html.includes("data-lucide="), "No icon may depend on runtime CDN replacement");
const github = anchors.filter((link) => link.href === "https://github.com/KhurramMunir95");
check(github.length > 0 && github.every((link) => link.content.includes("lucide-github")), "GitHub links must use the original GitHub icon");

const email = "khurrammunir9522@gmail.com";
check(anchors.some((link) => link.href === `mailto:${email}`), "Native email links must be retained");
check(/<dialog\b[^>]*aria-labelledby="ki-email-title"/.test(html), "Email options must have an accessible dialog");
const gmail = anchors.find((link) => link.href?.startsWith("https://mail.google.com/"));
check(gmail && new URL(gmail.href).searchParams.get("to") === email, "Gmail composer must use the correct recipient");
check(html.includes("Copy address"), "A copy-address fallback must be available");

// Check the actual exported references, including Pages' repository prefix.
const rawHtml = readFileSync(resolve(exportRoot, "index.html"), "utf8");
const assets = [...rawHtml.matchAll(/<(?:script|link)\b[^>]*>/g)].map((match) => attributes(match[0]))
  .filter((attrs) => attrs.src || attrs.rel === "stylesheet" || attrs.rel === "icon")
  .map((attrs) => attrs.src || attrs.href).filter((url) => url?.startsWith("/"));
const chunk = assets.find((url) => url.includes("/_next/"));
check(chunk, "Next.js assets must be exported");
const basePath = chunk.slice(0, chunk.indexOf("/_next/"));
for (const asset of assets) {
  check(asset.startsWith(`${basePath}/`), `Asset must respect the Pages base path: ${asset}`);
  const path = new URL(asset, "https://portfolio.invalid").pathname.slice(basePath.length + 1);
  check(existsSync(resolve(exportRoot, decodeURIComponent(path))), `Exported asset must exist: ${asset}`);
}
console.log(`Static portfolio verification passed (${checks} checks).`);
