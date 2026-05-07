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
  FiClock,
  FiTerminal,
  FiAlertCircle,
  FiZap,
  FiPlay,
  FiCode,
  FiUser
} from "react-icons/fi";
import { useNavigate, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const InterviewRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State from navigation - ensure we handle both cases correctly
  const state = location.state || {};
  const interview_id = state.interview_id || 'demo-id';
  const type = state.type || 'technical'; // fallback to behavioral
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hello! I'm Sarah, your AI ${type} interviewer today. How are you feeling?` }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  
  // Technical Room States
  const [code, setCode] = useState("// Write your code here\n\nfunction solution() {\n  console.log('Hello World');\n}");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WebCam
  useEffect(() => {
    if (videoRef.current && !isVideoOff) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Error accessing webcam:", err));
    }
  }, [isVideoOff]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscription(transcript);
      };

      recognitionRef.current.onend = () => {
        if (isRecording && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) {}
        }
      };
    }
  }, [isRecording]);

  // Keyboard Shortcut for PTT
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isRecording && document.activeElement.tagName !== 'TEXTAREA' && !document.activeElement.classList.contains('inputarea')) {
        e.preventDefault();
        startRecording();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isRecording) {
        e.preventDefault();
        stopRecording();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      setTranscription("");
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  };

  const stopRecording = async () => {
    if (recognitionRef.current && isRecording) {
      setIsRecording(false);
      recognitionRef.current.stop();
      
      if (transcription.trim()) {
        const userMessage = transcription;
        addMessage('user', userMessage);
        setTranscription("");
        await getAiResponse(userMessage);
      }
    }
  };

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const getAiResponse = async (userMessage) => {
    setIsAiThinking(true);
    try {
      // Mock API call
      setTimeout(() => {
        const responses = [
          `That's a great point about ${userMessage.split(' ').slice(-3).join(' ')}. How would you apply that in a team setting?`,
          `Interesting. Can you walk me through a specific example where you used that approach?`,
          `I see. What were the biggest challenges you faced while doing that?`,
          `Correct. Now, let's shift gears a bit and talk about your experience with scalability.`
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('ai', randomResponse);
        setIsAiThinking(false);
      }, 1500);

    } catch (error) {
      console.error("Error getting AI response:", error);
      addMessage('ai', "I'm sorry, I'm having trouble connecting. Could you please repeat that?");
      setIsAiThinking(false);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Executing code...");
    try {
      setTimeout(() => {
        setOutput("Hello World\n\n[Execution Successful]\nTime: 0.1s\nMemory: 12MB");
        setIsRunning(false);
      }, 1000);
    } catch (error) {
      setOutput("Error executing code. Please try again.");
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Helper to render AI visual
  const renderAiVisual = (isSmall = false) => (
    <div className={`relative bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden flex flex-col ${isSmall ? 'h-64' : 'flex-grow'}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
      
      {/* AI Visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className={`${isSmall ? 'w-32 h-32' : 'w-64 h-64'} rounded-full bg-indigo-600/10 blur-[80px] ${isAiThinking ? 'animate-pulse' : ''}`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${isSmall ? 'w-24 h-24' : 'w-40 h-40'} rounded-full border-4 border-indigo-500/20 flex items-center justify-center relative`}>
              <div className={`${isSmall ? 'w-16 h-16' : 'w-28 h-28'} rounded-full bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50 relative z-10`}>
                <FiZap className="text-white" size={isSmall ? 24 : 48} />
              </div>
              {isAiThinking && (
                <>
                  <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-30"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-8">
        <h3 className={`${isSmall ? 'text-xl' : 'text-3xl'} font-black mb-1 text-white tracking-tight`}>Sarah</h3>
        <p className="text-indigo-400 text-[10px] font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Senior AI Interviewer
        </p>
      </div>

      {/* Latest AI Message Bubble */}
      <div className={`absolute bottom-6 right-8 max-w-[70%]`}>
        <AnimatePresence mode="wait">
          {messages.filter(m => m.role === 'ai').slice(-1).map((msg, i) => (
            <motion.div 
              key={msg.text}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`bg-indigo-600 ${isSmall ? 'p-4 rounded-2xl' : 'p-6 rounded-[32px]'} rounded-br-none shadow-2xl relative border border-white/10`}
            >
              <p className={`text-white ${isSmall ? 'text-xs' : 'text-lg'} font-medium leading-relaxed tracking-tight`}>
                {isSmall && msg.text.length > 60 ? msg.text.substring(0, 60) + '...' : msg.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md z-10">
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
          <div className="px-4 py-1.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            {type.toUpperCase()} INTERVIEW
          </div>
          <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors">
            <FiSettings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex p-4 gap-4 overflow-hidden">
        
        {/* Technical Layout: Editor in focus, AI shifted */}
        {type === 'technical' ? (
          <>
            {/* Left: Code Editor (Main) */}
            <div className="flex-[3] flex flex-col gap-4">
              <div className="flex-grow flex flex-col bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden">
                <div className="h-12 border-b border-white/5 px-6 flex items-center justify-between bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <FiCode className="text-indigo-400" />
                    <span className="text-sm font-bold text-slate-300">Solution.js</span>
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-slate-800 border-none text-[10px] uppercase font-bold tracking-widest text-slate-400 rounded-md px-2 py-1 outline-none cursor-pointer hover:bg-slate-700 transition-colors"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  <button 
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-all active:scale-95"
                  >
                    {isRunning ? <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" /> : <FiPlay size={14} />}
                    Run Code
                  </button>
                </div>
                <div className="flex-grow relative border-b border-white/5">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    language={language}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: true,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 20 },
                      backgroundColor: '#0f172a'
                    }}
                  />
                </div>
                <div className="h-40 bg-slate-950 p-5 overflow-y-auto font-mono text-sm custom-scrollbar">
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                    <FiTerminal size={12} /> Execution Output
                  </div>
                  <pre className={`text-slate-300 whitespace-pre-wrap ${isRunning ? 'opacity-50' : ''}`}>
                    {output || "No output yet. Click 'Run Code' to see results."}
                  </pre>
                </div>
              </div>
              
              {/* Bottom: Voice Input (Horizontal) */}
              <div className="h-32 flex gap-4">
                 <div className="w-48 bg-slate-900 rounded-[24px] border border-white/5 overflow-hidden relative shrink-0">
                    {isVideoOff ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <FiVideoOff size={24} className="text-slate-600" />
                      </div>
                    ) : (
                      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" />
                    )}
                 </div>
                 <div className={`flex-grow bg-slate-900 rounded-[24px] border border-white/5 p-4 flex items-center gap-6 relative overflow-hidden transition-all duration-500 ${isRecording ? 'border-red-500/30' : 'border-white/5'}`}>
                    {isRecording && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent flex items-center px-8 gap-1.5 pointer-events-none">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-1 bg-red-500 rounded-full animate-voice-wave" style={{ height: '15px', animationDelay: `${i * 0.15}s` }}></div>
                        ))}
                      </div>
                    )}
                    <button 
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-xl ${
                        isRecording ? 'bg-red-500 scale-110 shadow-red-500/40' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                      }`}
                    >
                      <FiMic size={24} className="text-white" />
                    </button>
                    <div className="flex-grow">
                       <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isRecording ? 'text-red-400' : 'text-slate-500'}`}>
                          {isRecording ? "Listening..." : "Voice Control (Hold Space)"}
                       </p>
                       <p className="text-[11px] text-slate-300 italic line-clamp-2">
                          {transcription || (isRecording ? "Processing..." : "Ask questions or explain your code out loud.")}
                       </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: AI Visual + Transcript */}
            <div className="flex-1 flex flex-col gap-4">
              {renderAiVisual(true)}
              <div className="flex-grow bg-slate-900 rounded-[32px] border border-white/5 p-5 flex flex-col overflow-hidden shadow-xl">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-[11px] flex items-center gap-2 uppercase tracking-widest">
                       <FiMessageSquare className="text-indigo-400" /> Transcript
                    </h3>
                 </div>
                 <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                        <div className={`text-[10px] p-3 rounded-xl leading-relaxed ${
                          msg.role === 'ai' ? 'bg-slate-800 text-slate-300 border border-white/5' : 'bg-indigo-600 text-white'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isAiThinking && (
                      <div className="flex gap-1.5 p-3">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                    )}
                 </div>
              </div>
              <div className="h-14 rounded-2xl bg-slate-900 border border-white/5 p-2 flex gap-2">
                 <button onClick={() => setIsVideoOff(!isVideoOff)} className="flex-grow rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
                    {isVideoOff ? <FiVideoOff size={18} /> : <FiVideo size={18} />}
                 </button>
                 <button onClick={() => navigate('/feedback')} className="flex-grow rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white flex items-center justify-center">
                    <FiPhoneMissed size={18} />
                 </button>
              </div>
            </div>
          </>
        ) : (
          /* Behavioural Layout: AI in focus */
          <>
            <div className="flex-[2] flex flex-col gap-4">
               {renderAiVisual(false)}
               
               {/* User Controls Bottom */}
               <div className="h-44 flex gap-4">
                  <div className="w-64 bg-slate-900 rounded-[32px] border border-white/5 overflow-hidden relative group">
                    {!isVideoOff ? <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" /> : <div className="flex h-full items-center justify-center bg-slate-800"><FiVideoOff size={32} className="text-slate-600" /></div>}
                    <div className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-widest text-white bg-black/50 px-3 py-1 rounded-full border border-white/10">Candidate</div>
                  </div>
                  <div className={`flex-grow bg-slate-900 rounded-[32px] border border-white/5 p-6 flex flex-col justify-center items-center gap-4 relative overflow-hidden transition-all duration-500 ${isRecording ? 'border-red-500/30' : 'border-white/5'}`}>
                     {isRecording && (
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent flex items-center justify-center gap-2 pointer-events-none">
                         {[1,2,3,4,5,6].map(i => (
                           <div key={i} className="w-1.5 bg-red-500 rounded-full animate-voice-wave" style={{ height: '25px', animationDelay: `${i * 0.12}s` }}></div>
                         ))}
                       </div>
                     )}
                     <button onMouseDown={startRecording} onMouseUp={stopRecording} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${isRecording ? 'bg-red-500 scale-110 shadow-red-500/40' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'}`}>
                        <FiMic size={32} className="text-white" />
                     </button>
                     <div className="text-center">
                        <p className={`text-xs font-bold uppercase tracking-widest ${isRecording ? 'text-red-400' : 'text-slate-400'}`}>{isRecording ? "Listening..." : "Hold SPACE to talk"}</p>
                        <p className="text-[11px] text-slate-300 italic h-4 overflow-hidden">{transcription}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Transcript Sidebar */}
            <div className="w-80 flex flex-col gap-4 shrink-0">
               <div className="bg-slate-900 rounded-[40px] border border-white/5 flex-grow p-6 flex flex-col overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2"><FiMessageSquare className="text-indigo-400" /> Session Feed</h3>
                    <span className="text-[8px] text-indigo-400 px-2 py-0.5 rounded font-black tracking-widest bg-indigo-500/10 border border-indigo-500/20 uppercase">Live</span>
                  </div>
                  <div className="flex-grow space-y-5 overflow-y-auto pr-2 custom-scrollbar flex flex-col">
                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'}`}>
                        <div className={`text-[11px] p-4 rounded-2xl leading-relaxed shadow-lg ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5' : 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/20'}`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isAiThinking && (
                      <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex gap-1.5 border border-white/5 w-fit">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                    )}
                  </div>
               </div>
               <div className="bg-slate-900 rounded-[32px] border border-white/5 p-3 flex justify-between gap-3 shadow-2xl">
                  <button onClick={() => setIsVideoOff(!isVideoOff)} className={`flex-grow h-14 rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}><FiVideoOff size={22} /></button>
                  <button onClick={() => navigate('/feedback')} className="flex-grow h-14 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"><FiPhoneMissed size={22} /></button>
               </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default InterviewRoom;
