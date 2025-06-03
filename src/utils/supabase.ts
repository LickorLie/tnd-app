
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://kplzzjzmatnxyjfkyflx.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbHp6anptYXRueHlqZmt5Zmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDcxNzYsImV4cCI6MjA2MzQyMzE3Nn0.GND7x_jDlAxpIaj3ZxlnnNlO2jyQtrpDmGN-VVSMCXQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
        