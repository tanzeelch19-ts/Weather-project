// All data comes from Open-Meteo (https://open-meteo.com) — a free,
// no-API-key-required weather API backed by national weather models
// (NOAA, DWD, ECMWF, MET Norway, etc). This means the app works the
// moment it's deployed, with nothing to sign up for or configure.

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEOCODE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

/** Search for a place by name. Returns an array of candidate locations. */
export async function geocodeCity(query, signal) {
  if (!query || query.trim().length < 2) return [];

  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Location search failed");
  const data = await res.json();

  return (data.results || []).map((r) => ({
    id: r.id,
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    countryCode: r.country_code,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}

/** Reverse-geocode browser coordinates into a readable place name. */
export async function reverseGeocode(latitude, longitude) {
  try {
    const url = `${REVERSE_GEOCODE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Reverse geocode failed");
    const data = await res.json();
    return {
      name: data.city || data.locality || data.principalSubdivision || "Current location",
      admin1: data.principalSubdivision,
      country: data.countryName,
      latitude,
      longitude,
    };
  } catch {
    // Non-fatal — the forecast can still be fetched with raw coordinates.
    return { name: "Current location", admin1: "", country: "", latitude, longitude };
  }
}

/** Fetch current conditions, hourly and 7-day forecast for a coordinate pair. */
export async function fetchWeather(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "uv_index",
      "is_day",
    ].join(","),
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "weather_code",
      "visibility",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "weather_code",
      "precipitation_probability_max",
      "uv_index_max",
      "sunrise",
      "sunset",
      "wind_speed_10m_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error("Forecast request failed");
  return res.json();
}