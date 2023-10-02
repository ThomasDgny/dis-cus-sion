import { Message, ProfileCache, User } from "@/types/Types";
import TimeAgo from "timeago-react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import DisplayProfile from "@/components/common/display-profile/DisplayProfile";
import { supabaseClient } from "@/db/supabaseClient";

export default function MassageCard({
  message,
  sender,
  setProfileCache,
}: {
  message: Message;
  sender: User;
  setProfileCache: Dispatch<SetStateAction<ProfileCache>>;
}) {
  const { user } = useAuth();
  const avatarFallback = sender?.user_name?.[0].toLocaleUpperCase();

  const textAreaStyle =
    user?.id === sender?.id
      ? "rounded-b-md rounded-l-md bg-blue-500 text-white"
      : "rounded-b-md rounded-r-md bg-slate-200 text-black";

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabaseClient
        .from("users")
        .select("*")
        .match({ id: message?.sender_id })
        .single();

      if (data) {
        setProfileCache((current) => ({
          ...current,
          [data.id]: data,
        }));
      }
    };
    if (!sender) {
      fetchProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sender, message.sender_id]);

  const messageContainerStyle = user?.id === sender?.id && "flex-row-reverse";

  return (
    <div className={`flex gap-3 px-4 py-2 ${messageContainerStyle}`}>
      <div>
        <DisplayProfile
          authorData={sender}
          triggerButtonContent={
            <div className="flex gap-2 rounded-full border transition-all hover:shadow-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={sender?.avatar ?? ""}
                  className="object-cover"
                  alt="CU"
                />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          }
        />
      </div>
      <div>
        <div className={`max-w-md p-4 ${textAreaStyle}`}>
          <p className="text-sm">{message.message}</p>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          <TimeAgo
            datetime={message.created_at}
            opts={{ minInterval: 60 }}
            locale="en_US"
          />
        </p>
      </div>
    </div>
  );
}
