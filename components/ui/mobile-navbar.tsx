// components/mobile-navbar.tsx (Client Component)
"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/members", label: "Members" },
    { href: "/staff", label: "Staff" },
    { href: "/protected", label: "Profile" },
    { href: "/tryouts", label: "Tryouts & Membership" },
  ];

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-md text-white hover:bg-[#861F41] transition-colors"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>
      
      {/* Mobile Menu - Slides down when open */}
      <div className={`md:hidden absolute top-16 left-0 right-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-background border-t border-[#861F41]`}>
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block px-4 py-3 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}