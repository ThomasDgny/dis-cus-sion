"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { handleSendMessage } from "../../action/send-message";
import { useToast } from "@/components/ui/use-toast";

interface SendMessageProps {
  topicID: string;
}

export default function SendMessage({ topicID }: SendMessageProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  if (!user) return null;

  const handleSubmit = async (formData: FormData) => {
    const result = await handleSendMessage(formData, user.id, topicID);
    if (result?.error) {
      toast({ variant: "destructive", description: result.error });
    } else {
      formRef.current?.reset();
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        action={handleSubmit}
        className="flex gap-3 border-t p-2"
      >
        <Input
          type="text"
          name="message"
          placeholder="Send your message"
          required
        />
        <Button type="submit"> Send</Button>
      </form>
    </div>
  );
}
