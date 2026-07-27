export interface User {
  id: string;
  full_name: string;
  phone: string;
  role: "client" | "worker" | "admin";
  avatar_url?: string;
  skills?: string[];
  cid_url?: string;
  bank_qr_url?: string;
  verification_status: "pending" | "verified" | "rejected";
  rating: number;
  jobs_completed: number;
  created_at: string;
}
