import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, #4a4a4a, #1a1a1a);
  border-radius: 0 0 30px 30px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
  position: relative;

  &:hover {
    color: #00bfff; /* Change color on hover */
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #00bfff; /* Color of the underline */
    transition: width 0.3s;
    position: absolute;
    left: 0;
    bottom: -5px; /* Position of the underline */
  }

  &:hover::after {
    width: 100%; /* Full underline on hover */
  }
`;

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/progress">Progress</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
}
