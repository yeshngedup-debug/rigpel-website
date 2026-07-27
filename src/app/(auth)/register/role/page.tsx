"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Search } from "lucide-react";

export default function RegisterRolePage() {
  const router = useRouter();

  const selectRole = (role: string) => {
    localStorage.setItem("rigpel_role", role);
    router.push("/register/details");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
        <Link href="/login" className="text-[14px] text-primary font-medium hover:underline min-h-[44px] inline-flex items-center">
          Sign in
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[640px]">
          <div className="text-center mb-12">
            <h1 className="text-[48px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Join RIGPEL
            </h1>
            <p className="text-[17px] text-muted-foreground mt-3">
              Choose how you want to use the platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => selectRole("worker")}
              className="bg-background rounded-[24px] p-8 border border-border text-left hover:border-primary hover:shadow-lg transition-all card-lift group"
            >
              <div className="size-16 rounded-[20px] bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-105 transition-transform">
                <Search className="size-8" />
              </div>
              <h2 className="text-[24px] font-semibold text-foreground">I'm a Worker</h2>
              <p className="text-[15px] text-muted-foreground mt-3 leading-[1.5]">
                Find part-time jobs, apply to gigs, and get paid directly to your mBoB/bank account.
              </p>
              <div className="mt-6 space-y-3">
                {["Browse jobs by category", "One-tap apply", "Direct QR payments", "CID verified profile"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-primary" />
                    <span className="text-[14px] text-foreground/70">{f}</span>
                  </div>
                ))}
              </div>
            </button>

            <button
              onClick={() => selectRole("client")}
              className="bg-background rounded-[24px] p-8 border border-border text-left hover:border-[#FF9500] hover:shadow-lg transition-all card-lift group"
            >
              <div className="size-16 rounded-[20px] bg-gradient-to-br from-[#FF9500] to-destructive flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-105 transition-transform">
                <Briefcase className="size-8" />
              </div>
              <h2 className="text-[24px] font-semibold text-foreground">I'm an Employer</h2>
              <p className="text-[15px] text-muted-foreground mt-3 leading-[1.5]">
                Post part-time jobs, review qualified workers, and hire with confidence.
              </p>
              <div className="mt-6 space-y-3">
                {["Post jobs in minutes", "Review worker profiles", "Direct payout via QR", "Track job status"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-[#FF9500]" />
                    <span className="text-[14px] text-foreground/70">{f}</span>
                  </div>
                ))}
              </div>
            </button>
          </div>

          <p className="text-center mt-8 text-[14px] text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
