import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap, 
  applyEdgeChanges, 
  applyNodeChanges,
  Panel,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './CustomNodes';
import { FiSave, FiTrash2, FiRotateCcw, FiRotateCw, FiZap } from 'react-icons/fi';

const initialNodes = [];
const initialEdges = [];

const DesignCanvas = ({ questionId }) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isHelpExpanded, setIsHelpExpanded] = useState(true);

  // Undo/Redo state
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => {
      console.log('Connecting:', params);
      setEdges((eds) => addEdge({ 
        ...params, 
        animated: true, 
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#6366f1',
        },
        style: { stroke: '#6366f1', strokeWidth: 2 } 
      }, eds));
    },
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const saveDiagram = useCallback(async () => {
    const payload = {
      questionId,
      diagram: { nodes, edges }
    };
    console.log('Autosaving diagram:', payload);
    // Mock API call
    // try {
    //   await fetch('/api/system-design/save', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload)
    //   });
    // } catch (e) { console.error(e); }
  }, [nodes, edges, questionId]);

  useEffect(() => {
    const interval = setInterval(saveDiagram, 30000); // Autosave every 30s
    return () => clearInterval(interval);
  }, [saveDiagram]);

  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      setNodes([]);
      setEdges([]);
    }
  };

  return (
    <div className="flex-1 h-full relative bg-[#0b0e14]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        theme="dark"
      >
        <Background color="#1e293b" gap={20} />
        <Controls className="horizontal-controls bg-slate-900 border-white/10" />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'database': return '#f59e0b';
              case 'apiServer': return '#6366f1';
              case 'loadBalancer': return '#10b981';
              default: return '#334155';
            }
          }}
          maskColor="rgba(15, 23, 42, 0.7)"
          className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden"
        />
        <Panel 
          position="top-left" 
          onClick={() => setIsHelpExpanded(!isHelpExpanded)}
          className={`bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden z-50 ${
            isHelpExpanded ? 'p-4 rounded-2xl max-w-[200px]' : 'p-3 rounded-full w-10 h-10 flex items-center justify-center'
          }`}
        >
          <AnimatePresence mode="wait">
            {isHelpExpanded ? (
              <motion.div 
                key="expanded"
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiZap className="text-amber-400" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Architecture Tip</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  Drag from the <span className="text-indigo-400 font-bold underline underline-offset-4 decoration-indigo-500/50">Indigo Dots</span> on any service to create animated data flow arrows.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <FiZap className="text-amber-400" size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
        <Panel position="top-right" className="flex gap-2">
          <button 
            onClick={saveDiagram}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg transition-all"
            title="Save Manual"
          >
            <FiSave size={16} />
          </button>
          <button 
            onClick={clearCanvas}
            className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-lg transition-all"
            title="Clear All"
          >
            <FiTrash2 size={16} />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default DesignCanvas;
