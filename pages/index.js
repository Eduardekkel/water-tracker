import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>You are signed in with {session.user.email}</p>
      <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
        Logout
      </button>
    </div>
  );
}
