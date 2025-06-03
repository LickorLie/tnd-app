import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color: 'orange' | 'red' | 'green' | 'gray';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  color, 
  className = '', 
  type = 'button',
  disabled = false 
}) => {
  const baseClasses = "px-6 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg backdrop-blur-sm";
  
  const colorClasses = {
    orange: disabled 
      ? "bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200 text-gray-400 cursor-not-allowed opacity-70"
      : "bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 hover:from-orange-500 hover:via-amber-600 hover:to-orange-700 focus:ring-orange-400 text-white hover:-translate-y-0.5 hover:shadow-xl",
    red: disabled
      ? "bg-gradient-to-r from-rose-200 via-red-200 to-rose-200 text-gray-400 cursor-not-allowed opacity-70"
      : "bg-gradient-to-r from-rose-400 via-red-500 to-rose-600 hover:from-rose-500 hover:via-red-600 hover:to-rose-700 focus:ring-rose-400 text-white hover:-translate-y-0.5 hover:shadow-xl",
    green: disabled
      ? "bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 text-gray-400 cursor-not-allowed opacity-70"
      : "bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 hover:from-emerald-500 hover:via-green-600 hover:to-emerald-700 focus:ring-emerald-400 text-white hover:-translate-y-0.5 hover:shadow-xl",
    gray: disabled
      ? "bg-gradient-to-r from-gray-200 via-slate-200 to-gray-200 text-gray-400 cursor-not-allowed opacity-70"
      : "bg-gradient-to-r from-gray-400 via-slate-500 to-gray-600 hover:from-gray-500 hover:via-slate-600 hover:to-gray-700 focus:ring-gray-400 text-white hover:-translate-y-0.5 hover:shadow-xl"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;