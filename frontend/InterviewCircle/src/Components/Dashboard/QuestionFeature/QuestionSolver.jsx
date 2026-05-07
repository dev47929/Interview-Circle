import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { FiArrowLeft, FiPlay, FiSave, FiSettings, FiMaximize2, FiClock, FiChevronDown, FiZap, FiTerminal, FiCheck, FiCpu } from 'react-icons/fi';
import { boilerplates, languages, questionData } from './questionsData';

const QuestionSolver = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleHeight, setConsoleHeight] = useState(160);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY - 40; // 40 for footer
      if (newHeight > 60 && newHeight < 500) {
        setConsoleHeight(newHeight);
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  // Initialize code when component mounts or ID changes
  useEffect(() => {
    const questionBoilerplates = boilerplates[id] || boilerplates['rotating-the-box'];
    setCode(questionBoilerplates[language]);
  }, [id]);

  useEffect(() => {
    const questionBoilerplates = boilerplates[id] || boilerplates['rotating-the-box'];
    setCode(questionBoilerplates[language]);
  }, [language, id]);

const runCode = async () => {
  try {
    setIsRunning(true);

    setOutput("Analyzing code and generating hints...");

    // SAFETY CHECK
    if (!question) {
      setOutput("Question data not found.");
      return;
    }

    const prompt = `
You are an expert coding mentor.

Problem:
${question.title}

Description:
${question.description}

Language:
${language}

Current Code:
\`\`\`${language}
${code}
\`\`\`

Rules:
- Give ONLY hints
- Do NOT provide full code
- Explain the logical approach
- Mention mistakes if present
- Suggest optimizations if possible
- Keep response concise and useful
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization:
            "Bearer TOKEN",

          "Content-Type": "application/json",

          "HTTP-Referer": window.location.origin,

          "X-Title": "Interview Circle",
        },

        body: JSON.stringify({
          // WORKING FREE MODEL
          model: "mistralai/mistral-7b-instruct:free",

          messages: [
            {
              role: "system",
              content:
                "You are a helpful DSA mentor that only gives hints and guidance.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,

          max_tokens: 400,
        }),
      }
    );

    // HANDLE ERRORS
    if (!response.ok) {
      const errorText = await response.text();

      console.error("API Error:", errorText);

      throw new Error(
        `OpenRouter API Error ${response.status}`
      );
    }

    const data = await response.json();

    console.log(data);

    const aiHint =
      data?.choices?.[0]?.message?.content;

    if (!aiHint) {
      throw new Error("No response received");
    }

    setOutput(aiHint);

  } catch (error) {
    console.error("Run Code Error:", error);

    setOutput(
      `Error: ${error.message}`
    );
  } finally {
    setIsRunning(false);
  }
};


  const question = questionData[id] || {
    title: "Question Not Found",
    description: "Sorry, the question you are looking for could not be found in our database.",
    examples: [],
    constraints: [],
    difficulty: "Unknown",
    category: "General"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-slate-950 text-white font-sans overflow-hidden flex flex-col"
    >
      {/* Header */}
      <header className="h-14 border-b border-white/5 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/questions" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <FiArrowLeft />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <FiZap className="text-indigo-500" size={16} />
            <h1 className="font-bold text-sm truncate max-w-[200px]">{question.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            {isRunning ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiPlay size={14} />}
            Run Code
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
            <FiSave size={14} /> Submit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Description */}
        <div className="w-1/2 border-r border-white/5 overflow-y-auto p-8 custom-scrollbar bg-slate-950/50">
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${question.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
              question.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                'bg-red-500/10 text-red-400'
              }`}>
              {question.difficulty}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {question.category}
            </span>
            {question.company && (
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                {question.company}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-6">{question.title}</h2>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p className="whitespace-pre-wrap leading-relaxed text-sm text-slate-400">{question.description}</p>

            {question.examples.map((ex, i) => (
              <div key={i} className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 my-6">
                <p className="text-white font-bold text-sm mb-4">Example {i + 1}:</p>
                <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                  <div className="p-3 bg-black/30 rounded-xl">
                    <p><span className="text-indigo-400">Input:</span> {ex.input}</p>
                    <p><span className="text-indigo-400">Output:</span> {ex.output}</p>
                  </div>
                  {ex.explanation && (
                    <p className="text-slate-500 italic">
                      <span className="text-slate-400 not-italic font-bold">Explanation:</span> {ex.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {question.constraints.length > 0 && (
              <div>
                <p className="text-white font-bold text-sm mb-4">Constraints:</p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
                  {question.constraints.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="w-1/2 flex flex-col bg-[#0b0e14]">
          <div className="h-10 border-b border-white/5 bg-slate-900/50 flex items-center justify-between px-4">
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">
                  {languages.find(l => l.id === language)?.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">
                  {languages.find(l => l.id === language)?.name}
                </span>
                <FiChevronDown size={12} className={`text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 backdrop-blur-xl"
                  >
                    {languages.filter(lang => boilerplates[id]?.[lang.id] || boilerplates['rotating-the-box']?.[lang.id]).map((lang) => (
                      <div
                        key={lang.id}
                        onClick={() => {
                          setLanguage(lang.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors relative group ${language === lang.id ? 'bg-indigo-500/10' : ''}`}
                      >
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${language === lang.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300 transition-colors'}`}>
                          {lang.icon}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${language === lang.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                          {lang.name}
                        </span>
                        {language === lang.id && (
                          <div className="ml-auto">
                            <FiCheck className="text-indigo-500" size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <FiSettings size={14} className="hover:text-white cursor-pointer transition-colors" title="Settings" />
              <FiMaximize2 size={14} className="hover:text-white cursor-pointer transition-colors" title="Fullscreen" />
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 20 },
                backgroundColor: '#0b0e14',
                fontFamily: "'Fira Code', monospace",
                cursorSmoothCaretAnimation: "on",
                smoothScrolling: true,
              }}
            />
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={startResizing}
            className="h-1.5 bg-white/5 hover:bg-indigo-500/50 cursor-ns-resize transition-colors z-20 flex items-center justify-center group"
          >
            <div className="w-8 h-0.5 bg-white/10 group-hover:bg-white/30 rounded-full transition-colors" />
          </div>

          <div
            style={{ height: `${consoleHeight}px` }}
            className="border-t border-white/5 bg-black p-4 overflow-auto custom-scrollbar"
          >
            <p className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {output || 'Output will appear here'}
            </p>
          </div>

          <div className="h-10 border-t border-white/5 bg-slate-900/50 flex items-center justify-between px-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <FiClock size={12} />
              <span>Last saved 2m ago</span>
            </div>
            <div className="text-[10px] text-slate-600 font-mono">
              Line 6, Col 12
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionSolver;
