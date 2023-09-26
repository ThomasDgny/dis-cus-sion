"use client";
import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/database.type";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Disc2 } from "../../../../node_modules/lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user_name, setUser_name] = useState<string>("");

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function clearInputs() {
    setEmail("");
    setPassword("");
  }

  async function insertUser(data: any) {
    const userID = data.user.id;
    await supabase.from("users").insert({
      id: userID,
      email: email.toLowerCase(),
      user_name: user_name,
      timestamp: new Date().toISOString(),
    })
  }

  async function createAccount() {
    setIsLoading(true);
    await supabase.auth
      .signUp({
        email,
        password,
      })
      .then(async ({ data }) => {
        console.log("auth table", data);
        if (data.user) {
          await insertUser(data);
          toast({ description: `${email}! Account created!` });
          router.push("/");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
        setIsLoading(false);
        clearInputs();
      });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    createAccount();
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Input
              id="username"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setUser_name(e.target.value)}
              value={user_name}
              required
            />
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
          <Button disabled={isLoading} type="submit">
            {isLoading && <Disc2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
