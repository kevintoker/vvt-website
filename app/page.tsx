import { HeroV2 } from "@/components/herov2";
import { Button } from "../components/ui/button";
import StaffCarousel from "./staff-carousel";
import { FaXTwitter, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import VVT from "./public/VVT Transparent.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="flex flex-1 items-center justify-center px-8 py-12 gap-8 relative overflow-hidden bg-vvt-banner"
      >
        {/* Overlay for darkening and vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none"
             style={{
               background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,0.35) 100%), rgba(0,0,0,0.3)"
             }}
        />
        {/* Your content here, make sure it's above the video */}
        <div className="relative z-20 flex w-full">
          {/* Left: English Text */}
          <div className="flex-1 flex items-start">
            <h1 className="text-white text-[5vw] leading-tight font-extrabold">
              Make history where no one has touched.
            </h1>
          </div>
          {/* Center: Logo */}
            <div className="flex-shrink-0 flex items-center justify-center px-4">
              <div className="transition-transform duration-300 hover:scale-105">
                <Image
                  src={VVT}
                  alt="Logo"
                  className="w-[42rem] h-[42rem] object-contain"
                />
              </div>
            </div>
          {/* Right: Japanese Text */}
          <div className="flex-1 flex items-start justify-end">
            <div className="text-white text-xl overflow-y-auto leading-relaxed w-full max-w-xs font-extrabold">
              Valorant at Virginia Tech aspires to bring together students who are interested and passionate about Valorant, in developing a club with a strong sense of community.<br /><br />
              Our organization aims to develop the interpersonal and strategic life skills of all our members in and out of the game.<br /><br />
              Combat gaming stigmas to ensure the inclusivity of marginalized and diverse backgrounds, provide opportunities for students seeking experience and networks in the esports field, and compete at the highest level within Valorant collegiate competition.
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center border-t border-primary-200 mx-auto text-center gap-4 py-8 mb-0">
        <div className="flex gap-4">
          <a href="https://x.com/VirginiaTechVAL" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="w-10 h-10">
              <FaXTwitter className="!w-8 !h-8 !text-black" />
            </Button>
          </a>
          <a href="https://www.instagram.com/vt_valorantt/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="w-10 h-10">
              <FaInstagram style={{ color: "white" }} className="!w-8 !h-8 !text-black" />
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground text-xs !text-black">
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
  );
}