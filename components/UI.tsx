import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5",
    secondary: "bg-white text-gray-800 border-2 border-gray-200 hover:border-amber-600 hover:text-amber-700",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        <input 
          className={`w-full px-4 py-3 rounded-xl border-2 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'} ${icon ? 'pl-11' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);