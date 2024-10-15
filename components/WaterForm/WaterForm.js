import { useState } from "react";

export default function WaterForm({ addWaterIntake }) {
  const [waterAmount, setWaterAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waterAmount > 0) {
      console.log("Adding water entry:", waterAmount); // Log der Menge
      addWaterIntake(Number(waterAmount)); // Stelle sicher, dass die Menge als Zahl übergeben wird
      setWaterAmount("");
    } else {
      alert("Enter a valid amount");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={waterAmount}
        onChange={(e) => setWaterAmount(e.target.value)}
        placeholder="Water amount in ml"
      />
      <button type="submit">Add amount</button>
    </form>
  );
}
