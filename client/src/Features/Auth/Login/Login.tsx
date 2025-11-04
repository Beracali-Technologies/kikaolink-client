import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../lib/stores/authStore';
import { getAuthToken } from '../../../lib/utils/tokenUtils';
import { CloudBackground } from './components/CloudBackground';
import { EmailInput } from './components/EmailInput';
import { PasswordInput } from './components/PasswordInput';
import { SubmitButton } from './components/SubmitButton';
import { ErrorAlert } from './components/ErrorAlert';


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
            console.log('Login Response:', response);
            if (getAuthToken()) {
                navigate('/dashboard/landing', { replace: true });
            } else {
                setApiError('Login failed: Token not received.');
            }
        } catch (error: any) {
            console.error('Login Error:', error.response?.data || error);
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
        <div className="min-h-screen bg-cloud-sky flex items-center justify-center p-4 relative overflow-hidden">
            {/* Cloud Background with blue clouds */}
            <CloudBackground />

            {/* Main Content */}
            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl shadow-lg mx-auto flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">
                        Welcome Back!
                    </h1>
                    <p className="mt-3 text-gray-600 text-lg">Log in to manage your events</p>
                </div>

                {/* Form Container */}
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 w-full transform transition-all duration-500 hover:shadow-2xl">
                    {apiError && <ErrorAlert message={apiError} />}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <EmailInput register={register} error={errors.email} />
                        <PasswordInput
                            register={register}
                            error={errors.password}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                        />

                        <SubmitButton isLoading={isLoading} />
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-sm text-gray-600 font-medium">
                    Don't have an account?{' '}
                    <NavLink
                        to="/signup"
                        className="font-semibold text-blue-500 hover:text-blue-600 transition-colors duration-300 hover:underline"
                    >
                        Sign up for free
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
