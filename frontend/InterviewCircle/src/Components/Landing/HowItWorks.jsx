import React from 'react';
import { FiGlobe, FiUserCheck, FiZap, FiBarChart } from "react-icons/fi";
import SectionHeading from './SectionHeading';

const HowItWorks = () => {
  const steps = [
    { title: "Select Focus", desc: "Choose your interview type, industry, and difficulty level.", icon: <FiGlobe /> },
    { title: "Meet Your AI", desc: "Get matched with a specialized AI interviewer for your niche.", icon: <FiUserCheck /> },
    { title: "Real Interaction", desc: "Speak or code in real-time. The AI reacts to your answers.", icon: <FiZap /> },
    { title: "Deep Analysis", desc: "Receive a comprehensive report with score and improvements.", icon: <FiBarChart /> }
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="How it Works" subtitle="Four simple steps to peak interview performance." />
        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-950 outline outline-1 outline-white/10 flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:outline-indigo-500 transition-all duration-500">
                <div className="text-indigo-400 group-hover:text-white transition-colors">
                  {React.cloneElement(step.icon, { size: 32 })}
                </div>
              </div>
              <h4 className="text-white font-bold text-xl mb-3">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
