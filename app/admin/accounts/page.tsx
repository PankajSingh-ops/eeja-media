"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface AdminAccount {
  _id: string;
  username: string;
  createdAt: string;
}

export default function AdminAccountsPage() {
  const { data: session } = useSession();
  const { showToast, ToastContainer } = useToast();
  
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("/api/admin/accounts");
      setAdmins(res.data);
    } catch (e) {
      showToast("Failed to fetch admins", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    
    if (!newUsername) return setCreateError("Username is required");
    if (newPassword.length < 8) return setCreateError("Password must be at least 8 characters");
    if (newPassword !== confirmPassword) return setCreateError("Passwords do not match");

    setCreating(true);
    try {
      await axios.post("/api/admin/accounts", { username: newUsername, password: newPassword });
      showToast("Admin created successfully", "success");
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
      fetchAdmins();
    } catch (e: any) {
      setCreateError(e.response?.data?.error || "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/admin/accounts/${deleteId}`);
      showToast("Admin deleted", "success");
      fetchAdmins();
    } catch (e: any) {
      showToast(e.response?.data?.error || "Failed to delete admin", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const inputStyle = { width: "100%", padding: "0.75rem", background: "#111", border: "1px solid #333", borderRadius: "8px", color: "#fff" };

  return (
    <>
      <TopBar title="Admin Accounts" />
      <ToastContainer />
      {deleteId && (
        <ConfirmModal
          title="Delete Admin"
          message="Are you sure you want to delete this admin account? This cannot be undone."
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <div style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#fff", fontSize: "1.25rem", marginBottom: "1rem" }}>{admins.length} admin accounts</h2>
          <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #222", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #333", background: "#111" }}>
                  <th style={{ padding: "1rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>#</th>
                  <th style={{ padding: "1rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>Username</th>
                  <th style={{ padding: "1rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>Created At</th>
                  <th style={{ padding: "1rem", color: "#9ca3af", fontSize: "0.85rem", fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "#9ca3af" }}>Loading...</td></tr>
                ) : admins.map((admin, idx) => {
                  const isYou = session?.user?.name === admin.username;
                  return (
                    <tr key={admin._id} style={{ borderBottom: "1px solid #222" }}>
                      <td style={{ padding: "1rem", color: "#fff", fontSize: "0.9rem" }}>{idx + 1}</td>
                      <td style={{ padding: "1rem", color: "#fff", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {admin.username}
                        {isYou && <span style={{ background: "#8b5cf6", color: "#fff", fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px", fontWeight: 700 }}>You</span>}
                      </td>
                      <td style={{ padding: "1rem", color: "#9ca3af", fontSize: "0.9rem" }}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "1rem" }}>
                        <button
                          disabled={isYou}
                          onClick={() => setDeleteId(admin._id)}
                          style={{ background: "none", border: "none", color: isYou ? "#555" : "#ef4444", cursor: isYou ? "not-allowed" : "pointer", fontSize: "1.2rem" }}
                          title={isYou ? "Cannot delete yourself" : "Delete Admin"}
                        >
                          <i className="ti ti-trash"></i> 🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "12px", border: "1px solid #222" }}>
          <h2 style={{ color: "#fff", fontSize: "1.25rem", marginBottom: "1.5rem" }}>Add New Admin</h2>
          <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Username</label>
              <input style={inputStyle} value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Choose a username" required />
            </div>
            
            <div style={{ position: "relative" }}>
              <label style={{ display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Password</label>
              <input type={showPassword ? "text" : "password"} style={{ ...inputStyle, paddingRight: "3rem" }} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 8 characters" minLength={8} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "0.75rem", top: "2.3rem", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem" }}>{showPassword ? "Hide" : "Show"}</button>
            </div>

            <div style={{ position: "relative" }}>
              <label style={{ display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Confirm Password</label>
              <input type={showConfirm ? "text" : "password"} style={{ ...inputStyle, paddingRight: "3rem" }} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: "0.75rem", top: "2.3rem", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.85rem" }}>{showConfirm ? "Hide" : "Show"}</button>
            </div>
            
            {createError && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "-0.5rem" }}>{createError}</p>}
            
            <button type="submit" disabled={creating} style={{
              marginTop: "1rem", padding: "0.85rem", borderRadius: "8px", border: "none", color: "#fff", fontWeight: 600, fontSize: "1rem", cursor: creating ? "wait" : "pointer",
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", opacity: creating ? 0.7 : 1
            }}>
              {creating ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
