import { useState } from "react";

export default function GoalsForm({ setGoal, currentGoal }) {
  const [newGoal, setNewGoal] = useState(currentGoal);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoal(newGoal); // Goal aktualisieren
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        placeholder="Set daily water goal in ml"
      />
      <button type="submit">Update Goal</button>
    </form>
  );
}
