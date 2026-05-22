"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
      router.push("/dashboard/admin");
    }

    else if (role === "TEACHER") {
      router.push("/dashboard/teacher");
    }

    else {
      router.push("/dashboard/student");
    }

  }, []);

  return null;
}