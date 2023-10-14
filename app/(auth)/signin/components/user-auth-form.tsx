"use client";
import React from "react";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/auth/_components/SubmitButton";
import EmailInput from "@/components/auth/_components/EmailInput";
import PasswordInput from "@/components/auth/_components/PasswordInput";
import { handleSignIn } from "@/components/auth/actions/signin-auth-action";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  async function handleSignInClient(formData: FormData) {
    const result = await handleSignIn(formData);
    if (result.user?.data.user.id) {
      toast({ description: `Welcome back! ${result.user.data.user.email}` });
    } else {
      toast({ variant: "destructive", description: result.error });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={handleSignInClient}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <EmailInput />
            <PasswordInput />
          </div>
          <SubmitButton buttonText="Sign in with email" />
        </div>
      </form>
    </div>
  );
}
