export default function LoadingState() {
  const shimmer =
    "bg-[linear-gradient(90deg,rgba(148,163,184,0.08),rgba(148,163,184,0.18),rgba(148,163,184,0.08))] bg-[length:200%_100%] animate-shimmer";

  return (
    <div className="flex flex-col gap-[18px]" role="status" aria-live="polite">
      <div className="flex flex-col gap-3 px-1 py-2">
        <div className={`h-3.5 w-2/5 rounded-md ${shimmer}`} />
        <div className={`h-3.5 w-1/4 rounded-md ${shimmer}`} />
        <div
          className="h-[90px] w-[200px] rounded-xl bg-[linear-gradient(90deg,rgba(148,163,184,0.06),rgba(148,163,184,0.14),rgba(148,163,184,0.06))] bg-[length:200%_100%] animate-shimmer"
        />
      </div>
      <div
        className="h-[140px] rounded-lg2 bg-[linear-gradient(90deg,rgba(148,163,184,0.05),rgba(148,163,184,0.1),rgba(148,163,184,0.05))] bg-[length:200%_100%] animate-shimmer"
      />
      <div
        className="h-[140px] rounded-lg2 bg-[linear-gradient(90deg,rgba(148,163,184,0.05),rgba(148,163,184,0.1),rgba(148,163,184,0.05))] bg-[length:200%_100%] animate-shimmer"
      />
      <span className="sr-only">Loading forecast…</span>
    </div>
  );
}