import { motion } from 'motion/react';
import { Cpu, Database, Code2 } from 'lucide-react';

const solutions = [
  {
    icon: Cpu,
    title: "Automatyzacja Sprzedaży",
    desc: "Tworzymy bezobsługowe lejki, integrujemy CRM i piszemy skrypty, które same domykają leady. Eliminujemy błąd ludzki i pracę ręczną. Maszyna pracuje 24/7."
  },
  {
    icon: Database,
    title: "Zaawansowana Analityka",
    desc: "Zastępujemy przypuszczenia twardymi danymi. Śledzimy każdą interakcję i ustawiamy precyzyjną atrybucję konwersji. Wiesz dokładnie, co działa."
  },
  {
    icon: Code2,
    title: "Techniczne SEO & API",
    desc: "Dominacja w wyszukiwarkach poprzez optymalizację kodu, perfekcyjną architekturę informacji i niestandardowe integracje API. Zostawiamy konkurencję w tyle."
  }
];

export default function Solutions() {
  return (
    <section id="rozwiazania" className="py-20 px-6 md:px-10 relative bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-4">[02] FILARY NUSH</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 flex-shrink-0 bg-white/10 flex items-center justify-center font-bold font-mono text-sm border border-white/10 text-white">
                {String.fromCharCode(65 + i)}
              </div>
              <div>
                <div className="font-bold uppercase text-base mb-2 text-white">{sol.title}</div>
                <p className="text-sm text-white/50 leading-relaxed">{sol.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
