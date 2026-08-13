export default function UnitToggle({ unit, onChange }) {
  return (
    <div
      role="group"
      aria-label="Temperature unit"
      className="flex bg-panel border border-panel-border rounded-sm2 p-[3px] gap-0.5"
    >
      <button
        type="button"
        onClick={() => onChange("C")}
        className={`bg-transparent border-none font-mono text-[12.5px] px-3 py-1.5 rounded-md cursor-pointer ${
          unit === "C" ? "bg-accent-cyan/[0.14] text-accent-cyan" : "text-text-tertiary"
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChange("F")}
        className={`bg-transparent border-none font-mono text-[12.5px] px-3 py-1.5 rounded-md cursor-pointer ${
          unit === "F" ? "bg-accent-cyan/[0.14] text-accent-cyan" : "text-text-tertiary"
        }`}
      >
        °F
      </button>
    </div>
  );
}