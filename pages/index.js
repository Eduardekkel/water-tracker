import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoalsForm from "@/components/GoalsForm/GoalsForm";
import WaterForm from "@/components/WaterForm/WaterForm";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [goal, setGoal] = useState(2000);
  const [waterEntries, setWaterEntries] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const totalWater = waterEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const progressPercentage = Math.min((totalWater / goal) * 100, 100);

  return (
    <div>
      <h1>Willkommen {session?.user?.name || "User"}!</h1>
      <GoalsForm setGoal={setGoal} />
      <WaterForm
        addWaterEntry={(amount) =>
          setWaterEntries((prevEntries) => [
            ...prevEntries,
            { amount: parseInt(amount), date: new Date() },
          ])
        }
      />
      <div>
        <h2>Tägliches Ziel: {goal} ml</h2>
        <h3>Verbrauch: {totalWater} ml</h3>
        <h4>Fortschritt: {progressPercentage.toFixed(2)}%</h4>
        {progressPercentage < 100 && (
          <p>Trink mehr Wasser, um dein Ziel zu erreichen!</p>
        )}
        {progressPercentage >= 100 && <p>Ziel erreicht! Gut gemacht!</p>}
      </div>
    </div>
  );
}
