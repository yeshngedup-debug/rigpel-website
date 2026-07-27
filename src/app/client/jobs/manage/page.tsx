"use client";

import { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const mockJobs = [
  { id: "1", title: "Delivery Rider", applicants: 3, status: "open", type: "Service", location: "Thimphu", pay: "Nu 500/day", posted: "2 days ago" },
  { id: "2", title: "Shop Assistant", applicants: 5, status: "open", type: "Service", location: "Thimphu", pay: "Nu 8,000/mo", posted: "1 week ago" },
  { id: "3", title: "Construction Worker", applicants: 2, status: "in_progress", type: "Labor", location: "Paro", pay: "Nu 600/day", posted: "3 days ago" },
  { id: "4", title: "Tutor", applicants: 0, status: "filled", type: "Other", location: "Thimphu", pay: "Nu 10,000/mo", posted: "2 weeks ago" },
  { id: "5", title: "Gardener", applicants: 0, status: "cancelled", type: "Labor", location: "Thimphu", pay: "Nu 400/day", posted: "1 month ago" },
];

const statusColors: Record<string, string> = {
  open: "text-white bg-[#6D46FF]",
  in_progress: "text-white bg-[#FF9500]",
  filled: "text-white bg-[#34C759]",
  cancelled: "text-white bg-[#FF3B30]",
};

export default function ManageJobsPage() {
  usePageTitle("Manage Jobs");
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockJobs : mockJobs.filter((j) => j.status === filter);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Manage Jobs</h1>
          <p className="text-[17px] text-muted-foreground mt-1">View and update your job postings</p>
        </div>
        <Link href="/client/jobs/new" className="bg-primary text-white px-5 py-2.5 rounded-xl text-[15px] font-medium hover:opacity-90 press-effect">+ Post New Job</Link>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "open", "in_progress", "filled", "cancelled"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-[13px] font-medium capitalize transition-colors press-effect ${filter === f ? "bg-primary text-white" : "bg-white text-foreground border border-border hover:bg-background"}`}>
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background border-b border-border text-[13px] font-medium text-foreground/50 uppercase tracking-wider">
          <div className="col-span-4">Job</div><div className="col-span-2">Status</div><div className="col-span-2">Applicants</div><div className="col-span-2">Pay</div><div className="col-span-2">Actions</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((job) => (
            <div key={job.id} className="grid md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-background/50 transition-colors">
              <div className="col-span-4">
                <p className="text-[15px] font-medium text-foreground">{job.title}</p>
                <p className="text-[13px] text-muted-foreground">{job.location} · {job.type}</p>
              </div>
              <div className="col-span-2"><span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium capitalize ${statusColors[job.status]}`}>{job.status.replace("_", " ")}</span></div>
              <div className="col-span-2"><p className="text-[15px] text-foreground">{job.applicants} applicants</p></div>
              <div className="col-span-2"><p className="text-[15px] font-medium text-[#34C759]">{job.pay}</p></div>
              <div className="col-span-2 flex items-center gap-2">
                <Link href={`/client/jobs/${job.id}/applicants`} className="p-2 text-muted-foreground hover:text-primary" title="View Applicants"><Users className="size-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
