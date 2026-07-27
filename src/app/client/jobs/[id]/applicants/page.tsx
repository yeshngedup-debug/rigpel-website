"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Phone, CreditCard, Check } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const mockApplicants = [
  { id: "w1", name: "Tashi Dorji", rating: 4.8, jobsCompleted: 12, skills: ["Driving", "Punctual", "Reliable"], phone: "+975-77-123456", cidVerified: true, bankQR: "mBoB QR" },
  { id: "w2", name: "Karma Wangmo", rating: 4.5, jobsCompleted: 8, skills: ["Customer Service", "Sales", "English"], phone: "+975-77-654321", cidVerified: true, bankQR: "BNB QR" },
  { id: "w3", name: "Sonam Yangki", rating: 4.2, jobsCompleted: 3, skills: ["Cleaning", "Organizing"], phone: "+975-77-789012", cidVerified: false, bankQR: null },
];

export default function ApplicantsPage() {
  usePageTitle("Applicants");
  const [selected, setSelected] = useState<string | null>(null);
  const [contactUnlocked, setContactUnlocked] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (workerId: string) => {
    setSelected(workerId);
    setContactUnlocked(workerId);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 press-effect">
        <ArrowLeft className="size-4" /><span className="text-[14px]">Back</span>
      </button>

      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Applicants</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Review workers and select the best fit</p>
      </div>

      <div className="space-y-4">
        {mockApplicants.map((worker) => (
          <div key={worker.id} className={`bg-white rounded-2xl border p-6 transition-all ${selected === worker.id ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white font-bold text-[20px]">
                  {worker.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-foreground">{worker.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[13px]"><Star className="size-3.5 text-[#FF9500]" fill="#FF9500" /> {worker.rating}</span>
                    <span className="text-[13px] text-muted-foreground">· {worker.jobsCompleted} jobs</span>
                    {worker.cidVerified && <span className="apple-pill apple-pill-green text-[11px]">CID Verified</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => handleSelect(worker.id)} className={`px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all press-effect ${selected === worker.id ? "bg-[#34C759] text-white" : "bg-primary text-white hover:opacity-90"}`}>
                {selected === worker.id ? "Selected" : "Select Worker"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill) => <span key={skill} className="apple-pill apple-pill-blue">{skill}</span>)}
            </div>
            {contactUnlocked === worker.id && (
              <div className="bg-[#34C759]/5 border border-[#34C759]/20 rounded-2xl p-5 mt-4">
                <p className="text-[14px] font-semibold text-[#34C759] mb-3 flex items-center gap-2"><Check className="size-4" /> Contact Unlocked</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><Phone className="size-4 text-primary" /><span className="text-[15px] font-medium text-foreground">{worker.phone}</span></div>
                  {worker.bankQR && <div className="flex items-center gap-3"><CreditCard className="size-4 text-primary" /><span className="text-[15px] text-foreground">{worker.bankQR}</span></div>}
                  <p className="text-[13px] text-muted-foreground mt-2">Contact worker directly for payment via mBoB or bank transfer.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
