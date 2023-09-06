"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.type";
import { User } from "@/types/Types";
import { useToast } from "@/components/ui/use-toast";

type UserContext = {
  user: User | undefined;
  handleSignOut: () => void;
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
  const { toast } = useToast();

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

  useEffect(() => {
    const channel = supabase
      .channel("table-filter-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          const data = payload.new;
          console.log("context user updated", data);
          setUser({
            avatar: data.avatar,
            bio: data.bio,
            email: data.email,
            id: data.id,
            timestamp: data.timestamp,
            user_name: data.user_name,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user?.id]);

  async function getSessionUserData(userID: string) {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("id", userID)
      .single();
    setUser(data ?? undefined);
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong please try again",
      });
      return null;
    }
    setUser(undefined);
    router.replace("/");
    toast({
      description: "Successfully signed out",
    });
  }

  return (
    <AuthContext.Provider value={{ user, handleSignOut }}>
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
