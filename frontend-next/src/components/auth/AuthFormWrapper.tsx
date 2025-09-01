import React from 'react';

interface AuthFormWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode; 
}

export const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-10 border-2 border-gray-120 rounded-lg p-4" >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        </div>
        {children} 
      </div>
    </div>
  );
};