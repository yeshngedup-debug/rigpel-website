"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, User, Phone, CreditCard, Loader2, Search, Briefcase } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const ROLE_LABELS = { worker: { name: "Worker", icon: Search, desc: "Find part-time jobs" }, client: { name: "Employer", icon: Briefcase, desc: "Post jobs and hire" } };

export default function RegisterDetailsPage() {
  usePageTitle("Complete Registration");
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneRaw, setPhoneRaw] = useState("77-");
  const [form, setForm] = useState({
    full_name: "",
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

  const phone = "+975-" + phoneRaw;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || phone.length < 12 || !form.cid_number || !form.agreed) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    try {
      localStorage.setItem("rigpel_user", JSON.stringify({
        full_name: form.full_name,
        phone,
        cid_number: form.cid_number,
        role,
        verification_status: "pending",
        rating: 0,
        jobs_completed: 0,
        created_at: new Date().toISOString(),
      }));
    } catch {
      console.error("Failed to save user data");
      return;
    }
    setLoading(false);
    router.push(role === "client" ? "/client/dashboard" : "/worker/dashboard");
  };

  const roleInfo = role ? ROLE_LABELS[role as keyof typeof ROLE_LABELS] : null;
  const RoleIcon = roleInfo?.icon || User;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
        <Link href="/register/role" className="text-[14px] text-primary font-medium hover:underline min-h-[44px] inline-flex items-center">
          Change role
        </Link>
      </header>

      <div className="flex-1 flex items-start md:items-center justify-center px-6 pb-16 pt-6 md:pt-0">
        <div className="w-full max-w-[480px]">
          <button
            onClick={() => router.push("/register/role")}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-6 press-effect min-h-[44px]"
            aria-label="Back to role selection"
          >
            <ArrowLeft className="size-4" />
            <span className="text-[14px]">Back</span>
          </button>

          <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl border border-border p-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <RoleIcon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-foreground">
                Signing up as {roleInfo?.name || "..."}
              </p>
              <p className="text-[13px] text-foreground/70">{roleInfo?.desc}</p>
            </div>
            <Link href="/register/role" className="text-[13px] text-primary font-medium hover:underline shrink-0">
              Change
            </Link>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Create your account
            </h1>
            <p className="text-[15px] text-foreground/70 mt-3">
              {role === "client"
                ? "Set up your employer profile to start hiring"
                : "Set up your worker profile to start finding work"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
              <div>
                <label htmlFor="full_name" className="text-[14px] font-semibold text-foreground block mb-1.5">
                  Full Name
                </label>
                <input
                  id="full_name"
                  type="text"
                  value={form.full_name}
                  onChange={update("full_name")}
                  placeholder="e.g. Tashi Dorji"
                  className="input w-full"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-[14px] font-semibold text-foreground block mb-1.5">
                  Phone Number
                </label>
                <div className="flex items-center gap-0 rounded-xl border border-border bg-white overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20 transition-all">
                  <span className="text-[15px] text-foreground font-medium px-4 py-3 bg-background border-r border-border shrink-0">+975-</span>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneRaw}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d-]/g, "");
                      if (val.length <= 9) setPhoneRaw(val);
                    }}
                    placeholder="77-123456"
                    className="flex-1 bg-transparent border-none text-[15px] text-foreground focus:outline-none px-4 py-3"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cid_number" className="text-[14px] font-semibold text-foreground block mb-1.5">
                  CID Number
                </label>
                <input
                  id="cid_number"
                  type="text"
                  value={form.cid_number}
                  onChange={update("cid_number")}
                  placeholder="e.g. 11501000123"
                  className="input w-full"
                  required
                  autoComplete="off"
                  maxLength={11}
                />
                <p className="text-[12px] text-foreground/70 mt-1.5">
                  Your Citizenship ID will be verified against the national database
                </p>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group bg-white rounded-2xl border border-border p-4 transition-all hover:border-primary/30">
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                className="checkbox checkbox-primary mt-0.5 shrink-0"
                aria-label="Accept terms and privacy policy"
              />
              <span className="text-[13px] text-foreground/70 group-hover:text-foreground transition-colors leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary font-medium hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !form.full_name || phone.length < 12 || !form.cid_number || !form.agreed}
              className="btn btn-primary btn-block h-14 text-[16px] font-semibold rounded-xl shadow-sm"
            >
              {loading ? (
                <><Loader2 className="size-5 animate-spin" /> Creating account...</>
              ) : (
                <><span>Create Account</span><ArrowRight className="size-5" /></>
              )}
            </button>

            <p className="text-center text-[13px] text-foreground/70">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
