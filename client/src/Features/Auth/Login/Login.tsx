import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../lib/stores/authStore';
import { getAuthToken } from '../../../lib/utils/tokenUtils';

const EyeOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeClosedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setApiError(null);
        try {
            const response = await login(data);
            console.log('Login Response:', response); // Debug the response
            // Verify token is stored before navigating
            if (getAuthToken()) {
                navigate('/dashboard/events', { replace: true });
            } else {
                setApiError('Login failed: Token not received.');
            }
        } catch (error: any) {
            console.error('Login Error:', error.response?.data || error); // Debug error
            if (error.response?.data?.message) {
                setApiError(error.response.data.message);
            } else {
                setApiError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* --- Header --- */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-dark-text">Welcome Back!</h1>
                    <p className="mt-2 text-light-text">Log in to manage your events.</p>
                </div>

                {/* --- Form Container --- */}
                <div className="bg-white p-8 rounded-xl shadow-lg w-full">
                    {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert"><p>{apiError}</p></div>}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Address */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Email Address</label>
                            <input {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                            {errors.email && <p className="text-accent-red text-sm mt-1">{errors.email.message as string}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Password</label>
                            <div className="relative">
                                <input {...register("password", { required: "Password is required" })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-light-text">
                                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                </button>
                            </div>
                            {errors.password && <p className="text-accent-red text-sm mt-1">{errors.password.message as string}</p>}
                        </div>

                        {/* --- Submit Button --- */}
                        <button type="submit" disabled={isLoading} className="w-full py-2.5 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue-hover transition-colors shadow hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form>
                </div>

                {/* --- Footer Link --- */}
                <p className="text-center mt-6 text-sm text-light-text">
                    Don't have an account? <NavLink to="/signup" className="font-medium text-primary-blue hover:underline">Sign up for free</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
