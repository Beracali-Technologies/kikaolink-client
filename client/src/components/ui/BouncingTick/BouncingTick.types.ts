export type BouncingTickSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BouncingTickProps {
  size?: BouncingTickSize;
  color?: string;
  glowColor?: string;
  className?: string;
}
