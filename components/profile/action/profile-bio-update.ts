"use server";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { userBio } from "@/lib/zod";

export async function updateBio(userID: string, formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });
  const bio = formData.get("bio") as string;
  const validatedBio = userBio.safeParse(bio);

  if (validatedBio.success) {
    await supabase
      .from("users")
      .update({
        bio: validatedBio.data,
      })
      .eq("id", userID);
  } else {
    return {
      error: validatedBio.error.issues[0].message,
    };
  }
}
