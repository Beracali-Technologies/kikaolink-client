import { BouncingTickSize } from './BouncingTick.types';

export const SIZE_CLASSES: Record<BouncingTickSize, string> = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

export const DEFAULT_PROPS = {
  size: 'lg' as BouncingTickSize,
  color: 'text-green-500',
  glowColor: 'text-green-400',
  className: ''
};

// 5cm approximate conversion (1cm ≈ 37.8px at 96dpi)
export const CM5_IN_PX = 37.8 * 5; // ~189px for 5cm
