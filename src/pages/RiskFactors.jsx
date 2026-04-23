import React, { useState, useMemo } from 'react';
import { AlertCircle, Clock, Briefcase, Plane } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import TableauViz from '../components/TableauViz';
import FilterBar from '../components/FilterBar';
import ConclusionsDrawer from '../components/ConclusionsDrawer';
import { generateInsights } from '../utils/insightEngine';
import { DATASET } from '../utils/dataStore';

export default function RiskFactors() {
  const [filters, setFilters] = useState({});

  // Dynamic insights
  const insights = useMemo(() => generateInsights('risk', filters), [filters]);

  // Dynamic risk cards based on overtime filter
  const riskCards = useMemo(() => {
    const ot = filters.OverTime;
    return [
      {
        icon: Clock,
        color: 'rose',
        label: 'Overtime Risk',
        value: ot === 'No' ? `${DATASET.byOvertime.No.rate}%` : `${DATASET.byOvertime.Yes.rate}%`,
        detail: ot === 'No'
          ? `Non-overtime workers leave at ${DATASET.byOvertime.No.rate}% — well below average.`
          : `Overtime employees leave at ${DATASET.byOvertime.Yes.rate}% — ${(DATASET.byOvertime.Yes.rate / DATASET.byOvertime.No.rate).toFixed(1)}× higher risk.`,
      },
      {
        icon: Briefcase,
        color: 'amber',
        label: 'Work-Life Balance',
        value: `${DATASET.byWorkLifeBalance[1].rate}%`,
        detail: `Poor WLB (Level 1) yields ${DATASET.byWorkLifeBalance[1].rate}% attrition vs ${DATASET.byWorkLifeBalance[4].rate}% for excellent.`,
      },
      {
        icon: Plane,
        color: 'teal',
        label: 'Business Travel',
        value: `${DATASET.byBusinessTravel['Travel_Frequently'].rate}%`,
        detail: `Frequent travellers leave at ${DATASET.byBusinessTravel['Travel_Frequently'].rate}% vs ${DATASET.byBusinessTravel['Non-Travel'].rate}% non-travellers.`,
      },
    ];
  }, [filters]);

  const colorMap = {
    rose: { icon: 'text-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.3)]', accent: 'text-rose-500' },
    amber: { icon: 'text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]', accent: 'text-amber-500' },
    teal: { icon: 'text-teal-400 bg-teal-400/10 shadow-[0_0_15px_rgba(45,212,191,0.3)]', accent: 'text-teal-400' },
  };

  return (
    <>
      <ConclusionsDrawer insights={insights} />
      <DashboardLayout
        icon={AlertCircle}
        title="Risk Factor Deep Dive"
        subtitle="Explore the key drivers of attrition: overtime, satisfaction, travel, and work-life balance. Insights change with your filter selections."
        badge="Risk Analysis"
      >
        {/* Dynamic Risk Indicator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {riskCards.map((card, i) => {
            const Icon = card.icon;
            const colors = colorMap[card.color];
            return (
              <div key={i} className="bg-card backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex gap-5 items-start shadow-2xl hover:border-accent/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                <div className={`p-3 rounded-xl flex-shrink-0 ${colors.icon}`}>
                  <Icon size={20} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{card.label}</p>
                    <span className={`text-sm font-black tracking-tight ${colors.accent}`}>{card.value}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">{card.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Tableau Dashboard */}
        <div className="w-full bg-card/50 backdrop-blur-sm border border-white/5 p-3 sm:p-4 rounded-2xl shadow-xl hover:border-white/10 transition-colors">
          <TableauViz
            url="https://public.tableau.com/views/projectdemographics/Dashboard4"
            filters={filters}
            height="600px"
          />
        </div>
      </DashboardLayout>
    </>
  );
}
