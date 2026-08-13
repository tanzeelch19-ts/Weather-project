import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { describeWeatherCode } from "./utils/weatherCodes";
import SkyBackground from "./components/SkyBackground";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import CurrentWeather from "./components/CurrentWeather";
import HourlyStrip from "./components/HourlyStrip";
import DailyForecast from "./components/DailyForecast";
import InstrumentPanel from "./components/InstrumentPanel";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState.jsx";

export default function App() {
  const [unit, setUnit] = useState("C");
  const {
    location,
    weather,
    status,
    errorMessage,
    locating,
    selectLocation,
    useMyLocation,
    retry,
  } = useWeather();

  const current = weather?.current;
  const group = current
    ? describeWeatherCode(current.weather_code, current.is_day === 1).group
    : "clear";
  const isDay = current ? current.is_day === 1 : true;

  return (
    <div className="min-h-screen flex flex-col">
      <SkyBackground group={group} isDay={isDay} />

      <header className="flex items-center gap-5 flex-wrap px-4 sm:px-8 lg:px-12 py-5">
        <div className="flex items-center gap-2 mr-auto">
          <span
            className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_12px_2px_rgba(94,234,212,0.5)]"
            aria-hidden="true"
          />
          <span className="font-display font-semibold text-[17px] tracking-tight">
            Skyline
          </span>
        </div>
        <SearchBar onSelect={selectLocation} onUseMyLocation={useMyLocation} locating={locating} />
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="flex-1 w-full max-w-[1080px] mx-auto px-4 sm:px-8 lg:px-12 pb-10 pt-2 flex flex-col gap-5">
        {status === "loading" && <LoadingState />}

        {status === "error" && <ErrorState message={errorMessage} onRetry={retry} />}

        {status === "ready" && weather && (
          <>
            <CurrentWeather location={location} current={current} unit={unit} />

            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4">
              <div className="md:col-span-2">
                <HourlyStrip
                  hourly={weather.hourly}
                  unit={unit}
                  currentIsoHour={weather.current.time.slice(0, 13) + ":00"}
                />
              </div>
              <DailyForecast daily={weather.daily} unit={unit} />
              <InstrumentPanel
                current={current}
                daily={weather.daily}
                hourly={weather.hourly}
                windUnit={unit === "F" ? "mph" : "kmh"}
              />
            </div>
          </>
        )}
      </main>

      <footer className="text-center py-4 text-text-tertiary font-mono text-[11.5px]">
        <span>Data from Open-Meteo</span>
      </footer>
    </div>
  );
}