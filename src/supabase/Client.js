import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
    process.env.VUE_APP_SUPABASE_URL,
    process.env.VUE_APP_SUPABASE_ANON_KEY
)