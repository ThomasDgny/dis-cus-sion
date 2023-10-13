import React from "react";
import { cn } from "@/lib/utils";
import { Database } from "@/lib/database.type";
import EmailInput from "@/components/auth/_components/EmailInput";
import PasswordInput from "@/components/auth/_components/PasswordInput";
import SubmitButton from "@/components/auth/_components/SubmitButton";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import UserNameInput from "@/components/auth/_components/UserNameInput";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// TODO: ERROR HANDLE MESSAGE ADD AND ZOD

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  async function onSubmit(formData: FormData) {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });
    const user_name = String(formData.get("username"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    async function insertUser(data: any) {
      const userID = data.user.id;
      await supabase.from("users").insert({
        id: userID,
        email: email.toLowerCase(),
        user_name: user_name,
        timestamp: new Date().toISOString(),
      });
    }

    await supabase.auth
      .signUp({
        email,
        password,
      })
      .then(async ({ data, error }) => {
        console.log("auth table", data);
        if (data.user) {
          await insertUser(data);
          redirect("/");
        } else {
          
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={onSubmit}>
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
