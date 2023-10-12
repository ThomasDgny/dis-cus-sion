import { supabaseClient } from "@/db/supabaseClient";
import { Message, ProfileCache } from "@/types/Types";

export const getMessages = async (
  topicID: string | null,
  setProfileCache: React.Dispatch<React.SetStateAction<ProfileCache>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>,
) => {
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
        .filter(Boolean)
        .map((user) => [user!.id, user!]),
    );

    setProfileCache((current) => ({
      ...current,
      ...newProfiles,
    }));
    setMessages(messages);
  }
};
