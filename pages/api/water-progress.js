// pages/api/water-progress.js
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/connect";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("waterIntake");

  const { startDate, endDate } = req.query;

  const entries = await collection
    .find({
      userId: session.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
    .toArray();

  return res.status(200).json({ entries });
}
