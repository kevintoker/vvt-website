import Image from "next/image";
import VVT from "../app/public/VVT.png";

export function HeroV2() {
  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <a>
          <Image
            src={VVT}
            alt="VVT Logo"
            width={1024}
            height={1024}
            className="rounded-full object-cover w-32 h-32"
          />
        </a>
        <p className="text-3xl lg:text-4xl !leading-tight font-light text-center">
          Valorant at Virginia Tech
        </p>
      </div>
      <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#861F41] to-transparent mt-8" />
    </div>
  );
}