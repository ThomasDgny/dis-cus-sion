"use client";
import React, { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/db/supabaseClient";
import { Message } from "@/types/Types";

interface MessagesProps {
  topicID: string | null;
}

export default function ChatMainScreen({ topicID }: MessagesProps) {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const { data: messages, error } = await supabaseClient
    .from("messages")
    .select("*")
    .eq("topic_id", topicID);
    setMessages(messages)

    if (!messages) {
      alert('no messages')
      return
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  useEffect(() => {
    const messages = supabaseClient
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((current) => [...current as Message[], payload.new as Message ])
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(messages);
    };
  }, []);

  return (
    <div className="relative h-full bg-red-500 overflow-y-auto" ref={messagesRef}>
      <ul className="flex flex-col justify-end space-y-1 p-4">
        {messages?.map((item) => <li key={item.id}>{item.message}</li>)}
      </ul>
    </div>
  );
}
