import { FormEvent, useState } from 'react';

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    if ((form.elements.namedItem('website') as HTMLInputElement).value) return;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const url = (form.elements.namedItem('site') as HTMLInputElement).value;

    setLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, url: url }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSent(true);
      } else {
        setError('Wystąpił błąd po stronie serwera.');
      }
    } catch (err) {
      setError('Wystąpił błąd sieci. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 px-6 md:px-10 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-14">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-5">[08] BEZPŁATNA DIAGNOZA</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] max-w-4xl break-words lg:pr-12">Znajdźmy problem, który kosztuje Cię najwięcej</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60">Krótka rozmowa i konkretny punkt startu. Bez prezentacji sprzedażowej, bez zobowiązań.</p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>+ spojrzenie na dane i proces</li>
            <li>+ wskazanie największego wąskiego gardła</li>
            <li>+ propozycja pierwszego kroku</li>
          </ul>
        </div>
        <div className="border border-white/10 p-6 md:p-8">
          {sent ? (
            <div className="py-12">
              <p className="font-mono text-neon">MAMY TO</p>
              <h3 className="mt-4 text-3xl font-black uppercase">DIAGNOZA ZLECONA</h3>
              <p className="mt-4 text-white/60">Twój adres WWW został przyjęty do systemu. Oczekuj na e-mail zwrotny.</p>
            </div>
          ) : (
            <form id="lead-form" className="flex flex-col gap-4" onSubmit={submit} noValidate>
              <input id="name-input" name="name" type="text" placeholder="Imię i nazwisko" required aria-label="Imię i nazwisko" className="field" />
              <input id="email-input" name="email" type="email" placeholder="E-mail" required aria-label="E-mail" className="field" />
              <input id="url-input" name="site" type="url" placeholder="Strona WWW" required aria-label="Strona WWW" className="field" />
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button disabled={loading} id="submit-btn" type="submit" className="mt-2 bg-[#00ff00] px-6 py-4 font-black uppercase text-black hover:bg-white disabled:opacity-50 disabled:bg-[#00aa00] transition-colors">
                {loading ? 'ANALIZOWANIE...' : 'UMÓW BEZPŁATNĄ DIAGNOZĘ'}
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">Zostaw adres WWW. W ciągu 24h zrobimy bezpłatny, zewnętrzny audyt technologiczny Twojej strony i wrócimy do Ciebie na maila z jednym, kluczowym wnioskiem o Twoim wąskim gardle. Bez korpo-bełkotu.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
