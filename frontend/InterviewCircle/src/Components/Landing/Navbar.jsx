import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiChevronDown, FiX, FiMenu } from "react-icons/fi";
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <FiZap className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">InterviewCircle</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="group relative">
            <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              Products <FiChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
              <div className="space-y-4">
                <div className="hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
                  <p className="text-white font-medium text-sm">Technical Interviews</p>
                  <p className="text-slate-500 text-xs">Coding & System Design</p>
                </div>
                <div className="hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
                  <p className="text-white font-medium text-sm">Behavioral Prep</p>
                  <p className="text-slate-500 text-xs">STAR Method & EQ</p>
                </div>
              </div>
            </div>
          </div>
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#success" className="text-slate-300 hover:text-white transition-colors">Success Stories</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors font-medium">Log In</Link>
          <Link to="/signup">
            <Button>Start Your Free Interview</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 p-6 space-y-6">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-slate-300 text-lg">Products</a>
            <a href="#" className="text-slate-300 text-lg">Features</a>
            <a href="#" className="text-slate-300 text-lg">Pricing</a>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/login">
              <Button variant="outline" className="w-full">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full">Start Free Interview</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

