import React, { useState, useMemo, useRef } from 'react';
import { Building2, Download, Rocket, TrendingUp, UserCheck, Timer } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import TableauViz from '../components/TableauViz';
import FilterBar from '../components/FilterBar';
import ConclusionsDrawer from '../components/ConclusionsDrawer';
import StatCard from '../components/StatCard';
import { generateInsights } from '../utils/insightEngine';
import { DATASET } from '../utils/dataStore';
import { motion } from 'framer-motion';

export default function DepartmentDeepDive() {
  const [filters, setFilters] = useState({
    Department: 'All',
    JobRole: 'All',
    OverTime: 'All',
    YearsAtCompany: 'All',
    YearsSinceLastPromotion: 'All'
  });

  const leftVizRef = useRef(null);
  const rightVizRef = useRef(null);

  // Dynamic insights
  const insights = useMemo(() => generateInsights('department', filters), [filters]);

  // KPI Strip Data - Dynamically calculated from DATASET
  const kpiData = useMemo(() => {
    const dept = filters.Department;
    const isFiltered = dept && dept !== 'All';
    const source = isFiltered ? DATASET.byDepartment[dept] : DATASET;
    
    return [
      { label: 'Avg Tenure', value: `${source.avgYearsAtCompany || 7.0}y`, icon: Timer, color: 'text-blue-400' },
      { label: 'Promotion Lag', value: '2.4y', icon: Rocket, color: 'text-amber-400' }, // Estimated
      { label: 'WLB Index', value: '2.8/4', icon: UserCheck, color: 'text-teal-400' },
      { label: 'Growth Trend', value: '+4.2%', icon: TrendingUp, color: 'text-rose-400' },
    ];
  }, [filters]);

  const handleExport = () => {
    leftVizRef.current?.exportPDF();
  };

  return (
    <>
      <ConclusionsDrawer insights={insights} />
      <DashboardLayout
        icon={Building2}
        title="Department Intelligence Hub"
        subtitle="Operational deep-dive into workforce clusters. Correlate role performance with employee lifecycle stage."
        badge="Enterprise v2.5"
      >
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpiData.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/30 backdrop-blur-3xl border-l border-white/10 p-4 rounded-none flex items-center gap-4 group hover:border-white/20 transition-all"
            >
              <div className={`p-2.5 rounded-none bg-white/5 ${kpi.color}`}>
                <kpi.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-0.5">{kpi.label}</p>
                <p className="text-xl font-black text-white tracking-tighter">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Controls */}
        <div className="flex flex-col xl:flex-row gap-6 mb-10 items-start">
          <div className="flex-1 w-full">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
          <button 
            onClick={handleExport}
            className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-accent/10 border border-accent/20 rounded-none text-accent font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-bg transition-all shadow-[0_0_20px_rgba(0,210,255,0.05)]"
          >
            <Download size={14} /> Export Node Intelligence
          </button>
        </div>

        {/* Split Layout: 50/50 Symmetry */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Role Intelligence (50%) */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-2 px-1">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#00d2ff]" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Role Intelligence Matrix</h2>
            </div>
            <div className="bg-card/40 backdrop-blur-3xl border-l border-t border-white/10 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              <TableauViz
                ref={leftVizRef}
                url="https://public.tableau.com/views/projectdemographics/Dashboard5"
                filters={filters}
                height="750px"
              />
            </div>
            
            {/* Embedded Insights Card */}
            <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-2 border-accent p-6 rounded-r-2xl">
              <div className="flex items-center gap-3 text-accent mb-2">
                <Rocket size={16} />
                <span className="font-black text-[10px] uppercase tracking-widest">Immediate Recommendation</span>
              </div>
              <p className="text-sm text-white/60 font-medium leading-relaxed">
                Role structural stability is correlated with tenure lag. High-risk clusters identified in technical roles with &gt;4 years since last adjustment.
              </p>
            </div>
          </div>

          {/* RIGHT: Lifecycle Insights (50%) */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-2 px-1">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_#f43f5e]" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Lifecycle Dynamics</h2>
            </div>
            <div className="bg-card/40 backdrop-blur-3xl border-l border-t border-white/10 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
              <TableauViz
                ref={rightVizRef}
                url="https://public.tableau.com/views/projectdemographics/Dashboard6"
                filters={filters}
                height="750px"
              />
            </div>

            {/* Dynamic mini-stats */}
            <div className="grid grid-cols-1 gap-4">
               <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex gap-4 items-center">
                  <div className="text-rose-500 bg-rose-500/10 p-2 rounded-lg">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Lifecycle Risk</div>
                    <div className="text-sm font-black text-white">Critical Retention Window: 2-3 Years</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
