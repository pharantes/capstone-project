var UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    bio: String,
    image: String,
  },
  { timestamps: true }
);
mongoose.model("User", UserSchema);
