import React, { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import SectionHeading from './SectionHeading';

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "How realistic are the interviews?", a: "Extremely. Our AI uses natural language processing to understand your specific phrasing and asks context-aware follow-up questions just like a human senior engineer or recruiter would." },
    { q: "What interview types are covered?", a: "We cover Technical (Coding, System Design), Behavioral (STAR, Leadership), Product Management, Case Study, and specialized roles like Data Science or DevOps." },
    { q: "Can I try for free?", a: "Yes, our Free Tier allows for 2 mock interviews per month with basic scoring to help you get a feel for the platform." },
    { q: "Is my data private?", a: "Absolutely. We do not sell your interview recordings or data. Recordings are only used to generate your personalized feedback reports." }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading title="Frequently Asked Questions" subtitle="" />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/5 bg-slate-900 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full p-6 text-left flex items-center justify-between text-white font-bold"
              >
                {faq.q}
                {openIdx === i ? <FiMinus size={20} /> : <FiPlus size={20} />}
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
