import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, 
  FiMicOff, 
  FiVideo, 
  FiVideoOff, 
  FiPhoneMissed, 
  FiMessageSquare,
  FiSettings,
  FiMaximize2,
  FiZap,
  FiClock,
  FiTerminal,
  FiAlertCircle
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const InterviewRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [transcript, setTranscript] = useState([
    { role: 'ai', text: "Hello Alex! I'm Sarah, your AI technical interviewer today. How are you feeling?" },
    { role: 'user', text: "Hi Sarah! I'm a bit nervous but excited to get started." },
    { role: 'ai', text: "That's perfectly normal. Let's start with a brief introduction. Can you tell me about your most recent project?" }
  ]);
  const [currentAiText, setCurrentAiText] = useState("Great! Now, let's dive into some technical questions. Can you explain the difference between virtual DOM and real DOM in React?");
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WebCam simulation
  useEffect(() => {
    if (videoRef.current && !isVideoOff) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Error accessing webcam:", err));
    }
  }, [isVideoOff]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Session</span>
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-2 text-slate-400">
            <FiClock size={16} />
            <span className="text-sm font-mono">{formatTime(timeLeft)} remaining</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            Technical: Frontend Engineering
          </div>
          <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors">
            <FiSettings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex p-6 gap-6 overflow-hidden">
        {/* Left Side: Interviewer & Transcript */}
        <div className="flex-grow flex flex-col gap-6">
          {/* AI Avatar Area */}
          <div className="flex-grow bg-slate-900 rounded-[40px] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            
            {/* AI Visual (Simulated) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-indigo-600/20 blur-[60px] animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                      <FiZap className="text-white" size={40} />
                    </div>
                    {/* Pulsing circles */}
                    <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Name Label */}
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-bold mb-1">Sarah</h3>
              <p className="text-indigo-400 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Senior Interviewer
              </p>
            </div>

            {/* AI Speech Bubble */}
            <div className="absolute bottom-8 right-8 max-w-md">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-600 p-6 rounded-[32px] rounded-br-none shadow-2xl relative"
              >
                <p className="text-white text-lg leading-relaxed">
                  {currentAiText}
                </p>
                {isAiThinking && (
                  <div className="flex gap-1 mt-3">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* User Video Feed (Small) */}
          <div className="h-48 flex gap-6">
            <div className="w-64 bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden relative">
              {isVideoOff ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <FiVideoOff size={32} className="text-slate-600" />
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover mirror"
                />
              )}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-slate-500' : 'bg-emerald-500'}`}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 px-2 py-0.5 rounded">You (Alex)</span>
              </div>
            </div>

            <div className="flex-grow bg-slate-900 rounded-[32px] border border-white/5 p-6 flex items-center gap-6">
              <div className="flex-grow">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-2">Real-time Analysis</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-bold text-white">82%</p>
                    <p className="text-[10px] text-slate-500 uppercase">Confidence</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">Stable</p>
                    <p className="text-[10px] text-slate-500 uppercase">Sentiment</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-indigo-400">9.2k</p>
                    <p className="text-[10px] text-slate-500 uppercase">Vocabulary Rank</p>
                  </div>
                </div>
              </div>
              <button className="h-full px-8 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                <FiMessageSquare size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Transcript</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Technical Panel / Dashboard Sidebar */}
        <div className="w-96 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-[40px] border border-white/5 flex-grow p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-white flex items-center gap-2">
                <FiTerminal className="text-indigo-400" /> Interview Log
              </h3>
              <span className="text-[10px] bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded font-bold">LIVE</span>
            </div>

            <div className="flex-grow space-y-6 overflow-y-auto">
              {transcript.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                  <span className="text-[10px] text-slate-600 uppercase font-bold mb-1 ml-1">{msg.role}</span>
                  <p className={`text-sm p-4 rounded-2xl ${
                    msg.role === 'ai' 
                      ? 'bg-slate-800 text-slate-300 rounded-tl-none' 
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
                <FiAlertCircle className="text-amber-500 shrink-0" size={18} />
                <p className="text-xs text-amber-200/70 leading-relaxed">
                  <span className="text-amber-400 font-bold">Pro Tip:</span> Try to mention "Time Complexity" when explaining your algorithm choices.
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-slate-900 rounded-[32px] border border-white/5 p-4 flex justify-between gap-4 shadow-2xl">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`flex-grow h-14 rounded-2xl flex items-center justify-center transition-all ${
                isMuted ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isMuted ? <FiMicOff size={22} /> : <FiMic size={22} />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`flex-grow h-14 rounded-2xl flex items-center justify-center transition-all ${
                isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isVideoOff ? <FiVideoOff size={22} /> : <FiVideo size={22} />}
            </button>
            <button 
              onClick={() => navigate('/feedback')}
              className="flex-grow h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg shadow-red-600/20"
            >
              <FiPhoneMissed size={22} />
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewRoom;
