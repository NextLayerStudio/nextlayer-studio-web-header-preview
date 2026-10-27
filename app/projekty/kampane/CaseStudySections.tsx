import Reveal from "../../components/Reveal";
import type { CaseStudy, CaseStudyDecision } from "./data";
import { SectionLabel, pad } from "./ui";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const figureCols: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={line}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}

function Decision({ d, i }: { d: CaseStudyDecision; i: number }) {
  return (
    <article className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 ${i === 0 ? "pt-0 md:pt-0" : "border-t border-black"}`}>
      <Reveal className="lg:col-span-4">
        <div className="lg:sticky lg:top-10">
          <span className="block text-7xl md:text-8xl font-bold leading-none tracking-tighter text-black/15">{pad(i + 1)}</span>
          <h3 className="mt-4 text-2xl md:text-4xl font-bold leading-[1.05] tracking-tight">{d.title}</h3>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-8 space-y-6" delay={100}>
        {d.body.map((p) => (
          <p key={p} className="text-sm md:text-lg leading-relaxed md:leading-[1.75] text-black/75">{p}</p>
        ))}

        {d.bullets && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {d.bullets.map((b) => (
              <li key={b} className="flex gap-3 bg-white p-5 border border-black/10">
                <span className="shrink-0 w-6 h-6 bg-[#BAFF57] text-black flex items-center justify-center"><CheckIcon /></span>
                <span className="text-sm md:text-base leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {d.table && (() => {
          const twoCol = d.table.head.length === 2;
          const labelSpan = twoCol ? "md:col-span-4" : "md:col-span-3";
          const midSpan = twoCol ? "md:col-span-8" : "md:col-span-3";
          return (
          <div className="bg-white border border-black/10 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-widest">
              <span className={`${labelSpan} px-5 py-3`}>{d.table.head[0]}</span>
              <span className={`${twoCol ? "md:col-span-8" : "md:col-span-3"} px-5 py-3 border-l border-[#BAFF57]/20`}>{d.table.head[1]}</span>
              {!twoCol && d.table.head[2] && (
                <span className="col-span-6 px-5 py-3 border-l border-[#BAFF57]/20">{d.table.head[2]}</span>
              )}
            </div>
            {d.table.rows.map((row, ri) => (
              <div key={row[0]} className="grid grid-cols-1 md:grid-cols-12 border-t border-black/10 hover:bg-[#BAFF57]/30 transition-colors">
                <div className={`${labelSpan} px-5 pt-5 md:py-5 flex items-start gap-3`}>
                  <span className="text-[10px] font-mono text-black/35 pt-1">{pad(ri + 1)}</span>
                  <span className="font-bold leading-snug">{row[0]}</span>
                </div>
                <p className={`${midSpan} px-5 pt-2 ${twoCol ? "pb-5" : ""} md:py-5 text-sm leading-relaxed text-black/70 md:border-l md:border-black/10`}>
                  <span className="md:hidden text-[10px] font-mono uppercase tracking-widest text-black/40 block mb-1">{d.table!.head[1]}</span>
                  {row[1]}
                </p>
                {!twoCol && (
                <p className="md:col-span-6 px-5 pt-2 pb-5 md:py-5 text-sm leading-relaxed text-black/60 md:border-l md:border-black/10">
                  <span className="md:hidden text-[10px] font-mono uppercase tracking-widest text-black/40 block mb-1">{d.table!.head[2]}</span>
                  {row[2]}
                </p>
                )}
              </div>
            ))}
          </div>
          );
        })()}

        {d.after?.map((p) => (
          <p key={p} className="text-sm md:text-lg leading-relaxed md:leading-[1.75] text-black/75">{p}</p>
        ))}

        {d.figures && (
          <div className={`grid grid-cols-1 ${figureCols[d.figures.length] ?? "sm:grid-cols-3"} border-y border-black/15`}>
            {d.figures.map((f, fi) => (
              <div key={f.label} className={`py-5 ${fi > 0 ? "sm:border-l sm:border-black/15 sm:pl-6 border-t sm:border-t-0 border-black/15" : ""}`}>
                <p className="text-3xl md:text-4xl font-bold tracking-tighter leading-none">{f.value}</p>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-black/50">{f.label}</p>
              </div>
            ))}
          </div>
        )}

        {d.highlight && (
          <div className="relative bg-black text-[#BAFF57] p-6 md:p-8">
            <span className="absolute top-0 left-0 w-1.5 h-full bg-[#BAFF57]"></span>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#BAFF57]/50 mb-3">Výsledok kroku</p>
            <p className="text-base md:text-xl font-medium leading-relaxed">{d.highlight}</p>
          </div>
        )}
      </Reveal>
    </article>
  );
}

/** Numbered from `start` so the labels continue after the shared stats block */
export default function CaseStudySections({ cs, start }: { cs: CaseStudy; start: number }) {
  let n = start;
  const next = () => pad(n++);

  return (
    <>
      {/* ── META ── */}
      <section className="px-5 md:px-12 lg:px-16 py-10 md:py-12 bg-white border-b border-black/10">
        <dl className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
          {cs.meta.map((m, i) => (
            <div key={m.label} className={`${i === 1 ? "md:col-span-6" : "md:col-span-3"} ${i > 0 ? "md:border-l md:border-black/10 md:pl-8" : ""} md:pr-8`}>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-black/40">{m.label}</dt>
              <dd className="mt-2 text-sm md:text-base font-medium leading-relaxed">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── VÝCHODISKO ── */}
      <section className="px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionLabel num={next()} label="Východisko" />
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Kde sme<br />začínali.</h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <p className="text-sm md:text-lg leading-relaxed md:leading-[1.8] text-black/75">{cs.context[0]}</p>
            {cs.context.slice(1).map((p) => (
              <p key={p} className="mt-8 text-xl md:text-3xl font-bold leading-snug tracking-tight border-l-4 border-black pl-5 md:pl-7">{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── ČO SME ZISTILI ── */}
      <section className="px-5 md:px-12 lg:px-16 pb-16 md:pb-24">
        <Reveal>
          <SectionLabel num={next()} label="Čo sme zistili" />
          <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
            <Lines text={cs.findingsTitle ?? "Tri veci, ktoré\nchýbali."} />
          </h2>
          {cs.findingsIntro && (
            <p className="mt-6 max-w-2xl text-sm md:text-lg leading-relaxed text-black/65">{cs.findingsIntro}</p>
          )}
        </Reveal>
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cs.findings.map((f, i) => (
            <Reveal key={typeof f === "string" ? f : f.title} delay={i * 100} className="h-full">
              <div className="group h-full bg-white p-2 hover:p-3 transition-all duration-300">
                <div className="h-full border border-black/10 p-6 md:p-7 flex flex-col">
                  <span className="text-5xl font-bold tracking-tighter leading-none text-[#BAFF57] [-webkit-text-stroke:1.5px_black]">{pad(i + 1)}</span>
                  {typeof f === "string" ? (
                    <p className="mt-6 text-sm md:text-base leading-relaxed text-black/75">{f}</p>
                  ) : (
                    <>
                      <h3 className="mt-6 text-xl md:text-2xl font-bold leading-tight tracking-tight">{f.title}</h3>
                      <ul className="mt-5 space-y-3 border-t border-black/10 pt-5">
                        {f.items.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-black/75">
                            <span className="shrink-0 mt-[0.55em] w-1.5 h-1.5 bg-black"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ROZHODNUTIA ── */}
      <section className="px-5 md:px-12 lg:px-16 py-16 md:py-24 border-t border-black/15">
        <Reveal className="mb-12 md:mb-16">
          <SectionLabel num={next()} label="Rozhodnutia a prečo" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">
            <Lines text={cs.decisionsTitle ?? "Štyri rozhodnutia,\nktoré to otočili."} />
          </h2>
        </Reveal>
        {cs.decisions.map((d, i) => (
          <Decision key={d.title} d={d} i={i} />
        ))}
      </section>

      {/* ── REŤAZEC / BUILD ── */}
      {(cs.chain?.length || cs.build?.length) && (
      <section className="relative bg-[#212121] text-[#BAFF57] overflow-hidden px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <p className="absolute -right-6 bottom-0 text-[18vw] font-bold leading-none tracking-tighter text-[#BAFF57]/[0.05] select-none pointer-events-none">
          ↓
        </p>
        {cs.chain ? (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionLabel num={next()} label={cs.chainLabel ?? "Ako to do seba zapadá"} dark />
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
              <Lines text={cs.chainTitle ?? "Jeden reťazec,\nnie tri nákupy."} />
            </h2>
            {cs.chainIntro && (
              <p className="mt-7 text-sm md:text-lg leading-relaxed md:leading-[1.75] text-[#BAFF57]/85">{cs.chainIntro}</p>
            )}
            {[cs.chainNote ?? []].flat().map((note) => (
              <p key={note} className="mt-7 text-sm md:text-base leading-relaxed md:leading-[1.8] text-[#BAFF57]/60">{note}</p>
            ))}
          </Reveal>

          <ol className="lg:col-span-8">
            {cs.chain.map((step, i, chain) => {
              const last = i === chain.length - 1;
              return (
                <Reveal key={step} delay={i * 90}>
                  <li className="flex flex-col">
                    <div className={`flex items-center gap-5 md:gap-7 px-5 md:px-7 py-5 md:py-6 ${last ? "bg-[#BAFF57] text-black" : "border border-[#BAFF57]/25"}`}>
                      <span className={`text-xs font-mono shrink-0 ${last ? "text-black/50" : "text-[#BAFF57]/45"}`}>{pad(i + 1)}</span>
                      <span className={`text-base md:text-2xl leading-snug ${last ? "font-bold" : "font-medium"}`}>{step}</span>
                    </div>
                    {!last && (
                      <span className="self-start ml-8 md:ml-10 h-8 w-px bg-[#BAFF57]/40 relative">
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-[#BAFF57]/60 rotate-45"></span>
                      </span>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
        ) : (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionLabel num={next()} label="Ako sme to technicky postavili" dark />
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">
              <Lines text={cs.buildTitle ?? "Technika\npod kapotou."} />
            </h2>
            {cs.buildNote && (
              <p className="mt-7 text-sm md:text-base leading-relaxed md:leading-[1.8] text-[#BAFF57]/60">{cs.buildNote}</p>
            )}
          </Reveal>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {cs.build?.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="h-full">
                <div className="h-full border border-[#BAFF57]/25 p-6 md:p-7 hover:bg-[#BAFF57] hover:text-black transition-colors duration-300 group">
                  <span className="text-xs font-mono text-[#BAFF57]/45 group-hover:text-black/50">{pad(i + 1)}</span>
                  <h3 className="mt-5 text-lg md:text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-[#BAFF57]/65 group-hover:text-black/70">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        )}
      </section>
      )}

      {/* ── TERAZ ── */}
      {cs.now.length > 0 && (
      <section className="px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionLabel num={next()} label="Na čom pracujeme teraz" />
            <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Spolupráca<br />pokračuje.</h2>
            <span className="mt-6 inline-flex items-center gap-2 bg-black text-[#BAFF57] text-[10px] font-mono uppercase tracking-widest px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BAFF57] animate-pulse"></span>
              Prebieha
            </span>
          </Reveal>
          <div className="lg:col-span-8 border-t border-black">
            {cs.now.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="grid grid-cols-12 gap-4 py-6 md:py-7 border-b border-black/15 hover:bg-white hover:px-5 transition-all duration-300">
                  <span className="col-span-2 md:col-span-1 text-xs font-mono text-black/40 pt-1.5">{pad(i + 1)}</span>
                  <h3 className="col-span-10 md:col-span-4 text-lg md:text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className="col-span-12 md:col-span-7 text-sm md:text-base leading-relaxed text-black/65">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── VÝSLEDKY ── */}
      <section className="bg-white px-5 md:px-12 lg:px-16 py-16 md:py-24">
        <Reveal>
          <SectionLabel num={next()} label="Výsledky" />
          <h2 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tight">Čo to prinieslo.</h2>
        </Reveal>
        <ul className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {cs.results.map((r, i) => (
            <Reveal key={r} delay={i * 60}>
              <li className="h-full bg-white flex gap-4 p-6 md:p-7 hover:bg-[#BAFF57] transition-colors">
                <span className="shrink-0 w-7 h-7 bg-black text-[#BAFF57] flex items-center justify-center"><CheckIcon /></span>
                <span className="text-sm md:text-lg font-medium leading-snug">{r}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
