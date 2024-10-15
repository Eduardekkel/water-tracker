import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoalsForm from "@/components/GoalsForm/GoalsForm";
import WaterForm from "@/components/WaterForm/WaterForm";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [goal, setGoal] = useState();
  const [waterEntries, setWaterEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wenn der Benutzer nicht eingeloggt ist, leite ihn zur Login-Seite weiter
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Abrufen des Goals und der Wasser-Einträge von der API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalRes, waterRes] = await Promise.all([
          fetch("/api/goal"),
          fetch("/api/water-intake"),
        ]);

        if (!goalRes.ok || !waterRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const goalData = await goalRes.json();
        const waterData = await waterRes.json();

        console.log("Fetched goal data:", goalData);

        // Set goal or default to 2000
        if (goalData.entry) {
          setGoal(goalData.entry.goal);
        } else {
          setGoal(2000); // Setze Standardwert, wenn kein Ziel existiert
        }

        setWaterEntries(waterData.entries || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const totalWater = waterEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const progressPercentage = Math.min((totalWater / goal) * 100, 100);

  // Goal speichern und nach dem Update die neuen Daten abrufen
  async function updateGoal(newGoal) {
    try {
      console.log("Updating goal to:", newGoal);

      const response = await fetch("/api/goal", {
        method: "PUT", // Oder "PATCH"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: newGoal }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        console.log("Goal successfully updated:", data);
        alert("Goal successfully updated!");

        // Neue Daten vom Server holen, nachdem das Ziel aktualisiert wurde
        await fetchGoal(); // <--- Wichtig: Dies stellt sicher, dass die neuesten Daten geladen werden
      } else {
        console.error("Error updating goal:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("A network error occurred.");
    }
  }

  // Funktion zum Abrufen des Goals
  async function fetchGoal() {
    try {
      const res = await fetch("/api/goal", {
        method: "GET",
      });

      const data = await res.json();
      console.log("Goal data fetched:", data); // Hier wird die gesamte API-Antwort angezeigt

      if (res.ok && data.entry) {
        console.log("Setting goal to:", data.entry.goal);
        setGoal(data.entry.goal); // Goal im State setzen, falls vorhanden
      } else {
        console.log("No goal entries found, setting default goal.");
        setGoal(2000); // Standardwert setzen, wenn kein Eintrag vorhanden ist
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  }

  // Wasseraufnahme hinzufügen
  const addWaterIntake = async (amount) => {
    try {
      const response = await fetch("/api/water-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (response.ok) {
        // Wasser-Einträge nach erfolgreicher Eingabe erneut abrufen
        const updatedEntries = await fetch("/api/water-intake");
        const data = await updatedEntries.json();
        setWaterEntries(data.entries);
      }
    } catch (error) {
      console.error("Error adding water intake:", error);
    }
  };

  return (
    <div>
      <h1>Welcome {session?.user?.name || "User"}!</h1>
      <GoalsForm setGoal={updateGoal} currentGoal={goal} />
      <WaterForm addWaterIntake={addWaterIntake} />
      <div>
        <h2>Daily Goal: {goal} ml</h2>
        <h3>Consumed: {totalWater} ml</h3>
        <h4>Progress: {progressPercentage.toFixed(2)}%</h4>
        {progressPercentage < 100 && (
          <p>You have not reached your daily goal yet!</p>
        )}
        {progressPercentage >= 100 && <p>Goal reached! Good job!</p>}
      </div>
    </div>
  );
}
