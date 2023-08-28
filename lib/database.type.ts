export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      saved: {
        Row: {
          id: string
          topic_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          topic_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          topic_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      topics: {
        Row: {
          author_id: string | null
          category: string | null
          desc: string | null
          id: string
          timestamp: string
          title: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          desc?: string | null
          id?: string
          timestamp?: string
          title?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          desc?: string | null
          id?: string
          timestamp?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "topics_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar: string | null
          bio: string | null
          email: string | null
          id: string
          timestamp: string | null
          user_name: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          email?: string | null
          id?: string
          timestamp?: string | null
          user_name?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          email?: string | null
          id?: string
          timestamp?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
