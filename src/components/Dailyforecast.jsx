import { describeWeatherCode } from "../utils/weatherCodes";
import { formatTemp, formatDayShort } from "../utils/formatters";
import { WeatherIcon } from "../components/icons.jsx";

export default function DailyForecast({ daily, unit }) {
  if (!daily) return null;

  const allLows = daily.temperature_2m_min;
  const allHighs = daily.temperature_2m_max;
  const globalMin = Math.min(...allLows);
  const globalMax = Math.max(...allHighs);
  const range = Math.max(globalMax - globalMin, 1);

  const toDisplay = (c) => (unit === "F" ? (c * 9) / 5 + 32 : c);

  return (
    <section
      className="bg-panel border border-panel-border rounded-lg2 p-5 backdrop-blur-2xl shadow-panel"
      aria-label="7-day forecast"
    >
      <h2 className="font-mono text-[11.5px] font-medium tracking-[0.09em] uppercase text-text-tertiary m-0 mb-4">
        7-day outlook
      </h2>
      <ul className="list-none m-0 p-0 flex flex-col">
        {daily.time.map((date, i) => {
          const { icon, label } = describeWeatherCode(daily.weather_code[i], true);
          const low = allLows[i];
          const high = allHighs[i];
          const leftPct = ((low - globalMin) / range) * 100;
          const widthPct = ((high - low) / range) * 100;
          const pop = daily.precipitation_probability_max?.[i];

          return (
            <li
              key={date}
              className="grid grid-cols-[44px_24px_0px_28px_1fr_28px] sm:grid-cols-[52px_28px_34px_30px_1fr_30px] items-center gap-2.5 py-2.5 border-b border-white/[0.08] last:border-b-0"
            >
              <span className="text-[13.5px] font-medium text-text-primary">
                {i === 0 ? "Today" : formatDayShort(date)}
              </span>
              <span className="text-accent-cyan flex" title={label}>
                <WeatherIcon name={icon} size={22} />
              </span>
              <span className="font-mono text-[11px] text-accent-blue text-right hidden sm:inline">
                {pop ? `${pop}%` : ""}
              </span>
              <span className="font-mono text-[12.5px] text-text-tertiary text-right">
                {formatTemp(toDisplay(low))}
              </span>
              <span className="relative h-1 rounded-full bg-white/[0.08]">
                <span
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-amber"
                  style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 6)}%` }}
                />
              </span>
              <span className="font-mono text-[12.5px] font-medium text-text-primary">
                {formatTemp(toDisplay(high))}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}