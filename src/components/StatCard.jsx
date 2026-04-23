import React, { useEffect, useState } from 'react';
import GlowCard from './GlowCard';

export default function StatCard({ label, value, numericValue, color = 'blue', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const end = numericValue;
    if (!end) return;

    const incrementTime = 20;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  const displayValue = numericValue 
    ? (Number.isInteger(numericValue) ? Math.floor(count).toLocaleString() : count.toFixed(1))
    : value;

  const colorStyles = {
    blue: 'text-accent',
    red: 'text-rose-500',
    amber: 'text-amber-500',
    green: 'text-teal-400',
  };

  return (
    <GlowCard className="p-6 flex flex-col gap-2">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 truncate">
        {label}
      </div>
      <div className={`font-black text-3xl tracking-tighter ${colorStyles[color]}`}>
        {numericValue !== undefined ? displayValue : value}
        <span className="text-sm font-bold ml-0.5 opacity-60">{suffix}</span>
      </div>
      <div className="w-8 h-1 rounded-full bg-white/5 group-hover:bg-accent/40 transition-colors" />
    </GlowCard>
  );
}
