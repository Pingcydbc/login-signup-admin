import { getServerSession } from "next-auth";
import Link from "next/link";

// ฟังก์ชันสำหรับ Login/Logout แบบง่ายๆ

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="text-center mb-5 fade-in">
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔐</div>
        <h1 className="fw-bold mb-2" style={{ fontSize: '48px', color: 'white' }}>
          Chayodom Login System
        </h1>
        <p className="lead" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Next.js + NextAuth + Prisma Database : TiDB
        </p>
      </div>

      {session ? (
        // ส่วนแสดงผลเมื่อ Login แล้ว
        <div className="bg-white p-5 rounded-4 shadow-lg text-center w-100 fade-in" style={{ maxWidth: '480px' }}>
          <div className="mb-4">
             <div className="d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px', margin: '0 auto 20px', fontSize: '36px' }}>
               {session.user?.name?.charAt(0).toUpperCase()}
             </div>
             <h2 className="h3 fw-bold mb-2">ยินดีต้อนรับ, {session.user?.name}!</h2>
             <p className="text-muted mb-3">{session.user?.email}</p>
             <div>
               <span className="badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                 Role: {(session.user as any).role}
               </span>
             </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex gap-2 flex-column">
            {/* ปุ่มสำหรับ Admin เท่านั้น */}
            {(session.user as any).role === 'ADMIN' && (
              <Link href="/admin" className="btn btn-primary w-100">
                เข้าสู่เมนู Admin 🛠️
              </Link>
            )}
            
            <Link href="/user" className="btn" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white' }}>
              ไปยัง Dashboard 📊
            </Link>
            
            <Link href="/api/auth/signout" className="btn btn-outline-light">
              อออกจากระบบ
            </Link>
          </div>
        </div>
      ) : (
        // ส่วนแสดงผลเมื่อยังไม่ Login
        <div className="d-flex gap-3" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/signin" className="btn btn-light" style={{ color: '#667eea', fontSize: '16px', minWidth: '200px' }}>
            เข้าสู่ระบบ 🔐
          </Link>
          <Link href="/signup" className="btn btn-light" style={{ color: '#f5576c', fontSize: '16px', minWidth: '200px' }}>
            สมัครสมาชิก ✨
          </Link>
        </div>
      )}
    </main>
  );
}