"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function TerminForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState({
    user_name: searchParams.get("meno") || "",
    user_email: searchParams.get("email") || "",
    focus: "",
    date: "",
    service: "",
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
    if (!values.date) next.date = "Vyber preferovaný dátum.";
    if (!values.service) next.service = "Vyber, o akú službu máš záujem.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hp = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement)?.value;
    if (hp) {
      router.push("/dakujeme");
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const serviceLabel =
        values.service === "online"
          ? "Online prítomnosť (video, sociálne siete)"
          : values.service === "software"
          ? "Softvérové riešenie (web, appka)"
          : values.service;

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.user_name.trim(),
          email: values.user_email.trim(),
          phone: "",
          company: values.focus.trim(),
          note: [`Preferovaný termín konzultácie: ${values.date}`, `Záujem o: ${serviceLabel}`].join("\n"),
          source: "termin (nadväzný formulár po Instant Form leade)",
        }),
      });
      const data: { ok?: boolean } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("lead-send-failed");
      router.push("/dakujeme");
    } catch (err) {
      console.error("Odoslanie termínu zlyhalo:", err);
      setSubmitError(true);
      setSubmitting(false);
    }
  }

  const fieldClass = (field: string) =>
    `w-full bg-transparent border-b-2 px-0 py-3 text-lg text-[#BAFF57] placeholder:text-[#BAFF57]/30 focus:outline-none transition-colors ${
      errors[field] ? "border-red-400" : "border-[#BAFF57]/25 focus:border-[#BAFF57]"
    }`;

  const today = new Date();
  const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return (
    <main className="h-screen overflow-y-auto bg-black text-[#BAFF57]">
      <header className="flex items-center justify-between px-5 sm:px-8 lg:px-16 py-5">
        <Link href="/" aria-label="NextLayer Studio">
          <Image
            src="/fonts/Group.png"
            alt="NextLayer Studio"
            width={80}
            height={80}
            className="h-9 sm:h-10 w-auto invert"
            priority
          />
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#BAFF57]/50">
          nextlayer.studio
        </span>
      </header>

      <section className="px-5 sm:px-8 lg:px-16 py-10 sm:py-16">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#BAFF57]/40" />
            <span className="text-[#BAFF57]/50 text-xs uppercase tracking-widest font-mono">
              Dohodnime si termín
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">
            Ešte pár otázok pred konzultáciou
          </h1>
          <p className="text-[#BAFF57]/55 text-sm mb-9">
            Vďaka za kontakt cez Facebook. Aby sme sa vedeli na hovor pripraviť, vyber si termín
            a povedz nám niečo o sebe — zaberie to menej než minútu.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="user_name" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                  Meno <span className="text-red-400">*</span>
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  autoComplete="off"
                  value={values.user_name}
                  onChange={(e) => update("user_name", e.target.value)}
                  className={fieldClass("user_name")}
                  placeholder="Ján Novák"
                />
                {errors.user_name && <p className="text-red-400 text-xs mt-1">{errors.user_name}</p>}
              </div>
              <div>
                <label htmlFor="user_email" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                  E-mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="off"
                  value={values.user_email}
                  onChange={(e) => update("user_email", e.target.value)}
                  className={fieldClass("user_email")}
                  placeholder="jan@firma.sk"
                />
                {errors.user_email && <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="focus" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                Čomu sa venujete?
              </label>
              <input
                id="focus"
                name="focus"
                type="text"
                value={values.focus}
                onChange={(e) => update("focus", e.target.value)}
                className={fieldClass("focus")}
                placeholder="Napr. autoškola, kaviareň, e-shop…"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-xs uppercase tracking-wider mb-2 text-[#BAFF57]/70">
                Preferovaný dátum konzultácie <span className="text-red-400">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                min={minDate}
                value={values.date}
                onChange={(e) => update("date", e.target.value)}
                className={fieldClass("date")}
              />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider mb-3 text-[#BAFF57]/70">
                O akú službu máte záujem? <span className="text-red-400">*</span>
              </span>
              <div className="space-y-3">
                {[
                  { value: "online", label: "Online prítomnosť", desc: "video produkcia, správa sociálnych sietí" },
                  { value: "software", label: "Softvérové riešenie", desc: "web, appka, digitálny produkt" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                      values.service === opt.value
                        ? "border-[#BAFF57] bg-[#BAFF57]/5"
                        : "border-[#BAFF57]/25 hover:border-[#BAFF57]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={opt.value}
                      checked={values.service === opt.value}
                      onChange={(e) => update("service", e.target.value)}
                      className="mt-1 accent-[#BAFF57]"
                    />
                    <span>
                      <span className="block text-sm font-medium">{opt.label}</span>
                      <span className="block text-xs text-[#BAFF57]/50">{opt.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
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
                "Potvrdiť termín"
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
    </main>
  );
}
