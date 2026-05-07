import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiBriefcase, 
  FiMapPin, 
  FiLink, 
  FiShield, 
  FiBell, 
  FiCreditCard,
  FiSave,
  FiArrowLeft,
  FiCamera
} from "react-icons/fi";
import { Link } from 'react-router-dom';

const SettingsSection = ({ title, children }) => (
  <div className="bg-slate-900/50 border border-white/5 rounded-[32px] p-8 md:p-10 space-y-8">
    <h3 className="text-xl font-bold text-white">{title}</h3>
    {children}
  </div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={18} />
      </div>
      <input 
        {...props}
        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm"
      />
    </div>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { name: 'General', icon: FiUser },
    { name: 'Security', icon: FiShield },
    { name: 'Notifications', icon: FiBell },
    { name: 'Billing', icon: FiCreditCard }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-8 space-y-8 bg-transparent"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Profile Settings</h1>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25">
            <FiSave size={20} /> Save Changes
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 space-y-2">
            {tabs.map(tab => (
              <button 
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  activeTab === tab.name 
                    ? 'bg-white/10 text-white border border-white/10' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-bold text-sm">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="flex-grow space-y-8">
            <SettingsSection title="Personal Information">
              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/5">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-[32px] bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl">
                    AJ
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                    <FiCamera size={18} />
                  </button>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Alex Johnson</h4>
                  <p className="text-slate-500 text-sm">Frontend Engineer • San Francisco, CA</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <InputField label="Full Name" icon={FiUser} defaultValue="Alex Johnson" />
                <InputField label="Email Address" icon={FiMail} defaultValue="alex@example.com" />
                <InputField label="Preferred Role" icon={FiBriefcase} defaultValue="Senior Frontend Engineer" />
                <InputField label="Location" icon={FiMapPin} defaultValue="San Francisco, CA" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Portfolio / LinkedIn</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FiLink size={18} />
                  </div>
                  <input 
                    type="text"
                    defaultValue="linkedin.com/in/alexjohnson"
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm"
                  />
                </div>
              </div>
            </SettingsSection>

            <SettingsSection title="Interview Preferences">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-950/50 border border-white/5">
                  <div>
                    <h5 className="font-bold text-white mb-1">AI Voice Persona</h5>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Sarah (Friendly, Technical)</p>
                  </div>
                  <button className="text-indigo-400 text-sm font-bold">Change</button>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-950/50 border border-white/5">
                  <div>
                    <h5 className="font-bold text-white mb-1">Automatic Recording</h5>
                    <p className="text-slate-500 text-xs font-medium">Record all sessions for feedback analysis.</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 flex justify-end cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </SettingsSection>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
