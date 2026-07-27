"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

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
    const fullOtp = otp.join("");
    localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "User", phone: "+975-77-123456" }));
    localStorage.setItem("rigpel_role", "worker");
    router.push("/worker/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[480px]">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 press-effect">
            <ArrowLeft className="size-4" />
            <span className="text-[14px]">Back</span>
          </button>

          <div className="text-center mb-10">
            <h1 className="text-[40px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Verify your phone
            </h1>
            <p className="text-[17px] text-muted-foreground mt-3">
              Enter the 6-digit code sent to +975-77-123456
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3 mb-10" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-14 h-16 text-center text-[24px] font-semibold bg-background border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all"
                  maxLength={1}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || otp.some((d) => !d)}
              className="w-full py-4 px-6 bg-primary text-white rounded-xl font-semibold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-50 press-effect flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="size-5 animate-spin" /> Verifying...</>
              ) : (
                "Verify Code"
              )}
            </button>

            <p className="text-center mt-6 text-[14px] text-muted-foreground">
              Didn't receive code?{" "}
              <button type="button" className="text-primary font-medium hover:underline">
                Resend
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
