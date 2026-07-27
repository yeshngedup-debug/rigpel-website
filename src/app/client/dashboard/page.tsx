"use client";

import Link from "next/link";
import { Briefcase, Users, TrendingUp, Clock, ChevronRight, Plus } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

export default function ClientDashboardPage() {
  usePageTitle("Employer Dashboard");
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Employer Dashboard</h1>
          <p className="text-[17px] text-muted-foreground mt-1">Manage your job postings and workers</p>
        </div>
        <Link
          href="/client/jobs/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-[15px] font-medium hover:opacity-90 transition-opacity press-effect"
        >
          <Plus className="size-5" />
          Post Job
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Jobs", value: "3", color: "text-primary", bg: "bg-primary/10", icon: Briefcase },
          { label: "Total Applicants", value: "8", color: "text-[#34C759]", bg: "bg-[#34C759]/10", icon: Users },
          { label: "In Progress", value: "1", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", icon: Clock },
          { label: "Completed", value: "5", color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10", icon: TrendingUp },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <span className="text-[13px] text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`card-stat ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Link href="/client/jobs/new" className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-border card-lift press-effect">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center shadow-lg">
            <Plus className="size-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[17px] font-semibold text-foreground">Post a New Job</p>
            <p className="text-[14px] text-muted-foreground">Create a part-time job listing</p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </Link>
        <Link href="/client/jobs/manage" className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-border card-lift press-effect">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-[#FF9500] to-destructive flex items-center justify-center shadow-lg">
            <Briefcase className="size-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[17px] font-semibold text-foreground">Manage Jobs</p>
            <p className="text-[14px] text-muted-foreground">Track applicants and update status</p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="text-[18px] font-semibold text-foreground">Recent Job Postings</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { title: "Delivery Rider", applicants: 3, status: "Open", color: "text-primary" },
            { title: "Shop Assistant", applicants: 5, status: "Open", color: "text-primary" },
            { title: "Construction Worker", applicants: 2, status: "In Progress", color: "text-[#FF9500]" },
          ].map((job, i) => (
            <div key={i} className="p-5 flex items-center justify-between hover:bg-background/50 transition-colors">
              <div>
                <p className="text-[15px] font-medium text-foreground">{job.title}</p>
                <p className="text-[13px] text-muted-foreground">{job.applicants} applicants</p>
              </div>
              <span className={`text-[13px] font-medium ${job.color}`}>{job.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
