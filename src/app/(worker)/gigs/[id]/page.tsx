"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, Star, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";

const mockGig = {
  id: "1",
  title: "Delivery Rider",
  company: "FoodPanda",
  location: "Thimphu",
  pay: "Nu 500/day",
  duration: "2 weeks",
  rating: 4.5,
  category: "Service",
  duties: ["Deliver food orders within Thimphu", "Maintain delivery log", "Ensure timely deliveries", "Report any issues to manager"],
  requirements: ["Valid driving license", "Own motorcycle/scooter", "Punctual and reliable"],
  employer: { name: "FoodPanda Bhutan", rating: 4.3, jobsCompleted: 15, verified: true },
};

export default function GigDetailPage() {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const router = useRouter();

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 press-effect">
        <ArrowLeft className="size-4" />
        <span className="text-[14px]">Back to gigs</span>
      </button>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="apple-pill apple-pill-blue">{mockGig.category}</span>
                <span className="apple-pill apple-pill-green">{mockGig.duration}</span>
              </div>
              <h1 className="text-[32px] font-bold tracking-[-0.02em] text-foreground">{mockGig.title}</h1>
              <p className="text-[17px] text-muted-foreground mt-1">{mockGig.company}</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-bold text-[#34C759]">{mockGig.pay}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="apple-pill apple-pill-indigo"><MapPin className="size-3" /> {mockGig.location}</span>
            <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
              <Star className="size-3.5 text-[#FF9500]" fill="#FF9500" /> {mockGig.rating}
            </span>
          </div>

          {applied ? (
            <div className="bg-[#34C759]/10 border border-[#34C759]/20 rounded-2xl p-6 text-center mb-8">
              <CheckCircle className="size-12 text-[#34C759] mx-auto mb-3" />
              <p className="text-[18px] font-semibold text-foreground">Applied Successfully!</p>
              <p className="text-[15px] text-muted-foreground mt-1">The employer will review your application</p>
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full py-4 bg-gradient-to-r from-primary to-[#5856D6] text-white rounded-2xl font-semibold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-50 press-effect flex items-center justify-center gap-2 mb-8"
            >
              {applying ? <><Loader2 className="size-5 animate-spin" /> Applying...</> : "Apply for this Job"}
            </button>
          )}

          <div className="space-y-8">
            <div>
              <h2 className="text-[20px] font-semibold text-foreground mb-4">Duties</h2>
              <ul className="space-y-3">
                {mockGig.duties.map((duty, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-foreground/80">
                    <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
                    {duty}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[20px] font-semibold text-foreground mb-4">Requirements</h2>
              <ul className="space-y-3">
                {mockGig.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-foreground/80">
                    <div className="size-2 rounded-full bg-[#34C759] mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="text-[20px] font-semibold text-foreground mb-4">About Employer</h2>
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white font-bold text-[20px]">
                  {mockGig.employer.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[17px] font-semibold text-foreground">{mockGig.employer.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-[13px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="size-3 text-[#FF9500]" fill="#FF9500" /> {mockGig.employer.rating}</span>
                    <span>{mockGig.employer.jobsCompleted} jobs completed</span>
                    {mockGig.employer.verified && (
                      <span className="apple-pill apple-pill-green text-[11px]">Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
