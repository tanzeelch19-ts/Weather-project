// WMO Weather interpretation codes, as used by Open-Meteo.
// https://open-meteo.com/en/docs
// Each entry maps a code to a human label, a broad "group" (used for
// background theming) and an "icon" key (used by assets/icons.jsx).

const CODES = {
  0: { label: "Clear sky", group: "clear", icon: "sun" },
  1: { label: "Mostly clear", group: "clear", icon: "sun" },
  2: { label: "Partly cloudy", group: "cloudy", icon: "cloud-sun" },
  3: { label: "Overcast", group: "cloudy", icon: "cloud" },
  45: { label: "Fog", group: "fog", icon: "fog" },
  48: { label: "Rime fog", group: "fog", icon: "fog" },
  51: { label: "Light drizzle", group: "rain", icon: "cloud-drizzle" },
  53: { label: "Drizzle", group: "rain", icon: "cloud-drizzle" },
  55: { label: "Dense drizzle", group: "rain", icon: "cloud-drizzle" },
  56: { label: "Light freezing drizzle", group: "rain", icon: "cloud-drizzle" },
  57: { label: "Freezing drizzle", group: "rain", icon: "cloud-drizzle" },
  61: { label: "Light rain", group: "rain", icon: "cloud-rain" },
  63: { label: "Rain", group: "rain", icon: "cloud-rain" },
  65: { label: "Heavy rain", group: "rain", icon: "cloud-rain" },
  66: { label: "Light freezing rain", group: "rain", icon: "cloud-rain" },
  67: { label: "Freezing rain", group: "rain", icon: "cloud-rain" },
  71: { label: "Light snow", group: "snow", icon: "cloud-snow" },
  73: { label: "Snow", group: "snow", icon: "cloud-snow" },
  75: { label: "Heavy snow", group: "snow", icon: "cloud-snow" },
  77: { label: "Snow grains", group: "snow", icon: "cloud-snow" },
  80: { label: "Light showers", group: "rain", icon: "cloud-rain" },
  81: { label: "Showers", group: "rain", icon: "cloud-rain" },
  82: { label: "Violent showers", group: "rain", icon: "cloud-rain" },
  85: { label: "Light snow showers", group: "snow", icon: "cloud-snow" },
  86: { label: "Snow showers", group: "snow", icon: "cloud-snow" },
  95: { label: "Thunderstorm", group: "storm", icon: "storm" },
  96: { label: "Thunderstorm, light hail", group: "storm", icon: "storm" },
  99: { label: "Thunderstorm, heavy hail", group: "storm", icon: "storm" },
};

const FALLBACK = { label: "Unknown", group: "cloudy", icon: "cloud" };

export function describeWeatherCode(code, isDay = true) {
  const entry = CODES[code] || FALLBACK;
  // Swap the clear-sky icon for a moon at night, keep everything else.
  if (entry.icon === "sun" && !isDay) {
    return { ...entry, icon: "moon" };
  }
  if (entry.icon === "cloud-sun" && !isDay) {
    return { ...entry, icon: "cloud-moon" };
  }
  return entry;
}

export default CODES;