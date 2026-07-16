// Supabase client scaffold for AlumBridge
// Currently using localStorage mock — swap to real Supabase when credentials are ready
//
// TO ACTIVATE SUPABASE:
// 1. Install: npm install @supabase/supabase-js
// 2. Create a Supabase project at https://supabase.com
// 3. Add to .env:
//    VITE_SUPABASE_URL=https://your-project.supabase.co
//    VITE_SUPABASE_ANON_KEY=your-anon-key
// 4. Uncomment the real client code below and comment out the mock

// ─── REAL SUPABASE CLIENT (uncomment when ready) ───
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
// if (!supabaseUrl || !supabaseAnonKey) {
//   console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY env vars')
// }
// export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder')

// ─── MOCK CLIENT (current — uses localStorage) ───
// This mock mimics the Supabase client interface for easy swap later
const MOCK_ENABLED = false // Set to true when Supabase is configured

export const supabase = null // Placeholder — will be real client when activated

export function isSupabaseConfigured() {
  return MOCK_ENABLED && !!import.meta.env.VITE_SUPABASE_URL
}

// ─── HELPER: Shortlist operations ───
// Currently localStorage-based. Swap to Supabase 'shortlists' table when ready.
//
// SUPABASE TABLE SCHEMA (create when ready):
// CREATE TABLE shortlists (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
//   program_id text NOT NULL,
//   created_at timestamptz DEFAULT now(),
//   UNIQUE(user_id, program_id)
// );
//
// CREATE TABLE alumni_faqs (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   category text NOT NULL,
//   question text NOT NULL,
//   answer text NOT NULL,
//   alumni_id text,
//   keywords text[] DEFAULT '{}',
//   created_at timestamptz DEFAULT now()
// );

export async function getShortlists(userId) {
  // TODO: Swap to Supabase query:
  // const { data } = await supabase.from('shortlists').select('program_id').eq('user_id', userId)
  // return data?.map(d => d.program_id) || []
  try {
    const saved = localStorage.getItem('alumbridge_shortlist')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export async function addShortlist(userId, programId) {
  // TODO: Swap to Supabase upsert:
  // await supabase.from('shortlists').upsert({ user_id: userId, program_id: programId })
  const current = await getShortlists(userId)
  if (!current.includes(programId)) {
    const updated = [...current, programId]
    localStorage.setItem('alumbridge_shortlist', JSON.stringify(updated))
    return updated
  }
  return current
}

export async function removeShortlist(userId, programId) {
  // TODO: Swap to Supabase delete:
  // await supabase.from('shortlists').delete().eq('user_id', userId).eq('program_id', programId)
  const current = await getShortlists(userId)
  const updated = current.filter(id => id !== programId)
  localStorage.setItem('alumbridge_shortlist', JSON.stringify(updated))
  return updated
}
