"use client";

import Link from "next/link";
import { Search, Briefcase, Clock, User, TrendingUp, ChevronRight } from "lucide-react";

export default function WorkerDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Worker Dashboard</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Find and manage your gigs</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Jobs", value: "2", color: "text-primary", bg: "bg-primary/10", icon: Briefcase },
          { label: "Completed", value: "12", color: "text-[#34C759]", bg: "bg-[#34C759]/10", icon: TrendingUp },
          { label: "Applications", value: "5", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", icon: Clock },
          { label: "Rating", value: "4.8", color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10", icon: User },
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
        <Link href="/worker/gigs/browse" className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-border card-lift press-effect">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center shadow-lg">
            <Search className="size-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[17px] font-semibold text-foreground">Browse Gigs</p>
            <p className="text-[14px] text-muted-foreground">Find jobs that match your skills</p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </Link>
        <Link href="/worker/my-jobs" className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-border card-lift press-effect">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-[#FF9500] to-destructive flex items-center justify-center shadow-lg">
            <Briefcase className="size-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[17px] font-semibold text-foreground">My Active Jobs</p>
            <p className="text-[14px] text-muted-foreground">Track your current gigs and payments</p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border">
        <div className="p-5 border-b border-border">
          <h2 className="text-[18px] font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { icon: Briefcase, text: "Applied to Shop Assistant", time: "2 hours ago", color: "text-primary" },
            { icon: Clock, text: "Job marked In Progress", time: "1 day ago", color: "text-[#FF9500]" },
            { icon: TrendingUp, text: "Job completed - payment pending", time: "3 days ago", color: "text-[#34C759]" },
          ].map((item, i) => (
            <div key={i} className="p-5 flex items-center gap-4 hover:bg-background/50 transition-colors">
              <div className={`size-10 rounded-full ${item.color.replace("text", "bg")}/10 flex items-center justify-center`}>
                <item.icon className={`size-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-foreground">{item.text}</p>
                <p className="text-[13px] text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
