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
          <div className="size-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="size-8 text-success" />
          </div>
          <h2 className="text-[28px] font-bold text-foreground">Job Posted!</h2>
          <p className="text-[17px] text-muted-foreground mt-3">Your job is now live.</p>
          <button onClick={() => router.push("/client/jobs/manage")} className="btn btn-primary mt-8">Manage Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 press-effect">
        <ArrowLeft className="size-4" /><span className="text-[14px]">Back</span>
      </button>
      <ul className="steps mb-8">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Details</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Pay & Duration</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Duties</li>
      </ul>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        {step === 1 && (
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[22px] font-semibold">Job Details</legend>
            <label className="fieldset-label">Job Title</label>
            <input type="text" value={form.title} onChange={update("title")} placeholder="e.g. Delivery Rider" className="input w-full" />
            <label className="fieldset-label">Category</label>
            <select value={form.category} onChange={update("category")} className="select w-full">
              {["Tech", "Labor", "Service", "Creative", "Hospitality", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="fieldset-label">Location</label>
            <input type="text" value={form.location} onChange={update("location")} placeholder="e.g. Thimphu" className="input w-full" />
            <button onClick={() => setStep(2)} className="btn btn-primary mt-2">Continue</button>
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[22px] font-semibold">Pay & Duration</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="fieldset-label">Pay Amount</label>
                <input type="number" value={form.pay_amount} onChange={update("pay_amount")} placeholder="500" className="input w-full" />
              </div>
              <div>
                <label className="fieldset-label">Pay Period</label>
                <select value={form.pay_period} onChange={update("pay_period")} className="select w-full">
                  <option value="day">Per Day</option><option value="week">Per Week</option><option value="month">Per Month</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="fieldset-label">Duration</label>
                <input type="number" value={form.duration_value} onChange={update("duration_value")} min="1" className="input w-full" />
              </div>
              <div>
                <label className="fieldset-label">Duration Unit</label>
                <select value={form.duration_unit} onChange={update("duration_unit")} className="select w-full">
                  <option value="day">Days</option><option value="week">Weeks</option><option value="month">Months</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(1)} className="btn btn-outline">Back</button>
              <button onClick={() => setStep(3)} className="btn btn-primary">Continue</button>
            </div>
          </fieldset>
        )}
        {step === 3 && (
          <fieldset className="fieldset">
            <div className="flex items-center justify-between">
              <legend className="fieldset-legend text-[22px] font-semibold">Duties</legend>
              <button onClick={addDuty} className="btn btn-ghost btn-sm text-primary"><Plus className="size-4" /> Add Duty</button>
            </div>
            <div className="space-y-3">
              {form.duties.map((duty, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input type="text" value={duty} onChange={(e) => updateDuty(i, e.target.value)} placeholder={`Duty ${i + 1}`} className="input flex-1" />
                  {form.duties.length > 1 && <button onClick={() => removeDuty(i)} className="btn btn-ghost btn-square btn-sm text-muted-foreground hover:text-destructive"><X className="size-4" /></button>}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setStep(2)} className="btn btn-outline">Back</button>
              <button onClick={handleSubmit} disabled={submitting} className="btn btn-primary gap-2 bg-gradient-to-r from-primary to-[#5856D6] border-0">
                {submitting ? <><Loader2 className="size-4 animate-spin" /> Posting...</> : "Post Job"}
              </button>
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
}
