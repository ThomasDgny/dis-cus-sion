"use server";
import { Database } from "@/lib/database.type";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { signInFormSchema } from "@/lib/zod";

export async function handleSignIn(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });

  const parsedFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = signInFormSchema.parse(parsedFormData);
  const email = validatedData.email;
  const password = validatedData.password;

  const user = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (user.error) {
    return {
      error: "Email or password is wrong",
    };
  } else {
    return {
      user: user,
    };
  }
}
