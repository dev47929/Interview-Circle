import React from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiBell, 
  FiVideo, 
  FiCheckCircle, 
  FiZap, 
  FiArrowRight, 
  FiClock,
  FiUser,
  FiFileText,
  FiMail,
  FiCheck
} from "react-icons/fi";
import { IconPlus } from "@tabler/icons-react";

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
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

export default function Dashboard() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [reportStatus, setReportStatus] = React.useState("idle"); // idle, loading, success, error

  const handleGetReport = async () => {
    if (!email || !email.includes('@')) return;
    setReportStatus("loading");
    try {
      const response = await fetch("https://app.totalchaos.online/report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: email }),
      });
      if (response.ok) {
        setReportStatus("success");
        setTimeout(() => setReportStatus("idle"), 3000);
      } else {
        setReportStatus("error");
        setTimeout(() => setReportStatus("idle"), 3000);
      }
    } catch (error) {
      console.error(error);
      setReportStatus("error");
      setTimeout(() => setReportStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-transparent z-10 custom-scrollbar">
      {/* Topbar */}
      <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-slate-950/10 backdrop-blur-md sticky top-0 z-10">
        <div className="relative group w-96 hidden md:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search interviews, questions, feedback..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative">
            <FiBell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500">@{user?.handle || 'user'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white">
              {(user?.name || 'US').substring(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Good morning, <span className="text-indigo-400">{(user?.name || 'User').split(' ')[0]}!</span></h1>
            <p className="text-slate-300 text-sm font-medium">You have a mock interview scheduled for today at 2:00 PM.</p>
          </motion.div>
          <button 
            onClick={() => navigate('/setup')}
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(79,70,229,0.4)]"
          >
            <IconPlus size={22} /> START NEW INTERVIEW
          </button>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard label="Total Interviews" value="12" icon={FiVideo} color="indigo" trend="+2 this week" />
          <StatCard label="Avg. Score" value="84%" icon={FiCheckCircle} color="emerald" trend="+5% increase" />
          <StatCard label="Questions Solved" value="142" icon={FiZap} color="amber" trend="+12 today" />
          <StatCard label="Hours Practiced" value="28.5" icon={FiClock} color="purple" trend="+4.2h this week" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white tracking-tight">Recent Activity</h2>
              <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">View all</button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Senior Frontend Engineer Simulation", date: "Yesterday, 4:30 PM", score: 88, status: "Completed", type: "Technical" },
                { title: "Behavioral Prep (Google STAR Method)", date: "2 days ago", score: 92, status: "Completed", type: "Behavioral" },
                { title: "System Design: Scalable Chat App", date: "May 4, 2024", score: 74, status: "Review Needed", type: "Technical" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-slate-900/30 backdrop-blur-sm border border-white/5 p-6 rounded-[32px] flex items-center justify-between group hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      item.type === 'Technical' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      {item.type === 'Technical' ? <FiZap size={22} /> : <FiUser size={22} />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-0.5 group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-medium">{item.date} • {item.type}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="hidden sm:block">
                      <p className={`text-xl font-black ${item.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.score}%</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Score</p>
                    </div>
                    <FiArrowRight size={20} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Recommended for You</h2>
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -translate-y-1/2 translate-x-1/2" />
              <h4 className="text-2xl font-black mb-4 relative z-10 leading-tight">Master the <br/>STAR Method</h4>
              <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                Based on your last interview, you could improve your behavioral storytelling.
              </p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all relative z-10 shadow-lg">
                Try Module
              </button>
            </div>

            {/* ATS Score CTA */}
            <div
              className="bg-slate-900/30 border border-white/5 p-6 rounded-[32px] space-y-4 cursor-pointer group hover:border-indigo-500/30 transition-all"
              onClick={() => navigate('/resume-ats')}
            >
              <h4 className="text-white font-bold text-sm uppercase tracking-widest text-slate-500">Resume ATS</h4>
              <div className="flex items-center gap-4 p-5 bg-slate-950/50 rounded-2xl border border-white/5 group-hover:border-indigo-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <FiFileText size={24} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Check Your ATS Score</p>
                  <p className="text-slate-500 text-xs font-medium">Upload resume + job description</p>
                </div>
                <FiArrowRight size={16} className="ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Weekly Report CTA */}
            <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[32px] space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-all" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiMail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-tight">Weekly Performance Report</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Get insights in your inbox</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-slate-950 transition-all placeholder:text-slate-600"
                  />
                  {reportStatus === "success" && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-right-2">
                      <FiCheck /> Sent!
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleGetReport}
                  disabled={reportStatus === "loading" || !email}
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl",
                    reportStatus === "loading" ? "bg-slate-800 text-slate-500 cursor-not-allowed" : 
                    reportStatus === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                    reportStatus === "error" ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" :
                    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                  )}
                >
                  {reportStatus === "loading" ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : reportStatus === "success" ? "Report Sent Successfully" : 
                    reportStatus === "error" ? "Failed to Send Report" : 
                    "Send Weekly Report"}
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-600 font-medium">
                By clicking, you agree to receive a one-time automated email with your performance data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
