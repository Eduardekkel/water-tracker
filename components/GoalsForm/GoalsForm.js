import { useState } from "react";

export default function GoalsForm({ setGoal }) {
  const [goalAmount, setGoalAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalAmount > 0) {
      setGoal(goalAmount);
      setGoalAmount("");
    } else {
      alert("Bitte gib ein gültiges Ziel ein.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        placeholder="Tägliches Ziel in ml"
      />
      <button type="submit">Ziel festlegen</button>
    </form>
  );
}
