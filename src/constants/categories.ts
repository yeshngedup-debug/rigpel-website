import type { JobCategory } from "@/types/job";

export const JOB_CATEGORIES: { value: JobCategory; label: string; color: string; icon: string }[] = [
  { value: "Tech", label: "Technology", color: "#6D46FF", icon: "💻" },
  { value: "Labor", label: "Labor & Construction", color: "#34C759", icon: "🔧" },
  { value: "Service", label: "Service & Hospitality", color: "#FF9500", icon: "🛎️" },
  { value: "Creative", label: "Creative & Media", color: "#AF52DE", icon: "🎨" },
  { value: "Hospitality", label: "Hospitality & Tourism", color: "#FF2D55", icon: "🏨" },
  { value: "Other", label: "Other", color: "#8E8E93", icon: "📋" },
];

export const DURATION_OPTIONS = [
  { label: "1-2 days", value: 2, unit: "day" as const },
  { label: "1 week", value: 1, unit: "week" as const },
  { label: "2 weeks", value: 2, unit: "week" as const },
  { label: "1 month", value: 1, unit: "month" as const },
  { label: "3 months", value: 3, unit: "month" as const },
];

export const PAY_PERIODS = [
  { label: "Per Day", value: "day" as const },
  { label: "Per Week", value: "week" as const },
  { label: "Per Month", value: "month" as const },
];

export const JOB_STATUS_OPTIONS = [
  { label: "Open", value: "open" as const, color: "text-[#6D46FF]" },
  { label: "In Progress", value: "in_progress" as const, color: "text-[#FF9500]" },
  { label: "Filled", value: "filled" as const, color: "text-[#34C759]" },
  { label: "Cancelled", value: "cancelled" as const, color: "text-[#FF3B30]" },
];
