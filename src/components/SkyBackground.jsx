const GRADIENTS = {
  clear_day: ["#0f2544", "#1c4a73", "#3f7fab"],
  clear_night: ["#050a16", "#0b1530", "#111f3f"],
  cloudy_day: ["#101a2c", "#233348", "#3a4a63"],
  cloudy_night: ["#070c18", "#0e1626", "#181f30"],
  rain_day: ["#0a1220", "#132132", "#1c2e40"],
  rain_night: ["#05090f", "#0a121e", "#0f1826"],
  snow_day: ["#111a2c", "#233043", "#3c4a5e"],
  snow_night: ["#06090f", "#0d131f", "#161c29"],
  storm_day: ["#080b13", "#141520", "#1e1a2a"],
  storm_night: ["#05060a", "#0c0b14", "#151220"],
  fog_day: ["#12161f", "#20242e", "#33373f"],
  fog_night: ["#080a0e", "#101319", "#191c22"],
};

function gradientKey(group, isDay) {
  const key = `${group}_${isDay ? "day" : "night"}`;
  return GRADIENTS[key] ? key : isDay ? "clear_day" : "clear_night";
}

export default function SkyBackground({ group = "clear", isDay = true }) {
  const key = gradientKey(group, isDay);
  const [c1, c2, c3] = GRADIENTS[key];
  const showRain = group === "rain" || group === "storm";
  const showSnow = group === "snow";
  const showStars = isDay === false && (group === "clear" || group === "cloudy");

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-[background] duration-[1200ms] ease-out"
      style={{
        background: `radial-gradient(120% 90% at 15% -10%, ${c3} 0%, ${c2} 45%, ${c1} 100%)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(5,8,15,0.55)]" />

      {showStars && (
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-[#e6f0ff] opacity-50 motion-safe:animate-twinkle"
              style={{
                top: `${(i * 37) % 60}%`,
                left: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 10) * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {showRain && (
        <div className="absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="absolute -top-[10%] w-px h-[60px] bg-gradient-to-b from-[rgba(180,210,255,0)] to-[rgba(180,210,255,0.45)] motion-safe:animate-fall"
              style={{
                left: `${(i * 41) % 100}%`,
                animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                animationDelay: `${(i % 7) * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {showSnow && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute -top-[5%] w-1 h-1 rounded-full bg-white/65 motion-safe:animate-drift"
              style={{
                left: `${(i * 33) % 100}%`,
                animationDuration: `${6 + (i % 6)}s`,
                animationDelay: `${(i % 10) * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute w-[380px] h-[140px] top-[8%] -left-[10%] rounded-full blur-[40px] opacity-[0.18] bg-white motion-safe:animate-driftAcross [animation-duration:60s]" />
      <div className="absolute w-[260px] h-[100px] top-[22%] left-[40%] rounded-full blur-[40px] opacity-[0.12] bg-white motion-safe:animate-driftAcross [animation-duration:80s] [animation-direction:reverse]" />
    </div>
  );
}