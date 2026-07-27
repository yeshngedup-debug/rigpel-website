"use client";

import { useState } from "react";
import { Search, Check, X, Eye, DollarSign } from "lucide-react";

const mockPayments = [
  { id: "1", job: "Delivery Rider", worker: "Tashi Dorji", employer: "Tashi Store", amount: "Nu 3,500", status: "pending" as const, date: "2 days ago", screenshot: "screenshot_1.jpg" },
  { id: "2", job: "Shop Assistant", worker: "Karma Wangmo", employer: "Karma Shop", amount: "Nu 8,000", status: "verified" as const, date: "1 week ago", screenshot: "screenshot_2.jpg" },
  { id: "3", job: "Construction Worker", worker: "Sonam Yangki", employer: "Pema Constr.", amount: "Nu 6,000", status: "disputed" as const, date: "3 days ago", screenshot: "screenshot_3.jpg" },
  { id: "4", job: "Gardener", worker: "Pema Dorji", employer: "Green Thumb", amount: "Nu 2,000", status: "pending" as const, date: "1 day ago", screenshot: "screenshot_4.jpg" },
];

const statusConfig = {
  pending: { label: "Pending", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10" },
  verified: { label: "Verified", color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  disputed: { label: "Disputed", color: "text-destructive", bg: "bg-destructive/10" },
};

export default function PaymentsPage() {
  const [filter, setFilter] = useState("all");
  const [payments, setPayments] = useState(mockPayments);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const updateStatus = (id: string, status: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: status as any } : p));
  };

  const filtered = filter === "all" ? payments : payments.filter(p => p.status === filter);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Payments</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Verify payment screenshots and resolve disputes</p>
      </div>

      <div className="flex gap-2 mb-6" role="tablist" aria-label="Filter payments">
        {["all", "pending", "verified", "disputed"].map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} role="tab" aria-selected={filter === f} className={`px-4 py-2 rounded-full text-[13px] font-medium capitalize transition-colors press-effect ${filter === f ? "bg-primary text-white" : "bg-white text-foreground border border-border hover:bg-background"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((payment) => {
          const cfg = statusConfig[payment.status];
          return (
            <div key={payment.id} className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[17px] font-semibold text-foreground">{payment.job}</h3>
                  <p className="text-[14px] text-muted-foreground">{payment.worker} → {payment.employer}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium capitalize ${cfg.color} ${cfg.bg}`}>
                  <DollarSign className="size-3.5" /> {payment.amount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-muted-foreground">{payment.date}</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setScreenshot(payment.screenshot)} className="p-2 border border-border rounded-xl text-muted-foreground hover:text-foreground press-effect" title="View Screenshot" aria-label="View payment screenshot"><Eye className="size-4" /></button>
                  {payment.status === "pending" || payment.status === "disputed" ? (
                    <>
                      <button type="button" onClick={() => updateStatus(payment.id, "verified")} className="flex items-center gap-1 px-4 py-2 bg-[#34C759] text-white rounded-xl text-[13px] font-medium hover:opacity-90 press-effect">
                        <Check className="size-4" /> Verify
                      </button>
                      <button type="button" onClick={() => updateStatus(payment.id, "disputed")} className="flex items-center gap-1 px-4 py-2 bg-destructive text-white rounded-xl text-[13px] font-medium hover:opacity-90 press-effect">
                        <X className="size-4" /> Flag
                      </button>
                    </>
                  ) : (
                    <span className="text-[13px] text-muted-foreground">Completed</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {screenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={() => setScreenshot(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-semibold">Screenshot</h3>
              <button type="button" onClick={() => setScreenshot(null)} className="btn btn-ghost btn-square btn-sm" aria-label="Close screenshot">
                <X className="size-4" />
              </button>
            </div>
            <div className="bg-background rounded-xl h-64 flex items-center justify-center text-muted-foreground text-[15px]">
              {screenshot}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
