"use client";

import { Search, TrendingUp, CheckCircle, Clock, Star } from "lucide-react";
import Link from "next/link";
import { usePageTitle } from "@/hooks/use-page-title";

export default function WorkerDashboardPage() {
  usePageTitle("Worker Dashboard");
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Worker Dashboard</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Find and apply for part-time jobs</p>
      </div>

      <Link href="/worker/gigs/browse" className="block bg-gradient-to-r from-primary to-[#5856D6] rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative">
          <Search className="size-8 text-white/80 mb-4" />
          <h2 className="text-[28px] font-bold text-white mb-2">Browse Available Gigs</h2>
          <p className="text-[16px] text-white/80 mb-6 max-w-md">Find part-time jobs that match your skills and availability.</p>
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white text-[15px] font-medium group-hover:bg-white/30 transition-all">Explore Gigs →</span>
        </div>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Applied", value: "6", color: "text-primary", bg: "bg-primary/10", icon: Search },
          { label: "Active", value: "1", color: "text-[#34C759]", bg: "bg-[#34C759]/10", icon: CheckCircle },
          { label: "Completed", value: "15", color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10", icon: TrendingUp },
          { label: "Rating", value: "4.7", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", icon: Star },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}><stat.icon className={`size-5 ${stat.color}`} /></div>
              <span className="text-[13px] text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`card-stat ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-foreground">Recent Applications</h2>
          <Link href="/worker/my-jobs" className="text-[14px] text-primary font-medium">View All</Link>
        </div>
        <div className="divide-y divide-border">
          {[
            { title: "Delivery Rider", status: "Pending", color: "text-[#FF9500]" },
            { title: "Shop Assistant", status: "Accepted", color: "text-[#34C759]" },
            { title: "Construction Worker", status: "Completed", color: "text-muted-foreground" },
          ].map((job, i) => (
            <div key={i} className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[15px] font-medium text-foreground">{job.title}</p>
                <p className="text-[13px] text-muted-foreground">{i === 0 ? "2 days ago" : i === 1 ? "1 week ago" : "2 weeks ago"}</p>
              </div>
              <span className={`text-[13px] font-medium ${job.color}`}>{job.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
