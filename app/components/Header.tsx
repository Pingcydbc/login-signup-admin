"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{ background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)' }}>
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>
            🔐 Chayodom Auth
          </Link>

          <div className="ms-auto">
            {session && (
              <button
                className="btn btn-sm btn-outline-light fw-bold d-flex align-items-center"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
