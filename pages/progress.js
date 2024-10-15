// pages/progress.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import WaterIntakeChart from "@/components/WaterIntakeChart/WaterIntakeChart";

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const [waterEntries, setWaterEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Umleitung zur Anmeldeseite, wenn nicht authentifiziert
      window.location.href = "/auth/signin";
    }
  }, [status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/water-intake");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWaterEntries(data.entries || []);
      } catch (error) {
        console.error("Error fetching water entries:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <WaterIntakeChart waterEntries={waterEntries} />
    </div>
  );
}
