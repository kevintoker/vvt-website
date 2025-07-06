import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
      {/* Footer */}
    </div>
  );
}
