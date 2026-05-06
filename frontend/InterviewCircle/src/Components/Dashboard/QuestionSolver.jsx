import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiPlay, 
  FiSave, 
  FiSettings, 
  FiMaximize2, 
  FiClock,
  FiChevronDown,
  FiZap
} from 'react-icons/fi';

const QuestionSolver = () => {
  const { id } = useParams();
  const [code, setCode] = useState(`/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function(box) {
    // Write your code here
};`);

  const questionData = {
    'rotating-the-box': {
      title: "Rotating the Box",
      difficulty: "Medium",
      category: "Technical",
      company: "Amazon",
      description: `You are given an m x n matrix of characters boxGrid representing a side-view of a box. Each cell of the box is one of the following:

- A stone '#'
- A stationary obstacle '*'
- Empty '.'

The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in boxGrid rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.`,
      examples: [
        {
          input: 'boxGrid = [["#",".","#"]]',
          output: '[["."], ["#"], ["#"]]',
          explanation: 'The box is rotated 90 degrees clockwise and gravity causes the stones to fall.'
        },
        {
          input: 'boxGrid = [["#",".","*","."], ["#","#","*","."]]',
          output: '[["#","."], ["#","#"], ["*","*"], [".","."]]',
          explanation: 'Stones fall until they hit obstacles or the bottom.'
        }
      ],
      constraints: [
        "m == boxGrid.length",
        "n == boxGrid[i].length",
        "1 <= m, n <= 500",
        "boxGrid[i][j] is either '#', '*', or '.'."
      ]
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
          <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            <FiPlay size={14} /> Run Code
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
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
              question.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
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
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest group-hover:text-indigo-300 transition-colors">JavaScript</span>
              <FiChevronDown size={10} className="text-slate-500 group-hover:text-white" />
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <FiSettings size={14} className="hover:text-white cursor-pointer transition-colors" title="Settings" />
              <FiMaximize2 size={14} className="hover:text-white cursor-pointer transition-colors" title="Fullscreen" />
            </div>
          </div>
          
          <div className="flex-1 relative font-mono text-sm overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/20 border-r border-white/5 flex flex-col items-center py-6 text-[10px] text-slate-600 select-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="h-6 flex items-center justify-center">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent py-6 pl-16 pr-6 outline-none resize-none text-slate-300 leading-6 focus:ring-0 border-none scrollbar-hide"
              spellCheck="false"
            />
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
