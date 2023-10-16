"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { userName } from "@/zod";

export async function updateUserName(userID: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
  const name = formData.get("name") as string;
  const validatedBio = userName.safeParse(name);

  if (validatedBio.success) {
    await supabase
     .from("users")
      .update({
        user_name: validatedBio.data,
      })
      .eq("id", userID);
  } else {
    return {
      error: validatedBio.error.issues[0].message,
    };
  }
}
