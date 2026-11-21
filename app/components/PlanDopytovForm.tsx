"use client";

import { useRef, useState } from "react";
import { trackGoogleAdsLead } from "@/app/lib/googleAds";

/**
 * Formulár „Bezplatný plán dopytov“ – rovnaké kvalifikačné otázky ako Meta formulár v5.
 * Odosiela na /api/lead (source „plan-dopytov-web“), kde sa lead vyhodnotí A / B / X.
 */

const field =
  "w-full bg-transparent border-b-2 border-black/20 px-0 py-2 text-base md:text-lg focus:outline-none focus:border-black transition-colors";
const label = "block text-xs uppercase tracking-wider mb-2";

function Choice({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className={label}>
        {legend} <span className="text-red-600">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={i === 0} className="peer sr-only" id={`${name}-${i}`} />
            <span className="inline-block border-2 border-black/20 px-3 py-2 text-sm peer-checked:bg-black peer-checked:text-[#BAFF57] peer-checked:border-black peer-focus-visible:outline peer-focus-visible:outline-2 transition-colors">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function PlanDopytovForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const d = new FormData(form);
    if (d.get("company_website")) {
      setStatus("ok");
      return;
    }
    const get = (k: string) => ((d.get(k) as string) || "").trim();
    const missing = ["name", "email", "company", "odbor", "firma", "rozpocet", "cena_ok"].filter((k) => !get(k));
    if (missing.length || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
      setError("Vyplňte prosím všetky povinné polia a platný e-mail.");
      return;
    }
    setError("");
    setStatus("sending");
    const p = new URLSearchParams(window.location.search);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          company: get("company"),
          web: get("web"),
          odbor: get("odbor"),
          firma: get("firma"),
          rozpocet: get("rozpocet"),
          cena_ok: get("cena_ok"),
          note: get("odbor"),
          source: "plan-dopytov-web",
          utm_source: p.get("utm_source") || (p.has("gclid") ? "google" : ""),
          utm_campaign: p.get("utm_campaign") || "",
          utm_content: p.get("utm_content") || "",
        }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("send-failed");
      trackGoogleAdsLead();
      try {
        (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
      } catch {
        /* ignore */
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-black text-white p-8 md:p-12">
        <p className="text-[#BAFF57] text-xs uppercase tracking-widest font-mono">Odoslané</p>
        <p className="mt-4 text-2xl md:text-4xl font-bold leading-tight">Ďakujeme. Plán dopytov vám pošleme do 48 hodín.</p>
        <p className="mt-4 text-white/70">Potvrdenie sme vám poslali aj e-mailom. Ak nám chcete niečo doplniť, stačí naň odpovedať.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="bg-white p-6 md:p-10 space-y-6">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor="pd-name">Meno <span className="text-red-600">*</span></label>
          <input id="pd-name" name="name" className={field} placeholder="Vaše meno" autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="pd-email">E-mail <span className="text-red-600">*</span></label>
          <input id="pd-email" name="email" type="email" className={field} placeholder="vas@email.sk" autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor="pd-phone">Telefón</label>
          <input id="pd-phone" name="phone" type="tel" className={field} placeholder="+421 …" autoComplete="tel" />
        </div>
        <div>
          <label className={label} htmlFor="pd-company">Názov firmy <span className="text-red-600">*</span></label>
          <input id="pd-company" name="company" className={field} placeholder="Firma s.r.o." autoComplete="organization" />
        </div>
        <div>
          <label className={label} htmlFor="pd-odbor">Čomu sa vaša firma venuje? <span className="text-red-600">*</span></label>
          <input id="pd-odbor" name="odbor" className={field} placeholder="napr. rekonštrukcie kúpeľní, Senec" />
        </div>
        <div>
          <label className={label} htmlFor="pd-web">Web alebo Facebook firmy</label>
          <input id="pd-web" name="web" className={field} placeholder="www.vasafirma.sk" />
        </div>
      </div>
      <Choice name="firma" legend="Máte firmu alebo živnosť?" options={["Áno", "Zatiaľ nie"]} />
      <Choice name="rozpocet" legend="Koľko viete mesačne dať na samotnú reklamu (Mete / Googlu)?" options={["Menej ako 150 €", "150 – 300 €", "Viac ako 300 €"]} />
      <Choice name="cena_ok" legend="Je pre vás v poriadku naša cena od 290 € mesačne?" options={["Áno", "Nie, hľadám niečo lacnejšie"]} />
      {error && <p className="text-red-700 text-sm">{error}</p>}
      {status === "error" && <p className="text-red-700 text-sm">Odoslanie sa nepodarilo. Skúste to znova alebo napíšte na team@nextlayer.studio.</p>}
      <button type="submit" disabled={status === "sending"} className="w-full bg-black text-[#BAFF57] py-4 text-sm uppercase tracking-wider hover:bg-[#212121] transition-colors disabled:opacity-50">
        {status === "sending" ? "Odosielam…" : "Chcem bezplatný plán dopytov"}
      </button>
      <p className="text-xs text-black/50">
        Odoslaním súhlasíte so spracovaním údajov podľa <a href="/ochrana-sukromia" className="underline">ochrany osobných údajov</a>. Plán vám pošleme do 48 hodín, bez záväzkov.
      </p>
    </form>
  );
}
