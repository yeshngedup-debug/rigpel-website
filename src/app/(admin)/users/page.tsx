"use client";

import { useState } from "react";
import { Shield, Check, X, Search } from "lucide-react";

const mockUsers = [
  { id: "u1", name: "Tashi Dorji", role: "worker", phone: "+975-77-123456", cidStatus: "verified" as const, accountStatus: "active" as const, rating: 4.8 },
  { id: "u2", name: "Karma Wangmo", role: "worker", phone: "+975-77-654321", cidStatus: "pending" as const, accountStatus: "active" as const, rating: 4.5 },
  { id: "u3", name: "Sonam Yangki", role: "worker", phone: "+975-77-789012", cidStatus: "rejected" as const, accountStatus: "suspended" as const, rating: 4.2 },
  { id: "u4", name: "Dorji Wangchuk", role: "client", phone: "+975-77-345678", cidStatus: "verified" as const, accountStatus: "active" as const, rating: 0 },
  { id: "u5", name: "Yeshi Lhamo", role: "client", phone: "+975-77-901234", cidStatus: "pending" as const, accountStatus: "active" as const, rating: 0 },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">User Management</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Verify profiles, suspend unreliable accounts</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search users..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex gap-2">
          {["all", "worker", "client"].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-4 py-2 rounded-full text-[13px] font-medium capitalize transition-colors press-effect ${roleFilter === r ? "bg-primary text-white" : "bg-white text-foreground border border-border"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background border-b border-border text-[13px] font-medium text-muted-foreground uppercase tracking-wider">
          <div className="col-span-3">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">CID</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Actions</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((user) => (
            <div key={user.id} className="grid md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-background/50 transition-colors">
              <div className="col-span-3 flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[14px]">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[15px] font-medium text-foreground">{user.name}</p>
                  <p className="text-[13px] text-muted-foreground">{user.phone}</p>
                </div>
              </div>
              <div className="col-span-2">
                <span className="capitalize text-[14px] text-foreground">{user.role}</span>
              </div>
              <div className="col-span-2">
                <span className={`apple-pill text-[11px] ${
                  user.cidStatus === "verified" ? "apple-pill-green" :
                  user.cidStatus === "pending" ? "apple-pill-orange" : "apple-pill-red"
                }`}>
                  {user.cidStatus}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`apple-pill text-[11px] ${
                  user.accountStatus === "active" ? "apple-pill-green" : "apple-pill-red"
                }`}>
                  {user.accountStatus}
                </span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                {user.cidStatus === "pending" && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#34C759] text-white rounded-lg text-[12px] font-medium press-effect">
                    <Check className="size-3" /> Verify CID
                  </button>
                )}
                <button className={`px-3 py-1.5 rounded-lg text-[12px] font-medium press-effect ${
                  user.accountStatus === "active" ? "bg-destructive text-white" : "bg-primary text-white"
                }`}>
                  {user.accountStatus === "active" ? "Suspend" : "Reactivate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
