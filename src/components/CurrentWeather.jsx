import { describeWeatherCode } from "../utils/weatherCodes.js";
import { formatTemp, formatFullDate } from "../utils/formatters.js";
import { WeatherIcon } from "../components/Icons.jsx";

export default function CurrentWeather({ location, current, unit }) {
  const isDay = current.is_day === 1;
  const { label, icon } = describeWeatherCode(current.weather_code, isDay);
  const now = new Date();

  return (
    <section className="flex flex-col gap-5 pt-2 px-1" aria-label="Current conditions">
      <div>
        <h1 className="font-display text-[clamp(28px,5vw,40px)] font-semibold tracking-tight text-text-primary m-0">
          {location.name}
        </h1>
        <p className="mt-1 text-text-secondary text-[14.5px]">
          {[location.admin1, location.country].filter(Boolean).join(", ")}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-accent-cyan flex-shrink-0 drop-shadow-[0_8px_24px_rgba(94,234,212,0.25)]">
          <WeatherIcon name={icon} size={72} />
        </div>
        <div className="font-display text-[clamp(64px,12vw,108px)] font-semibold leading-none tracking-tight text-text-primary">
          {formatTemp(unit === "F" ? (current.temperature_2m * 9) / 5 + 32 : current.temperature_2m)}
        </div>
        <div className="flex flex-col gap-1 pl-1 sm:pl-1">
          <p className="m-0 text-[17px] font-medium text-text-primary">{label}</p>
          <p className="m-0 text-[13.5px] text-text-secondary font-mono">
            Feels like{" "}
            {formatTemp(
              unit === "F" ? (current.apparent_temperature * 9) / 5 + 32 : current.apparent_temperature
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-text-tertiary font-mono text-[12.5px] tracking-wide">
        <span>{formatFullDate(now)}</span>
        <span className="opacity-60">•</span>
        <span>
          {now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} local
        </span>
      </div>
    </section>
  );
}