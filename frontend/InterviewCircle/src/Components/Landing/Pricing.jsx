import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from "react-icons/md";
import SectionHeading from './SectionHeading';
import Button from './Button';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Free",
      price: "0",
      features: ["2 Mock Interviews/mo", "Basic Feedback Score", "Common Question Bank", "Standard AI Voice"],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: isAnnual ? "24" : "29",
      features: ["Unlimited Interviews", "Detailed Feedback Reports", "Company-Specific Prep", "Advanced Analytics", "Video Analysis"],
      cta: "Start Pro Trial",
      highlight: true
    },
    {
      name: "Premium",
      price: isAnnual ? "79" : "99",
      features: ["Everything in Pro", "1-on-1 Human Coaching", "Priority Support", "Resume Writing Service", "Referral Network"],
      cta: "Go Premium",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="Simple, Transparent Pricing" subtitle="Invest in your future with plans that grow with you." />
        
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-800 p-1 transition-all flex items-center"
          >
            <div className={`w-5 h-5 rounded-full bg-indigo-600 transition-all ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
            Yearly <span className="text-emerald-400 ml-1">(-20%)</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className={`p-10 rounded-[32px] border ${tier.highlight ? 'bg-indigo-600/10 border-indigo-500 relative' : 'bg-slate-900 border-white/5'}`}>
              {tier.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</span>
              )}
              <h4 className="text-white text-xl font-bold mb-2">{tier.name}</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">${tier.price}</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                    <MdCheckCircle size={18} className="text-indigo-400" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button variant={tier.highlight ? 'primary' : 'outline'} className="w-full">
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
