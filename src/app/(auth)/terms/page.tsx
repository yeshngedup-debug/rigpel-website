import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center px-6 md:px-10 py-5 shrink-0">
        <Link href="/" className="text-[17px] font-bold tracking-[0.15em] text-foreground">RIGPEL</Link>
      </header>
      <div className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <Link href="/register/details" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 press-effect min-h-[44px]">
          <ArrowLeft className="size-4" />
          <span className="text-[14px]">Back</span>
        </Link>
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground mb-6">Terms of Service</h1>
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-6 text-[15px] text-foreground/80 leading-relaxed">
          <p>These Terms of Service govern your use of the RIGPEL platform. By creating an account, you agree to these terms.</p>
          <h2 className="text-[18px] font-semibold text-foreground">1. Account Registration</h2>
          <p>You must provide accurate information during registration. Your CID must be valid and verifiable. You are responsible for maintaining the confidentiality of your account.</p>
          <h2 className="text-[18px] font-semibold text-foreground">2. Job Listings</h2>
          <p>Employers must provide accurate job descriptions. Workers must only apply for jobs they are qualified to perform. RIGPEL facilitates connections but is not party to employment agreements.</p>
          <h2 className="text-[18px] font-semibold text-foreground">3. Payments</h2>
          <p>All payments are processed directly between workers and employers via mBoB, bank transfer, or QR payment. RIGPEL does not handle or escrow payments.</p>
          <h2 className="text-[18px] font-semibold text-foreground">4. Prohibited Conduct</h2>
          <p>Fraudulent listings, fake profiles, harassment, or any violation of Bhutanese law will result in immediate account suspension.</p>
          <h2 className="text-[18px] font-semibold text-foreground">5. Limitation of Liability</h2>
          <p>RIGPEL is a marketplace platform and is not liable for disputes between workers and employers. We encourage users to resolve disputes directly.</p>
          <p className="text-muted-foreground text-[13px]">Last updated: 2026</p>
        </div>
      </div>
    </div>
  );
}
