"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { hasMarketingConsent } from "@/app/lib/consent";
import { isGoogleAdsClick, trackGoogleAdsLead } from "@/app/lib/googleAds";

const CLIENTS = [
  "Autoškola Zvyky",
  "Kávička u Janíčka",
  "Bombafasada",
  "Stopalerg",
  "NIE RAKOVINE",
  "Beauty Institute",
  "Know3D",
  "Takeoff",
];

type FbqArgs = [string, string, Record<string, unknown>?, { eventID: string }?];
type WindowWithFbq = Window & { fbq?: (...args: FbqArgs) => void };

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function genEventId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Zloží _fbc z fbclid v URL, ak cookie ešte nie je nastavená. */
function deriveFbc(): string | undefined {
  const fromCookie = readCookie("_fbc");
  if (fromCookie) return fromCookie;
  if (typeof window === "undefined") return undefined;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/** UTM parametre z URL – aby sme pri každom dopyte vedeli, ktorá konkrétna reklama/kreatíva ho priviedla. */
function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  (["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}

export default function ConsultationLanding() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    company: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (values.user_name.trim().length < 2) next.user_name = "Zadaj svoje meno.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.user_email.trim()))
      next.user_email = "Zadaj platný e-mail.";
    // Telefón a firma sú nepovinné – nižšia bariéra pri prvom kontakte z reklamy.
    // Ak ich niekto vyplní, aspoň skontrolujeme, že to vyzerá zmysluplne.
    if (values.user_phone.trim() && values.user_phone.replace(/[^0-9]/g, "").length < 9)
      next.user_phone = "Zadaj platné telefónne číslo, alebo pole nechaj prázdne.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function fireConversion() {
    if (!hasMarketingConsent()) return;
    const eventId = genEventId();
    const fbp = readCookie("_fbp");
    const fbc = deriveFbc();
    const utm = getUtmParams();
    const [firstName, ...rest] = values.user_name.trim().split(/\s+/);
    const lastName = rest.join(" ");

    trackGoogleAdsLead();

    try {
      (window as WindowWithFbq).fbq?.(
        "track",
        "Lead",
        { content_name: "Bezplatná konzultácia" },
        { eventID: eventId }
      );
    } catch {
      /* ignore */
    }

    // Server-side Conversions API (no-op ak nie je nastavený token).
    try {
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          event_id: eventId,
          email: values.user_email.trim(),
          phone: values.user_phone.trim(),
          first_name: firstName || "",
          last_name: lastName || "",
          fbp,
          fbc,
          event_source_url: typeof window !== "undefined" ? window.location.href : "",
          source: utm.utm_content || "meta-konzultacia",
        }),
      }).catch(() => {});
    } catch {
      /* ignore */
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot – ak je vyplnený, tvárime sa, že je odoslané.
    const hp = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement)?.value;
    if (hp) {
      router.push("/dakujeme");
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const utm = getUtmParams();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.user_name.trim(),
          email: values.user_email.trim(),
          phone: values.user_phone.trim(),
          company: values.company.trim(),
          note: values.note.trim(),
          source: isGoogleAdsClick()
            ? "landing /konzultacia (Google Ads)"
            : "landing /konzultacia (Meta Ads)",
          utm_source: utm.utm_source,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
        }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("lead-send-failed");
      fireConversion();
      router.push("/dakujeme");
    } catch (err) {
      console.error("Odoslanie formulára zlyhalo:", err);
      setSubmitError(true);
      setSubmitting(false);
    }
  }

  // Formulár je na tmavom podklade – zelené orámovanie.
  const fieldClass = (field: string) =>
    `w-full bg-transparent border-b-2 px-0 py-3 text-lg text-[#BAFF57] placeholder:text-[#BAFF57]/30 focus:outline-none transition-colors ${
      errors[field] ? "border-red-400" : "border-[#BAFF57]/25 focus:border-[#BAFF57]"
    }`;

  return (
    <main className="h-screen overflow-y-auto scroll-smooth bg-[#BAFF57] text-black">
      {/* ── TOP BAR ── */}
      <header className="flex items-center justify-between px-5 sm:px-8 lg:px-16 py-5">
        <Link href="/" aria-label="NextLayer Studio">
          <Image
            src="/fonts/Group.png"
            alt="NextLayer Studio"
            width={80}
            height={80}
            className="h-9 sm:h-10 w-auto"
            priority
          />
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50">
          nextlayer.studio
        </span>
      </header>

      {/* ── HERO ── */}
      <section className="px-5 sm:px-8 lg:px-16 pt-8 sm:pt-14 pb-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-px bg-black/50" />
          <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
            Pre zavedené značky
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl">
          Tvoja firma funguje roky.
          <br />
          Online to ale nie je vidieť.
        </h1>

        <p className="mt-7 text-base sm:text-lg leading-relaxed text-black/70 max-w-2xl">
          Robíme video produkciu a správu sociálnych sietí pre firmy, ktoré si už vybudovali meno.
          Scenár pred každým natáčaním, mesačný plán obsahu, jasné výsledky. Žiadne náhodné posty.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#formular"
            className="inline-flex items-center gap-3 bg-black text-[#BAFF57] px-7 py-4 text-sm uppercase tracking-wider font-normal hover:bg-black/85 transition-colors"
          >
            Chcem bezplatnú konzultáciu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <span className="text-sm text-black/50">Nezáväzne · odpovieme do 24 hodín</span>
        </div>

        <div className="mt-12 pt-8 border-t border-black/15">
          <p className="text-black/40 text-xs uppercase tracking-widest font-mono mb-4">
            Spolupracovali sme s
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="text-sm font-light text-black/55 uppercase tracking-wider"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÝSLEDKY ── */}
      <section className="bg-black text-[#BAFF57] px-5 sm:px-8 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-[#BAFF57]/40" />
            <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">
              Čísla, nie sľuby
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#BAFF57]/15">
            {[
              {
                big: "200 000",
                label: "videní za 3 mesiace",
                desc: "Autoškola Zvyky — z nuly. Reklamný rozpočet 70 €.",
              },
              {
                big: "3 plné kurzy",
                label: "51 nových žiakov",
                desc: "Priamy obchodný výsledok, nie len dosah. Po kampani čakací zoznam.",
              },
              {
                big: "+340 %",
                label: "dosah za prvý mesiac",
                desc: "Kávička u Janíčka — zavedená kaviareň, prvé dopyty cez Instagram.",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`p-7 sm:p-8 border-[#BAFF57]/15 ${
                  i < 2 ? "border-b sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <p className="text-3xl sm:text-4xl font-bold leading-none mb-3">{s.big}</p>
                <p className="text-sm font-medium uppercase tracking-wider mb-2">{s.label}</p>
                <p className="text-[#BAFF57]/45 text-xs font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRE KOHO ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-black/50" />
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
                Pre koho to je
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              Toto ti sadne, ak&nbsp;…
            </h2>
            <ul className="space-y-3">
              {[
                "tvoja firma funguje aspoň 2 roky a má stálych zákazníkov",
                "cítiš, že tvoja online prezentácia nezodpovedá úrovni tvojej práce",
                "nemáš čas ani kapacitu riešiť obsah interne",
                "predchádzajúce spolupráce boli generické — nič, čo by vystihlo tvoj brand",
                "rozhoduješ sám a chceš partnera, nie ďalšieho dodávateľa",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm sm:text-base text-black/75 leading-relaxed">
                  <span className="text-black/40 shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-black/50" />
              <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
                Čo je v spolupráci
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              Konkrétne dostaneš
            </h2>
            <ul className="space-y-4">
              {[
                ["Písomný scenár pred každým natáčaním", "Vieš dopredu, čo vznikne a prečo."],
                ["Mesačný plán obsahu", "Témy, formáty a termíny — žiadne postovanie naslepo."],
                ["In-house produkcia od A po Z", "Kamera, svetlá, zvuk, strih, titulky. Bez subdodávateľov."],
                ["Mesačný report", "Dosah, engagement, dopyty — čo funguje a čo meníme."],
                ["Priama komunikácia", "Žiadny account manager medzi vami — riešiš to s ľuďmi, ktorí obsah reálne tvoria."],
              ].map(([title, desc]) => (
                <li key={title} className="border-l-2 border-black/20 pl-4">
                  <p className="text-sm sm:text-base font-medium">{title}</p>
                  <p className="text-xs sm:text-sm text-black/55 leading-relaxed">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── AKO TO PREBIEHA ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-black/50" />
          <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
            Ako to prebieha
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            ["01", "Nezáväzný hovor", "Zistíme, kde si a čo potrebuješ. 20–30 minút, bez prezentácií."],
            ["02", "Návrh na mieru", "Ak dáva spolupráca zmysel, pošleme konkrétny plán a cenu. Ak nie, povieme ti to na rovinu."],
            ["03", "Spustíme produkciu", "Scenáre, natáčanie, prvý obsah vonku. Minimálna spolupráca sú 3 mesiace."],
          ].map(([num, title, desc]) => (
            <div key={num} className="border border-black/15 p-6">
              <span className="text-black/30 text-xs font-mono uppercase tracking-widest">{num}</span>
              <p className="text-lg font-bold mt-3 mb-2">{title}</p>
              <p className="text-sm text-black/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMULÁR ── */}
      <section
        id="formular"
        className="px-5 sm:px-8 lg:px-16 py-16 scroll-mt-6 bg-black text-[#BAFF57]"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#BAFF57]/40" />
            <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">
              Prvý krok
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
            Napíš nám a ozveme sa do 24 hodín
          </h2>
          <p className="text-[#BAFF57]/55 text-sm mb-9">
            Konzultácia je zadarmo a k ničomu ťa nezaväzuje.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* honeypot */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <label htmlFor="user_name" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                Meno a priezvisko <span className="text-red-400">*</span>
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                value={values.user_name}
                onChange={(e) => update("user_name", e.target.value)}
                className={fieldClass("user_name")}
                placeholder="Ján Novák"
              />
              {errors.user_name && <p className="text-red-400 text-xs mt-1">{errors.user_name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="user_email" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                  E-mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  value={values.user_email}
                  onChange={(e) => update("user_email", e.target.value)}
                  className={fieldClass("user_email")}
                  placeholder="jan@firma.sk"
                />
                {errors.user_email && <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>}
              </div>
              <div>
                <label htmlFor="user_phone" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                  Telefón <span className="text-[#BAFF57]/40 normal-case tracking-normal">(nepovinné)</span>
                </label>
                <input
                  id="user_phone"
                  name="user_phone"
                  type="tel"
                  value={values.user_phone}
                  onChange={(e) => update("user_phone", e.target.value)}
                  className={fieldClass("user_phone")}
                  placeholder="+421 9xx xxx xxx"
                />
                {errors.user_phone && <p className="text-red-400 text-xs mt-1">{errors.user_phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                Firma / web <span className="text-[#BAFF57]/40 normal-case tracking-normal">(nepovinné)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={values.company}
                onChange={(e) => update("company", e.target.value)}
                className={fieldClass("company")}
                placeholder="Napr. firma.sk alebo @instagram"
              />
              {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="note" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                Čo chceš riešiť? <span className="text-[#BAFF57]/40 normal-case tracking-normal">(nepovinné)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                value={values.note}
                onChange={(e) => update("note", e.target.value)}
                className={`${fieldClass("note")} resize-none`}
                placeholder="Krátko o firme a o tom, čo ťa na sociálnych sieťach trápi…"
              />
            </div>

            {submitError && (
              <div className="border border-red-500/50 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
                Nepodarilo sa odoslať. Skús to znova, alebo nám napíš priamo na{" "}
                <a href="mailto:team@nextlayer.studio" className="underline">
                  team@nextlayer.studio
                </a>
                .
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#BAFF57] text-black py-4 text-sm uppercase tracking-wider font-normal hover:bg-[#BAFF57]/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Odosielam…
                </>
              ) : (
                "Odoslať a rezervovať konzultáciu"
              )}
            </button>

            <p className="text-[#BAFF57]/35 text-xs leading-relaxed">
              Odoslaním súhlasíš so spracovaním údajov za účelom kontaktovania.{" "}
              <Link href="/ochrana-sukromia" className="underline hover:text-[#BAFF57]/60">
                Ochrana údajov
              </Link>
              .
            </p>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 sm:px-8 lg:px-16 py-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-black/50" />
          <span className="text-black/50 text-xs uppercase tracking-widest font-mono">
            Časté otázky
          </span>
        </div>
        <div className="divide-y divide-black/15 border-y border-black/15">
          {[
            [
              "Koľko to stojí?",
              "Mesačná spolupráca začína na 500 € (4 videá + správa jednej siete). Presnú ponuku dostaneš až po hovore, keď budeme vedieť, čo reálne potrebuješ. Reklamný rozpočet si platíš priamo.",
            ],
            [
              "Musím sa hneď k niečomu zaviazať?",
              "Nie. Prvý hovor je nezáväzný. Ak spolupráca nedáva zmysel, povieme ti to. Ak áno, pošleme návrh a rozhoduješ sa v pokoji.",
            ],
            [
              "Odkiaľ ste a s kým pracujete?",
              "Sme z Bratislavy, pracujeme primárne na západnom Slovensku. Klienti sú zavedené firmy — gastro, wellness, služby, výroba, lokálne značky.",
            ],
            [
              "Ako rýchlo sa ozvete?",
              "Do 24 hodín od odoslania formulára, väčšinou skôr.",
            ],
          ].map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-medium">
                {q}
                <span className="text-black/40 transition-transform group-open:rotate-45 ml-4 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-black/60 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#formular"
            className="inline-flex items-center gap-3 bg-black text-[#BAFF57] px-7 py-4 text-sm uppercase tracking-wider hover:bg-black/85 transition-colors"
          >
            Chcem bezplatnú konzultáciu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#212121] text-[#BAFF57]/40 px-5 sm:px-8 lg:px-16 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest">
          <p>© 2026 NextLayer Studio s.r.o. · Bratislava</p>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-[#BAFF57] transition-colors">
              Hlavná stránka
            </Link>
            <Link href="/ochrana-sukromia" className="hover:text-[#BAFF57] transition-colors">
              Ochrana údajov
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
