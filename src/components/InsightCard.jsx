import React from 'react';
import GlowCard from './GlowCard';

const priorityColors = {
  High: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
  Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  Low: 'border-accent/30 bg-accent/10 text-accent',
};

export default function InsightCard({ icon, title, subtitle, body, priority }) {
  return (
    <GlowCard className="p-8 h-full flex flex-col group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-card border border-white/5 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,210,255,0.1)]">
          {icon && React.cloneElement(icon, { size: 22 })}
        </div>
        <div className={`text-[10px] font-black px-3 py-1.5 rounded-full border uppercase tracking-[0.2em] shadow-sm ${priorityColors[priority]}`}>
          {priority} Priority
        </div>
      </div>
      
      <div className="relative z-10 flex-grow">
        <h3 className="text-xl font-black text-white tracking-tighter mb-2">{title}</h3>
        <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-4">{subtitle}</p>
        <p className="text-sm text-white/50 leading-relaxed font-medium">{body}</p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 group/link cursor-pointer relative z-10">
        <span className="text-[10px] font-black text-white/30 group-hover/link:text-accent transition-colors uppercase tracking-[0.2em]">Audit department data</span>
        <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs text-white/40 group-hover/link:bg-accent group-hover/link:text-bg transition-all duration-300">→</div>
      </div>
    </GlowCard>
  );
}
