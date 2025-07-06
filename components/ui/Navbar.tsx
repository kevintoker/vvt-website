// components/navbar.tsx (Server Component)
import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { MobileNavbar } from "./mobile-navbar";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#861F41] from-transparent bg-background pr-4 fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between relative">
        {/* Logo - Always visible */}
        <div className="flex-shrink-0">
          <Link 
            href="/"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            <span className="hidden sm:inline">Valorant at Virginia Tech</span>
            <span className="sm:hidden">VVT</span>
          </Link> 
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-5 font-semibold text-xl">
          <Link
            href="/members"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Members
          </Link>
          <Link
            href="/staff"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Staff
          </Link>
          <Link
            href="/protected"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Profile
          </Link>
          <Link
            href="/tryouts"
            className="px-3 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white whitespace-nowrap"
          >
            Tryouts & Membership
          </Link>
        </div>
        
        {/* Right side - Auth/Env and Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Auth Button - Always visible */}
          <div className="flex-shrink-0">
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
          
          {/* Mobile Menu Component */}
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}