import React, { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import TableauViz from '../components/TableauViz';
import FilterBar from '../components/FilterBar';
import ConclusionsDrawer from '../components/ConclusionsDrawer';
import { generateInsights } from '../utils/insightEngine';
import { DATASET } from '../utils/dataStore';

export default function Demographics() {
  const [filters, setFilters] = useState({});

  // Dynamic insights
  const insights = useMemo(() => generateInsights('demographics', filters), [filters]);

  // Age band data for the top cards
  const ageBands = useMemo(() => {
    const bands = Object.entries(DATASET.byAgeBand);
    return bands.sort((a, b) => b[1].rate - a[1].rate).map(([name, data]) => ({
      name,
      rate: data.rate,
      total: data.total,
      severity: data.rate > 25 ? 'rose' : data.rate > 15 ? 'amber' : 'teal',
    }));
  }, []);

  const severityStyles = {
    rose: 'border-rose-500/20 hover:border-rose-500/50 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]',
    amber: 'border-amber-500/20 hover:border-amber-500/50 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    teal: 'border-teal-400/20 hover:border-teal-400/50 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]',
  };

  return (
    <>
      <ConclusionsDrawer insights={insights} />
      <DashboardLayout
        icon={Users}
        title="Employee Profile Explorer"
        subtitle="Demographics, income, tenure, and career metrics. Insights are dynamically generated from your filter selections."
        badge="Demographics"
      >
        {/* Age Band Risk Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-4">
          {ageBands.map((band) => (
            <div
              key={band.name}
              className={`bg-card backdrop-blur-xl border p-6 rounded-2xl text-center shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group ${severityStyles[band.severity]}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              <p className={`text-[10px] uppercase font-black mb-3 tracking-[0.2em] relative z-10 ${severityStyles[band.severity].split(' ').find(c => c.startsWith('text-'))}`}>
                {band.name}
              </p>
              <p className="text-3xl font-black text-white tracking-tighter relative z-10 flex items-baseline justify-center gap-1">
                {band.rate}<span className="text-[10px] font-black uppercase text-white/30 tracking-widest">%</span>
              </p>
              <div className="mt-3 text-[9px] font-black uppercase tracking-widest text-white/20 relative z-10">{band.total} Nodes</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Tableau Dashboard */}
        <div className="w-full bg-card/50 backdrop-blur-sm border border-white/5 p-3 sm:p-4 rounded-2xl shadow-xl hover:border-white/10 transition-colors">
          <TableauViz
            url="https://public.tableau.com/views/projectdemographics/Dashboard1"
            filters={filters}
            height="600px"
          />
        </div>
      </DashboardLayout>
    </>
  );
}
