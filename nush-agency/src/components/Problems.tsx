import { motion } from 'motion/react';
import { BarChart3, Users, Activity } from 'lucide-react';

const problems = [
  {
    icon: Activity,
    title: "Kółka się kręcą, a biznes stoi",
    desc: "Agencje chwalą się zasięgami i lajkami, a Ty sprawdzasz stan konta. Pora na metryki, które oznaczają gotówkę, a nie łechtanie ego."
  },
  {
    icon: Users,
    title: "Armia handlowców zamiast systemu",
    desc: "Opierasz sprzedaż na nastrojach i motywacji ludzi, zamiast na przewidywalnych procesach. Ludzie śpią, zautomatyzowane skrypty nie."
  },
  {
    icon: BarChart3,
    title: "Decyzje na czuja, nie na danych",
    desc: "Przepalasz budżet na kampanie, których ROI jest niemożliwe do zmierzenia. U nas każda wydana złotówka ma dokładnie przypisany cel."
  }
];

export default function Problems() {
  return (
    <section id="problemy" className="py-20 px-6 md:px-10 bg-[#0a0a0a] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-4">[01] BRUTALNA PRAWDA</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {problems.map((prob, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(0, 255, 0, 0.55)' }}
              className="p-6 glass rounded-none"
            >
              <prob.icon className="text-neon mb-6" size={22} aria-hidden="true" />
              <div className="font-bold text-lg uppercase mb-3 text-white">{prob.title}</div>
              <p className="text-sm text-white/50 leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
