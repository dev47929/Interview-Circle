import React from 'react';
import { FiZap, FiShield, FiBarChart } from "react-icons/fi";

const AITech = () => (
  <section className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-8">Proprietary AI Designed for Hiring</h2>
          <p className="text-slate-400 text-lg mb-10">Our models are trained on millions of successful interview transcripts from Fortune 500 companies.</p>
          
          <div className="space-y-8">
            {[
              { title: "Real Simulation", desc: "Uses actual hiring patterns & dynamic follow-ups.", icon: <FiZap className="text-indigo-400" /> },
              { title: "Smart Feedback", desc: "Analyzes confidence, technical depth, and tone.", icon: <FiShield className="text-emerald-400" /> },
              { title: "Personalized Paths", desc: "Adapts difficulty based on your previous performance.", icon: <FiBarChart className="text-blue-400" /> }
            ].map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{f.title}</h4>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-600/30 blur-[100px] rounded-full" />
          <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-white font-bold">Feedback Engine v4.0</span>
                <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded">ACTIVE</span>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[85%] animate-pulse" />
                </div>
                <p className="text-xs text-slate-500">Confidence Factor: 85%</p>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]" />
                </div>
                <p className="text-xs text-slate-500">Technical Accuracy: 92%</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-indigo-400 text-xs font-bold mb-2 uppercase">AI Suggestion:</p>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "Your explanation of the hash map collision was technically correct, but try using the 'Draw and Talk' method to improve clarity."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AITech;
