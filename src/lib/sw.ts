// Service Worker Registration and Management
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker is available
              showUpdateAvailableNotification();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
  
  // Handle service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_UPDATED') {
      console.log('Cache updated for:', event.data.url);
    }
  });
}

function showUpdateAvailableNotification() {
  // You can implement a toast notification here
  console.log('New version available! Refresh to update.');
}

// Send performance data to service worker
export function reportPerformance(name: string, duration: number) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PERFORMANCE_MEASURE',
      data: { name, duration }
    });
  }
}

// Preload resources via service worker
export function preloadResources(urls: string[]) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_RESOURCES',
      urls: urls
    });
  }
}

// Web Vitals measurement
export function measureWebVitals() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Measure FCP (First Contentful Paint)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        reportPerformance('FCP', entry.startTime);
      }
    }
  });
  
  try {
    observer.observe({ type: 'paint', buffered: true });
  } catch {
    // Paint timing not supported
  }

  // Measure LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    reportPerformance('LCP', lastEntry.startTime);
  });
  
  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // LCP not supported
  }

  // Measure CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
      if (!layoutShiftEntry.hadRecentInput) {
        clsValue += layoutShiftEntry.value || 0;
      }
    }
    reportPerformance('CLS', clsValue);
  });
  
  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Layout shift not supported
  }
}

// Monitor resource loading performance
export function monitorResourceLoading() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resource = entry as PerformanceResourceTiming;
      if (resource.duration > 1000) { // Resources taking more than 1 second
        console.warn(`Slow resource: ${resource.name} took ${Math.round(resource.duration)}ms`);
      }
    }
  });

  try {
    resourceObserver.observe({ type: 'resource', buffered: true });
  } catch {
    // Resource timing not supported
  }
}