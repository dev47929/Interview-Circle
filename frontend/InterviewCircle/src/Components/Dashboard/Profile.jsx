import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { user } = useOutletContext();

  if (!user) return null;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
            <div className="absolute -bottom-16 left-12">
              <div className="w-32 h-32 rounded-3xl bg-indigo-600 border-4 border-slate-950 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="pt-20 pb-12 px-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">{user.name}</h2>
                <p className="text-indigo-400 font-bold">@{user.handle}</p>
              </div>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-white font-bold transition-all">
                Edit Profile
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mt-12">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Account Type</p>
                <p className="text-emerald-400 font-bold uppercase text-xs px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20 w-fit">Premium</p>
              </div>
            </div>

            <div className="mt-16 space-y-6">
              <h3 className="text-xl font-bold text-white">Activity Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Interviews</p>
                  <p className="text-2xl font-black text-white">12</p>
                </div>
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Avg Score</p>
                  <p className="text-2xl font-black text-emerald-400">84%</p>
                </div>
                <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">XP Points</p>
                  <p className="text-2xl font-black text-indigo-400">2,450</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
