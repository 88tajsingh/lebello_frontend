
export function useScrollLock() {
  const lockScroll = () => {
    // Calculate scrollbar width to prevent content shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    
    // Store original styles
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    
    // Apply scroll lock
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    return () => {
      // Restore original styles
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }
  
  return {
    lockScroll
  }
}