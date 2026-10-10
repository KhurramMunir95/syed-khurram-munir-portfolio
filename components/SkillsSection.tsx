import { Braces, ChartNoAxesCombined, Cloud, Database, GitBranch, PanelsTopLeft, Radio, Server, ShieldCheck, Sparkles, Wifi, type LucideIcon } from "lucide-react";
import { skillBrandPaths } from "@/lib/skill-icons";

const symbols = {
  api: Braces,
  permissions: ShieldCheck,
  websockets: Radio,
  mqtt: Wifi,
  azure: Cloud,
  integrations: Sparkles,
};
type SkillIconName = keyof typeof skillBrandPaths | keyof typeof symbols;
type Skill = { label: string; icon: SkillIconName; note?: string };
type SkillGroup = { id: string; title: string; description: string; accent: string; icon: LucideIcon; skills: Skill[] };

const groups: SkillGroup[] = [
  {
    id: "frontend", title: "Frontend & state", accent: "blue", icon: PanelsTopLeft,
    description: "Interfaces, reusable components and application state.",
    skills: [
      { label: "React", icon: "react" },
      { label: "TypeScript", icon: "typescript" },
      { label: "JavaScript", icon: "javascript" },
      { label: "Next.js", icon: "nextdotjs", note: "This portfolio" },
      { label: "Redux Toolkit / Saga", icon: "redux" },
    ],
  },
  {
    id: "backend", title: "Backend & APIs", accent: "green", icon: Server,
    description: "Services, business logic and secure application workflows.",
    skills: [
      { label: "Node.js", icon: "nodedotjs" },
      { label: "Express", icon: "express" },
      { label: "REST APIs", icon: "api" },
      { label: "Authentication / RBAC", icon: "permissions" },
    ],
  },
  {
    id: "data", title: "Data & real time", accent: "blue", icon: Database,
    description: "Database-driven features and live information flows.",
    skills: [
      { label: "MongoDB", icon: "mongodb" },
      { label: "Socket.io", icon: "socketdotio" },
      { label: "WebSockets", icon: "websockets" },
      { label: "MQTT", icon: "mqtt" },
    ],
  },
  {
    id: "visuals", title: "UI & visualization", accent: "green", icon: ChartNoAxesCombined,
    description: "Responsive layouts, operational dashboards and maps.",
    skills: [
      { label: "HTML", icon: "html5" },
      { label: "CSS", icon: "css" },
      { label: "Tailwind CSS", icon: "tailwindcss" },
      { label: "Bootstrap", icon: "bootstrap" },
      { label: "Ant Design", icon: "antdesign" },
      { label: "Chart.js", icon: "chartdotjs" },
      { label: "Mapbox", icon: "mapbox" },
    ],
  },
  {
    id: "delivery", title: "Cloud & delivery", accent: "red", icon: GitBranch,
    description: "Container builds, cloud releases and production support.",
    skills: [
      { label: "Docker", icon: "docker" },
      { label: "Nginx", icon: "nginx" },
      { label: "Azure", icon: "azure" },
      { label: "Git", icon: "git" },
      { label: "GitHub Actions", icon: "githubactions" },
      { label: "Vite", icon: "vite" },
    ],
  },
  {
    id: "ai", title: "AI tools & integrations", accent: "blue", icon: Sparkles,
    description: "Development with Cursor and Claude, plus OpenAI and Claude API integrations.",
    skills: [
      { label: "Cursor", icon: "cursor" },
      { label: "Claude", icon: "claude" },
      { label: "OpenAI / Claude APIs", icon: "integrations" },
    ],
  },
];

function SkillIcon({ name }: { name: SkillIconName }) {
  if (name in skillBrandPaths) {
    const path = skillBrandPaths[name as keyof typeof skillBrandPaths];
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-skill-icon={name}><path d={path} /></svg>;
  }
  const Symbol = symbols[name as keyof typeof symbols];
  return <Symbol size={20} aria-hidden="true" data-skill-icon={name} />;
}

export default function SkillsSection() {
  return (
    <section className="ka-section" id="ki-skills" aria-labelledby="ki-skills-title">
      <div className="ka-section-top">
        <div><p className="ka-kicker">Skills & toolkit</p><h2 id="ki-skills-title">The tools behind the work.</h2></div>
        <p>A toolkit built across client websites, business applications, enterprise platforms and production delivery.</p>
      </div>
      <div className="ka-skills-grid">
        {groups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <article className="ka-skill-card" data-skill-group={group.id} data-accent={group.accent} key={group.id} aria-labelledby={`ki-skill-${group.id}`}>
              <div className="ka-skill-heading"><h3 id={`ki-skill-${group.id}`}>{group.title}</h3><GroupIcon size={18} aria-hidden="true" /></div>
              <p className="ka-skill-description">{group.description}</p>
              <ul className="ka-skills-list" role="list">
                {group.skills.map((skill) => (
                  <li className="ka-skill-item" key={skill.label}>
                    <span className="ka-skill-icon"><SkillIcon name={skill.icon} /></span>
                    <span className="ka-skill-label">{skill.label}{skill.note && <small>{skill.note}</small>}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
