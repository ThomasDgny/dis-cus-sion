"use client";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/db/supabaseClient";
import { Message } from "@/types/Types";
import MassageCard from "./MassageCard";
import fetchUserProfilesForSenders from "@/utils/fetchUserProfilesInchat";
import ChatLoading from "@/components/common/loading/ChatLoading";
import { scrollToBottom } from "@/utils/scrollBottom";

interface MessagesProps {
  topicID: string | null;
}

export default function ChatMainScreen({ topicID }: MessagesProps) {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [senders, setSenders] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserProfile(messages: Message[]) {
    const userProfilesDictionary = await fetchUserProfilesForSenders(messages);
    setSenders(userProfilesDictionary);
  }

  const getData = async () => {
    const { data: messages, error } = await supabaseClient
      .from("messages")
      .select("*")
      .eq("topic_id", topicID)
      .range(0, 30)
      .order("created_at", { ascending: true });
    setMessages(messages);

    if (!messages) {
      alert("no messages");
      return;
    }
    getUserProfile(messages as Message[]);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicID]);

  useEffect(() => {
    const messagesChannel = supabaseClient
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((current) => [
            ...(current as Message[]),
            payload.new as Message,
          ]);
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(messagesChannel);
    };
  }, []);

  useEffect(() => {
    // Simulate data loading with a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <ChatLoading />;

  return (
    <div className="relative h-full overflow-y-auto" >
      <div className="flex flex-col justify-end space-y-1 p-4">
        {messages?.map((item) => (
          <MassageCard
            message={item}
            key={item.id}
            sender={senders?.[item.sender_id] || {}}
          />
        ))}
      </div>
    </div>
  );
}
