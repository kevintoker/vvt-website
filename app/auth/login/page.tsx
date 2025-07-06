import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { Hatch } from "ldrs/react";
import "ldrs/react/Hatch.css";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
  {/* Page content */}
  <main className="flex-1 flex items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm pt-56">
      <LoginForm />
    </div>
  </main>

  {/* Footer */}
  <footer className="fixed bottom-0 w-full border-t border-[#861F41] bg-background z-50">
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
          <a href="https://www.linkedin.com/in/kevin-toker-14272024b/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-400">Kevin Toker</a>,{" "}
          <a href="https://www.linkedin.com/in/marcoli1/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-400">Marco Li</a>, and{" "}
          <a href="https://www.linkedin.com/in/cody-cockrell/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-400">Cody Cockrell</a>
        </p>
      </div>
    </div>
  </footer>
</div>

  );
}
