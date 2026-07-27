"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Phone, Loader2 } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const PHONE_REGEX = /^\+975-\d{2}-\d{6}$/;

export default function LoginPage() {
  usePageTitle("Sign In");
  const [phone, setPhone] = useState("+975-");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setError("Enter a valid Bhutanese phone number (e.g., +975-77-123456)");
      return;
    }
    setError("");
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

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center gap-3 bg-white border border-border rounded-xl px-5 py-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20 transition-all">
                <span className="text-[15px] text-foreground font-medium shrink-0">+975-</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.startsWith("+975-")) {
                      setPhone(val);
                    } else {
                      setPhone("+975-" + val.replace(/^\+975-?/, ""));
                    }
                    setError("");
                  }}
                  className="flex-1 bg-transparent border-none text-[17px] text-foreground focus:outline-none p-0 placeholder:text-muted-foreground/50"
                  placeholder="77-123456"
                  required
                  aria-label="Phone number"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-[13px] text-destructive mt-2" role="alert">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="btn btn-primary btn-block h-14 text-[16px] font-semibold rounded-xl mt-8"
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
