// pages/progress.js
import React, { useEffect, useState } from "react";
import WaterIntakeChart from "@/components/WaterIntakeChart/WaterIntakeChart";
import { useSession } from "next-auth/react";

const Progress = () => {
  const { data: session, status } = useSession();
  const [waterData, setWaterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const res = await fetch("/api/water-intake"); // Hier anpassen, falls nötig
        const data = await res.json();
        setWaterData(data.entries); // Setze die Wasseraufnahme-Daten
      } catch (error) {
        console.error("Error fetching water data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchWaterData();
    }
  }, [status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Fortschritt</h1>
      <WaterIntakeChart waterData={waterData} />
    </div>
  );
};

export default Progress;
