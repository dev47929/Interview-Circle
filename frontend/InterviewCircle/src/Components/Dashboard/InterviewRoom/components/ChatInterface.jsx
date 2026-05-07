import "regenerator-runtime/runtime";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSend,
  IconUser,
  IconRobot,
  IconLoader2,
  IconSettings,
  IconVolume,
  IconVolumeOff,
  IconMicrophone,
  IconMicrophoneOff,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatInterface = ({
  messages,
  isLoading,
  input,
  setInput,
  sendMessage,
  isMuted,
  setIsMuted,
  initialType,
  scrollRef,
}) => {
  // ---------------- SPEECH RECOGNITION ----------------

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Debugging logs
  useEffect(() => {
    console.log("Speech Recognition Status:", {
      listening,
      transcript,
      interimTranscript,
      finalTranscript,
      browserSupportsSpeechRecognition,
      isMicrophoneAvailable
    });
  }, [listening, transcript, interimTranscript, finalTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  // Live transcript update
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  const [shouldSend, setShouldSend] = useState(false);

  // Auto-send effect: triggers when listening stops and shouldSend is true
  useEffect(() => {
    if (!listening && shouldSend) {
      if (transcript.trim()) {
        sendMessage();
      }
      setShouldSend(false);
    }
  }, [listening, shouldSend, transcript, sendMessage]);

  // Toggle microphone
  const toggleMic = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech Recognition is not supported in this browser. Please try Chrome.");
      return;
    }

    if (!isMicrophoneAvailable) {
      alert("Microphone is not available or permission denied.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setShouldSend(true);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-US",
      });
    }
  }, [listening, browserSupportsSpeechRecognition, isMicrophoneAvailable, resetTranscript]);

  // Spacebar toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !e.repeat) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          e.preventDefault();
          toggleMic();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMic]);

  // ---------------- UI ----------------

  return (
    <div className="w-1/2 flex flex-col border-r border-white/10 bg-slate-900/40 backdrop-blur-3xl relative">
      {/* HEADER */}

      <header className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <IconRobot
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h2 className="font-bold text-lg text-white">
              AI Interviewer
            </h2>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <span className="text-xs text-white/50 font-medium tracking-wide">
                Session Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* MUTE BUTTON */}

          <button
            onClick={() => {
              setIsMuted(!isMuted);

              if (!isMuted) {
                window.speechSynthesis.cancel();
              }
            }}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
              isMuted
                ? "bg-slate-800 border-white/5 text-slate-500"
                : "bg-indigo-600/20 border-indigo-500/30 text-indigo-400"
            )}
          >
            {isMuted ? (
              <IconVolumeOff size={20} />
            ) : (
              <IconVolume size={20} />
            )}
          </button>

          {/* ROUND TYPE */}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            {initialType} Round
          </div>

          {/* SETTINGS */}

          <IconSettings
            className="text-slate-400 cursor-pointer hover:text-white transition-colors"
            size={20}
          />
        </div>
      </header>

      {/* CHAT MESSAGES */}

      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={cn(
                "flex w-full gap-3",
                msg.role === "user"
                  ? "flex-row-reverse"
                  : "flex-row"
              )}
            >
              {/* AVATAR */}

              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                  msg.role === "user"
                    ? "bg-indigo-600"
                    : "bg-slate-800 border border-white/10"
                )}
              >
                {msg.role === "user" ? (
                  <IconUser size={18} />
                ) : (
                  <IconRobot size={18} />
                )}
              </div>

              {/* MESSAGE */}

              <div
                className={cn(
                  "max-w-[80%] flex flex-col",
                  msg.role === "user"
                    ? "items-end"
                    : "items-start"
                )}
              >
                <div
                  className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-xl whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-slate-900 text-white/90 border border-white/5 rounded-tl-none backdrop-blur-md"
                  )}
                >
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

          {/* LOADING */}

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
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />

                  <span
                    className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
                    style={{
                      animationDelay: "150ms",
                    }}
                  />

                  <span
                    className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"
                    style={{
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* INPUT */}

      <footer className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-xl relative">
        {/* LISTENING BADGE */}

        {listening && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-600 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-rose-500/40 z-20"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />

            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Listening...
            </span>
          </motion.div>
        )}

        <form
          onSubmit={sendMessage}
          className="max-w-4xl mx-auto flex items-center gap-3"
        >
          {/* INPUT */}

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder={
              listening
                ? "Listening..."
                : "Type your response..."
            }
            disabled={isLoading}
            className={cn(
              "w-full bg-slate-900 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20 disabled:opacity-50"
            )}
          />

          {/* MIC BUTTON */}

          <button
            type="button"
            onClick={toggleMic}
            className={cn(
              "p-4 rounded-2xl transition-all flex items-center justify-center",
              listening
                ? "bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-500/40"
                : "bg-slate-800 text-white hover:bg-slate-700"
            )}
          >
            {listening ? (
              <IconMicrophoneOff size={20} />
            ) : (
              <IconMicrophone size={20} />
            )}
          </button>

          {/* SEND BUTTON */}

          <button
            id="chat-submit-btn"
            type="submit"
            disabled={
              isLoading ||
              !input.trim()
            }
            className={cn(
              "p-4 rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20",
              input.trim() &&
                !isLoading
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-slate-800 text-white/20 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <IconLoader2
                className="animate-spin"
                size={20}
              />
            ) : (
              <IconSend size={20} />
            )}
          </button>
        </form>

        {/* FOOTER */}

        <div className="mt-3 flex justify-center gap-4 items-center opacity-30">
          <p className="text-[10px] uppercase tracking-widest font-black">
            AI Model: llama-3-8b
          </p>

          <div className="w-1 h-1 rounded-full bg-white/50" />

          <p className="text-[10px] uppercase tracking-widest font-black">
            OpenRouter v1
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChatInterface;