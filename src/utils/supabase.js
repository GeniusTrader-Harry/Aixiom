import { createClient } from '@supabase/supabase-js'

// Reads from Vite env vars. The anon key is meant to live in the client —
// access is enforced server-side by Row-Level Security (see supabase/schema.sql).
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// When the project isn't configured yet, the portals show a "not configured"
// notice instead of crashing.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
