"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload, Check } from "lucide-react";

export default function RegisterDetailsPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "+975-77-",
    cid_number: "",
    agreed: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("rigpel_role");
    if (!stored) { router.replace("/register/role"); return; }
    setRole(stored);
  }, [router]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone || !form.cid_number || !form.agreed) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    localStorage.setItem("rigpel_user", JSON.stringify({
      full_name: form.full_name,
      phone: form.phone,
      cid_number: form.cid_number,
      role: role,
      verification_status: "pending",
      rating: 0,
      jobs_completed: 0,
      created_at: new Date().toISOString(),
    }));
    setLoading(false);
    router.push(role === "client" ? "/client/dashboard" : "/worker/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[520px]">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 press-effect">
            <ArrowLeft className="size-4" />
            <span className="text-[14px]">Back</span>
          </button>

          <div className="text-center mb-10">
            <div className="size-16 rounded-[20px] bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white shadow-lg mx-auto mb-5">
              <Upload className="size-7" />
            </div>
            <h1 className="text-[40px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Complete your profile
            </h1>
            <p className="text-[17px] text-muted-foreground mt-3">
              {role === "client" ? "Employers" : "Workers"} must verify their identity to join RIGPEL
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[18px] font-semibold">Personal Information</legend>

              <label className="fieldset-label">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={update("full_name")}
                placeholder="e.g. Tashi Dorji"
                className="input w-full"
                required
              />

              <label className="fieldset-label">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+975-77-123456"
                className="input w-full"
                required
              />

              <label className="fieldset-label">CID Number</label>
              <input
                type="text"
                value={form.cid_number}
                onChange={update("cid_number")}
                placeholder="e.g. 11501000123"
                className="input w-full"
                required
              />
              <p className="text-[12px] text-muted-foreground mt-1">
                Your CID will be verified against the national database
              </p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[18px] font-semibold">Verification</legend>
              <p className="text-[14px] text-muted-foreground mb-3">
                You'll be able to upload your CID photo and bank QR code later from your profile settings.
              </p>
            </fieldset>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                className="checkbox checkbox-primary mt-0.5"
              />
              <span className="text-[14px] text-foreground/70 group-hover:text-foreground transition-colors">
                I agree to the{" "}
                <Link href="#" className="text-primary font-medium hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-primary font-medium hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !form.full_name || !form.phone || !form.cid_number || !form.agreed}
              className="btn btn-primary btn-block h-14 text-[16px] font-semibold rounded-xl"
            >
              {loading ? (
                <><Loader2 className="size-5 animate-spin" /> Creating account...</>
              ) : (
                <><Check className="size-5" /> Create Account</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
