import React from 'react';

interface CloudProps {
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: string;
  blur: string;
  color: 'white' | 'blue-light' | 'blue-medium';
}

const Cloud: React.FC<CloudProps> = ({ top, left, delay, duration, size, opacity, blur, color }) => {
  const getCloudColor = () => {
    switch (color) {
      case 'blue-light':
        return 'bg-gradient-to-br from-blue-100 to-blue-200';
      case 'blue-medium':
        return 'bg-gradient-to-br from-blue-200 to-blue-300';
      default:
        return 'bg-gradient-to-br from-white to-blue-50';
    }
  };

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur})`,
        animation: `floatUp ${duration} ease-in-out ${delay} infinite`
      }}
    >
      <div className={`w-full h-full ${getCloudColor()} rounded-full shadow-lg cloud-inner`}></div>
    </div>
  );
};

export const CloudBackground: React.FC = () => {
  const clouds = [
    // White clouds
    { top: '80%', left: '5%', delay: '0s', duration: '40s', size: '140px', opacity: '0.5', blur: '6px', color: 'white' as const },
    { top: '70%', left: '75%', delay: '5s', duration: '35s', size: '110px', opacity: '0.4', blur: '5px', color: 'white' as const },
    { top: '85%', left: '50%', delay: '10s', duration: '45s', size: '160px', opacity: '0.45', blur: '7px', color: 'white' as const },

    // Light blue clouds
    { top: '75%', left: '25%', delay: '3s', duration: '30s', size: '90px', opacity: '0.35', blur: '4px', color: 'blue-light' as const },
    { top: '80%', left: '90%', delay: '8s', duration: '38s', size: '120px', opacity: '0.4', blur: '6px', color: 'blue-light' as const },

    // Medium blue clouds
    { top: '70%', left: '40%', delay: '12s', duration: '32s', size: '100px', opacity: '0.3', blur: '5px', color: 'blue-medium' as const },
    { top: '85%', left: '15%', delay: '2s', duration: '25s', size: '70px', opacity: '0.25', blur: '3px', color: 'blue-medium' as const },

    // Small blue clouds
    { top: '75%', left: '60%', delay: '7s', duration: '28s', size: '80px', opacity: '0.35', blur: '4px', color: 'blue-light' as const },
    { top: '90%', left: '85%', delay: '15s', duration: '26s', size: '60px', opacity: '0.3', blur: '3px', color: 'blue-medium' as const },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud, index) => (
        <Cloud key={index} {...cloud} />
      ))}
    </div>
  );
};
