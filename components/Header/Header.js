import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {/* Link zum Dashboard oder Home */}
          <Link href="/">Home</Link>
        </div>

        <div>
          {status === "authenticated" ? (
            <>
              <span>Welcome, {session.user?.name || "User"}!</span>
              <button
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
