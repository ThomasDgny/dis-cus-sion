import React from "react";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.type";
import { cookies } from "next/headers";

interface AccountVerifierWrapperProps {
  children: React.ReactNode;
}

export default async function AccountVerifierWrapper({
  children,
}: AccountVerifierWrapperProps) {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  return <>{children}</>;
}
