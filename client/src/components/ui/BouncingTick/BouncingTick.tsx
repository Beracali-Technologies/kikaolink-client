import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { BouncingTickProps } from './BouncingTick.types';
import { SIZE_CLASSES, DEFAULT_PROPS, CM5_IN_PX } from './BouncingTick.constants';
import { colorToBackground, buildClassName } from './BouncingTick.utils';
import { BOUNCING_TICK_STYLES } from './BouncingTick.styles';

const BouncingTick: React.FC<BouncingTickProps> = ({
  size = DEFAULT_PROPS.size,
  color = DEFAULT_PROPS.color,
  glowColor = DEFAULT_PROPS.glowColor,
  className = DEFAULT_PROPS.className
}) => {
  const containerClasses = buildClassName(
    'relative inline-flex items-center justify-center',
    className
  );

  const glowBackground = colorToBackground(glowColor);
  const iconClasses = buildClassName(SIZE_CLASSES[size], color, 'relative z-10 animate-bounce');

  const glowStyle = {
    width: `${CM5_IN_PX}px`,
    height: `${CM5_IN_PX}px`,
  };

  return (
    <div className={containerClasses}>
      {/* Primary Glow Effect */}
      <div
        className={`absolute rounded-full ${glowBackground} opacity-20 animate-glow-spread`}
        style={glowStyle}
      />

      {/* Secondary Glow Effect */}
      <div
        className={`absolute rounded-full ${glowBackground} opacity-15 animate-glow-spread-slow`}
        style={glowStyle}
      />

      {/* Main Tick Icon */}
      <CheckCircleIcon className={iconClasses} />

      {/* Inject CSS Animations */}
      <style>{BOUNCING_TICK_STYLES}</style>
    </div>
  );
};

export default BouncingTick;
