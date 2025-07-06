import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "@/components/update-password-form";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
