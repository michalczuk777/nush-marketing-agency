import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const questions = [
  ['Czy pracujecie tylko z e-commerce?', 'Nie. Najlepiej odnajdujemy się w firmach handlowych, dystrybucji, produkcji i B2B, wszędzie tam, gdzie katalog, dane i sprzedaż muszą działać razem.'],
  ['Od czego zaczyna się współpraca?', 'Od diagnozy. Najpierw poznajemy dane, procesy i ograniczenia, a dopiero potem proponujemy zakres prac.'],
  ['Czy wdrażacie rozwiązania w istniejącym stacku?', 'Tak. Zaczynamy od tego, co już działa, i dokładamy tylko te elementy, które realnie poprawiają przepływ pracy lub pomiar.'],
  ['Jak długo trwa pierwsze wdrożenie?', 'Zależy od problemu. Po diagnozie dzielimy pracę na sprinty z jasnym rezultatem i kryteriami odbioru.'],
  ['Czy po wdrożeniu zostajecie z zespołem?', 'Możemy zamknąć projekt na wdrożeniu albo zostać jako stały zespół wzrostu. Model dobieramy do potrzeb firmy.'],
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);
  return <section id="faq" className="border-b border-white/10 bg-[#080808] px-6 py-24 md:px-10"><div className="mx-auto max-w-4xl"><p className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-neon">[07] NAJWAŻNIEJSZE PYTANIA</p>{questions.map(([question, answer], i) => <div key={question} className="border-t border-white/15 last:border-b"><button type="button" aria-expanded={active === i} aria-controls={`faq-${i}`} onClick={() => setActive(active === i ? null : i)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-bold uppercase md:text-lg"><span>{question}</span><ChevronDown className={`shrink-0 text-neon transition-transform ${active === i ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{active === i && <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-3xl pb-6 pr-8 text-base leading-relaxed text-white/60">{answer}</p></motion.div>}</AnimatePresence></div>)}</div></section>;
}
