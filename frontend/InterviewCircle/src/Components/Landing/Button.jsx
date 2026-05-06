import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25',
    secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10',
    outline: 'border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white',
    ghost: 'text-slate-400 hover:text-white'
  };

  return (
    <button 
      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
