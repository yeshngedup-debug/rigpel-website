"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, Check, Loader2 } from "lucide-react";

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const gig = {
    id: params.id,
    title: "Delivery Rider",
    category: "Service",
    location: "Thimphu",
    pay: "Nu 500/day",
    duration: "1 week",
    posted: "2 hours ago",
    description: "Looking for a reliable delivery rider to handle daily deliveries around Thimphu city. Must have own bike and valid driving license.",
    duties: ["Deliver packages within Thimphu", "Handle cash payments", "Report daily deliveries", "Maintain bike in good condition"],
    requirements: ["Valid driving license", "Own motorcycle", "Smartphone with internet", "Punctual and reliable"],
    urgent: true,
  };

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => { setApplying(false); setApplied(true); }, 1500);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 press-effect">
        <ArrowLeft className="size-4" /><span className="text-[14px]">Back</span>
      </button>

      {applied ? (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <div className="size-16 rounded-full bg-[#34C759]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="size-8 text-[#34C759]" />
          </div>
          <h2 className="text-[28px] font-bold text-foreground">Application Sent!</h2>
          <p className="text-[17px] text-muted-foreground mt-3">The employer will contact you if you're selected.</p>
          <button onClick={() => router.push("/worker/gigs/browse")} className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 press-effect">Browse More Gigs</button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-[#5856D6]/20 flex items-center justify-center">
                  <Briefcase className="size-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-[28px] font-bold text-foreground">{gig.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[14px] text-muted-foreground">{gig.category}</span>
                    {gig.urgent && <span className="apple-pill apple-pill-destructive text-[11px]">Urgent</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { icon: MapPin, label: "Location", value: gig.location },
                { icon: DollarSign, label: "Pay", value: gig.pay },
                { icon: Clock, label: "Duration", value: gig.duration },
                { icon: Clock, label: "Posted", value: gig.posted },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl">
                  <item.icon className="size-4 text-primary" />
                  <div><p className="text-[12px] text-muted-foreground">{item.label}</p><p className="text-[14px] font-medium text-foreground">{item.value}</p></div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-[18px] font-semibold text-foreground mb-3">Description</h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{gig.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-[16px] font-semibold text-foreground mb-3">Duties</h2>
                <ul className="space-y-2">
                  {gig.duties.map((d, i) => <li key={i} className="flex items-start gap-2 text-[14px] text-muted-foreground"><Check className="size-4 text-primary mt-0.5 shrink-0" /> {d}</li>)}
                </ul>
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-foreground mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {gig.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 text-[14px] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" /> {r}</li>)}
                </ul>
              </div>
            </div>

            <button onClick={handleApply} disabled={applying} className="w-full py-4 bg-gradient-to-r from-primary to-[#5856D6] text-white rounded-xl text-[17px] font-semibold hover:opacity-90 disabled:opacity-50 transition-all press-effect flex items-center justify-center gap-2">
              {applying ? <><Loader2 className="size-5 animate-spin" /> Applying...</> : "Apply Now"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
