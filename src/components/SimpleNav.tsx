"use client";

import { useState } from 'react';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
}

interface SimpleNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref: string;
  className?: string;
}

export default function SimpleNav({
  logo = "/logo.svg",
  logoAlt = "Logo",
  items,
  activeHref,
  className = ""
}: SimpleNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center pt-4">
        <div className="bg-gray-800/90 backdrop-blur-lg border border-red-600/30 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image 
                src={logo} 
                alt={logoAlt}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
                priority
              />
            </div>
            
            {/* Navigation Items */}
            <nav className="flex items-center gap-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeHref === item.href
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-red-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800/95 backdrop-blur-lg border border-red-600/30 rounded-lg shadow-xl py-2 min-w-[160px]">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  activeHref === item.href
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}