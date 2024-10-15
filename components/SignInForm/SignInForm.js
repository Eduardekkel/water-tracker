// components/SignInForm/SignInForm.js

import styled from "styled-components";
import { signIn } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height for centering */
  background-color: #f0f4f8; /* Light background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333; /* Darker text color */
`;

const ProviderButton = styled.div`
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #0070f3; /* Blue button color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5; /* Darker blue on hover */
  }
`;

export default function SignInForm({ providers }) {
  return (
    <Container>
      <Title>Sign in to Water Tracker</Title>
      {Object.values(providers).map((provider) => (
        <ProviderButton key={provider.name}>
          <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </Button>
        </ProviderButton>
      ))}
    </Container>
  );
}
