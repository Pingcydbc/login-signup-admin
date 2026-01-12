"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import Alert from "./Alert";

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditUserModal({ user, onClose, onUpdate }: EditUserModalProps) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("อัปเดตสำเร็จ!");
        setTimeout(() => {
          onUpdate();
          onClose();
        }, 1000);
      } else {
        setError(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">แก้ไขข้อมูลผู้ใช้</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
              {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

              <div className="mb-3">
                <label className="form-label fw-bold">ชื่อ</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">อีเมล</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">รหัสผ่านใหม่ (ไม่บังคับ)</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="ใส่รหัสผ่านใหม่ถ้าต้องการเปลี่ยน"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <small className="text-muted">
                  ปล่อยว่างไว้ถ้าไม่ต้องการเปลี่ยนรหัสผ่าน
                </small>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
