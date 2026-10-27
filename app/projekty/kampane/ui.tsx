export const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);

export function SectionLabel({ num, label, dark = false }: { num: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`text-xs font-mono ${dark ? "text-[#BAFF57]/40" : "text-black/40"}`}>{num}</span>
      <div className={`w-8 h-px ${dark ? "bg-[#BAFF57]" : "bg-black"}`}></div>
      <span className={`text-xs uppercase tracking-widest font-mono ${dark ? "text-[#BAFF57]/50" : "text-black/50"}`}>{label}</span>
    </div>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
