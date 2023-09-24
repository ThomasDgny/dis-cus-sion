"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/context/AuthProvider";
import { Database } from "@/lib/database.type";
import { Button } from "@/components/ui/button";

interface CurrentMessageProps {
  message: string;
  sender_id: string;
  topic_id: string;
}

interface SendMessageProps {
  topicID: string;
}

export default function SendMessage({ topicID }: SendMessageProps) {
  const [message, setMessage] = useState<string>("");
  const supabase = createClientComponentClient<Database>();
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const { user } = useAuth();
  if (!user) return null;

  const currentMessage: CurrentMessageProps = {
    message,
    sender_id: user.id,
    topic_id: topicID,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    const { error } = await supabase.from("messages").insert(currentMessage);

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setMessage("");
    }
  };

  return (
    <div>
      <div>
      {isTyping && <>{user.user_name} is typing...</>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3 border-t p-2">
        <Input
          value={message}
          type="text"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send your message"
          onFocus={()=> setIsTyping(true)}
          onBlur={()=> setIsTyping(false)}
        />
        <Button type="submit"> Send</Button>
      </form>
    </div>
  );
}
