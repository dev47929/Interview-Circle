import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiZap, 
  FiUser, 
  FiCpu, 
  FiShield, 
  FiCheckCircle, 
  FiArrowRight,
  FiPlay
} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';

const SetupCard = ({ icon: Icon, title, desc, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-3xl border text-left transition-all duration-300 ${
      active 
        ? 'bg-indigo-600/10 border-indigo-500 ring-4 ring-indigo-500/10' 
        : 'bg-slate-900/50 border-white/5 hover:border-white/10'
    }`}
  >
    <div className={`p-3 rounded-2xl w-fit mb-4 ${active ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
      <Icon size={24} />
    </div>
    <h4 className={`font-bold mb-2 ${active ? 'text-white' : 'text-slate-200'}`}>{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </button>
);

const InterviewSetup = () => {
  const [type, setType] = useState('technical');
  const [difficulty, setDifficulty] = useState('intermediate');
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="min-h-screen bg-slate-950 p-6 md:p-12 flex items-center justify-center font-sans"
    >
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-12">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 1 of 2: Setup</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Configure Your Interview</h1>
              <p className="text-slate-400">Tailor the AI to simulate your specific career goal.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">1. Select Interview Type</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <SetupCard 
                  icon={FiCpu} 
                  title="Technical" 
                  desc="Focus on coding, data structures, and system design."
                  active={type === 'technical'}
                  onClick={() => setType('technical')}
                />
                <SetupCard 
                  icon={FiUser} 
                  title="Behavioral" 
                  desc="Practice soft skills, STAR method, and culture fit."
                  active={type === 'behavioral'}
                  onClick={() => setType('behavioral')}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">2. Difficulty Level</h3>
              <div className="flex flex-wrap gap-3">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setDifficulty(level.toLowerCase())}
                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                      difficulty === level.toLowerCase()
                        ? 'bg-white text-slate-950'
                        : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-10 space-y-8">
              <h3 className="text-xl font-bold text-white">Session Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-500 text-sm font-medium">Role Target</span>
                  <span className="text-white font-bold">Frontend Engineer</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-500 text-sm font-medium">Time Limit</span>
                  <span className="text-white font-bold">45 Minutes</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-500 text-sm font-medium">AI Persona</span>
                  <span className="text-white font-bold">Senior Hiring Manager</span>
                </div>
              </div>

              <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl">
                <div className="flex gap-4">
                  <div className="p-2 bg-indigo-600 rounded-xl h-fit">
                    <FiShield className="text-white" size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1">AI Guardrails Enabled</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Real-time hints and "Help me answer" feature is active for this session.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/interview-room')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25"
              >
                Launch Interview Room <FiPlay fill="currentColor" size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 px-6">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800" />
                ))}
              </div>
              <p className="text-xs text-slate-500">
                <span className="text-white font-bold">428 others</span> are practicing right now
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewSetup;
