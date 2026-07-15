import { ArrowUpRight } from 'lucide-react';
import { cities } from '../data/cities';

const cityHref = (slug: string) => `/agencja-marketingowa/${slug}`;

const radarBounds = { x: 80, y: 70, width: 840, height: 760 };
const legacyMapBounds = { x: 77, y: 61, width: 604, height: 525 };

const projectPoint = (x: number, y: number) => ({
  x: radarBounds.x + ((x - legacyMapBounds.x) / legacyMapBounds.width) * radarBounds.width,
  y: radarBounds.y + ((y - legacyMapBounds.y) / legacyMapBounds.height) * radarBounds.height,
});

const labelOffsets: Record<string, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  szczecin: { x: 30, y: 5, anchor: 'start' },
  gdansk: { x: 0, y: -28, anchor: 'middle' },
  olsztyn: { x: 28, y: 5, anchor: 'start' },
  bialystok: { x: -28, y: -24, anchor: 'end' },
  warszawa: { x: 28, y: 5, anchor: 'start' },
  lodz: { x: 28, y: 5, anchor: 'start' },
  poznan: { x: -28, y: -24, anchor: 'end' },
  bydgoszcz: { x: 0, y: -30, anchor: 'middle' },
  'zielona-gora': { x: 28, y: 5, anchor: 'start' },
  wroclaw: { x: -28, y: -18, anchor: 'end' },
  opole: { x: -28, y: 30, anchor: 'end' },
  katowice: { x: -28, y: 30, anchor: 'end' },
  krakow: { x: 28, y: 5, anchor: 'start' },
  kielce: { x: 28, y: 5, anchor: 'start' },
  lublin: { x: 28, y: 5, anchor: 'start' },
  rzeszow: { x: 28, y: 5, anchor: 'start' },
};

export default function PolandCoverage() {
  return (
    <section id="obszar-dzialania" className="overflow-hidden border-b border-white/10 bg-black px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[CAŁA POLSKA]</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[1.05] md:text-6xl">
              Lokalny kontekst.
              <br />
              <span className="text-neon">Jeden zespół.</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-relaxed text-white/70">
              Pracujemy zdalnie z firmami w całej Polsce. Nie udajemy sieci lokalnych biur — dajemy firmom
              z każdego miasta dostęp do tego samego zespołu od e-commerce, marketingu, danych i automatyzacji.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-white/35">
              Wybierz miasto, żeby zobaczyć zakres współpracy.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[420px] overflow-hidden border border-white/10 bg-[#080a08] p-3 sm:p-6">
            <div className="pointer-events-none absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
            <svg
              viewBox="0 0 1000 900"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-labelledby="poland-map-title poland-map-description"
              className="relative z-10 h-full min-h-[390px] w-full"
            >
              <title id="poland-map-title">Radar NUSH z szesnastoma miastami obsługiwanymi przez NUSH</title>
              <desc id="poland-map-description">
                Klikalny radar prowadzący do stron NUSH dla szesnastu miast — po jednym dla każdego województwa.
              </desc>

              <defs>
                <linearGradient id="radar-sweep-gradient" gradientUnits="userSpaceOnUse" x1="500" y1="450" x2="800" y2="100">
                  <stop offset="0" stopColor="#00ff00" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#00ff00" stopOpacity="0" />
                </linearGradient>
                <clipPath id="radar-clip">
                  <circle cx="500" cy="450" r="380" />
                </clipPath>
              </defs>

              <g className="radar-frame" aria-hidden="true">
                <circle cx="500" cy="450" r="380" className="fill-neon/[.015] stroke-neon/30" strokeWidth="2" />
                <g className="fill-none stroke-neon/15" strokeWidth="1">
                  <circle cx="500" cy="450" r="95" />
                  <circle cx="500" cy="450" r="190" />
                  <circle cx="500" cy="450" r="285" />
                  <path d="M120 450H880M500 70V830M231 181L769 719M231 719L769 181" />
                </g>
                <g clipPath="url(#radar-clip)">
                  <path d="M500 450L500 70A380 380 0 0 1 768 181Z" fill="url(#radar-sweep-gradient)" className="radar-sweep" />
                  <line x1="500" y1="450" x2="500" y2="70" className="stroke-neon/80 radar-sweep-line" strokeWidth="2" />
                </g>
                <circle cx="500" cy="450" r="5" className="fill-neon radar-core" />
                <text x="500" y="424" textAnchor="middle" className="fill-neon/55 font-mono text-[13px] uppercase tracking-[.24em]">SCAN ACTIVE</text>
                <text x="500" y="482" textAnchor="middle" className="fill-white/25 font-mono text-[11px] uppercase tracking-[.18em]">NUSH / SIGNAL GRID</text>
              </g>

              {cities.map((city, index) => {
                const point = projectPoint(city.map.x, city.map.y);
                const offset = labelOffsets[city.slug] ?? { x: 24, y: 5, anchor: 'start' as const };
                const label = { x: point.x + offset.x, y: point.y + offset.y, anchor: offset.anchor };

                return (
                  <a key={city.slug} href={cityHref(city.slug)} aria-label={`Agencja marketingowa dla firm z ${city.genitive}`}>
                    <g className="group">
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="22"
                        className="radar-blip-ring fill-neon/[.06] stroke-neon/45"
                        strokeWidth="2"
                        style={{ animationDelay: `${(index % 5) * 0.28}s` }}
                      />
                      <circle cx={point.x} cy={point.y} r="7" className="radar-blip-core fill-neon" />
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor={label.anchor}
                        className="fill-white/75 font-mono text-[18px] font-bold uppercase tracking-[.08em] transition-colors group-hover:fill-neon"
                      >
                        {city.name}
                      </text>
                    </g>
                  </a>
                );
              })}
            </svg>

            <div className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neon/45">
              NUSH / PL / 16 REGIONS
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/20">
              NUSH / AREA SERVED / PL
            </div>
          </div>

          <div className="grid content-start sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {cities.map((city, index) => (
              <a
                key={city.slug}
                href={cityHref(city.slug)}
                className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition-colors hover:border-neon/60 sm:odd:pr-5 sm:even:border-l sm:even:pl-5 lg:odd:pr-0 lg:even:border-l-0 lg:even:pl-0 xl:odd:pr-5 xl:even:border-l xl:even:pl-5"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-neon/60">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-black uppercase tracking-wide">{city.name}</span>
                </span>
                <ArrowUpRight size={15} className="text-white/25 transition-colors group-hover:text-neon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
