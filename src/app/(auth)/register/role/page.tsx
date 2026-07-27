"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, Search } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

export default function RegisterRolePage() {
  usePageTitle("Choose Your Role");
  const router = useRouter();

  const selectRole = (role: string) => {
    localStorage.setItem("rigpel_role", role);
    router.push("/register/details");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(109,70,255,0.12),transparent_38%),linear-gradient(135deg,#f8f7ff_0%,#ffffff_100%)] flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
        <Link href="/login" className="text-[14px] text-primary font-medium hover:underline min-h-11 inline-flex items-center">
          Sign in
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16 py-8">
        <div className="w-full max-w-175">
          <div className="text-center mb-10">
            <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">
              Choose your role
            </div>
            <h1 className="text-[40px] md:text-[48px] font-bold tracking-[-0.03em] text-foreground leading-none">
              Join RIGPEL
            </h1>
            <p className="text-[15px] md:text-[17px] text-muted-foreground mt-3">
              Pick the path that matches how you want to work or hire
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => selectRole("worker")}
              className="bg-white/90 rounded-3xl p-8 border border-border text-left hover:border-primary hover:shadow-lg transition-all card-lift group"
            >
              <div className="size-16 rounded-[20px] bg-linear-to-br from-primary to-[#5856D6] flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-105 transition-transform">
                <Search className="size-8" />
              </div>
              <h2 className="text-[24px] font-semibold text-foreground">I&apos;m a Worker</h2>
              <p className="text-[15px] text-muted-foreground mt-3 leading-normal">
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
              className="bg-white/90 rounded-3xl p-8 border border-border text-left hover:border-[#FF9500] hover:shadow-lg transition-all card-lift group"
            >
              <div className="size-16 rounded-[20px] bg-linear-to-br from-[#FF9500] to-destructive flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-105 transition-transform">
                <Briefcase className="size-8" />
              </div>
              <h2 className="text-[24px] font-semibold text-foreground">I&apos;m an Employer</h2>
              <p className="text-[15px] text-muted-foreground mt-3 leading-normal">
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
