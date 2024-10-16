import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/connect";

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
    const lastEntry = await collection.findOne(
      { userId: token.sub },
      { sort: { date: -1 } }
    );
    const today = new Date();
    const lastEntryDate = new Date(lastEntry?.date);

    if (
      !lastEntry ||
      lastEntryDate.getDate() !== today.getDate() ||
      lastEntryDate.getMonth() !== today.getMonth() ||
      lastEntryDate.getFullYear() !== today.getFullYear()
    ) {
      await collection.deleteMany({ userId: token.sub });
    }

    const entry = {
      userId: token.sub,
      amount: parseFloat(amount),
      date: new Date(),
    };

    await collection.insertOne(entry);
    return res.status(201).json({ message: "Entry added", entry });
  }

  if (req.method === "GET" && req.url.endsWith("/last-entry")) {
    const lastEntry = await collection.findOne(
      { userId: token.sub },
      { sort: { date: -1 } }
    );
    return res.status(200).json({ lastEntry });
  }

  if (req.method === "POST") {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const lastEntry = await collection.findOne(
      { userId: token.sub },
      { sort: { date: -1 } }
    );
    const today = new Date();
    const lastEntryDate = new Date(lastEntry?.date);

    if (
      !lastEntry ||
      lastEntryDate.getDate() !== today.getDate() ||
      lastEntryDate.getMonth() !== today.getMonth() ||
      lastEntryDate.getFullYear() !== today.getFullYear()
    ) {
      await collection.deleteMany({ userId: token.sub });
    }

    const entry = {
      userId: token.sub,
      amount: parseFloat(amount),
      date: new Date(),
    };

    await collection.insertOne(entry);
    return res.status(201).json({ message: "Entry added", entry });
  }

  if (req.method === "DELETE") {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const result = await collection.deleteOne({
      userId: token.sub,
      amount: parseFloat(amount),
      date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No entry found to delete" });
    }

    return res.status(200).json({ message: "Entry deleted" });
  }

  if (req.method === "GET") {
    const entries = await collection.find({ userId: token.sub }).toArray();
    return res.status(200).json({ entries });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
