// components/Home/Home.js

import styled from "styled-components";
import { signIn } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a; /* Dunkler Hintergrund */
  color: white;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 36px;
  margin: 20px 0;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #4a4a4a, #1a1a1a);
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 10px;
  text-align: center;
`;

const ProviderButton = styled.div`
  margin: 10px 0;
`;

export default function Home({ providers }) {
  return (
    <Container>
      <Header>Water Tracker</Header>
      <Card>
        <h2>Stay Hydrated, stay fresh</h2>
        <p>Track your water intake with ease and your body will thank you. </p>

        {Object.values(providers).map((provider) => (
          <ProviderButton key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </Button>
          </ProviderButton>
        ))}
      </Card>
      <Footer>
        <p>© 2024 Water Tracker</p>
      </Footer>
    </Container>
  );
}
