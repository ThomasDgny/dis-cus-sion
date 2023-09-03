"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.type";
import { User } from "@/types/Types";

type UserContext = {
  user: User | undefined;
  handleSignOut: () => void;
  setUser: (data: User) => void;
};

const AuthContext = createContext<UserContext | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  async function getSessionUserData(userID: string) {
    try {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("id", userID)
        .single();
      console.log("Context", data);
      setUser(data ?? undefined);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          const data = payload.new 
          console.log("Set User",data)
          setUser(data);
        },
      )
      .subscribe();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.access_token) return getSessionUserData(session.user.id);
      router.refresh();
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supabase]);

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(undefined);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
