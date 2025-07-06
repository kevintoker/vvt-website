import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import "ldrs/react/Hatch.css";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
  {/* Page content */}
  <main className="flex-1 flex items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm pt-56">
      <LoginForm />
    </div>
  </main>

  {/* Footer */}
</div>

  );
}
