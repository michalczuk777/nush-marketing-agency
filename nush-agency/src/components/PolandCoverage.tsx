import { ArrowUpRight } from 'lucide-react';
import polandOutlineRaw from '../../../Refined-Geometric-Outline-of-Poland.svg?raw';
import { cities } from '../data/cities';

const cityHref = (slug: string) => `/agencja-marketingowa/${slug}`;

const outlinePath = [...polandOutlineRaw.matchAll(/<path d="([\s\S]*?)"\/>/g)]
  .at(-1)?.[1]
  .replace(/\s+/g, ' ')
  .trim();

const projectPoint = (x: number, y: number) => ({
  x: 430 + x * 1.65,
  y: 350 + y * 1.8,
});

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
              viewBox="0 0 2000 2000"
              role="img"
              aria-labelledby="poland-map-title poland-map-description"
              className="relative z-10 h-full min-h-[390px] w-full"
            >
              <title id="poland-map-title">Mapa Polski ze stolicami województw obsługiwanymi przez NUSH</title>
              <desc id="poland-map-description">
                Klikalna mapa Polski prowadząca do stron NUSH dla szesnastu miast — po jednym dla każdego województwa.
              </desc>

              {outlinePath ? (
                <g transform="translate(0 2000) scale(0.1 -0.1)">
                  <path
                    d={outlinePath}
                    fill="rgba(0,255,0,0.025)"
                    stroke="rgba(255,255,255,0.46)"
                    strokeWidth="18"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ) : null}

              {cities.map((city) => {
                const point = projectPoint(city.map.x, city.map.y);
                const label = projectPoint(city.map.labelX, city.map.labelY);

                return (
                  <a key={city.slug} href={cityHref(city.slug)} aria-label={`Agencja marketingowa dla firm z ${city.genitive}`}>
                    <g className="group">
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="28"
                        fill="rgba(0,255,0,0.08)"
                        stroke="rgba(0,255,0,0.26)"
                        strokeWidth="2"
                        className="transition-all duration-200 group-hover:fill-neon/20 group-hover:stroke-neon"
                      />
                      <circle cx={point.x} cy={point.y} r="9" fill="#00FF00" />
                      <text
                        x={label.x}
                        y={label.y}
                        textAnchor={city.map.anchor}
                        className="fill-white/75 font-mono text-[25px] font-bold uppercase tracking-wide transition-colors group-hover:fill-neon"
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
