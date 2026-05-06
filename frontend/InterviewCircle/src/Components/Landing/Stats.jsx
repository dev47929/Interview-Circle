import React from 'react';

const Stats = () => {
  const stats = [
    { label: "Active Users", value: "500K+" },
    { label: "Mock Interviews Conducted", value: "2M+" },
    { label: "Avg Confidence Increase", value: "95%" },
    { label: "Companies Using Platform", value: "50+" },
    { label: "Languages Supported", value: "15+" },
    { label: "AI Availability", value: "24/7" },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
