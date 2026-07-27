"use client";

import { Users, Briefcase, TrendingUp, Clock, CheckCircle } from "lucide-react";

const stats = [
  { label: "Total Users", value: "156", change: "+12 this week", color: "text-primary", bg: "bg-primary/10", icon: Users },
  { label: "Active Postings", value: "23", change: "+5 this week", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", icon: Briefcase },
  { label: "Matched Jobs", value: "45", change: "78% success rate", color: "text-[#34C759]", bg: "bg-[#34C759]/10", icon: CheckCircle },
  { label: "Completed Gigs", value: "38", change: "Nu 190K paid out", color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10", icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Admin Dashboard</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Platform metrics and moderation overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border card-lift">
            <div className="flex items-center gap-3 mb-3">
              <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <span className="text-[13px] text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`card-stat ${stat.color}`}>{stat.value}</p>
            <p className="text-[13px] text-muted-foreground mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-[18px] font-semibold text-foreground mb-4">Pending Actions</h2>
          <div className="space-y-4">
            {[
              { label: "Jobs to moderate", count: 4, color: "text-[#FF9500]" },
              { label: "CID verifications", count: 6, color: "text-primary" },
              { label: "Payment screenshots", count: 3, color: "text-[#34C759]" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-[15px] text-foreground">{item.label}</span>
                <span className={`text-[17px] font-semibold ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="text-[18px] font-semibold text-foreground mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              { label: "Total Users", value: "156", sub: "112 workers, 44 employers" },
              { label: "Active Jobs", value: "23", sub: "15 open, 5 in progress, 3 filled" },
              { label: "This Month", value: "12", sub: "jobs matched, Nu 48K paid" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-[15px] text-foreground">{item.label}</p>
                  <p className="text-[13px] text-muted-foreground">{item.sub}</p>
                </div>
                <span className="text-[17px] font-semibold text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
