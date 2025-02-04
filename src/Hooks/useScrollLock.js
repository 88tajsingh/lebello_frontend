export function useScrollLock() {
  const lockScroll = () => {
    // Calculate scrollbar width to prevent content shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Store original styles
    const originalOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.documentElement.style.paddingRight;
    
    // Apply scroll lock
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      // Restore original styles
      document.documentElement.style.overflow = originalOverflow;
      document.documentElement.style.paddingRight = originalPaddingRight;
    };
  };
  
  return {
    lockScroll
  };
}
