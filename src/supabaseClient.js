import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hwdeniclxerpwtxjbapo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3ZGVuaWNseGVycHd0eGpiYXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzIwNTMsImV4cCI6MjA2ODg0ODA1M30.nqzr34UbEltWW3czO7cXJjSSbnvijmm8No74DL7VbMU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
