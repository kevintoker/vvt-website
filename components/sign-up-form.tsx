"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Hatch } from 'ldrs/react';
import 'ldrs/react/Hatch.css';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  const supabase = createClient();
  setIsLoading(true);
  setError(null);

  if (password !== repeatPassword) {
    setError("Passwords do not match");
    setIsLoading(false);
    return;
  }

  try {
    // Step 1: Check if username already exists BEFORE signUp
    const { data: existingUsers, error: checkError } = await supabase.from("player").select("username").eq("username", username);
    if (checkError) throw checkError;
    if (existingUsers && existingUsers.length > 0) {
      throw new Error("That username is already taken.");
    }

    // Step 2: Proceed with sign up only if username is unique
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    });

    if (error || !data.user) throw error;

    // Step 3: Insert into `player` table
    const { error: insertError } = await supabase
    .from("player")
    .insert({
      id: data.user.id,
      username: username,
      email: data.user.email, // Assuming data.user.email contains the user's email
    });
    
    if (insertError) {
      // Optional: Roll back auth user if you want (requires admin API)
      throw insertError;
    }

    router.push("/protected");
    router.refresh();
    // Do NOT set isLoading to false here, let the animation persist until navigation
  } catch (error: unknown) {
    setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    setIsLoading(false); // Only stop loading if there's an error
  }
};


  return (
    <div className={cn("flex flex-col gap-6 min-h-[60vh] relative", className)} {...props}>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "hsl(var(--background))" }}>
        <Hatch size={48} stroke={4} speed={3.5} color="#861F41" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="username">Username</Label>
                  </div>
                  <Input
                    id="username"
                    type="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password">Repeat Password</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full bg-[#861F41] text-white" disabled={isLoading}>
                  {isLoading ? "Creating an account..." : "Sign up"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
