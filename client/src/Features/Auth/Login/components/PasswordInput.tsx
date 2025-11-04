import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface PasswordInputProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  error,
  showPassword,
  onTogglePassword
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-dark-text block">Password</label>
    <div className="relative group">
      <input
        {...register("password", { required: "Password is required" })}
        type={showPassword ? 'text' : 'password'}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-primary-blue/50 focus:border-primary-blue transition-all duration-300 group-hover:border-primary-blue/50 bg-white/80 backdrop-blur-sm"
        placeholder="Enter your password"
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400 hover:text-primary-blue transition-colors duration-300"
      >
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
    {error && (
      <p className="text-accent-red text-sm animate-pulse">
        {error.message}
      </p>
    )}
  </div>
);
