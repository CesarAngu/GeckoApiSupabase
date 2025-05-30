import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kgadbmokrledikcctacu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnYWRibW9rcmxlZGlrY2N0YWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODUxOTUsImV4cCI6MjA2NDA2MTE5NX0.AzZFbhXE4BN8BauGPi_AfhEy9ssy_Z0sH7e4yVT0ckg';

export const supabase = createClient(supabaseUrl, supabaseKey);