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
  FiPlay,
  FiCheck
} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SetupCard = ({ icon: Icon, title, desc, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-3xl border text-left transition-all duration-500 relative group overflow-hidden ${
      active 
        ? 'bg-indigo-600/10 border-indigo-500 ring-4 ring-indigo-500/20 shadow-[0_0_40px_rgba(79,70,229,0.15)]' 
        : 'bg-slate-900/50 border-white/5 hover:border-white/20'
    }`}
  >
    {active && (
      <div className="absolute top-4 right-4 text-indigo-400 animate-in fade-in zoom-in duration-300">
        <FiCheckCircle size={20} />
      </div>
    )}
    <div className={`p-4 rounded-2xl w-fit mb-4 transition-all duration-300 ${active ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/40' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
      <Icon size={24} />
    </div>
    <h4 className={`font-bold mb-2 transition-colors ${active ? 'text-white' : 'text-slate-300'}`}>{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </button>
);

const InterviewSetup = () => {
  const [type, setType] = useState('technical');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    setIsCreating(true);
    try {
      const payload = {
        resume: "v1", 
        position: "Frontend Engineer",
        company: "Interview Circle",
        round_type: type === 'technical' ? 'Technical' : 'Behavioural',
        difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
      };

      // In a real app, this would be an actual API call
      // const response = await axios.post('http://localhost:5000/ai/create', payload);
      // const { interview_id } = response.data;
      
      const mockInterviewId = `int_${Math.random().toString(36).substr(2, 9)}`;
      
      navigate('/interview-room', { 
        state: { 
          interview_id: mockInterviewId, 
          type: type 
        } 
      });
    } catch (error) {
      console.error("Error creating interview:", error);
      navigate('/interview-room', { state: { interview_id: 'demo-id', type } });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex-1 p-8 space-y-8 bg-transparent"
    >
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Configure Session</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Prepare Your <span className="text-indigo-500">Interview</span></h1>
              <p className="text-slate-400 text-lg">Customize the AI behavior and challenge level for your practice session.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 text-xs">1</span>
                Select Focus Area
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <SetupCard 
                  icon={FiCpu} 
                  title="Technical Round" 
                  desc="Coding challenges, system design, and algorithmic problem-solving with an integrated editor."
                  active={type === 'technical'}
                  onClick={() => setType('technical')}
                />
                <SetupCard 
                  icon={FiUser} 
                  title="Behavioral Round" 
                  desc="Soft skills, STAR method practice, leadership principles, and cultural fit evaluation."
                  active={type === 'behavioral'}
                  onClick={() => setType('behavioral')}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 text-xs">2</span>
                Difficulty Level
              </h3>
              <div className="flex flex-wrap gap-4">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setDifficulty(level.toLowerCase())}
                    className={`px-8 py-4 rounded-2xl font-black text-sm transition-all duration-300 border ${
                      difficulty === level.toLowerCase()
                        ? 'bg-white text-slate-950 border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Summary */}
          <div className="space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 md:p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiZap size={120} />
              </div>
              
              <h3 className="text-2xl font-black text-white tracking-tight">Session Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center py-4 border-b border-white/5 transition-all">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Interview Type</span>
                  <span className="text-indigo-400 font-black uppercase text-sm">{type}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Difficulty</span>
                  <span className="text-white font-black uppercase text-sm">{difficulty}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Time Limit</span>
                  <span className="text-white font-black uppercase text-sm">45 Min</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                   <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Features</span>
                   <span className="text-emerald-400 font-bold text-xs uppercase">
                      {type === 'technical' ? 'Editor + Voice' : 'Voice Only'}
                   </span>
                </div>
              </div>

              <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-[32px] relative overflow-hidden">
                <div className="flex gap-4 relative z-10">
                  <div className="p-2.5 bg-indigo-600 rounded-xl h-fit shadow-lg shadow-indigo-600/30">
                    <FiShield className="text-white" size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-tight">AI Guardrails Active</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      You'll receive real-time feedback and hints during the session.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleStart}
                disabled={isCreating}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-[28px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_20px_50px_rgba(79,70,229,0.3)] ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCreating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Initializing...
                  </div>
                ) : (
                  <>START INTERVIEW <FiPlay fill="currentColor" size={18} /></>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 px-6 py-4 bg-slate-900/30 rounded-full border border-white/5">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800" />
                ))}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                <span className="text-white font-bold">1.2k+ sessions</span> completed today
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewSetup;
