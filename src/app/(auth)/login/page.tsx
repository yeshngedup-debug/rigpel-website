"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Phone, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("+975-");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
        <Link href="/register/role" className="text-[14px] text-primary font-medium hover:underline min-h-[44px] inline-flex items-center">
          Create account
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[520px]">
          <div className="text-center mb-10">
            <h1 className="text-[48px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Sign in
            </h1>
            <p className="text-[17px] text-muted-foreground mt-3">
              Enter your phone number to continue
            </p>
          </div>

          <div className="bg-background rounded-[24px] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Phone className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold text-foreground">Phone number</h2>
                <p className="text-[14px] text-muted-foreground">We'll send you a verification code</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-4 border border-border rounded-xl text-[17px] text-foreground bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
                placeholder="+975-77-123456"
                required
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-white rounded-xl font-semibold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-50 mt-8 press-effect flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="size-5 animate-spin" /> Sending code...</>
                ) : (
                  <><span>Send Code</span><ArrowRight className="size-5" /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[14px] text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register/role" className="text-primary font-medium hover:underline">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
