import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://easmkdwohfhmnpnznuph.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc21rZHdvaGZobW5wbnpudXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNDgyNzEsImV4cCI6MjA5MTcyNDI3MX0.5cUWKXYsPBrM1r3lEaQBBF_rS3JdsZlfKu-RyPgc6_w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
