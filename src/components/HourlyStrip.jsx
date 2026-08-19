import { describeWeatherCode } from "../utils/weatherCodes";
import { formatTemp, formatHour } from "../utils/formatters";
import { WeatherIcon } from "../components/Icons";

export default function HourlyStrip({ hourly, unit, currentIsoHour }) {
  if (!hourly) return null;

  // Find the index closest to "now" so the strip starts at the current hour.
  const startIdx = Math.max(
    0,
    hourly.time.findIndex((t) => t >= currentIsoHour)
  );
  const slice = Array.from({ length: 24 }, (_, i) => startIdx + i).filter(
    (i) => i < hourly.time.length
  );

  return (
    <section
      className="bg-panel border border-panel-border rounded-lg2 p-5 backdrop-blur-2xl shadow-panel"
      aria-label="Hourly forecast"
    >
      <h2 className="font-mono text-[11.5px] font-medium tracking-[0.09em] uppercase text-text-tertiary m-0 mb-4">
        Next 24 hours
      </h2>
      <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {slice.map((i, idx) => {
          const isDayGuess =
            new Date(hourly.time[i]).getHours() >= 6 && new Date(hourly.time[i]).getHours() < 19;
          const { icon } = describeWeatherCode(hourly.weather_code[i], isDayGuess);
          const temp = hourly.temperature_2m[i];
          const pop = hourly.precipitation_probability?.[i];
          return (
            <div
              key={hourly.time[i]}
              className={`flex flex-col items-center gap-1.5 min-w-[56px] py-2.5 px-1 rounded-sm2 flex-shrink-0 ${
                idx === 0 ? "bg-accent-cyan/[0.08]" : ""
              }`}
            >
              <span className="font-mono text-[11.5px] text-text-secondary">
                {idx === 0 ? "Now" : formatHour(hourly.time[i])}
              </span>
              <span className="text-accent-cyan">
                <WeatherIcon name={icon} size={26} />
              </span>
              <span className="font-mono text-[10.5px] text-accent-blue h-3">
                {pop ? `${pop}%` : ""}
              </span>
              <span className="font-display text-[15px] font-semibold text-text-primary">
                {formatTemp(unit === "F" ? (temp * 9) / 5 + 32 : temp)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}