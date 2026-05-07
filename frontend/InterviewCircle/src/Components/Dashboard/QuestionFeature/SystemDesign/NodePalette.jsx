import React from 'react';
import { 
  FiServer, 
  FiDatabase, 
  FiGlobe, 
  FiLayers, 
  FiBox, 
  FiActivity, 
  FiSmartphone, 
  FiMonitor,
  FiHardDrive,
  FiShare2,
  FiCpu
} from "react-icons/fi";

const paletteItems = [
  { type: 'loadBalancer', label: 'Load Balancer', icon: FiShare2, color: 'text-emerald-400' },
  { type: 'cdn', label: 'CDN', icon: FiGlobe, color: 'text-sky-400' },
  { type: 'apiGateway', label: 'API Gateway', icon: FiLayers, color: 'text-purple-400' },
  { type: 'apiServer', label: 'API Server', icon: FiServer, color: 'text-indigo-400' },
  { type: 'microservice', label: 'Microservice', icon: FiBox, color: 'text-violet-400' },
  { type: 'database', label: 'SQL DB', icon: FiDatabase, color: 'text-amber-400' },
  { type: 'nosql', label: 'NoSQL DB', icon: FiDatabase, color: 'text-orange-400' },
  { type: 'cache', label: 'Redis Cache', icon: FiActivity, color: 'text-rose-400' },
  { type: 'queue', label: 'Queue/Kafka', icon: FiCpu, color: 'text-cyan-400' },
  { type: 'storage', label: 'Object Storage', icon: FiHardDrive, color: 'text-yellow-400' },
  { type: 'webClient', label: 'Web Client', icon: FiMonitor, color: 'text-slate-400' },
  { type: 'mobileApp', label: 'Mobile App', icon: FiSmartphone, color: 'text-slate-400' },
];

const NodePalette = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-slate-900 border-l border-white/10 w-64 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Architecture Palette</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {paletteItems.map((item) => (
            <div
              key={item.type}
              className="group flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing"
              onDragStart={(event) => onDragStart(event, item.type)}
              draggable
            >
              <item.icon className={`${item.color} mb-2 group-hover:scale-110 transition-transform`} size={20} />
              <span className="text-[10px] font-bold text-slate-400 text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-black/20 border-t border-white/10">
        <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
          Drag and drop components onto the canvas to build your system.
        </p>
      </div>
    </div>
  );
};

export default NodePalette;
