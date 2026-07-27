import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Shield, Star, Briefcase, CheckCircle2 } from "lucide-react";

const QUOTES = [
  {
    id: 1,
    dzongkha: "འབྲུག་གི་མ་འོངས་པ།",
    title: "A Lifeline for Our Future",
    text: "This project is not merely an infrastructure development. It is a People's Project. It is a nation-building effort, a lifeline for Bhutan—for our economy, our security, our sovereignty, and ultimately, our future.",
    category: "VISION",
    gradient: "from-primary to-[#5856D6]",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="relative h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/5thking.jpeg"
            alt="His Majesty King Jigme Khesar Namgyel Wangchuck"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <header className="h-16 flex items-center justify-between px-8 max-w-[1440px] mx-auto w-full">
            <span className="text-[17px] font-bold tracking-[0.15em] text-white">RIGPEL</span>
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-[14px] text-white/70 hover:text-white transition-colors min-h-[44px] inline-flex items-center">
                Sign In
              </Link>
              <Link
                href="/register/role"
                className="text-[14px] font-medium bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center px-8">
            <div className="max-w-[900px] w-full text-center">
              <span className="inline-block backdrop-blur-sm text-white text-[12px] font-semibold tracking-[0.15em] px-5 py-2 rounded-full border border-white/20 bg-gradient-to-r from-primary to-[#5856D6] mb-8">
                BHUTAN'S JOB MARKETPLACE
              </span>
              <h1 className="text-white text-[48px] md:text-[72px] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
                Find work. Hire help.
                <br />
                <span className="text-primary/90">For Bhutan.</span>
              </h1>
              <p className="text-white/70 text-[19px] md:text-[21px] leading-[1.6] max-w-[700px] mx-auto mb-10">
                The trusted platform connecting Bhutanese workers with part-time jobs.
                Verified profiles, direct payments, zero commission.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/register/role"
                  className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-[16px] font-semibold bg-gradient-to-r from-primary to-[#5856D6] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-90 transition-all press-effect"
                >
                  <span>Get Started</span>
                  <ArrowRight className="size-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-white/80 px-8 py-4 rounded-full text-[16px] font-medium border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {[
              { value: "500+", label: "Employers", color: "text-[#34C759]" },
              { value: "20+", label: "Industries", color: "text-[#FF9500]" },
              { value: "98%", label: "Satisfaction", color: "text-[#AF52DE]" },
              { value: "100%", label: "Bhutanese", color: "text-primary" },
            ].map((stat) => (
              <div key={stat.label} className="inline-flex items-center gap-3">
                <span className={`hero-stat ${stat.color}`}>{stat.value}</span>
                <span className="text-[15px] text-muted-foreground tracking-wide font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-8 py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-semibold tracking-[-0.02em] text-foreground md:text-[56px] md:leading-[1.08]">
              How it works
            </h2>
            <p className="text-[19px] text-muted-foreground mt-5 max-w-[520px] mx-auto">
              Simple steps to find or hire help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Browse or Post", desc: "Workers find gigs, employers post jobs. Free to browse.", gradient: "from-primary to-[#5856D6]" },
              { icon: Star, title: "Review & Select", desc: "Employers review worker profiles, ratings, and completed jobs.", gradient: "from-[#FF9500] to-destructive" },
              { icon: Shield, title: "Work & Get Paid", desc: "Direct payout via mBoB/bank QR. No commission, no middleman.", gradient: "from-[#34C759] to-[#30D158]" },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-[24px] p-10 border border-border card-lift">
                <div className={`size-14 rounded-[16px] flex items-center justify-center mb-6 bg-gradient-to-br ${step.gradient} text-white shadow-lg`}>
                  <step.icon className="size-7" />
                </div>
                <h3 className="text-[22px] font-semibold text-foreground">{step.title}</h3>
                <p className="text-[17px] text-muted-foreground mt-3 leading-[1.5]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[40px] font-semibold tracking-[-0.02em] text-foreground md:text-[56px] md:leading-[1.08]">
                A marketplace built on trust.
              </h2>
              <p className="text-[19px] text-muted-foreground mt-6 leading-[1.53]">
                Browse jobs matched to your verified skill set. Employers trust RIGPEL credentials
                because every skill is backed by a verified institution.
              </p>
              <div className="mt-10 space-y-4">
                {["Verified profiles with CID verification", "Direct mBoB/bank QR payments", "Transparent ratings and reviews"].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <CheckCircle2 className="size-6 flex-shrink-0 text-[#34C759]" />
                    <span className="text-[17px] text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background rounded-[28px] p-10 border border-border">
              <div className="space-y-4">
                {[
                  { title: "Delivery Rider", company: "FoodPanda", skills: ["Driving", "Punctual"] },
                  { title: "Shop Assistant", company: "Norling Mall", skills: ["Customer Service", "Sales"] },
                  { title: "Construction Worker", company: "BuildCo", skills: ["Labor", "Teamwork"] },
                ].map((job, i) => (
                  <div key={i} className={`bg-white rounded-[20px] p-6 border border-border ${i < 2 ? "" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-[17px] font-semibold text-foreground">{job.title}</h4>
                        <p className="text-[14px] text-muted-foreground mt-1">{job.company}</p>
                      </div>
                      <div className="size-12 rounded-[12px] bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white shadow-md">
                        <Briefcase className="size-6" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill) => (
                        <span key={skill} className="apple-pill apple-pill-blue">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-[1440px] mx-auto px-8 py-24 md:py-32 text-center">
          <h2 className="text-[40px] font-semibold tracking-[-0.02em] text-foreground md:text-[56px] md:leading-[1.08]">
            Make your skills count.
          </h2>
          <p className="text-[19px] text-muted-foreground mt-5 max-w-[460px] mx-auto">
            Join Bhutan's growing community of verified professionals.
          </p>
          <div className="mt-12">
            <Link
              href="/register/role"
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full text-[16px] font-semibold bg-gradient-to-r from-primary to-[#5856D6] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-90 transition-all press-effect"
            >
              <span>Create Free Account</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-muted-foreground">
            <span className="font-semibold tracking-tight text-foreground text-[14px]">RIGPEL</span>
            <div className="flex items-center gap-8">
              <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Use</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Contact</span>
            </div>
            <div>&copy; {new Date().getFullYear()} RIGPEL</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
