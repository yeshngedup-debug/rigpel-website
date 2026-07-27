import { useState, useEffect } from "react";

export function useUser() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("rigpel_user");
    if (stored) {
      setProfile(JSON.parse(stored));
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
