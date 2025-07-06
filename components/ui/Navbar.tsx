// components/navbar.tsx (Server Component)
import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { MobileNavbar } from "./mobile-navbar";
import { ProfilePicture } from "./profile-picture";
import { FaXTwitter, FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa6";
import { Button } from "./button";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#861F41] from-transparent bg-background pr-4 fixed top-0 left-0 z-50">
      <div className="w-full h-16 px-4 flex items-center justify-between relative">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <Link 
            href="/"
            className="px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white whitespace-nowrap"
          >
            <span className="hidden sm:inline">Valorant at Virginia Tech</span>
            <span className="sm:hidden">VVT</span>
          </Link>
        </div>
        
        {/* Center Section - Navigation Links (Hidden on mobile) - Absolutely positioned to center */}
        <div className="hidden md:flex items-center gap-5 font-semibold text-xl absolute left-1/2 transform -translate-x-1/2">
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
            href="/teams"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white whitespace-nowrap"
          >
            Rosters
          </Link>
          <Link
            href="/tryouts"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white whitespace-nowrap"
          >
            Tryouts & Membership
          </Link>
        </div>
        
        {/* Right Section - Auth/Env, Profile Picture, and Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Auth Button - Always visible */}
          <div className="flex-shrink-0">
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
          
          {/* Profile Picture Component with consistent spacing */}
          <div className="flex-shrink-0">
            <ProfilePicture />
          </div>
          
          {/* Mobile Menu Component */}
          <div className="flex-shrink-0">
            <MobileNavbar />
          </div>
        </div>
      </div>
      <footer className="w-full border-t border-[#861F41] bg-background fixed bottom-0">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-16 px-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a href="https://x.com/VirginiaTechVAL" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaXTwitter className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
              <a href="https://www.instagram.com/vt_valorantt/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaInstagram style={{ color: "white" }} className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
              <a href="https://discord.gg/ukjazNp7FH" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaDiscord style={{ color: "white" }} className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
              <a href="https://www.youtube.com/@ValorantVT" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-10 h-10">
                  <FaYoutube style={{ color: "white" }} className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
            </div>
            <div className="h-6 w-px bg-border mx-4"></div> {/* Optional separator */}
            <p className="text-muted-foreground text-xs !text-white">
              Developed and maintained by{' '}
              <a
                href="https://www.linkedin.com/in/kevin-toker-14272024b/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Kevin Toker</a>,{' '}
              <a
                href="https://www.linkedin.com/in/marcoli1/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Marco Li</a>,{' '}
              and{' '}
              <a
                href="https://www.linkedin.com/in/cody-cockrell/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >Cody Cockrell</a>
            </p>
          </div>
        </div>
      </footer>
    </nav>
  );
}