"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Alert from "@/app/components/Alert";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.ok) {
        setSuccess("เข้าสู่ระบบสำเร็จ!");
        // ดึง session เพื่อหา role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        
        // redirect ตามRole
        setTimeout(() => {
          if ((session?.user as any)?.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/user");
          }
        }, 1000);
      } else {
        setError(result?.error || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-4 shadow-lg w-100 fade-in" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-5">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <h1 className="h3 fw-bold mb-2">เข้าสู่ระบบ</h1>
          <p className="text-muted small">ยินดีต้อนรับกลับมาอีกครั้ง!</p>
        </div>
        
        {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

        <div className="mb-3">
          <label className="form-label fw-bold">อีเมล</label>
          <input 
            type="email"
            className="form-control" 
            required
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">รหัสผ่าน</label>
          <input 
            type="password"
            className="form-control" 
            required
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "🔄 กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <hr className="my-4" />

        <div className="text-center">
          <p className="small text-muted mb-3">
            ยังไม่มีบัญชี? <Link href="/signup" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>สมัครสมาชิก</Link>
          </p>
          <Link href="/" className="text-decoration-none small" style={{ color: '#667eea' }}>← กลับหน้าหลัก</Link>
        </div>
      </form>
    </div>
  );
}
