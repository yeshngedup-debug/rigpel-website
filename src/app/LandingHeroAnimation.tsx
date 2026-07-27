"use client";

import { BlurText } from "@/components/ui/BlurText";

export function LandingHeroAnimation() {
  return (
    <BlurText
      text="Find work. Hire help. For Bhutan."
      delay={100}
      direction="top"
      className="text-white text-[48px] md:text-[72px] font-bold tracking-[-0.03em] leading-[1.05] mb-6 justify-center"
      stepDuration={0.3}
    />
  );
}
