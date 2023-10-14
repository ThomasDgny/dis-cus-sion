"use client";
import React from "react";
import { cn } from "@/lib/utils";
import EmailInput from "@/components/auth/_components/EmailInput";
import PasswordInput from "@/components/auth/_components/PasswordInput";
import SubmitButton from "@/components/auth/_components/SubmitButton";
import UserNameInput from "@/components/auth/_components/UserNameInput";
import { useToast } from "@/components/ui/use-toast";
import { handleSignUp } from "@/components/auth/actions/signup-auth-action";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  async function handleSignUpClient(formData: FormData) {
    const result = await handleSignUp(formData);
    if (result.user?.id) {
      toast({ description: `Welcome! ${result.user?.email}` });
    } else {
      toast({ variant: "destructive", description: result.error });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={handleSignUpClient}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <UserNameInput />
            <EmailInput />
            <PasswordInput />
          </div>
          <SubmitButton buttonText="Sign up with email" />
        </div>
      </form>
    </div>
  );
}
