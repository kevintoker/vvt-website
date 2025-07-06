import { Button } from "../components/ui/button";
import { FaXTwitter, FaInstagram, FaDiscord, FaYoutube,} from "react-icons/fa6";

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
    </div>
  );
}