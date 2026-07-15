import { ArrowUpRight } from 'lucide-react';
import { cities } from '../data/cities';

const cityHref = (slug: string) => `/agencja-marketingowa/${slug}`;

export default function PolandCoverage() {
  return (
    <section id="obszar-dzialania" className="border-b border-white/10 bg-black px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[CAŁA POLSKA]</p>
          <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] md:text-6xl">
            Lokalny kontekst.
            <br />
            <span className="text-neon">Jeden zespół.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            Pracujemy zdalnie z firmami w całej Polsce. Dajemy firmom z każdego miasta dostęp do tego samego zespołu od
            e-commerce, marketingu, danych i automatyzacji.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-white/35">Wybierz miasto, żeby zobaczyć zakres współpracy.</p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl border-y border-white/10">
          <div className="grid sm:grid-cols-2">
            {cities.map((city, index) => (
              <a
                key={city.slug}
                href={cityHref(city.slug)}
                className="group flex min-h-[88px] items-center justify-between gap-4 border-b border-white/10 px-5 py-5 transition-colors hover:border-neon/60 hover:bg-white/[.025] sm:px-7 sm:odd:border-r"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="font-mono text-xs text-neon/60">{String(index + 1).padStart(2, '0')}</span>
                  <span className="whitespace-nowrap text-sm font-black uppercase tracking-wide text-white sm:text-base">{city.name}</span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-white/25 transition-colors group-hover:text-neon" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[.2em] text-white/25">16 miast / jeden system wzrostu</p>
      </div>
    </section>
  );
}
