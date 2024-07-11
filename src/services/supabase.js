import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tjfthdyxzzdtksunuplz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZnRoZHl4enpkdGtzdW51cGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNTc0MzUsImV4cCI6MjAzNTkzMzQzNX0.5j4RAk-iRqpvt_QKR2-CKehsIBLll7uJ98KYy90OkEw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
