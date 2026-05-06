import React from 'react';

const Press = () => (
  <section className="py-12 bg-slate-950 overflow-hidden opacity-50">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-slate-500 text-sm font-medium mb-10 uppercase tracking-[0.2em]">As featured in</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
        {['TechCrunch', 'Product Hunt', 'LinkedIn', 'HackerNews', 'Forbes'].map(brand => (
          <span key={brand} className="text-2xl font-bold text-slate-600 grayscale hover:grayscale-0 transition-all cursor-default">
            {brand}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Press;
