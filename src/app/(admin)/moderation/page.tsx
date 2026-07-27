"use client";

import { useState } from "react";
import { Shield, Check, X, Flag } from "lucide-react";

const mockJobs = [
  { id: "j1", title: "Delivery Rider", employer: "Tashi", category: "Service", status: "pending", reported: false, posted: "2 hours ago" },
  { id: "j2", title: "Shop Assistant", employer: "Karma", category: "Service", status: "pending", reported: false, posted: "5 hours ago" },
  { id: "j3", title: "Data Entry", employer: "Sonam", category: "Tech", status: "pending", reported: false, posted: "1 day ago" },
  { id: "j4", title: "Construction Worker", employer: "Dorji", category: "Labor", status: "flagged", reported: true, posted: "3 hours ago" },
];

export default function ModerationPage() {
  const [tab, setTab] = useState("pending");

  const filtered = mockJobs.filter((j) => tab === "flagged" ? j.reported : !j.reported);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Moderation Queue</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Review and approve job postings</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("pending")} className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors press-effect ${tab === "pending" ? "bg-primary text-white" : "bg-white text-foreground border border-border"}`}>
          Pending ({mockJobs.filter(j => !j.reported).length})
        </button>
        <button onClick={() => setTab("flagged")} className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors press-effect ${tab === "flagged" ? "bg-destructive text-white" : "bg-white text-foreground border border-border"}`}>
          Flagged ({mockJobs.filter(j => j.reported).length})
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((job) => (
          <div key={job.id} className={`bg-white rounded-2xl border p-6 ${job.reported ? "border-destructive/30" : "border-border"}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[18px] font-semibold text-foreground">{job.title}</h3>
                  {job.reported && <Flag className="size-4 text-destructive" />}
                </div>
                <p className="text-[14px] text-muted-foreground">{job.employer} · {job.category} · {job.posted}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#34C759] text-white rounded-xl text-[13px] font-medium hover:opacity-90 transition-opacity press-effect">
                  <Check className="size-4" /> Approve
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-destructive text-white rounded-xl text-[13px] font-medium hover:opacity-90 transition-opacity press-effect">
                  <X className="size-4" /> Reject
                </button>
                {!job.reported && (
                  <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Flag className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
