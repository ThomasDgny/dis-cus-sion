"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/database.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Disc2, Github } from "../../../../node_modules/lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ErrorProps {
  status?: boolean;
  message?: string | null;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
  const router = useRouter();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ data: { user }, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
          clearInputs();
          setIsLoading(false);
        }
        if (user) {
          toast({ description: `Logged in as ${user.email}!` });
          router.replace("/");
        }
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Input
              id="password"
              placeholder="T7tfB8zXJNUJqFXn"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Disc2 className="mr-2 h-4 w-4 animate-spin" />}
            Login In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Disc2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}

function ErrorLabel(error: ErrorProps) {
  return (
    <p className="rounded-md border border-red-500 bg-red-50 px-4 py-1 text-center text-xs text-red-500">
      {error.message}
    </p>
  );
}
