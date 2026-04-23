import React from 'react';
import { Filter, X } from 'lucide-react';

/**
 * FilterBar Component
 * Streamlined, professional data command bar for AttritionVista Enterprise.
 * Features:
 * - High-blur glassmorphism
 * - font-black authoritative labels
 * - Subtle animated borders
 */

export default function FilterBar({ filters, setFilters, departments, roles }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const departmentsList = departments || ['All', 'Sales', 'Research & Development', 'Human Resources'];
  const rolesList = roles || ['All', 'Sales Executive', 'Research Scientist', 'Laboratory Technician', 'Manufacturing Director', 'Healthcare Representative', 'Manager', 'Sales Representative', 'Research Director', 'Human Resources'];

  const selectStyles = "bg-black/30 border border-white/10 text-[11px] font-black uppercase tracking-tight text-white rounded-none px-4 py-2 focus:outline-none focus:border-accent/40 hover:border-white/20 transition-all appearance-none cursor-pointer";

  return (
    <div className="bg-card backdrop-blur-2xl w-full border border-white/5 rounded-none px-6 py-4 flex flex-wrap items-center gap-8 mb-10 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center gap-3 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] border-r border-white/5 pr-8 mr-2 relative z-10">
        <Filter className="w-4 h-4 text-accent" /> Intelligence Filters
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Dept</label>
        <select 
          value={filters.Department || 'All'}
          onChange={(e) => handleChange('Department', e.target.value)}
          className={selectStyles}
        >
          {departmentsList.map(d => <option key={d} value={d} className="bg-bg">{d === 'All' ? 'All Units' : d}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Role</label>
        <select 
          value={filters.JobRole || 'All'}
          onChange={(e) => handleChange('JobRole', e.target.value)}
          className={selectStyles}
        >
          {rolesList.map(r => <option key={r} value={r} className="bg-bg">{r === 'All' ? 'All Clusters' : r}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Tenure</label>
        <select 
          value={filters.YearsAtCompany || 'All'}
          onChange={(e) => handleChange('YearsAtCompany', e.target.value)}
          className={selectStyles}
        >
          <option value="All" className="bg-bg">All Tenures</option>
          <option value="0-2" className="bg-bg">0-2 Years</option>
          <option value="3-5" className="bg-bg">3-5 Years</option>
          <option value="6-10" className="bg-bg">6-10 Years</option>
          <option value="11+" className="bg-bg">10+ Years</option>
        </select>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Promotion</label>
        <select 
          value={filters.YearsSinceLastPromotion || 'All'}
          onChange={(e) => handleChange('YearsSinceLastPromotion', e.target.value)}
          className={selectStyles}
        >
          <option value="All" className="bg-bg">All Cycles</option>
          <option value="0-1" className="bg-bg">Recent (&lt;1y)</option>
          <option value="2-4" className="bg-bg">Mid (2-4y)</option>
          <option value="5+" className="bg-bg">Delayed (5y+)</option>
        </select>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Overtime</label>
        <select 
          value={filters.OverTime || 'All'}
          onChange={(e) => handleChange('OverTime', e.target.value)}
          className={selectStyles}
        >
          <option value="All" className="bg-bg">All Status</option>
          <option value="Yes" className="bg-bg">Overtime Only</option>
          <option value="No" className="bg-bg">Standard Only</option>
        </select>
      </div>

      <button 
        onClick={() => setFilters({ Department: 'All', JobRole: 'All', OverTime: 'All', YearsAtCompany: 'All', YearsSinceLastPromotion: 'All' })}
        className="ml-auto flex items-center gap-2 text-[10px] font-black text-accent/60 hover:text-white transition-all px-4 py-2 border border-accent/20 rounded-xl hover:bg-accent/10 uppercase tracking-widest relative z-10"
      >
        <X className="w-3 h-3" /> Reset Engine
      </button>
    </div>
  );
}
