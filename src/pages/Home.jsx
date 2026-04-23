import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BrainCircuit, BarChart3, Users, Zap, Shield, Globe, 
  Database, Cpu, Network, LineChart, Sparkles, CheckCircle2, 
  Lock, Zap as ZapIcon, Layout, PieChart, Activity
} from 'lucide-react';
import InteractiveButton from '../components/InteractiveButton';
import HeroNodes from '../components/HeroNodes';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -8 }}
    className="group relative p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/30 shadow-2xl backdrop-blur-xl transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const StatBadge = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
    <div className="p-2.5 rounded-lg bg-accent/20 border border-accent/20">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div>
      <div className="text-2xl font-black text-white leading-none mb-1">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{label}</div>
    </div>
  </div>
);

const TechBadge = ({ name, icon: Icon }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
    <Icon className="w-3.5 h-3.5 text-accent" />
    {name}
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 pointer-events-none"
      >
        <div className="text-xl font-black tracking-tighter text-white pointer-events-auto flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.3)]">
             <Layout className="w-5 h-5 text-bg" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">AttritionVista</span>
        </div>
        
        <div className="flex items-center gap-8 pointer-events-auto">
          <button onClick={() => navigate('/calculator')} className="text-xs font-bold text-white/40 hover:text-accent transition-colors uppercase tracking-widest">Predictor</button>
          <InteractiveButton onClick={() => navigate('/executive')} variant="primary" icon={ArrowRight}>
            Launch Platform
          </InteractiveButton>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Centered Content */}
        <motion.div 
          style={{ opacity: scrollOpacity, y: heroY }}
          className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            initial="initial" animate="animate"
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 shadow-[0_0_40px_rgba(0,210,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-black">Enterprise Intelligence Activated</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-7xl sm:text-[9rem] lg:text-[11rem] font-black tracking-tight leading-[0.9] mb-4 py-2 px-12 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 select-none">
              ATTRITION
            </h1>
            <h1 className="text-7xl sm:text-[9rem] lg:text-[11rem] font-black tracking-tight leading-[0.9] mb-12 py-2 px-12 bg-clip-text text-transparent bg-gradient-to-r from-accent via-secondary to-accent opacity-90 select-none filter drop-shadow-[0_0_30px_rgba(0,210,255,0.3)]">
              VISTA
            </h1>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            initial="initial" animate="animate"
            className="text-white/50 text-lg sm:text-xl font-medium tracking-tight mb-12 max-w-2xl leading-relaxed"
          >
            Predictive workforce intelligence for the modern enterprise. 
            Transform raw HR data into clear, actionable executive narratives.
          </motion.p>

          <motion.div variants={itemVariants} initial="initial" animate="animate">
            <InteractiveButton 
              onClick={() => navigate('/executive')} 
              className="px-16 py-6 text-lg font-black rounded-2xl shadow-[0_0_50px_rgba(0,210,255,0.3)] hover:shadow-[0_0_60px_rgba(0,210,255,0.5)] transition-shadow"
              icon={ArrowRight}
            >
              Get Started
            </InteractiveButton>
          </motion.div>

          {/* Stats moved slightly lower for balance */}
          <motion.div 
            variants={containerVariants} initial="initial" animate="animate"
            className="flex flex-wrap justify-center gap-6 mt-24 opacity-60"
          >
            <StatBadge icon={Activity} label="Accuracy" value="94.2%" />
            <StatBadge icon={PieChart} label="Data Points" value="1.4M+" />
            <StatBadge icon={ZapIcon} label="Processing" value="<200ms" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust & Tech Ribbon */}
      <div className="w-full py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-12 flex flex-wrap justify-center items-center gap-10">
           <TechBadge name="React 18" icon={Cpu} />
           <TechBadge name="Tableau Intelligence" icon={BarChart3} />
           <TechBadge name="Three.js Engine" icon={Globe} />
           <TechBadge name="Framer Motion" icon={Zap} />
           <TechBadge name="Neural Analytics" icon={BrainCircuit} />
        </div>
      </div>

      {/* Feature Grids */}
      <section className="relative py-40 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-6">Core Capabilities</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">Deep-diver into structural analytics with our focused intelligence modules.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BrainCircuit}
              title="Predictive Core"
              description="Machine learning architecture designed to forecast organizational exits with high-fidelity accuracy."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Dynamic Stream"
              description="Visual data narratives that update in real-time, providing immediate clarity on workforce trends."
              delay={0.2}
            />
            <FeatureCard 
              icon={Shield}
              title="Security First"
              description="Enterprise-grade data encryption and privacy controls ensuring your internal talent data stays yours."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Security & Professionalism Section */}
      <section className="relative py-40 px-12 z-10 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h3 className="text-5xl font-black tracking-tighter text-white mb-8 leading-tight">Professional Grade <br/> Talent Intelligence</h3>
            <div className="space-y-6">
              {[
                 { title: "GDPR Compliant", text: "Global data protection standards applied to every byte." },
                 { title: "Real-time Processing", text: "Instantaneous data refresh across all dashboard nodes." },
                 { title: "Executive Export", text: "One-click PDF reporting for stakeholder meetings." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-accent/20 to-secondary/20 rounded-[4rem] border border-white/10 flex items-center justify-center animate-float">
               <Lock className="w-32 h-32 text-accent/50 filter blur-[2px]" />
               <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-60 px-8 z-10 text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl mx-auto"
         >
           <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-12">Empower your <br/> HR Strategy</h2>
           <InteractiveButton 
             onClick={() => navigate('/calculator')}
             variant="primary"
             className="px-20 py-8 text-2xl font-black rounded-[2rem]"
             icon={ArrowRight}
           >
             Get Started
           </InteractiveButton>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] z-10">
        <div className="flex items-center gap-3">
           <div className="w-5 h-5 rounded bg-accent/20 border border-accent/30" />
           AttritionVista v2.5 Enterprise
        </div>
        <div className="flex gap-12">
           <a href="#" className="hover:text-accent transition-colors">Documentation</a>
           <a href="#" className="hover:text-accent transition-colors">Architecture</a>
           <a href="#" className="hover:text-accent transition-colors">Privacy</a>
        </div>
      </footer>

    </div>
  );
}
