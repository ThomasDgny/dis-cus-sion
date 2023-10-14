"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { signUpFormSchema } from "@/zod";

export async function handleSignUp(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });

  const parsedFormData = {
    name: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = signUpFormSchema.parse(parsedFormData);
  const user_name = validatedData.name;
  const email = validatedData.email;
  const password = validatedData.password;

  async function insertUser(data: any) {
    const userID = data.id;
    const createUserData = await supabase.from("users").insert({
      id: userID,
      email: email.toLowerCase(),
      user_name: user_name,
      timestamp: new Date().toISOString(),
    });

    if (createUserData.error) {
      return {
        error: "User data insertion failed",
      };
    } else {
      return {
        user: createUserData.data,
      };
    }
  }

  const signUpUser = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpUser.error) {
    return {
      error: "Email or password is wrong",
    };
  } else {
    const user = signUpUser.data.user ?? null;
    await insertUser(user);
    return {
      user: user,
    };
  }
}
