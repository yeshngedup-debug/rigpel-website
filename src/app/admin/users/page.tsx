"use client";

import { useState } from "react";
import { Search, Shield, ShieldOff, Check, X } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Tashi Dorji", phone: "+975-77-123456", role: "worker", cidVerified: true, status: "active" as const },
  { id: "2", name: "Karma Wangmo", phone: "+975-77-654321", role: "client", cidVerified: true, status: "active" as const },
  { id: "3", name: "Sonam Yangki", phone: "+975-77-789012", role: "worker", cidVerified: false, status: "active" as const },
  { id: "4", name: "Suspicious User", phone: "+975-77-000000", role: "worker", cidVerified: false, status: "suspended" as const },
  { id: "5", name: "Pema Dorji", phone: "+975-77-111222", role: "client", cidVerified: true, status: "active" as const },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(mockUsers);

  const toggleSuspension = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" as const : "active" as const } : u));
  };

  const toggleCidVerify = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, cidVerified: !u.cidVerified } : u));
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Users</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Manage platform users and verification</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background border-b border-border text-[13px] font-medium text-muted-foreground uppercase tracking-wider">
          <div className="col-span-3">Name</div><div className="col-span-2">Phone</div><div className="col-span-1">Role</div><div className="col-span-2">CID</div><div className="col-span-1">Status</div><div className="col-span-3">Actions</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((user) => (
            <div key={user.id} className="grid md:grid-cols-12 gap-4 px-6 py-5 items-center">
              <div className="col-span-3"><p className="text-[15px] font-medium text-foreground">{user.name}</p></div>
              <div className="col-span-2"><p className="text-[14px] text-muted-foreground">{user.phone}</p></div>
              <div className="col-span-1"><span className="capitalize text-[14px] text-foreground">{user.role}</span></div>
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium ${user.cidVerified ? "text-[#34C759] bg-[#34C759]/10" : "text-[#FF9500] bg-[#FF9500]/10"}`}>
                  {user.cidVerified ? <Check className="size-3" /> : <X className="size-3" />}
                  {user.cidVerified ? "Verified" : "Unverified"}
                </span>
              </div>
              <div className="col-span-1">
                <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium capitalize ${user.status === "active" ? "text-[#34C759] bg-[#34C759]/10" : "text-destructive bg-destructive/10"}`}>{user.status}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <button onClick={() => toggleCidVerify(user.id)} className="px-4 py-2 border border-border text-foreground rounded-xl text-[13px] font-medium hover:bg-background press-effect">
                  {user.cidVerified ? "Unverify" : "Verify"} CID
                </button>
                <button onClick={() => toggleSuspension(user.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium press-effect ${user.status === "active" ? "bg-destructive text-white hover:opacity-90" : "bg-[#34C759] text-white hover:opacity-90"}`}>
                  {user.status === "active" ? <ShieldOff className="size-3.5" /> : <Shield className="size-3.5" />}
                  {user.status === "active" ? "Suspend" : "Unsuspend"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
