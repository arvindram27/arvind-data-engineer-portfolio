"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
}

interface NavBarProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  activeSection?: string;
}

export default function NavBar({
  logo = "/logo.svg",
  logoAlt = "Logo",
  items,
  activeSection = ""
}: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(activeSection || '#home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing animations
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Update active section from parent
  useEffect(() => {
    if (activeSection) {
      setActiveHref(activeSection);
    }
  }, [activeSection]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setActiveHref(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          hidden md:flex justify-center
          transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
          ${mounted && isScrolled ? 'pt-3' : 'pt-6'}
          ${mounted && isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
        `}
      >
        <div 
          className={`
            relative
            flex items-center gap-8
            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            ${mounted && isScrolled 
              ? 'px-6 py-2.5 scale-[0.98]' 
              : 'px-8 py-3.5 scale-100'
            }
          `}
          style={{
            background: (mounted && isScrolled) 
              ? 'rgba(17, 24, 39, 0.4)' 
              : 'rgba(17, 24, 39, 0.2)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            boxShadow: `
              inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
              0 20px 40px -20px rgba(239, 68, 68, 0.3),
              0 1px 0 0 rgba(255, 255, 255, 0.05)
            `,
            willChange: 'transform, backdrop-filter',
            transform: 'translateZ(0)',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
        >
          {/* Glass effect overlay */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}
          />
          {/* Logo */}
          <div className="flex-shrink-0 relative z-10">
            <div 
              className={`
                relative group cursor-pointer
                transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                ${mounted && isScrolled ? 'w-9 h-9' : 'w-10 h-10'}
              `}
            >
              <Image 
                src={logo} 
                alt={logoAlt}
                width={40}
                height={40}
                className="rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:rotate-12"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
            </div>
          </div>

          {/* Navigation Items */}
          <ul className="flex items-center gap-1 relative z-10">
            {items.map((item, index) => {
              const isActive = activeHref === item.href;
              return (
                <li 
                  key={index}
                  className={`
                    transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                    ${mounted && isScrolled ? 'scale-95' : 'scale-100'}
                  `}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      relative 
                      text-sm font-medium
                      transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                      ${mounted && isScrolled ? 'px-3.5 py-1.5' : 'px-4 py-2'}
                      ${isActive 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white/90'
                      }
                    `}
                    style={{
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    {/* Glass background */}
                    <span 
                      className={`
                        absolute inset-0 rounded-full
                        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                      `}
                      style={{
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(249, 115, 22, 0.3) 100%)'
                          : 'transparent',
                        backdropFilter: isActive ? 'blur(10px)' : 'none',
                        WebkitBackdropFilter: isActive ? 'blur(10px)' : 'none',
                        border: isActive 
                          ? '1px solid rgba(239, 68, 68, 0.3)' 
                          : '1px solid transparent',
                        boxShadow: isActive 
                          ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 4px 12px -2px rgba(239, 68, 68, 0.3)'
                          : 'none',
                        transform: isActive ? 'scale(1)' : 'scale(0.9)',
                        opacity: isActive ? 1 : 0
                      }}
                    />
                    
                    {/* Hover glass effect */}
                    <span 
                      className={`
                        absolute inset-0 rounded-full
                        transition-all duration-300
                        ${!isActive ? 'hover:opacity-100 opacity-0' : 'opacity-0'}
                      `}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    />
                    
                    {/* Glow effect for active */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-xl animate-pulse" />
                    )}
                    
                    {/* Text with subtle shadow */}
                    <span 
                      className="relative z-10"
                      style={{
                        textShadow: isActive 
                          ? '0 2px 8px rgba(239, 68, 68, 0.5)' 
                          : 'none'
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`
            fixed top-4 right-4 z-50
            w-12 h-12 rounded-full
            bg-gradient-to-r from-red-600 to-orange-600
            shadow-lg shadow-red-600/25
            flex items-center justify-center
            transition-all duration-300
            ${isMobileMenuOpen ? 'scale-90' : 'hover:scale-105'}
          `}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-center">
            <span 
              className={`
                absolute w-6 h-0.5 bg-white
                transition-all duration-300 ease-out
                ${isMobileMenuOpen 
                  ? 'rotate-45 translate-y-0' 
                  : '-translate-y-2'
                }
              `}
            />
            <span 
              className={`
                absolute w-6 h-0.5 bg-white
                transition-all duration-300 ease-out
                ${isMobileMenuOpen 
                  ? 'opacity-0' 
                  : 'opacity-100'
                }
              `}
            />
            <span 
              className={`
                absolute w-6 h-0.5 bg-white
                transition-all duration-300 ease-out
                ${isMobileMenuOpen 
                  ? '-rotate-45 translate-y-0' 
                  : 'translate-y-2'
                }
              `}
            />
          </div>
        </button>

        {/* Backdrop */}
        <div 
          className={`
            fixed inset-0 z-40
            bg-black/60 backdrop-blur-sm
            transition-opacity duration-300
            ${isMobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
            }
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide Menu */}
        <div 
          className={`
            fixed top-0 right-0 bottom-0 z-45 w-72
            transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            ${isMobileMenuOpen 
              ? 'translate-x-0' 
              : 'translate-x-full'
            }
          `}
          style={{
            background: 'rgba(17, 24, 39, 0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '-20px 0 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Logo Header */}
          <div className="p-6 border-b border-red-600/10">
            <div className="flex items-center gap-3">
              <Image 
                src={logo} 
                alt={logoAlt}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-white font-semibold">Navigation</div>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="p-4">
            {items.map((item, index) => {
              const isActive = activeHref === item.href;
              return (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-600/25' 
                        : 'text-red-200/80 hover:bg-red-600/10 hover:text-white'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span 
                        className={`
                          w-2 h-2 rounded-full
                          ${isActive ? 'bg-white' : 'bg-red-600/40'}
                        `}
                      />
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

    </>
  );
}