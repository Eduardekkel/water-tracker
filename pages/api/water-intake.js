// pages/api/water-intake.js
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/connect";

import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("water-entries");

  if (req.method === "POST") {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const entry = {
      userId: token.sub, // Verwende die User-ID aus dem JWT-Token
      amount: parseFloat(amount), // Um sicherzustellen, dass es eine Zahl ist
      date: new Date(),
    };

    await collection.insertOne(entry);
    return res.status(201).json({ message: "Entry added", entry });
  }

  if (req.method === "GET") {
    const entries = await collection.find({ userId: token.sub }).toArray();
    return res.status(200).json({ entries });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
