"use client";

import { useState } from "react";
import { User, Upload, Check, Camera, CreditCard } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";

export default function WorkerProfilePage() {
  usePageTitle("My Profile");
  const [cidUploaded, setCidUploaded] = useState(false);
  const [bankUploaded, setBankUploaded] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">My Profile</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Manage your profile and verification</p>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="size-20 rounded-full bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white font-bold text-[28px]">
            <User className="size-10" />
          </div>
          <button type="button" className="absolute -bottom-1 -right-1 size-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white press-effect" aria-label="Upload profile photo">
            <Camera className="size-4" />
          </button>
        </div>
        <div>
          <h2 className="text-[22px] font-bold text-foreground">Your Name</h2>
          <p className="text-[14px] text-muted-foreground">+975-77-000000</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 mb-6">
        <h2 className="text-[18px] font-semibold text-foreground mb-5">Verification</h2>
        <div className="space-y-4">
          <div className={`rounded-2xl border p-5 transition-all ${cidUploaded ? "border-[#34C759] bg-[#34C759]/5" : "border-border"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-xl ${cidUploaded ? "bg-[#34C759]/10" : "bg-primary/10"} flex items-center justify-center`}>
                  {cidUploaded ? <Check className="size-5 text-[#34C759]" /> : <Upload className="size-5 text-primary" />}
                </div>
                <div><p className="text-[15px] font-medium text-foreground">CID (Citizen Identity)</p><p className="text-[13px] text-muted-foreground">Upload a clear photo of your CID</p></div>
              </div>
              <button onClick={() => setCidUploaded(!cidUploaded)} className={`px-5 py-2 rounded-xl text-[13px] font-medium transition-all press-effect ${cidUploaded ? "text-[#34C759] bg-[#34C759]/10" : "bg-primary text-white hover:opacity-90"}`}>
                {cidUploaded ? "Verified" : "Upload"}
              </button>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 transition-all ${bankUploaded ? "border-[#34C759] bg-[#34C759]/5" : "border-border"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-xl ${bankUploaded ? "bg-[#34C759]/10" : "bg-primary/10"} flex items-center justify-center`}>
                  {bankUploaded ? <Check className="size-5 text-[#34C759]" /> : <CreditCard className="size-5 text-primary" />}
                </div>
                <div><p className="text-[15px] font-medium text-foreground">Bank QR Code</p><p className="text-[13px] text-muted-foreground">Upload your mBoB or bank QR for payments</p></div>
              </div>
              <button onClick={() => setBankUploaded(!bankUploaded)} className={`px-5 py-2 rounded-xl text-[13px] font-medium transition-all press-effect ${bankUploaded ? "text-[#34C759] bg-[#34C759]/10" : "bg-primary text-white hover:opacity-90"}`}>
                {bankUploaded ? "Uploaded" : "Upload QR"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-[18px] font-semibold text-foreground mb-5">Skills & Availability</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[14px] font-medium text-foreground/60 mb-1.5 block">Skills</label>
            <input type="text" placeholder="e.g. Driving, Customer Service, Cleaning" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground/50" />
          </div>
          <div>
            <label className="text-[14px] font-medium text-foreground/60 mb-1.5 block">Availability</label>
            <select className="select w-full bg-background border border-border rounded-xl text-[15px]">
              <option>Full-time</option><option>Part-time</option><option>Weekends only</option><option>Flexible</option>
            </select>
          </div>
          <button className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 press-effect">Save Profile</button>
        </div>
      </div>
    </div>
  );
}
