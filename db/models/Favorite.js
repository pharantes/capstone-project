import mongoose from "mongoose";
const { Schema } = mongoose;
const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    toiletIds: { type: Array },
  },
  { timestamps: true }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;
