// components/GoalsForm/GoalsForm.js

import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2c2c2c; /* Dunkler Hintergrund */
  border-radius: 10px; /* Abgerundete Ecken */
  padding: 20px;
  margin: 20px 0; /* Abstand oben und unten */
  color: white; /* Textfarbe */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Schatten für Tiefe */
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  flex: 1; /* Nimmt den verfügbaren Platz ein */
  margin-right: 10px; /* Abstand zwischen Eingabe und Button */
`;

const UpdateButton = styled.button`
  background-color: #0070f3; /* Button-Hintergrundfarbe */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5; /* Button-Farbe beim Hover */
  }
`;

const FormContainer = styled.form`
  display: flex; /* Flexbox für die Eingabe und den Button */
  align-items: center; /* Vertikale Ausrichtung */
`;

export default function GoalsForm({ setGoal, currentGoal }) {
  const [newGoal, setNewGoal] = useState(currentGoal);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoal(newGoal); // Goal aktualisieren
  };

  return (
    <Container>
      <Title>Set Your Goal</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="number"
          value={newGoal || ""}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Set water goal in ml"
        />
        <UpdateButton type="submit">Update Goal</UpdateButton>
      </FormContainer>
    </Container>
  );
}
