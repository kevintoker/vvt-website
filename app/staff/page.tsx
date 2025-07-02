import { HeroV2 } from "@/components/herov2";
import { Button } from "../../components/ui/button";
import StaffCarousel from "../staff-carousel";
import { FaXTwitter, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";


export default function Home() {
  return (
    <div className="min-screen w-full overflow-hidden">
    <main className="min-h-screen flex flex-col items-center overflow-y-hidden">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col max-w-5xl w-full p-1 mx-auto">
          <HeroV2 />
          <p className="text-3xl lg:text-4xl !leading-tight font-light mx-auto max-w-xl text-center mb-8">Meet the Staff!</p>
          <StaffCarousel />
        </div>  
        <footer className="w-full flex flex-col items-center justify-center border-t border-[#861F41] mx-auto text-center gap-4 py-8 mb-0">
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
        </div>
        <p className="text-muted-foreground text-xs !text-white">
          Developed and maintained by{' '} <a
            href="https://www.linkedin.com/in/kevin-toker-14272024b/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-400"
              >Kevin Toker</a>,{' '} <a
            href="https://www.linkedin.com/in/marcoli1/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-400"
              >Marco Li</a>,{' '} and <a
            href="https://www.linkedin.com/in/cody-cockrell/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-400"
              >Cody Cockrell</a>
        </p>
      </footer>
      </div>
    </main>
    </div>
  );
}