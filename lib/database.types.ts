/**
 * Outage-proof Supabase types for Chronos Engine 3.5
 */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; updated_at: string | null; username: string | null; avatar_url: string | null }
        Insert: { id: string; updated_at?: string | null; username?: string | null; avatar_url?: string | null }
        Update: { id?: string; updated_at?: string | null; username?: string | null; avatar_url?: string | null }
      }
      projects: {
        Row: { id: string; created_at: string; user_id: string; title: string; description: string | null; status: 'draft' | 'published' | 'archived' }
        Insert: { id?: string; created_at?: string; user_id: string; title: string; description?: string | null; status?: 'draft' | 'published' | 'archived' }
        Update: { id?: string; created_at?: string; user_id?: string; title?: string; description?: string | null; status?: 'draft' | 'published' | 'archived' }
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
  }
}
