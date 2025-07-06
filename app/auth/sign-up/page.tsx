import { SignUpForm } from "@/components/sign-up-form";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm pt-[200px]">
        <SignUpForm />
      </div>
      {/* Footer */}
    </div>
  );
}
