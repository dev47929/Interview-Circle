import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiMessageCircle, 
  FiZap, 
  FiBookOpen, 
  FiShare2,
  FiDownload,
  FiStar,
  FiAward
} from "react-icons/fi";
import { Link } from 'react-router-dom';

const AnalysisCard = ({ label, score, color, icon: Icon }) => (
  <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px]">
    <div className="flex justify-between items-center mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
        <Icon size={20} />
      </div>
      <span className={`text-xl font-bold text-${color}-400`}>{score}%</span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full bg-${color}-500`}
      />
    </div>
  </div>
);

const InterviewFeedback = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Interview Analysis</h1>
            <p className="text-slate-400 mt-2">Senior Frontend Engineer Simulation • May 6, 2024</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-2xl bg-slate-900 border border-white/5 text-white font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition-all">
              <FiDownload size={18} /> Export PDF
            </button>
            <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
              <FiShare2 size={18} /> Share Results
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Score Hero */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[48px] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-40 h-40 rounded-full border-8 border-white/20 flex items-center justify-center relative">
                  <div className="text-center">
                    <span className="text-5xl font-black">88</span>
                    <span className="text-xl font-bold opacity-60">%</span>
                  </div>
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      cx="80" cy="80" r="72" 
                      fill="none" stroke="white" strokeWidth="8" 
                      strokeDasharray="452" strokeDashoffset="54"
                      className="opacity-100"
                    />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                    <FiAward size={14} /> Exceptional Performance
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Great job, Alex!</h2>
                  <p className="text-indigo-100 leading-relaxed max-w-md">
                    You're in the <span className="font-bold">top 5%</span> of candidates for this role. Your technical depth in React was particularly impressive.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid sm:grid-cols-3 gap-6">
              <AnalysisCard label="Technical Depth" score={92} color="indigo" icon={FiZap} />
              <AnalysisCard label="Confidence" score={85} color="emerald" icon={FiTrendingUp} />
              <AnalysisCard label="Communication" score={78} color="amber" icon={FiMessageCircle} />
            </div>

            {/* AI Insights & Observations */}
            <div className="bg-slate-900/50 border border-white/5 rounded-[40px] p-8 md:p-10">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <FiBookOpen className="text-indigo-400" /> Key Observations
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Strength: Architectural Thinking", desc: "Your explanation of micro-frontends and state management showed a high level of seniority.", icon: <FiCheckCircle className="text-emerald-400" /> },
                  { title: "Improvement: STAR Method", desc: "When answering the behavioral question about conflict, your 'Result' section was a bit brief. Try to quantify the outcome.", icon: <FiStar className="text-amber-400" /> },
                  { title: "Observation: Technical Terminology", desc: "You used terms like 'Tree Shaking' and 'Hydration' correctly and in context.", icon: <FiCheckCircle className="text-emerald-400" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl bg-slate-950/50 border border-white/5">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Next Steps */}
          <div className="space-y-8">
            <div className="bg-slate-900 border border-white/5 rounded-[40px] p-8">
              <h3 className="font-bold text-white mb-6">Topic Breakdown</h3>
              <div className="space-y-6">
                {[
                  { label: "React Internals", score: 95 },
                  { label: "System Design", score: 82 },
                  { label: "Web Performance", score: 74 },
                  { label: "Behavioral", score: 88 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-white">{item.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 blur-[40px] translate-y-1/2 translate-x-1/2" />
              <h4 className="text-xl font-bold mb-4">Recommended Practice</h4>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">
                We've curated a list of questions to help you improve your Behavioral score.
              </p>
              <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl hover:bg-slate-100 transition-all">
                Start Targeted Practice
              </button>
            </div>

            <div className="p-8 rounded-[40px] border border-white/5 bg-slate-950/50">
              <h4 className="font-bold mb-4">Transcript Highlights</h4>
              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  "Your answer at 12:45 was perfect. You correctly identified that 'useEffect' runs after the render is committed to the screen."
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                  <FiAward /> HIGH ACCURACY MOMENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewFeedback;
