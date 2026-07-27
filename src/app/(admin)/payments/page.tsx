"use client";

import { Check, X, Eye } from "lucide-react";

const mockPayments = [
  { id: "p1", employer: "Dorji Wangchuk", job: "Delivery Rider", amount: "Nu 500", screenshot: "payment-dorji.jpeg", status: "pending" as const, date: "2 hours ago" },
  { id: "p2", employer: "Karma Wangmo", job: "Shop Assistant", amount: "Nu 8,000", screenshot: "payment-karma.jpeg", status: "pending" as const, date: "1 day ago" },
  { id: "p3", employer: "Tashi Dorji", job: "Construction Worker", amount: "Nu 3,000", screenshot: "payment-tashi.jpeg", status: "pending" as const, date: "3 days ago" },
];

export default function PaymentsPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Payment Verification</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Approve employer payments for listing/featured fees</p>
      </div>

      <div className="space-y-4">
        {mockPayments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center text-white shadow-lg">
                  <Eye className="size-7" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-foreground">{payment.employer}</h3>
                  <p className="text-[14px] text-muted-foreground mt-1">
                    {payment.job} · {payment.amount} · {payment.date}
                  </p>
                  <div className="mt-3">
                    <div className="size-32 bg-background rounded-xl border border-border flex items-center justify-center text-[13px] text-muted-foreground cursor-pointer hover:border-primary transition-colors">
                      <div className="text-center">
                        <Eye className="size-8 mx-auto mb-1" />
                        View Screenshot
                      </div>
                    </div>
                  </div>
                  <span className="apple-pill apple-pill-orange mt-3 inline-block">Pending Review</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#34C759] text-white rounded-xl text-[14px] font-medium hover:opacity-90 transition-opacity press-effect">
                  <Check className="size-4" /> Approve
                </button>
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-destructive text-white rounded-xl text-[14px] font-medium hover:opacity-90 transition-opacity press-effect">
                  <X className="size-4" /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
