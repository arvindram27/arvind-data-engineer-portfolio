"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Generate a simple blur placeholder
  const generateBlurDataURL = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmM2Y0ZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlN2ViO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+";
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-700 text-gray-400 text-sm",
          className
        )}
        style={width && height ? { width, height } : {}}
      >
        Failed to load image
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: cn(
      "transition-opacity duration-300",
      isLoading ? "opacity-0" : "opacity-100",
      className
    ),
    onLoad: handleLoad,
    onError: handleError,
    priority,
    sizes,
    placeholder: placeholder as "blur" | "empty",
    blurDataURL: blurDataURL || (placeholder === 'blur' ? generateBlurDataURL() : undefined)
  };

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse" />
        )}
        <Image
          {...imageProps}
          fill
          alt={alt}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-700 animate-pulse rounded"
          style={width && height ? { width, height } : {}}
        />
      )}
      <Image
        {...imageProps}
        width={width || 400}
        height={height || 400}
        alt={alt}
      />
    </div>
  );
}