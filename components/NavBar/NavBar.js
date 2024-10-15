// components/Navbar/Navbar.js
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav style={styles.navbar}>
      <Link href="/" style={styles.link}>
        Home
      </Link>
      <Link href="/progress" style={styles.link}>
        Progress
      </Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f8f8",
    borderBottom: "1px solid #eaeaea",
  },
  link: {
    margin: "0 15px",
    textDecoration: "none",
    color: "#0070f3",
  },
  button: {
    background: "none",
    border: "none",
    color: "#0070f3",
    cursor: "pointer",
  },
  user: {
    marginRight: "15px",
  },
};

export default Navbar;
