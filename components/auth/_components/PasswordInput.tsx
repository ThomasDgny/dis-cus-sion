"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { experimental_useFormStatus } from "react-dom";

export default function PasswordInput() {
  const { pending } = experimental_useFormStatus();
  return (
    <Input
      name="password"
      placeholder="T7tfB8zXJNUJqFXn"
      type="password"
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect="off"
      required
      disabled={pending}
    />
  );
}
