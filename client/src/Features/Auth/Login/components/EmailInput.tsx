import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface EmailInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const EmailInput: React.FC<EmailInputProps> = ({ register, error }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-dark-text block">Email Address</label>
    <div className="relative group">
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
        type="email"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-blue/50 focus:border-primary-blue transition-all duration-300 group-hover:border-primary-blue/50 bg-white/80 backdrop-blur-sm"
        placeholder="Enter your email"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="text-accent-red text-sm animate-pulse">
        {error.message}
      </p>
    )}
  </div>
);
