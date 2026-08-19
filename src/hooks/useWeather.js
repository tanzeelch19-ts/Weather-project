import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWeather, reverseGeocode } from "../services/weatherApi";

const DEFAULT_LOCATION = {
  name: "Bahawalpur",
  admin1: "Punjab",
  country: "Pakistan",
  latitude: 29.4,
  longitude: 71.68,
};

const RECENT_KEY = "skyline:last-location";

function loadLastLocation() {
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLastLocation(loc) {
  try {
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(loc));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export function useWeather() {
  const [location, setLocation] = useState(() => loadLastLocation() || DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [locating, setLocating] = useState(false);
  const abortRef = useRef(null);

  const loadForLocation = useCallback(async (loc) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setErrorMessage("");
    try {
      const data = await fetchWeather(loc.latitude, loc.longitude, controller.signal);
      setWeather(data);
      setLocation(loc);
      saveLastLocation(loc);
      setStatus("ready");
    } catch (err) {
      if (err.name === "AbortError") return;
      setStatus("error");
      setErrorMessage("Couldn't reach the forecast service. Check your connection and try again.");
    }
  }, []);

  useEffect(() => {
    loadForLocation(location);
    // Only run once on mount — subsequent loads go through loadForLocation directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectLocation = useCallback(
    (loc) => {
      loadForLocation(loc);
    },
    [loadForLocation]
  );

  const useMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation isn't supported by this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const place = await reverseGeocode(latitude, longitude);
        setLocating(false);
        loadForLocation(place);
      },
      () => {
        setLocating(false);
        setErrorMessage("Location access was denied. Search for a city instead.");
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, [loadForLocation]);

  const retry = useCallback(() => loadForLocation(location), [loadForLocation, location]);

  return {
    location,
    weather,
    status,
    errorMessage,
    locating,
    selectLocation,
    useMyLocation,
    retry,
  };
}