
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PROJECT_URL || process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || ''
const supabaseKey = process.env.SUPABASE_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;