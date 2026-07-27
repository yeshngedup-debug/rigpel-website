"use client";

import { useState } from "react";
import { Check, X, AlertTriangle, Eye } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const mockJobs = [
  { id: "1", title: "Delivery Rider", employer: "Tashi Dorji", posted: "2 hours ago", status: "pending" as const },
  { id: "2", title: "Shop Assistant", employer: "Karma Wangmo", posted: "1 day ago", status: "pending" as const },
  { id: "3", title: "Construction Worker", employer: "Pema Construction", posted: "3 days ago", status: "approved" as const },
  { id: "4", title: "Suspicious Job", employer: "Unknown", posted: "5 days ago", status: "flagged" as const },
  { id: "5", title: "Tutor", employer: "Sonam Yangki", posted: "1 week ago", status: "rejected" as const },
];

const statusConfig = {
  pending: { label: "Pending", color: "text-white", bg: "bg-[#FF9500]" },
  approved: { label: "Approved", color: "text-white", bg: "bg-[#34C759]" },
  rejected: { label: "Rejected", color: "text-white", bg: "bg-[#FF3B30]" },
  flagged: { label: "Flagged", color: "text-white", bg: "bg-[#FF3B30]" },
};

export default function ModerationPage() {
  usePageTitle("Moderation");
  const [filter, setFilter] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const updateStatus = (id: string, status: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: status as any } : j));
  };

  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Moderation</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Review and approve job postings</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "approved", "rejected", "flagged"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-[13px] font-medium capitalize transition-colors press-effect ${filter === f ? "bg-primary text-white" : "bg-white text-foreground border border-border hover:bg-background"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="table">
          <thead>
            <tr className="bg-background text-[13px] font-medium text-foreground/50 uppercase tracking-wider">
              <th>Job</th><th>Employer</th><th>Posted</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => {
              const cfg = statusConfig[job.status];
              return (
                <tr key={job.id} className="hover:bg-background/50 transition-colors">
                  <td><p className="text-[15px] font-medium text-foreground">{job.title}</p></td>
                  <td><p className="text-[14px] text-muted-foreground">{job.employer}</p></td>
                  <td><p className="text-[14px] text-muted-foreground">{job.posted}</p></td>
                  <td><span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium capitalize ${cfg.color} ${cfg.bg}`}>{job.status}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      {job.status === "pending" || job.status === "flagged" ? (
                        <>
                          <button onClick={() => updateStatus(job.id, "approved")} className="px-3 py-1.5 bg-[#1E7E34] text-white rounded-lg text-[13px] font-medium hover:bg-[#16632A] transition-colors flex items-center gap-1.5"><Check className="size-4" /> Approve</button>
                          <button onClick={() => updateStatus(job.id, "rejected")} className="px-3 py-1.5 bg-[#C41A1A] text-white rounded-lg text-[13px] font-medium hover:bg-[#A31515] transition-colors flex items-center gap-1.5"><X className="size-4" /> Reject</button>
                          {job.status === "flagged" && <button className="btn btn-ghost btn-sm"><Eye className="size-4" /></button>}
                        </>
                      ) : (
                        <span className="text-[13px] text-muted-foreground">No actions needed</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
