import React from "react";
import { IconVideo, IconVideoOff, IconMicrophone } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const VideoFeed = ({
  videoRef,
  isVideoOn,
  toggleVideo,
  initialType,
}) => {
  return (
    <div className={cn(
      "rounded-[32px] bg-slate-900/50 border border-white/5 relative group overflow-hidden shadow-2xl backdrop-blur-sm shrink-0 transition-all duration-500",
      initialType === 'behavioral' ? "flex-1" : "h-1/3"
    )}>
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
  );
};

export default VideoFeed;
