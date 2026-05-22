"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/authHeaders";

type NodeSubject = {
  id: number;
  is_compulsory: boolean;
  is_optional: boolean;
  group_tag: string | null;

  subject: {
    id: number;
    name: string;
    code: string | null;
  };
};

type CurriculumNode = {
  id: number;
  name: string;
  node_type: string;

  children: CurriculumNode[];

  subjects: NodeSubject[];
};

export default function CurriculumPage() {
  const [tree, setTree] = useState<CurriculumNode[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [pathwayName, setPathwayName] = useState("");
  const [branchName, setBranchName] = useState("");

  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [nodeType, setNodeType] = useState("PATHWAY");



  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    try {

      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/curriculum/tree/1/",
        {
          method: "GET",
          headers: authHeaders(),
        }
      );

      const data = await res.json();
      setTree(data?.data || []);
    } catch (err) {
      console.error("Error loading curriculum tree", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchSubjects();
}, []);

const fetchSubjects = async () => {
  const res = await fetch(
    "http://127.0.0.1:8000/api/v1/subjects/",
    {
      headers: authHeaders(),
    }
  );

  const data = await res.json();
  setSubjects(data);
};

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-10 w-72 bg-white/10 rounded-xl" />
        <div className="h-4 w-1/2 bg-white/10 rounded" />
        <div className="h-4 w-2/3 bg-white/10 rounded" />
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!tree.length) {
    return (
      <div className="p-10 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          No Curriculum Structure Found
        </h2>

        <p className="text-zinc-400">
          Start by creating your first pathway.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-xl bg-white text-black font-medium"
        >
          Create First Pathway
        </button>

        {/* MODAL */}
        {showModal && (
          <Modal
            name={name}
            setName={setName}
            saving={saving}
            setSaving={setSaving}
            setShowModal={setShowModal}
            refresh={fetchTree}
          />
        )}
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
 return (
  <div className="flex h-screen bg-black text-white">

    {/* ================= LEFT: TREE ================= */}
    <div className="w-[50%] border-r border-white/10 p-4 overflow-y-auto">

      <h2 className="text-xl font-bold mb-4">Curriculum Tree</h2>

      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
        >
          + New Pathway
        </button>
        
        {/* MODAL */}
        {showModal && (
          <Modal
            name={name}
            setName={setName}
            saving={saving}
            setSaving={setSaving}
            setShowModal={setShowModal}
            refresh={fetchTree}
          />
        )}
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : tree.length === 0 ? (
        <p className="text-zinc-400">
          No curriculum structure found
        </p>
      ) : (
        tree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            level={0}
            setSelectedNode={setSelectedNode}
          />
        ))
      )}
    </div>

    {/* ================= MIDDLE: NODE PANEL ================= */}
    <div className="w-[30%] p-6 border-r border-white/10">

      <h2 className="text-xl font-bold mb-4">
        Node Panel
      </h2>

      {/* NODE TYPE */}
      <select
        className="w-full p-2 mb-3 bg-black border border-white/20 rounded"
        value={nodeType}
        onChange={(e) => setNodeType(e.target.value)}
      >
        <option value="">Select type</option>
        <option value="BRANCH">Branch</option>
        <option value="GROUP">Group</option>
      </select>

      {/* NAME */}
      <input
        className="w-full p-2 mb-3 bg-black border border-white/20 rounded"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* PARENT INFO */}
      <div className="text-sm text-zinc-400 mb-3">
        Parent: {selectedNode ? selectedNode.name : "None (root)"}
      </div>

      {/* CREATE */}
      <button
        className="w-full bg-white text-black p-2 rounded hover:bg-zinc-300"
        onClick={async () => {
          await fetch(
            "http://127.0.0.1:8000/api/v1/curriculum/node/create/",
            {
              method: "POST",
              headers: authHeaders(),
              body: JSON.stringify({
                curriculum_id: 1,
                name,
                node_type: nodeType,
                parent_id: selectedNode?.id ?? null,
                order: 0,
              }),
            }
          );
          setNodeType("");
          setName("");
          await fetchTree();
        }}
      >
        Create Node
      </button>

      {/* ================= EDIT ================= */}
      {selectedNode && (
        <div className="mt-6 border-t border-white/10 pt-4">

          <h3 className="font-semibold mb-2">
            Edit Node
          </h3>

          <input
            className="w-full p-2 mb-2 bg-black border border-white/20 rounded"
            value={selectedNode.name}
            onChange={(e) =>
              setSelectedNode({
                ...selectedNode,
                name: e.target.value,
              })
            }
          />
          {/* UPDATE */}
          <button
            className="w-full bg-yellow-500 text-black p-2 rounded mb-2"
            onClick={async () => {
              await fetch(
                `http://127.0.0.1:8000/api/v1/curriculum/node/${selectedNode.id}/update/`,
                {
                  method: "PATCH",
                  headers: authHeaders(),
                  body: JSON.stringify({
                    name: selectedNode.name,
                  }),
                }
              );

              await fetchTree();
            }}
          >
            Update
          </button>

          {/* DELETE */}
          <button
            className="w-full bg-red-500 text-white p-2 rounded mb-2"
            onClick={async () => {
              await fetch(
                `http://127.0.0.1:8000/api/v1/curriculum/node/${selectedNode.id}/delete/`,
                {
                  method: "DELETE",
                  headers: authHeaders(),
                }
              );

              setSelectedNode(null);
              await fetchTree();
            }}
          >
            Delete
          </button>

        </div>
      )}

      {/* ================= SUBJECT ATTACH ================= */}
      {selectedNode && (
        <div className="mt-6 border-t border-white/10 pt-4">

          <h3 className="font-semibold mb-2">
            Attach Subject
          </h3>

          <select
            className="w-full p-2 mb-2 bg-black border border-white/20 rounded"
            onChange={(e) => setSubjectId(e.target.value)}
            value={subjectId}
          >
            <option value="">Select subject</option>

            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={async () => {
              await fetch(
                "http://127.0.0.1:8000/api/v1/curriculum/node/attach-subject/",
                {
                  method: "POST",
                  headers: authHeaders(),
                  body: JSON.stringify({
                    node_id: selectedNode.id,
                    subject_id: subjectId,
                  }),
                }
              );

              await fetchTree();
            }}
          >
            Attach Subject
          </button>
        </div>
      )}

    </div>

    {/* ================= RIGHT: INSPECTOR ================= */}
    <div className="w-[20%] p-6">

      <h2 className="text-xl font-bold mb-4">
        Inspector
      </h2>

      {!selectedNode ? (
        <p className="text-zinc-400">
          Select a node
        </p>
      ) : (
        <div className="space-y-2">

          <p><b>Name:</b> {selectedNode.name}</p>
          <p><b>Type:</b> {selectedNode.node_type}</p>

        </div>
      )}

    </div>

  </div>
);
}

// ---------------- TREE NODE ----------------
function TreeNode({
  node,
  level,
  setSelectedNode,
}: {
  node: CurriculumNode;
  level: number;
  setSelectedNode: (node: CurriculumNode) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="border-l border-white/10 pl-4 py-2"
      style={{ marginLeft: level * 12 }}
    >
      <div
        className="cursor-pointer flex items-center justify-between hover:text-blue-300 transition"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
        <span className="font-semibold text-lg">
          {node.name}
        </span>

        <span className="
          text-[10px]
          uppercase
          px-2
          py-1
          rounded-full
          bg-blue-500/20
          text-blue-300
          border
          border-blue-500/20
        ">
          {node.node_type}
        </span>

      </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedNode(node);
          }}
          className="text-xs text-blue-400 ml-3"
        >
          + Branch
        </button>

        <span className="text-xs text-zinc-500">
          {open ? "−" : "+"}
        </span>
      </div>

      {node.subjects?.length > 0 && (
        <div className="mt-2 ml-2 space-y-1 text-sm text-zinc-400">
          {node.subjects.map((s, idx) => (
            <div key={idx}>
              • {s.subject.name}
              {s.is_compulsory && (
                <span className="text-green-400 ml-2">
                  (compulsory)
                </span>
              )}
              {s.group_tag && (
                <span className="text-xs text-orange-400">
                  {s.group_tag}
                </span>
              )}


            </div>
          ))}
        </div>
      )}

      {open &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            setSelectedNode={setSelectedNode}
          />
        ))}
    </div>
  );
}

// ---------------- MODAL COMPONENT ----------------
function Modal({
  name,
  setName,
  saving,
  setSaving,
  setShowModal,
  refresh,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-2xl w-100 space-y-4">
        <h2 className="text-xl font-semibold">
          Create Pathway
        </h2>

        <input
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
          placeholder="e.g. STEM, Social Science, Art & Sports"
          value={name}
          onChange={(e) => setName(e.target.value)}
        
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-zinc-400"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true);

              try {
                const res = await fetch(
                  "http://127.0.0.1:8000/api/v1/curriculum/node/create/",
                  {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify({
                    curriculum_id: 1,
                    name,
                    node_type: "PATHWAY",
                    order: 0,
                  }),
                  }
                );

                if (!res.ok) throw new Error("Failed");

                setName("");
                setShowModal(false);

                await refresh();
              } catch (err) {
                console.error(err);
              } finally {
                setSaving(false);
              }
            }}
            className="px-4 py-2 bg-white text-black rounded-xl"
          >
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}