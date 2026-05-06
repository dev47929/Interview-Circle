import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiVideo, 
  FiBarChart2, 
  FiSettings, 
  FiLogOut, 
  FiSearch, 
  FiBell, 
  FiUser,
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiZap,
  FiArrowRight,
  FiCalendar
} from "react-icons/fi";
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-[32px]">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
        <Icon size={24} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400`}>
        {trend}
      </span>
    </div>
    <p className="text-slate-400 text-sm mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-white">{value}</h3>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-950 flex font-sans"
    >
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-6 flex flex-col hidden lg:flex fixed h-full bg-slate-950 z-20">
        <Link to="/" className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <FiZap className="text-white fill-current" size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">InterviewCircle</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          <SidebarItem icon={FiHome} label="Dashboard" active={activeTab === 'Home'} onClick={() => { setActiveTab('Home'); navigate('/dashboard'); }} />
          <SidebarItem icon={FiBookOpen} label="Question Bank" active={activeTab === 'Questions'} onClick={() => { setActiveTab('Questions'); navigate('/questions'); }} />
          <SidebarItem icon={FiVideo} label="My Interviews" active={activeTab === 'Interviews'} onClick={() => setActiveTab('Interviews')} />
          <SidebarItem icon={FiBarChart2} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
          <SidebarItem icon={FiCalendar} label="Schedule" active={activeTab === 'Schedule'} onClick={() => setActiveTab('Schedule')} />
          <SidebarItem icon={FiUser} label="My Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
        </nav>


        <div className="pt-6 border-t border-white/5 space-y-2">
          <SidebarItem icon={FiSettings} label="Settings" active={activeTab === 'Settings'} onClick={() => { setActiveTab('Settings'); navigate('/settings'); }} />
          <SidebarItem icon={FiLogOut} label="Log Out" />
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="relative group w-96 hidden md:block">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search interviews, questions, feedback..."
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">Alex Johnson</p>
                <p className="text-xs text-slate-500">Premium Plan</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white">
                AJ
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Good morning, Alex!</h1>
              <p className="text-slate-400 text-sm">You have a mock interview scheduled for today at 2:00 PM.</p>
            </div>
            <Link to="/setup">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25">
                <FiPlus size={20} /> Start New Interview
              </button>
            </Link>
          </div>


          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Interviews" value="12" icon={FiVideo} color="indigo" trend="+2 this week" />
            <StatCard label="Avg. Score" value="84%" icon={FiCheckCircle} color="emerald" trend="+5% increase" />
            <StatCard label="Questions Solved" value="142" icon={FiZap} color="amber" trend="+12 today" />
            <StatCard label="Hours Practiced" value="28.5" icon={FiClock} color="purple" trend="+4.2h this week" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">View all</button>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Senior Frontend Engineer Simulation", date: "Yesterday, 4:30 PM", score: 88, status: "Completed", type: "Technical" },
                  { title: "Behavioral Prep (Google STAR Method)", date: "2 days ago", score: 92, status: "Completed", type: "Behavioral" },
                  { title: "System Design: Scalable Chat App", date: "May 4, 2024", score: 74, status: "Review Needed", type: "Technical" }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/50 border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-indigo-500/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        item.type === 'Technical' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {item.type === 'Technical' ? <FiZap size={20} /> : <FiUser size={20} />}
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-0.5">{item.title}</h4>
                        <p className="text-slate-500 text-xs">{item.date} • {item.type}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div className="hidden sm:block">
                        <p className={`text-lg font-bold ${item.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.score}%</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Score</p>
                      </div>
                      <FiArrowRight size={20} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming / Recommendations */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Recommended for You</h2>
              <div className="bg-indigo-600 rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -translate-y-1/2 translate-x-1/2" />
                <h4 className="text-xl font-bold mb-4 relative z-10">Master the STAR Method</h4>
                <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed">
                  Based on your last interview, you could improve your behavioral storytelling.
                </p>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all relative z-10">
                  Try Module
                </button>
              </div>

              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[32px] space-y-4">
                <h4 className="text-white font-bold">Upcoming Schedule</h4>
                <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <FiClock size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Today, 2:00 PM</p>
                    <p className="text-slate-500 text-xs">Meta Mock Interview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;
