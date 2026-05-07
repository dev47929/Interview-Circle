import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight, FiZap, FiCheckCircle, FiAtSign, FiLoader } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    email: '',
    password: '',
    role: 'user' // default empty as requested
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://app.totalchaos.online/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed. Please try again.');
      }

      console.log("Signup successful:", data);
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10 grid lg:grid-cols-5 gap-0 overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl"
      >
        {/* Left Side - Info */}
        <div className="lg:col-span-2 bg-indigo-600 p-10 text-white hidden lg:flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-12">
              <FiZap className="text-white fill-current" size={24} />
              <span className="text-xl font-bold tracking-tight">InterviewCircle</span>
            </Link>
            
            <h2 className="text-3xl font-bold mb-6 leading-tight">Start Your Success Journey Today.</h2>
            
            <ul className="space-y-6">
              {[
                "Unlimited AI Mock Interviews",
                "Personalized Real-time Feedback",
                "Industry-specific Question Banks",
                "Advanced Sentiment Analysis"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-indigo-100 text-sm">
                  <FiCheckCircle className="text-indigo-200" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10 pt-10 border-t border-white/10">
            <p className="text-sm text-indigo-100 italic">"This platform helped me land my Senior Role at Meta in just 4 weeks."</p>
            <p className="mt-2 font-bold text-xs uppercase tracking-widest text-indigo-200">— David K., Software Engineer</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-3 p-8 md:p-12">
          <div className="mb-10 lg:hidden text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <FiZap className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">InterviewCircle</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm">Join 500K+ professionals worldwide</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs mb-6 flex items-center gap-2">
              <FiZap className="shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FiUser size={16} />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FiAtSign size={16} />
                  </div>
                  <input 
                    type="text" 
                    name="handle"
                    required
                    value={formData.handle}
                    onChange={handleChange}
                    placeholder="johndoe"
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiMail size={16} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiLock size={16} />
                </div>
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" required className="mt-1 accent-indigo-600" id="terms" />
              <label htmlFor="terms" className="text-[10px] text-slate-500 leading-relaxed">
                By signing up, you agree to our <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button 
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25 mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? <FiLoader className="animate-spin" size={20} /> : "CREATE ACCOUNT"} <FiArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-slate-950 px-4 text-slate-500 font-bold">Or register with</span>
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

          <p className="text-center mt-8 text-slate-400 text-sm">
            Already have an account? {' '}
            <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
