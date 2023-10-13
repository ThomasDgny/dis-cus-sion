import React from "react";
import { cn } from "@/lib/utils";
import { Database } from "@/lib/database.type";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SubmitButton from "@/components/auth/_components/SubmitButton";
import EmailInput from "@/components/auth/_components/EmailInput";
import PasswordInput from "@/components/auth/_components/PasswordInput";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface ErrorProps {
  status?: boolean;
  message?: string | null;
}

// TODO: ERROR HANDLE MESSAGE ADD AND ZOD 

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  async function onSubmit(formData: FormData) {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ data: { user }, error }) => {
        if (error) {
          console.log(error);
        }
        if (user) {
          redirect("/");
        }
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={onSubmit}>
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
