"use client";

import { useState } from "react";
import { Check, X, AlertTriangle, Eye } from "lucide-react";

const mockJobs = [
  { id: "1", title: "Delivery Rider", employer: "Tashi Dorji", posted: "2 hours ago", status: "pending" as const },
  { id: "2", title: "Shop Assistant", employer: "Karma Wangmo", posted: "1 day ago", status: "pending" as const },
  { id: "3", title: "Construction Worker", employer: "Pema Construction", posted: "3 days ago", status: "approved" as const },
  { id: "4", title: "Suspicious Job", employer: "Unknown", posted: "5 days ago", status: "flagged" as const },
  { id: "5", title: "Tutor", employer: "Sonam Yangki", posted: "1 week ago", status: "rejected" as const },
];

const statusConfig = {
  pending: { label: "Pending", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10" },
  approved: { label: "Approved", color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  rejected: { label: "Rejected", color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
  flagged: { label: "Flagged", color: "text-destructive", bg: "bg-destructive/10" },
};

export default function ModerationPage() {
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

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background border-b border-border text-[13px] font-medium text-muted-foreground uppercase tracking-wider">
          <div className="col-span-3">Job</div><div className="col-span-2">Employer</div><div className="col-span-2">Posted</div><div className="col-span-1">Status</div><div className="col-span-4">Actions</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((job) => {
            const cfg = statusConfig[job.status];
            return (
              <div key={job.id} className="grid md:grid-cols-12 gap-4 px-6 py-5 items-center">
                <div className="col-span-3"><p className="text-[15px] font-medium text-foreground">{job.title}</p></div>
                <div className="col-span-2"><p className="text-[14px] text-muted-foreground">{job.employer}</p></div>
                <div className="col-span-2"><p className="text-[14px] text-muted-foreground">{job.posted}</p></div>
                <div className="col-span-1"><span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium capitalize ${cfg.color} ${cfg.bg}`}>{job.status}</span></div>
                <div className="col-span-4 flex items-center gap-2">
                  {job.status === "pending" || job.status === "flagged" ? (
                    <>
                      <button onClick={() => updateStatus(job.id, "approved")} className="flex items-center gap-1.5 px-4 py-2 bg-[#34C759] text-white rounded-xl text-[13px] font-medium hover:opacity-90 press-effect"><Check className="size-4" /> Approve</button>
                      <button onClick={() => updateStatus(job.id, "rejected")} className="flex items-center gap-1.5 px-4 py-2 bg-[#FF3B30] text-white rounded-xl text-[13px] font-medium hover:opacity-90 press-effect"><X className="size-4" /> Reject</button>
                      {job.status === "flagged" && <button className="p-2 text-muted-foreground hover:text-destructive"><Eye className="size-4" /></button>}
                    </>
                  ) : (
                    <span className="text-[13px] text-muted-foreground">No actions needed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
