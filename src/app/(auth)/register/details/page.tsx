"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, User, Check } from "lucide-react";

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
    try {
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
    } catch {
      console.error("Failed to save user data");
      return;
    }
    setLoading(false);
    router.push(role === "client" ? "/client/dashboard" : "/worker/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center px-6 md:px-10 py-5 shrink-0">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
      </header>

      <div className="flex-1 flex items-start md:items-center justify-center px-6 pb-16 pt-8 md:pt-0">
        <div className="w-full max-w-[480px]">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 press-effect min-h-[44px]"
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
            <span className="text-[14px]">Back</span>
          </button>

          <div className="text-center mb-8">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="size-6 text-primary" />
            </div>
            <h1 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Create your account
            </h1>
            <p className="text-[15px] text-muted-foreground mt-3">
              {role === "client"
                ? "Set up your employer profile to start hiring"
                : "Set up your worker profile to start finding work"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
              <h2 className="text-[15px] font-semibold text-foreground">Personal Information</h2>

              <div>
                <label htmlFor="full_name" className="text-[13px] font-medium text-foreground block mb-1.5">
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
                <label htmlFor="phone" className="text-[13px] font-medium text-foreground block mb-1.5">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+975-77-123456"
                  className="input w-full"
                  required
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor="cid_number" className="text-[13px] font-medium text-foreground block mb-1.5">
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
                />
                <p className="text-[12px] text-muted-foreground mt-1.5">
                  Your Citizenship ID will be verified against the national database
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <h2 className="text-[15px] font-semibold text-foreground mb-1">Verification</h2>
              <p className="text-[13px] text-muted-foreground">
                After signing up, you can upload your CID photo and bank QR code from your profile settings for verification.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
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
              disabled={loading || !form.full_name || !form.phone || !form.cid_number || !form.agreed}
              className="btn btn-primary btn-block h-12 text-[15px] font-semibold rounded-xl"
            >
              {loading ? (
                <><Loader2 className="size-4 animate-spin" /> Creating account...</>
              ) : (
                <><Check className="size-4" /> Create Account</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
