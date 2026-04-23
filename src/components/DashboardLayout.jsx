import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  out: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

/**
 * Shared dashboard page wrapper — ensures all dashboard pages have
 * a consistent glassmorphic header, layout, and entrance animation.
 */
export default function DashboardLayout({ icon: Icon, title, subtitle, badge, children }) {
  return (
    <motion.div
      initial="initial" animate="in" exit="out" variants={pageVariants}
      className="p-6 lg:p-10 min-h-screen relative z-10"
    >
      {/* Consistent Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-10 border-b border-white/5">
        <div className="flex items-start gap-6">
          {Icon && (
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.1)] flex-shrink-0">
              <Icon className="w-6 h-6 text-accent" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">{title}</h1>
              {badge && (
                <span className="bg-accent/10 text-accent font-black text-[10px] px-3 py-1 rounded-full border border-accent/20 uppercase tracking-widest shadow-[0_0_15px_rgba(0,210,255,0.05)]">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-white/40 text-sm max-w-2xl leading-relaxed font-medium">{subtitle}</p>}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}
