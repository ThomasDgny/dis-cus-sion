export interface BlogEntry {
  id: string;
  title: string;
  desc: string;
  timestamp: string;
  category: string;
  author_id: string;
}

export interface User {
  id: string;
  email: string;
  user_name: string;
  bio: string;
  avatar: string;
}
