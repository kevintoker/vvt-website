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
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  // Email validation function
  const validateEduEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
    return emailRegex.test(email);
  };

  // Handle email input change with real-time validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous email error
    setEmailError(null);
    
    // Only validate if email is not empty
    if (newEmail.trim()) {
      if (!validateEduEmail(newEmail)) {
        setEmailError("Please use a valid .edu email address");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    setEmailError(null);

    // Validate .edu email
    if (!validateEduEmail(email)) {
      setEmailError("Please use a valid .edu email address");
      setIsLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Check if username already exists BEFORE signUp
      const { data: existingUsers, error: checkError } = await supabase
        .from("player")
        .select("username")
        .eq("username", username);
      
      if (checkError) throw checkError;
      if (existingUsers && existingUsers.length > 0) {
        throw new Error("That username is already taken.");
      }

      // Step 2: Check if email already exists
      const { data: existingEmails, error: emailCheckError } = await supabase
        .from("player")
        .select("email")
        .eq("email", email);
      
      if (emailCheckError) throw emailCheckError;
      if (existingEmails && existingEmails.length > 0) {
        throw new Error("An account with this email already exists.");
      }

      // Step 3: Proceed with sign up only if username and email are unique
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      if (error || !data.user) throw error;

      // Step 4: Insert into `player` table
      const { error: insertError } = await supabase
        .from("player")
        .insert({
          id: data.user.id,
          username: username,
          email: data.user.email,
        });
      
      if (insertError) {
        throw insertError;
      }

      router.push("/protected");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 min-h-[60vh] relative", className)} {...props}>
      {isLoading ? (
        <div className="fixed inset-0 z-0 flex items-center justify-center">
          <Hatch size={48} stroke={4} speed={3.5} color="#861F41" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Create a new account with your .edu email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">School Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="username">Username</Label>
                  </div>
                  <Input
                    id="username"
                    type="text"
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
                <Button 
                  type="submit" 
                  className="w-full bg-[#861F41] text-white" 
                  disabled={isLoading || !!emailError}
                >
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