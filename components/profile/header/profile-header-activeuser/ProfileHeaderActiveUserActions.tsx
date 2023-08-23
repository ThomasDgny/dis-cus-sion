"use client"
import React from "react";
import { EditProfile } from "../../dialog/EditProfile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";


export default function ProfileHeaderActiveUserActions() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  
  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
    console.log(error?.message)
      router.replace("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-4 space-x-3">
      <EditProfile />
      <Button variant={"destructive"} onClick={handleSignOut}>
        Log out
      </Button>
    </div>
  );
}
