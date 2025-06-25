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
    <nav className="w-full relative flex items-center justify-between h-16 border-b border-b-foreground/10 px-4">
      <Link href={"/"}>Valorant at Virginia Tech</Link>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5 items-center font-semibold">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="nav" size="sm">
              Teams
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem asChild>
              <Link href="/teams/premier">Premier</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/teams/signature">Signature</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="opacity-50">|</span>
        <Button variant="nav" size="sm">
          <Link href={"/"}>Staff</Link>
        </Button>
        <span className="opacity-50">|</span>
        <Button variant="nav" size="sm">
          <Link href={"/"}>Tryouts</Link>
        </Button>
      </div>
      <div>{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}</div>
    </nav>
  );
}
