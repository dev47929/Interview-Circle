import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiStar, 
  FiChevronRight, 
  FiCode, 
  FiUser, 
  FiLayout, 
  FiDatabase,
  FiZap,
  FiArrowLeft
} from "react-icons/fi";
import { Link } from 'react-router-dom';

const CategoryButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
      active 
        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-bold">{label}</span>
  </button>
);

const QuestionCard = ({ title, difficulty, category, solved }) => (
  <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/50 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
          difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
          difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {difficulty}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          {category}
        </span>
      </div>
      {solved && <FiStar className="text-amber-400 fill-current" size={16} />}
    </div>
    <h4 className="text-white font-bold mb-6 group-hover:text-indigo-400 transition-colors leading-tight">{title}</h4>
    <div className="flex justify-between items-center">
      <p className="text-slate-500 text-xs font-medium">12k+ people practiced this</p>
      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <FiChevronRight />
      </div>
    </div>
  </div>
);

const QuestionBank = () => {
  const [activeCat, setActiveCat] = useState('All');
  const categories = [
    { label: 'All', icon: FiZap },
    { label: 'Technical', icon: FiCode },
    { label: 'Behavioral', icon: FiUser },
    { label: 'System Design', icon: FiLayout },
    { label: 'Database', icon: FiDatabase }
  ];

  const questions = [
    { title: "Explain the concept of 'Closures' in JavaScript with examples.", difficulty: "Medium", category: "Technical", solved: true },
    { title: "Tell me about a time you had a conflict with a teammate.", difficulty: "Easy", category: "Behavioral", solved: true },
    { title: "Design a URL shortening service like Bitly.", difficulty: "Hard", category: "System Design", solved: false },
    { title: "What is the difference between SQL and NoSQL?", difficulty: "Medium", category: "Database", solved: false },
    { title: "How would you optimize a slow React application?", difficulty: "Hard", category: "Technical", solved: true },
    { title: "What are your greatest strengths and weaknesses?", difficulty: "Easy", category: "Behavioral", solved: true }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Question Bank</h1>
            <p className="text-slate-400 mt-2">Browse 2,000+ hand-picked interview questions.</p>
          </div>
          <div className="relative group w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search questions..."
              className="w-full bg-slate-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all shadow-2xl"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <CategoryButton 
              key={cat.label}
              icon={cat.icon}
              label={cat.label}
              active={activeCat === cat.label}
              onClick={() => setActiveCat(cat.label)}
            />
          ))}
          <button className="ml-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all">
            <FiFilter /> <span className="text-sm font-bold">Filters</span>
          </button>
        </div>

        {/* Questions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q, i) => (
            <QuestionCard key={i} {...q} />
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center gap-2">
          {[1, 2, 3, '...', 12].map((p, i) => (
            <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${p === 1 ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionBank;
