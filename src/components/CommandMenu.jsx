import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, BarChart3, Users, Clock, AlertCircle, Layout, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CommandMenu Component v2.5
 * Refined 'Quick Action Node' for AttritionVista Enterprise.
 * Features:
 * - font-black authoritative typography
 * - Deep-blur glassmorphism
 * - Sophisticated command key hints
 */

const commands = [
  { id: '1', title: 'Executive Overview', icon: BarChart3, path: '/executive', shortcut: 'E' },
  { id: '2', title: 'Risk Factors Analysis', icon: AlertCircle, path: '/risk-factors', shortcut: 'R' },
  { id: '3', title: 'Department Demographics', icon: Users, path: '/demographics', shortcut: 'D' },
  { id: '4', title: 'Strategic Insights', icon: Clock, path: '/insights', shortcut: 'O' },
  { id: '5', title: 'Risk Calculator', icon: Calculator, path: '/calculator', shortcut: 'C' }
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (path) => {
    navigate(path);
    setOpen(false);
    setSearch('');
  };

  const filteredCommands = commands.filter((command) => 
    command.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg/80 backdrop-blur-xl" 
            onClick={() => setOpen(false)} 
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="relative w-full max-w-2xl bg-card border border-white/5 rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center px-8 border-b border-white/5">
              <Search className="w-5 h-5 text-accent mr-5" />
              <input 
                autoFocus
                className="flex-1 h-20 bg-transparent text-white outline-none placeholder-white/20 font-black tracking-tight text-lg"
                placeholder="Query enterprise intelligence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex bg-white/5 px-3 py-1.5 rounded-lg text-[10px] font-black text-white/30 border border-white/ client-border transition-all">ESC</kbd>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-4 scrollbar-hide">
              {filteredCommands.length === 0 ? (
                <div className="p-12 text-center text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">
                  No intelligence nodes found
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-5 py-3 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                    Active Dashboards
                  </div>
                  {filteredCommands.map((command) => (
                    <button
                      key={command.id}
                      onClick={() => runCommand(command.path)}
                      className="w-full flex items-center gap-5 px-5 py-4 rounded-2xl hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all duration-300 group text-left relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-accent/30 group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                        <command.icon className="w-5 h-5" />
                      </div>
                      <span className="font-black text-white/80 group-hover:text-white transition-colors flex-1 tracking-tight">{command.title}</span>
                      <kbd className="hidden sm:inline-flex bg-black/40 px-3 py-1.5 rounded-lg text-[10px] text-white/20 border border-white/5 uppercase font-black group-hover:text-accent group-hover:border-accent/40 transition-all">
                        {command.shortcut}
                      </kbd>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↑↓</kbd> <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Enter</kbd> <span>Select</span>
                </div>
              </div>
              <div>AttritionVista v2.5</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
