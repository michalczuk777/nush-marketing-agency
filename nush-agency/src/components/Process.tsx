import { motion } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "AUDYT",
  },
  {
    num: "02",
    title: "ARCHITEKTURA",
  },
  {
    num: "03",
    title: "SKALA",
  }
];

export default function Process() {
  return (
    <section id="proces" className="py-20 px-6 md:px-10 bg-neon/5 border-b border-white/10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-12">[03] JAK DZIAŁAMY</h2>

        <div className="flex flex-col md:flex-row items-center justify-between text-xs md:text-sm font-mono uppercase font-bold text-white/40 gap-8 md:gap-0">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg">01</span>
            <span>AUDYT</span>
          </div>
          
          <div className="hidden md:block h-[1px] flex-1 bg-white/10 mx-4 md:mx-8"></div>
          <div className="md:hidden w-[1px] h-8 bg-white/10"></div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg">02</span>
            <span>ARCHITEKTURA</span>
          </div>
          
          <div className="hidden md:block h-[1px] flex-1 bg-white/10 mx-4 md:mx-8"></div>
          <div className="md:hidden w-[1px] h-8 bg-white/10"></div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-lg">03</span>
            <span>SKALA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
