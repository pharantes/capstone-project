import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    bio: { type: String, default: "" },
    image: { type: String },
    hash: { type: String },  // Password hash
    salt: { type: String },  // Salt for password hashing
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
