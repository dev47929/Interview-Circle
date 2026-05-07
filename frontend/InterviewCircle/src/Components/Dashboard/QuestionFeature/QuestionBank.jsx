import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiX,
  FiCheck,
  FiChevronDown,
  FiHash
} from "react-icons/fi";
import { Link } from 'react-router-dom';
import { questionBankList } from './questionsData';

const CategoryButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
      active 
        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
        : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10 backdrop-blur-sm'
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-bold">{label}</span>
  </button>
);

const QuestionCard = ({ id, title, difficulty, category, solved, company }) => (
  <Link 
    to={`/questions/${id || title.toLowerCase().replace(/ /g, '-')}`}
    className="bg-slate-900/30 backdrop-blur-sm border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all group cursor-pointer relative overflow-hidden block"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <FiZap size={40} className="text-indigo-500" />
    </div>
    
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-wrap gap-2">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
          difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
          difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
          'bg-red-500/10 text-red-400'
        }`}>
          {difficulty}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          {category}
        </span>
        {company && (
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
            {company}
          </span>
        )}
      </div>
      {solved && <FiStar className="text-amber-400 fill-current" size={16} />}
    </div>
    <h4 className="text-white font-bold mb-6 group-hover:text-indigo-400 transition-colors leading-tight min-h-[3rem] line-clamp-2">{title}</h4>
    <div className="flex justify-between items-center mt-auto">
      <p className="text-slate-500 text-xs font-medium">12k+ people practiced this</p>
      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <FiChevronRight />
      </div>
    </div>
  </Link>
);

const QuestionBank = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');

  const categories = [
    { label: 'All', icon: FiZap },
    { label: 'DSA', icon: FiHash },
    { label: 'Technical', icon: FiCode },
    { label: 'Behavioral', icon: FiUser },
    { label: 'System Design', icon: FiLayout },
    { label: 'Database', icon: FiDatabase }
  ];

  const companies = ['All', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Netflix', 'Apple', 'Uber'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredQuestions = useMemo(() => {
    return questionBankList.filter(q => {
      const matchesCat = activeCat === 'All' || q.category === activeCat;
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchesCompany = selectedCompany === 'All' || q.company === selectedCompany;
      return matchesCat && matchesSearch && matchesDifficulty && matchesCompany;
    });
  }, [activeCat, searchQuery, selectedDifficulty, selectedCompany]);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  
  const currentQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredQuestions, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCat(cat);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setSearchQuery('');
    setActiveCat('All');
  };

  const hasActiveFilters = selectedDifficulty !== 'All' || selectedCompany !== 'All';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-8 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Question <span className="text-indigo-500">Bank</span></h1>
          <p className="text-slate-400 font-medium">Browse {filteredQuestions.length} hand-picked interview questions.</p>
        </div>
        <div className="relative group w-full md:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all backdrop-blur-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Categories & Filters */}
      <div className="flex flex-wrap gap-3 mb-10 items-center">
        {categories.map(cat => (
          <CategoryButton 
            key={cat.label}
            icon={cat.icon}
            label={cat.label}
            active={activeCat === cat.label}
            onClick={() => handleCategoryChange(cat.label)}
          />
        ))}
        
        <div className="relative ml-auto">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10 backdrop-blur-sm'
            }`}
          >
            <FiFilter /> 
            <span className="text-sm font-bold">Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
            )}
            <FiChevronDown className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-72 bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl z-50 backdrop-blur-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-white">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Difficulty Filter */}
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Difficulty</p>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map(diff => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                            selectedDifficulty === diff
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Company Filter */}
                  <div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Company</p>
                    <div className="grid grid-cols-2 gap-2">
                      {companies.map(comp => (
                        <button
                          key={comp}
                          onClick={() => setSelectedCompany(comp)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-black transition-all ${
                            selectedCompany === comp
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-transparent'
                          }`}
                        >
                          {comp}
                          {selectedCompany === comp && <FiCheck size={12} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-500/20 transition-all"
                >
                  Apply Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Questions Grid */}
      {currentQuestions.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuestions.map((q, i) => (
            <QuestionCard key={i} {...q} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
            <FiX className="text-slate-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">No questions found</h3>
          <p className="text-slate-400">Try adjusting your filters or search terms.</p>
          <button 
            onClick={clearFilters}
            className="mt-6 text-indigo-400 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination Placeholder */}
      {filteredQuestions.length > itemsPerPage && (
        <div className="mt-16 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button 
              key={p} 
              onClick={() => handlePageChange(p)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                currentPage === p 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'text-slate-500 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default QuestionBank;
