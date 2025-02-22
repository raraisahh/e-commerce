import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lgukwfqltwzpyxhgmrxy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndWt3ZnFsdHd6cHl4aGdtcnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjEzNjksImV4cCI6MjA1NTU5NzM2OX0.aHhL8HYciMgYDJ7-YunGmDPGT40ldJaFmALqvyqJ-mM";

export const supabase = createClient(supabaseUrl, supabaseKey);