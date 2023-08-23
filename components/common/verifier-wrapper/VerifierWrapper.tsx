"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

interface AccountVerifierWrapperProps {
  children: React.ReactNode;
}

export default function AccountVerifierWrapper({
  children,
}: AccountVerifierWrapperProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) return router.replace("/");
  }, [user, router]);

  return <>{children}</>;
}
