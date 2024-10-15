// components/WaterForm/WaterForm.js

import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PredefinedButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const CustomInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const CustomInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

export default function WaterForm({ addWaterIntake }) {
  const predefinedAmounts = [250, 500, 750, 1000];
  const [customAmount, setCustomAmount] = useState("");

  const handlePredefinedClick = (amount) => {
    addWaterIntake(amount);
  };

  const handleCustomAmountSubmit = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      addWaterIntake(amount);
      setCustomAmount(""); // Setze das Eingabefeld zurück
    } else {
      alert("Bitte geben Sie einen gültigen Betrag ein.");
    }
  };

  return (
    <Container>
      <Title>Your water intake</Title>

      <div>
        {predefinedAmounts.map((amount) => (
          <PredefinedButton
            key={amount}
            onClick={() => handlePredefinedClick(amount)}
          >
            {amount} ml
          </PredefinedButton>
        ))}
      </div>

      <div>
        <h4>Enter a custom amount:</h4>
        <CustomInputContainer>
          <CustomInput
            type="number"
            placeholder="Enter amount in ml"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)} // Update state on change
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCustomAmountSubmit(); // Submit on Enter key
              }
            }}
          />
          <AddButton onClick={handleCustomAmountSubmit}>Add</AddButton>
        </CustomInputContainer>
      </div>
    </Container>
  );
}
