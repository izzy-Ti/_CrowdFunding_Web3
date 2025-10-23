// Format ETH amounts
export const formatETH = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0.000';
  
  if (num >= 1000) {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  } else if (num >= 1) {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 3 
    });
  } else {
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 3, 
      maximumFractionDigits: 6 
    });
  }
};

// Format currency with proper symbols
export const formatCurrency = (amount: string | number, currency: string = 'ETH'): string => {
  const formattedAmount = formatETH(amount);
  return `${formattedAmount} ${currency}`;
};

// Format addresses (show first 6 and last 4 characters)
export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format dates
export const formatDate = (timestamp: string | number): string => {
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) : timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate time remaining
export const getTimeRemaining = (deadline: string | number): { 
  days: number; 
  hours: number; 
  minutes: number; 
  isExpired: boolean 
} => {
  const now = new Date().getTime();
  const deadlineTime = typeof deadline === 'string' ? parseInt(deadline) : deadline;
  const difference = deadlineTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isExpired: false };
};

// Calculate progress percentage
export const calculateProgress = (collected: string | number, target: string | number): number => {
  const collectedNum = typeof collected === 'string' ? parseFloat(collected) : collected;
  const targetNum = typeof target === 'string' ? parseFloat(target) : target;
  
  if (targetNum === 0) return 0;
  return Math.min((collectedNum / targetNum) * 100, 100);
};

// Convert wei to ETH (for display purposes)
export const weiToETH = (wei: string | number): string => {
  try {
    const weiString = typeof wei === 'number' ? wei.toString() : wei;
    const weiNum = BigInt(weiString);
    const eth = Number(weiNum) / 1e18;
    return eth.toString();
  } catch (error) {
    console.error('Error converting wei to ETH:', error);
    return '0';
  }
};

// Convert ETH to wei (for contract calls)
export const ethToWei = (eth: string | number): string => {
  try {
    const ethString = typeof eth === 'number' ? eth.toString() : eth;
    const wei = BigInt(Math.floor(parseFloat(ethString) * 1e18));
    return wei.toString();
  } catch (error) {
    console.error('Error converting ETH to wei:', error);
    return '0';
  }
};

// Validate ETH amount
export const isValidETHAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 1000000; // Max 1M ETH
};

// Get status text based on deadline and progress
export const getCampaignStatus = (
  deadline: string | number, 
  collected: string | number, 
  target: string | number
): { status: string; color: string } => {
  const { isExpired } = getTimeRemaining(deadline);
  const progress = calculateProgress(collected, target);
  
  if (isExpired) {
    return { status: 'Expired', color: 'text-red-400' };
  } else if (progress >= 100) {
    return { status: 'Funded', color: 'text-green-400' };
  } else {
    return { status: 'Active', color: 'text-blue-400' };
  }
};

// Format large numbers with K, M, B suffixes
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Generate random campaign images if none provided
export const getDefaultCampaignImage = (title: string): string => {
  const images = [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
  ];
  
  // Use title hash to consistently select the same image for the same title
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return images[Math.abs(hash) % images.length];
};
