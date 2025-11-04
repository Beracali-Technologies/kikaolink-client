import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full py-3.5 bg-gradient-to-r from-primary-blue to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-primary-blue transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
  >
    <span className="relative z-10">
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging In...
        </span>
      ) : (
        'Log In'
      )}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
);
