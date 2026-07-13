export default function LeadForm() {
  return (
    <section id="audyt" className="py-24 px-6 md:px-10 bg-[#000] relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-4">[05] SZYBKA ANALIZA</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">Odkryjemy błąd, <br/>który kosztuje Cię <br/><span className="text-neon">najwięcej</span></h3>
            <p className="text-white/70 max-w-lg mb-8 leading-relaxed">Zostaw kontakt. Nasi inżynierowie prześwietlą Twoją stronę i procesy. Otrzymasz konkretny raport, bez lania wody i sprzedażowego bullshitu</p>
          </div>

          <div className="w-full lg:w-[500px]">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Imię"
                required
                className="bg-white/5 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-neon font-sans text-white transition-colors rounded-none w-full"
              />
              <input 
                type="email" 
                placeholder="E-mail"
                required
                className="bg-white/5 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-neon font-sans text-white transition-colors rounded-none w-full"
              />
              <input 
                type="url" 
                placeholder="WWW"
                required
                className="bg-white/5 border border-white/10 px-4 py-4 text-sm focus:outline-none focus:border-neon font-sans text-white transition-colors rounded-none w-full"
              />
              <button 
                type="submit"
                className="bg-white text-black px-6 py-4 font-black uppercase tracking-tighter hover:bg-neon transition-colors rounded-none mt-2 w-full text-center"
              >
                Wyślij
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
