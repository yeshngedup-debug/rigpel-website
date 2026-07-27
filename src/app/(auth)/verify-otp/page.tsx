"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const RESEND_COOLDOWN = 30;

export default function VerifyOTPPage() {
  usePageTitle("Verify Phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = data.split("").concat(Array(6 - data.length).fill(""));
    setOtp(newOtp);
    inputRefs.current[Math.min(data.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "User", phone: "+975-77-123456" }));
    localStorage.setItem("rigpel_role", "worker");
    router.push("/worker/dashboard");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(109,70,255,0.12),_transparent_38%),linear-gradient(135deg,_#f8f7ff_0%,_#ffffff_100%)] flex flex-col">
      <header className="flex items-center px-6 md:px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16 py-8">
        <div className="w-full max-w-[500px]">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 press-effect min-h-11">
            <ArrowLeft className="size-4" />
            <span className="text-[14px]">Back</span>
          </button>

          <div className="bg-white/90 rounded-[28px] border border-border p-8 md:p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M7 9h10" />
                  <path d="M7 13h6" />
                </svg>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-bold tracking-[-0.03em] text-foreground leading-none">
                Verify your phone
              </h1>
              <p className="text-[15px] md:text-[17px] text-muted-foreground mt-3">
                Enter the 6-digit code sent to +975-77-123456
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="otp otp-lg flex items-center justify-center gap-3 mb-8" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    pattern="\d"
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="h-14 w-12 rounded-2xl border border-border bg-background text-center text-[24px] font-semibold text-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
                    maxLength={1}
                    autoFocus={i === 0}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
              </label>

              <button
                type="submit"
                disabled={loading || otp.some((d) => !d)}
                className="btn btn-primary btn-block text-[16px] font-semibold h-14 rounded-2xl shadow-sm"
              >
                {loading ? (
                  <><Loader2 className="size-5 animate-spin" /> Verifying...</>
                ) : (
                  "Verify Code"
                )}
              </button>

              <p className="text-center mt-6 text-[14px] text-muted-foreground">
                Didn&apos;t receive code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0}
                  className="text-primary font-medium hover:underline disabled:text-muted-foreground disabled:no-underline disabled:cursor-not-allowed"
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
