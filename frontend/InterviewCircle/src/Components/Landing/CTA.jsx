import React from 'react';

const CTA = () => (
  <section className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative rounded-[48px] bg-indigo-600 p-12 md:p-20 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Interview with Confidence?</h2>
          <p className="text-indigo-100 text-lg mb-10">Join 500,000+ professionals who stopped worrying and started preparing the right way.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-slate-100 transition-all">
              Get Started — It's Free
            </button>
            <button className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
