"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.type";

type UserContext = {
  user: User | undefined;
};

const AuthContext = createContext<UserContext | undefined>(undefined);

export default function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User>();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.access_token) return setUser(session.user);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
