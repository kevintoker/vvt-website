import Image from "next/image";
import VVT from "../app/public/VVT.png";

export function HeroV2() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a>
          <Image
            src={VVT}
            alt="VVT Logo"
            width={1024}
            height={1024}
            className="rounded-full object-cover w-32 h-32"
          />
        </a>
      </div>
        <p className="text-3xl lg:text-4xl !leading-tight font-light mx-auto max-w-xl text-center">Valorant at Virginia Tech</p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-0" />
    </div>
  );
}