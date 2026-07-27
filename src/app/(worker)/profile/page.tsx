"use client";

import { useState } from "react";
import { User, Mail, Phone, Shield, Upload, CreditCard, Check } from "lucide-react";

export default function WorkerProfilePage() {
  const [form, setForm] = useState({
    full_name: "User",
    email: "user@example.com",
    phone: "+975-77-123456",
    bio: "",
    skills: [] as string[],
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.02em] text-foreground">My Profile</h1>
        <p className="text-[17px] text-muted-foreground mt-1">Manage your profile, skills, and verification documents</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
          <div className="flex items-center gap-6 mb-8">
            <div className="size-20 rounded-full bg-gradient-to-br from-primary to-[#5856D6] flex items-center justify-center text-white text-[28px] font-bold shadow-lg">
              {form.full_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-foreground">{form.full_name}</h2>
              <p className="text-[15px] text-muted-foreground">{form.email}</p>
              <span className="apple-pill apple-pill-green text-[11px] mt-2 inline-block">Phone Verified</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <User className="size-3.5" /> Full Name
              </label>
              <input
                type="text" value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Mail className="size-3.5" /> Email
              </label>
              <input
                type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Phone className="size-3.5" /> Phone
              </label>
              <input
                type="tel" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-2">
                Skills (comma separated)
              </label>
              <input
                type="text" placeholder="e.g. Driving, Customer Service"
                onBlur={(e) => setForm({ ...form, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-[15px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-8 py-3 bg-primary text-white rounded-xl text-[15px] font-medium hover:opacity-90 transition-opacity press-effect inline-flex items-center gap-2"
          >
            {saved ? <><Check className="size-4" /> Saved!</> : "Save Changes"}
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-[22px] font-semibold text-foreground flex items-center gap-2 mb-6">
            <Shield className="size-5 text-primary" /> CID Verification
          </h2>
          <p className="text-[15px] text-muted-foreground mb-4">
            Upload a copy of your Citizenship Identity Card (CID) for safety verification.
            Only reviewed by admins and employers you apply to.
          </p>
          <label className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-primary hover:bg-brand-subtle/30 transition-all">
            <Upload className="size-6 text-muted-foreground" />
            <span className="text-[15px] text-muted-foreground font-medium">Upload CID Document</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <p className="text-[13px] text-[#FF9500] mt-3">Status: Pending verification</p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-[22px] font-semibold text-foreground flex items-center gap-2 mb-6">
            <CreditCard className="size-5 text-primary" /> Bank / mBoB QR Code
          </h2>
          <p className="text-[15px] text-muted-foreground mb-4">
            Upload your mBoB, BNB, or BOB QR code for direct payment from employers.
          </p>
          <label className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-[#34C759] hover:bg-[#34C759]/5 transition-all">
            <Upload className="size-6 text-muted-foreground" />
            <span className="text-[15px] text-muted-foreground font-medium">Upload QR Code Image</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <p className="text-[13px] text-muted-foreground mt-3">Supported: mBoB, BNB, BOB</p>
        </div>
      </div>
    </div>
  );
}
