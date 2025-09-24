// api/add-product.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ifopkicdlpdqisixhxob.supabase.co",       // 🔑 replace with your project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb3BraWNkbHBkcWlzaXhoeG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ0Mzc1NiwiZXhwIjoyMDc0MDE5NzU2fQ.Mn5UL14jRYC2Xp_DjnO9gAvfJ0EBEc_AeI3gIrk4juA"                   // ⚠️ service_role key (keep safe!)
);

const ADMIN_PASSWORD = "yourAdminPass123";  // change to your real admin password

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password, product } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Invalid admin password" });
  }

  const { data, error } = await supabase
    .from("products")
    .insert([product]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true, data });
}



