'use client';

import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = useId();
  const finalId = id || inputId;
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={finalId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={finalId}
        className={`
          block w-full rounded-lg border-gray-300 shadow-sm shadow-sm text-gray-900 border-1 border-gray-300
          focus:border-red-500 focus:ring-blue-500 sm:text-sm py-4 px-4
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
