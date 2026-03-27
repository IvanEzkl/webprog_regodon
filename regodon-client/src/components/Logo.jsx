const Logo = ({ className = "" }) => {
  return (
    <div className={["inline-flex items-center gap-2", className].join(" ").trim()}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#140D19] bg-[#140D19] text-xs font-black tracking-[0.14em] text-[#E7D3E6]">
        IR
      </span>
      <span className="text-base font-black uppercase tracking-[0.12em] text-[#140D19] sm:text-lg">
        Regodon Studio
      </span>
    </div>
  );
};

export default Logo;