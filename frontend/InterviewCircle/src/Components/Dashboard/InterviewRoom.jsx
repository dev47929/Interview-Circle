import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSend,
  IconUser,
  IconRobot,
  IconLoader2,
  IconSettings,
  IconVideo,
  IconVideoOff,
  IconMicrophone,
  IconScreenShare,
  IconPhoneOff
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import Editor from "@monaco-editor/react";

const OPENROUTER_API_KEY = "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";

const InterviewRoom = () => {
  const location = useLocation();
  const { type: initialType, interview_id } = location.state || { type: 'behavioral', interview_id: 'demo' };

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm your AI Interviewer. We are starting your ${initialType} interview (ID: ${String(interview_id || '').substring(0, 8)}...).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);

  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const lastSpokenRef = useRef(-1);

  const toggleVideo = async () => {
    if (isVideoOn) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsVideoOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsVideoOn(true);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        alert("Could not access webcam. Please check permissions.");
      }
    }
  };

  const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "typescript", name: "TypeScript" },
  ];

  // ---------------- TTS LOGIC ----------------
  const speakMessage = (text) => {
    if (isMuted || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Try to find a male voice
    // Common male voice names: Microsoft David, Google US English (Male), Aaron, etc.
    const maleVoice = voices.find(voice =>
      voice.name.includes('David') ||
      voice.name.includes('Male') ||
      voice.name.includes('Mark') ||
      voice.name.includes('Daniel')
    ) || voices[0];

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speak initial message
  useEffect(() => {
    // Small timeout to ensure voices are loaded
    const timer = setTimeout(() => {
      if (messages.length === 1 && messages[0].role === 'assistant') {
        speakMessage(messages[0].content);
        lastSpokenRef.current = 0;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Speak subsequent AI messages
  useEffect(() => {
    const lastMessageIndex = messages.length - 1;
    if (lastMessageIndex > lastSpokenRef.current && messages[lastMessageIndex].role === 'assistant') {
      speakMessage(messages[lastMessageIndex].content);
      lastSpokenRef.current = lastMessageIndex;
    }
  }, [messages, isMuted]);

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const messageToSend = input.trim();
    const currentCode = code;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://app.totalchaos.online/ai/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          code: currentCode
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.reply;

      if (!aiResponse) {
        throw new Error("No AI response received");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } catch (error) {
      console.error("Local API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting to the interview service. Please ensure your local server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      {/* Left Half: Chatbot */}
      <div className="w-1/2 flex flex-col border-r border-white/10 bg-slate-900/40 backdrop-blur-3xl relative">
        {/* Chat Header */}
        <header className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <IconRobot size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">AI Interviewer</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-white/50 font-medium tracking-wide">Session Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) window.speechSynthesis.cancel();
              }}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                isMuted ? "bg-slate-800 border-white/5 text-slate-500" : "bg-indigo-600/20 border-indigo-500/30 text-indigo-400"
              )}
            >
              {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
              {initialType} Round
            </div>
            <IconSettings className="text-slate-400 cursor-pointer hover:text-white transition-colors" size={20} />
          </div>
        </header>

        {/* Chat Messages */}
        <main
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex w-full gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105",
                  msg.role === "user" ? "bg-indigo-600" : "bg-slate-800 border border-white/10"
                )}>
                  {msg.role === "user" ? <IconUser size={18} /> : <IconRobot size={18} />}
                </div>

                <div className={cn(
                  "max-w-[80%] flex flex-col",
                  msg.role === "user" ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-xl whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-slate-900 text-white/90 border border-white/5 rounded-tl-none backdrop-blur-md"
                  )}>
                    {msg.content}
                  </div>
                  {msg.timestamp && (
                    <span className="text-[10px] text-white/30 mt-1.5 px-1 font-medium tracking-wider">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                  <IconRobot size={18} />
                </div>
                <div className="bg-slate-900/50 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Chat Input */}
        <footer className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-xl">
          <form
            onSubmit={sendMessage}
            className="max-w-4xl mx-auto flex items-center gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response here..."
                disabled={isLoading}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20",
                input.trim() && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-slate-800 text-white/20 cursor-not-allowed"
              )}
            >
              {isLoading ? <IconLoader2 className="animate-spin" size={20} /> : <IconSend size={20} />}
            </button>
          </form>
          <div className="mt-3 flex justify-center gap-4 items-center opacity-30">
            <p className="text-[10px] uppercase tracking-widest font-black">AI Model: Nemotron-3</p>
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <p className="text-[10px] uppercase tracking-widest font-black">OpenRouter v1</p>
          </div>
        </footer>
      </div>

      {/* Right Half: Preview & Code Editor */}
      <div className="w-1/2 flex flex-col bg-slate-950 relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 h-full flex flex-col p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Interview <span className="text-indigo-400">Workspace</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                {jobTitle} Candidate Session
              </p>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-500/20 font-bold text-xs uppercase tracking-widest">
                <IconPhoneOff size={16} />
                End Session
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            {/* Video Feed */}
            <div className="h-1/3 rounded-[32px] bg-slate-900/50 border border-white/5 relative group overflow-hidden shadow-2xl backdrop-blur-sm shrink-0">
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300",
                isVideoOn ? "opacity-0 pointer-events-none" : "opacity-100"
              )}>
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-3 border border-white/5 shadow-inner">
                  <IconVideoOff size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-500 font-bold tracking-wider uppercase text-[10px]">Camera Disabled</p>
              </div>

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  isVideoOn ? "opacity-100" : "opacity-0"
                )}
              />
              
              {/* Overlay Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-950/60 backdrop-blur-2xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl scale-90 z-20">
                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group/btn">
                  <IconMicrophone size={18} className="text-slate-300 group-hover/btn:text-white" />
                </button>
                <button 
                  onClick={toggleVideo}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all group/btn",
                    isVideoOn ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
                  )}
                >
                  {isVideoOn ? <IconVideo size={18} /> : <IconVideoOff size={18} />}
                </button>
              </div>
            </div>

            {/* Monaco Code Editor */}
            <div className="flex-1 rounded-[32px] bg-[#1e1e1e] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Solution Editor</span>
                </div>
                
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/20 outline-none cursor-pointer hover:bg-indigo-500/20 transition-all uppercase tracking-wider"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id} className="bg-slate-900 text-white">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 20 },
                    scrollBeyondLastLine: false,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: "on"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;