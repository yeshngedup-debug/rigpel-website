import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-6 text-[15px] text-foreground/80 leading-relaxed">
          <p>Your privacy is important to us. This policy explains how RIGPEL collects, uses, and protects your personal information.</p>
          <h2 className="text-[18px] font-semibold text-foreground">1. Information We Collect</h2>
          <p>We collect your name, phone number, CID number, and profile information you choose to provide. We also collect usage data to improve our platform.</p>
          <h2 className="text-[18px] font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>Your information is used to verify your identity, facilitate job matching, and communicate platform updates. We do not sell your data to third parties.</p>
          <h2 className="text-[18px] font-semibold text-foreground">3. Data Security</h2>
          <p>Your data is stored securely and access is restricted to authorized personnel only. We use industry-standard encryption for data transmission.</p>
          <h2 className="text-[18px] font-semibold text-foreground">4. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting our support team.</p>
          <h2 className="text-[18px] font-semibold text-foreground">5. Contact</h2>
          <p>For privacy-related inquiries, please contact our data protection officer.</p>
          <p className="text-muted-foreground text-[13px]">Last updated: 2026</p>
        </div>
      </div>
    </div>
  );
}
