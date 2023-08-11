export interface BlogEntry {
  uuid: string;
  title: string;
  desc: string;
  timestamp: string;
  category: string;
  author_id: string;
}

export interface User {
  uuid: string;
  email: string;
  user_name: string;
  bio: string;
  avatar: string;
}
