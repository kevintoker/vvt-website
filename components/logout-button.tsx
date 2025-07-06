"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh(); // Refresh the page to ensure the user is logged out
  };

  return (
    <Button size="sm" variant="outline" onClick={logout}>
      Sign out
    </Button>
  );
}
