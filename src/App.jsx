import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import CommandMenu from './components/CommandMenu';
import UniqueParticles from './components/UniqueParticles';

// Lazy-loaded pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const Executive = lazy(() => import('./pages/Executive'));
const RiskFactors = lazy(() => import('./pages/RiskFactors'));
const Demographics = lazy(() => import('./pages/Demographics'));
const DepartmentDeepDive = lazy(() => import('./pages/DepartmentDeepDive'));
const Insights = lazy(() => import('./pages/Insights'));
const Calculator = lazy(() => import('./pages/Calculator'));

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-bg relative">
      <div className="flex flex-col items-center gap-10">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-3xl border border-accent/20 animate-pulse scale-150" />
          <div className="absolute inset-0 rounded-3xl border border-white/5 animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_20px_#00d2ff] animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">Syncing Data Node</p>
          <div className="h-0.5 w-48 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex min-h-screen text-gray-200 overflow-hidden relative selection:bg-accent/30 selection:text-white">
      <UniqueParticles />
      <CommandMenu />
      {!isHome && <Sidebar />}
      <main className={`flex-1 relative z-10 ${isHome ? 'w-full' : 'max-h-screen overflow-y-auto'}`}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/executive" element={<Executive />} />
                <Route path="/risk-factors" element={<RiskFactors />} />
                <Route path="/demographics" element={<Demographics />} />
                <Route path="/department" element={<DepartmentDeepDive />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/calculator" element={<Calculator />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
