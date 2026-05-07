import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTarget, FiActivity, FiZap, FiBox, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import DesignCanvas from './DesignCanvas';
import NodePalette from './NodePalette';

const SystemDesignWorkspace = ({ question }) => {
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [isPaletteExpanded, setIsPaletteExpanded] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left: Question & Requirements (30%) */}
      <div className="w-[30%] border-r border-white/10 bg-slate-950 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400">
              <FiTarget size={18} />
            </div>
            <h2 className="font-bold text-white">Problem Statement</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-bold">
            <FiClock size={12} /> {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Main Description */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">The Challenge</h3>
            <p className="text-slate-300 leading-relaxed font-medium">
              {question.description}
            </p>
          </section>

          {/* Requirements */}
          {question.requirements && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FiZap className="text-amber-400" size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Core Requirements</h3>
              </div>
              <ul className="space-y-3">
                {question.requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="text-indigo-500 font-bold">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Scale & Constraints */}
          {question.scale && (
            <section className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiActivity className="text-emerald-400" size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Scale Expectations</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(question.scale).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 capitalize">{key.replace('_', ' ')}</span>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-md">{val}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Constraints List */}
          {question.constraints && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FiBox className="text-purple-400" size={14} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Constraints</h3>
              </div>
              <ul className="space-y-3">
                {question.constraints.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="text-slate-600 font-bold">#</span>
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Right: Architecture Canvas (70%) */}
      <div className="flex-1 flex overflow-hidden relative">
        <DesignCanvas questionId={question.id} />
        
        {/* Toggle Palette Button */}
        <button 
          onClick={() => setIsPaletteExpanded(!isPaletteExpanded)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-1.5 bg-slate-900 border border-white/10 border-r-0 rounded-l-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-2xl"
          style={{ 
            transform: `translateY(-50%) translateX(${isPaletteExpanded ? '0' : '0'})`,
            marginRight: isPaletteExpanded ? '256px' : '0px'
          }}
        >
          {isPaletteExpanded ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>

        <motion.div
          initial={false}
          animate={{ 
            width: isPaletteExpanded ? 256 : 0,
            opacity: isPaletteExpanded ? 1 : 0
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="overflow-hidden bg-slate-900 border-l border-white/10 shrink-0"
        >
          <div className="w-64 h-full">
            <NodePalette />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemDesignWorkspace;
