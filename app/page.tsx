import { Button } from "../components/ui/button";
import StaffCarousel from "./staff-carousel";
import { FaXTwitter, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import VVT from "./public/VVT Transparent.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center px-8 py-12 gap-8 relative overflow-hidden bg-vvt-banner">
        {/* Your content here, make sure it's above the overlay */}
        <div className="relative z-20 flex w-full">
          {/* Left: Hero text */}
          <div className="flex-1 flex items-center justify-start">
            <div className="flex flex-col">
              {/* Small header text */}
              <p className="text-white text-lg md:text-2xl font-medium tracking-wider uppercase pt-[510px] ml-8">
                Create the things you wish existed
              </p>
              {/* Main hero text */}
              <h1 className="text-white text-[6vw] leading-tight font-extrabold uppercase tracking-tight ml-8">
                Strive for<br />
                the future
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full border-t border-[#861F41] bg-background">
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
    </div>
  );
}