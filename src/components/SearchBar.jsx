import { useEffect, useRef, useState } from "react";
import { geocodeCity } from "../services/weatherApi";
import { useDebounce } from "../hooks/useDebounce";
import { SearchIcon, LocateIcon, PinIcon } from "../components/icons.jsx";

export default function SearchBar({ onSelect, onUseMyLocation, locating }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const debounced = useDebounce(query, 350);
  const containerRef = useRef(null);

  useEffect(() => {
    let active = true;
    if (debounced.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    geocodeCity(debounced)
      .then((res) => {
        if (active) {
          setResults(res);
          setOpen(true);
        }
      })
      .catch(() => active && setResults([]))
      .finally(() => active && setSearching(false));
    return () => {
      active = false;
    };
  }, [debounced]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(place) {
    onSelect(place);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div className="relative w-full max-w-[380px]" ref={containerRef}>
      <div className="flex items-center gap-2.5 bg-panel border border-panel-border rounded-md2 px-3 py-2.5 backdrop-blur-2xl transition-colors focus-within:border-accent-blue">
        <SearchIcon size={18} className="text-text-tertiary flex-shrink-0" />
        <input
          type="text"
          inputMode="search"
          placeholder="Search city or place…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          aria-label="Search for a city"
          className="flex-1 bg-transparent border-none outline-none text-text-primary font-body text-[14.5px] placeholder:text-text-tertiary"
        />
        <button
          type="button"
          onClick={onUseMyLocation}
          title="Use my location"
          aria-label="Use my current location"
          disabled={locating}
          className="bg-transparent border-none text-accent-cyan cursor-pointer flex items-center p-1 rounded-md hover:bg-accent-cyan/10 disabled:opacity-50 disabled:cursor-default flex-shrink-0"
        >
          <LocateIcon size={18} className={locating ? "animate-spin2" : ""} />
        </button>
      </div>

      {open && (searching || results.length > 0) && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+8px)] left-0 right-0 bg-panel-solid border border-panel-border-strong rounded-md2 overflow-hidden shadow-panel z-20 list-none max-h-[280px] overflow-y-auto"
        >
          {searching && results.length === 0 && (
            <li className="px-3.5 py-3 text-text-tertiary text-[13.5px]">Searching…</li>
          )}
          {results.map((place) => (
            <li key={place.id}>
              <button
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full flex items-baseline gap-2 px-3.5 py-2.5 bg-transparent border-none text-text-primary cursor-pointer text-left font-body hover:bg-accent-cyan/[0.08]"
              >
                <PinIcon size={15} />
                <span className="text-[14px] font-medium flex-shrink-0">{place.name}</span>
                <span className="text-[12px] text-text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
                  {[place.admin1, place.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}