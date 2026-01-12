export default function Footer() {
  return (
    <footer className="text-light mt-5 py-5" style={{ background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)' }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">🔐 Auth App</h5>
            <p className="text-light-emphasis small" style={{ color: '#cbd5e0' }}>
              ระบบจัดการการเข้าสู่ระบบและสมัครสมาชิกแบบอย่างง่ายด้วย <strong>Next.js</strong> + <strong>NextAuth</strong> + <strong>Prisma</strong>
            </p>
            <div style={{ marginTop: '12px' }}>
              <p className="small text-light-emphasis mb-1" style={{ color: '#cbd5e0' }}>
                ✨ ตัวอย่างโครงการการเข้าสู่ระบบและจัดการบัญชี
              </p>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <h5 className="fw-bold mb-3">\ud83d\udcc4 ข้อมูล</h5>
            <p className="text-light-emphasis small mb-2" style={{ color: '#cbd5e0' }}>
              <strong>Admin Account:</strong> admin@admin.com / admin
            </p>
            <p className="text-light-emphasis small mb-3" style={{ color: '#cbd5e0' }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className="text-center">
          <p className="text-light-emphasis small mb-0" style={{ color: '#a0aec0' }}>
            Built with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
