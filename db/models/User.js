import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    username: String,
    email: String,
    bio: String,
    image: String,
=======
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    bio: { type: String, default: "" },
    image: { type: String },
>>>>>>> login-branch
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
