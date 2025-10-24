// Features/Dashboard/components/Logo/Logo.tsx
import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
    size = 'md',
    showIcon = true,
    className = ''
}) => {
    const sizeClasses = {
        sm: {
            icon: 'w-6 h-6',
            text: 'text-lg',
            iconText: 'text-xs'
        },
        md: {
            icon: 'w-8 h-8',
            text: 'text-xl',
            iconText: 'text-sm'
        },
        lg: {
            icon: 'w-10 h-10',
            text: 'text-2xl',
            iconText: 'text-base'
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {showIcon && (
                <div className={`${currentSize.icon} rounded-lg bg-[#0E2344] flex items-center justify-center`}>
                    <span className={`text-white font-bold ${currentSize.iconText}`}>K</span>
                </div>
            )}
            <div className="flex items-baseline">
                    <span className={`text-white ${currentSize.text} font-bold tracking-tight`}>
                          Kikao
                    </span>
                    <span className={`text-[#FF4444] ${currentSize.text} font-bold tracking-tight`}>
                          link
                     </span>
            </div>
        </div>
    );
};

export default Logo;
