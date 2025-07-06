import { Button } from "../../components/ui/button";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-20 items-center">
          <div className="flex flex-col gap-20 max-w-5xl p-5 w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
