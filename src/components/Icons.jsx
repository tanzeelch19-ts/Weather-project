// Minimal stroke-based icon set. Kept in one file so the visual weight
// (stroke width, cap style) stays consistent across every icon in the app.

const base = {
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Svg({ children, size = 24, className, style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      {...base}
      stroke="currentColor"
    >
      {children}
    </svg>
  );
}

export function SunIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </Svg>
  );
}

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </Svg>
  );
}

export function CloudIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.6A3.8 3.8 0 0 0 7 18Z" />
    </Svg>
  );
}

export function CloudSunIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="7.5" cy="8" r="2.8" />
      <path d="M7.5 3.3v1.4M7.5 3.3v1.4M3.6 5.4l1 1M12.2 5l-1 1" />
      <path d="M8.5 18h8.7a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.3 1.6A3.4 3.4 0 0 0 8.5 18Z" />
    </Svg>
  );
}

export function CloudMoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9.8 4.3a4.6 4.6 0 1 0 4.7 6.1" />
      <path d="M8.5 18h8.7a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.3 1.6A3.4 3.4 0 0 0 8.5 18Z" />
    </Svg>
  );
}

export function CloudRainIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 15.5h10.7a3.8 3.8 0 0 0 .3-7.6 5.3 5.3 0 0 0-9.9 1.7A3.6 3.6 0 0 0 6.5 15.5Z" />
      <path d="M8.5 18.5 7.5 21M12.5 18.5l-1 2.5M16.5 18.5l-1 2.5" />
    </Svg>
  );
}

export function CloudDrizzleIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 14.5h10.7a3.8 3.8 0 0 0 .3-7.6 5.3 5.3 0 0 0-9.9 1.7A3.6 3.6 0 0 0 6.5 14.5Z" />
      <path d="M9 17.5v2M12.5 17.5v2M16 17.5v2" />
    </Svg>
  );
}

export function CloudSnowIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 14h10.7a3.8 3.8 0 0 0 .3-7.6 5.3 5.3 0 0 0-9.9 1.7A3.6 3.6 0 0 0 6.5 14Z" />
      <path d="M9 17.5h.01M12.5 18.5h.01M16 17.5h.01M9 20h.01M12.5 21h.01M16 20h.01" strokeWidth="2.2" />
    </Svg>
  );
}

export function StormIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 13.5h10.7a3.8 3.8 0 0 0 .3-7.6 5.3 5.3 0 0 0-9.9 1.7A3.6 3.6 0 0 0 6.5 13.5Z" />
      <path d="M13 13l-2.6 4.2h2.4L10.5 21" />
    </Svg>
  );
}

export function FogIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.8 12h10.4a3.6 3.6 0 0 0 .3-7.2 5 5 0 0 0-9.3 1.6A3.4 3.4 0 0 0 6.8 12Z" />
      <path d="M5 15.5h14M6.5 18.5h11M8 21.5h8" />
    </Svg>
  );
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="M20 20l-4.3-4.3" />
    </Svg>
  );
}

export function LocateIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="7.5" strokeWidth="1.2" opacity="0.6" />
    </Svg>
  );
}

export function WindIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.3-3.5M3 12.5h15a2.5 2.5 0 1 1-2.3 3.5M3 17h8.5a2 2 0 1 1-1.8 2.8" />
    </Svg>
  );
}

export function DropletIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.3S6 10 6 14.3a6 6 0 0 0 12 0C18 10 12 3.3 12 3.3Z" />
    </Svg>
  );
}

export function GaugeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 15.5a8 8 0 1 1 16 0" />
      <path d="M12 15.5 15 10" />
      <path d="M4 15.5h16" strokeWidth="1.2" opacity="0.5" />
    </Svg>
  );
}

export function EyeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  );
}

export function SunriseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 17h15M12 9.5v-6M8.5 6.5 12 3.5l3.5 3M7 13.2a5 5 0 0 1 10 0" />
    </Svg>
  );
}

export function SunsetIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.5 17h15M12 3.5v6M8.5 6.5 12 9.5l3.5-3M7 13.2a5 5 0 0 1 10 0" />
    </Svg>
  );
}

export function UvIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="10.5" r="4.2" />
      <path d="M12 3v2M4.5 10.5h2M17.5 10.5h2M6.3 5.3l1.4 1.4M17.7 5.3l-1.4 1.4" />
      <path d="M8 18.5h8" strokeWidth="2" />
    </Svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 8.5 12 15.5 19 8.5" />
    </Svg>
  );
}

export function PinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.3" r="2.3" />
    </Svg>
  );
}

export function AlertIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4M12 17h.01" strokeWidth="2.2" />
    </Svg>
  );
}

export function WeatherIcon({ name, ...rest }) {
  const map = {
    sun: SunIcon,
    moon: MoonIcon,
    cloud: CloudIcon,
    "cloud-sun": CloudSunIcon,
    "cloud-moon": CloudMoonIcon,
    "cloud-rain": CloudRainIcon,
    "cloud-drizzle": CloudDrizzleIcon,
    "cloud-snow": CloudSnowIcon,
    storm: StormIcon,
    fog: FogIcon,
  };
  const Cmp = map[name] || CloudIcon;
  return <Cmp {...rest} />;
}