"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider";
import { Label } from "@/components/ui/label";
import { updateUserName } from "../../action/profile-name-update";
import { experimental_useFormStatus } from "react-dom";

export default function EditUserName() {
  const { user, getSessionUserData } = useAuth();
  const { pending } = experimental_useFormStatus();
  const { toast } = useToast();
  const userName: string | null = user?.user_name ?? "";

  async function handleUpdateProfile(formData: FormData) {
    const result = await updateUserName(user!.id, formData);

    if (result?.error) {
      toast({
        variant: "destructive",
        description: result.error,
      });
    } else {
      getSessionUserData(user!.id);
      toast({
        description: "Your changes have been saved.",
      });
    }
  }

  return (
    <div>
      <form
        className="grid grid-cols-5 items-center gap-4"
        action={handleUpdateProfile}
      >
        <Label htmlFor="name" className="text-right">
          Username
        </Label>
        <Input
          name="name"
          id="name"
          defaultValue={userName}
          className="col-span-3"
          disabled={pending}
          required
        />
        <Button type="submit" variant={"ghost"} disabled={pending}>
          {!pending ? "Update" : "Loading"}
        </Button>
      </form>
    </div>
  );
}
