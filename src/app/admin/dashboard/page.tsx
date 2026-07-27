"use client";

import { useState, useEffect } from "react";
import { Users, Briefcase, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePageTitle } from "@/hooks/use-page-title";

const chartData = [
  { name: "Mon", jobs: 4, applicants: 12 }, { name: "Tue", jobs: 7, applicants: 18 },
  { name: "Wed", jobs: 5, applicants: 15 }, { name: "Thu", jobs: 9, applicants: 22 },
  { name: "Fri", jobs: 6, applicants: 14 }, { name: "Sat", jobs: 3, applicants: 8 },
  { name: "Sun", jobs: 2, applicants: 5 },
];

const recentReports = [
  { id: "1", report: "User reported as spam", reportedUser: "user_123", date: "2 hours ago" },
  { id: "2", report: "Suspicious job posting", reportedUser: "user_456", date: "5 hours ago" },
  { id: "3", report: "CID verification failed", reportedUser: "user_789", date: "1 day ago" },
];

export default function AdminDashboardPage() {
  usePageTitle("Admin Dashboard");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Admin Dashboard</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Monitor platform activity and manage users</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: "342", color: "text-primary", bg: "bg-primary/10", icon: Users },
          { label: "Active Jobs", value: "24", color: "text-[#34C759]", bg: "bg-[#34C759]/10", icon: Briefcase },
          { label: "Revenue", value: "Nu 45K", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", icon: DollarSign },
          { label: "Growth", value: "+12%", color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10", icon: TrendingUp },
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

      <div className="bg-white rounded-2xl border border-border p-6 mb-8">
        <h2 className="text-[18px] font-semibold text-foreground mb-6">Weekly Activity</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8E8E93" }} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#8E8E93" }} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
              <Bar dataKey="jobs" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="applicants" fill="#5856D6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <AlertTriangle className="size-4 text-[#FF9500]" />
          <h2 className="text-[18px] font-semibold text-foreground">Recent Reports</h2>
        </div>
        <div className="divide-y divide-border">
          {recentReports.map((r) => (
            <div key={r.id} className="p-5 flex items-center justify-between">
              <div><p className="text-[15px] font-medium text-foreground">{r.report}</p><p className="text-[13px] text-muted-foreground">User: {r.reportedUser} · {r.date}</p></div>
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-[13px] font-medium hover:opacity-90 press-effect">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
