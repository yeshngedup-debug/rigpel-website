export type JobCategory = "Tech" | "Labor" | "Service" | "Creative" | "Hospitality" | "Other";

export type DurationUnit = "day" | "week" | "month";

export type PayPeriod = "day" | "week" | "month";

export type JobStatus = "open" | "in_progress" | "filled" | "cancelled";

export interface Job {
  id: string;
  client_id: string;
  title: string;
  category: JobCategory;
  duration_value: number;
  duration_unit: DurationUnit;
  location_name: string;
  location_coords?: { lat: number; lng: number };
  pay_amount: number;
  pay_period: PayPeriod;
  duties: string[];
  status: JobStatus;
  is_featured: boolean;
  created_at: string;
  client_name?: string;
}

export interface Application {
  id: string;
  job_id: string;
  worker_id: string;
  status: "pending" | "selected" | "rejected";
  applied_at: string;
  worker?: import("./user").User;
}

export interface Payment {
  id: string;
  client_id: string;
  job_id: string;
  screenshot_url: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export type AdminStats = {
  total_users: number;
  total_clients: number;
  total_workers: number;
  active_postings: number;
  matched_jobs: number;
  completed_gigs: number;
  pending_moderation: number;
  pending_payments: number;
};
