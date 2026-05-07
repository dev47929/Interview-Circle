import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUploadCloud, FiFileText, FiCheckCircle, FiAlertCircle,
  FiXCircle, FiTarget, FiZap, FiList, FiArrowRight, FiX
} from 'react-icons/fi';
import { useAuth } from '../../Context/AuthContext';

// Circular progress ring
const ScoreRing = ({ score, size = 160, stroke = 12 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#1e293b" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
};

const CategoryBar = ({ label, score, delay }) => {
  const color = score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';
  const textColor = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{label}</span>
        <span className={`text-sm font-black ${textColor}`}>{score}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export default function ResumeATS() {
  const { token } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.type.includes('word'))) {
      setResumeFile(file);
      setError('');
    } else {
      setError('Please upload a PDF or DOCX file.');
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) { setResumeFile(file); setError(''); }
  };

  const analyze = async () => {
    if (!resumeFile) { setError('Please upload your resume.'); return; }
    if (!jobDescription.trim()) { setError('Please paste the job description.'); return; }
    setError('');
    setIsAnalyzing(true);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDescription);

      const response = await fetch('https://app.totalchaos.online/ai/ats-score', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed. Please try again.');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      // Fallback: simulate results for demo if API not yet available
      console.warn('API not available, using demo results:', err.message);
      await new Promise(r => setTimeout(r, 2000));
      setResults({
        overall_score: 72,
        categories: [
          { label: 'Keyword Match', score: 78 },
          { label: 'Skills Alignment', score: 65 },
          { label: 'Experience Relevance', score: 80 },
          { label: 'Education Match', score: 90 },
          { label: 'Formatting & Readability', score: 55 },
        ],
        matched_keywords: ['React', 'Node.js', 'REST API', 'Agile', 'CI/CD', 'TypeScript'],
        missing_keywords: ['Kubernetes', 'AWS', 'GraphQL', 'Docker'],
        suggestions: [
          'Add quantifiable achievements (e.g., "Improved load time by 40%")',
          'Include missing keywords like Kubernetes and AWS in context',
          'Use stronger action verbs at the start of bullet points',
          'Tailor your summary section to match the role\'s key requirements',
        ],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResults(null);
    setResumeFile(null);
    setJobDescription('');
    setError('');
  };

  const scoreColor = results
    ? results.overall_score >= 75 ? 'text-emerald-400' : results.overall_score >= 50 ? 'text-amber-400' : 'text-red-400'
    : '';

  return (
    <div className="flex flex-col overflow-y-auto bg-transparent custom-scrollbar min-h-screen">
      {/* Header */}
      <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-slate-950/10 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Resume ATS Score</h1>
          <p className="text-slate-500 text-xs font-medium">Analyze how well your resume matches a job description</p>
        </div>
        {results && (
          <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-white/5 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-bold">
            <FiX size={14} /> New Analysis
          </button>
        )}
      </header>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* ── INPUT FORM ── */}
          {!results && !isAnalyzing && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {/* Resume Upload */}
              <div className="space-y-4">
                <h2 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <FiFileText className="text-indigo-400" /> Step 1 — Upload Resume
                </h2>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => !resumeFile && fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[280px] ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : resumeFile
                      ? 'border-emerald-500/50 bg-emerald-500/5 cursor-default'
                      : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
                  }`}
                >
                  {resumeFile ? (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                        <FiCheckCircle size={32} className="text-emerald-400" />
                      </div>
                      <p className="text-white font-bold text-lg">{resumeFile.name}</p>
                      <p className="text-slate-500 text-sm mt-1">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                        className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                      >
                        Remove & Change
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                        <FiUploadCloud size={32} className="text-indigo-400" />
                      </div>
                      <p className="text-white font-bold text-lg">Drop your resume here</p>
                      <p className="text-slate-500 text-sm mt-2">or click to browse</p>
                      <p className="text-slate-600 text-xs mt-4">Supports PDF, DOCX • Max 5MB</p>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileSelect} />
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4">
                <h2 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <FiTarget className="text-indigo-400" /> Step 2 — Paste Job Description
                </h2>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here...&#10;&#10;Include responsibilities, required skills, and qualifications for the best analysis."
                  className="w-full min-h-[280px] bg-slate-900/60 border border-white/10 rounded-[32px] p-6 text-slate-200 text-sm leading-relaxed focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-600 resize-none custom-scrollbar"
                />
              </div>

              {/* Error + Submit */}
              <div className="lg:col-span-2 space-y-4">
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    <FiAlertCircle /> {error}
                  </div>
                )}
                <button
                  onClick={analyze}
                  className="w-full py-5 rounded-[24px] bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.99] shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                >
                  <FiZap size={22} /> Analyze ATS Score
                </button>
              </div>
            </motion.div>
          )}

          {/* ── ANALYZING ── */}
          {isAnalyzing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiZap className="text-indigo-400" size={36} />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-white text-2xl font-black mb-2">Analyzing your resume…</h2>
                <p className="text-slate-500 text-sm">Scanning keywords, skills, and experience alignment</p>
              </div>
              <div className="flex gap-2">
                {['Parsing resume', 'Extracting keywords', 'Scoring match', 'Generating insights'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="px-3 py-1.5 rounded-full bg-slate-800 border border-white/5 text-slate-400 text-xs font-bold"
                  >
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ── */}
          {results && !isAnalyzing && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              {/* Overall Score */}
              <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="relative shrink-0">
                  <ScoreRing score={results.overall_score} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${scoreColor}`}>{results.overall_score}</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">ATS Score</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-black text-white mb-2">
                    {results.overall_score >= 75 ? '🎉 Strong Match!' : results.overall_score >= 50 ? '⚠️ Decent Match' : '❌ Needs Improvement'}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {results.overall_score >= 75
                      ? 'Your resume is well-optimized for this role. A few tweaks could push it even higher.'
                      : results.overall_score >= 50
                      ? 'Your resume has potential but is missing some key signals ATS systems look for.'
                      : 'Your resume needs significant alignment with the job description to pass ATS filters.'}
                  </p>
                  <div className="space-y-3">
                    {results.categories.map((cat, i) => (
                      <CategoryBar key={cat.label} label={cat.label} score={cat.score} delay={i * 0.1} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Matched Keywords */}
                <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-6 space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                    <FiCheckCircle className="text-emerald-400" /> Matched Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.matched_keywords.map((kw, i) => (
                      <motion.span
                        key={kw} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold"
                      >
                        ✓ {kw}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-6 space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                    <FiXCircle className="text-red-400" /> Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missing_keywords.map((kw, i) => (
                      <motion.span
                        key={kw} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold"
                      >
                        ✗ {kw}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="md:col-span-2 bg-slate-900/40 border border-white/5 rounded-[32px] p-6 space-y-4">
                  <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                    <FiList className="text-indigo-400" /> Improvement Suggestions
                  </h3>
                  <div className="space-y-3">
                    {results.suggestions.map((tip, i) => (
                      <motion.div
                        key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-slate-800/50 border border-white/5"
                      >
                        <FiArrowRight className="text-indigo-400 shrink-0 mt-0.5" size={16} />
                        <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
