import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("Session data in API:", session);

  if (!session) {
    res.status(400).json({ error: "You must be signed in." });
    return;
  }

  res.status(200).json({ message: "Welcome to the protected API route!" });
}
