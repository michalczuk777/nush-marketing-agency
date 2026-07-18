import type { FormEvent } from 'react';
import { useState } from 'react';
import { trackEvent } from '../analytics';

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    trackEvent('geo_contact_submit', { location: window.location.pathname });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const site = String(formData.get('site') || '');
    const message = String(formData.get('message') || '');
    const subject = `Zapytanie z nush.pl: ${name}`;
    const body = [
      `Imię i nazwisko: ${name}`,
      `E-mail: ${email}`,
      `Strona WWW: ${site}`,
      message ? `\nWiadomość:\n${message}` : '',
    ].filter(Boolean).join('\n');

    try {
      window.location.href = `mailto:kontakt@nush.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Nie udało się otworzyć programu pocztowego.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="border-b border-white/10 bg-black px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-neon">[09] BEZPŁATNA DIAGNOZA</p>
          <h2 className="max-w-4xl break-words text-4xl font-black uppercase leading-[1.1] md:text-6xl lg:pr-12">Znajdźmy problem, który kosztuje Cię najwięcej</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60">Krótka rozmowa i konkretny punkt startu. Bez prezentacji sprzedażowej, bez zobowiązań.</p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>+ spojrzenie na dane i proces</li>
            <li>+ wskazanie największego wąskiego gardła</li>
            <li>+ propozycja pierwszego kroku</li>
          </ul>
        </div>

        <div className="border border-white/10 p-6 md:p-8">
          {sent ? (
            <div className="py-12" role="status">
              <p className="font-mono text-neon">MAMY TO</p>
              <h3 className="mt-4 text-3xl font-black uppercase">Poczta gotowa</h3>
              <p className="mt-4 text-white/60">Otworzyliśmy wiadomość w Twoim programie pocztowym. Wyślij ją, żebyśmy mogli ustalić następny krok.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={submit}>
              <input name="name" type="text" placeholder="Imię i nazwisko" required aria-label="Imię i nazwisko" maxLength={120} className="field" />
              <input name="email" type="email" placeholder="E-mail" required aria-label="E-mail" maxLength={254} className="field" />
              <input name="site" type="text" placeholder="Strona WWW lub nazwa firmy" required aria-label="Strona WWW lub nazwa firmy" maxLength={2048} className="field" />
              <textarea name="message" placeholder="W czym możemy pomóc? (opcjonalnie)" aria-label="Wiadomość" maxLength={5000} rows={4} className="field resize-y" />
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
              <button disabled={loading} type="submit" className="mt-2 bg-[#00ff00] px-6 py-4 font-black uppercase text-black transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-50">
                {loading ? 'WYSYŁAMY...' : 'UMÓW BEZPŁATNĄ DIAGNOZĘ'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
