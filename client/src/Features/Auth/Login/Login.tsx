import React from 'react';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-light-bg flex flex-col justify-center items-center">
            <div className="max-w-md w-full mx-auto">
                 <div className="text-center mb-8">
                     <h1 className="text-3xl font-bold text-dark-text">Welcome Back!</h1>
                     <p className="text-light-text">Log in to manage your events.</p>
                 </div>
                 <div className="bg-white p-8 rounded-lg shadow-md">
                     <form className="space-y-6">
                        <div>
                             <label htmlFor="email" className="text-sm font-medium text-dark-text block mb-2">Email Address</label>
                             <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue" required />
                        </div>
                        <div>
                             <label htmlFor="password" className="text-sm font-medium text-dark-text block mb-2">Password</label>
                             <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue" required />
                        </div>
                         <button type="submit" className="w-full py-3 px-4 bg-primary-blue text-white font-semibold rounded-md hover:bg-primary-blue-hover transition-colors">
                             Log In
                         </button>
                     </form>
                 </div>
                 <p className="text-center mt-6 text-sm text-light-text">
                     Don't have an account? <NavLink to="/signup" className="font-medium text-primary-blue hover:underline">Sign up for free</NavLink>
                 </p>
            </div>
        </div>
    );
}

export default Login;
