"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@/app/components/Alert";

export default function RegisterPage() {
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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h1 className="h3 fw-bold mb-4 text-center">สมัครสมาชิก</h1>
        
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

        <div className="mt-3 text-center">
          <p className="small text-muted">
            มีบัญชีแล้ว? <Link href="/signin" className="text-decoration-none">เข้าสู่ระบบ</Link>
          </p>
          <Link href="/" className="text-decoration-none small text-muted">กลับหน้าหลัก</Link>
        </div>
      </form>
    </div>
  );
}
