"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  // Institution
  const [institutionName, setInstitutionName] = useState("");
  const [institutionCode, setInstitutionCode] = useState("");

  // User
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/users/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            institution_name: institutionName,
            institution_code: institutionCode,

            username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert("Registration failed");
        return;
      }

      alert("Registration successful");

      router.push("/login");

    } catch (err) {

      console.error(err);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-bold mb-6">
            Create Institution
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Institution Name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

            <input
              type="text"
              placeholder="Institution Code"
              value={institutionCode}
              onChange={(e) => setInstitutionCode(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-bold mb-6">
            Create Admin User
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

          </div>
        </div>

      </div>

      {/* REGISTER BUTTON */}
      <div className="fixed bottom-10">

        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            px-10
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            hover:scale-105
            transition-all
          "
        >
          {loading ? "Creating..." : "Register Institution"}
        </button>

      </div>

    </div>
  );
}