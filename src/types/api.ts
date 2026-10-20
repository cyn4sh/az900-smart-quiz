export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Hand-written to match the attempts table. This uses `type` instead of
// `interface` on purpose: supabase-js needs the implicit index signature
// that only type aliases have, so interfaces break its inference.
export type Database = {
  public: {
    Tables: {
      attempts: {
        Row: {
          id: string;
          user_id: string;
          score: number;
          total: number;
          topic_breakdown: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          score: number;
          total: number;
          topic_breakdown?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          score?: number;
          total?: number;
          topic_breakdown?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};