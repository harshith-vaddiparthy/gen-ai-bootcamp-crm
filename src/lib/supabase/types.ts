export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type Row<T> = T & {
  id: string
  workspace_id: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Insert"]>
      }
      crm_users: {
        Row: Row<{
          name: string
          email: string
          role: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          name: string
          email: string
          role?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["crm_users"]["Insert"]>
      }
      pipeline_stages: {
        Row: Row<{
          name: string
          sort_order: number
          win_probability: number
        }>
        Insert: {
          id?: string
          workspace_id: string
          name: string
          sort_order: number
          win_probability?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["pipeline_stages"]["Insert"]>
      }
      accounts: {
        Row: Row<{
          owner_id: string | null
          name: string
          segment: string
          website: string | null
          health: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          owner_id?: string | null
          name: string
          segment?: string
          website?: string | null
          health?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["accounts"]["Insert"]>
      }
      contacts: {
        Row: Row<{
          account_id: string | null
          name: string
          title: string | null
          email: string | null
          phone: string | null
          relationship_strength: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          account_id?: string | null
          name: string
          title?: string | null
          email?: string | null
          phone?: string | null
          relationship_strength?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>
      }
      leads: {
        Row: Row<{
          owner_id: string | null
          name: string
          company: string
          source: string
          status: string
          score: number
        }>
        Insert: {
          id?: string
          workspace_id: string
          owner_id?: string | null
          name: string
          company: string
          source?: string
          status?: string
          score?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>
      }
      deals: {
        Row: Row<{
          account_id: string | null
          owner_id: string | null
          stage_id: string | null
          name: string
          amount: number
          probability: number
          close_date: string | null
          health: string
          next_step: string | null
          score: number
        }>
        Insert: {
          id?: string
          workspace_id: string
          account_id?: string | null
          owner_id?: string | null
          stage_id?: string | null
          name: string
          amount?: number
          probability?: number
          close_date?: string | null
          health?: string
          next_step?: string | null
          score?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["deals"]["Insert"]>
      }
      activities: {
        Row: Row<{
          deal_id: string | null
          contact_id: string | null
          account_id: string | null
          type: string
          summary: string
          occurred_at: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          deal_id?: string | null
          contact_id?: string | null
          account_id?: string | null
          type: string
          summary: string
          occurred_at?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["activities"]["Insert"]>
      }
      tasks: {
        Row: Row<{
          owner_id: string | null
          deal_id: string | null
          contact_id: string | null
          account_id: string | null
          title: string
          due_date: string | null
          status: string
          priority: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          owner_id?: string | null
          deal_id?: string | null
          contact_id?: string | null
          account_id?: string | null
          title: string
          due_date?: string | null
          status?: string
          priority?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>
      }
      notes: {
        Row: Row<{
          author_id: string | null
          deal_id: string | null
          account_id: string | null
          body: string
        }>
        Insert: {
          id?: string
          workspace_id: string
          author_id?: string | null
          deal_id?: string | null
          account_id?: string | null
          body: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>
      }
      ai_suggestions: {
        Row: Row<{
          record_type: string
          record_id: string | null
          type: string
          status: string
          title: string
          detail: string
          payload: Json
        }>
        Insert: {
          id?: string
          workspace_id: string
          record_type: string
          record_id?: string | null
          type: string
          status?: string
          title: string
          detail: string
          payload?: Json
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["ai_suggestions"]["Insert"]>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
