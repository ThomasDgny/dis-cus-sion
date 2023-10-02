"use client";
import React, { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/db/supabaseClient";
import { Message, ProfileCache, User } from "@/types/Types";
import MassageCard from "./MassageCard";
import ChatLoading from "@/components/common/loading/ChatLoading";

interface MessagesProps {
  topicID: string | null;
}

type MessageUserProps = Message | (null & { user: User });

export default function ChatMainScreen({ topicID }: MessagesProps) {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [profileCache, setProfileCache] = useState<ProfileCache>({});
  const [isLoading, setIsLoading] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const { data: messages, error } = await supabaseClient
      .from("messages")
      .select("*, user: users(*)")
      .eq("topic_id", topicID)
      .range(0, 30)
      .order("created_at");

    if (messages) {
      const newProfiles = Object.fromEntries(
        messages
          .map((message) => message.user)
          .filter(Boolean) // is truthy
          .map((user) => [user!.id, user!]),
      );

      setProfileCache((current) => ({
        ...current,
        ...newProfiles,
      }));

      setMessages(messages);

      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
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
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `topic_id=eq.${topicID}`,
        },
        (payload) => {
          setMessages((current) => [
            ...(current as MessageUserProps[]),
            payload.new as MessageUserProps,
          ]);
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(messagesChannel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Simulate data loading with a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) return <ChatLoading />;

  return (
    <div className="relative h-full overflow-y-auto" ref={messagesRef}>
      <ul className="flex flex-col justify-end space-y-1 p-4">
        {messages?.map((item, id) => (
          <MassageCard
            message={item}
            key={id}
            sender={profileCache[item.sender_id]}
            setProfileCache={setProfileCache}
          />
        ))}
      </ul>
    </div>
  );
}
