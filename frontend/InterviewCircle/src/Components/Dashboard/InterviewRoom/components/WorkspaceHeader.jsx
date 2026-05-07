import React from "react";
import { IconPhoneOff } from "@tabler/icons-react";

const WorkspaceHeader = ({ jobTitle }) => {
  return (
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
  );
};

export default WorkspaceHeader;
