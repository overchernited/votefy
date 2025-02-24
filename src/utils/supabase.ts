import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hrktgmxmirhfcggobzvf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya3RnbXhtaXJoZmNnZ29ienZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNjY1MjUsImV4cCI6MjA1NTk0MjUyNX0.dSYbmu-eSEMY-IVt2eF6dYwTsDjuSPBXwIxYCCYz214";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);