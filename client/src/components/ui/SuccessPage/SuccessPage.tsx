import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

interface SuccessPageProps {
    title: string;
    message: string;
    redirectUrl: string;
    redirectDelay?: number;
    icon?: React.ReactNode;
    showConfetti?: boolean;
}

const SuccessPage: React.FC<SuccessPageProps> = ({
    title,
    message,
    redirectUrl,
    redirectDelay = 5800,
    icon,
    showConfetti = true
}) => {
    const navigate = useNavigate();
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [progress, setProgress] = useState(100);

    // Update window dimensions on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Progress bar animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - (100 / (redirectDelay / 100));
                return newProgress <= 0 ? 0 : newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [redirectDelay]);

    // Redirect after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(redirectUrl);
        }, redirectDelay);

        return () => clearTimeout(timer);
    }, [navigate, redirectUrl, redirectDelay]);

    // Custom confetti colors for navy blue, white, and red theme
    const confettiColors = ['#1e3a8a', '#dc2626', '#ffffff', '#1e40af', '#ef4444', '#f8fafc'];

    // Default event icon in your theme colors
    const defaultIcon = (
        <div className="w-32 h-32 bg-gradient-to-br from-navy-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
            <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
            </svg>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Confetti with theme colors */}
            {showConfetti && (
                <Confetti
                    width={windowDimensions.width}
                    height={windowDimensions.height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.3}
                    colors={confettiColors}
                />
            )}

            {/* Animated background elements in theme colors */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-navy-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-1/4 -right-10 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-1/4 -left-8 w-12 h-12 bg-navy-300 rounded-full opacity-40 animate-ping"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-pulse"></div>
            </div>

            {/* Main content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center relative z-10 transform transition-all duration-500 border border-gray-100">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    {icon || defaultIcon}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy-600 to-red-600 bg-clip-text text-transparent mb-4">
                    {title}
                </h1>

                {/* Message */}
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Loading indicator */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-navy-600 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-navy-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-sm text-gray-600">
                        Redirecting in {Math.ceil(redirectDelay / 1000)} seconds...
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                        className="bg-gradient-to-r from-navy-600 to-red-600 h-2 rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Manual redirect option */}
                <button
                    onClick={() => navigate(redirectUrl)}
                    className="text-sm text-navy-600 hover:text-navy-800 font-medium transition-colors duration-200"
                >
                    Click here to continue immediately
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
