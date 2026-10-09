import { ArrowRight, ArrowUpRight, AudioLines, Blocks, Building2, ChevronDown, Cloud, GitBranch, Globe, Layers, Link, LockKeyhole, Mail, MapPin, PanelsTopLeft, Phone, Radio, Server, ShoppingBag, Sparkles, Users, Workflow } from "lucide-react";

// GitHub icon retained from the approved demo's Lucide 0.468 asset.
// License and Feather attribution: public/licenses/lucide.txt.
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="lucide lucide-github" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const icons = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "audio-lines": AudioLines,
  "blocks": Blocks,
  "building-2": Building2,
  "chevron-down": ChevronDown,
  "cloud": Cloud,
  "git-branch": GitBranch,
  "github": GitHubIcon,
  "globe": Globe,
  "layers": Layers,
  "link": Link,
  "lock-keyhole": LockKeyhole,
  "mail": Mail,
  "map-pin": MapPin,
  "panels-top-left": PanelsTopLeft,
  "phone": Phone,
  "radio": Radio,
  "server": Server,
  "shopping-bag": ShoppingBag,
  "sparkles": Sparkles,
  "users": Users,
  "workflow": Workflow,
};

export default function Icon({ name }: { name: keyof typeof icons }) {
  const Component = icons[name];
  return <Component size={16} aria-hidden="true" />;
}
