import React from 'react';

interface FloatingBoxProps {
  size: 'small' | 'medium' | 'large';
  color: 'blue' | 'red' | 'white';
  delay: number;
  duration: number;
  left: string;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ size, color, delay, duration, left }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'bg-primary-blue bg-opacity-20 border border-primary-blue border-opacity-30',
    red: 'bg-accent-red bg-opacity-20 border border-accent-red border-opacity-30',
    white: 'bg-white bg-opacity-10 border border-white border-opacity-20'
  };

  return (
    <div
      className={`absolute rounded-lg ${sizeClasses[size]} ${colorClasses[color]} animate-float`}
      style={{
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );
};

interface FloatingBoxesProps {
  count?: number;
  className?: string;
}

const FloatingBoxes: React.FC<FloatingBoxesProps> = ({ 
  count = 12, 
  className = "" 
}) => {
  const boxes = Array.from({ length: count }, (_, index) => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const colors: Array<'blue' | 'red' | 'white'> = ['blue', 'red', 'white'];
    
    return {
      id: index,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      left: `${Math.random() * 100}%`
    };
  });

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Add the animation styles */}
      <style>
        {`
          @keyframes float-up {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-100px) rotate(180deg);
              opacity: 0;
            }
          }
          .animate-float {
            animation: float-up linear infinite;
          }
        `}
      </style>
      
      {boxes.map((box) => (
        <FloatingBox
          key={box.id}
          size={box.size}
          color={box.color}
          delay={box.delay}
          duration={box.duration}
          left={box.left}
        />
      ))}
    </div>
  );
};

export default FloatingBoxes;