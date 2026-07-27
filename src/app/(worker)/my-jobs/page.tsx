"use client";

import { Briefcase, Phone, MapPin, Calendar, CreditCard } from "lucide-react";

const mockJobs = [
  {
    id: "1", title: "Delivery Rider", employer: "FoodPanda Bhutan", location: "Thimphu",
    startDate: "2026-07-28", endDate: "2026-08-10", pay: "Nu 500/day", schedule: "Mon-Sat, 9am-5pm",
    employerPhone: "+975-77-123456", status: "in_progress",
  },
  {
    id: "2", title: "Shop Assistant", employer: "Norling Mall", location: "Thimphu",
    startDate: "2026-08-01", endDate: "2026-08-30", pay: "Nu 8,000/mo", schedule: "Mon-Sun, 10am-6pm",
    employerPhone: "+975-77-654321", status: "upcoming",
  },
];

export default function MyJobsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">My Jobs</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Track your active and past gigs</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["Active", "Upcoming", "Completed"].map((tab) => (
          <button key={tab} className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors press-effect ${
            tab === "Active" ? "bg-primary text-white" : "bg-white text-foreground border border-border hover:bg-background"
          }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-border overflow-hidden card-lift">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`apple-pill text-[11px] ${
                      job.status === "in_progress" ? "apple-pill-orange" : "apple-pill-blue"
                    }`}>
                      {job.status === "in_progress" ? "In Progress" : "Upcoming"}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-foreground">{job.title}</h3>
                  <p className="text-[15px] text-muted-foreground">{job.employer}</p>
                </div>
                <p className="text-[20px] font-bold text-[#34C759]">{job.pay}</p>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <MapPin className="size-3.5" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Calendar className="size-3.5" /> {job.startDate} - {job.endDate}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Briefcase className="size-3.5" /> {job.schedule}
                </span>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-[#34C759]/10 flex items-center justify-center">
                      <Phone className="size-6 text-[#34C759]" />
                    </div>
                    <div>
                      <p className="text-[13px] text-muted-foreground">Employer Contact</p>
                      <p className="text-[17px] font-semibold text-foreground">{job.employerPhone}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl text-[14px] font-medium hover:bg-primary/20 transition-colors press-effect">
                    <CreditCard className="size-4" />
                    View QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
