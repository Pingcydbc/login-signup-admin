"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // ถ้าไม่ได้ login ให้ redirect ไป signin
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    
    // ถ้าเป็น ADMIN ให้ไป admin page
    if (session && session.user?.role === "ADMIN") {
      router.push("/admin");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
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
          <div className="mb-5 fade-in">
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>👤</div>
            <h1 className="h2 fw-bold mb-2">User Dashboard</h1>
            <p className="text-muted">ข้อมูลส่วนตัวและการจัดการบัญชี</p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-header" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                  <h2 className="card-title mb-0">ข้อมูลของคุณ</h2>
                </div>
                <div className="card-body" style={{ paddingTop: '24px' }}>

                  <div className="mb-4 pb-3 border-bottom">
                    <label className="form-label fw-bold text-muted small">ชื่อ</label>
                    <p className="h5 fw-bold mb-0" style={{ color: '#1a202c' }}>
                      {session.user?.name || "-"}
                    </p>
                  </div>

                  <div className="mb-4 pb-3 border-bottom">
                    <label className="form-label fw-bold text-muted small">อีเมล</label>
                    <p className="h5 fw-bold mb-0" style={{ color: '#1a202c' }}>
                      {session.user?.email || "-"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-muted small">สถานะ</label>
                    <p className="mb-0">
                      <span className="badge bg-success">
                        👤 {session.user?.role || "user"}
                      </span>
                    </p>
                  </div>

                  <div className="alert alert-info mt-5 mb-0" role="alert">
                    <div style={{ fontSize: '14px' }}>
                      <strong>✨ ยินดีต้อนรับ!</strong><br/>
                      นี่คือหน้า user dashboard สำหรับสมาชิกทั่วไป
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
