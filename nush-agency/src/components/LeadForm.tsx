import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasWebsite, setHasWebsite] = useState(true);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const isContactForm = !hasWebsite;
    const url = isContactForm ? '' : (form.elements.namedItem('site') as HTMLInputElement).value;
    const message = isContactForm ? (form.elements.namedItem('message') as HTMLTextAreaElement).value : '';
    const company_fax = (form.elements.namedItem('company_fax') as HTMLInputElement).value;
    
    // Bot check locally as well (optional, but we want the backend to log it)
    // We send it to backend so backend logs the spam attempt.
    
    if (!isContactForm && !url.startsWith('http://') && !url.startsWith('https://')) {
        setError('Adres strony musi zaczynać się od http:// lub https://');
        return;
    }

    setLoading(true);

    try {
      const endpoint = isContactForm ? '/api/contact' : '/api/analyze';
      const body = isContactForm 
        ? JSON.stringify({ name, email, message, company_fax })
        : JSON.stringify({ name, email, url, company_fax });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSent(true);
      } else {
        setError(result.message || 'Wystąpił błąd po stronie serwera.');
      }
    } catch (err) {
      setError('Wystąpił błąd sieci. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="py-12 md:py-24 px-6 md:px-10 bg-black border-b border-white/10">
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center text-center bg-[#050505] border border-neon/30 p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon/5 blur-3xl rounded-full" />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="w-20 h-20 bg-neon/10 text-neon rounded-full flex items-center justify-center mb-6 border border-neon/20 shadow-[0_0_30px_rgba(0,255,0,0.15)]"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-neon tracking-widest text-sm mb-2 font-bold"
              >
                [ SUKCES ]
              </motion.p>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-black uppercase text-white mb-4"
              >
                DIAGNOZA ZLECONA
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/60 max-w-sm mx-auto leading-relaxed"
              >
                {!hasWebsite 
                  ? 'Twoja wiadomość została pomyślnie dostarczona. Nasz zespół skontaktuje się z Tobą wkrótce.'
                  : 'Adres WWW został pomyślnie przyjęty przez system. Nasz zespół już analizuje Twoje zgłoszenie – audyt wkrótce trafi na Twoją skrzynkę.'
                }
              </motion.p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              id="lead-form" 
              className="flex flex-col gap-4" 
              onSubmit={submit} 
              noValidate
            >
              <motion.input initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="name-input" name="name" type="text" placeholder="Imię i nazwisko" required aria-label="Imię i nazwisko" className="field" />
              <motion.input initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="email-input" name="email" type="email" placeholder="E-mail" required aria-label="E-mail" className="field" />
              
              {hasWebsite ? (
                <motion.input initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="url-input" name="site" type="url" placeholder="Strona WWW" required aria-label="Strona WWW" className="field" />
              ) : (
                <motion.textarea initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} id="message-input" name="message" placeholder="W czym możemy Ci pomóc?" required aria-label="Wiadomość" className="field min-h-[120px] resize-y" />
              )}
              
              <div className="flex items-center gap-2 mt-1 mb-2">
                <input 
                  type="checkbox" 
                  id="no-website" 
                  checked={!hasWebsite} 
                  onChange={() => setHasWebsite(!hasWebsite)} 
                  className="w-4 h-4 accent-neon bg-black border-white/20"
                />
                <label htmlFor="no-website" className="text-sm text-white/70 cursor-pointer select-none">Nie posiadam jeszcze strony WWW</label>
              </div>
              <input name="company_fax" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              
              {error && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-red-400 font-medium">
                  {error}
                </motion.p>
              )}
              
              <motion.button 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                disabled={loading} 
                id="submit-btn" 
                type="submit" 
                className="mt-2 bg-[#00ff00] px-6 py-5 font-black uppercase text-black hover:bg-white disabled:opacity-50 disabled:bg-[#00aa00] transition-colors relative overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {hasWebsite ? 'ANALIZOWANIE...' : 'WYSYŁANIE...'}
                  </span>
                ) : (hasWebsite ? 'UMÓW BEZPŁATNĄ DIAGNOZĘ' : 'WYŚLIJ WIADOMOŚĆ')}
              </motion.button>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
                {hasWebsite 
                  ? 'Zostaw adres WWW. W ciągu 24h zrobimy bezpłatny, zewnętrzny audyt technologiczny Twojej strony i wrócimy do Ciebie na maila z jednym, kluczowym wnioskiem o Twoim wąskim gardle. Bez korpo-bełkotu.'
                  : 'Opisz nam krótko swój problem lub pomysł, a my wrócimy do Ciebie z konkretną propozycją rozwiązania. Szybko i do rzeczy.'
                }
              </motion.p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
