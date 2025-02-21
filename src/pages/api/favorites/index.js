import dbConnect from "../../../../db/connect";
import Favorite from "../../../../db/models/Favorite";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]"; // adjust path if needed

export default async function handler(req, res) {
    await dbConnect();

    // Retrieve session using NextAuth's getServerSession
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = session.user.id;

    // GET: Return the logged-in user's favorites
    if (req.method === "GET") {
        try {
            const favorites = await Favorite.findOne({ userId });
            return res.status(200).json({ favorites });
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving favorites", error });
        }
    }

    // POST: Toggle a favorite toilet for the logged-in user
    else if (req.method === "POST") {
        const { toiletId } = req.body;
        try {
            const existingFavorites = await Favorite.findOne({ userId });

            if (existingFavorites) {
                const index = existingFavorites.toiletIds.indexOf(toiletId);

                if (index !== -1) {
                    // Remove the toiletId if it already exists
                    existingFavorites.toiletIds.splice(index, 1);
                    await existingFavorites.save();
                    return res.status(200).json({ message: "Favorite removed" });
                } else {
                    // Add the toiletId if it's not already present
                    existingFavorites.toiletIds.push(toiletId);
                    await existingFavorites.save();
                    return res.status(200).json({ message: "Favorite added" });
                }
            } else {
                // Create a new favorites document if none exists
                const newFavorite = new Favorite({
                    userId,
                    toiletIds: [toiletId],
                });
                await newFavorite.save();
                return res.status(201).json({ message: "Favorite added" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error updating favorite", error });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
