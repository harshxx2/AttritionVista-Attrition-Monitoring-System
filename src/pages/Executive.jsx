import React, { useState, useMemo } from 'react';
import { LayoutDashboard } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import TableauViz from '../components/TableauViz';
import FilterBar from '../components/FilterBar';
import ConclusionsDrawer from '../components/ConclusionsDrawer';
import StatCard from '../components/StatCard';
import { generateInsights } from '../utils/insightEngine';
import { DATASET } from '../utils/dataStore';

export default function Executive() {
  const [filters, setFilters] = useState({});

  // Dynamic insights — regenerate when filters change
  const insights = useMemo(() => generateInsights('executive', filters), [filters]);

  // Dynamic KPIs based on department filter
  const activeData = useMemo(() => {
    const dept = filters.Department;
    if (dept && dept !== 'All' && DATASET.byDepartment[dept]) {
      const d = DATASET.byDepartment[dept];
      return {
        total: d.total,
        attrition: d.attrition,
        rate: d.rate,
        avgIncome: d.avgIncome,
      };
    }
    return {
      total: DATASET.total,
      attrition: DATASET.attritionYes,
      rate: DATASET.attritionRate,
      avgIncome: DATASET.avgMonthlyIncome,
    };
  }, [filters]);

  return (
    <>
      <ConclusionsDrawer insights={insights} />
      <DashboardLayout
        icon={LayoutDashboard}
        title="Executive Overview"
        subtitle="High-level KPIs and department summary for leadership. Insights update dynamically as you change filters."
        badge="Live Data"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Employees" numericValue={activeData.total} color="blue" />
          <StatCard label="Attrition Count" numericValue={activeData.attrition} color="red" />
          <StatCard label="Attrition Rate" numericValue={activeData.rate} suffix="%" color="amber" />
          <StatCard label="Avg Monthly Income" value={`$${activeData.avgIncome.toLocaleString()}`} color="green" />
        </div>

        {/* Filters */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Tableau Dashboard */}
        <div className="w-full bg-card/50 backdrop-blur-sm border border-white/5 p-3 sm:p-4 rounded-2xl shadow-xl hover:border-white/10 transition-colors">
          <TableauViz
            url="https://public.tableau.com/views/projectdemographics/Dashboard3"
            filters={filters}
            height="700px"
          />
        </div>
      </DashboardLayout>
    </>
  );
}
