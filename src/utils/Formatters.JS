export function formatTemp(value, unit = "C") {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${Math.round(value)}°`;
}

export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function formatWind(speedKmh, unit = "kmh") {
  if (speedKmh === null || speedKmh === undefined) return "—";
  if (unit === "mph") return `${Math.round(speedKmh * 0.621371)} mph`;
  return `${Math.round(speedKmh)} km/h`;
}

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

export function windDirectionLabel(deg) {
  if (deg === null || deg === undefined) return "—";
  const idx = Math.round(deg / 22.5) % 16;
  return COMPASS[idx];
}

export function formatHour(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString(undefined, { hour: "numeric" });
}

export function formatDayShort(isoDateString) {
  const d = new Date(isoDateString + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

export function formatDayLong(isoDateString) {
  const d = new Date(isoDateString + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

export function formatClock(date, timezone) {
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatFullDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatSunTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}