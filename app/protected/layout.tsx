import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-20 max-w-5xl p-5 w-full">
            {children}
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#861F41] bg-background mt-auto">
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
                  <FaInstagram className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
            </div>
            <div className="h-6 w-px bg-border mx-4"></div>
            <p className="text-muted-foreground text-xs !text-white">
              Developed and maintained by{" "}
              <a
                href="https://www.linkedin.com/in/kevin-toker-14272024b/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >
                Kevin Toker
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/marcoli1/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >
                Marco Li
              </a>
              , and{" "}
              <a
                href="https://www.linkedin.com/in/cody-cockrell/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-400"
              >
                Cody Cockrell
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
