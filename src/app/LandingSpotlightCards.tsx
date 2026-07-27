"use client";

import { Search, Star, Shield } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const steps = [
  {
    icon: Search,
    title: "Browse or Post",
    desc: "Workers find gigs, employers post jobs. Free to browse.",
    gradient: "from-primary to-[#5856D6]",
  },
  {
    icon: Star,
    title: "Review & Select",
    desc: "Employers review worker profiles, ratings, and completed jobs.",
    gradient: "from-[#FF9500] to-destructive",
  },
  {
    icon: Shield,
    title: "Work & Get Paid",
    desc: "Direct payout via mBoB/bank QR. No commission, no middleman.",
    gradient: "from-[#34C759] to-[#30D158]",
  },
];

export function LandingSpotlightCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, i) => (
        <SpotlightCard
          key={i}
          className="bg-white rounded-[24px] p-10 border border-border card-lift"
          spotlightColor="rgba(109, 70, 255, 0.1)"
        >
          <div className={`size-14 rounded-[16px] flex items-center justify-center mb-6 bg-gradient-to-br ${step.gradient} text-white shadow-lg`}>
            <step.icon className="size-7" />
          </div>
          <h3 className="text-[22px] font-semibold text-foreground">{step.title}</h3>
          <p className="text-[17px] text-muted-foreground mt-3 leading-[1.5]">{step.desc}</p>
        </SpotlightCard>
      ))}
    </div>
  );
}
