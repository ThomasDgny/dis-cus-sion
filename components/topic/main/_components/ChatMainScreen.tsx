"use client";
import React, { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/db/supabaseClient";
import { Message, ProfileCache, User } from "@/types/Types";
import MassageCard from "./MassageCard";
import ChatLoading from "@/components/common/loading/ChatLoading";
import { useInView } from "react-intersection-observer";
import { scrollToBottom } from "@/utils/scrollBottom";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { getMessages } from "../action/getMessages";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface MessagesProps {
  topicID: string | null;
}

type MessageUserProps = Message | (null & { user: User });

export default function ChatMainScreen({ topicID }: MessagesProps) {
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [profileCache, setProfileCache] = useState<ProfileCache>({});
  const [unReadMessages, setUnReadMessages] = useState<number>(0);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { ref: messagesIsReadRef, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      scrollToBottom(messagesContainerRef);
      setUnReadMessages(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, inView]);

  useEffect(() => {
    getMessages(topicID, setProfileCache, setMessages);
  }, [topicID]);

  function handleNewMessage(
    payload: RealtimePostgresInsertPayload<{
      [key: string]: any;
    }>,
    inView: boolean,
  ) {
    setMessages((current) => [
      ...(current as MessageUserProps[]),
      payload.new as MessageUserProps,
    ]);
    if (!inView) {
      setUnReadMessages((prev) => prev + 1);
    }
  }

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
          handleNewMessage(payload, inView);
        },
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(messagesChannel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicID]);

  useEffect(() => {
    scrollToBottom(messagesContainerRef);
  }, []);

  return (
    <div className="relative h-full overflow-y-auto" ref={messagesContainerRef}>
      {!inView && unReadMessages > 0 && (
        <div className="fixed bottom-16 z-50 flex w-full justify-center">
          <Button
            onClick={() => scrollToBottom(messagesContainerRef)}
            className="rounded-full bg-blue-500 text-xs text-white shadow-lg"
          >
            {unReadMessages} Unread Messages
            <ArrowDown className="ml-3 h-4 w-4" />
          </Button>
        </div>
      )}
      <ul className="flex flex-col justify-end space-y-1 p-4">
        {messages?.map((item, id) => (
          <MassageCard
            message={item}
            key={id}
            sender={profileCache[item.sender_id]}
            setProfileCache={setProfileCache}
          />
        ))}
        <div className="sr-only" ref={messagesIsReadRef} />
      </ul>
    </div>
  );
}
