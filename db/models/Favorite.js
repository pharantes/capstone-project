import mongoose from "mongoose";
const { Schema } = mongoose;
const favoriteSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;
