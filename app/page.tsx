import { DeployButton } from "@/components/button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { HeroV2 } from "@/components/herov2";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import { Button } from "../components/ui/button";
import Link from "next/link";
import StaffCarousel from "./staff-carousel";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";


const ICON_SIZE = 64;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-5 max-w-5xl p-1">
          <HeroV2 />
          <p className="text-3xl lg:text-4xl !leading-tight font-light mx-auto max-w-xl text-center">Meet the Staff!</p>
          <StaffCarousel />
        </div>  
        <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center gap-4 py-8">
          <div className="flex gap-4">
            <a href="https://x.com/VirginiaTechVAL" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="w-10 h-10">
                <FaXTwitter className="!w-8 !h-8 text-muted-foreground" />
              </Button>
            </a>
            <a href="https://www.instagram.com/vt_valorantt/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="w-10 h-10">
                <FaInstagram className="!w-8 !h-8 text-muted-foreground" />
              </Button>
            </a>
          </div>
          <p className="text-muted-foreground text-xs text-white">Developed and maintained by{' '} <a
            href="https://www.linkedin.com/in/kevin-toker-14272024b/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
              >Kevin Toker</a>,{' '} <a
            href="https://www.linkedin.com/in/marcoli1/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
              >Marco Li</a>,{' '} and <a
            href="https://www.linkedin.com/in/cody-cockrell/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
              >Cody Cockrell</a></p>
        </footer>
      </div>
    </main>
  );
}