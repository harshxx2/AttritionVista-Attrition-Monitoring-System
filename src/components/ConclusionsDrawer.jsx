import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

/**
 * ConclusionsDrawer Component
 * Refined 'AI Intelligence Hub' for AttritionVista Enterprise.
 * Features:
 * - Premium Radar-style floating trigger
 * - Professional drawer typography (font-black)
 * - Authority-based severity styling
 */

const severityConfig = {
  high: { 
    color: 'from-rose-500 to-rose-600', 
    border: 'border-rose-500/20', 
    bg: 'bg-rose-500/5', 
    icon: AlertTriangle, 
    text: 'text-rose-500' 
  },
  medium: { 
    color: 'from-amber-500 to-amber-600', 
    border: 'border-amber-500/20', 
    bg: 'bg-amber-500/5', 
    icon: Zap, 
    text: 'text-amber-500' 
  },
  low: { 
    color: 'from-teal-500 to-teal-600', 
    border: 'border-teal-500/20', 
    bg: 'bg-teal-500/5', 
    icon: CheckCircle, 
    text: 'text-teal-500' 
  },
};

export default function ConclusionsDrawer({ insights }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-40 group"
          >
            {/* Holographic Pulse Center */}
            <motion.div 
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.4, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-40px] bg-gradient-to-tr from-accent to-secondary blur-[80px] rounded-full group-hover:opacity-60 transition-opacity"
            />
            
            {/* Dual Orbital Rings */}
            <div className="absolute inset-[-10px] rounded-full border border-accent/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[-15px] rounded-full border border-secondary/10 animate-[spin_15s_linear_reverse_infinite] opacity-50" />
            
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-28 h-28 rounded-full bg-[#02040a]/70 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(0,210,255,0.1)] flex flex-col items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-all duration-700 group/btn"
            >
              {/* Internal Living Core — Dense Particles */}
              <motion.div 
                animate={{ x: [0, 15, -15, 0], y: [0, -20, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full blur-[2px] top-1/4 left-1/4"
              />
              <motion.div 
                animate={{ x: [0, -20, 15, 0], y: [0, 15, -10, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-2 h-2 bg-secondary rounded-full blur-[3px] bottom-1/4 right-1/4"
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-accent via-transparent to-secondary opacity-20"
              />

              {/* Data Scanner Beam */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,210,255,0.2)_360deg)] animate-[spin_8s_linear_infinite]" />
              
              <Activity className="w-9 h-9 text-accent mb-2 transition-transform group-hover/btn:scale-110 duration-500 relative z-10 filter drop-shadow-[0_0_10px_rgba(0,210,255,0.6)]" />
              
              <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/40 group-hover/btn:text-white transition-colors relative z-10 text-center px-2 border-t border-white/5 pt-1.5 w-full">CONCLUSIONS</span>
              
              {/* Intelligence Multiplier Badge */}
              <div className="absolute top-6 right-6 h-6 min-w-[24px] px-2 rounded-full bg-accent flex items-center justify-center text-[10px] font-black text-bg shadow-[0_0_30px_rgba(0,210,255,0.6)] border border-white/20 z-20">
                {insights.length}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="w-full max-w-2xl bg-card border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] relative z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter">Strategic Intelligence</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Automated Data Conclusions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all text-white/30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto space-y-6 relative z-10">
                {insights.map((insight, idx) => {
                  const config = severityConfig[insight.severity] || severityConfig.medium;
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`p-6 rounded-3xl border ${config.border} ${config.bg} relative overflow-hidden group hover:scale-[1.01] transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-xl bg-bg border border-white/5 ${config.text}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.text}`}>
                          {insight.severity === 'high' ? 'Critical Priority' : 'Operational Insight'}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white mb-3 tracking-tight leading-tight">{insight.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed font-medium">
                        {insight.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-xl bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                  Dismiss Intel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
