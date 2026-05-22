"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setLoading(false);
  }, []);

  return { user, loading };
}