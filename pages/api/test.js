import clientPromise from "@/lib/connect";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("water-tracker");
    const collections = await db.listCollections().toArray();
    res.status(200).json({ collections });
  } catch (e) {
    res.status(500).json({ error: "Unable to connect to the database" });
  }
}
