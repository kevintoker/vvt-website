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
      <div className="max-w-5xl mx-auto flex items-center h-16 px-4">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center min-w-0">
          <Link 
            href="/"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Valorant at Virginia Tech
          </Link>
        </div>
        {/* Center: Nav Links */}
        <div className="flex-1 flex justify-center items-center gap-5 font-semibold text-xl">
          <Link
            href="/members"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Members
          </Link>
          <span className="opacity-50">|</span>
          <Link
            href="/staff"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Staff
          </Link>
          <span className="opacity-50">|</span>
          <Link
            href="/protected"
            className="px-6 py-2 rounded-md text-sm font-light transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            Profile
          </Link>
        </div>
        {/* Right: Auth/Env */}
        <div className="flex-1 flex justify-end items-center min-w-0">
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </div>
    </nav>
  );
}