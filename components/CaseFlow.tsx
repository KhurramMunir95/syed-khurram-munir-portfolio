"use client";

import { Barcode, ClipboardCheck, CloudSun, FileClock, FileUp, Fingerprint, FolderCheck, LayoutDashboard, Package, RadioTower, Server, ShieldCheck, Sprout } from "lucide-react";
import { useState } from "react";

const cases = {
  dubai: {
    location: "Smart city · Dubai, UAE", heading: "Field data.", accent: "Operational clarity.",
    caption: "Project architecture · Simplified view",
    modes: [
      { id: "soil", label: "Soil moisture", steps: ["Soil moisture", "Ingest & process APIs", "Dashboard widgets"], icons: [Sprout, Server, LayoutDashboard], note: "Soil moisture readings move through the APIs into reusable widgets for operational monitoring." },
      { id: "weather", label: "Weather", steps: ["Weather data", "Ingest & process APIs", "Data visualizations"], icons: [CloudSun, Server, LayoutDashboard], note: "Weather readings are processed and presented through operational dashboard views and data visualizations." },
      { id: "field", label: "Field sensors", steps: ["Field sensors", "Ingest & process APIs", "Responsive dashboards"], icons: [RadioTower, Server, LayoutDashboard], note: "Other field-sensor readings follow the ingestion and processing flow into responsive monitoring interfaces." },
    ],
  },
  saudi: {
    location: "Public sector · Saudi Arabia", heading: "Evidence workflows.", accent: "Traceable at every step.",
    caption: "Workflow overview · Simplified view",
    modes: [
      { id: "intake", label: "Intake", steps: ["RFID / barcode ID", "Officer verification", "Document uploads"], icons: [Barcode, Fingerprint, FileUp], note: "Evidence intake workflows connect RFID/barcode identification, officer verification and document uploads." },
      { id: "custody", label: "Custody", steps: ["Storage tracking", "Custody verification", "Chain-of-custody records"], icons: [Package, ShieldCheck, FileClock], note: "Storage tracking, evidence-status monitoring and custody verification support traceable evidence-handling workflows." },
      { id: "return", label: "Return & audit", steps: ["Return processing", "Evidence status", "Audit history"], icons: [FolderCheck, ClipboardCheck, FileClock], note: "Return-processing modules connect evidence-status monitoring with the audit history of operational workflows." },
    ],
  },
};

export default function CaseFlow({ project }: { project: keyof typeof cases }) {
  const data = cases[project];
  const [mode, setMode] = useState(0);
  const current = data.modes[mode];
  const CaseIcon = project === "dubai" ? RadioTower : ShieldCheck;
  return (
    <div className={`ka-case-cover${project === "saudi" ? " ka-case-evidence" : ""}`}>
      <div className="ka-cover-top"><span>{data.location}</span><CaseIcon size={16} aria-hidden="true" /></div>
      <h3>{data.heading}<br /><span>{data.accent}</span></h3>
      <div className="ka-case-controls" role="group" aria-label={project === "dubai" ? "Explore sensor data flow" : "Explore evidence workflows"}>
        {data.modes.map((option, index) => <button key={option.id} className="ka-case-mode" type="button"
          onClick={() => setMode(index)} aria-pressed={index === mode}>{option.label}</button>)}
      </div>
      <div className="ka-case-stage">{current.steps.map((step, index) => {
        const StepIcon = current.icons[index];
        return <div className="ka-case-node" key={step}><StepIcon size={20} aria-hidden="true" /><span>{step}</span></div>;
      })}</div>
      <p className="ka-case-note" aria-live="polite" aria-atomic="true">{current.note}</p>
      <p className="ka-case-caption">{data.caption}</p>
    </div>
  );
}
