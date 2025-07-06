import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#861F41] from-transparent bg-background pr-4 fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-center relative">
        {/* Left: Logo - Positioned at fixed distance from center */}
        <div className="absolute left-4">
          <Link 
            href="/"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Valorant at Virginia Tech
          </Link> 
        </div>
        
        {/* Center: Nav Links - Truly centered */}
        <div className="flex items-center gap-5 font-semibold text-xl">
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
        
        {/* Right: Auth/Env - Positioned at fixed distance from center */}
        <div className="absolute right-4">
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </div>
    </nav>
  );
}