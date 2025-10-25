/**
 * Utility functions for handling campaign progress calculations
 */

/**
 * Safely converts a value to a number, handling BigInt and string inputs
 */
const toNumber = (value: string | number | bigint): number => {
  if (typeof value === 'bigint') {
    return Number(value) / 1e18; // Convert from wei to ETH
  }
  if (typeof value === 'string') {
    // Handle string representation of numbers or BigInt
    if (value.includes('e') || value.includes('E')) {
      return parseFloat(value);
    }
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
  return value;
};

/**
 * Calculates the progress percentage of a campaign
 * @param collected The amount collected (can be string, number, or bigint)
 * @param target The target amount (can be string, number, or bigint)
 * @returns A number between 0 and 100 representing the progress percentage
 */
export const calculateProgress = (
  collected: string | number | bigint, 
  target: string | number | bigint
): number => {
  try {
    const collectedNum = toNumber(collected);
    const targetNum = toNumber(target);

    if (targetNum <= 0) return 0;
    
    const progress = (collectedNum / targetNum) * 100;
    
    // Ensure the progress is between 0 and 100
    return Math.min(Math.max(progress, 0), 100);
  } catch (error) {
    console.error('Error calculating progress:', error);
    return 0;
  }
};

/**
 * Formats a number to a fixed number of decimal places
 * @param value The value to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted string representation of the number
 */
export const formatNumber = (value: number | string, decimals: number = 2): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  
  // If the number is very small but not zero, show it in exponential notation
  if (num !== 0 && Math.abs(num) < 0.0001) {
    return num.toExponential(decimals);
  }
  
  // For numbers with many digits, use toLocaleString for better readability
  if (Math.abs(num) >= 1000) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    });
  }
  
  // For regular numbers, use toFixed with the specified number of decimals
  return num.toFixed(decimals);
};
