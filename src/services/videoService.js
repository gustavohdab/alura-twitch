import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://dmsbvwgzrybjrkdpzpoq.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtc2J2d2d6cnlianJrZHB6cG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTA4MDIsImV4cCI6MTk4Mzc4NjgwMn0.AJdZXoVfPYgfw89lkyzXLR3RHJFyhoHrcKLpOoHnBgU";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase
        .from("video")
        .select("*")
    }
  }
}