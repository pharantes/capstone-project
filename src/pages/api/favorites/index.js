import dbConnect from "../../../../db/connect";
import Favorite from "../../../../db/models/Favorite";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    await dbConnect();

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = session.user.id;
    const { toiletId } = req.body;

    if (req.method === "POST") {
        try {
            // Check if favorite already exists
            const existingFavorite = await Favorite.findOne({ userId, name: toiletId });

            if (existingFavorite) {
                // Remove from favorites
                await Favorite.deleteOne({ _id: existingFavorite._id });
                return res.status(200).json({ message: "Favorite removed" });
            } else {
                // Add to favorites
                const newFavorite = new Favorite({ userId, name: toiletId });
                await newFavorite.save();
                return res.status(201).json({ message: "Favorite added" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error updating favorite", error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
