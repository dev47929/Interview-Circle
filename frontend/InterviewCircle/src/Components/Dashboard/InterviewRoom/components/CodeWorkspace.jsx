import React from "react";
import Editor from "@monaco-editor/react";

const CodeWorkspace = ({
  code,
  setCode,
  language,
  setLanguage,
  languages,
}) => {
  return (
    <div className="flex-1 rounded-[32px] bg-[#1e1e1e] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
      <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Solution Editor</span>
        </div>
        
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/20 outline-none cursor-pointer hover:bg-indigo-500/20 transition-all uppercase tracking-wider"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id} className="bg-slate-900 text-white">
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on"
          }}
        />
      </div>
    </div>
  );
};

export default CodeWorkspace;
