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
            🔐 Auth App
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {session ? (
                <>
                  <li className="nav-item">
                    <span className="navbar-text text-light d-flex align-items-center">
                      👤 {session.user?.name}
                      {(session.user as any).role === "ADMIN" && (
                        <span className="badge bg-warning text-dark ms-2">ADMIN</span>
                      )}
                    </span>
                  </li>
                  <li className="nav-item ms-3">
                    <button
                      className="btn btn-sm btn-outline-light fw-bold"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/signin" className="nav-link btn btn-outline-light btn-sm me-2">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/signup" className="nav-link btn btn-light btn-sm" style={{ color: '#667eea' }}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
