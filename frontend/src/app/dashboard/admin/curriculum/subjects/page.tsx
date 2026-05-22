"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/authHeaders";

type Subject = {
  id: number;
  name: string;
  code?: string;
  is_active: boolean;
};

export default function SubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selected, setSelected] = useState<Subject | null>(null);

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  // ---------------- FETCH ----------------
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/subjects/",
        {
          headers: authHeaders(),
        }
      );

      // 🔴 HANDLE HTTP ERRORS FIRST
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch subjects failed:", res.status, errorText);

        setSubjects([]); // safe fallback
        return;
      }

      const data = await res.json();

      // 🧠 ENSURE DATA IS ALWAYS ARRAY
      setSubjects(Array.isArray(data) ? data : data?.results || []);

    } catch (err) {
      console.error("Network error:", err);
      setSubjects([]); // safe fallback
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CREATE ----------------
  const createSubject = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/subjects/",
        {
          method: "POST",
          headers: authHeaders(),         
          body: JSON.stringify({
            name,
            code,
          }),
        }
      );
      const data = await res.json();
      console.log("SUBJECT RESPONSE:", data);
      if (!res.ok) {
        alert(JSON.stringify(data));
        return;
      }

      setName("");
      setCode("");
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- UPDATE ----------------
  const updateSubject = async () => {
    if (!selected) return;

    await fetch(
      `http://127.0.0.1:8000/api/v1/subjects/${selected.id}/`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          name: editName,
          code: editCode,
        }),
      }
    );

    setEditModal(false);
    setSelected(null);
    fetchSubjects();
  };

  // ---------------- DELETE ----------------
  const deleteSubject = async () => {
    if (!selected) return;

    await fetch(
      `http://127.0.0.1:8000/api/v1/subjects/${selected.id}/`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    setDeleteModal(false);
    setSelected(null);
    fetchSubjects();
  };

  // ---------------- FILTER ----------------
  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-6 text-white">Loading subjects...</div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">

      {/* ================= TOP BAR ================= */}
      <div className="p-4 border-b border-white/10 flex gap-3">

        <input
          className="flex-1 p-3 bg-black border border-white/10"
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="w-48 p-3 bg-black border border-white/10"
          placeholder="Subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-32 p-3 bg-black border border-white/10"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={createSubject}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Add
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="flex-1 overflow-auto p-4">

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="p-3">Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.code || "-"}</td>
                <td className="p-3">
                  {s.is_active ? "Active" : "Inactive"}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2 justify-end">

                  <button
                    onClick={() => {
                      setSelected(s);
                      setEditName(s.name);
                      setEditCode(s.code || "");
                      setEditModal(true);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-black rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelected(s);
                      setDeleteModal(true);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-xl w-100">

            <h2 className="text-xl mb-4">Edit Subject</h2>

            <input
              className="w-full p-2 mb-2 bg-black border border-white/10"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              className="w-full p-2 mb-2 bg-black border border-white/10"
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
            />

            <div className="flex gap-2 mt-4">

              <button
                onClick={updateSubject}
                className="flex-1 bg-white text-black p-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditModal(false)}
                className="flex-1 bg-zinc-700 p-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-xl w-87.5">

            <h2 className="text-lg mb-4">
              Delete this subject?
            </h2>

            <p className="text-sm text-zinc-400 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex gap-2">

              <button
                onClick={deleteSubject}
                className="flex-1 bg-red-500 p-2"
              >
                Yes Delete
              </button>

              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 bg-white text-black p-2"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}