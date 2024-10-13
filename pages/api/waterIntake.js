// pages/api/water-intake.js
import { getSession } from "next-auth/react";
import WaterData from "../../models/WaterData";
import connectToDatabase from "../../lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ error: "You must be logged in to add data." });
  }

  await connectToDatabase();

  if (req.method === "POST") {
    const { amount } = req.body;

    const waterEntry = new WaterData({
      userId: session.user.id,
      amount,
    });

    await waterEntry.save();
    res.status(201).json({ message: "Water intake added." });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
