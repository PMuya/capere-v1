"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await loginUser({ username, password });

  if (res.access) {

  localStorage.setItem("access", res.access);
  localStorage.setItem("refresh", res.refresh);
  localStorage.setItem("user", JSON.stringify(res.user));

  // ROLE ROUTING
  if (res.user.role === "ADMIN") {router.push("/dashboard/admin");}

  else if (res.user.role === "TEACHER") {router.push("/dashboard/teacher");}

  else {router.push("/dashboard/admin");}}
  
  else {setError("Invalid credentials");}

    setLoading(false);};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-100 p-8 rounded-2xl border border-white/10 bg-white/5">

        <h1 className="text-2xl font-bold mb-6">
          Welcome back
        </h1>

        <input
          className="w-full p-3 mb-3 bg-black border border-white/10 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 bg-black border border-white/10 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-white text-black rounded hover:bg-zinc-300"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-zinc-400 mt-4">
          No account? <button className="text-blue-400 hover:underline" onClick={() => router.push("/register")}>Go to register</button>
        </p>

      </div>
    </div>
  );
}