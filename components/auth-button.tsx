import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = "";
  if (user) {
    const { data: playerData, error } = await supabase
      .from("player")
      .select("username")
      .eq("id", user.id)
      .single();
      
    if (!error && playerData) {
      username = playerData.username;
    }
  }

  return user ? (
    <div className="flex items-center gap-4">
      <Button size="sm" variant="outline" className="pointer-events-none">
      Hey, {username}!
      </Button>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
