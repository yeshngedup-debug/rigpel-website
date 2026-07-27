import { useState, useEffect } from "react";

export function useUser() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rigpel_user");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch {
      console.error("Failed to parse stored user profile");
      localStorage.removeItem("rigpel_user");
    }
    setLoading(false);
  }, []);

  return { profile, loading, setProfile };
}

export function useRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("rigpel_role"));
  }, []);

  return role;
}
