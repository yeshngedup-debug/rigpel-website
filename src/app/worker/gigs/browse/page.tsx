"use client";

import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, MapPin, Clock, DollarSign, Filter, Briefcase } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

const gigs = [
  { id: "1", title: "Delivery Rider", category: "Service", location: "Thimphu", pay: "Nu 500/day", duration: "1 week", posted: "2 hours ago", urgent: true },
  { id: "2", title: "Shop Assistant", category: "Service", location: "Thimphu", pay: "Nu 8,000/mo", duration: "1 month", posted: "1 day ago", urgent: false },
  { id: "3", title: "Construction Worker", category: "Labor", location: "Paro", pay: "Nu 600/day", duration: "2 weeks", posted: "3 days ago", urgent: true },
  { id: "4", title: "Tutor", category: "Tech", location: "Thimphu", pay: "Nu 10,000/mo", duration: "3 months", posted: "1 week ago", urgent: false },
  { id: "5", title: "Gardener", category: "Labor", location: "Thimphu", pay: "Nu 400/day", duration: "1 month", posted: "5 days ago", urgent: false },
  { id: "6", title: "Receptionist", category: "Service", location: "Thimphu", pay: "Nu 7,000/mo", duration: "Ongoing", posted: "2 days ago", urgent: false },
];

export default function BrowseGigsPage() {
  usePageTitle("Browse Gigs");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = gigs.filter(
    (g) =>
      (category === "all" || g.category === category) &&
      (g.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Browse Gigs</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Find part-time jobs that fit your schedule</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="input input-bordered flex items-center gap-3 w-full">
            <SearchIcon className="size-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search gigs..." className="grow" aria-label="Search gigs" />
          </label>
        </div>
        <div className="flex gap-2">
          {["all", "Service", "Labor", "Tech", "Creative"].map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors press-effect ${category === c ? "bg-primary text-white" : "bg-white text-foreground border border-border hover:bg-background"}`}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((gig) => (
          <Link key={gig.id} href={`/worker/gigs/${gig.id}`} className="bg-white rounded-2xl p-6 border border-border card-lift press-effect block">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-primary/20 to-[#5856D6]/20 flex items-center justify-center">
                  <Briefcase className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-foreground">{gig.title}</h3>
                  <span className="text-[13px] text-muted-foreground">{gig.category}</span>
                </div>
              </div>
              {gig.urgent && <span className="apple-pill apple-pill-destructive text-[11px]">Urgent</span>}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {gig.location}</span>
              <span className="flex items-center gap-1"><Clock className="size-3.5" /> {gig.duration}</span>
              <span className="flex items-center gap-1"><DollarSign className="size-3.5" /> {gig.pay}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">{gig.posted}</span>
              <span className="text-[14px] font-medium text-primary">Apply →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
