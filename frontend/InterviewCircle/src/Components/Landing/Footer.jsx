import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Button from './Button';

const Footer = () => (
  <footer className="py-20 bg-slate-950 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <FiZap className="text-indigo-500" />
            <span className="text-xl font-bold text-white">InterviewCircle</span>
          </Link>

          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            The world's leading AI-powered platform for interview preparation and career advancement.
          </p>
          <div className="flex gap-4">
            <FaTwitter className="text-slate-500 hover:text-white cursor-pointer" size={20} />
            <FaLinkedin className="text-slate-500 hover:text-white cursor-pointer" size={20} />
            <FaGithub className="text-slate-500 hover:text-white cursor-pointer" size={20} />
          </div>
        </div>
        
        <div>
          <h5 className="text-white font-bold mb-6">Products</h5>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Technical Interviews</li>
            <li className="hover:text-white cursor-pointer transition-colors">Behavioral Practice</li>
            <li className="hover:text-white cursor-pointer transition-colors">Resume Review</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-white font-bold mb-6">Resources</h5>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Career Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Interview Guide</li>
            <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-white font-bold mb-6">Subscribe</h5>
          <p className="text-slate-500 text-sm mb-4">Get the latest interview tips & hacks.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-slate-900 border border-white/5 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <Button className="w-full py-3">Subscribe</Button>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
        <p>© 2024 InterviewCircle AI Platform. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Cookie Settings</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
