import React from 'react';
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './Button';

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    {/* Background Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        New: System Design AI Module Released
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
      >
        Master Your Next <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Interview with AI
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-400 text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        Real-time AI feedback, comprehensive question bank, behavioral & technical interview prep. Join 500K+ professionals landing their dream jobs.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/signup" className="w-full sm:w-auto">
          <Button className="w-full h-14 px-8 text-lg">
            Start Free Interview <FiArrowRight size={20} />
          </Button>
        </Link>
        <Button variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg">
          Explore Features
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 relative max-w-5xl mx-auto"
      >
        <div className="aspect-video rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shadow-xl shadow-indigo-500/20">
              <FiPlay className="text-white fill-current ml-1" size={32} />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                +12k
              </div>
            </div>
            <p className="text-slate-400 text-sm">Watching demo of AI Technical Interview</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);


export default Hero;
