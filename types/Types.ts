import { Database } from "@/lib/database.type";

export type Topics = Database["public"]["Tables"]["topics"]["Row"];

export type User = Database["public"]["Tables"]["users"]["Row"];

export type Message = Database["public"]["Tables"]["messages"]["Row"];

export type Saved = Database["public"]["Tables"]["saved"]["Row"];

export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type ProfileCache = {
    [userId: string]: User
  }