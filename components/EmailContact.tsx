"use client";

import { ArrowUpRight, Check, Copy, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const email = "khurrammunir9522@gmail.com";
const mailto = `mailto:${email}`;
const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export default function EmailContact() {
  const dialog = useRef<HTMLDialogElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.getElementById("khurram-interactive-2026");
    if (!root) return;
    const lifetime = new AbortController();
    root.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.getAttribute("href") !== mailto || link.closest("dialog")) return;
      event.preventDefault();
      trigger.current = link;
      setFeedback("");
      setCopied(false);
      if (!dialog.current?.open) dialog.current?.showModal();
    }, { signal: lifetime.signal });
    return () => lifetime.abort();
  }, []);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFeedback("Email address copied.");
    } catch {
      address.current?.focus();
      address.current?.select();
      setFeedback("The address is selected. Copy it with Ctrl+C or Command+C.");
    }
  }

  return (
    <dialog ref={dialog} className="ka-email-dialog" aria-labelledby="ki-email-title" aria-describedby="ki-email-description"
      onClose={() => trigger.current?.focus()}>
      <div className="ka-email-heading">
        <p className="ka-kicker">Let’s connect</p>
        <button className="ka-email-close" type="button" aria-label="Close email options" onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
      </div>
      <h2 id="ki-email-title">Email Syed Khurram Munir</h2>
      <p id="ki-email-description">Choose how you’d like to get in touch.</p>
      <input ref={address} className="ka-email-address" type="text" value={email} readOnly aria-label="Email address" />
      <div className="ka-email-options">
        <a className="ka-action ka-primary" href={gmail} target="_blank" rel="noopener noreferrer">Open Gmail<ArrowUpRight size={16} aria-hidden="true" /></a>
        <a className="ka-action" href={mailto} onClick={() => setFeedback("Your email app should open. You can also use Gmail or copy the address.")}>Use my email app<Mail size={16} aria-hidden="true" /></a>
        <button className="ka-action" type="button" onClick={copyAddress}>{copied ? "Copied" : "Copy address"}{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</button>
      </div>
      <p className="ka-email-feedback" role="status" aria-live="polite">{feedback}</p>
    </dialog>
  );
}
