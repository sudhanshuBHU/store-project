import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 