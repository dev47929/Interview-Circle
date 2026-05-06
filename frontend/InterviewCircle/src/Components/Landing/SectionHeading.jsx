import React from 'react';

const SectionHeading = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

export default SectionHeading;
