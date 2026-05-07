import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Stats from './Stats';
import Products from './Products';
import Press from './Press';
import HowItWorks from './HowItWorks';
import AITech from './AITech';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import LandingBackground from '../React-bits/LandingBackground';

import { motion } from 'framer-motion';

const InterviewCircleLanding = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white relative"
    >

      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <LandingBackground 
          squareSize={50}
          borderColor="#312e81"
          hoverFillColor="#4338ca"
          hoverTrailAmount={10}
          speed={0.5}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Products />
        <Press />
        <HowItWorks />
        <AITech />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </motion.div>
  );
};


export default InterviewCircleLanding;

