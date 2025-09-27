// the utility functions

/**
 * Converts color utility class to background color class

 */
export const colorToBackground = (colorClass: string): string => {
  return colorClass.replace('text-', 'bg-');
};

/**
 * Validates and returns safe className string
 */
export const buildClassName = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};
