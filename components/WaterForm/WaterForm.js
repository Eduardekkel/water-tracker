import { useState } from "react";

export default function WaterForm({ addWaterEntry }) {
  const [waterAmount, setWaterAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waterAmount > 0) {
      addWaterEntry(waterAmount);
      setWaterAmount("");
    } else {
      alert("Bitte gib eine gültige Menge ein.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={waterAmount}
        onChange={(e) => setWaterAmount(e.target.value)}
        placeholder="Wassermenge in ml"
      />
      <button type="submit">Wasser hinzufügen</button>
    </form>
  );
}
