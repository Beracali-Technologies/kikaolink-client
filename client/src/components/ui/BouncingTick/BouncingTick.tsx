// components/BouncingTickPrecise.tsx
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface BouncingTickProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  glowColor?: string;
  exact5cm?: boolean;
  className?: string;
}

const BouncingTick: React.FC<BouncingTickProps> = ({ 
  size = 'lg',
  color = 'text-green-500',
  glowColor = 'text-green-400',
  exact5cm = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // 5cm approximate conversion (1cm ≈ 37.8px at 96dpi)
  const cm5InPx = 37.8 * 5; // ~189px for 5cm

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Precise 5cm Glowing Circle */}
      <div
        className={`absolute rounded-full ${glowColor.replace('text-', 'bg-')} opacity-20 animate-glow-spread`}
        style={{
          width: `${cm5InPx}px`,
          height: `${cm5InPx}px`,
        }}
      />

      {/* Secondary glow */}
      <div
        className={`absolute rounded-full ${glowColor.replace('text-', 'bg-')} opacity-15 animate-glow-spread-slow`}
        style={{
          width: `${cm5InPx}px`,
          height: `${cm5InPx}px`,
        }}
      />

      {/* Main tick icon */}
      <CheckCircleIcon
        className={`${sizeClasses[size]} ${color} relative z-10 animate-bounce`}
      />

      {/* Custom animations for precise glow */}
      <style jsx>{`
        @keyframes glow-spread {
          0% {
            transform: scale(0.3);
            opacity: 0.4;
            box-shadow: 0 0 20px 10px currentColor;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.2;
            box-shadow: 0 0 40px 20px currentColor;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
            box-shadow: 0 0 60px 30px currentColor;
          }
        }

        @keyframes glow-spread-slow {
          0% {
            transform: scale(0.2);
            opacity: 0.3;
          }
          70% {
            transform: scale(0.9);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .animate-glow-spread {
          animation: glow-spread 3s ease-out infinite;
        }

        .animate-glow-spread-slow {
          animation: glow-spread-slow 4s ease-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default BouncingTick;
