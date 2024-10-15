// components/WaterForm/WaterForm.js

export default function WaterForm({ addWaterIntake }) {
  const predefinedAmounts = [200, 500, 750, 1000]; // Hier kannst du die vorgefertigten Mengen anpassen

  const handlePredefinedClick = (amount) => {
    addWaterIntake(amount);
  };

  return (
    <div>
      <h2>Log your water intake</h2>

      {/* Predefined buttons for water amounts */}
      <div>
        <h4>Choose a predefined amount:</h4>
        {predefinedAmounts.map((amount) => (
          <button key={amount} onClick={() => handlePredefinedClick(amount)}>
            {amount} ml
          </button>
        ))}
      </div>

      {/* If the user still wants to input manually */}
      <div>
        <h4>Or enter a custom amount:</h4>
        <input
          type="number"
          placeholder="Enter amount in ml"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addWaterIntake(Number(e.target.value));
            }
          }}
        />
      </div>
    </div>
  );
}
