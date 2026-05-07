import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Components
import ChatInterface from "./components/ChatInterface";
import VideoFeed from "./components/VideoFeed";
import CodeWorkspace from "./components/CodeWorkspace";
import WorkspaceHeader from "./components/WorkspaceHeader";

const InterviewRoom = () => {
  const location = useLocation();
  const { type: initialType, interview_id } = location.state || { type: 'technical', interview_id: 'demo' };

  // State
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

  // Refs
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const lastSpokenRef = useRef(-1);

  const languages = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "typescript", name: "TypeScript" },
  ];

  // ---------------- Handlers ----------------
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

  const speakMessage = (text) => {
    if (isMuted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice =>
      voice.name.includes('David') ||
      voice.name.includes('Male') ||
      voice.name.includes('Mark') ||
      voice.name.includes('Daniel')
    ) || voices[0];
    if (maleVoice) utterance.voice = maleVoice;
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, code: currentCode }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const aiResponse = data.reply;
      if (!aiResponse) throw new Error("No AI response received");

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

  // ---------------- Effects ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 1 && messages[0].role === 'assistant') {
        speakMessage(messages[0].content);
        lastSpokenRef.current = 0;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lastMessageIndex = messages.length - 1;
    if (lastMessageIndex > lastSpokenRef.current && messages[lastMessageIndex].role === 'assistant') {
      speakMessage(messages[lastMessageIndex].content);
      lastSpokenRef.current = lastMessageIndex;
    }
  }, [messages, isMuted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      {/* Left Half: Chatbot */}
      <ChatInterface 
        messages={messages}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        initialType={initialType}
        scrollRef={scrollRef}
      />

      {/* Right Half: Preview & Code Editor */}
      <div className="w-1/2 flex flex-col bg-slate-950 relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 h-full flex flex-col p-8">
          <WorkspaceHeader jobTitle={jobTitle} />

          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            <VideoFeed 
              videoRef={videoRef}
              isVideoOn={isVideoOn}
              toggleVideo={toggleVideo}
              initialType={initialType}
            />

            {initialType !== 'behavioral' && (
              <CodeWorkspace 
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                languages={languages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;