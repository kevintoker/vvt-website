
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
          <Button 
            variant="nav"
            size="lg"
            className="transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
          <Link href={"/"}>Valorant at Virginia Tech</Link>
          </Button>
        </div>
        {/* Center: Nav Links */}
        <div className="flex-1 flex justify-center items-center gap-5 font-semibold text-xl">
          <Button
            variant="nav"
            size="lg"
            className="transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            <Link href="/members">Members</Link>
          </Button>
          <span className="opacity-50">|</span>
          <Button
            variant="nav"
            size="lg"
            className="transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            <Link href={"/protected"}>Profile</Link>
          </Button>
          <span className="opacity-50">|</span>
          <Button
            variant="nav"
            size="lg"
            className="transition-colors hover:bg-[#861F41] hover:text-white text-white"
          >
            <Link href={"/"}>Tryouts</Link>
          </Button>
        </div>
        {/* Right: Auth/Env */}
        <div className="flex-1 flex justify-end items-center min-w-0">
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </div>
    </nav>
  );
}
