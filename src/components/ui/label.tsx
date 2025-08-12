import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => (
  <label className={`block font-medium text-sm text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

export default Label;
