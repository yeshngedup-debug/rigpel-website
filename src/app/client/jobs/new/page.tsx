"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, Loader2, Check } from "lucide-react";

export default function PostJobPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "", category: "Service", description: "",
    duration_value: "1", duration_unit: "week",
    location: "", pay_amount: "", pay_period: "day", duties: [""],
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const addDuty = () => setForm({ ...form, duties: [...form.duties, ""] });
  const removeDuty = (i: number) => setForm({ ...form, duties: form.duties.filter((_, idx) => idx !== i) });
  const updateDuty = (i: number, v: string) => {
    const d = [...form.duties]; d[i] = v; setForm({ ...form, duties: d });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <div className="size-16 rounded-full bg-[#34C759]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="size-8 text-[#34C759]" />
          </div>
          <h2 className="text-[28px] font-bold text-foreground">Job Posted!</h2>
          <p className="text-[17px] text-muted-foreground mt-3">Your job is now live.</p>
          <button onClick={() => router.push("/client/jobs/manage")} className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 press-effect">Manage Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 press-effect">
        <ArrowLeft className="size-4" /><span className="text-[14px]">Back</span>
      </button>
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`size-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${step >= s ? "bg-primary text-white" : "bg-border text-muted-foreground"}`}>{s}</div>
            <span className={`text-[13px] font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
              {s === 1 ? "Details" : s === 2 ? "Pay & Duration" : "Duties"}
            </span>
            {s < 3 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-[22px] font-semibold text-foreground">Job Details</h2>
            <div>
              <label className="text-[14px] font-medium text-foreground mb-1.5 block">Job Title</label>
              <input type="text" value={form.title} onChange={update("title")} placeholder="e.g. Delivery Rider" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>
            <div>
              <label className="text-[14px] font-medium text-foreground mb-1.5 block">Category</label>
              <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20">
                {["Tech", "Labor", "Service", "Creative", "Hospitality", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[14px] font-medium text-foreground mb-1.5 block">Location</label>
              <input type="text" value={form.location} onChange={update("location")} placeholder="e.g. Thimphu" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>
            <button onClick={() => setStep(2)} className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 press-effect">Continue</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-[22px] font-semibold text-foreground">Pay & Duration</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] font-medium text-foreground mb-1.5 block">Pay Amount</label>
                <input type="number" value={form.pay_amount} onChange={update("pay_amount")} placeholder="500" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="text-[14px] font-medium text-foreground mb-1.5 block">Pay Period</label>
                <select value={form.pay_period} onChange={update("pay_period")} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20">
                  <option value="day">Per Day</option><option value="week">Per Week</option><option value="month">Per Month</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[14px] font-medium text-foreground mb-1.5 block">Duration</label>
                <input type="number" value={form.duration_value} onChange={update("duration_value")} min="1" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="text-[14px] font-medium text-foreground mb-1.5 block">Duration Unit</label>
                <select value={form.duration_unit} onChange={update("duration_unit")} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20">
                  <option value="day">Days</option><option value="week">Weeks</option><option value="month">Months</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-8 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-background press-effect">Back</button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 press-effect">Continue</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-foreground">Duties</h2>
              <button onClick={addDuty} className="flex items-center gap-1 text-primary text-[14px] font-medium hover:underline press-effect"><Plus className="size-4" /> Add Duty</button>
            </div>
            <div className="space-y-3">
              {form.duties.map((duty, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input type="text" value={duty} onChange={(e) => updateDuty(i, e.target.value)} placeholder={`Duty ${i + 1}`} className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20" />
                  {form.duties.length > 1 && <button onClick={() => removeDuty(i)} className="p-2 text-muted-foreground hover:text-destructive"><X className="size-4" /></button>}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-8 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-background press-effect">Back</button>
              <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 bg-gradient-to-r from-primary to-[#5856D6] text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 press-effect flex items-center gap-2">
                {submitting ? <><Loader2 className="size-4 animate-spin" /> Posting...</> : "Post Job"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
