// components/WaterForm/WaterForm.js

import { useState } from "react";

export default function WaterForm({ addWaterIntake }) {
  const predefinedAmounts = [250, 500, 750, 1000];
  const [customAmount, setCustomAmount] = useState(""); // State für benutzerdefinierte Eingabe

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
    <div>
      <h2>Log your water intake</h2>

      <div>
        <h4>Choose a predefined amount:</h4>
        {predefinedAmounts.map((amount) => (
          <button key={amount} onClick={() => handlePredefinedClick(amount)}>
            {amount} ml
          </button>
        ))}
      </div>

      <div>
        <h4>Or enter a custom amount:</h4>
        <input
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
        <button onClick={handleCustomAmountSubmit}>Add</button>
      </div>
    </div>
  );
}
