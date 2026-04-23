import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import { Lightbulb, Briefcase, Plane, Clock, GraduationCap, Link2, HelpCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import InsightCard from '../components/InsightCard';
import { DATASET } from '../utils/dataStore';

const recommendations = [
  {
    icon: <Clock />,
    title: "Overtime Policy Reform",
    subtitle: "Highest impact lever",
    body: `Overtime employees leave at ${DATASET.byOvertime.Yes.rate}% vs ${DATASET.byOvertime.No.rate}% — a ${(DATASET.byOvertime.Yes.rate / DATASET.byOvertime.No.rate).toFixed(1)}× gap. Cap mandatory overtime, enforce compensatory time-off, and audit high-OT departments immediately.`,
    priority: "High"
  },
  {
    icon: <Briefcase />,
    title: "Sales Rep Compensation",
    subtitle: `${DATASET.byRole['Sales Representative'].rate}% attrition — crisis level`,
    body: `Sales Reps earn avg $${DATASET.byRole['Sales Representative'].avgIncome.toLocaleString()}/mo — far below the company median. A targeted compensation restructure and clear career progression path could cut attrition significantly.`,
    priority: "High"
  },
  {
    icon: <GraduationCap />,
    title: "Early Career Program",
    subtitle: `Under-25s at ${DATASET.byAgeBand['Under 25'].rate}% risk`,
    body: `Young employees are nearly ${(DATASET.byAgeBand['Under 25'].rate / DATASET.attritionRate).toFixed(1)}× more likely to leave. Introduce structured mentorship, career roadmaps, and fast-track growth programs for new hires under 25.`,
    priority: "Medium"
  },
  {
    icon: <Plane />,
    title: "Travel Load Reduction",
    subtitle: `${DATASET.byBusinessTravel['Travel_Frequently'].rate}% attrition for frequent travellers`,
    body: `Non-travellers leave at only ${DATASET.byBusinessTravel['Non-Travel'].rate}%. Review which roles require frequent travel and offer remote or hybrid alternatives where feasible.`,
    priority: "Medium"
  },
  {
    icon: <HelpCircle />,
    title: "Job Satisfaction Audits",
    subtitle: `Level 1 = ${DATASET.byJobSatisfaction[1].rate}% attrition`,
    body: `Satisfaction Level 4 employees leave at only ${DATASET.byJobSatisfaction[4].rate}%. Run quarterly pulse surveys and implement targeted interventions for low-satisfaction teams.`,
    priority: "Medium"
  },
  {
    icon: <Link2 />,
    title: "Work-Life Balance Initiative",
    subtitle: `Level 1 WLB = ${DATASET.byWorkLifeBalance[1].rate}% attrition`,
    body: `Poor WLB triples attrition. Flexible scheduling, mental health days, and manager training around workload distribution are recommended.`,
    priority: "Low"
  }
];

// Build chart data dynamically from DATASET
const roleData = Object.entries(DATASET.byRole)
  .map(([name, data]) => ({ name: name.length > 14 ? name.slice(0, 12) + '…' : name, rate: data.rate, fullName: name }))
  .sort((a, b) => b.rate - a.rate);

const otData = [
  { name: 'Overtime: Yes', rate: DATASET.byOvertime.Yes.rate, fill: '#f43f5e' },
  { name: 'Overtime: No', rate: DATASET.byOvertime.No.rate, fill: '#4f7fff' },
];

const tooltipStyle = {
  contentStyle: { backgroundColor: '#111827', borderColor: '#1f2937', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' },
  itemStyle: { color: '#e5e7eb', fontSize: '13px' },
  cursor: { fill: '#1f2937' },
};

export default function Insights() {
  return (
    <DashboardLayout
      icon={Lightbulb}
      title="Strategic Recommendations"
      subtitle="Data-backed action items derived from the dataset to reduce attrition. All values are computed from real IBM HR data."
      badge="Action Items"
    >
      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendations.map((reco, i) => (
          <InsightCard key={i} {...reco} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="bg-card backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <h3 className="font-black text-white text-xl tracking-tighter mb-1 relative z-10">Attrition % by Job Role</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 relative z-10">Structural Risk Distribution</p>
          <div className="h-[340px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff10" />
                <XAxis type="number" stroke="#ffffff30" tick={{ fontSize: 10, fontWeight: 900 }} />
                <YAxis dataKey="name" type="category" stroke="#ffffff30" tick={{ fontSize: 10, fontWeight: 900 }} width={90} />
                <RechartsTooltip {...tooltipStyle} />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={14}>
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 20 ? '#f59e0b' : '#2dd4bf'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <h3 className="font-black text-white text-xl tracking-tighter mb-1 relative z-10">Overtime Impact Comparison</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 relative z-10">Operational Stress Correlation</p>
          <div className="h-[340px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={otData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff30" tick={{ fontSize: 10, fontWeight: 900 }} />
                <YAxis stroke="#ffffff30" tick={{ fontSize: 10, fontWeight: 900 }} />
                <RechartsTooltip {...tooltipStyle} />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={50}>
                  {otData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
