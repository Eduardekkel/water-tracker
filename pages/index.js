import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoalsForm from "@/components/GoalsForm/GoalsForm";
import WaterForm from "@/components/WaterForm/WaterForm";
import {
  Container,
  Header,
  BottleContainer,
  WaterLevel,
  ProgressText,
  Button,
} from "@/components/Dashboard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [goal, setGoal] = useState();
  const [waterEntries, setWaterEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEntry, setLastEntry] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

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

        if (goalData.entry) {
          setGoal(goalData.entry.goal);
        } else {
          setGoal(2000);
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
  const progressPercentage = Math.min(
    Math.max((totalWater / goal) * 100, 0),
    100
  );

  async function updateGoal(newGoal) {}

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
        const newEntry = {
          userId: session.user.id,
          amount: parseFloat(amount),
          date: new Date(),
        };

        setLastEntry(newEntry);

        const updatedEntries = await fetch("/api/water-intake");
        const data = await updatedEntries.json();
        setWaterEntries(data.entries);
      }
    } catch (error) {
      console.error("Error adding water intake:", error);
    }
  };

  async function updateGoal(newGoal) {
    try {
      const response = await fetch("/api/goal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: newGoal }),
      });

      if (response.ok) {
        const result = await response.json();

        setGoal(newGoal);
      } else {
        const errorData = await response.json();
        alert(`Error updating goal: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  const deleteLastWaterIntake = async () => {
    if (!lastEntry) {
      alert("Kein letzter Eintrag zum Löschen vorhanden!");
      return;
    }

    try {
      const response = await fetch("/api/water-intake", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: lastEntry.amount }),
      });

      if (response.ok) {
        const updatedEntries = await fetch("/api/water-intake");
        const data = await updatedEntries.json();
        setWaterEntries(data.entries);
        setLastEntry(null);
        alert("Letzten Eintrag erfolgreich gelöscht!");
      } else {
        const data = await response.json();
        alert(`Fehler beim Löschen des Eintrags: ${data.message}`);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des letzten Eintrags:", error);
    }
  };

  return (
    <Container>
      <Header>Welcome {session?.user?.name || "User"}!</Header>

      <BottleContainer>
        <WaterLevel percentage={progressPercentage} />
      </BottleContainer>
      <ProgressText>
        <h2>Daily Goal: {goal} ml</h2>
        <h3>Total Water: {totalWater} ml</h3>
        <h4>Progress: {progressPercentage.toFixed(2)}%</h4>
        {progressPercentage < 100 && (
          <p>You have {goal - totalWater} ml left to reach your goal</p>
        )}
        {progressPercentage >= 100 && <p>Goal reached! Good job!</p>}
      </ProgressText>
      <GoalsForm setGoal={updateGoal} currentGoal={goal} />
      <WaterForm addWaterIntake={addWaterIntake} />
      <Button onClick={deleteLastWaterIntake}>Delete last entry</Button>
    </Container>
  );
}
