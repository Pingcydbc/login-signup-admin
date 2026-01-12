"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import EditUserModal from "@/app/components/EditUserModal";
import Alert from "@/app/components/Alert";
import ConfirmModal from "@/app/components/ConfirmModal";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<number | null>(null);

  useEffect(() => {
    // ตรวจสอบ authentication
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    // ตรวจสอบ role
    if (session && (session.user as any)?.role !== "ADMIN") {
      router.push("/user");
      return;
    }

    // ดึงข้อมูล users
    if (session && (session.user as any)?.role === "ADMIN") {
      fetchUsers();
    }
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirmDeleteUserId) return;

    console.log("Current session:", session);
    console.log("User role:", (session?.user as any)?.role);

    setDeleting(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Delete response:", { status: res.status, data });

      if (res.ok) {
        setDeleteAlert({ type: "success", message: "ลบสำเร็จ!" });
        setConfirmDeleteUserId(null);
        setTimeout(() => {
          fetchUsers();
          setDeleteAlert(null);
        }, 1000);
      } else {
        setDeleteAlert({ type: "danger", message: `ลบไม่สำเร็จ: ${data.message || "Unknown error"}` });
        setConfirmDeleteUserId(null);
        console.error("Delete error:", data);
      }
    } catch (error) {
      console.error("Delete catch error:", error);
      setDeleteAlert({ type: "danger", message: "เกิดข้อผิดพลาด: " + (error instanceof Error ? error.message : "Unknown error") });
      setConfirmDeleteUserId(null);
    } finally {
      setDeleting(null);
    }
  };

  if (status === "loading" || loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container-fluid">
          {deleteAlert && (
            <Alert
              type={deleteAlert.type}
              message={deleteAlert.message}
              onClose={() => setDeleteAlert(null)}
            />
          )}
          
          <div className="mb-5 fade-in">
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛠️</div>
            <h1 className="h2 fw-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted">จัดการผู้ใช้ระบบ</p>
          </div>

          <div className="card shadow-lg border-0">
            <div className="card-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
              <h2 className="card-title mb-0">👥 รายชื่อผู้ใช้ทั้งหมด</h2>
            </div>
            <div className="card-body" style={{ padding: '20px' }}>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                <tr>
                  <th className="fw-bold">ID</th>
                  <th className="fw-bold">Name</th>
                  <th className="fw-bold">Email</th>
                  <th className="fw-bold">Role</th>
                  <th className="fw-bold">Created At</th>
                  <th className="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="fw-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "ADMIN"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => setEditingUser(user)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => setConfirmDeleteUserId(user.id)}
                        disabled={deleting === user.id}
                      >
                        {deleting === user.id ? "ลบอยู่..." : "🗑️ Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUpdate={fetchUsers}
      />

      <ConfirmModal
        isOpen={confirmDeleteUserId !== null}
        title="ยืนยันการลบ"
        message={`ต้องการลบผู้ใช้นี้หรือไม่?`}
        onConfirm={() => confirmDeleteUserId && handleDelete(confirmDeleteUserId)}
        onCancel={() => setConfirmDeleteUserId(null)}
        loading={deleting !== null}
      />

      <Footer />
    </>
  );
}