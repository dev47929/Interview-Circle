import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiZap } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion';
import LandingBackground from '../React-bits/LandingBackground';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden"
    >

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <LandingBackground 
          squareSize={50}
          borderColor="#312e81"
          hoverFillColor="#4338ca"
          hoverTrailAmount={10}
          speed={0.5}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiZap className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">InterviewCircle</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Continue your journey to your dream job</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiMail size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiLock size={20} />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25">
              Sign In <FiArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-4 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white py-3 rounded-2xl transition-all active:scale-[0.98]">
              <FaGoogle className="text-red-500" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white py-3 rounded-2xl transition-all active:scale-[0.98]">
              <FaGithub />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          <p className="text-center mt-10 text-slate-400 text-sm">
            Don't have an account? {' '}
            <Link to="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};


export default Login;
