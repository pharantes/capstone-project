import mongoose from "mongoose";
const { Schema } = mongoose;
const favoriteSchema = new Schema(
  {
    userId: { type: String },
    toiletIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;
