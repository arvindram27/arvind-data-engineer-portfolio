// Performance optimization utilities
export const performanceConfig = {
  // Intersection Observer settings for smooth scroll
  intersectionObserver: {
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
  },
  
  // Animation settings for better performance
  animations: {
    reducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    }
  },
  
  // Throttle/debounce settings
  throttle: {
    scroll: 16, // ~60fps
    resize: 100
  }
};

// Throttle function for performance optimization
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Debounce function
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Intersection Observer hook for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    ...performanceConfig.intersectionObserver,
    ...options
  });
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;
  
  // Preload critical images
  const criticalImages = [
    '/images/profile.jpg',
    '/logo.svg'
  ];
  
  criticalImages.forEach(imageUrl => {
    const linkImage = document.createElement('link');
    linkImage.rel = 'preload';
    linkImage.href = imageUrl;
    linkImage.as = 'image';
    
    // Only add if not already preloaded
    if (!document.querySelector(`link[href="${imageUrl}"]`)) {
      document.head.appendChild(linkImage);
    }
  });
}

// Image loading optimization
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;
  
  // Add loading="lazy" to images that don't have it
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
}

// Performance monitoring
export function measurePerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) return;
  
  // Log core web vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`${entry.name}: ${Math.round(entry.duration)}ms`);
      }
    }
  });
  
  observer.observe({ entryTypes: ['measure'] });
  
  // Measure initial load
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page Load Time: ${loadTime}ms`);
  });
}

// CSS animation performance
export function enableHardwareAcceleration(element: HTMLElement) {
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)'; // Force hardware acceleration
}

export function disableHardwareAcceleration(element: HTMLElement) {
  element.style.willChange = 'auto';
  element.style.transform = '';
}