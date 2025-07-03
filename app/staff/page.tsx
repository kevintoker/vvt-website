import { Button } from "../../components/ui/button";
import StaffCarousel from "../staff-carousel";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import ImageGenerator, { ImageSourceType } from "@/components/ImageGenerator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background pt-16">
      <main className="flex-1 flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <div className="flex-1 flex flex-col max-w-5xl w-full p-1 mx-auto">
            <div className="flex flex-col items-center justify-center pt-6 pb-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <a>
                  <ImageGenerator
                    path={"/VVT.png"}
                    sourceType={ImageSourceType.URL}
                    className="rounded-full object-cover w-32 h-32"
                  />
                </a>
                <p className="text-3xl lg:text-4xl !leading-tight font-light text-center">
                  Valorant at Virginia Tech
                </p>
              </div>
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#861F41] to-transparent mt-8" />
            </div>
            <p className="text-3xl lg:text-4xl !leading-tight font-light mx-auto max-w-xl text-center mb-8">
              Meet the Staff!
            </p>
            <StaffCarousel />
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#861F41] bg-background mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-center h-16 px-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://x.com/VirginiaTechVAL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" className="w-10 h-10">
                  <FaXTwitter className="!w-8 !h-8 !text-white" />
                </Button>
              </a>
              <a
                href="https://www.instagram.com/vt_valorantt/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
