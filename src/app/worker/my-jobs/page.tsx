"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, XCircle, Phone as PhoneIcon, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const myJobs = [
  { id: "1", title: "Delivery Rider", status: "pending", applied: "2 days ago", employer: "Tashi Store", contact: null, qr: null },
  { id: "2", title: "Shop Assistant", status: "accepted", applied: "1 week ago", employer: "Karma Shop", contact: "+975-77-123456", qr: "mBoB: 1234567890" },
  { id: "3", title: "Construction Worker", status: "completed", applied: "2 weeks ago", employer: "Pema Construction", contact: "+975-77-654321", qr: "BNB: 9876543210" },
  { id: "4", title: "Gardener", status: "rejected", applied: "3 weeks ago", employer: "Green Thumb", contact: null, qr: null },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: "Pending", color: "text-white", bg: "bg-[#FF9500]", icon: Clock },
  accepted: { label: "Accepted", color: "text-white", bg: "bg-[#34C759]", icon: CheckCircle },
  completed: { label: "Completed", color: "text-white", bg: "bg-[#86868B]", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-white", bg: "bg-[#FF3B30]", icon: XCircle },
};

export default function MyJobsPage() {
  usePageTitle("My Jobs");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">My Jobs</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Track all your job applications</p>
      </div>

      <div className="space-y-4">
        {myJobs.map((job) => {
          const cfg = statusConfig[job.status as keyof typeof statusConfig];
          const Icon = cfg.icon;
          const isExpanded = expanded === job.id;

          return (
            <div key={job.id} className="bg-white rounded-2xl border border-border overflow-hidden transition-all card-lift">
              <button onClick={() => setExpanded(isExpanded ? null : job.id)} className="w-full p-5 flex items-center justify-between text-left press-effect">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-xl ${cfg.bg} flex items-center justify-center`}>
                    <Icon className={`size-6 ${cfg.color}`} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-foreground">{job.title}</h3>
                    <p className="text-[13px] text-muted-foreground">{job.employer} · {job.applied}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                  {isExpanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
                </div>
              </button>

              {isExpanded && job.status === "accepted" && (
                <div className="px-5 pb-5 border-t border-border pt-4 animate-fadeIn">
                  <div className="bg-[#34C759]/5 border border-[#34C759]/20 rounded-2xl p-5">
                    <p className="text-[15px] font-semibold text-[#34C759] mb-3 flex items-center gap-2">
                      <CheckCircle className="size-4" /> You've been selected!
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                        <PhoneIcon className="size-4 text-primary" />
                        <span className="text-[15px] font-medium text-foreground">{job.contact}</span>
                      </div>
                      {job.qr && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                          <CreditCard className="size-4 text-primary" />
                          <span className="text-[15px] text-foreground">{job.qr}</span>
                        </div>
                      )}
                      <p className="text-[13px] text-muted-foreground">Contact the employer to arrange payment and start date.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
