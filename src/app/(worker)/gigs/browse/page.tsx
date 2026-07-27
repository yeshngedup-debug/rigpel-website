"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Clock, Search, Star } from "lucide-react";

const mockGigs = [
  { id: "1", title: "Delivery Rider", company: "FoodPanda", location: "Thimphu", type: "temporary", pay: "Nu 500/day", duration: "2 weeks", rating: 4.5, category: "Service" },
  { id: "2", title: "Shop Assistant", company: "Norling Mall", location: "Thimphu", type: "part-time", pay: "Nu 8,000/mo", duration: "1 month", rating: 4.2, category: "Service" },
  { id: "3", title: "Construction Worker", company: "BuildCo", location: "Paro", type: "temporary", pay: "Nu 600/day", duration: "1 week", rating: 4.8, category: "Labor" },
  { id: "4", title: "Data Entry Operator", company: "TechCorp", location: "Remote", type: "part-time", pay: "Nu 15,000/mo", duration: "3 months", rating: 4.6, category: "Tech" },
  { id: "5", title: "Graphic Designer", company: "CreativeLab", location: "Thimphu", type: "temporary", pay: "Nu 1,000/day", duration: "1 week", rating: 4.7, category: "Creative" },
  { id: "6", title: "Hotel Cleaner", company: "Hotel Druk", location: "Thimphu", type: "part-time", pay: "Nu 5,000/mo", duration: "1 month", rating: 4.1, category: "Hospitality" },
  { id: "7", title: "Gardener", company: "Private Residence", location: "Thimphu", type: "temporary", pay: "Nu 400/day", duration: "2 days", rating: 4.3, category: "Labor" },
  { id: "8", title: "Tutor - Math", company: "Learning Center", location: "Thimphu", type: "part-time", pay: "Nu 10,000/mo", duration: "2 months", rating: 4.9, category: "Other" },
];

const categories = ["All", "Tech", "Labor", "Service", "Creative", "Hospitality", "Other"];
const durationFilters = ["Any", "1-2 days", "1 week", "2 weeks", "1 month", "3 months"];

export default function BrowseGigsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [duration, setDuration] = useState("Any");

  const filtered = mockGigs.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || g.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">Browse Gigs</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Find part-time work that fits your schedule</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 border border-border"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors press-effect ${
              category === cat ? "bg-primary text-white shadow-lg shadow-blue-500/25" : "bg-white text-foreground hover:bg-border border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((gig) => (
          <Link
            key={gig.id}
            href={`/worker/gigs/${gig.id}`}
            className="bg-white rounded-2xl p-5 border border-border hover:border-[#D2D2D7] transition-colors card-lift"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[17px] font-semibold text-foreground">{gig.title}</h3>
                <p className="text-[14px] text-muted-foreground">{gig.company}</p>
              </div>
              <span className="apple-pill apple-pill-blue text-[11px]">{gig.category}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <Star className="size-3.5 text-[#FF9500]" fill="#FF9500" />
              <span className="text-[13px] font-medium text-foreground">{gig.rating}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="apple-pill apple-pill-blue"><MapPin className="size-3" /> {gig.location}</span>
              <span className="apple-pill apple-pill-purple"><Clock className="size-3" /> {gig.duration}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-[17px] font-semibold text-[#34C759]">{gig.pay}</span>
              <button className="text-[13px] font-medium text-primary hover:underline">Apply</button>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <p className="text-[17px] font-medium text-foreground">No gigs found</p>
          <p className="text-[15px] text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
