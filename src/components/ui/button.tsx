import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded focus:outline-none transition ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
