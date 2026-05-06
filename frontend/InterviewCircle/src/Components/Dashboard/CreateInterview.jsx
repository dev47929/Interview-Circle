import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiTarget, 
  FiBarChart, 
  FiBriefcase, 
  FiArrowRight,
  FiPlus
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const CreateInterview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resumeId: '',
    roundType: 'Technical',
    difficulty: 'Med',
    position: ''
  });

  // Mock data for resumes - in a real app, this would come from an API
  const resumes = [
    { id: '1', name: 'Software Engineer - Google', position: 'Software Engineer', company: 'Google' },
    { id: '2', name: 'Frontend Developer - Meta', position: 'Frontend Developer', company: 'Meta' },
    { id: '3', name: 'Fullstack Dev - Amazon', position: 'Fullstack Developer', company: 'Amazon' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // If resumeId changes, update position/company automatically if it's a "Dropdown of the resumes"
        if (name === 'resumeId') {
            const selectedResume = resumes.find(r => r.id === value);
            if (selectedResume) {
                newData.position = `${selectedResume.position} at ${selectedResume.company}`;
            }
        }
        return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get token from local storage
    const token = localStorage.getItem('token');
    
    // API call placeholder
    console.log('Sending to API:', formData);
    console.log('With Bearer Token:', token);

    // Mock API call
    // await fetch('YOUR_API_URL', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify(formData)
    // });

    // Proceed to interview room
    navigate('/interview-room');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Create Interview</h1>
        <p className="text-slate-400">Configure your mock interview session based on your profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Select Resume */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FiFileText className="text-indigo-400" /> Select Resume
            </label>
            <select 
              name="resumeId"
              value={formData.resumeId}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
            >
              <option value="" disabled>Select a resume...</option>
              {resumes.map(resume => (
                <option key={resume.id} value={resume.id}>{resume.name}</option>
              ))}
            </select>
          </div>

          {/* Position & Company */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FiBriefcase className="text-indigo-400" /> Position & Company
            </label>
            <select 
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
            >
              <option value="" disabled>Select target position...</option>
              {resumes.map(resume => (
                <option key={resume.id} value={`${resume.position} at ${resume.company}`}>
                  {resume.position} at {resume.company}
                </option>
              ))}
            </select>
          </div>

          {/* Round Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FiTarget className="text-indigo-400" /> Round Type
            </label>
            <div className="flex gap-4">
              {['Behavioural', 'Technical'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, roundType: type }))}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border ${
                    formData.roundType === type
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <FiBarChart className="text-indigo-400" /> Difficulty
            </label>
            <div className="flex gap-4">
              {['Low', 'Med', 'High'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border ${
                    formData.difficulty === level
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25"
          >
            Start Interview <FiArrowRight />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateInterview;
