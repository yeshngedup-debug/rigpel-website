"use client";

import { useState } from "react";
import { Search, Shield, ShieldOff, Check, X } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const mockUsers = [
  { id: "1", name: "Tashi Dorji", phone: "+975-77-123456", role: "worker", cidVerified: true, status: "active" as const },
  { id: "2", name: "Karma Wangmo", phone: "+975-77-654321", role: "client", cidVerified: true, status: "active" as const },
  { id: "3", name: "Sonam Yangki", phone: "+975-77-789012", role: "worker", cidVerified: false, status: "active" as const },
  { id: "4", name: "Suspicious User", phone: "+975-77-000000", role: "worker", cidVerified: false, status: "suspended" as const },
  { id: "5", name: "Pema Dorji", phone: "+975-77-111222", role: "client", cidVerified: true, status: "active" as const },
];

export default function UsersPage() {
  usePageTitle("User Management");
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

      <label className="input input-bordered flex items-center gap-3 mb-6">
        <Search className="size-4 text-muted-foreground" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="grow" />
      </label>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="table">
          <thead>
            <tr className="bg-background text-[13px] font-medium text-foreground/50 uppercase tracking-wider">
              <th>Name</th><th>Phone</th><th>Role</th><th>CID</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-background/50 transition-colors">
                <td><p className="text-[15px] font-medium text-foreground">{user.name}</p></td>
                <td><p className="text-[14px] text-muted-foreground">{user.phone}</p></td>
                <td><span className="capitalize text-[14px] text-foreground">{user.role}</span></td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium ${user.cidVerified ? "bg-[#34C759] text-white" : "bg-[#FF9500] text-white"}`}>
                    {user.cidVerified ? <Check className="size-3" /> : <X className="size-3" />}
                    {user.cidVerified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td>
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium capitalize ${user.status === "active" ? "bg-[#34C759] text-white" : "bg-[#FF3B30] text-white"}`}>{user.status}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleCidVerify(user.id)} className="btn btn-outline btn-sm">
                      {user.cidVerified ? "Unverify" : "Verify"} CID
                    </button>
                    <button onClick={() => toggleSuspension(user.id)} className={`btn btn-sm gap-1.5 text-white ${user.status === "active" ? "btn-error" : "bg-[#1E7E34] hover:bg-[#16632A] border-none"}`}>
                      {user.status === "active" ? <ShieldOff className="size-3.5" /> : <Shield className="size-3.5" />}
                      {user.status === "active" ? "Suspend" : "Unsuspend"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
