import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  FiServer, 
  FiDatabase, 
  FiCpu, 
  FiGlobe, 
  FiLayers, 
  FiShield, 
  FiBox, 
  FiActivity, 
  FiSmartphone, 
  FiMonitor,
  FiHardDrive,
  FiShare2
} from "react-icons/fi";

const NodeWrapper = ({ children, label, icon: Icon, color, selected }) => (
  <div className={`px-4 py-3 rounded-xl border-2 bg-slate-900 shadow-2xl transition-all group ${
    selected ? 'border-indigo-500 ring-4 ring-indigo-500/20' : 'border-white/10'
  } min-w-[150px]`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
        <Icon className={color.replace('bg-', 'text-')} size={18} />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
    <div className="text-sm font-bold text-white truncate">
      {children}
    </div>
    <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-500 border-2 border-slate-900 opacity-30 group-hover:opacity-100 transition-opacity" />
    <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-slate-900 opacity-30 group-hover:opacity-100 transition-opacity" />
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-indigo-500 border-2 border-slate-900 opacity-30 group-hover:opacity-100 transition-opacity" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500 border-2 border-slate-900 opacity-30 group-hover:opacity-100 transition-opacity" />
  </div>
);

export const LoadBalancerNode = memo(({ data, selected }) => (
  <NodeWrapper label="Load Balancer" icon={FiShare2} color="bg-emerald-500" selected={selected}>
    {data.label || 'nginx-lb'}
  </NodeWrapper>
));

export const CDNNode = memo(({ data, selected }) => (
  <NodeWrapper label="CDN" icon={FiGlobe} color="bg-sky-500" selected={selected}>
    {data.label || 'Cloudflare'}
  </NodeWrapper>
));

export const APIGatewayNode = memo(({ data, selected }) => (
  <NodeWrapper label="API Gateway" icon={FiLayers} color="bg-purple-500" selected={selected}>
    {data.label || 'Kong/AWS'}
  </NodeWrapper>
));

export const ServerNode = memo(({ data, selected }) => (
  <NodeWrapper label="API Server" icon={FiServer} color="bg-indigo-500" selected={selected}>
    {data.label || 'Node/Go Server'}
  </NodeWrapper>
));

export const MicroserviceNode = memo(({ data, selected }) => (
  <NodeWrapper label="Microservice" icon={FiBox} color="bg-violet-500" selected={selected}>
    {data.label || 'Payment Service'}
  </NodeWrapper>
));

export const DatabaseNode = memo(({ data, selected }) => (
  <NodeWrapper label="SQL Database" icon={FiDatabase} color="bg-amber-500" selected={selected}>
    {data.label || 'PostgreSQL'}
  </NodeWrapper>
));

export const NoSQLNode = memo(({ data, selected }) => (
  <NodeWrapper label="NoSQL DB" icon={FiDatabase} color="bg-orange-500" selected={selected}>
    {data.label || 'MongoDB'}
  </NodeWrapper>
));

export const CacheNode = memo(({ data, selected }) => (
  <NodeWrapper label="Redis Cache" icon={FiActivity} color="bg-rose-500" selected={selected}>
    {data.label || 'Redis Cluster'}
  </NodeWrapper>
));

export const QueueNode = memo(({ data, selected }) => (
  <NodeWrapper label="Queue/Kafka" icon={FiCpu} color="bg-cyan-500" selected={selected}>
    {data.label || 'Kafka/RabbitMQ'}
  </NodeWrapper>
));

export const StorageNode = memo(({ data, selected }) => (
  <NodeWrapper label="Object Storage" icon={FiHardDrive} color="bg-yellow-500" selected={selected}>
    {data.label || 'S3 Bucket'}
  </NodeWrapper>
));

export const ClientNode = memo(({ data, selected }) => (
  <NodeWrapper label="Web Client" icon={FiMonitor} color="bg-slate-500" selected={selected}>
    {data.label || 'React App'}
  </NodeWrapper>
));

export const MobileNode = memo(({ data, selected }) => (
  <NodeWrapper label="Mobile App" icon={FiSmartphone} color="bg-slate-500" selected={selected}>
    {data.label || 'iOS/Android'}
  </NodeWrapper>
));

export const nodeTypes = {
  loadBalancer: LoadBalancerNode,
  cdn: CDNNode,
  apiGateway: APIGatewayNode,
  apiServer: ServerNode,
  microservice: MicroserviceNode,
  database: DatabaseNode,
  nosql: NoSQLNode,
  cache: CacheNode,
  queue: QueueNode,
  storage: StorageNode,
  webClient: ClientNode,
  mobileApp: MobileNode,
};
