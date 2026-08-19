import { memo } from "react";
import {
  WindIcon,
  DropletIcon,
  GaugeIcon,
  UvIcon,
  EyeIcon,
  SunriseIcon,
  SunsetIcon,
} from "../components/Icons";
import { formatWind, windDirectionLabel, formatSunTime } from "../utils/formatters";

const UV_BANDS = [
  { max: 3, label: "Low" },
  { max: 6, label: "Moderate" },
  { max: 8, label: "High" },
  { max: 11, label: "Very high" },
];

function uvLabel(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const band = UV_BANDS.find((b) => value < b.max);
  return band ? band.label : "Extreme";
}

const Readout = memo(function Readout({ icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-sm2 bg-white/[0.02] border border-white/[0.08]">
      <div className="text-accent-blue flex-shrink-0 mt-0.5" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-text-tertiary">
          {label}
        </span>
        <span className="font-display text-[17px] leading-tight font-semibold text-text-primary break-words">
          {value}
        </span>
        {sub && (
          <span className="text-[11px] leading-snug text-text-secondary break-words">{sub}</span>
        )}
      </div>
    </div>
  );
});

export default function InstrumentPanel({ current, daily, hourly, windUnit }) {
  if (!current) return null;

  const visibilityMeters = hourly?.visibility?.[0];
  const visibilityKm =
    typeof visibilityMeters === "number" ? (visibilityMeters / 1000).toFixed(1) : null;

  const hasSunrise = Boolean(daily?.sunrise?.[0]);
  const hasSunset = Boolean(daily?.sunset?.[0]);

  return (
    <section
      className="bg-panel border border-panel-border rounded-lg2 p-5 backdrop-blur-2xl shadow-panel"
      aria-label="Detailed conditions"
    >
      <h2 className="font-mono text-[11.5px] font-medium tracking-[0.09em] uppercase text-text-tertiary m-0 mb-4">
        Conditions
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3.5">
        <Readout
          icon={<WindIcon size={20} />}
          label="Wind"
          value={formatWind(current.wind_speed_10m, windUnit)}
          sub={
            current.wind_direction_10m != null
              ? `${windDirectionLabel(current.wind_direction_10m)} · gusts ${formatWind(
                  current.wind_gusts_10m,
                  windUnit
                )}`
              : undefined
          }
        />
        <Readout
          icon={<DropletIcon size={20} />}
          label="Humidity"
          value={
            current.relative_humidity_2m != null
              ? `${Math.round(current.relative_humidity_2m)}%`
              : "—"
          }
        />
        <Readout
          icon={<GaugeIcon size={20} />}
          label="Pressure"
          value={current.surface_pressure != null ? `${Math.round(current.surface_pressure)} hPa` : "—"}
        />
        <Readout
          icon={<UvIcon size={20} />}
          label="UV index"
          value={current.uv_index?.toFixed(1) ?? "—"}
          sub={uvLabel(current.uv_index)}
        />
        {visibilityKm && (
          <Readout icon={<EyeIcon size={20} />} label="Visibility" value={`${visibilityKm} km`} />
        )}
        {hasSunrise && (
          <Readout
            icon={<SunriseIcon size={20} />}
            label="Sunrise"
            value={formatSunTime(daily.sunrise[0])}
          />
        )}
        {hasSunset && (
          <Readout
            icon={<SunsetIcon size={20} />}
            label="Sunset"
            value={formatSunTime(daily.sunset[0])}
          />
        )}
      </div>
    </section>
  );
}