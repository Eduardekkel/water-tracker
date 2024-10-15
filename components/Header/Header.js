import styled from "styled-components";
import { useSession, signOut, signIn } from "next-auth/react"; // Importiere signIn hier
import Link from "next/link";

const HeaderContainer = styled.header`
  padding: 1rem;
  background-color: #1a1a1a; /* Dunkler Hintergrund */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
  font-size: 24px;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e03e3e;
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <HeaderContainer>
      <Nav>
        <Logo>Water Tracker</Logo>
        <div>
          {status === "authenticated" ? (
            <>
              <LogoutButton
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              >
                Logout
              </LogoutButton>
            </>
          ) : (
            <LoginButton onClick={() => signIn()}>Login</LoginButton>
          )}
        </div>
      </Nav>
    </HeaderContainer>
  );
}
