import { Database } from "@/lib/database.type";

export type Topics = Database["public"]["Tables"]["topics"]["Row"];

export type User = Database["public"]["Tables"]["users"]["Row"];

export type Saved = Database["public"]["Tables"]["saved"]["Row"];
