import { motion, useReducedMotion } from 'motion/react';

const nodes = [{ label: 'PRODUCTS', x: 12, y: 22 }, { label: 'DATA', x: 84, y: 22 }, { label: 'MARKETING', x: 8, y: 78 }, { label: 'SALES', x: 88, y: 78 }, { label: 'ANALYTICS', x: 50, y: 8 }, { label: 'AUTOMATION', x: 50, y: 92 }];
export default function SystemDiagram() {
  const reduced = useReducedMotion();
  return <div className="relative min-h-[360px] border border-white/10 bg-black/30 p-4 overflow-hidden">
    <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
    <svg viewBox="0 0 100 100" className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]" aria-hidden="true" preserveAspectRatio="none">
      {nodes.map((node) => <motion.line key={node.label} x1={node.x} y1={node.y} x2="50" y2="50" stroke="#00ff00" strokeOpacity=".35" strokeWidth=".25" strokeDasharray="2 2" animate={reduced ? undefined : { strokeDashoffset: [0, -20] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />)}
      <motion.circle cx="50" cy="50" r="15" fill="rgba(0,255,0,.06)" stroke="#00ff00" strokeWidth=".3" animate={reduced ? undefined : { r: [15, 17, 15], opacity: [.7, 1, .7] }} transition={{ duration: 3, repeat: Infinity }} />
    </svg>
    {nodes.map((node) => <span key={node.label} className="absolute -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-[#050505] px-2 py-1 font-mono text-[9px] tracking-widest text-white/60" style={{ left: `${node.x}%`, top: `${node.y}%` }}>{node.label}</span>)}
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-neon bg-[#050505] px-4 py-3 font-mono text-xs tracking-widest text-neon shadow-[0_0_24px_rgba(0,255,0,.15)]">NUSH SYSTEM</span>
  </div>;
}
