import React from 'react';
import { FiCode, FiUserCheck, FiFileText, FiStar } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const Products = () => {
  const products = [
    {
      icon: <FiCode className="text-blue-400" />,
      name: "AI Technical Interview",
      rating: "4.8",
      reviews: "12.3K",
      desc: "Practice coding & problem-solving with AI that evaluates logic, efficiency, and explanations.",
      stat: "100+ Algorithm Problems",
      color: "blue"
    },
    {
      icon: <FiUserCheck className="text-emerald-400" />,
      name: "AI Behavioral Interview",
      rating: "4.7",
      reviews: "18.5K",
      desc: "Master STAR method & soft skills with real-time feedback on communication and authenticity.",
      stat: "200+ Behavioral Questions",
      color: "emerald"
    },
    {
      icon: <FiFileText className="text-amber-400" />,
      name: "Resume Review",
      rating: "4.6",
      reviews: "9.2K",
      desc: "Get AI-powered insights on your resume, ATS optimization, and portfolio impact.",
      stat: "Improve ATS Score by 40%",
      color: "amber"
    },
    {
      icon: <HiOutlineBuildingOffice2 className="text-purple-400" />,
      name: "Company-Specific Prep",
      rating: "4.8",
      reviews: "7.1K",
      desc: "Tailored preparation with actual interview questions from thousands of candidates.",
      stat: "500+ Companies Covered",
      color: "purple"
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading 
            title="Designed for Every Role" 
            subtitle="Specific modules built to replicate the actual high-stakes environment of top-tier companies."
          />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full"
            >
              <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-400">
                  <FiStar size={14} fill="currentColor" />
                </div>
                <span className="text-white text-sm font-semibold">{p.rating}</span>
                <span className="text-slate-500 text-sm">({p.reviews})</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{p.name}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{p.desc}</p>
              <div className="pt-6 border-t border-white/5">
                <p className="text-indigo-400 text-sm font-bold">{p.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Products;
