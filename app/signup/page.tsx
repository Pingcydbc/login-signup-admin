"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@/app/components/Alert";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-4 shadow-lg w-100 fade-in" style={{ maxWidth: "420px" }}>
        <div className="text-center mb-5">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
          <h1 className="h3 fw-bold mb-2">สมัครสมาชิก</h1>
          <p className="text-muted small">เข้าร่วมกับเราเลย!</p>
        </div>
        
        {error && <Alert type="danger" message={error} onClose={() => setError("")} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

        <div className="mb-3">
          <label className="form-label fw-bold">ชื่อ</label>
          <input 
            type="text"
            className="form-control" 
            required
            onChange={(e) => setForm({...form, name: e.target.value})} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">อีเมล</label>
          <input 
            type="email"
            className="form-control" 
            required
            onChange={(e) => setForm({...form, email: e.target.value})} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">รหัสผ่าน</label>
          <input 
            type="password"
            className="form-control" 
            required
            onChange={(e) => setForm({...form, password: e.target.value})} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          สมัครสมาชิก
        </button>

        <hr className="my-4" />

        <div className="text-center">
          <Link href="/" className="text-decoration-none small" style={{ color: '#f5576c' }}>← กลับหน้าหลัก</Link>
        </div>
      </form>
    </div>
  );
}
