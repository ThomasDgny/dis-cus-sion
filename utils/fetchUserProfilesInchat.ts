import { supabaseClient } from "@/db/supabaseClient";
import { Message, User } from "@/types/Types";


async function fetchUserProfilesForSenders(messages: Message[]){
  // Collect unique sender IDs
  const uniqueSenderIds: string[] = [...new Set(messages.map((message) => message.sender_id))];

  // Fetch user profiles for unique sender IDs
  const { data: userProfiles, error: userProfilesError } = await supabaseClient
    .from("users")
    .select("*")
    .in("id", uniqueSenderIds);

  if (userProfilesError) {
    console.error("Error fetching user profiles:", userProfilesError);
  }

  // Create a dictionary with sender_id as the key and user data as the value
  const userProfilesDictionary: { [key: string]: User } = {};
  userProfiles?.forEach((profile) => {
    userProfilesDictionary[profile.id] = profile;
  });

  return userProfilesDictionary;
}

export default fetchUserProfilesForSenders;
