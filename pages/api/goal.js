// pages/api/goal.js
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/connect";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("goals");

  if (req.method === "GET") {
    // Hole den letzten Eintrag des Users
    const entry = await collection.findOne({ userId: token.sub });

    if (!entry) {
      return res
        .status(200)
        .json({ message: "No goal found for user", entry: null });
    }

    return res.status(200).json({ entry });
  }

  // PUT zum Aktualisieren des Ziels
  if (req.method === "PUT") {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    // Füge den Eintrag hinzu oder aktualisiere ihn (falls vorhanden)
    const result = await collection.updateOne(
      { userId: token.sub },
      { $set: { goal: parseFloat(goal), date: new Date() } },
      { upsert: true } // Wenn es keinen Eintrag gibt, wird ein neuer erstellt
    );

    return res.status(200).json({ message: "Goal updated", result });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
