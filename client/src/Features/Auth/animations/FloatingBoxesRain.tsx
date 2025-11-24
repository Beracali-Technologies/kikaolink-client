// components/animations/FloatingBoxesRain.tsx
import React from 'react';

interface FloatingBoxRainProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
}

const FloatingBoxesRain: React.FC<FloatingBoxRainProps> = ({ 
  intensity = 'medium',
  speed = 'medium',
  className = "" 
}) => {
  const getBoxCount = () => {
    switch (intensity) {
      case 'light': return 12;
      case 'medium': return 20;
      case 'heavy': return 30;
      default: return 20;
    }
  };

  const getSpeed = () => {
    switch (speed) {
      case 'slow': return { min: 20, max: 30 };
      case 'medium': return { min: 15, max: 25 };
      case 'fast': return { min: 10, max: 20 };
      default: return { min: 15, max: 25 };
    }
  };

  const speedRange = getSpeed();
  
  const boxes = Array.from({ length: getBoxCount() }, (_, index) => {
    const sizes = ['small', 'medium', 'large'] as const;
    const shapes = ['square', 'rectangle', 'blob'] as const;
    const opacities = [0.3, 0.4, 0.5, 0.6];
    
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const opacity = opacities[Math.floor(Math.random() * opacities.length)];
    const duration = speedRange.min + Math.random() * (speedRange.max - speedRange.min);
    const delay = Math.random() * 15;
    const left = `${Math.random() * 100}%`;
    const rotation = Math.random() * 360;
    const sway = Math.random() * 100 - 50; // -50px to +50px horizontal movement

    // Size definitions
    const sizeStyles = {
      small: { width: '1rem', height: '1rem' },
      medium: { width: '2rem', height: '2rem' },
      large: { width: '3rem', height: '3rem' }
    };

    // Shape styles
    const shapeStyles = {
      square: 'rounded-lg',
      rectangle: Math.random() > 0.5 ? 'rounded-lg w-4 h-8' : 'rounded-lg w-8 h-4',
      blob: 'rounded-full'
    };

    // Color variations with your brand colors
    const colors = [
      'bg-primary-blue',
      'bg-accent-red', 
      'bg-white',
      'bg-gradient-to-br from-primary-blue to-accent-red'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      id: index,
      size,
      shape,
      color,
      opacity,
      duration,
      delay,
      left,
      rotation,
      sway,
      sizeStyles: sizeStyles[size],
      shapeClass: shapeStyles[shape]
    };
  });

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <style>
        {`
          @keyframes floatRain {
            0% {
              transform: translateY(100vh) translateX(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
              transform: translateY(90vh) translateX(calc(var(--sway) * 0.1)) rotate(calc(var(--rotation) * 0.1));
            }
            50% {
              opacity: 1;
              transform: translateY(50vh) translateX(calc(var(--sway) * 0.5)) rotate(calc(var(--rotation) * 0.5));
            }
            90% {
              opacity: 0.7;
              transform: translateY(10vh) translateX(calc(var(--sway) * 0.9)) rotate(calc(var(--rotation) * 0.9));
            }
            100% {
              transform: translateY(-100px) translateX(var(--sway)) rotate(var(--rotation));
              opacity: 0;
            }
          }

          @keyframes floatRainBlob {
            0% {
              transform: translateY(100vh) translateX(0) scale(0.8) rotate(0deg);
              opacity: 0;
            }
            20% {
              transform: translateY(80vh) translateX(calc(var(--sway) * 0.2)) scale(1) rotate(calc(var(--rotation) * 0.2));
              opacity: 0.8;
            }
            60% {
              transform: translateY(40vh) translateX(calc(var(--sway) * 0.6)) scale(1.1) rotate(calc(var(--rotation) * 0.6));
              opacity: 1;
            }
            80% {
              transform: translateY(20vh) translateX(calc(var(--sway) * 0.8)) scale(1) rotate(calc(var(--rotation) * 0.8));
              opacity: 0.6;
            }
            100% {
              transform: translateY(-100px) translateX(var(--sway)) scale(0.9) rotate(var(--rotation));
              opacity: 0;
            }
          }

          .animate-float-rain {
            animation: floatRain linear infinite;
          }

          .animate-float-blob {
            animation: floatRainBlob linear infinite;
          }
        `}
      </style>
      
      {boxes.map((box) => (
        <div
          key={box.id}
          className={`
            absolute ${box.shapeClass} ${box.color} backdrop-blur-sm
            ${box.shape === 'blob' ? 'animate-float-blob' : 'animate-float-rain'}
          `}
          style={{
            left: box.left,
            opacity: box.opacity,
            animationDuration: `${box.duration}s`,
            animationDelay: `${box.delay}s`,
            '--rotation': `${box.rotation}deg`,
            '--sway': `${box.sway}px`,
            ...box.sizeStyles
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FloatingBoxesRain;