import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, Users, Lightbulb, Home, PanelLeftClose, PanelLeft, Menu, Building2, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Executive Overview', path: '/executive', icon: LayoutDashboard },
  { name: 'Risk Factors', path: '/risk-factors', icon: AlertCircle },
  { name: 'Department Deep Dive', path: '/department', icon: Building2 },
  { name: 'Demographics', path: '/demographics', icon: Users },
  { name: 'Insights', path: '/insights', icon: Lightbulb },
  { name: 'Risk Calculator', path: '/calculator', icon: Calculator }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>
    );
  }

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-72 flex-shrink-0 bg-white/[0.01] backdrop-blur-3xl border-r border-white/5 min-h-screen flex flex-col pt-8 relative z-20"
    >
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-8 right-[-14px] z-50 p-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/40 hover:text-white hover:bg-white/10 shadow-2xl transition-all"
      >
        <PanelLeftClose className="w-3.5 h-3.5" />
      </button>

      <div className="px-8 pb-8 border-b border-white/5 mb-6">
        <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.3)] relative overflow-hidden group mb-4">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <LayoutDashboard className="w-6 h-6 text-bg relative z-10 transition-transform group-hover:scale-110" />
        </div>
        <h1 className="font-black text-lg leading-tight text-white tracking-tighter">AttritionVista</h1>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-1">Intelligence Platform</p>
      </div>
      
      <nav className="flex flex-col gap-1.5 px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl text-[12px] font-bold tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(0,210,255,0.05)]'
                      : 'text-white/30 hover:bg-white/5 hover:text-white hover:translate-x-1'
                  }`
                }
              >
                <Icon className="w-4 h-4 opacity-80" />
                {item.name}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>
      
      <div className="mt-auto px-8 py-6 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">
        <div className="mb-4 space-y-1">
          <div>IBM Workforce 2.0</div>
          <div>1,470 Nodes Synced</div>
        </div>
        <div className="flex items-center gap-3 text-accent/50 font-mono">
          <kbd className="bg-white/5 px-2 py-1 rounded-md border border-white/10 text-accent/70">Ctrl+K</kbd> <span>Search</span>
        </div>
      </div>
    </motion.aside>
  );
}
